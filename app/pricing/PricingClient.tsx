"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "@phosphor-icons/react";
import Link from "next/link";

export type PricingDisplayModel = "per_truck_month" | "custom";

export interface PricingPlan {
  id: number;
  fleetSize: string;
  /** Major currency units per active truck / month (field name is legacy; use `currencyCode` for display). */
  priceUsd: number;
  popular: boolean;
  features?: string[];
  /** Omit for legacy API payloads: inferred from positive USD price when absent */
  pricingModel?: PricingDisplayModel;
  /** Button label override (e.g. custom tiers → Talk to Sales) */
  ctaLabel?: string;
  /** ISO code from `data.regions.*.currency` when using regional tiers */
  currencyCode?: string;
  currencySymbol?: string;
}

export const FALLBACK_PLANS: PricingPlan[] = [
  {
    id: 1,
    fleetSize: "1–5 trucks",
    priceUsd: 45,
    popular: false,
    pricingModel: "per_truck_month",
    features: ["Trips, fuel & money tabs", "Live truck map", "Driver handset app"],
  },
  {
    id: 2,
    fleetSize: "6–10 trucks",
    priceUsd: 40,
    popular: true,
    pricingModel: "per_truck_month",
    features: ["Trips, fuel & money tabs", "Live truck map", "Driver handset app"],
  },
  {
    id: 3,
    fleetSize: "Fleet",
    priceUsd: 0,
    popular: false,
    pricingModel: "custom",
    ctaLabel: "Talk to sales",
    features: [
      "Everything in smaller tiers",
      "Customer & broker invoicing",
      "Service reminders for each plate",
      "Inspection & licence nudges",
      "Support that picks up the phone",
      "1-year history for audits",
    ],
  },
  {
    id: 4,
    fleetSize: "Enterprise",
    priceUsd: 0,
    popular: false,
    pricingModel: "custom",
    ctaLabel: "Talk to sales",
    features: [
      "Multi-branch rollouts",
      "Customization for your lanes",
      "Live truck map + yard tools",
      "Driver handset app & offline capture",
      "Finance exports your accountant wants",
      "After-hours on-call",
      "Unlimited storage window",
    ],
  },
];

const defaultFeatures = ["Trips, fuel & money tabs", "Live truck map", "Driver handset app"];

function displayModel(plan: PricingPlan): PricingDisplayModel {
  if (plan.pricingModel === "custom") return "custom";
  if (plan.pricingModel === "per_truck_month") return "per_truck_month";
  if (plan.priceUsd > 0) return "per_truck_month";
  return "custom";
}

export default function PricingClient({
  initialPlans,
  pricingSource,
}: {
  initialPlans: PricingPlan[];
  pricingSource: "api" | "fallback";
}) {
  const [plans] = useState<PricingPlan[]>(initialPlans);

  const formatPrice = (plan: PricingPlan) => {
    if (displayModel(plan) === "custom") {
      return "Custom pricing";
    }
    const code = plan.currencyCode ?? "USD";
    const amount = plan.priceUsd;
    if (code === "USD") {
      return `$${amount.toFixed(0)}`;
    }
    try {
      return new Intl.NumberFormat("en-ET", {
        style: "currency",
        currency: code,
        maximumFractionDigits: 0,
      }).format(amount);
    } catch {
      const sym = plan.currencySymbol?.trim() || "";
      return sym ? `${sym}${amount.toFixed(0)}` : `${amount.toFixed(0)} ${code}`;
    }
  };

  const priceFootnote = (plan: PricingPlan, custom: boolean) => {
    if (custom) return "Tailored quote for your lanes & branches";
    const code = plan.currencyCode ?? "USD";
    if (code === "ETB") return "per active truck / month (ETB)";
    if (code !== "USD") return `per active truck / month (${code})`;
    return "per active truck / month (USD — ETB settlement available)";
  };

  return (
    <main className="pt-32 pb-24 px-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold mb-6 text-foreground"
          >
            Flexible pricing for Ethiopian businesses.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-10"
          >
            Pay per truck that actually runs loads. Custom tiers when you mix brokers, branches, and bonded cargo.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10 items-stretch">
          {plans.map((plan, idx) => {
            const custom = displayModel(plan) === "custom";
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={
                  plan.popular
                    ? "bento-card bento-card--emphasis relative flex flex-col overflow-hidden p-6 min-h-[560px]"
                    : "bento-card flex flex-col overflow-hidden p-6 min-h-[560px]"
                }
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-mono px-3 py-1 rounded-bl-lg">
                    POPULAR
                  </div>
                )}

                <div className="mb-4">
                  <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                    Fleet size / tier
                  </span>
                  <p className="text-base font-medium text-foreground mt-1">{plan.fleetSize}</p>
                </div>

                <div className="mb-5">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-mono font-bold text-primary tracking-tighter">
                      {formatPrice(plan)}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block min-h-[2.5rem]">
                    {priceFootnote(plan, custom)}
                  </span>
                </div>

                <div className="h-px bg-border mb-5" />

                <ul className="space-y-3 mb-8 flex-1">
                  {(plan.features || defaultFeatures).map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check size={16} className="text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/demo">
                  <button
                    type="button"
                    className={plan.popular ? "vektor-btn-primary w-full" : "vektor-btn-secondary w-full"}
                  >
                    {plan.ctaLabel ?? "Start 15-day trial"}
                  </button>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {pricingSource === "fallback" && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-xs text-muted-foreground mb-6"
          >
            Showing default pricing. Verify API URL, server fetch base, and non-empty tiers for your pricing region on the backend.
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <p className="text-sm text-muted-foreground font-mono">
            Chapa & bank-friendly workflows • Cancel anytime • 15-day unrestricted free trial
          </p>
        </motion.div>
      </div>
    </main>
  );
}
