"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

const faqKeys = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9"] as const;

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);
  const t = useTranslations("FAQ");

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const leftColumnFaqs = faqKeys.filter((_, index) => index % 2 === 0);
  const rightColumnFaqs = faqKeys.filter((_, index) => index % 2 !== 0);

  const renderFAQ = (key: string, index: number) => {
    const isOpen = openId === key;

    return (
      <motion.div
        key={key}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        className={`bg-[#101D30] border rounded-xl overflow-hidden transition-colors duration-300 ${
          isOpen ? "border-[#00D4FF]/40 shadow-lg shadow-[#00D4FF]/5" : "border-[#1a2436] hover:border-[#1a2436]/80"
        }`}
      >
        <button
          onClick={() => toggleFAQ(key)}
          className="w-full flex items-center justify-between p-6 lg:p-7 text-left outline-none cursor-pointer"
        >
          <h3 className="font-serif text-[16px] lg:text-[18px] font-medium text-white pr-4 leading-snug">
            {t(`items.${key}.question`)}
          </h3>
          
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex-shrink-0"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="px-6 lg:px-7 pb-6 lg:pb-7 pt-0">
                <p className="text-slate-400 text-[14px] lg:text-[14.5px] leading-[1.7]">
                  {t(`items.${key}.answer`)}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <section id="pricing" className="bg-[#060B14] w-full py-20 lg:py-28 border-t border-[#1a2436]">
      <div className="max-w-[1800px] mx-auto px-8 lg:px-12 w-full">
        
        <div className="flex flex-col items-center text-center mb-16 lg:mb-20 max-w-[800px] mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-[#00D4FF] text-[11px] font-bold tracking-[0.08em] uppercase mb-4 block"
          >
            {t('pill')}
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-[34px] md:text-[40px] lg:text-[44px] text-white leading-[1.1] tracking-tight"
          >
            {t('title')}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 max-w-[1600px] mx-auto items-start">
          <div className="flex flex-col gap-6">
            {leftColumnFaqs.map((key, index) => renderFAQ(key, index))}
          </div>
          <div className="flex flex-col gap-6">
            {rightColumnFaqs.map((key, index) => renderFAQ(key, index))}
          </div>
        </div>

      </div>
    </section>
  );
}