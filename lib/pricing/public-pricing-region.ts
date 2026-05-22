export type PublicPricingRegionKey = "USA" | "ETHIOPIA";

/**
 * Baked in at build time (`NEXT_PUBLIC_*`).
 * `ETHIOPIA` → mapper uses `data.regions.ETHIOPIA.tiers`.
 * Omit or `USA` → `data.regions.USA.tiers`.
 */
export function getPublicPricingRegionKey(): PublicPricingRegionKey {
  const raw = process.env.NEXT_PUBLIC_PRICING_REGION?.trim().toUpperCase();
  if (raw === "ETHIOPIA") return "ETHIOPIA";
  return "USA";
}
