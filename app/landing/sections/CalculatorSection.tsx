"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Gauge } from "@phosphor-icons/react";
import { useState } from "react";

function formatEtb(n: number) {
  return new Intl.NumberFormat("en-ET", { style: "currency", currency: "ETB", maximumFractionDigits: 0 }).format(n);
}

export default function CalculatorSection() {
  const [trucks, setTrucks] = useState<number>(18);
  const [emptyKmPct, setEmptyKmPct] = useState<number>(24);
  // Illustrative yearly savings in ETB — placeholder economics for marketing only
  const savings = Math.round(trucks * emptyKmPct * 28_500);

  return (
    <section className="py-32 px-6 bg-background relative overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-primary/5 to-transparent"></div>
      <div className="max-w-4xl mx-auto z-10 relative">
        <div className="text-center mb-12 max-w-xl mx-auto flex flex-col items-center gap-5">
          <Gauge size={40} weight="duotone" className="text-primary shrink-0" aria-hidden />
          <div>
            <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 block">
              Empty km & broker drag
            </span>
            <h2 className="text-4xl font-sans font-bold mb-6">What deadhead diesel costs you</h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
              Slide fleet size and empty percentage—a rough ETB wake-up call. True savings need your fuel slips, broker cuts, and lane contracts.
            </p>
          </div>
        </div>

        <div className="bento-card grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <label className="block text-xs font-mono text-muted-foreground uppercase">Trucks on the road</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="1"
                  max="160"
                  value={trucks}
                  onChange={(e) => setTrucks(parseInt(e.target.value))}
                  className="flex-1 accent-primary"
                />
                <span className="font-mono font-bold text-2xl min-w-[50px]">{trucks}</span>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-xs font-mono text-muted-foreground uppercase">Empty / dead-head kms (%)</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="65"
                  value={emptyKmPct}
                  onChange={(e) => setEmptyKmPct(parseInt(e.target.value))}
                  className="flex-1 accent-primary"
                />
                <span className="font-mono font-bold text-2xl min-w-[50px]">{emptyKmPct}%</span>
              </div>
            </div>
          </div>

          <div className="bg-card/50 border border-primary/30 rounded-xl p-8 flex flex-col items-center justify-center text-center">
            <p className="text-xs font-mono text-muted-foreground uppercase mb-4 flex items-center justify-center gap-3">
              <Gauge size={20} weight="duotone" className="text-primary shrink-0" aria-hidden /> Sample yearly ETB
            </p>
            <motion.p key={savings} initial={{ scale: 1.05, opacity: 0.65 }} animate={{ scale: 1, opacity: 1 }} className="text-3xl md:text-4xl font-mono font-bold text-primary tracking-tighter">
              {formatEtb(savings)}
            </motion.p>
            <p className="text-[11px] text-muted-foreground mt-4 max-w-xs">
              Demo maths only—real savings need your fuel slips, POD rules, lanes, credits.
            </p>
            <Link href="/demo" className="mt-8 vektor-btn-primary w-full inline-flex items-center justify-center">
              See how we cut empty km <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
