"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";

const cardKeys = ["local_operations", "mobile_driver_app", "local_support", "live_fleet_tracking"] as const;

export default function EthiopianContext() {
  const [isZoomed, setIsZoomed] = useState(false);
  const t = useTranslations("EthiopianContext");

  return (
    <section id="company" className="bg-[#060B14] w-full py-24 lg:py-32 border-t border-[#1a2436]">
      <div className="max-w-[1800px] mx-auto px-8 lg:px-12 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
          
          <div className="lg:col-span-6 flex flex-col">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="text-[#00D4FF] text-[11px] font-bold tracking-[0.08em] uppercase mb-5 block"
            >
              {t('pill')}
            </motion.span>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-serif text-[34px] lg:text-[44px] text-white leading-[1.1] tracking-tight mb-6"
            >
              {t('title1')}<br className="hidden md:block" /> {t('title2')}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-slate-400 text-[14px] lg:text-[15.5px] leading-relaxed max-w-[600px] mb-12"
            >
              {t('description')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-[#1a2436] bg-[#0A1220] shadow-lg shadow-black/20 max-w-[650px] cursor-pointer group"
              onClick={() => setIsZoomed(true)}
            >
              <Image
                src="/trips.png"
                alt="Trips Management"
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-[#00D4FF]/0 group-hover:bg-[#00D4FF]/10 transition-colors duration-300 flex items-center justify-center">
                <div className="bg-[#060B14]/80 text-white text-[12px] font-medium px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm transform translate-y-2 group-hover:translate-y-0">
                  {t('click_hint') || "Click to enlarge"}
                </div>
              </div>
            </motion.div>

          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6 lg:mt-[90px]">
            {cardKeys.map((key, index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                className="bg-[#0A1220] border border-[#1a2436] rounded-xl p-7 lg:p-8 flex flex-col h-full hover:border-[#00D4FF]/30 transition-colors duration-300"
              >
                <h4 className="text-[#00D4FF] text-[11px] font-bold tracking-wide uppercase mb-4">
                  {t(`cards.${key}.title`)}
                </h4>
                <p className="text-slate-400 text-[13px] lg:text-[14px] leading-[1.7]">
                  {t(`cards.${key}.description`)}
                </p>
              </motion.div>
            ))}
          </div>

        </div>

      </div>

      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#060B14]/95 backdrop-blur-md p-4 md:p-12 cursor-zoom-out"
            onClick={() => setIsZoomed(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-[1400px] h-[85vh] rounded-2xl overflow-hidden shadow-2xl cursor-default bg-[#0A1220] border border-[#1a2436]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src="/trips.png"
                fill
                className="object-contain p-2"
                alt="Enlarged Trips Management View"
                priority
              />

              <button
                className="absolute top-4 right-4 text-slate-300 bg-[#060B14] border border-[#1a2436] hover:text-white hover:border-[#00D4FF] rounded-full p-2.5 transition-colors shadow-lg z-50"
                onClick={() => setIsZoomed(false)}
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