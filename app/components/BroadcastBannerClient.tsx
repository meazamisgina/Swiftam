"use client";

import { useState } from "react";
import { X } from "@phosphor-icons/react";

export interface BroadcastItem {
  id: string;
  message: string;
  type: "info" | "warning" | "success";
}

export default function BroadcastBannerClient({
  initialBroadcasts,
}: {
  initialBroadcasts: BroadcastItem[];
}) {
  const [dismissed, setDismissed] = useState<string[]>([]);

  const visible = initialBroadcasts.filter((b) => !dismissed.includes(b.id));

  if (visible.length === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60]">
      {visible.map((broadcast) => (
        <div
          key={broadcast.id}
          className={`py-2 px-4 text-center text-sm font-medium relative ${
            broadcast.type === "warning"
              ? "bg-amber-500 text-white"
              : broadcast.type === "success"
                ? "bg-emerald-500 text-white"
                : "bg-blue-600 text-white"
          }`}
        >
          <span className="inline-block pr-10">{broadcast.message}</span>
          <button
            type="button"
            onClick={() => setDismissed((prev) => [...prev, broadcast.id])}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded transition-colors"
            aria-label="Dismiss broadcast"
          >
            <X size={14} weight="bold" />
          </button>
        </div>
      ))}
    </div>
  );
}
