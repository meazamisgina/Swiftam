"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";

const cardKeys = ["dispatch", "driver", "vault"] as const;

const cardImages: Record<(typeof cardKeys)[number], string> = {
  dispatch: "/dispatch.png",
  driver: "/hero-bg.png",
  vault: "/vault.png",
};

export default function SoftwareViews() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const t = useTranslations("SoftwareViews");

  return (
    <section id="platform" className="bg-[#060B14] w-full py-24 lg:py-32 relative">
      <div className="max-w-[1800px] mx-auto px-8 lg:px-12 w-full">
        
        <div className="flex flex-col items-center text-center mb-16 lg:mb-24 max-w-[800px] mx-auto">
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
            className="font-serif text-[34px] md:text-[42px] lg:text-[48px] text-white leading-[1.1] tracking-tight mb-6 lg:whitespace-nowrap"
          >
            {t('title')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-400 text-[15px] lg:text-[17px] leading-relaxed max-w-[650px]"
          >
            {t('description')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {cardKeys.map((key, index) => {
            const imageSrc = cardImages[key];

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="bg-[#0A1220] border border-[#1a2436] rounded-2xl p-8 lg:p-10 flex flex-col h-full shadow-lg shadow-black/20"
              >
                <h3 className="font-serif text-[26px] lg:text-[30px] text-white tracking-tight mb-2">
                  {t(`cards.${key}.title`)}
                </h3>
                <h4 className="text-[#00D4FF] text-[14px] lg:text-[15px] font-medium mb-5">
                  {t(`cards.${key}.subtitle`)}
                </h4>
                <p className="text-slate-400 text-[14px] lg:text-[15px] leading-[1.7] mb-12">
                  {t(`cards.${key}.description`)}
                </p>

                <div 
                  className="mt-auto w-full rounded-xl overflow-hidden border border-[#1a2436] cursor-pointer group relative shadow-2xl bg-[#060B14]"
                  onClick={() => setSelectedImage(imageSrc)}
                >
                  <div className="relative w-full aspect-[4/3]">
                    <Image 
                      src={imageSrc}
                      alt={`${t(`cards.${key}.title`)} Interface`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-[#00D4FF]/0 group-hover:bg-[#00D4FF]/10 transition-colors duration-300 flex items-center justify-center">
                      <div className="bg-[#060B14]/80 text-white text-[12px] font-medium px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm transform translate-y-2 group-hover:translate-y-0">
                        {t('click_hint')}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#060B14]/95 backdrop-blur-md p-4 md:p-12 cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
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
                src={selectedImage} 
                fill 
                className="object-contain p-2" 
                alt="Enlarged Interface View" 
                priority
              />
              
              <button 
                className="absolute top-4 right-4 text-slate-300 bg-[#060B14] border border-[#1a2436] hover:text-white hover:border-[#00D4FF] rounded-full p-2.5 transition-colors shadow-lg z-50"
                onClick={() => setSelectedImage(null)}
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