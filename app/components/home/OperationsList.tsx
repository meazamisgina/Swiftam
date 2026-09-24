"use client";

import { motion } from "framer-motion";

interface OperationFeature {
  id: string;
  label: string;
  title: string;
  description: string;
}

const features: OperationFeature[] = [
  {
    id: "01",
    label: "DISPATCH",
    title: "Still coordinating trips through calls and messages?",
    description: "SWIFTIAM gives dispatch teams one place to create trips, assign drivers and follow active operations."
  },
  {
    id: "02",
    label: "ON THE ROAD",
    title: "Need to know where a truck is without calling the driver?",
    description: "Live GPS tracking gives your team visibility into active trips while drivers keep updating from the mobile app."
  },
  {
    id: "03",
    label: "DELIVERY",
    title: "Still waiting for physical proof before a trip can move forward?",
    description: "Drivers can capture and upload delivery evidence from the field, keeping trip records together."
  },
  {
    id: "04",
    label: "CLOSEOUT",
    title: "Still piecing together trip information before settlement?",
    description: "SWIFTIAM brings trip records and evidence together to support a more organized settlement workflow, with partial settlement automation."
  }
];

export default function OperationsList() {
  return (
    <section id="solutions" className="bg-[#060B14] w-full py-16 lg:py-20">
      <div className="max-w-[1800px] mx-auto px-8 lg:px-12 w-full">
        
        <div className="mb-12 lg:mb-14 max-w-[1200px]">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-[#00D4FF] text-[11px] font-bold tracking-[0.08em] uppercase mb-4 block"
          >
            OPERATIONAL PAIN POINTS
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-[34px] md:text-[42px] lg:text-[48px] text-white leading-[1.1] tracking-tight"
          >
            Your operation is already moving.<br />
            SWIFTIAM helps you see and control it.
          </motion.h2>
        </div>

        <div className="flex flex-col border-t border-b border-[#1a2436] divide-y divide-[#1a2436]">
          {features.map((feature, index) => (
            <motion.div 
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-16 py-6 lg:py-8"
            >
              <div className="md:col-span-2 flex flex-col gap-1">
                <span className="text-[#00D4FF] text-[14px] font-bold">
                  {feature.id}
                </span>
                <span className="text-slate-400 text-[11px] font-bold tracking-[0.08em] uppercase">
                  {feature.label}
                </span>
              </div>
              
              <div className="md:col-span-5 flex items-start pr-4 lg:pr-8">
                <h3 className="text-white font-serif text-[18px] lg:text-[21px] leading-[1.35] tracking-tight">
                  {feature.title}
                </h3>
              </div>
              
              <div className="md:col-span-5 flex items-start">
                <p className="text-slate-400 text-[14px] lg:text-[15px] leading-relaxed w-full pr-4 lg:pr-12">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}