/**
 * HeroSection — Ethiopia-focused trip estimate with domestic logistics hubs.
 */
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, CaretDown, Truck, WifiHigh } from "@phosphor-icons/react";

const HUBS = {
  AA: { name: "Addis Ababa", code: "AA", rateMult: 1.05, region: "Capital & industrial" },
  MOJ: { name: "Modjo Dry Port", code: "MOJ", rateMult: 1.14, region: "Inland terminals" },
  DJI: { name: "Djibouti (port)", code: "DJI", rateMult: 1.32, region: "Import / export" },
  DIR: { name: "Dire Dawa", code: "DIR", rateMult: 1.1, region: "Eastern corridor" },
  HAW: { name: "Hawassa", code: "HAW", rateMult: 1.08, region: "Southern industry" },
  MEK: { name: "Mekelle", code: "MEK", rateMult: 1.12, region: "Northern operations" },
  ADA: { name: "Adama (Nazareth)", code: "ADA", rateMult: 1.06, region: "Adama industry" },
} as const;

type HubCode = keyof typeof HUBS;

function AnimatedPrice({ value, isCalculating }: { value: number; isCalculating: boolean }) {
  const count = useMotionValue(value);
  const springValue = useSpring(count, { damping: 25, stiffness: 120 });

  const rounded = useTransform(springValue, (latest) =>
    new Intl.NumberFormat("en-ET", {
      style: "currency",
      currency: "ETB",
      maximumFractionDigits: 0,
    }).format(latest)
  );

  useEffect(() => {
    springValue.set(value);
  }, [value, springValue]);

  return (
    <motion.div
      className={`text-3xl lg:text-4xl font-bold text-primary font-mono tracking-tighter transition-all duration-300 ${
        isCalculating ? "blur-[2px]" : ""
      }`}
    >
      <motion.span>{rounded}</motion.span>
      {isCalculating && (
        <motion.div
          className="absolute inset-0 bg-primary/10 rounded"
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 0.6, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
}

function HubSelector({
  value,
  onChange,
  label,
}: {
  value: HubCode;
  onChange: (code: HubCode) => void;
  label: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative space-y-1.5" ref={ref}>
      <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">{label}</label>
      <button type="button" onClick={() => setIsOpen(!isOpen)} className="w-full vektor-input flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-semibold text-foreground truncate">{HUBS[value].name}</span>
          <span className="text-muted-foreground text-sm shrink-0">{HUBS[value].code}</span>
        </div>
        <CaretDown size={14} className={`text-muted-foreground shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute left-0 right-0 top-full z-[100] mt-1 max-h-[min(22rem,calc(100vh-12rem))] min-w-0 w-full overflow-y-auto rounded-lg border border-border bg-[var(--card)] shadow-2xl [color-scheme:dark]"
          >
            {Object.entries(HUBS).map(([code, hub]) => (
              <button
                key={code}
                type="button"
                onClick={() => {
                  onChange(code as HubCode);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2.5 flex items-center justify-between text-left hover:bg-secondary transition-colors ${
                  code === value ? "bg-secondary" : "bg-transparent"
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-medium text-foreground text-sm truncate">{hub.name}</span>
                  <span className="text-muted-foreground text-xs shrink-0">{hub.code}</span>
                </div>
                <span className="text-[10px] text-muted-foreground/60 text-right">{hub.region}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function HeroSection() {
  const [origin, setOrigin] = useState<HubCode>("AA");
  const [destination, setDestination] = useState<HubCode>("DJI");
  const [price, setPrice] = useState(1_180_000);
  const [isCalculating, setIsCalculating] = useState(false);
  const [fuelIdx, setFuelIdx] = useState(17.8);
  const [etaVar, setEtaVar] = useState(-3.8);
  const [distanceKm, setDistanceKm] = useState(920);

  useEffect(() => {
    setIsCalculating(true);
    const timer = setTimeout(() => {
      const base = 760_000;
      const multiplier = HUBS[origin].rateMult * HUBS[destination].rateMult;
      const jitter = Math.floor((Math.random() - 0.5) * 120_000);
      setPrice(Math.max(620_000, Math.min(2_400_000, Math.round(base * multiplier + jitter))));
      setFuelIdx(14 + Math.random() * 10);
      setEtaVar(-6 + Math.random() * 14);
      setDistanceKm(420 + Math.floor(Math.random() * 680));
      setIsCalculating(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [origin, destination]);

  return (
    <section className="relative flex min-h-screen flex-col overflow-x-hidden bg-vektor-gradient lg:flex-row">
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="heroMesh" width="80" height="80" patternUnits="userSpaceOnUse">
              <line x1="0" y1="20" x2="80" y2="20" stroke="var(--border)" strokeWidth="1" opacity="0.12" />
              <line x1="0" y1="60" x2="80" y2="60" stroke="var(--border)" strokeWidth="1" opacity="0.12" />
              <line x1="20" y1="0" x2="20" y2="80" stroke="var(--border)" strokeWidth="1" opacity="0.12" />
              <line x1="60" y1="0" x2="60" y2="80" stroke="var(--border)" strokeWidth="1" opacity="0.12" />
              <line x1="0" y1="0" x2="40" y2="40" stroke="var(--border)" strokeWidth="1" opacity="0.08" />
              <line x1="40" y1="0" x2="80" y2="40" stroke="var(--border)" strokeWidth="1" opacity="0.08" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroMesh)" />
        </svg>
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card"></div>
      </div>

      <div className="w-full lg:w-[55%] p-8 lg:p-16 flex flex-col justify-center space-y-8 relative z-10">
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <Truck size={28} weight="duotone" className="text-primary shrink-0" aria-hidden />
            <span className="text-primary font-mono text-xs tracking-[0.3em] uppercase">
              Ethiopia · trucks, corridors, brokers
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-foreground"
          >
            The simplest way to manage<br />
            <span className="text-vektor-gradient">your trucks and cargo in Ethiopia.</span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-muted-foreground max-w-xl leading-relaxed"
        >
          See trips, fuel, checkpoints, and who paid—without losing the thread in phone calls to brokers. For big fleets
          or a few rigs running Djibouti lanes and inland reloads.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap items-center gap-4"
        >
          <Link href="/demo" className="vektor-btn-primary py-4 px-8 relative overflow-hidden group inline-flex items-center">
            <span className="relative z-10 flex items-center gap-2">
              See how it works <ArrowRight size={16} />
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
          </Link>
          <Link
            href="/signup"
            className="vektor-btn-secondary py-4 px-8 inline-flex items-center gap-2 border-primary/30 hover:border-primary/50 hover:bg-secondary/90"
          >
            Start with one truck free
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 gap-6 pt-8 border-t border-border/50">
          <div className="flex gap-4 border-l-2 border-primary pl-5 py-2">
            <Truck size={40} weight="duotone" className="text-primary shrink-0" aria-hidden />
            <div className="space-y-1">
              <div className="text-2xl md:text-3xl font-bold font-mono text-foreground">Yard & road</div>
              <div className="text-[10px] font-mono text-muted-foreground uppercase">Drivers + dispatch on pocket phones</div>
            </div>
          </div>
          <div className="flex gap-4 border-l-2 border-emerald-400 pl-5 py-2">
            <WifiHigh size={40} weight="duotone" className="text-emerald-400 shrink-0" aria-hidden />
            <div className="space-y-1">
              <div className="text-2xl md:text-3xl font-bold font-mono text-foreground">Weak signal OK</div>
              <div className="text-[10px] font-mono text-muted-foreground uppercase">Queues work offline; syncs after</div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex w-full flex-col justify-center border-l border-border/50 p-8 lg:w-[45%] lg:p-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-10 w-full max-w-md overflow-visible rounded-xl border border-border bg-card p-6 shadow-xl ring-1 ring-white/[0.04] [background-image:linear-gradient(135deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0)_45%)]"
        >
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
            <div>
              <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1">Sample haul band</div>
              <div className="text-sm font-medium text-foreground">ETB (illustrative—know before you roll)</div>
            </div>
            <div className="flex gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500/80"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/80"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
            </div>
          </div>

          <div className="space-y-4">
            <HubSelector value={origin} onChange={setOrigin} label="Origin hub" />
            <div className="flex justify-center py-1">
              <div className="w-px h-6 bg-border border-l border-dashed border-primary/30"></div>
            </div>
            <HubSelector value={destination} onChange={setDestination} label="Destination hub" />
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <div className="text-center">
              <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-2">Estimated haul</div>
              <div className="relative inline-block">
                <AnimatedPrice value={price} isCalculating={isCalculating} />
              </div>
              <p className="text-[10px] text-muted-foreground mt-2 max-w-[16rem] mx-auto">
                Not a binding quote—cargo, axles, permits, broker fee, and fuel all move the number.
              </p>
            </div>

            <div className="flex gap-3 mt-6">
              <div className="flex-1 bg-card/50 border border-border rounded-lg p-3 text-center">
                <div className="text-[9px] font-mono text-muted-foreground uppercase mb-1">Fuel sensitivity</div>
                <motion.div
                  className="text-sm font-mono text-emerald-400"
                  key={fuelIdx}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  +{fuelIdx.toFixed(1)} pts
                </motion.div>
              </div>
              <div className="flex-1 bg-card/50 border border-border rounded-lg p-3 text-center">
                <div className="text-[9px] font-mono text-muted-foreground uppercase mb-1">Transit variance</div>
                <motion.div
                  className={`text-sm font-mono ${etaVar >= 0 ? "text-emerald-400" : "text-amber-400"}`}
                  key={etaVar}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {etaVar >= 0 ? "+" : ""}
                  {etaVar.toFixed(1)} hrs
                </motion.div>
              </div>
              <div className="flex-1 bg-card/50 border border-border rounded-lg p-3 text-center">
                <div className="text-[9px] font-mono text-muted-foreground uppercase mb-1">Distance</div>
                <motion.div className="text-sm font-mono text-primary" key={distanceKm} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                  {distanceKm} km
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
