import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/lib/site-url";
import { PageShell, PageHero } from "@/components/site/PageShell";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — AACL" },
      { name: "description", content: "How the AACL website uses cookies and similar technologies." },
      { property: "og:title", content: "Cookie Policy — AACL" },
      { property: "og:description", content: "AACL cookie usage." },
      { name: "twitter:title", content: "Cookie Policy — AACL" },
      { name: "twitter:description", content: "AACL cookie usage." },
      { property: "og:url", content: absUrl("/cookies") },
    ],
    links: [{ rel: "canonical", href: absUrl("/cookies") }],
  }),
  component: () => (
    <PageShell>
      <PageHero eyebrow="Legal" title="Cookie Policy" />
      <section className="py-20 bg-background">
        <div className="container-x max-w-3xl space-y-6 text-muted-foreground leading-relaxed">
          <p>Our website uses a limited set of cookies to ensure the site functions correctly and to help us understand how it is used.</p>
          <p><strong className="text-foreground">Essential cookies</strong> — required for the website to operate.</p>
          <p><strong className="text-foreground">Analytics cookies</strong> — help us understand aggregated visitor behaviour to improve the website. These are set only with your consent.</p>
          <p>You can control cookies through your browser settings. Restricting cookies may affect the functionality of the website.</p>
        </div>
      </section>
    </PageShell>
  ),
});
