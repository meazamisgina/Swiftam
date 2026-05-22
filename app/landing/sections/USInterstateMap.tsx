/**
 * USInterstateMap - Precision Ground Logistics Command Center
 * 
 * Geographically accurate D3-geo projected map with:
 * - Hydration-safe client-side rendering
 * - US state boundaries from us-atlas
 * - Active asset blips (4px emerald dots)
 * - Transit assets (animated cyan trucks along routes)
 * - Interactive route shields and hub tooltips
 */
"use client";

import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { geoAlbersUsa, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { FeatureCollection, Polygon, MultiPolygon, GeoJsonProperties } from "geojson";
import us from "us-atlas/states-10m.json";
import { 
  LOGISTICS_HUBS, 
  INTERSTATE_ROUTES, 
  TRANSIT_ASSETS,
  type LogisticsHub,
  type InterstateRoute 
} from "./map-config";

// ViewBox dimensions for responsive SVG
const VIEWBOX_WIDTH = 960;
const VIEWBOX_HEIGHT = 600;

// Rounding function to prevent hydration mismatches
const roundCoord = (n: number): number => Math.round(n * 100) / 100;

// D3-geo projection setup
const createProjection = () => {
  return geoAlbersUsa()
    .translate([VIEWBOX_WIDTH / 2, VIEWBOX_HEIGHT / 2])
    .scale(VIEWBOX_WIDTH * 1.35);
};

// Project coordinates to SVG x,y
const projectPoint = (projection: ReturnType<typeof geoAlbersUsa>, lat: number, lng: number): [number, number] | null => {
  const point = projection([lng, lat]);
  if (!point) return null;
  return [roundCoord(point[0]), roundCoord(point[1])];
};

// Generate SVG path from waypoints with rounded coordinates
const generatePathFromWaypoints = (
  projection: ReturnType<typeof geoAlbersUsa>,
  waypoints: [number, number][]
): string => {
  const points = waypoints
    .map(([lat, lng]) => projectPoint(projection, lat, lng))
    .filter(Boolean) as [number, number][];
  
  if (points.length < 2) return "";
  
  return points.map((point, i) => 
    i === 0 ? `M ${point[0]},${point[1]}` : `L ${point[0]},${point[1]}`
  ).join(" ");
};

// Get point along path at specific position (0-1)
const getPointAtPosition = (
  projection: ReturnType<typeof geoAlbersUsa>,
  waypoints: [number, number][],
  position: number
): [number, number] | null => {
  const points = waypoints
    .map(([lat, lng]) => projectPoint(projection, lat, lng))
    .filter(Boolean) as [number, number][];
  
  if (points.length < 2) return null;
  
  let totalLength = 0;
  const segmentLengths: number[] = [];
  
  for (let i = 0; i < points.length - 1; i++) {
    const dx = points[i + 1][0] - points[i][0];
    const dy = points[i + 1][1] - points[i][1];
    const length = Math.sqrt(dx * dx + dy * dy);
    segmentLengths.push(length);
    totalLength += length;
  }
  
  const targetDistance = totalLength * position;
  let currentDistance = 0;
  
  for (let i = 0; i < points.length - 1; i++) {
    const segmentLength = segmentLengths[i];
    if (currentDistance + segmentLength >= targetDistance) {
      const segmentProgress = (targetDistance - currentDistance) / segmentLength;
      const x = roundCoord(points[i][0] + (points[i + 1][0] - points[i][0]) * segmentProgress);
      const y = roundCoord(points[i][1] + (points[i + 1][1] - points[i][1]) * segmentProgress);
      return [x, y];
    }
    currentDistance += segmentLength;
  }
  
  return points[points.length - 1];
};

// Route Shield Component
const InterstateShield = ({
  number,
  type,
  position,
  isHovered,
  onHover,
  onLeave,
  volume,
}: {
  number: number | string;
  type: "interstate" | "us-route";
  position: { x: number; y: number };
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  volume: string;
}) => {
  const isInterstate = type === "interstate";
  
  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
      style={{ left: position.x, top: position.y }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Hover volume tooltip */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: -8 }}
          className="absolute -top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-card border border-border rounded px-2 py-1 z-20"
        >
          <span className="text-[9px] font-mono text-primary uppercase">Volume: {volume}</span>
        </motion.div>
      )}
      
      <div className={`transition-all duration-200 ${isHovered ? "scale-110" : ""}`}>
        {isInterstate ? (
          <div className="bg-blue-900 border-2 border-white rounded-t-sm rounded-b-md px-2 py-0.5 flex flex-col items-center min-w-[32px] shadow-lg">
            <span className="text-[6px] text-white font-bold leading-none tracking-tight">INTERSTATE</span>
            <span className="text-sm font-bold text-white font-mono leading-none">{number}</span>
          </div>
        ) : (
          <div className="bg-white border-2 border-black rounded px-2 py-0.5 flex items-center justify-center min-w-[32px] shadow-lg">
            <span className="text-xs font-bold text-black font-mono">{number}</span>
          </div>
        )}
      </div>
    </div>
  );
};

// Hub Marker with Active Assets (4px pulsing dots)
const HubMarker = ({
  hub,
  position,
  isHovered,
  onHover,
  onLeave,
}: {
  hub: LogisticsHub;
  position: [number, number] | null;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) => {
  if (!position) return null;
  
  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
      style={{ left: position[0], top: position[1] }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Active Asset Blips - 4px #10b981 dots pulsing every 2s */}
      <div className="flex gap-0.5 mb-1 justify-center">
        {Array.from({ length: Math.min(hub.truckCount, 6) }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.4, 1],
              opacity: [1, 0.4, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
            className="w-1 h-1 bg-emerald-500 rounded-full"
          />
        ))}
      </div>
      
      {/* Hub Code Label - JetBrains Mono uppercase */}
      <div
        className={`font-mono text-xs font-bold uppercase tracking-tight px-1.5 py-0.5 rounded border transition-all duration-200 ${
          isHovered
            ? "bg-card border-primary text-foreground"
            : "bg-card/80 border-border text-muted-foreground"
        }`}
      >
        {hub.id}
      </div>
      
      {/* Hover Tooltip with Active Loads and Weather Delay */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: -5 }}
          className="absolute -top-24 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded p-2 z-20 whitespace-nowrap shadow-xl"
        >
          <div className="text-[10px] font-mono text-muted-foreground uppercase mb-1">{hub.city}, {hub.state}</div>
          <div className="text-[9px] font-mono text-muted-foreground/60 mb-2">{hub.corridor}</div>
          <div className="flex gap-4">
            <div>
              <span className="text-[9px] text-muted-foreground block uppercase">Active Loads</span>
              <span className="text-sm font-mono text-foreground tabular-nums">{hub.activeLoads}</span>
            </div>
            <div>
              <span className="text-[9px] text-muted-foreground block uppercase">Weather Delay</span>
              <span className={`text-sm font-mono tabular-nums ${hub.weatherDelay > 0 ? "text-amber-500" : "text-primary"}`}>
                {hub.weatherDelay > 0 ? `${hub.weatherDelay}m` : "None"}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

// Interstate Route Line with double-stroke
const InterstateRoute = ({
  route,
  projection,
  isHovered,
  onHover,
  onLeave,
}: {
  route: InterstateRoute;
  projection: ReturnType<typeof geoAlbersUsa>;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) => {
  const pathD = generatePathFromWaypoints(projection, route.waypoints);
  
  if (!pathD) return null;
  
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
      {/* Base: 4px width, #111827 */}
      <path
        d={pathD}
        fill="none"
        stroke="#111827"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Active Lane: 1px width, #06b6d4 with dash animation */}
      <motion.path
        d={pathD}
        fill="none"
        stroke={isHovered ? "#22d3ee" : "#06b6d4"}
        strokeWidth={isHovered ? 2 : 1}
        strokeDasharray="4 8"
        strokeLinecap="round"
        initial={{ strokeDashoffset: 100 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="transition-all duration-300"
      />
      
      {/* Invisible wider path for hover detection */}
      <path
        d={pathD}
        fill="none"
        stroke="transparent"
        strokeWidth={20}
        className="cursor-pointer"
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      />
    </svg>
  );
};

// Transit Asset - Animated truck moving along route using offset-path
const TransitAsset = ({
  route,
  asset,
  projection,
}: {
  route: InterstateRoute;
  asset: typeof TRANSIT_ASSETS[0];
  projection: ReturnType<typeof geoAlbersUsa>;
}) => {
  const pathD = generatePathFromWaypoints(projection, route.waypoints);
  
  if (!pathD) return null;
  
  return (
    <motion.div
      className="absolute w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_6px_rgba(6,182,212,0.8)] z-10"
      style={{
        offsetPath: `path('${pathD}')`,
        offsetRotate: "0deg",
      }}
      animate={{
        offsetDistance: asset.direction === "forward" ? ["0%", "100%"] : ["100%", "0%"],
      }}
      transition={{
        duration: asset.speed,
        repeat: Infinity,
        ease: "linear",
        delay: asset.delay,
      }}
    />
  );
};

// US States Layer - Geographic Base
const USStatesLayer = ({ projection }: { projection: ReturnType<typeof geoAlbersUsa> }) => {
  const states = useMemo(() => {
    // @ts-expect-error - us-atlas types
    return feature(us, us.objects.states) as FeatureCollection<Polygon | MultiPolygon, GeoJsonProperties>;
  }, []);
  
  const pathGenerator = useMemo(() => {
    return geoPath().projection(projection);
  }, [projection]);
  
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none">
      <g fill="#070b14" stroke="#1f2937" strokeWidth={0.5}>
        {states.features.map((state) => (
          <path key={state.properties?.name || state.id} d={pathGenerator(state.geometry) || undefined} />
        ))}
      </g>
    </svg>
  );
};

export default function USInterstateMap() {
  // Hydration fix: Mount guard ensures client-only rendering
  const [hasMounted, setHasMounted] = useState(false);
  
  useEffect(() => {
    setHasMounted(true);
  }, []);
  
  const [hoveredHub, setHoveredHub] = useState<string | null>(null);
  const [hoveredRoute, setHoveredRoute] = useState<string | null>(null);
  
  // Create projection
  const projection = useMemo(() => createProjection(), []);
  
  // Calculate shield positions
  const shieldPositions = useMemo(() => {
    const positions: Record<string, { x: number; y: number }> = {};
    INTERSTATE_ROUTES.forEach((route) => {
      const pos = getPointAtPosition(projection, route.waypoints, route.shieldPosition);
      if (pos) {
        positions[route.id] = { x: pos[0], y: pos[1] };
      }
    });
    return positions;
  }, [projection]);
  
  // Project all hubs
  const projectedHubs = useMemo(() => {
    return Object.values(LOGISTICS_HUBS).map((hub) => ({
      ...hub,
      position: projectPoint(projection, hub.lat, hub.lng),
    }));
  }, [projection]);
  
  // Hydration fallback
  if (!hasMounted) {
    return (
      <section className="relative min-h-[600px] bg-background">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-card/50 rounded w-1/3 mb-4" />
            <div className="h-4 bg-card/50 rounded w-1/2 mb-8" />
            <div className="aspect-video bg-card/30 rounded border border-border" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-[600px] bg-background overflow-hidden">
      {/* Microscopic grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(var(--primary) 1px, transparent 1px),
            linear-gradient(90deg, var(--primary) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      
      {/* Main Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Section Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-primary rounded-full"
            />
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
              ELD SYNC: 100% | FLEET STATUS: ACTIVE
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight font-mono uppercase">
            Ground Logistics Network
          </h2>
          <p className="text-muted-foreground text-sm mt-2 max-w-xl">
            Real-time visibility across 247,000+ miles of Interstate highways.
            Track assets from Laredo to Boston with sub-meter precision.
          </p>
        </div>
        
        {/* Map Container - Using viewBox for responsive SVG */}
        <div className="relative w-full aspect-video bg-card/30 border border-border rounded overflow-hidden">
          <div 
            className="absolute inset-0"
            style={{ 
              width: "100%", 
              height: "100%",
              // Use a large internal resolution that scales
              aspectRatio: `${VIEWBOX_WIDTH} / ${VIEWBOX_HEIGHT}`
            }}
          >
            {/* US States Layer - Geographic Base */}
            <USStatesLayer projection={projection} />
            
            {/* Interstate Routes - Infrastructure Layer */}
            {INTERSTATE_ROUTES.map((route) => (
              <InterstateRoute
                key={route.id}
                route={route}
                projection={projection}
                isHovered={hoveredRoute === route.id}
                onHover={() => setHoveredRoute(route.id)}
                onLeave={() => setHoveredRoute(null)}
              />
            ))}
            
            {/* Transit Assets - Moving trucks */}
            {TRANSIT_ASSETS.map((asset) => {
              const route = INTERSTATE_ROUTES.find((r) => r.id === asset.routeId);
              if (!route) return null;
              return (
                <TransitAsset
                  key={asset.id}
                  route={route}
                  asset={asset}
                  projection={projection}
                />
              );
            })}
            
            {/* Route Shields - Asset Layer */}
            {INTERSTATE_ROUTES.map((route) => {
              const position = shieldPositions[route.id];
              if (!position) return null;
              return (
                <InterstateShield
                  key={route.id}
                  number={route.shield}
                  type={route.shieldType}
                  position={position}
                  volume={route.volume}
                  isHovered={hoveredRoute === route.id}
                  onHover={() => setHoveredRoute(route.id)}
                  onLeave={() => setHoveredRoute(null)}
                />
              );
            })}
            
            {/* Hub Markers */}
            {projectedHubs.map((hub) => (
              <HubMarker
                key={hub.id}
                hub={hub}
                position={hub.position}
                isHovered={hoveredHub === hub.id}
                onHover={() => setHoveredHub(hub.id)}
                onLeave={() => setHoveredHub(null)}
              />
            ))}
          </div>
          
          {/* Corner Stats */}
          <div className="absolute top-4 right-4 flex gap-6">
            <div className="text-right">
              <span className="text-[9px] font-mono text-muted-foreground uppercase block tracking-wider">
                Active Trucks
              </span>
              <span className="text-xl font-bold text-primary font-mono tabular-nums">
                247
              </span>
            </div>
            <div className="text-right">
              <span className="text-[9px] font-mono text-muted-foreground uppercase block tracking-wider">
                Miles Tracked
              </span>
              <span className="text-xl font-bold text-primary font-mono tabular-nums">
                1.2M
              </span>
            </div>
          </div>
          
          {/* Bottom Legend */}
          <div className="absolute bottom-4 left-4 flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-1 bg-border rounded" />
              <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider">
                Interstate
              </span>
            </div>
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-1 bg-primary rounded-full"
              />
              <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider">
                Active Asset
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider">
                In Transit
              </span>
            </div>
          </div>
        </div>
        
        {/* Corridor Stats Row */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-2">
          {INTERSTATE_ROUTES.map((route) => (
            <div
              key={route.id}
              className={`bg-card border rounded p-2 transition-all duration-200 cursor-pointer ${
                hoveredRoute === route.id
                  ? "border-primary/50 bg-card/80"
                  : "border-border hover:border-primary/30"
              }`}
              onMouseEnter={() => setHoveredRoute(route.id)}
              onMouseLeave={() => setHoveredRoute(null)}
            >
              <div className="flex items-center gap-2 mb-1">
                {route.shieldType === "interstate" ? (
                  <div className="bg-primary border border-foreground rounded-t-sm rounded-b-md px-1">
                    <span className="text-[7px] text-primary-foreground font-bold">{route.id}</span>
                  </div>
                ) : (
                  <div className="bg-foreground border border-background rounded px-1">
                    <span className="text-[7px] text-background font-bold">{route.id}</span>
                  </div>
                )}
                <span className="text-[10px] text-muted-foreground truncate">{route.label}</span>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-[8px] text-muted-foreground font-mono uppercase block">Volume</span>
                  <span className="text-xs font-mono text-foreground tabular-nums">{route.volume}</span>
                </div>
                <div className="text-right">
                  <span className="text-[8px] text-muted-foreground font-mono uppercase block">Eff</span>
                  <span className="text-xs font-mono text-primary tabular-nums">{route.efficiency}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
