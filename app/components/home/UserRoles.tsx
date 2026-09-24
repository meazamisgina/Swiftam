"use client";

import { motion } from "framer-motion";
import { Network, PhoneCall, Truck, Calculator } from "lucide-react";

interface RoleCard {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const rolesData: RoleCard[] = [
  {
    id: "fleet",
    title: "Fleet & Transport Managers",
    description: "See fleet activity, trip progress and operational records in one place. No more relying on disjointed status spreadsheets.",
    icon: Network,
  },
  {
    id: "dispatch",
    title: "Dispatch Teams",
    description: "Assign trips, coordinate drivers and stay on top of active operations with instant digital handoffs and real-time confirmations.",
    icon: PhoneCall,
  },
  {
    id: "drivers",
    title: "Drivers",
    description: "Accept orders, share locations effortlessly and upload trip evidence directly from the field with a localized, lightweight app.",
    icon: Truck,
  },
  {
    id: "finance",
    title: "Finance & Operations",
    description: "Work from complete operational records rather than loose paperwork as trips move steadily toward financial closeout and settlement.",
    icon: Calculator,
  }
];

export default function UserRoles() {
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
            USER ROLES
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-[34px] md:text-[42px] lg:text-[48px] text-white leading-[1.1] tracking-tight lg:whitespace-nowrap"
          >
            Built for the people keeping freight moving.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {rolesData.map((role, index) => {
            const Icon = role.icon;
            
            return (
              <motion.div
                key={role.id}
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
                  {role.title}
                </h3>
                <p className="text-slate-400 text-[14px] lg:text-[15px] leading-[1.7]">
                  {role.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}