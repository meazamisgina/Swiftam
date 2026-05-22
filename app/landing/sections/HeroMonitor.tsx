/**
 * HeroMonitor - Dispatch-style preview (illustrative data) for marketing.
 * Tabs: overview, loads board, truck connectivity, money, lane rates.
 */
"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import {
  SquaresFour,
  Path,
  Pulse,
  ChartBar,
  Globe,
  Clock,
  Scan,
  TrendUp,
  ArrowsOutSimple,
  Compass,
  CaretRight,
  Radio,
  CheckCircle,
  Lightning,
  WifiHigh,
  Wallet,
  ArrowUpRight,
  TelegramLogo,
} from "@phosphor-icons/react";
import Link from "next/link";

type TabId = "overview" | "dispatch" | "health" | "ledger" | "market";

// Real-time freight volume data generator
// Deterministic volume data (no Math.random to avoid hydration mismatch)
const volumeData: number[] = [
  15, 12, 10, 8, 12, 25, 45, 65, 78, 82, 75, 70,
  68, 72, 85, 92, 88, 75, 60, 45, 35, 28, 22, 18
];

function VolumeGraph() {
  const data = volumeData;
  const maxValue = Math.max(...data);
  const viewBoxWidth = 240;
  const viewBoxHeight = 64;
  const padding = { top: 8, bottom: 12 };
  const chartHeight = viewBoxHeight - padding.top - padding.bottom;
  const graphRef = useRef<HTMLDivElement>(null);
  
  const [sliderPos, setSliderPos] = useState(140); // Default at ~14:00
  const [isDragging, setIsDragging] = useState(false);

  // Generate smooth path
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * viewBoxWidth;
    const y = padding.top + chartHeight - (v / maxValue) * chartHeight;
    return [x, y, v] as [number, number, number];
  });

  // Build SVG path
  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
  const areaPath = `${linePath} L ${viewBoxWidth} ${viewBoxHeight} L 0 ${viewBoxHeight} Z`;

  // Get interpolated value at slider position
  const getValueAtPosition = (x: number) => {
    const index = (x / viewBoxWidth) * (data.length - 1);
    const i0 = Math.floor(index);
    const i1 = Math.min(i0 + 1, data.length - 1);
    const t = index - i0;
    const v0 = data[i0];
    const v1 = data[i1];
    return Math.round(v0 + (v1 - v0) * t);
  };

  // Calculate slope at current position
  const getSlopeAtPosition = (x: number) => {
    const idx = (x / viewBoxWidth) * (data.length - 1);
    const i = Math.round(idx);
    const prev = data[Math.max(0, i - 1)];
    const next = data[Math.min(data.length - 1, i + 1)];
    return next - prev;
  };

  const currentValue = getValueAtPosition(sliderPos);
  const slope = getSlopeAtPosition(sliderPos);
  const currentHour = Math.floor((sliderPos / viewBoxWidth) * 24);
  const currentMin = Math.floor(((sliderPos / viewBoxWidth) * 24 % 1) * 60);
  
  // Get Y position at slider X
  const getYAtX = (x: number) => {
    const idx = (x / viewBoxWidth) * (data.length - 1);
    const i0 = Math.floor(idx);
    const i1 = Math.min(i0 + 1, points.length - 1);
    const t = idx - i0;
    if (i0 >= points.length) return points[points.length - 1][1];
    if (i1 >= points.length) return points[i0][1];
    const y0 = points[i0][1];
    const y1 = points[i1][1];
    return y0 + (y1 - y0) * t;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updateSliderFromEvent(e);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    updateSliderFromTouch(e);
  };

  const updateSliderFromEvent = (e: React.MouseEvent) => {
    if (!graphRef.current) return;
    const rect = graphRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * viewBoxWidth;
    setSliderPos(Math.max(0, Math.min(viewBoxWidth, x)));
  };

  const updateSliderFromTouch = (e: React.TouchEvent) => {
    if (!graphRef.current) return;
    const rect = graphRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = ((touch.clientX - rect.left) / rect.width) * viewBoxWidth;
    setSliderPos(Math.max(0, Math.min(viewBoxWidth, x)));
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !graphRef.current) return;
      const rect = graphRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * viewBoxWidth;
      setSliderPos(Math.max(0, Math.min(viewBoxWidth, x)));
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || !graphRef.current) return;
      const rect = graphRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      const x = ((touch.clientX - rect.left) / rect.width) * viewBoxWidth;
      setSliderPos(Math.max(0, Math.min(viewBoxWidth, x)));
    };

    const handleEnd = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging]);

  const currentY = getYAtX(sliderPos);
  const slopeText = slope > 5 ? '↑ Surging' : slope > 0 ? '↑ Rising' : slope < -5 ? '↓ Dropping' : slope < 0 ? '↓ Falling' : '→ Stable';
  const slopeColor = slope > 0 ? 'text-primary' : slope < 0 ? 'text-destructive' : 'text-muted-foreground';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="col-span-8 bg-card/80 backdrop-blur-[8px] border border-border rounded p-3"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-muted-foreground uppercase">Loads moving (sample)</span>
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-[9px] font-mono ${slopeColor}`}>{slopeText}</span>
          <span className="text-[9px] font-mono text-muted-foreground/60">Peak: 16:00</span>
        </div>
      </div>

      {/* Graph Container */}
      <div 
        ref={graphRef}
        className="relative h-20 bg-background rounded border border-border overflow-hidden cursor-crosshair select-none"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Grid */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '25% 50%'
        }} />

        {/* SVG Chart */}
        <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`} preserveAspectRatio="none">
          <defs>
            <linearGradient id="vg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Area fill */}
          <path d={areaPath} fill="url(#vg)" />

          {/* Volume line */}
          <path d={linePath} fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" />

          {/* Slider line - thin */}
          <line 
            x1={sliderPos} 
            y1={0} 
            x2={sliderPos} 
            y2={viewBoxHeight} 
            stroke="var(--primary)" 
            strokeWidth="0.5"
            opacity={isDragging ? 0.9 : 0.6}
          />

          {/* Data point - perfect circle */}
          <circle 
            cx={sliderPos} 
            cy={currentY} 
            r="3" 
            fill="var(--primary)"
          />
        </svg>

        {/* Time Labels */}
        <div className="absolute bottom-1 left-2 text-[8px] font-mono text-muted-foreground/60">00:00</div>
        <div className="absolute bottom-1 right-2 text-[8px] font-mono text-muted-foreground/60">23:59</div>

        {/* Current time & value overlay */}
        <div className="absolute top-2 left-2 flex items-center gap-3">
          <div className="text-[10px] font-mono text-primary">
            {String(currentHour).padStart(2, '0')}:{String(currentMin).padStart(2, '0')}
          </div>
          <div className="text-[10px] font-mono text-foreground">
            {currentValue} trips/hr
          </div>
        </div>

        {/* Slope indicator */}
        <div className="absolute top-2 right-2 text-[9px] font-mono text-muted-foreground/60">
          {Math.abs(slope).toFixed(0)} trips/hr change
        </div>

        {/* Drag hint */}
        {!isDragging && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-[8px] font-mono text-muted-foreground/40 opacity-0 hover:opacity-100 transition-opacity">
              Drag to explore
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

const sidebarTabs: { id: TabId; icon: typeof SquaresFour; label: string }[] = [
  { id: "overview", icon: SquaresFour, label: "At a glance" },
  { id: "dispatch", icon: Path, label: "Loads board" },
  { id: "health", icon: Pulse, label: "Trucks & signal" },
  { id: "ledger", icon: ChartBar, label: "Ledger & payouts" },
  { id: "market", icon: Globe, label: "Lane rates" },
];

const networkStatus = [
  { label: "GPS / truck trackers", status: "CONNECTED", color: "emerald", icon: Lightning },
  { label: "LTE / GSM signal overlay", status: "STABLE", color: "cyan", icon: WifiHigh },
  { label: "Chapa payment webhooks", status: "ROUTING", color: "cyan", icon: Wallet },
  { label: "Dispatcher alerts", status: "LIVE", color: "emerald", icon: TelegramLogo },
];

const activeLanes = [
  {
    origin: "AA",
    originCity: "Addis terminals",
    dest: "DJI",
    destCity: "Djibouti port berth",
    carrier: "Abyssinia Bulk Transport",
    distance: "920 km",
    time: "32h corridor",
    rate: "1,842,900",
    ratePerKm: "Br 92/km",
    verified: true,
    status: "Backhaul hunt",
  },
  {
    origin: "MOJ",
    originCity: "Modjo ICD",
    dest: "HAW",
    destCity: "Hawassa industry",
    carrier: "Rift Cement Carriers",
    distance: "310 km",
    time: "8h laden",
    rate: "412,680",
    ratePerKm: "Br 134/km",
    verified: true,
    status: "Active",
  },
  {
    origin: "DIR",
    originCity: "Dire Dawa siding",
    dest: "ADA",
    destCity: "Adama FMCG hub",
    carrier: "Eastern Corridor LLC",
    distance: "480 km",
    time: "11h ETA",
    rate: "698,340",
    ratePerKm: "Br 97/km",
    verified: false,
    status: "Pending POD",
  },
  {
    origin: "MEK",
    originCity: "Mekelle distribution",
    dest: "MOJ",
    destCity: "Modjo offload",
    carrier: "Northern Star Fleet",
    distance: "640 km",
    time: "19h guarded",
    rate: "1,018,880",
    ratePerKm: "Br 86/km",
    verified: true,
    status: "Active",
  },
];

export default function HeroMonitor() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <section className="hidden lg:block relative min-h-screen bg-background overflow-hidden py-16 lg:py-24">
      {/* Hero Heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-20 text-center mb-8 lg:mb-12 px-4"
      >
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight text-foreground">
          <span className="text-vektor-gradient">
            Your dispatcher wall—without the whiteboard smudge.
          </span>
        </h1>
      </motion.div>

      {/* Ultra-subtle industrial grid background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Clean Glass Terminal */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative w-[95vw] max-w-[1600px] mx-auto min-h-[600px] lg:min-h-0 lg:aspect-[21/9] flex flex-col lg:flex-row"
      >
        {/* Single razor-thin border container */}
        <div className="w-full h-full bg-background/95 backdrop-blur-md border border-border/50 rounded-lg overflow-hidden flex flex-col lg:flex-row">
          
          {/* Mobile Tab Navigation (horizontal) */}
          <div className="lg:hidden flex items-center justify-between p-3 bg-card border-b border-border/50">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">S</span>
              </div>
              <span className="font-mono text-xs text-muted-foreground tracking-wider">SWIFTIOM</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-muted-foreground"
            >
              <span className="block w-4 h-px bg-current mb-1"></span>
              <span className="block w-4 h-px bg-current"></span>
            </button>
          </div>

          {/* Mobile Tab Dropdown */}
          {mobileMenuOpen && (
            <div className="lg:hidden bg-card border-b border-border/50 p-2">
              {sidebarTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 font-mono text-xs uppercase tracking-wider transition-colors ${
                    activeTab === tab.id
                      ? "text-primary bg-secondary/50"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
            </div>
          )}

          {/* Desktop Sidebar (vertical) */}
          <div className="hidden lg:flex flex-col items-center py-6 gap-6 w-16 bg-card border-r border-border/50 shrink-0">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">S</span>
            </div>
            <div className="flex-1 flex flex-col gap-2 mt-4">
              {sidebarTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-10 h-10 rounded flex items-center justify-center transition-all ${
                    activeTab === tab.id
                      ? "bg-secondary text-primary border border-primary/30"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                  }`}
                  title={tab.label}
                >
                  <tab.icon size={18} strokeWidth={activeTab === tab.id ? 2 : 1.5} />
                </button>
              ))}
            </div>
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-primary">
              <Pulse size={14} />
            </div>
          </div>

          {/* Main Dashboard Content */}
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            {/* Header Strip */}
            <div className="flex items-center justify-between px-4 lg:px-6 py-3 border-b border-border/50 bg-card/50">
              <div className="flex items-center gap-2 lg:gap-3 overflow-x-auto">
                <Radio size={12} className="text-primary animate-pulse shrink-0" />
                <span className="text-[10px] lg:text-xs font-mono text-muted-foreground tracking-wider whitespace-nowrap">SYSTEM ONLINE</span>
                <span className="text-[10px] text-border hidden sm:inline">|</span>
                <span className="text-[10px] lg:text-xs font-mono text-primary whitespace-nowrap">DEVICE SYNC · 97%</span>
                <span className="text-[10px] text-border hidden lg:inline">|</span>
                <span className="text-[10px] lg:text-xs font-mono text-primary hidden lg:inline">FLEET STATUS: ACTIVE</span>
              </div>
              <div className="flex items-center gap-3 lg:gap-6 shrink-0">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock size={12} />
                  <span className="font-mono">15:42 EAT</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary shadow-primary/80"></div>
                  <span className="text-xs text-muted-foreground font-mono">LIVE</span>
                </div>
              </div>
            </div>

            {/* Main Content Area - Dynamic based on active tab */}
            <div className="flex-1 p-3 lg:p-4 overflow-auto">
                {activeTab === "overview" && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
                    {/* Active Lane Cards - Using real logistics data */}
                    {activeLanes.slice(0, 2).map((lane, index) => (
                      <motion.div
                        key={lane.origin + lane.dest}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="col-span-1 lg:col-span-3 bg-card/80 border border-border/50 rounded-sm p-3 relative overflow-hidden group hover:border-border transition-colors"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">{lane.status}</span>
                          <div className="flex items-center gap-2">
                            {lane.verified && <CheckCircle size={14} className="text-primary" weight="fill" />}
                            <motion.div
                              animate={{ opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              className="w-1.5 h-1.5 rounded-full bg-primary"
                            />
                          </div>
                        </div>
                        
                        {/* Carrier Name - Bold and popping */}
                        <div className="mb-2">
                          <span className="text-sm font-bold text-foreground">{lane.carrier}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-base font-bold text-foreground tracking-tight font-mono">{lane.origin}</span>
                          <CaretRight size={14} className="text-primary" />
                          <span className="text-base font-bold text-foreground tracking-tight font-mono">{lane.dest}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground mb-3">
                          <Compass size={10} className="text-primary" weight="fill" />
                          <span>{lane.distance}</span>
                          <span className="text-border">|</span>
                          <Clock size={10} className="text-muted-foreground" />
                          <span>{lane.time}</span>
                        </div>
                        
                        <div className="pt-2 border-t border-border">
                          <div className="flex items-baseline gap-1 flex-wrap">
                            <span className="text-xl font-bold text-primary font-mono tracking-tighter">{lane.rate}</span>
                            <span className="text-[10px] text-muted-foreground font-mono ml-1">ETB haul</span>
                            <span className="text-[10px] text-primary font-mono ml-2">{lane.ratePerKm}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {/* Telemetry Card - Industrial styling */}
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="col-span-1 lg:col-span-3 bg-card/80 border border-border/50 rounded-sm p-3"
                    >
                      <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block mb-3">Fleet snapshot</span>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-background border border-border rounded p-2">
                          <span className="text-[9px] text-muted-foreground font-mono block">ACTIVE</span>
                          <span className="text-lg font-bold text-foreground font-mono">247</span>
                        </div>
                        <div className="bg-background border border-border rounded p-2">
                          <span className="text-[9px] text-muted-foreground font-mono block">IDLE</span>
                          <span className="text-lg font-bold text-primary font-mono">18</span>
                        </div>
                        <div className="bg-background border border-border rounded p-2">
                          <span className="text-[9px] text-muted-foreground font-mono block">DELAYED</span>
                          <span className="text-lg font-bold text-amber-500 font-mono">3</span>
                        </div>
                        <div className="bg-background border border-border rounded p-2">
                          <span className="text-[9px] text-muted-foreground font-mono block">LOADED LEGS</span>
                          <span className="text-lg font-bold text-primary font-mono">76%</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Fleet billing card — illustrative */}
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="col-span-1 lg:col-span-3 bg-card/80 border border-border/50 rounded-sm p-3 relative overflow-hidden group"
                    >
                      <span className="text-[10px] font-mono text-primary uppercase tracking-wider block mb-2">Fleet billings today</span>
                      <div className="flex items-baseline gap-1 mb-1">
                        <span className="text-2xl font-bold text-primary font-mono tracking-tighter">Br 92.8M</span>
                      </div>
                      <span className="text-[9px] font-mono text-amber-500 block mb-2">Pending client balances · Br 4.2M</span>
                      <div className="flex items-center gap-2 mb-3">
                        <TrendUp size={14} className="text-primary" />
                        <span className="text-xs text-primary font-mono">+12.4% vs yesterday</span>
                      </div>
                      {/* View Ledger — opens demo access form */}
                      <Link
                        href="/demo"
                        className="w-full flex items-center justify-center gap-1 bg-secondary hover:bg-primary hover:text-primary-foreground text-primary text-xs font-mono py-2 rounded opacity-0 group-hover:opacity-100 transition-all duration-200"
                      >
                        See cash view (demo) <ArrowUpRight size={12} />
                      </Link>
                    </motion.div>

                    {/* Real-Time Freight Volume Graph */}
                    <VolumeGraph />

                    {/* System Status - With live blip indicators */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="col-span-1 lg:col-span-4 bg-card/80 border border-border/50 rounded-sm p-3"
                    >
                      <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block mb-3">Network Status</span>
                      <div className="space-y-2">
                        {networkStatus.map((item, i) => (
                          <div key={i} className="flex items-center justify-between text-xs py-1 border-b border-border/50 last:border-0">
                            <div className="flex items-center gap-2">
                              <item.icon size={12} className={item.color === 'emerald' ? 'text-primary' : 'text-primary'} />
                              <span className="text-muted-foreground font-mono">{item.label}</span>
                              {(item.label === "GPS / truck trackers" || item.label === "Dispatcher alerts") && (
                                <motion.div
                                  className="w-1.5 h-1.5 rounded-full bg-primary"
                                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                                  transition={{ duration: 1.5, repeat: Infinity }}
                                />
                              )}
                            </div>
                            <span className="font-mono text-primary">{item.status}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                )}

                {/* Dispatch Tab - Live city-to-city board */}
                {activeTab === "dispatch" && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
                    <div className="col-span-1 lg:col-span-12 bg-card border border-border/50 rounded-sm p-4">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-mono text-primary uppercase tracking-wider">Loads on the board</span>
                        <span className="text-xs text-muted-foreground font-mono">{activeLanes.length} Active Loads</span>
                      </div>
                      <div className="space-y-2">
                        {activeLanes.map((lane, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-background border border-border/50 rounded-sm">
                            <div className="flex items-center gap-4">
                              <div className="flex flex-col">
                                <span className="text-sm font-bold text-foreground font-mono">{lane.origin}</span>
                                <span className="text-[10px] text-muted-foreground">{lane.originCity}</span>
                              </div>
                              <CaretRight size={16} className="text-border" />
                              <div className="flex flex-col">
                                <span className="text-sm font-bold text-foreground font-mono">{lane.dest}</span>
                                <span className="text-[10px] text-muted-foreground">{lane.destCity}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-sm font-bold text-foreground">{lane.carrier}</span>
                              {lane.verified && <CheckCircle size={16} className="text-primary" weight="fill" />}
                              <span className="text-xs font-mono text-primary">{lane.rate} ETB</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Health Tab - ELD & GPS Status */}
                {activeTab === "health" && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
                    <div className="col-span-1 lg:col-span-6 bg-card border border-border/50 rounded-sm p-4">
                      <span className="text-[10px] font-mono text-primary uppercase tracking-wider block mb-3">Trackers & phones</span>
                      <div className="space-y-3">
                        {["Fleet GPS gateways", "OBD-lite dongles", "Driver Android handsets", "Fixed yard readers"].map((eld) => (
                          <div key={eld} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                            <span className="text-sm text-foreground">{eld}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-primary"></div>
                              <span className="text-xs font-mono text-primary">CONNECTED</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="col-span-1 lg:col-span-6 bg-card border border-border/50 rounded-sm p-4">
                      <span className="text-[10px] font-mono text-primary uppercase tracking-wider block mb-3">Signal by corridor</span>
                      <div className="space-y-3">
                        {["Djibouti corridor", "Awash industrial belt", "Sidama FMCG lanes", "Tigray highlands feeders", "Dire Dawa relay"].map((region, index) => (
                          <div key={region} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                            <span className="text-sm text-foreground">{region}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-24 h-2 bg-border rounded-full overflow-hidden">
                                <div className="h-full bg-primary rounded-full" style={{ width: `${85 + (index * 3) % 15}%` }}></div>
                              </div>
                              <span className="text-xs font-mono text-primary">98%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Ledger Tab - Financial Overview */}
                {activeTab === "ledger" && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
                    <div className="col-span-1 lg:col-span-4 bg-card border border-border/50 rounded-sm p-4">
                      <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block mb-3">Money by lane (sample)</span>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center py-2 border-b border-border/50">
                          <span className="text-xs text-foreground">AA → Djibouti</span>
                          <span className="text-xs font-mono text-primary">+Br 1.24M</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-border/50">
                          <span className="text-xs text-foreground">Modjo → Hawassa</span>
                          <span className="text-xs font-mono text-primary">+Br 420K</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-border/50">
                          <span className="text-xs text-foreground">Dire → Adama relay</span>
                          <span className="text-xs font-mono text-primary">+Br 318K</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-1 lg:col-span-4 bg-card border border-border/50 rounded-sm p-4">
                      <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block mb-3">Licences & inspections</span>
                      <div className="flex flex-col items-center justify-center h-32">
                        <span className="text-3xl font-bold text-primary font-mono">CURRENT</span>
                        <span className="text-xs text-muted-foreground mt-2">Licences & inspection cycles logged</span>
                      </div>
                    </div>
                    <div className="col-span-1 lg:col-span-4 bg-card border border-border/50 rounded-sm p-4">
                      <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block mb-3">Pending Invoices</span>
                      <div className="flex flex-col items-center justify-center h-32">
                        <span className="text-3xl font-bold text-primary font-mono">24</span>
                        <span className="text-xs text-muted-foreground mt-2">Br 284K outstanding AR</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Market Tab - Spot Rates */}
                {activeTab === "market" && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
                    <div className="col-span-1 lg:col-span-12 bg-card border border-border/50 rounded-sm p-4">
                      <span className="text-[10px] font-mono text-primary uppercase tracking-wider block mb-4">Spot vs contract Br/km (sample)</span>
                      <div className="grid grid-cols-4 gap-4">
                        {[
                          { lane: "AA ⇄ Djibouti", spot: "Br 118/km", contract: "Br 105/km", trend: "up" },
                          { lane: "Modjo ⇄ Hawassa", spot: "Br 142/km", contract: "Br 148/km", trend: "down" },
                          { lane: "Dire ⇄ Adama", spot: "Br 96/km", contract: "Br 93/km", trend: "up" },
                          { lane: "Mekelle ⇄ Modjo", spot: "Br 88/km", contract: "Br 90/km", trend: "flat" },
                        ].map((rate) => (
                          <div key={rate.lane} className="bg-background border border-border/50 rounded-sm p-3">
                            <span className="text-xs font-mono text-foreground block mb-2">{rate.lane}</span>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-[10px] text-muted-foreground">Spot</span>
                              <span className="text-xs font-mono text-primary">{rate.spot}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] text-muted-foreground">Contract</span>
                              <span className="text-xs font-mono text-foreground">{rate.contract}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

      {/* Title Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-12 left-12"
      >
        <span className="text-[10px] font-mono text-muted-foreground/60 tracking-[0.4em] uppercase">Swiftiom TMS · Ethiopia rollout</span>
        <span className="block text-xs text-muted-foreground/40 font-mono mt-1">Operational preview · illustrative data</span>
      </motion.div>
    </section>
  );
}
