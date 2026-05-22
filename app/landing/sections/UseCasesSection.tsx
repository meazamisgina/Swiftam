"use client";

import { motion } from "framer-motion";
import {
  Buildings,
  Factory,
  GasPump,
  Handshake,
  HardHat,
  Heart,
  Package,
  Plant,
  ShoppingCartSimple,
  Truck,
  UsersThree,
} from "@phosphor-icons/react";

const segments: { Icon: typeof Truck; label: string }[] = [
  { Icon: UsersThree, label: "Co-ops & transport unions" },
  { Icon: Truck, label: "Fleet owners & trucking firms" },
  { Icon: Package, label: "Import & export" },
  { Icon: Heart, label: "NGOs & relief cargo" },
  { Icon: HardHat, label: "Construction & cement runs" },
  { Icon: ShoppingCartSimple, label: "Retail & FMCG" },
  { Icon: Factory, label: "Factories & warehouses" },
  { Icon: GasPump, label: "Fuel & tankers" },
  { Icon: Plant, label: "Farm & agri supply chains" },
  { Icon: Handshake, label: "Brokers (delala) & forwarders" },
];

export default function UseCasesSection() {
  return (
    <section id="use-cases" className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <div className="flex items-start gap-3">
            <Truck size={42} weight="duotone" className="text-primary shrink-0" aria-hidden />
            <div className="min-w-0">
              <span className="text-primary font-mono text-xs tracking-[0.25em] uppercase">
                Who it&apos;s for
              </span>
              <h2 className="text-3xl md:text-5xl font-sans font-bold tracking-tight mt-2">
                If you move cargo in Ethiopia—we fit.
              </h2>
            </div>
          </div>
          <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
            Djibouti port legs, inland reloads, brokered spot loads—same ledger: who moved what, for how much, before the truck rolls.
          </p>
          <div className="rounded-xl border border-border bg-card/50 p-5 mt-8 flex gap-4 items-start">
            <Buildings size={36} weight="duotone" className="text-primary shrink-0" aria-hidden />
            <div className="min-w-0">
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">Areas we cite</p>
              <p className="text-foreground leading-snug text-sm">
                Addis · Mekele · Adama · Hawassa · Kombolcha · Dire · Modjo · Djibouti lane
              </p>
            </div>
          </div>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {segments.map(({ Icon, label }) => (
            <li
              key={label}
              className="flex gap-3 items-center rounded-lg border border-border/80 bg-card/30 px-3 py-3"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/25 bg-primary/5">
                <Icon size={22} weight="duotone" className="text-primary" aria-hidden />
              </span>
              <span className="text-sm text-foreground leading-snug">{label}</span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
