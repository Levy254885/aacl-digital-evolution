import { createFileRoute, Link } from "@tanstack/react-router";
import { absUrl } from "@/lib/site-url";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { REGIONS } from "@/lib/regions-content";
import { ArrowRight } from "lucide-react";

const TITLE = "ISO Certification Consultants Worldwide | AACL Global";
const DESC =
  "AACL Global delivers ISO and security certification consultancy worldwide: the UK, Europe, United States, Middle East, Africa and Asia Pacific. Onsite or remote.";
const SHARE = absUrl("/og-share.jpg");

export const Route = createFileRoute("/iso-certification/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { property: "og:url", content: absUrl("/iso-certification") },
      { property: "og:type", content: "website" },
      { property: "og:image", content: SHARE },
      { name: "twitter:image", content: SHARE },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: absUrl("/iso-certification") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "ISO Certification Worldwide",
                  item: absUrl("/iso-certification"),
                },
              ],
            },
            {
              "@type": "ItemList",
              name: "Regions served by AACL Global",
              itemListElement: REGIONS.map((r, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: r.name,
                url: absUrl(`/iso-certification/${r.slug}`),
              })),
            },
          ],
        }),
      },
    ],
  }),
  component: RegionsIndex,
});

function RegionsIndex() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Worldwide delivery"
        title="ISO certification consultancy, wherever you operate."
        lead="Headquartered in Nairobi and delivering worldwide. Choose your region to see the standards, sectors and delivery model we work with there."
        image="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2000&q=80"
      />

      <section className="py-24 bg-background">
        <div className="container-x grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {REGIONS.map((r, i) => (
            <Reveal key={r.slug} delay={i * 60}>
              <Link
                to="/iso-certification/$region"
                params={{ region: r.slug }}
                className="group bg-background block h-full p-10 hover:bg-[var(--navy-deep)] hover:text-[var(--bone)] transition-colors"
              >
                <div className="text-xs uppercase tracking-[0.22em] text-[var(--gold)]">Region</div>
                <h2 className="font-display text-2xl mt-3 leading-tight">{r.name}</h2>
                <p className="text-sm text-muted-foreground group-hover:text-white/70 mt-4 leading-relaxed">
                  {r.lead}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm text-[var(--gold)]">
                  Read more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
