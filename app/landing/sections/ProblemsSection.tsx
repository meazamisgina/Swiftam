"use client";

import { motion } from "framer-motion";
import {
  ArrowsClockwise,
  GasPump,
  UserCircle,
  MapPin,
  CloudSlash,
  Handshake,
  CurrencyCircleDollar,
} from "@phosphor-icons/react";

const problems = [
  { icon: GasPump, title: "Fuel", desc: "Litres per lane—not guesses. Spot side-selling patterns faster." },
  { icon: UserCircle, title: "Drivers", desc: "Who drove, who stalled, and why—without chasing voice notes." },
  { icon: MapPin, title: "Live trips", desc: "Pin on the map: queue at the border, wait at the woreda gate, downtime at the yard." },
  { icon: CloudSlash, title: "Poor signal", desc: "Capture trips offline; sync when bars return." },
  { icon: Handshake, title: "Brokers & delala", desc: "Fewer rounds of calls—rates and handoffs written next to the load." },
  { icon: ArrowsClockwise, title: "Empty return legs", desc: "Djibouti runs should pay round-trip, not a dead drive home." },
  { icon: CurrencyCircleDollar, title: "Money", desc: "Who paid, who still owes, tied to each truck and trip." },
];

export default function ProblemsSection() {
  return (
    <section id="problems" className="py-24 px-6 bg-card/40 border-y border-border/60">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 max-w-3xl mx-auto"
        >
          <span className="text-primary font-mono text-xs tracking-[0.25em] uppercase block mb-3">
            Ethiopian fleets
          </span>
          <h2 className="text-3xl md:text-5xl font-sans font-bold tracking-tight mb-4">
            Seven daily headaches—one system
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            Paper run sheets, broker chatter, and empty backhauls—make them legible before cash walks out the door.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {problems.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.04 }}
              className="bento-card p-6 flex flex-col gap-3 hover:border-primary/30 transition-colors"
            >
              <item.icon className="text-primary" size={40} weight="duotone" />
              <h3 className="text-lg font-sans font-bold">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
