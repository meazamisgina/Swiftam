"use client";

import type { SVGProps } from "react";
import { ChatCircleDots, Cpu, DeviceMobile, Gauge, Waves } from "@phosphor-icons/react";

const driverFeatures = [
  {
    icon: DeviceMobile,
    title: "Driver app",
    desc: "Big tap targets, low RAM—built for the handsets drivers actually carry.",
  },
  {
    icon: ChatCircleDots,
    title: "Chat + SMS pings",
    desc: "Nudge crews in Telegram/WhatsApp patterns they already trust.",
  },
  {
    icon: Cpu,
    title: "Branch heads",
    desc: "See late trucks and missing PODs without opening Excel at midnight.",
  },
  {
    icon: Waves,
    title: "Shaky towers",
    desc: "Photos and GPS crumbs queue quietly—no frozen screen at the checkpoint.",
  },
];

export default function DriverAppSection() {
  return (
    <section id="mobile" className="py-28 px-6 bg-background border-y border-border/40">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative aspect-[9/16] max-w-sm mx-auto lg:mx-0">
          <div className="relative h-full w-full rounded-[3rem] border-[12px] border-background bg-card overflow-hidden ring-1 ring-slate-800">
            <div className="absolute top-0 w-full h-8 bg-background flex justify-center items-center">
              <div className="w-24 h-4 bg-card rounded-full" />
            </div>
            <div className="pt-12 p-6 flex flex-col h-full bg-background">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center shrink-0">
                  <DeviceMobile size={26} weight="fill" className="text-primary-foreground" aria-hidden />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-sans font-bold tracking-tight">DRIVER SCREEN</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Gauge size={14} className="text-primary shrink-0" aria-hidden />
                    <p className="text-[10px] text-primary font-mono uppercase truncate">Sync queued · lite mode ON</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-4">
                <div className="bento-card !p-4 border-primary/35">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-mono text-muted-foreground">RUN #4401</span>
                    <Gauge size={14} className="text-primary" aria-hidden />
                  </div>
                  <p className="font-sans font-bold text-sm leading-tight">AA yard → Modjo port hand-off</p>
                  <div className="w-full bg-card h-1.5 rounded-full mt-4">
                    <div className="bg-primary h-full w-[60%] rounded-full" />
                  </div>
                </div>

                <div className="bento-card !p-4">
                  <p className="text-xs text-muted-foreground mb-3 font-mono flex items-center gap-2 uppercase">
                    <ChatCircleDots size={16} className="text-primary" aria-hidden />
                    Proof snap
                  </p>
                  <div className="aspect-square bg-card rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground">
                    <DeviceMobile size={36} weight="duotone" className="text-muted-foreground opacity-75" aria-hidden />
                  </div>
                </div>
              </div>

              <button type="button" className="vektor-btn-primary w-full mt-auto flex items-center justify-center gap-3">
                <MapPingIcon aria-hidden />
                Ping live spot
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10">
              <DeviceMobile weight="duotone" size={40} className="text-primary" aria-hidden />
            </span>
            <div className="min-w-0">
              <span className="text-primary font-mono text-xs tracking-[0.28em] uppercase block mb-4">Hands + pockets</span>
              <h2 className="text-5xl md:text-6xl font-sans font-bold uppercase tracking-tighter leading-none">
                Phones first.
              </h2>
              <p className="text-xl text-muted-foreground leading-snug mt-6 max-w-md">
                Drivers already live on cheap Android—big buttons, proof snaps, and “where are you?” answered even when they do not pick up.
              </p>
            </div>
          </div>
          <ul className="space-y-5">
            {driverFeatures.map((item, idx) => (
              <li key={idx} className="flex gap-4 items-start rounded-xl border border-border/70 bg-card/35 p-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center">
                  <item.icon size={29} weight="duotone" className="text-primary" aria-hidden />
                </div>
                <div className="min-w-0">
                  <h4 className="font-sans font-bold uppercase tracking-[0.12em] text-base">{item.title}</h4>
                  <p className="text-muted-foreground text-sm leading-snug mt-1">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function MapPingIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg className={className} width={20} height={20} viewBox="0 0 256 256" fill="none" {...props}>
      <circle cx="128" cy="104" r="48" stroke="currentColor" strokeWidth="22" opacity="0.25" />
      <path fill="currentColor" d="M128 216s-72-71.76-72-128a72 72 0 1144 133.93V248a8 8 0 0016 0v-29.93A71.93 71.93 0 00200 88c0 47.93-72 128-72 128Z" />
    </svg>
  );
}
