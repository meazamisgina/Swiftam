import BroadcastBannerClient, {
  type BroadcastItem,
} from "./BroadcastBannerClient";
import { apiBaseUrlForServer } from "@/lib/site-urls";

async function getBroadcasts(): Promise<BroadcastItem[]> {
  const base = apiBaseUrlForServer();
  if (!base) return [];

  try {
    const res = await fetch(`${base}/api/public/broadcasts`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return [];

    const data = await res.json();

    type Raw = {
      id?: string | number;
      message?: string;
      type?: BroadcastItem["type"];
      active?: boolean;
    };

    const normalize = (raw: Raw): BroadcastItem | null => {
      if (!raw.message) return null;
      if (raw.active === false) return null;
      return {
        id: String(raw.id ?? "broadcast"),
        message: raw.message,
        type: raw.type ?? "info",
      };
    };

    if (Array.isArray(data)) {
      const items = data
        .map((b: Raw) => normalize(b))
        .filter((b): b is BroadcastItem => b !== null);
      return items;
    }

    if (data && typeof data === "object" && "message" in data && data.message) {
      const one = normalize(data as Raw);
      return one ? [one] : [];
    }
  } catch {
    /* omit banner on failure */
  }

  return [];
}

export default async function BroadcastBanner() {
  const broadcasts = await getBroadcasts();

  if (broadcasts.length === 0) return null;

  return <BroadcastBannerClient initialBroadcasts={broadcasts} />;
}
