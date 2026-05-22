import type { NextConfig } from "next";

/** Production: `next build` + `next start` (Node.js). Not configured for static HTML export. */
const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  ...(process.env.NODE_ENV === "development"
    ? { allowedDevOrigins: ["192.168.1.6", "192.168.1.3", "192.168.1.2"] }
    : {}),
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self' https://api.swiftiom.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
