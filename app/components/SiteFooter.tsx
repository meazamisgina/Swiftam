"use client";

import { FacebookLogo, TwitterLogo, YoutubeLogo, LinkedinLogo, InstagramLogo } from "@phosphor-icons/react";
import Link from "next/link";
const whoWeHelpLinks = [
  { label: "Fleet owners", href: "/" },
  { label: "Importers / exporters", href: "/" },
  { label: "Regional distributors", href: "/" },
];

const productLinks = [
  { label: "Dispatch board & jobs", href: "/" },
  { label: "Driver mobile app", href: "/" },
  { label: "Safety & inspection reminders", href: "/" },
  { label: "Invoices & driver advances", href: "/" },
  { label: "Owner-ready reports", href: "/" },
  { label: "Onboarding & training", href: "/" },
  { label: "Integrations (Chapa, SMS, GPS)", href: "/" },
];

const resourcesLinks = [
  { label: "About Us", href: "/" },
  { label: "Careers", href: "/" },
  { label: "News", href: "/" },
  { label: "Testimonials", href: "/" },
  { label: "Partners", href: "/" },
  { label: "Blog", href: "/" },
  { label: "Pricing", href: "/pricing" },
];

const additionalLinks = [
  { label: "Help Center", href: "/" },
  { label: "Developer Portal", href: "/" },
  { label: "FAQ", href: "/" },
  { label: "Privacy Policy", href: "/" },
  { label: "Terms of Service", href: "/" },
];

export default function SiteFooter() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-3">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <span className="text-2xl font-heading font-bold text-foreground">Swiftiom</span>
            </Link>
            
            {/* Tagline */}
            <p className="text-sm text-muted-foreground mb-4">
              Truck ops in plain language—trips, fuel, broker fees, Djibouti legs. Addis team; Telegram-first support.
            </p>
            
            {/* Address */}
            <div className="text-sm text-muted-foreground mb-2">
              Addis Ababa, Ethiopia<br />
              Support: Telegram-first<br />
              onboarding@swiftiom.com
            </div>
            
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Contact Us
            </Link>

            {/* App Store Badges */}
            <div className="mt-6 space-y-3">
              <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                Install Swiftiom Driver App
              </p>
              <div className="flex gap-3">
                <Link href="/" className="block">
                  <div className="h-10 w-32 bg-black border border-border rounded-lg flex items-center justify-center px-3 hover:border-muted-foreground transition-colors">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2 fill-white">
                      <path d="M3,20.5V3.5C3,2.91 3.4,2.38 4,2.2L13.72,12L4,21.8C3.4,21.62 3,21.09 3,20.5M16.27,13.72L6.3,3.73L18.5,9.63L16.27,13.72M19.28,14.27L21.75,15.53C22.2,15.76 22.2,16.34 21.75,16.57L18.76,18.07L16.5,14L19.28,14.27M5.36,20.36L16.5,14L18.7,18.23L5.7,21.87C5.27,22 4.83,21.65 4.83,21.2V20.82L5.36,20.36Z" />
                    </svg>
                    <div className="flex flex-col">
                      <span className="text-[8px] text-white/70 leading-none">GET IT ON</span>
                      <span className="text-xs text-white font-medium leading-tight">Google Play</span>
                    </div>
                  </div>
                </Link>
                <Link href="/" className="block">
                  <div className="h-10 w-32 bg-black border border-border rounded-lg flex items-center justify-center px-3 hover:border-muted-foreground transition-colors">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2 fill-white">
                      <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                    </svg>
                    <div className="flex flex-col">
                      <span className="text-[8px] text-white/70 leading-none">Download on the</span>
                      <span className="text-xs text-white font-medium leading-tight">App Store</span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

          </div>

          {/* Link Columns */}
          <div className="lg:col-span-9 grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Who We Help */}
            <div>
              <h4 className="text-[10px] font-mono font-bold text-foreground uppercase tracking-wider mb-4">
                Who We Help
              </h4>
              <ul className="space-y-2">
                {whoWeHelpLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-[10px] font-mono font-bold text-foreground uppercase tracking-wider mb-4">
                Product
              </h4>
              <ul className="space-y-2">
                {productLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-[10px] font-mono font-bold text-foreground uppercase tracking-wider mb-4">
                Resources
              </h4>
              <ul className="space-y-2">
                {resourcesLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Additional */}
            <div>
              <h4 className="text-[10px] font-mono font-bold text-foreground uppercase tracking-wider mb-4">
                Additional Resources
              </h4>
              <ul className="space-y-2">
                {additionalLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-mono">
            Swiftiom © 2026 · Built for owners who still sign Bollo by hand.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
              <FacebookLogo size={20} weight="fill" />
            </Link>
            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
              <TwitterLogo size={20} weight="fill" />
            </Link>
            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
              <YoutubeLogo size={20} weight="fill" />
            </Link>
            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
              <LinkedinLogo size={20} weight="fill" />
            </Link>
            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
              <InstagramLogo size={20} weight="fill" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
