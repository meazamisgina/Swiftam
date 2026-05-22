/** Canonical Swiftiom application origin (`NEXT_PUBLIC_APP_URL`, default prod). */
export function appOrigin(): string {
  return (
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") || "https://app.swiftiom.com"
  );
}

export function appLoginUrl(): string {
  return `${appOrigin()}/login`;
}

/** Public REST API base (no trailing slash). Available on client & server. */
export function publicApiBaseUrl(): string | undefined {
  const raw = process.env.NEXT_PUBLIC_API_BASE_URL?.trim().replace(/\/$/, "");
  return raw || undefined;
}

/**
 * Prefer `SERVER_API_BASE_URL` for server-side fetches when the public URL is unreachable
 * from the Node host or you split internal vs external routing.
 * Falls back to `NEXT_PUBLIC_API_BASE_URL`.
 */
export function apiBaseUrlForServer(): string | undefined {
  const server = process.env.SERVER_API_BASE_URL?.trim().replace(/\/$/, "");
  if (server) return server;
  return publicApiBaseUrl();
}
