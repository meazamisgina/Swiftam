import Navbar from "../components/Navbar";
import SiteFooter from "../components/SiteFooter";
import PricingClient, {
  FALLBACK_PLANS,
  type PricingPlan,
} from "./PricingClient";
import { apiBaseUrlForServer } from "@/lib/site-urls";
import { mapPublicPricingPayloadToPlans } from "@/lib/pricing/map-public-pricing";
import { getPublicPricingRegionKey } from "@/lib/pricing/public-pricing-region";

async function loadPricing(): Promise<{
  plans: PricingPlan[];
  source: "api" | "fallback";
}> {
  const base = apiBaseUrlForServer();
  if (!base) {
    return { plans: FALLBACK_PLANS, source: "fallback" };
  }

  const region = getPublicPricingRegionKey();

  try {
    const res = await fetch(`${base}/api/public/pricing`, {
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      return { plans: FALLBACK_PLANS, source: "fallback" };
    }

    const data = await res.json();
    const { plans } = mapPublicPricingPayloadToPlans(data, region);

    if (plans.length > 0) {
      return { plans, source: "api" };
    }
  } catch {
    /* use fallback */
  }

  return { plans: FALLBACK_PLANS, source: "fallback" };
}

export default async function PricingPage() {
  const { plans, source } = await loadPricing();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PricingClient initialPlans={plans} pricingSource={source} />
      <SiteFooter />
    </div>
  );
}
