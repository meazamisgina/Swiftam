"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: "01",
    question: "Does SWIFTIAM support live GPS tracking?",
    answer: "Yes. The platform integrates with various standard vehicle GPS models, consolidating positional data directly onto the central dispatch dashboard."
  },
  {
    id: "02",
    question: "Is the driver app available?",
    answer: "Yes. The dedicated driver utility is available for standard smartphone setups, specifically engineered for low-data network optimization on long transport corridors."
  },
  {
    id: "03",
    question: "What can drivers do in the app?",
    answer: "Drivers can receive active trip instructions, view destination routes, report status progress, and instantly scan waybills/proof-of-delivery documents using the built-in scanner tool."
  },
  {
    id: "04",
    question: "Does SWIFTIAM track fuel?",
    answer: "The platform records critical trip-related operational logs and evidence metrics, which feed seamlessly into your existing management accounting systems."
  },
  {
    id: "05",
    question: "How does settlement work?",
    answer: "Trip documents uploaded by drivers immediately map against dispatch records, letting your administrative team perform quick, verified partial settlements without physical paper delays."
  },
  {
    id: "06",
    question: "What payment integrations are available?",
    answer: "SWIFTIAM currently supports partial settlement automation and cost verification. We are actively evaluating local digital payment providers for future direct integration to support regional financial frameworks."
  },
  {
    id: "07",
    question: "What languages are supported?",
    answer: "The SWIFTIAM platform interface is currently available in English, ensuring clear workflows from administrators down to drivers. Our informational website can be viewed in both English and Amharic."
  },
  {
    id: "08",
    question: "How does pricing work?",
    answer: "We partner directly with enterprise fleets through custom, contract-based agreements. Contact our team to discuss your operational needs and receive a tailored quotation."
  },
  {
    id: "09",
    question: "How do we get started?",
    answer: "Book a live online demo today. Our team will connect with your management to plan a staged, on-site setup."
  }
];

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const leftColumnFaqs = faqData.filter((_, index) => index % 2 === 0);
  const rightColumnFaqs = faqData.filter((_, index) => index % 2 !== 0);

  const renderFAQ = (faq: FAQItem, index: number) => {
    const isOpen = openId === faq.id;

    return (
      <motion.div
        key={faq.id}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        className={`bg-[#101D30] border rounded-xl overflow-hidden transition-colors duration-300 ${
          isOpen ? "border-[#00D4FF]/40 shadow-lg shadow-[#00D4FF]/5" : "border-[#1a2436] hover:border-[#1a2436]/80"
        }`}
      >
        <button
          onClick={() => toggleFAQ(faq.id)}
          className="w-full flex items-center justify-between p-6 lg:p-7 text-left outline-none cursor-pointer"
        >
          <h3 className="font-serif text-[16px] lg:text-[18px] font-medium text-white pr-4 leading-snug">
            {faq.question}
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
                  {faq.answer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <section className="bg-[#060B14] w-full py-20 lg:py-28 border-t border-[#1a2436]">
      <div className="max-w-[1800px] mx-auto px-8 lg:px-12 w-full">
        
        <div className="flex flex-col items-center text-center mb-16 lg:mb-20 max-w-[800px] mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-[#00D4FF] text-[11px] font-bold tracking-[0.08em] uppercase mb-4 block"
          >
            QUESTIONS
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-[34px] md:text-[40px] lg:text-[44px] text-white leading-[1.1] tracking-tight"
          >
            Frequently Asked Questions
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 max-w-[1600px] mx-auto items-start">
          
          <div className="flex flex-col gap-6">
            {leftColumnFaqs.map((faq, index) => renderFAQ(faq, index))}
          </div>

          <div className="flex flex-col gap-6">
            {rightColumnFaqs.map((faq, index) => renderFAQ(faq, index))}
          </div>

        </div>

      </div>
    </section>
  );
}