"use client";

/**
 * East Africa "Mission Control" logistics map for the TMS marketing site.
 *
 * Map data is loaded from the app origin (`/maps/...`) so it satisfies a strict CSP (no third-party fetch).
 * Original source (Natural Earth–derived): https://code.highcharts.com/mapdata/custom/africa.topo.json
 */
import { useEffect, useMemo, useState } from "react";
import { MapPinSimple } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { ComposableMap, Geographies, Geography, Marker, useMapContext } from "react-simple-maps";

/** Served from `public/maps/africa.topo.json` → same-origin, CSP-safe */
export const AFRICA_TOPO_URL = "/maps/africa.topo.json";

const MAP_BG = "#0B101E";
const MAP_PANEL_BG = "#0D1425";
const LAND_FILL = "#1A2235";
const LAND_STROKE = "#2A3441";
const BLUEPRINT_ROUTE = "#6B8299";

const LEGEND_ITEMS: { label: string; primary?: boolean }[] = [
  { label: "Ethio-Djibouti corridor", primary: true },
  { label: "Addis radial · Mekelle · Dire · Hawassa · Bahir Dar · Jimma · Adama" },
  { label: "Addis ↔ Moyale / LAPSSET ↔ Nairobi" },
  { label: "Northern corridor (Nairobi ↔ Mombasa)" },
  { label: "Berbera / Hargeisa corridor" },
];

function useEaseCount(end: number, durationMs = 2600): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let raf = 0;
    const startVal = Math.max(0, Math.floor(end * 0.91));
    const t0 = typeof performance !== "undefined" ? performance.now() : 0;

    function tick(now: number) {
      const elapsed = typeof performance !== "undefined" ? now - t0 : durationMs;
      const t = Math.min(elapsed / durationMs, 1);
      const eased = 1 - (1 - t) ** 2;
      setValue(Math.round(startVal + (end - startVal) * eased));
      if (t < 1 && typeof requestAnimationFrame !== "undefined") {
        raf = requestAnimationFrame(tick);
      } else if (t >= 1) {
        setValue(end);
      }
    }

    if (typeof requestAnimationFrame !== "undefined") {
      raf = requestAnimationFrame(tick);
    } else {
      setValue(end);
    }
    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, [end, durationMs]);

  return value;
}

/** Highcharts Africa TopoJSON packs countries under objects.default.geometries[].properties["hc-key"] */
type HcTopo = {
  type: "Topology";
  arcs?: unknown[];
  bbox?: number[];
  transform?: { scale: [number, number]; translate: [number, number] };
  objects: {
    default: {
      type: "GeometryCollection";
      geometries: Array<{
        type: string;
        arcs?: unknown;
        id?: string;
        properties?: Record<string, string>;
      }>;
    };
  };
};

/** Include `sx` (Somaliland) so Berbera/Hargeisa corridor geometry stays coherent on the base map. */
const EAST_AFRICA_HC_KEYS = new Set(["et", "dj", "so", "ke", "er", "sx"]);

function filterEastAfricaTopology(topology: HcTopo): HcTopo {
  const geometries = topology.objects.default.geometries.filter((g) => {
    const key = String(g.properties?.["hc-key"] ?? "").toLowerCase();
    return EAST_AFRICA_HC_KEYS.has(key);
  });
  return {
    type: "Topology",
    arcs: topology.arcs,
    bbox: topology.bbox,
    transform: topology.transform,
    objects: {
      default: {
        type: "GeometryCollection",
        geometries,
      },
    },
  };
}

/** [longitude, latitude] */
type LngLat = [number, number];

/** Capital & strategic logistics nodes */
const ADD: LngLat = [38.7468, 9.0222];

/** Regional + Indian Ocean gateways + domestic fleet nodes */
const HUBS: { code: string; lng: number; lat: number; variant?: "hub" | "city" }[] = [
  { code: "ADD", lng: ADD[0], lat: ADD[1], variant: "hub" },
  { code: "JIB", lng: 43.145, lat: 11.589, variant: "hub" },
  { code: "NBO", lng: 36.8219, lat: -1.2921, variant: "hub" },
  { code: "MBA", lng: 39.6682, lat: -4.0435, variant: "hub" },
  { code: "MGQ", lng: 45.3182, lat: 2.0469, variant: "hub" },
  { code: "ASM", lng: 38.9318, lat: 15.3229, variant: "hub" },
  { code: "BBO", lng: 45.016, lat: 10.436, variant: "hub" },
  { code: "MEK", lng: 39.4703, lat: 14.2759, variant: "city" },
  { code: "DIR", lng: 41.8671, lat: 9.5833, variant: "city" },
  { code: "AWA", lng: 38.4776, lat: 7.0555, variant: "city" },
  { code: "BJD", lng: 37.3897, lat: 11.5953, variant: "city" },
  { code: "JIM", lng: 37.1991, lat: 7.6596, variant: "city" },
  { code: "ADA", lng: 39.2694, lat: 8.4894, variant: "city" },
];

const MOYALE_WAYPOINT: LngLat = [39.048, 3.548];
const HARGEISA_WAYPOINT: LngLat = [44.065, 9.563];

/** International trunk lines + Ethiopian domestic radial spokes */
const CORRIDORS: { coordinates: LngLat[]; primary?: boolean; domestic?: boolean }[] = [
  { coordinates: [ADD, [43.145, 11.589]], primary: true },
  { coordinates: [ADD, MOYALE_WAYPOINT, [36.8219, -1.2921]] },
  { coordinates: [[36.8219, -1.2921], [39.6682, -4.0435]] },
  {
    coordinates: [ADD, HARGEISA_WAYPOINT, [45.016, 10.436]],
  },
  { coordinates: [ADD, [39.4703, 14.2759]], domestic: true },
  { coordinates: [ADD, [41.8671, 9.5833]], domestic: true },
  { coordinates: [ADD, [38.4776, 7.0555]], domestic: true },
  { coordinates: [ADD, [37.3897, 11.5953]], domestic: true },
  { coordinates: [ADD, [37.1991, 7.6596]], domestic: true },
  { coordinates: [ADD, [39.2694, 8.4894]], domestic: true },
];

function CorridorPaths({ corridors }: { corridors: typeof CORRIDORS }) {
  const { path } = useMapContext();

  return (
    <g aria-hidden>
      {corridors.map((corridor, i) => {
        const ls = {
          type: "LineString" as const,
          coordinates: corridor.coordinates,
        };
        const d = path(ls);
        if (!d) return null;
        const domestic = corridor.domestic === true;
        const strokeWidth = corridor.primary ? 2.05 : domestic ? 0.9 : 1.35;
        const opacity = corridor.primary ? 0.55 : domestic ? 0.36 : 0.48;

        return (
          <motion.path
            key={i}
            d={d}
            fill="none"
            stroke={BLUEPRINT_ROUTE}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity={opacity}
            strokeDasharray={domestic ? "4 12" : "6 16"}
            initial={false}
            animate={{ strokeDashoffset: [0, -220] }}
            transition={{ duration: domestic ? 54 : corridor.primary ? 38 : 44, repeat: Infinity, ease: "linear" }}
          />
        );
      })}
    </g>
  );
}

function HubNode({
  code,
  lng,
  lat,
  variant = "hub",
}: {
  code: string;
  lng: number;
  lat: number;
  variant?: "hub" | "city";
}) {
  const isCity = variant === "city";
  const bx = isCity ? 30 : 38;
  const fontPx = isCity ? 10.5 : 12;
  const letterSpacing = isCity ? "0.14em" : "0.22em";

  return (
    <Marker coordinates={[lng, lat]}>
      <g>
        <circle
          cx={0}
          cy={isCity ? -17 : -20}
          r={isCity ? 2.25 : 2.85}
          fill="#0f766e"
          stroke="#115e59"
          strokeWidth={0.55}
          opacity={0.88}
        />
        <rect
          x={-bx}
          y={isCity ? -11 : -14}
          width={bx * 2}
          height={isCity ? 24 : 30}
          rx={isCity ? 4 : 5}
          fill="#070B14"
          stroke="#2A3441"
          strokeWidth={1}
        />
        <text
          x={0}
          y={isCity ? 6 : 9}
          textAnchor="middle"
          className="fill-[#C8D4F0]"
          style={{
            fontSize: fontPx,
            fontWeight: 700,
            letterSpacing,
            fontFamily:
              'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
          }}
        >
          {code}
        </text>
      </g>
    </Marker>
  );
}

function LogisticsMapSvg({ geography }: { geography: HcTopo }) {
  /** Wider-than-tall view matches Horn geography; avoids squeezed vertical framing */
  const w = 940;
  const h = 700;

  return (
    <ComposableMap
      projection="geoMercator"
      width={w}
      height={h}
      projectionConfig={{
        scale: 5580,
        center: [40.05, 8.75],
      }}
      className="rsm-svg block size-full max-h-none"
      preserveAspectRatio="xMidYMid meet"
    >
      <rect x={0} y={0} width={w} height={h} fill={MAP_PANEL_BG} rx={10} />
      <Geographies geography={geography}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              style={{
                default: {
                  fill: LAND_FILL,
                  stroke: LAND_STROKE,
                  strokeWidth: 0.55,
                  outline: "none",
                },
                hover: {
                  fill: "#243047",
                  stroke: LAND_STROKE,
                  strokeWidth: 0.55,
                  outline: "none",
                },
                pressed: { outline: "none" },
              }}
            />
          ))
        }
      </Geographies>
      <CorridorPaths corridors={CORRIDORS} />
      {HUBS.map((h) => (
        <HubNode key={h.code} code={h.code} lng={h.lng} lat={h.lat} variant={h.variant ?? "hub"} />
      ))}
    </ComposableMap>
  );
}

export default function LogisticsMap() {
  const displayTrucks = useEaseCount(842, 2600);
  const [raw, setRaw] = useState<HcTopo | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    fetch(AFRICA_TOPO_URL)
      .then((r) => {
        if (!r.ok) throw new Error(r.statusText);
        return r.json();
      })
      .then((data: HcTopo) => {
        if (mounted) setRaw(data);
      })
      .catch(() => {
        if (mounted) setErr("Could not load Africa map data.");
      });
    return () => {
      mounted = false;
    };
  }, []);

  const geography = useMemo(() => (raw ? filterEastAfricaTopology(raw) : null), [raw]);

  return (
    <section
      className="flex flex-col py-14 sm:py-16 px-6 sm:px-8 text-white lg:min-h-[min(90vh,920px)]"
      style={{ backgroundColor: MAP_BG }}
    >
      <div className="max-w-[1720px] mx-auto w-full flex flex-col-reverse lg:flex-row gap-8 lg:gap-10 lg:items-stretch">
        <div className="w-full lg:basis-[min(20vw,300px)] lg:max-w-[300px] lg:shrink-0 flex flex-col justify-center z-10 gap-6">
          <div className="flex gap-3 items-start">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-700/80 bg-slate-950/60">
              <MapPinSimple size={28} weight="duotone" className="text-slate-300" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.28em] text-slate-500 mb-2">
                Corridors that actually pay bills
              </p>
              <h2 className="text-xl sm:text-2xl xl:text-[1.65rem] font-bold font-heading leading-snug tracking-tight text-slate-100">
                See the lanes, not a “global heat map”
              </h2>
              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-500 max-w-[22rem]">
                Illustrative routes—Djibouti imports, Moyale exports, and inland spokes. Not live GPS; not marketing fantasy.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-[#070B14] p-5 flex flex-col gap-6 min-h-0">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-slate-500 mb-3">Lane legend</p>
              <ul className="space-y-2.5">
                {LEGEND_ITEMS.map((item, i) => (
                  <li key={i} className="flex gap-2.5 items-start text-[12px] text-slate-400 leading-snug">
                    <span
                      className="mt-[4px] shrink-0 rounded-sm border border-slate-700/90"
                      style={{
                        width: item.primary ? 26 : 16,
                        height: item.primary ? 3 : 2,
                        backgroundColor: BLUEPRINT_ROUTE,
                        opacity: item.primary ? 0.85 : 0.52,
                      }}
                    />
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-slate-800 pt-4 mt-auto">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 mb-3">Active assets</p>
              <div className="flex flex-wrap gap-x-8 gap-y-4">
                <div>
                  <p className="text-3xl font-mono font-medium tabular-nums text-slate-100">{displayTrucks}</p>
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 mt-1">Active trucks</p>
                </div>
                <div>
                  <p className="text-3xl font-mono font-medium tabular-nums text-emerald-400/95">4.5M</p>
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 mt-1">Tonnage (monthly)</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-slate-600 max-w-[16rem]">
            Demo KPIs • Not your live fleet • Map file sits in `/maps/`
          </p>
        </div>

        <div
          className="relative flex-1 min-w-0 lg:min-h-[520px] min-h-[400px] flex items-center justify-center rounded-2xl border border-slate-800 overflow-hidden max-h-[min(92vh,880px)]"
          style={{
            backgroundColor: MAP_PANEL_BG,
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.02)",
          }}
        >
          {err && (
            <div className="flex items-center justify-center min-h-[320px] px-6 text-sm text-slate-400">{err}</div>
          )}
          {!err && !geography && (
            <div className="flex flex-col gap-4 items-center justify-center min-h-[360px] px-6 text-slate-500">
              <div className="h-9 w-9 rounded-full border-2 border-slate-600 border-t-transparent animate-spin" />
              <p className="text-xs font-mono tracking-[0.25em] uppercase">Loading topography…</p>
            </div>
          )}
          {geography && (
            <div className="w-full h-full min-h-0 flex items-center justify-center p-5 sm:p-8">
              <div
                className="w-full max-w-[min(100%,1080px)] shrink-0 [&>svg]:h-full [&>svg]:w-full"
                style={{
                  aspectRatio: "940 / 700",
                }}
              >
                <LogisticsMapSvg geography={geography} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
