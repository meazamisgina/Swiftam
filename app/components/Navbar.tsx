"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { appLoginUrl } from "@/lib/site-urls";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Pricing", href: "/pricing" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-background border-b border-border h-16 shrink-0">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo + Navigation Links (left side) */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 cursor-pointer group">
            <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-heading font-bold text-lg">S</span>
            </div>
            <span className="font-heading font-bold text-lg text-foreground">
              Swift<span className="text-primary">iom</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition-colors ${
                  isActive(item.href)
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={appLoginUrl()}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Sign In
          </a>
          <motion.div
            className="relative"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/demo"
              className="bg-primary text-primary-foreground font-medium text-sm px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              See how it works
            </Link>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 6 : 0 }}
            className="w-6 h-px bg-foreground block"
          />
          <motion.span
            animate={{ opacity: isMenuOpen ? 0 : 1 }}
            className="w-6 h-px bg-foreground block"
          />
          <motion.span
            animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -6 : 0 }}
            className="w-6 h-px bg-foreground block"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm transition-colors py-2 ${
                    isActive(item.href)
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="h-px bg-border"></div>
              <a
                href={appLoginUrl()}
                onClick={() => setIsMenuOpen(false)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                Sign In
              </a>
              <Link
                href="/demo"
                onClick={() => setIsMenuOpen(false)}
                className="bg-primary text-primary-foreground font-medium text-sm px-4 py-3 text-center rounded-lg hover:bg-primary/90 transition-colors"
              >
                See how it works
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
