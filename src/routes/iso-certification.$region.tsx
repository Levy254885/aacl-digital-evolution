import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { absUrl } from "@/lib/site-url";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { findRegion, type Region } from "@/lib/regions-content";
import { Check, Globe2 } from "lucide-react";

export const Route = createFileRoute("/iso-certification/$region")({
  loader: ({ params }) => {
    const region = findRegion(params.region);
    if (!region) throw notFound();
    return { region };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Region not found | AACL Global" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const r = loaderData.region;
    const url = absUrl(`/iso-certification/${r.slug}`);
    return {
      meta: [
        { title: r.metaTitle },
        { name: "description", content: r.metaDescription },
        { property: "og:title", content: r.metaTitle },
        { property: "og:description", content: r.metaDescription },
        { name: "twitter:title", content: r.metaTitle },
        { name: "twitter:description", content: r.metaDescription },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        { property: "og:image", content: r.image },
        { name: "twitter:image", content: r.image },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Service",
                name: `ISO certification consultancy in ${r.name}`,
                serviceType: "ISO certification and security compliance consultancy",
                description: r.metaDescription,
                provider: {
                  "@type": "Organization",
                  name: "Audits and Assurance Consult Ltd",
                  alternateName: "AACL Global",
                  url: absUrl("/"),
                },
                areaServed: r.name,
                url,
              },
              {
                "@type": "FAQPage",
                mainEntity: r.faqs.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              },
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
                  { "@type": "ListItem", position: 3, name: r.name, item: url },
                ],
              },
            ],
          }),
        },
      ],
    };
  },
  component: RegionPage,
  notFoundComponent: () => (
    <PageShell>
      <div className="container-x py-40 text-center">
        <h1 className="font-display text-4xl">Region not found</h1>
        <Link to="/iso-certification" className="btn-outline-navy mt-8 inline-flex">
          All regions
        </Link>
      </div>
    </PageShell>
  ),
});

function RegionPage() {
  const { region: r } = Route.useLoaderData() as { region: Region };

  return (
    <PageShell>
      <PageHero eyebrow={`ISO certification in ${r.name}`} title={r.heading} lead={r.lead} image={r.image} />

      <section className="py-24 bg-background">
        <div className="container-x grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="eyebrow mb-4">How we work here</div>
              <h2 className="font-display text-3xl leading-tight">{r.delivery}</h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7 space-y-5 text-muted-foreground leading-relaxed">
            {r.intro.map((p, i) => (
              <Reveal key={i} delay={i * 80}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[var(--bone)]">
        <div className="container-x grid lg:grid-cols-2 gap-14">
          <div>
            <Reveal>
              <div className="eyebrow mb-4">Standards in demand</div>
              <h2 className="font-display text-3xl leading-tight">
                Certifications we deliver in {r.name}.
              </h2>
            </Reveal>
            <ul className="mt-8 space-y-4">
              {r.standards.map((s, i) => (
                <Reveal key={s} delay={i * 60}>
                  <li className="flex gap-3 text-muted-foreground">
                    <Check className="h-5 w-5 shrink-0 text-[var(--gold)]" />
                    <span>{s}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
          <div>
            <Reveal>
              <div className="eyebrow mb-4">Who we work with</div>
              <h2 className="font-display text-3xl leading-tight">Sectors we serve.</h2>
            </Reveal>
            <ul className="mt-8 space-y-4">
              {r.sectors.map((s, i) => (
                <Reveal key={s} delay={i * 60}>
                  <li className="flex gap-3 text-muted-foreground">
                    <Globe2 className="h-5 w-5 shrink-0 text-[var(--gold)]" />
                    <span>{s}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container-x">
          <Reveal>
            <div className="eyebrow mb-4">Questions we are asked</div>
            <h2 className="font-display text-3xl md:text-4xl leading-tight max-w-3xl">
              ISO certification in {r.name}, answered.
            </h2>
          </Reveal>
          <div className="mt-12 divide-y divide-border border-y border-border">
            {r.faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 60}>
                <div className="py-8 grid md:grid-cols-12 gap-6">
                  <h3 className="md:col-span-5 font-display text-xl leading-snug">{f.q}</h3>
                  <p className="md:col-span-7 text-muted-foreground leading-relaxed">{f.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-14 flex flex-wrap gap-4">
            <Link to="/contact" className="btn-solid-navy">
              Talk to a consultant
            </Link>
            <Link to="/services" className="btn-outline-navy">
              Browse all services
            </Link>
            <Link to="/iso-certification" className="btn-outline-navy">
              Other regions
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
