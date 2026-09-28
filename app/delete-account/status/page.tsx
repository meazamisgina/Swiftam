"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CheckStatus() {
  return (
    <div className="min-h-screen bg-[#060B14] pt-32 pb-24 selection:bg-[#00D4FF]/30">
      <div className="max-w-[600px] mx-auto px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-slate-500 text-[11px] font-bold tracking-[0.08em] uppercase mb-4 block">
            Privacy Center
          </span>
          <h1 className="font-serif text-[36px] md:text-[42px] text-white leading-[1.1] tracking-tight mb-6">
            Check your deletion request
          </h1>
          <p className="text-slate-400 text-[14px] leading-[1.7] mb-10">
            Enter the status code you received when you confirmed your deletion request. You can cancel the request as long as processing has not started.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-[#0A1220] border border-[#1a2436] rounded-xl p-6 md:p-8 mb-8 shadow-lg"
        >
          <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-2">
              <label className="text-white text-[13px] font-medium ml-1">Status code</label>
              <input 
                type="text" 
                placeholder="Paste your status code" 
                className="w-full bg-[#060B14] border border-[#1a2436] text-white text-[14px] font-mono px-4 py-3.5 rounded-lg placeholder-slate-600 focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] transition-all"
                required
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-[#00D4FF] hover:bg-[#00bfe6] text-[#060B14] text-[14px] py-3.5 rounded-lg font-bold transition-colors mt-2 shadow-[0_0_15px_rgba(0,212,255,0.2)]"
            >
              Check status
            </button>
          </form>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-slate-400 text-[13px] leading-[1.7] mb-12">
            Lost your status code? <Link href="/delete-account" className="text-[#00D4FF] hover:underline">Submit the same registered email again</Link>. If the request is still waiting to be processed (received, queued, or temporarily on hold) and that email still belongs to your account, we will send a short-lived recovery link that can replace the code. Recovery is not available after processing starts, after completion, after cancellation, or if that email now belongs to a different account.
          </p>

          <hr className="border-[#1a2436] my-8" />
          
          <div className="text-[12px] text-slate-500 flex flex-col gap-2">
            <p>SWIFTIAM • <Link href="/privacy" className="text-[#00D4FF] hover:underline">Privacy Policy</Link></p>
            <p>Questions about your data? <a href="mailto:support@swiftiam.com" className="text-white hover:underline">support@swiftiam.com</a></p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}