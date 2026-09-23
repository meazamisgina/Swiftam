"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full flex items-center pt-16 pb-20 overflow-hidden min-h-[calc(100vh-76px)] mt-[76px]">
      
      <div className="absolute inset-0 z-0 bg-[#0A1220]">
        <Image
          src="/hero-bg.png"
          alt="Freight Operations Background"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      <div className="max-w-[1800px] mx-auto px-8 lg:px-12 relative z-20 w-full">
        
        <div className="max-w-[1400px]">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 border border-[#00D4FF] bg-transparent rounded-full px-3.5 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]" />
              <span className="text-[#00D4FF] text-[11px] font-bold tracking-[0.08em] uppercase">
                ETHIOPIAN TRANSPORT OPERATIONS PLATFORM
              </span>
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-serif text-[48px] md:text-[60px] lg:text-[70px] font-medium text-white leading-[1.05] tracking-tight mb-8"
          >
            Manage every truck, trip, driver and<br className="hidden md:block" /> settlement from one platform.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-[16px] md:text-[18px] text-slate-300 mb-10 max-w-[675px] leading-relaxed"
          >
            SWIFTIAM connects dispatch, live vehicle tracking, driver operations, trip evidence and settlement in one place, giving transport teams a clearer view of what is happening from dispatch to closeout.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-7"
          >
            <Link href="/book-demo" className="bg-[#00D4FF] hover:bg-[#00bfe6] text-[#060B14] text-[15px] px-8 py-3.5 flex items-center gap-2.5 rounded font-semibold transition-colors shadow-[0_0_15px_rgba(0,212,255,0.2)]">
              Book a Live Demo
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            
            <Link href="/tour" className="group flex items-center gap-2.5 text-[15px]">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:scale-110">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
              <span className="text-white font-medium underline underline-offset-4 decoration-white/70 group-hover:decoration-white transition-colors">
                Watch Product Tour
              </span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-14 flex items-center gap-2.5 text-[13px] text-slate-400"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Built specifically for transport operations across Ethiopia and East Africa
          </motion.div>

        </div>
      </div>
    </section>
  );
}