"use client";

import { motion } from "framer-motion";
import { Waypoints, Eye, RefreshCcw, BookOpen } from "lucide-react";

const coreValues = [
  {
    id: "connected",
    title: "CONNECTED OPERATIONS",
    description: "Trips, drivers, live tracking coordinates, and digital delivery evidence function together within a single unified operational ledger.",
    icon: Waypoints,
  },
  {
    id: "visibility",
    title: "LIVE VISIBILITY",
    description: "Instantly locate active trips and monitor route progression without constant back-and-forth manual follow-ups.",
    icon: Eye,
  },
  {
    id: "continuity",
    title: "FIELD-TO-OFFICE CONTINUITY",
    description: "Documents and details scanned by drivers on the road immediately synchronize with central operations back at the dispatch office.",
    icon: RefreshCcw,
  },
  {
    id: "adoption",
    title: "GUIDED ADOPTION",
    description: "No hands-off software drops. SWIFTIAM provides structural, local support to onboard and train your staff properly.",
    icon: BookOpen,
  }
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#101D30] w-full py-24 lg:py-32 border-t border-[#1a2436]">
      <div className="max-w-[1800px] mx-auto px-8 lg:px-12 w-full">
        
        <div className="flex flex-col items-center text-center mb-16 lg:mb-20 max-w-[1000px] mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-[#00D4FF] text-[11px] font-bold tracking-[0.08em] uppercase mb-5 block"
          >
            CORE VALUE
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-[34px] md:text-[42px] lg:text-[48px] text-white leading-[1.1] tracking-tight"
          >
            Why transport teams choose a connected operating workflow
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-[1400px] mx-auto">
          {coreValues.map((value, index) => {
            const Icon = value.icon;
            
            return (
              <motion.div
                key={value.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#0A1220] border border-[#1a2436] rounded-xl p-8 lg:p-10 flex flex-col sm:flex-row items-start gap-6 lg:gap-8 hover:border-[#00D4FF]/30 transition-colors duration-300 shadow-lg shadow-black/10 group"
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-[#00D4FF]/10 flex items-center justify-center group-hover:bg-[#00D4FF]/20 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-[#00D4FF]" strokeWidth={2} />
                </div>

                <div className="flex flex-col">
                  <h3 className="text-white font-bold text-[15px] tracking-[0.05em] uppercase mb-3">
                    {value.title}
                  </h3>
                  <p className="text-slate-400 text-[14px] lg:text-[15px] leading-[1.7]">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}