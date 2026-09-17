import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { absUrl, OG_IMAGE, SITE_URL } from "@/lib/site-url";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { SiteBreadcrumbs } from "@/components/site/SiteBreadcrumbs";
import { Reveal } from "@/components/site/Reveal";
import { INDUSTRIES, SERVICES, type IndustryMeta } from "@/lib/aacl-content";
import { ArrowRight, Check } from "lucide-react";

export const Route = createFileRoute("/industries/$slug")({
  loader: ({ params }) => {
    const industry = INDUSTRIES.find((i) => i.slug === params.slug);
    if (!industry) throw notFound();
    return { industry };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Industry not found | AACL" }, { name: "robots", content: "noindex" }] };
    const i = loaderData.industry;
    const pageUrl = absUrl(`/industries/${i.slug}`);
    const ogImg = i.image?.startsWith("http") ? OG_IMAGE : (i.image || OG_IMAGE);
    const jsonld = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": pageUrl,
          url: pageUrl,
          name: `${i.name} Industry Expertise | AACL Global`,
          description: i.short,
          isPartOf: { "@id": `${SITE_URL}/#website` },
          about: { "@id": `${SITE_URL}/#organization` },
          inLanguage: "en",
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
            { "@type": "ListItem", position: 2, name: "Industries", item: absUrl("/industries") },
            { "@type": "ListItem", position: 3, name: i.name, item: pageUrl },
          ],
        },
      ],
    };
    return {
      meta: [
        { title: `${i.name} Industry Expertise | AACL Global` },
        { name: "description", content: i.short },
        { property: "og:title", content: `${i.name} Industry Expertise | AACL Global` },
        { property: "og:description", content: i.short },
        { name: "twitter:title", content: `${i.name} | AACL Global` },
        { name: "twitter:description", content: i.short },
        { property: "og:url", content: pageUrl },
        { property: "og:type", content: "website" },
        { property: "og:image", content: ogImg },
        { name: "twitter:image", content: ogImg },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: pageUrl }],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonld) }],
    };
  },
  component: IndustryDetail,
  notFoundComponent: () => (
    <PageShell><div className="container-x py-40 text-center"><h1 className="font-display text-4xl">Industry not found</h1><Link to="/industries" className="btn-outline-gold mt-8 inline-flex">All industries</Link></div></PageShell>
  ),
  errorComponent: () => (
    <PageShell><div className="container-x py-40 text-center"><h1 className="font-display text-4xl">Something went wrong</h1></div></PageShell>
  ),
});

function IndustryDetail() {
  const { industry: i } = Route.useLoaderData() as { industry: IndustryMeta };
  return (
    <PageShell>
      <SiteBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Industries", href: "/industries" },
          { label: i.name },
        ]}
      />
      <PageHero eyebrow="Industry" title={i.name} lead={i.short} image={i.image} />

      <section className="py-24 bg-background">
        <div className="container-x grid lg:grid-cols-2 gap-14">
          <Reveal>
            <div className="eyebrow mb-4">Industry risks</div>
            <h2 className="font-display text-3xl mb-8 leading-tight">The exposures we help you manage.</h2>
            <ul className="space-y-4">
              {i.risks.map((r) => (
                <li key={r} className="flex gap-3 border-t border-border pt-4"><span className="text-[var(--gold)]">•</span><span>{r}</span></li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <div className="eyebrow mb-4">Regulatory & standards environment</div>
            <h2 className="font-display text-3xl mb-8 leading-tight">Frameworks that shape your obligations.</h2>
            <div className="flex flex-wrap gap-3">
              {i.regulations.map((r) => (
                <span key={r} className="px-4 py-2 border border-[var(--gold)]/40 text-sm">{r}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 bg-[var(--bone)]">
        <div className="container-x grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="eyebrow mb-4">Common challenges</div>
              <h2 className="font-display text-3xl md:text-4xl leading-tight">Operational realities in {i.name.toLowerCase()}.</h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <ul className="space-y-4">
              {i.challenges.map((c, idx) => (
                <Reveal key={c} delay={idx * 60}>
                  <li className="flex gap-4 border-t border-border pt-4">
                    <span className="font-display text-[var(--gold)] text-sm">0{idx + 1}</span>
                    <span>{c}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[var(--navy-deep)] text-[var(--bone)]">
        <div className="container-x grid lg:grid-cols-2 gap-14">
          <Reveal>
            <div className="eyebrow eyebrow-light mb-4">AACL's approach</div>
            <h2 className="font-display text-3xl md:text-4xl leading-tight mb-6">How we deliver in this sector.</h2>
            <p className="text-white/70 leading-relaxed">{i.approach}</p>
          </Reveal>
          <Reveal delay={120}>
            <div className="eyebrow eyebrow-light mb-4">Expected outcomes</div>
            <ul className="space-y-4">
              {i.outcomes.map((o) => (
                <li key={o} className="flex gap-3 items-start"><Check size={18} className="text-[var(--gold)] mt-1 shrink-0" /><span>{o}</span></li>
              ))}
            </ul>
            <Link to="/book" className="btn-gold mt-10 inline-flex">Book a consultation <ArrowRight size={16} /></Link>
          </Reveal>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container-x">
          <Reveal>
            <div className="eyebrow mb-4">Related services</div>
            <h2 className="font-display text-3xl md:text-4xl leading-tight mb-10 max-w-2xl">
              Consultancy that maps to the risks and standards in {i.name.toLowerCase()}.
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.slice(0, 5).map((s, idx) => (
              <Reveal key={s.slug} delay={idx * 50}>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="block border border-border rounded-[18px] p-6 h-full hover:border-[var(--gold)]/50 transition-colors"
                >
                  <div className="text-xs tracking-[0.2em] text-[var(--gold)] mb-3">SERVICE {s.number}</div>
                  <h3 className="font-display text-lg leading-snug text-foreground">{s.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">{s.short}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--navy)]">
                    View service <ArrowRight size={14} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-10">
            <Link to="/services" className="btn-outline-navy inline-flex">All services</Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
