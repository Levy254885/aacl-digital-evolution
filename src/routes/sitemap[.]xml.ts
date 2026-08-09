import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { SERVICES, INDUSTRIES, INSIGHTS } from "@/lib/aacl-content";

import { SITE_URL } from "@/lib/site-url";

const BASE_URL = SITE_URL;

interface SitemapEntry { path: string; changefreq?: string; priority?: string; }

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/about", changefreq: "monthly", priority: "0.8" },
          { path: "/services", changefreq: "monthly", priority: "0.9" },
          { path: "/ecompliance", changefreq: "monthly", priority: "0.9" },
          { path: "/templates", changefreq: "monthly", priority: "0.9" },
          { path: "/industries", changefreq: "monthly", priority: "0.8" },
          { path: "/insights", changefreq: "weekly", priority: "0.7" },
          { path: "/contact", changefreq: "yearly", priority: "0.6" },
          { path: "/book", changefreq: "yearly", priority: "0.6" },
          { path: "/careers", changefreq: "monthly", priority: "0.5" },
          { path: "/privacy", changefreq: "yearly", priority: "0.3" },
          { path: "/terms", changefreq: "yearly", priority: "0.3" },
          { path: "/cookies", changefreq: "yearly", priority: "0.3" },
          ...SERVICES.map((s) => ({ path: `/services/${s.slug}`, changefreq: "monthly", priority: "0.8" })),
          ...INDUSTRIES.map((i) => ({ path: `/industries/${i.slug}`, changefreq: "monthly", priority: "0.7" })),
          ...INSIGHTS.map((p) => ({ path: `/insights/${p.slug}`, changefreq: "monthly", priority: "0.6" })),
        ];
        const urls = entries.map((e) => `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`);
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});
