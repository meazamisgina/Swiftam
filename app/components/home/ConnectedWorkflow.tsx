"use client";

import { motion } from "framer-motion";
import { ClipboardList, Crosshair, Camera, ShieldCheck, Building2, TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";

const pipelineIcons = [ClipboardList, Crosshair, Camera, ShieldCheck, Building2, TrendingUp];
const stepKeys = ["assign", "track", "capture", "verify", "settle", "report"] as const;

export default function ConnectedWorkflow() {
  const t = useTranslations("ConnectedWorkflow");

  return (
    <section id="how-it-works" className="bg-[#101D30] w-full py-20 lg:py-28 border-t border-[#1a2436]">
      <div className="max-w-[1800px] mx-auto px-8 lg:px-12 w-full">
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 mb-20 lg:mb-24">
          <div className="max-w-[850px]">
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
              className="font-serif text-[34px] md:text-[42px] lg:text-[48px] text-white leading-[1.1] tracking-tight"
            >
              {t('title1')}<br className="hidden md:block" /> {t('title2')}
            </motion.h2>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-[450px] lg:pb-2"
          >
            <p className="text-slate-400 text-[14px] lg:text-[15px] leading-relaxed">
              {t('description')}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-y-12 lg:gap-y-0">
          {stepKeys.map((key, index) => {
            const Icon = pipelineIcons[index];
            
            return (
              <motion.div 
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex flex-col pr-6 lg:pr-0"
              >
                
                {index !== stepKeys.length - 1 && (
                  <div className="hidden lg:block absolute top-[28px] left-[56px] w-full h-[1px] bg-white/10">
                    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#00D4FF]" />
                  </div>
                )}

                <div className="w-[56px] h-[56px] rounded-full border border-[#00D4FF] bg-[#101D30] flex items-center justify-center relative z-10 mb-5 shadow-[0_0_15px_rgba(0,212,255,0.05)]">
                  <Icon className="w-[22px] h-[22px] text-[#00D4FF]" strokeWidth={1.5} />
                </div>

                <div className="flex items-center gap-1.5 mb-1.5">
                  <h4 className="text-white font-bold text-[11px] tracking-wider uppercase">
                    {t(`steps.${key}.title`)}
                  </h4>
                  <span className="text-[#00D4FF] text-[9px] font-bold opacity-90">
                    0{index + 1}
                  </span>
                </div>
                
                <p className="text-slate-400 text-[12px] lg:text-[13px] leading-relaxed max-w-[200px]">
                  {t(`steps.${key}.description`)}
                </p>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}