/**
 * TrustSection — Ethiopian market trust cues (presence, onboarding, practicality).
 */
"use client";

import { Headset, MapPinArea, Waves } from "@phosphor-icons/react";

const trustItems = [
  { icon: MapPinArea, label: "On-site onboarding", subtitle: "We sit beside your dispatch clerks until trips flow.", highlight: false },
  { icon: Waves, label: "Real Ethiopian networks", subtitle: "3G dips, rainy season towers—planned for.", highlight: true },
  { icon: Headset, label: "Human support", subtitle: "Call, Telegram, WhatsApp—no ticket lottery.", highlight: false },
];

export default function TrustSection() {
  return (
    <section className="py-28 px-6 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="max-w-4xl mx-auto text-center relative z-10 px-4">
        <div className="inline-flex mx-auto mb-8 h-20 w-20 items-center justify-center rounded-3xl border-2 border-dashed border-primary/40 bg-primary/10">
          <MapPinArea size={52} weight="duotone" className="text-primary" aria-hidden />
        </div>
        <h2 className="text-4xl md:text-5xl font-sans font-bold mb-6 leading-tight">Reliability beats buzzwords.</h2>
        <p className="text-base md:text-lg text-muted-foreground mb-14 leading-relaxed max-w-2xl mx-auto">
          We build for trucks that break, brokers who change their mind, and invoices that arrive three days late—not for a conference slide.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 text-left md:text-center items-stretch justify-center">
          {trustItems.map((item, idx) => (
            <div
              key={idx}
              className={`flex md:flex-col gap-5 md:gap-6 rounded-2xl border p-6 md:p-8 items-start md:items-center ${
                item.highlight ? "border-primary/50 bg-primary/5" : "border-border bg-card/40"
              }`}
            >
              <span
                className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border ${
                  item.highlight ? "border-primary bg-primary/15 text-primary" : "border-border bg-muted/30 text-foreground"
                }`}
              >
                <item.icon size={38} weight="duotone" className={item.highlight ? "text-primary" : "text-foreground"} />
              </span>
              <div className="min-w-0 flex-1">
                <span className="block type-h3 text-foreground leading-tight">{item.label}</span>
                <span className="block text-sm text-muted-foreground mt-2 leading-snug">{item.subtitle}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
