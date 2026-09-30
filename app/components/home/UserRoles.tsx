"use client";

import { motion } from "framer-motion";
import { Network, PhoneCall, Truck, Calculator } from "lucide-react";
import { useTranslations } from "next-intl";

const roleKeys = ["fleet", "dispatch", "drivers", "finance"] as const;
const icons = [Network, PhoneCall, Truck, Calculator];

export default function UserRoles() {
  const t = useTranslations("UserRoles");

  return (
    <section className="bg-[#101D30] w-full py-24 lg:py-32 border-t border-[#1a2436]">
      <div className="max-w-[1800px] mx-auto px-8 lg:px-12 w-full">
        
        <div className="mb-16 lg:mb-20 max-w-[900px]">
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
            className="font-serif text-[34px] md:text-[42px] lg:text-[48px] text-white leading-[1.1] tracking-tight lg:whitespace-nowrap"
          >
            {t('title')}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {roleKeys.map((key, index) => {
            const Icon = icons[index];
            
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#0A1220] border border-[#1a2436] hover:border-[#00D4FF]/30 transition-colors duration-300 rounded-xl p-8 flex flex-col h-full shadow-lg shadow-black/10 group"
              >
                <div className="w-12 h-12 rounded-lg bg-[#00D4FF]/10 flex items-center justify-center mb-8 group-hover:bg-[#00D4FF]/20 transition-colors duration-300">
                  <Icon className="w-5 h-5 text-[#00D4FF]" strokeWidth={2} />
                </div>

                <h3 className="font-serif text-[20px] lg:text-[22px] text-white tracking-tight mb-4 leading-[1.3]">
                  {t(`roles.${key}.title`)}
                </h3>
                <p className="text-slate-400 text-[14px] lg:text-[15px] leading-[1.7]">
                  {t(`roles.${key}.description`)}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}