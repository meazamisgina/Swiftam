import type { PricingDisplayModel, PricingPlan } from "@/app/pricing/PricingClient";
import type { PublicPricingRegionKey } from "./public-pricing-region";

export type MapPublicPricingResult = {
  plans: PricingPlan[];
  /** Copied from the region block when present (all mapped tiers share this). */
  currencyCode?: string;
  currencySymbol?: string;
};

function isRecord(x: unknown): x is Record<string, unknown> {
  return x !== null && typeof x === "object" && !Array.isArray(x);
}

function getRegionsObject(payload: unknown): Record<string, unknown> | null {
  if (!isRecord(payload)) return null;
  if (isRecord(payload.regions)) return payload.regions;
  if (isRecord(payload.data) && isRecord(payload.data.regions)) return payload.data.regions;
  return null;
}

function formatFleetRange(min: number, max: number | null): string {
  if (Number.isFinite(min) && max !== null && Number.isFinite(max)) {
    if (min === max) return `${min} truck${min === 1 ? "" : "s"}`;
    return `${min}–${max} trucks`;
  }
  if (Number.isFinite(min) && (max === null || !Number.isFinite(max))) return `${min}+ trucks`;
  return "Custom fleet";
}

function coerceNumber(x: unknown): number | null {
  if (typeof x === "number" && Number.isFinite(x)) return x;
  if (typeof x === "string" && x.trim() !== "") {
    const n = Number(x);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

/**
 * Expects `unitAmount` in **major** currency units (e.g. USD or whole ETB per active truck / month).
 */
function mapTier(
  tier: unknown,
  index: number,
  currencyCode?: string,
  currencySymbol?: string,
): PricingPlan | null {
  if (!isRecord(tier)) return null;

  const min = coerceNumber(tier.minTrucks);
  const maxRaw = tier.maxTrucks;
  const max = maxRaw === null || maxRaw === undefined ? null : coerceNumber(maxRaw);

  const unitAmount = coerceNumber(tier.unitAmount);

  const fleetSizeFromApi = typeof tier.fleetSize === "string" ? tier.fleetSize.trim() : "";
  const fleetSize =
    fleetSizeFromApi.length > 0
      ? fleetSizeFromApi
      : min !== null
        ? formatFleetRange(min, max)
        : "Custom fleet";

  const popular = Boolean(tier.popular);
  const features = Array.isArray(tier.features)
    ? tier.features.filter((x): x is string => typeof x === "string" && x.length > 0)
    : undefined;

  const idRaw = tier.id;
  const id = typeof idRaw === "number" && Number.isFinite(idRaw) ? idRaw : index + 1;

  let pricingModel: PricingDisplayModel | undefined =
    tier.pricingModel === "custom" ? "custom" : tier.pricingModel === "per_truck_month" ? "per_truck_month" : undefined;

  if (pricingModel === undefined) {
    if (unitAmount === null || unitAmount <= 0) pricingModel = "custom";
    else pricingModel = "per_truck_month";
  }

  const ctaLabel = typeof tier.ctaLabel === "string" ? tier.ctaLabel : undefined;

  return {
    id,
    fleetSize,
    priceUsd: pricingModel === "custom" ? 0 : unitAmount ?? 0,
    popular,
    features: features && features.length > 0 ? features : undefined,
    pricingModel,
    ctaLabel,
    currencyCode,
    currencySymbol,
  };
}

function extractLegacyPlans(payload: unknown): PricingPlan[] {
  if (!isRecord(payload)) return [];
  const direct = payload.plans;
  const nested = isRecord(payload.data) ? payload.data.plans : undefined;
  const raw = Array.isArray(direct) ? direct : Array.isArray(nested) ? nested : null;
  if (!raw || raw.length === 0) return [];
  return raw as PricingPlan[];
}

/**
 * Maps `GET /api/public/pricing` JSON to card-ready plans for the configured region.
 * Returns `{ plans: [] }` when the region block or `tiers` is missing/empty → caller should use `FALLBACK_PLANS`.
 *
 * Also supports legacy `{ plans: [...] }` / `{ data: { plans } }` (ignores region) when no `regions` object exists.
 */
export function mapPublicPricingPayloadToPlans(
  payload: unknown,
  region: PublicPricingRegionKey,
): MapPublicPricingResult {
  const regions = getRegionsObject(payload);

  if (regions) {
    const block = regions[region];
    if (!isRecord(block)) return { plans: [] };

    const tiers = block.tiers;
    const currencyCode = typeof block.currency === "string" ? block.currency : undefined;
    const currencySymbol = typeof block.currencySymbol === "string" ? block.currencySymbol : undefined;

    if (!Array.isArray(tiers) || tiers.length === 0) return { plans: [] };

    const plans = tiers
      .map((tier, i) => mapTier(tier, i, currencyCode, currencySymbol))
      .filter((p): p is PricingPlan => p !== null);

    return plans.length > 0 ? { plans, currencyCode, currencySymbol } : { plans: [] };
  }

  const legacy = extractLegacyPlans(payload);
  return { plans: legacy };
}
