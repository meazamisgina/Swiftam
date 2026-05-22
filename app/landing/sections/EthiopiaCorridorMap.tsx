"use client";

/**
 * Stylized schematic of Ethiopian haulage corridors (not geographic survey).
 */
import { motion } from "framer-motion";

const nodes: { code: string; label: string; sub: string; x: number; y: number }[] = [
  { code: "DJI", label: "Djibouti", sub: "Port", x: 88, y: 42 },
  { code: "DIR", label: "Dire Dawa", sub: "Eastern hub", x: 72, y: 38 },
  { code: "ADR", label: "Adama", sub: "Industry", x: 52, y: 55 },
  { code: "AA", label: "Addis Ababa", sub: "Capital", x: 38, y: 48 },
  { code: "MOJ", label: "Modjo", sub: "Dry port", x: 44, y: 58 },
  { code: "HAW", label: "Hawassa", sub: "South", x: 40, y: 70 },
  { code: "MEK", label: "Mekelle", sub: "North", x: 48, y: 22 },
];

const routes: string[] = [
  "M 88 42 L 72 38 L 52 55 L 38 48",
  "M 38 48 L 44 58",
  "M 38 48 L 40 70",
  "M 38 48 L 48 22",
];

export default function EthiopiaCorridorMap() {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <span className="text-primary font-mono text-xs tracking-[0.25em] uppercase block mb-3">
            Works across Ethiopia
          </span>
          <h2 className="text-3xl md:text-5xl font-sans font-bold tracking-tight mb-4">
            National routes, Djibouti corridor, dry ports.
          </h2>
          <p className="text-lg text-muted-foreground">
            Model the lanes your trucks already run—industrial parks, regional DCs, and port-bound Super Corridors—so
            dispatch matches ground reality.
          </p>
        </div>

        <div className="relative rounded-2xl border border-border bg-card/40 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />
          <div className="aspect-[16/9] md:aspect-[21/9] w-full">
            <svg viewBox="0 0 100 80" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="corridor-line" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="var(--primary)" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {routes.map((d, i) => (
                <motion.path
                  key={d}
                  d={d}
                  fill="none"
                  stroke="url(#corridor-line)"
                  strokeWidth="0.65"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="2 2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.1 * i, ease: "easeOut" }}
                />
              ))}

              {nodes.map((n) => (
                <g key={n.code}>
                  <circle cx={n.x} cy={n.y} r="2.2" fill="var(--card)" stroke="var(--primary)" strokeWidth="0.5" />
                  <text
                    x={n.x}
                    y={n.y - 5}
                    textAnchor="middle"
                    fill="currentColor"
                    fontSize="2.9"
                    fontWeight="700"
                    style={{ fontFamily: "var(--font-geist-sans, system-ui)" }}
                  >
                    {n.label}
                  </text>
                  <text
                    x={n.x}
                    y={n.y - 2.6}
                    textAnchor="middle"
                    fill="currentColor"
                    opacity={0.55}
                    fontSize="2.25"
                    style={{ fontFamily: "var(--font-geist-sans, system-ui)" }}
                  >
                    {n.sub}
                  </text>
                  <text
                    x={n.x}
                    y={n.y + 6.8}
                    textAnchor="middle"
                    fill="currentColor"
                    opacity={0.85}
                    fontSize="2.35"
                    style={{ fontFamily: "ui-monospace, monospace" }}
                  >
                    {n.code}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px border-t border-border bg-border text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
            {[
              { k: "Port ↔ capital", v: "Scheduled monitoring" },
              { k: "Dry port loads", v: "Container & breakbulk" },
              { k: "Regional branches", v: "Multi-depot control" },
              { k: "Fuel & tankers", v: "Dedicated workflows" },
            ].map((row) => (
              <div key={row.k} className="bg-background/90 p-4">
                <div className="text-foreground font-bold mb-1">{row.k}</div>
                <div className="text-[10px] normal-case tracking-normal">{row.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
