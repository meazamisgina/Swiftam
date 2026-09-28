"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? "bg-[#060B14] shadow-md border-b border-[#1a2436] py-3.5"
          : "bg-[#060B14] py-3.5 lg:py-5 border-b border-white/[0.04]"
      }`}
    >
      <div className="max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 w-full flex items-center justify-between">
        
        <Link
          href="/"
          className="flex items-center gap-2.5 shrink-0"
          onClick={() => setMobileMenuOpen(false)}
        >
          <Image 
            src="/logo.svg" 
            alt="Swiftiam Logo" 
            width={26} 
            height={26} 
            className="w-6 h-6 sm:w-7 sm:h-7"
            priority
          />
          <span className="text-white font-serif text-[18px] sm:text-[22px] font-bold tracking-wide">
            SWIFTIAM
          </span>
        </Link>

        <nav className="hidden lg:flex items-center justify-center gap-8 xl:gap-12 text-[13px] font-medium text-slate-300">
          <Link href="#platform" className="hover:text-white transition-colors whitespace-nowrap">Platform</Link>
          <Link href="#solutions" className="hover:text-white transition-colors whitespace-nowrap">Solutions</Link>
          <Link href="#how-it-works" className="hover:text-white transition-colors whitespace-nowrap">How It Works</Link>
          <Link href="#pricing" className="hover:text-white transition-colors whitespace-nowrap">Pricing</Link>
          <Link href="#company" className="hover:text-white transition-colors whitespace-nowrap">Company</Link>
        </nav>

        <div className="flex items-center gap-3 sm:gap-6">
          
          <div 
            className="relative hidden md:block"
            onMouseEnter={() => setLangOpen(true)}
            onMouseLeave={() => setLangOpen(false)}
          >
            <button
              type="button"
              className="flex items-center gap-1.5 text-[13px] font-medium text-slate-300 hover:text-white transition-colors py-2 outline-none"
            >
              English
              <motion.svg 
                animate={{ rotate: langOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 opacity-70"
              >
                <path d="m6 9 6 6 6-6"/>
              </motion.svg>
            </button>
            
            <AnimatePresence>
              {langOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute top-full right-0 mt-2 w-[160px] bg-[#0A1220] border border-[#1a2436] rounded-xl shadow-2xl py-2 z-50 flex flex-col overflow-hidden"
                >
                  <button type="button" className="flex items-center justify-between px-4 py-2.5 hover:bg-[#1a2436]/50 transition-colors text-left w-full outline-none">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-white text-[13px] font-medium">English</span>
                      <span className="text-slate-500 text-[11px]">English</span>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </button>

                  <div className="h-[1px] w-full bg-[#1a2436] my-1" />

                  <button type="button" className="flex items-center justify-between px-4 py-2.5 hover:bg-[#1a2436]/50 transition-colors text-left w-full group outline-none">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-slate-300 group-hover:text-white text-[13px] font-medium transition-colors">አማርኛ</span>
                      <span className="text-slate-500 text-[11px] group-hover:text-slate-400 transition-colors">Amharic</span>
                    </div>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <Link 
            href="/book-demo" 
            className="btn-primary text-[13px] py-2.5 px-6 rounded whitespace-nowrap hidden lg:inline-flex"
          >
            Book a Demo
          </Link>

          <button 
            type="button"
            aria-label="Toggle navigation"
            className="lg:hidden text-slate-300 hover:text-white transition-colors p-1.5 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden border-t border-[#1a2436] bg-[#060B14] shadow-2xl overflow-hidden"
          >
            <nav className="flex flex-col px-6 py-6 gap-5 text-[15px] font-medium text-slate-300">
              <Link href="#platform" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors">Platform</Link>
              <Link href="#solutions" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors">Solutions</Link>
              <Link href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors">How It Works</Link>
              <Link href="#pricing" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors">Pricing</Link>
              <Link href="#company" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors">Company</Link>
              
              <div className="h-[1px] w-full bg-[#1a2436] my-1" />
              
              <div className="flex flex-col gap-3">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Language</span>
                <div className="flex items-center gap-5 text-sm">
                  <button type="button" className="text-white font-medium">English</button>
                  <button type="button" className="text-slate-400 hover:text-white transition-colors">አማርኛ</button>
                </div>
              </div>

              <Link 
                href="/book-demo" 
                onClick={() => setMobileMenuOpen(false)} 
                className="btn-primary w-full py-3 mt-3 text-center justify-center flex rounded text-[14px]"
              >
                Book a Demo
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  ); 
}