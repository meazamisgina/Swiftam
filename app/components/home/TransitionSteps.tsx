"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const stepsData = [
  {
    id: "01",
    title: "Understand",
    description: "We map your current regional transport workflows, route networks, and check-point setups."
  },
  {
    id: "02",
    title: "Configure",
    description: "SWIFTIAM is set up around your operational structures, user roles, and documentation rules."
  },
  {
    id: "03",
    title: "Connect",
    description: "Dispatchers and drivers are systematically trained and welcomed into the daily digital workflow."
  },
  {
    id: "04",
    title: "Go Live",
    description: "Your team begins managing trips in real-time, backed by our continuous hands-on local support."
  }
];

export default function TransitionSteps() {
  return (
    <section className="bg-[#060B14] w-full py-20 lg:py-28 border-t border-[#1a2436]">
      <div className="max-w-[1800px] mx-auto px-8 lg:px-12 w-full">
        
        <div className="flex flex-col items-center text-center mb-16 lg:mb-20 max-w-[1200px] mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-[#00D4FF] text-[11px] font-bold tracking-[0.08em] uppercase mb-4 block"
          >
            OUR METHOD
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-[32px] md:text-[40px] lg:text-[46px] text-white leading-[1.1] tracking-tight w-full"
          >
            You don't have to change your operation overnight.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 w-full">
          {stepsData.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative bg-[#0A1220] border border-[#1a2436] rounded-xl p-8 lg:p-10 flex flex-col h-full hover:border-[#00D4FF]/30 transition-colors duration-300 shadow-lg shadow-black/20"
            >
              <div className="absolute top-8 right-8 w-1.5 h-1.5 rounded-full bg-[#00D4FF]/60 shadow-[0_0_10px_rgba(0,212,255,0.4)]" />

              <h3 className="text-[#00D4FF] text-[24px] lg:text-[28px] font-medium tracking-tight mb-4">
                {step.id}
              </h3>

              <h4 className="font-serif text-white text-[20px] lg:text-[22px] tracking-tight mb-3">
                {step.title}
              </h4>

              <p className="text-slate-400 text-[14px] lg:text-[15px] leading-[1.7]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-14 lg:mt-16 flex justify-center"
        >
          <Link href="/book-demo" className="bg-[#00D4FF] hover:bg-[#00bfe6] text-[#060B14] text-[15px] px-8 py-3.5 flex items-center gap-2.5 rounded font-semibold transition-colors shadow-[0_0_15px_rgba(0,212,255,0.2)]">
            Book a Live Demo
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}