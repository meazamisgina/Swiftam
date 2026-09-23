"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { X, ChevronDown } from "lucide-react";

export default function BookDemoPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center py-20 px-4 mt-[80px] bg-[#060B14] relative overflow-hidden">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00D4FF]/[0.05] blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-[650px] bg-[#101D30] border border-[#1a2436] rounded-2xl shadow-2xl relative z-10"
      >
        <Link 
          href="/" 
          className="absolute top-6 right-6 text-slate-400 hover:text-white bg-[#060B14] hover:bg-[#1a2436] border border-[#1a2436] rounded-full p-2 transition-colors z-20"
        >
          <X size={18} />
        </Link>

        <div className="p-8 pb-6 border-b border-[#1a2436]">
          <h1 className="font-serif text-[28px] text-white tracking-tight mb-3">
            Book a live demo
          </h1>
          <p className="text-slate-400 text-[14px] leading-relaxed max-w-[500px]">
            A local specialist walks through SWIFTIAM against your current operation. Response within one working day.
          </p>
        </div>

        <form className="p-8 flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
          
          <div className="flex flex-col gap-2">
            <label className="text-slate-300 text-[12px] font-medium ml-1">Full name</label>
            <input 
              type="text" 
              placeholder="Abel Tesfaye" 
              className="w-full bg-[#060B14] border border-[#1a2436] text-white text-[14px] px-4 py-3 rounded-lg placeholder-slate-600 focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-slate-300 text-[12px] font-medium ml-1">Phone number</label>
              <div className="flex w-full">
                <div className="bg-[#1a2436]/50 border border-r-0 border-[#1a2436] text-slate-400 text-[14px] px-3 py-3 rounded-l-lg flex items-center justify-center gap-1">
                  +251 <ChevronDown size={14} className="opacity-70"/>
                </div>
                <input 
                  type="tel" 
                  placeholder="91 234 5678" 
                  className="w-full bg-[#060B14] border border-[#1a2436] text-white text-[14px] px-3 py-3 rounded-r-lg placeholder-slate-600 focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-slate-300 text-[12px] font-medium ml-1">Email address</label>
              <input 
                type="email" 
                placeholder="abel@company.com" 
                className="w-full bg-[#060B14] border border-[#1a2436] text-white text-[14px] px-4 py-3 rounded-lg placeholder-slate-600 focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-slate-300 text-[12px] font-medium ml-1">Company</label>
            <input 
              type="text" 
              placeholder="Company name" 
              className="w-full bg-[#060B14] border border-[#1a2436] text-white text-[14px] px-4 py-3 rounded-lg placeholder-slate-600 focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2 relative">
              <label className="text-slate-300 text-[12px] font-medium ml-1">Fleet size</label>
              <select defaultValue="" className="w-full bg-[#060B14] border border-[#1a2436] text-white text-[14px] px-4 py-3 rounded-lg appearance-none focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] transition-all cursor-pointer">
                <option value="" disabled className="text-slate-600">Select</option>
                <option value="1-10">1 - 10 trucks</option>
                <option value="11-50">11 - 50 trucks</option>
                <option value="51-200">51 - 200 trucks</option>
                <option value="200+">200+ trucks</option>
              </select>
              <ChevronDown size={16} className="absolute right-4 top-[38px] text-slate-500 pointer-events-none" />
            </div>

            <div className="flex flex-col gap-2 relative">
              <label className="text-slate-300 text-[12px] font-medium ml-1">Preferred language</label>
              <select defaultValue="english" className="w-full bg-[#060B14] border border-[#1a2436] text-white text-[14px] px-4 py-3 rounded-lg appearance-none focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] transition-all cursor-pointer">
                <option value="english">English</option>
                <option value="amharic">Amharic</option>
              </select>
              <ChevronDown size={16} className="absolute right-4 top-[38px] text-slate-500 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-slate-300 text-[12px] font-medium ml-1">Primary challenge</label>
            <textarea 
              rows={3}
              placeholder="e.g. PODs arrive late and fuel costs are hard to verify" 
              className="w-full bg-[#060B14] border border-[#1a2436] text-white text-[14px] px-4 py-3 rounded-lg placeholder-slate-600 focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] transition-all resize-none"
            />
          </div>

          <div className="pt-2 flex flex-col items-center gap-4">
            <button 
              type="submit"
              className="w-full bg-[#00D4FF] hover:bg-[#00bfe6] text-[#060B14] text-[15px] py-3.5 rounded-lg font-bold transition-colors shadow-[0_0_15px_rgba(0,212,255,0.2)]"
            >
              Request demo
            </button>
            <span className="text-slate-500 text-[12px]">
              Response within 24 hours
            </span>
          </div>

        </form>
      </motion.div>
    </div>
  );
}