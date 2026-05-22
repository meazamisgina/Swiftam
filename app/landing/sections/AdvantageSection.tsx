"use client";

import type { IconProps } from "@phosphor-icons/react";
import type { ComponentType } from "react";
import {
  BellRinging,
  Buildings,
  Camera,
  CheckCircle,
  GitBranch,
  MapPinArea,
  NotePencil,
  Stack,
  UsersThree,
  Wallet,
  XCircle,
  CloudSlash,
  PhoneCall,
} from "@phosphor-icons/react";

type PIcon = ComponentType<IconProps>;

const tableData: { feature: string; Icon: PIcon }[] = [
  { feature: "Dispatch board that replaces 40 phone calls", Icon: GitBranch },
  { feature: "Trip sheet + fuel advance in one folder", Icon: NotePencil },
  { feature: "Driver payouts the owner can defend in a dispute", Icon: UsersThree },
  { feature: "Map pin + POD photo when the customer argues", Icon: MapPinArea },
  { feature: "Outstanding Br beside each truck & load", Icon: Wallet },
  { feature: "Many yards, one login for the accountant", Icon: Buildings },
  { feature: "SMS / Telegram / WhatsApp pings crews already read", Icon: BellRinging },
  { feature: "Handsets that keep logging when towers drop", Icon: CloudSlash },
  { feature: "Cash + trucks on the same tabs (no mystery columns)", Icon: Stack },
];

function Cell({ value }: { value: boolean }) {
  return (
    <td className={value ? "w-[1%] bg-primary/5 text-center align-middle text-primary font-bold" : "w-[1%] text-center align-middle text-muted-foreground"}>
      <span className="inline-flex items-center justify-center py-1.5 px-2">
        {value ? <CheckCircle size={24} weight="fill" className="text-primary" aria-label="Included" /> : <XCircle size={24} weight="fill" className="text-muted-foreground/90" aria-label="Not included" />}
      </span>
    </td>
  );
}

export default function AdvantageSection() {
  return (
    <section className="py-28 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 flex flex-col items-center gap-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-primary/30 bg-primary/10 shadow-inner">
            <PhoneCall weight="duotone" size={40} className="text-primary" aria-hidden />
          </div>
          <div>
            <span className="text-primary font-mono text-xs tracking-[0.25em] uppercase block mb-3">Versus Excel + screenshots</span>
            <h2 className="text-3xl md:text-4xl font-sans font-bold mb-4">One clean trail from phone call to bank deposit</h2>
            <p className="text-muted-foreground text-base leading-snug px-4">
              Teams still forward voice notes and photos—Swiftiom pins them to the trip so finance is not guessing next week.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto vektor-scrollbar rounded-xl border border-border">
          <table className="vektor-table w-full rounded-xl overflow-hidden">
            <thead>
              <tr>
                <th className="w-[45%]">Work</th>
                <th>Old way</th>
                <th className="text-primary bg-primary/5">
                  <span className="inline-flex items-center gap-2">
                    Swiftiom <CheckCircle weight="bold" />
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map(({ feature, Icon }, idx) => (
                <tr key={idx}>
                  <td className="align-middle py-5">
                    <span className="inline-flex gap-4 items-start">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-card">
                        <Icon size={22} weight="duotone" className="text-primary shrink-0" aria-hidden />
                      </span>
                      <span className="font-semibold text-sm uppercase tracking-wide leading-snug max-w-[20rem] pt-1">{feature}</span>
                    </span>
                  </td>
                  <Cell value={false} />
                  <Cell value={true} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
