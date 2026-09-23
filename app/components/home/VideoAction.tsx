"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

export default function VideoAction() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="bg-[#101D30] w-full py-20 lg:py-28 border-t border-[#1a2436] relative">
      <div className="max-w-[1800px] mx-auto px-8 lg:px-12 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center w-full">
          
          <div className="lg:col-span-5 flex flex-col pr-0 lg:pr-4">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="text-[#00D4FF] text-[11px] font-bold tracking-[0.08em] uppercase mb-4 block"
            >
              VIDEO OVERVIEW
            </motion.span>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-serif text-[38px] md:text-[44px] lg:text-[48px] text-white leading-[1.1] tracking-tight mb-6 lg:whitespace-nowrap"
            >
              See SWIFTIAM in action
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-slate-400 text-[14px] lg:text-[15.5px] leading-relaxed max-w-[500px] mb-10"
            >
              Take a structured, two-minute look at how dispatch, live route tracking, driver operations, and digital closeout sync together seamlessly across the platform.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link 
                href="/tour" 
                className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#060B14] border border-[#1a2436] rounded text-white text-[14px] font-medium hover:border-[#00D4FF] transition-colors duration-300 group shadow-lg w-max"
              >
                Watch the Product Tour
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
              </Link>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            onClick={() => setIsVideoOpen(true)}
            className="lg:col-span-7 relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden border border-[#1a2436] shadow-2xl shadow-black/50 group cursor-pointer bg-[#060B14]"
          >
            <Image 
              src="/hero-bg.png" 
              alt="SWIFTIAM Product Tour Video Placeholder"
              fill
              className="object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
            />

            <div className="absolute inset-0 bg-[#060B14]/40 group-hover:bg-transparent transition-colors duration-500" />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 rounded-full border-[4px] border-white flex items-center justify-center z-10 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500 backdrop-blur-sm shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="white" className="ml-2">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
            </div>
          </motion.div>

        </div>

      </div>

      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#060B14]/95 backdrop-blur-md p-4 md:p-12"
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-[1200px] aspect-video rounded-2xl overflow-hidden shadow-2xl bg-[#0A1220] border border-[#1a2436]"
              onClick={(e) => e.stopPropagation()} 
            >
              <Image 
                src="/hero-bg.png" 
                fill 
                className="object-cover opacity-60" 
                alt="Video Player" 
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white font-medium text-lg bg-[#060B14]/80 px-6 py-3 rounded-full backdrop-blur-md">
                  Video Player Embedded Here
                </p>
              </div>
              
              <button 
                className="absolute top-4 right-4 text-slate-300 bg-[#060B14] border border-[#1a2436] hover:text-white hover:border-[#00D4FF] rounded-full p-2.5 transition-colors shadow-lg z-50"
                onClick={() => setIsVideoOpen(false)}
              >
                <X size={20} strokeWidth={2} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}