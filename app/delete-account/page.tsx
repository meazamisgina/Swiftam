"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Info, ArrowRight } from "lucide-react";

export default function DeleteAccount() {
  return (
    <div className="min-h-screen bg-[#060B14] pt-32 pb-24 selection:bg-[#00D4FF]/30">
      <div className="max-w-[700px] mx-auto px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-slate-500 text-[11px] font-bold tracking-[0.08em] uppercase mb-4 block">
            Privacy Center
          </span>
          <h1 className="font-serif text-[36px] md:text-[46px] text-white leading-[1.1] tracking-tight mb-6">
            Request deletion of your SWIFTIAM account
          </h1>
          <p className="text-slate-400 text-[15px] leading-[1.7] mb-6">
            This page lets you request deletion of your SWIFTIAM Driver login identity and the personal information SWIFTIAM is permitted to remove. It works without signing in and without the mobile app installed.
          </p>
          
          <div className="bg-[#0A1220] border-l-4 border-slate-500 p-4 flex items-start gap-3 mb-10 rounded-r-lg">
            <Info className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
            <p className="text-slate-300 text-[14px] leading-relaxed m-0">
              It does <strong>not</strong> erase freight-company operational records that must be retained (for example trips, delivery documents, safety and accounting records).
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-white text-[18px] font-bold mb-4">How it works</h2>
          <ol className="flex flex-col gap-3 text-slate-400 text-[14px]">
            <li>1. Enter the email address registered to your SWIFTIAM Driver account.</li>
            <li>2. We email you a verification link. Opening it does not delete anything.</li>
            <li>3. You review what will happen to your data and explicitly confirm.</li>
            <li>4. You receive a request reference and a status code to track or cancel the request.</li>
            <li>5. If you lose the status code while the request is still waiting to be processed, submit the same email again for a recovery link. Recovery is not available after processing starts.</li>
          </ol>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-[#0A1220] border border-[#1a2436] rounded-xl p-6 md:p-8 mb-12 shadow-lg"
        >
          <h2 className="text-white text-[18px] font-bold mb-2">Start a deletion request</h2>
          <p className="text-slate-400 text-[13px] mb-6">
            No password is required. We verify ownership through your registered email address.
          </p>
          
          <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-2">
              <label className="text-white text-[13px] font-medium ml-1">Registered email address</label>
              <input 
                type="email" 
                placeholder="you@example.com" 
                className="w-full bg-[#060B14] border border-[#1a2436] text-white text-[14px] px-4 py-3.5 rounded-lg placeholder-slate-600 focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] transition-all"
                required
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-[#00D4FF] hover:bg-[#00bfe6] text-[#060B14] text-[14px] py-3.5 rounded-lg font-bold transition-colors mt-2 shadow-[0_0_15px_rgba(0,212,255,0.2)]"
            >
              Email me a verification link
            </button>
          </form>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-white text-[18px] font-bold mb-4">What happens to your data</h2>
          
          <div className="bg-[#0A1220] border border-[#1a2436] rounded-xl p-6 mb-4">
            <h3 className="text-white text-[14px] font-bold mb-3">SWIFTIAM will delete or anonymize where permitted:</h3>
            <ul className="flex flex-col gap-2 text-slate-400 text-[13px]">
              <li className="flex items-start gap-2"><span className="text-slate-600">-</span> Your login credentials, sessions and sign-in tokens</li>
              <li className="flex items-start gap-2"><span className="text-slate-600">-</span> Your push-notification token and unnecessary device identifiers</li>
              <li className="flex items-start gap-2"><span className="text-slate-600">-</span> Unnecessary contact information and emergency contacts</li>
              <li className="flex items-start gap-2"><span className="text-slate-600">-</span> Your profile photo and other personal profile information not required for retention</li>
            </ul>
          </div>

          <div className="bg-[#0A1220] border border-[#1a2436] rounded-xl p-6 mb-10">
            <h3 className="text-white text-[14px] font-bold mb-3">SWIFTIAM may retain:</h3>
            <ul className="flex flex-col gap-2 text-slate-400 text-[13px] mb-5">
              <li className="flex items-start gap-2"><span className="text-slate-600">-</span> Trips, loads and delivery evidence (BOL/POD)</li>
              <li className="flex items-start gap-2"><span className="text-slate-600">-</span> Hours-of-service, inspection and safety records</li>
              <li className="flex items-start gap-2"><span className="text-slate-600">-</span> Settlement, invoice and accounting evidence</li>
              <li className="flex items-start gap-2"><span className="text-slate-600">-</span> Security and compliance audit records</li>
              <li className="flex items-start gap-2"><span className="text-slate-600">-</span> Records subject to fraud, dispute, legal or regulatory retention requirements</li>
            </ul>
            <div className="flex items-start gap-2 text-slate-500 text-[12px] pt-4 border-t border-[#1a2436]">
              <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <p className="m-0 leading-relaxed">
                Retained records are minimized and anonymized where reasonably possible. Requesting deletion of your SWIFTIAM login does not erase your freight company's operational records.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[14px] mb-12">
            <span className="text-slate-400">Already submitted a request?</span>
            <Link href="/delete-account/status" className="text-[#00D4FF] hover:underline flex items-center gap-1">
              Check your request status or cancel it <ArrowRight size={14} />
            </Link>
          </div>

          <hr className="border-[#1a2436] my-8" />
          
          <div className="text-[12px] text-slate-500 flex flex-col gap-2">
            <p>SWIFTIAM • <Link href="/privacy" className="text-[#00D4FF] hover:underline">Privacy Policy</Link></p>
            <p>Questions about your data? <a href="mailto:support@swiftiam.com" className="text-white hover:underline">support@swiftiam.com</a> (contacting support is optional — this page is the direct way to request deletion).</p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}