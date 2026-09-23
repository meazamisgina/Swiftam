"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const contextCards = [
  {
    title: "LOCAL OPERATIONS",
    description: "Transport workflows designed natively around the actual way Ethiopian fleets and dispatch teams operate."
  },
  {
    title: "MOBILE DRIVER APP",
    description: "Keep the field connected to dispatch. Drivers can accept orders, update trip statuses, and upload proof-of-delivery evidence directly from their phones."
  },
  {
    title: "LOCAL SUPPORT",
    description: "No remote-only troubleshooting. Our local team conducts guided on-site implementations and training."
  },
  {
    title: "LIVE FLEET TRACKING",
    description: "Maintain total visibility over your assets. SWIFTIAM includes built-in GPS tracking so you always know where your trucks and active loads are."
  }
];

export default function EthiopianContext() {
  return (
    <section className="bg-[#060B14] w-full py-24 lg:py-32">
      <div className="max-w-[1800px] mx-auto px-8 lg:px-12 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <div className="lg:col-span-7 flex flex-col pr-0 lg:pr-8">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="text-[#00D4FF] text-[11px] font-bold tracking-[0.08em] uppercase mb-5 block"
            >
              LOCAL CONTEXT
            </motion.span>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-serif text-[38px] md:text-[46px] lg:text-[52px] text-white leading-[1.1] tracking-tight mb-6"
            >
              Built around the realities of Ethiopian<br className="hidden md:block" /> freight operations.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-slate-400 text-[14px] lg:text-[15.5px] leading-relaxed max-w-[650px] mb-12 lg:mb-16"
            >
              Transport operations in Ethiopia often span long routes, multiple regional check-points, and changing terminal conditions. SWIFTIAM consolidates the operational coordinates your team needs into one connected flow.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative w-full max-w-[750px] aspect-[16/10] md:aspect-[16/9] rounded-xl overflow-hidden border border-[#1a2436] shadow-2xl shadow-black/40 bg-[#0A1220]"
            >
              <Image 
                src="/hero-bg.png" 
                alt="Ethiopian Corridor Monitor Dashboard"
                fill
                className="object-cover opacity-60 hover:opacity-80 transition-opacity duration-500"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#060B14]/80 via-transparent to-transparent pointer-events-none" />
            </motion.div>

          </div>

          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6 lg:mt-[110px]">
            {contextCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                className="bg-[#0A1220] border border-[#1a2436] rounded-xl p-7 lg:p-8 flex flex-col h-full hover:border-[#00D4FF]/30 transition-colors duration-300 shadow-lg shadow-black/10"
              >
                <h4 className="text-[#00D4FF] text-[11px] font-bold tracking-[0.05em] uppercase mb-4">
                  {card.title}
                </h4>
                <p className="text-slate-400 text-[13px] lg:text-[14.5px] leading-[1.7]">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}