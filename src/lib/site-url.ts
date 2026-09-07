/**
 * Single source of truth for the canonical production origin.
 *
 * The live site serves 200 on the www hostname; the apex
 * (https://aaclglobal.com) issues a 308 redirect to it. Canonical URLs,
 * og:url and the sitemap must therefore use the www hostname so they never
 * point at a redirecting URL.
 *
 * AACL production domain:
 * https://www.aaclglobal.com
 */

const FALLBACK_SITE_URL = "https://www.aaclglobal.com";

function readEnvSiteUrl(): string | undefined {
  try {
    return (
      import.meta as {
        env?: Record<string, string | undefined>;
      }
    ).env?.["VITE_SITE_URL"];
  } catch {
    return undefined;
  }
}

export const SITE_URL = (
  readEnvSiteUrl() || FALLBACK_SITE_URL
).replace(/\/+$/, "");

/**
 * Build an absolute URL for a site-relative path.
 */
export function absUrl(path = "/"): string {
  if (/^https?:\/\//i.test(path)) return path;

  const clean = `/${path}`.replace(/\/{2,}/g, "/");

  if (clean === "/") {
    return `${SITE_URL}/`;
  }

  return `${SITE_URL}${clean.replace(/\/$/, "")}`;
}

export const OG_IMAGE = absUrl("/favicon.png");
