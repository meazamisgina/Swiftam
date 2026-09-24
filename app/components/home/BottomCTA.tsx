"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function BottomCTA() {
  return (
    <section className="relative bg-[#0A1220] w-full min-h-[600px] flex flex-col justify-center py-24 lg:py-0 border-t border-[#1a2436] overflow-hidden">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-[#00D4FF]/[0.06] blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-[1800px] mx-auto px-8 lg:px-12 w-full flex flex-col items-center text-center">
        
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-[#00D4FF] text-[11px] font-bold tracking-[0.08em] uppercase mb-6 block"
        >
          OPERATIONS CONNECTED
        </motion.span>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-serif text-[38px] md:text-[46px] lg:text-[50px] text-white leading-[1.1] tracking-tight mb-6 lg:whitespace-nowrap"
        >
          Your operation is moving. Make it easier to manage.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-slate-400 text-[15px] lg:text-[16px] leading-[1.8] max-w-[800px] mb-10"
        >
          See how SWIFTIAM can consolidate your dispatch, drivers, status tracking, evidence storage,<br className="hidden md:block" /> and administrative settlements into one single operational environment.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-5"
        >
          <Link href="/book-demo" className="bg-[#00D4FF] hover:bg-[#00bfe6] text-[#0A1220] text-[15px] px-8 py-3.5 flex items-center gap-2.5 rounded font-semibold transition-colors shadow-[0_0_15px_rgba(0,212,255,0.2)]">
            Book a Live Demo
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
          
          <Link href="/tour" className="bg-transparent border border-[#1E293B] hover:border-[#00D4FF]/50 text-white text-[15px] px-8 py-3.5 flex items-center gap-3 rounded font-medium transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-0.5">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            Watch Product Tour
          </Link>
        </motion.div>

      </div>
    </section>
  );
}