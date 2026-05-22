"use client";

import type { IconProps } from "@phosphor-icons/react";
import type { ComponentType } from "react";
import {
  Bank,
  BellRinging,
  ChatText,
  CreditCard,
  DeviceMobileSpeaker,
  GasPump,
  GpsFix,
  Wallet,
  WhatsappLogo,
} from "@phosphor-icons/react";

type LogoIcon = ComponentType<IconProps>;

const integrations: { label: string; Icon: LogoIcon }[] = [
  { label: "Chapa payments", Icon: CreditCard },
  { label: "Telebirr roadmap", Icon: Wallet },
  { label: "Local bank transfers", Icon: Bank },
  { label: "SMS gateways", Icon: ChatText },
  { label: "Alerts & messages", Icon: BellRinging },
  { label: "WhatsApp", Icon: WhatsappLogo },
  { label: "GPS feeds", Icon: GpsFix },
  { label: "Fuel stations", Icon: GasPump },
];

const quadruple = [...integrations, ...integrations, ...integrations, ...integrations];

export default function PartnersSection() {
  return (
    <section className="py-16 border-y border-border bg-background/50">
      <div className="flex flex-col sm:flex-row sm:justify-center gap-6 text-center max-w-lg sm:max-w-none mx-auto mb-10 px-4 items-center justify-center">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10">
          <DeviceMobileSpeaker size={36} weight="duotone" className="text-primary" aria-hidden />
        </span>
        <div className="text-left sm:text-center">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground block mb-2">
            Works beside the tools you already pay for
          </span>
          <p className="text-sm md:text-base text-muted-foreground">
            Chapa, bank transfers, SMS gates, WhatsApp pings, cheap GPS boxes—keep them; Swiftiom is the filing cabinet.
          </p>
        </div>
      </div>

      <div
        className="relative overflow-hidden group"
        style={{
          WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}
      >
        <div
          className="flex items-center gap-14 animate-marquee group-hover:[animation-play-state:paused]"
          style={{ width: "max-content" }}
        >
          {quadruple.map(({ label, Icon }, index) => (
            <span
              key={`${label}-${index}`}
              className="flex-shrink-0 flex items-center gap-3 text-sm md:text-base font-medium text-foreground/70 hover:text-foreground transition-colors"
            >
              <Icon size={24} weight="duotone" className="text-primary shrink-0" aria-hidden />
              <span className="font-mono uppercase tracking-[0.12em] text-xs md:text-sm whitespace-nowrap">
                {label}
              </span>
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 56s linear infinite;
        }
      `}</style>
    </section>
  );
}
