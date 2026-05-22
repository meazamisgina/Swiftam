"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChatCircle, DeviceMobile, Kanban, Receipt } from "@phosphor-icons/react";

const steps = [
  { icon: Kanban, title: "Plan", desc: "Pickups, drops, broker rate—printed on the trip sheet, not only in someone’s head." },
  { icon: ChatCircle, title: "Tell crews", desc: "Ping drivers with the next job before they deadhead home." },
  { icon: DeviceMobile, title: "Drivers roll", desc: "Stamped Bollo snaps, tyre checks, live pin when the tower allows." },
  { icon: Receipt, title: "Close out", desc: "Match advances, fuel slips, and customer cash before the arguments start." },
];

export default function OperationsFlowSection() {
  return (
    <section className="py-20 px-6 bg-card/25 border-y border-border/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 max-w-2xl mx-auto space-y-3">
          <span className="text-primary font-mono text-xs tracking-[0.25em] uppercase block">
            Dispatch → warehouse door
          </span>
          <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight flex flex-wrap justify-center gap-3 items-center">
            Four beats{" "}
            <ArrowRight weight="bold" size={36} className="text-primary/40 hidden md:inline shrink-0" aria-hidden />{" "}
            one flow
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-stretch justify-center gap-4 lg:gap-2 xl:gap-4">
          {steps.map((step, idx) => (
            <Fragment key={step.title}>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
                className="relative flex-1 lg:max-w-[15rem] rounded-xl border border-border bg-background/80 p-6 pt-10 mx-auto w-full lg:mx-0"
              >
                <span className="absolute top-4 left-4 text-[10px] font-mono bg-secondary text-muted-foreground px-2 py-0.5 rounded border border-border">
                  {idx + 1}
                </span>
                <step.icon className="text-primary mx-auto lg:mx-0 mt-6 mb-4" size={48} weight="duotone" aria-hidden />
                <h3 className="text-lg font-sans font-bold text-center lg:text-left mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-snug text-center lg:text-left">{step.desc}</p>
              </motion.div>
              {idx < steps.length - 1 ? (
                <div className="hidden lg:flex items-center justify-center self-center shrink-0 text-primary/40 px-1" aria-hidden>
                  <ArrowRight size={28} weight="bold" />
                </div>
              ) : null}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
