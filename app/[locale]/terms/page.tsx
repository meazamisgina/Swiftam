"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, ArrowLeft, Mail } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="bg-[#060B14] pt-32 pb-24 selection:bg-[#00D4FF]/30 flex flex-col items-center text-center">
      <div className="max-w-[750px] mx-auto px-6 lg:px-8 flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center w-full"
        >
          <div className="inline-flex items-center gap-2 border border-[#00D4FF]/30 bg-[#00D4FF]/10 text-[#00D4FF] px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider mb-6">
            <Clock size={14} />
            <span>Page in Progress</span>
          </div>

          <h1 className="font-serif text-[38px] lg:text-[48px] text-white tracking-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-slate-400 text-[15px] lg:text-[16px]">
            The terms governing use of the SWIFTIAM platform and related services.
          </p>

          <div className="w-full bg-[#0A1220] border border-[#1a2436] rounded-xl p-6 md:p-8 mt-10 mb-8 text-left shadow-lg">
            <p className="text-slate-300 text-[14px] leading-relaxed mb-6">
              We're putting the finishing touches on this section. In the meantime, you can talk to our sales team, or explore features for your fleet size.
            </p>
            <p className="text-slate-400 text-[14px] leading-relaxed">
              Questions? Call <a href="tel:+251900000000" className="text-[#00D4FF] hover:underline">+251 900 000 000</a> or email <a href="mailto:sales@swiftiam.com" className="text-[#00D4FF] hover:underline">sales@swiftiam.com</a>.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-14 mt-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 text-[14px] font-medium transition-colors">
              <ArrowLeft size={16} />
              Back to Home
            </Link>

            <Link href="/book-demo" className="text-[#00D4FF] hover:text-[#00bfe6] flex items-center gap-2 text-[14px] font-medium transition-colors">
              <Mail size={16} />
              Contact sales
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}