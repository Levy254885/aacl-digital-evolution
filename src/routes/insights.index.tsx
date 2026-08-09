import { createFileRoute, Link } from "@tanstack/react-router";
import { absUrl } from "@/lib/site-url";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { INSIGHTS } from "@/lib/aacl-content";
import { useCms } from "@/lib/cms";

export const Route = createFileRoute("/insights/")({
  head: () => ({
    meta: [
      { title: "Insights — Analysis from the AACL practice" },
      { name: "description", content: "Analysis, guidance and practitioner perspectives on security, compliance, ISO management systems and enterprise risk." },
      { property: "og:title", content: "AACL Insights" },
      { property: "og:description", content: "Practitioner analysis from AACL consultants." },
      { name: "twitter:title", content: "AACL Insights" },
      { name: "twitter:description", content: "Practitioner analysis from AACL consultants." },
      { property: "og:url", content: absUrl("/insights") },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: absUrl("/insights") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
            { "@type": "ListItem", position: 2, name: "Insights", item: absUrl("/insights") },
          ],
        }),
      },
    ],
  }),
  component: InsightsPage,
});

function InsightsPage() {
  const posts = useCms<typeof INSIGHTS>("blog", INSIGHTS);

  return (
    <PageShell>
      <PageHero
        eyebrow="Insights"
        title="Analysis, guidance and practitioner perspectives."
        lead="Field-tested thinking on the certification, risk and compliance challenges our clients face."
        image="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2000&q=80"
      />
      <section className="py-24 bg-background">
        <div className="container-x grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 70}>
              <Link to="/insights/$slug" params={{ slug: p.slug }} className="group block">
                <div className="overflow-hidden mb-6">
                  <img src={p.image} alt="" className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="text-xs uppercase tracking-[0.2em] text-[var(--gold)]">{p.category}</div>
                <h3 className="font-display text-2xl mt-3 leading-tight group-hover:text-[var(--gold)] transition-colors">{p.title}</h3>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{p.excerpt}</p>
                <div className="text-xs text-muted-foreground mt-4">{new Date(p.date).toLocaleDateString("en-GB", { month: "long", year: "numeric" })} · {p.readTime}</div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
