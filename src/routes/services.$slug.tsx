import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { absUrl, OG_IMAGE } from "@/lib/site-url";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { SiteBreadcrumbs } from "@/components/site/SiteBreadcrumbs";
import { Reveal } from "@/components/site/Reveal";
import { SERVICES, INSIGHTS, type ServiceMeta } from "@/lib/aacl-content";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = SERVICES.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Service not found | AACL" }, { name: "robots", content: "noindex" }] };
    }
    const s = loaderData.service;
    const jsonld = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          name: s.title,
          serviceType: s.title,
          description: s.summary,
          provider: {
            "@type": "Organization",
            name: "Audits and Assurance Consult Ltd",
            alternateName: "AACL Global",
            url: absUrl("/"),
          },
          areaServed: "Worldwide",
          url: absUrl(`/services/${s.slug}`),
        },
        {
          "@type": "FAQPage",
          mainEntity: s.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
            { "@type": "ListItem", position: 2, name: "Services", item: absUrl("/services") },
            { "@type": "ListItem", position: 3, name: s.title, item: absUrl(`/services/${s.slug}`) },
          ],
        },
      ],
    };
    return {
      meta: [
        { title: `${s.title} | AACL Global` },
        { name: "description", content: s.summary },
        { property: "og:title", content: `${s.title} | AACL Global` },
        { property: "og:description", content: s.summary },
        { name: "twitter:title", content: `${s.title} | AACL Global` },
        { name: "twitter:description", content: s.summary },
        { property: "og:url", content: absUrl(`/services/${s.slug}`) },
        { property: "og:type", content: "article" },
        { property: "og:image", content: s.image?.startsWith("http") ? OG_IMAGE : (s.image || OG_IMAGE) },
        { name: "twitter:image", content: s.image?.startsWith("http") ? OG_IMAGE : (s.image || OG_IMAGE) },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: absUrl(`/services/${s.slug}`) }],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonld) }],
    };
  },
  component: ServiceDetail,
  notFoundComponent: () => (
    <PageShell><div className="container-x py-40 text-center"><h1 className="font-display text-4xl">Service not found</h1><Link to="/services" className="btn-outline-navy mt-8 inline-flex">Back to services</Link></div></PageShell>
  ),
  errorComponent: () => (
    <PageShell><div className="container-x py-40 text-center"><h1 className="font-display text-4xl">Something went wrong</h1></div></PageShell>
  ),
});

function ServiceDetail() {
  const { service: s } = Route.useLoaderData() as { service: ServiceMeta };
  const [openFaq, setOpenFaq] = useState<string>();

  return (
    <PageShell>
      <SiteBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: s.title },
        ]}
      />
      <PageHero eyebrow={`Service ${s.number}`} title={s.title} lead={s.short} image={s.image} />

      <section className="py-12 border-b border-border bg-background">
        <div className="container-x max-w-3xl">
          <Reveal>
            <p className="text-base md:text-lg leading-relaxed text-foreground">
              {s.summary}
            </p>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Delivered onsite or remotely worldwide by AACL Global (Audits and Assurance Consult Ltd),
              headquartered in Nairobi, Kenya, for organisations across Africa and international markets.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container-x grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-4">
            <Reveal>
              <div className="eyebrow mb-4">Overview</div>
              <h2 className="font-display text-3xl leading-tight">{s.summary}</h2>
            </Reveal>
          </div>
          <div className="lg:col-span-8 space-y-5 text-muted-foreground leading-relaxed">
            {s.detail.map((p, i) => (
              <Reveal key={i} delay={i * 80}><p>{p}</p></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[var(--bone)]">
        <div className="container-x grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="eyebrow mb-4">Business challenges</div>
              <h2 className="font-display text-3xl md:text-4xl leading-tight">The conditions that bring organisations to AACL.</h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <ul className="space-y-4">
              {s.challenges.map((c, i) => (
                <Reveal key={c} delay={i * 60}>
                  <li className="flex gap-4 border-t border-border pt-4">
                    <span className="font-display text-[var(--gold)] text-sm">0{i + 1}</span>
                    <span className="text-foreground">{c}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[var(--navy-deep)] text-[var(--bone)]">
        <div className="container-x">
          <Reveal>
            <div className="eyebrow eyebrow-light mb-4">Consulting methodology</div>
            <h2 className="font-display text-3xl md:text-5xl leading-tight max-w-2xl mb-14">A structured, evidence-based delivery model.</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
            {s.methodology.map((m, i) => (
              <Reveal key={m.title} delay={i * 70}>
                <div className="bg-[var(--navy-deep)] p-8">
                  <div className="font-display text-[var(--gold)] tracking-[0.3em] text-sm">0{i + 1}</div>
                  <h3 className="font-display text-xl mt-4 text-[var(--bone)]">{m.title}</h3>
                  <p className="text-sm text-white/60 mt-3 leading-relaxed">{m.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container-x grid lg:grid-cols-2 gap-14">
          <Reveal>
            <div className="eyebrow mb-4">Deliverables</div>
            <h2 className="font-display text-3xl mb-8 leading-tight">What you receive.</h2>
            <ul className="space-y-4">
              {s.deliverables.map((d) => (
                <li key={d} className="flex gap-3 items-start">
                  <Check size={18} className="text-[var(--gold)] mt-1 shrink-0" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <div className="eyebrow mb-4">Relevant standards</div>
            <h2 className="font-display text-3xl mb-8 leading-tight">International frameworks we apply.</h2>
            <div className="flex flex-wrap gap-3">
              {s.standards.map((st) => (
                <span key={st} className="px-4 py-2 border border-[var(--gold)]/40 text-sm text-foreground">
                  {st}
                </span>
              ))}
            </div>
            <div className="eyebrow mt-14 mb-4">Industries served</div>
            <div className="flex flex-wrap gap-2">
              {s.industries.map((i) => (
                <span key={i} className="text-sm text-muted-foreground">{i}<span className="text-[var(--gold)] px-2">·</span></span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 bg-[var(--bone)]">
        <div className="container-x grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-4">
            <Reveal>
              <div className="eyebrow mb-4">FAQ</div>
              <h2 className="font-display text-3xl md:text-4xl leading-tight">Answers to questions we're commonly asked.</h2>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Accordion.Root type="single" collapsible value={openFaq} onValueChange={setOpenFaq}>
              {s.faqs.map((f, i) => (
                <Accordion.Item key={i} value={String(i)} className="border-b border-border">
                  <Accordion.Trigger className="w-full flex justify-between items-start py-6 text-left group">
                    <span className="font-display text-lg pr-6">{f.q}</span>
                    <ChevronDown className="text-[var(--gold)] transition-transform data-[state=open]:rotate-180 mt-1 shrink-0" />
                  </Accordion.Trigger>
                  <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                    <p className="pb-6 text-muted-foreground leading-relaxed">{f.a}</p>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container-x">
          <Reveal>
            <div className="eyebrow mb-4">Related resources</div>
            <h2 className="font-display text-3xl leading-tight mb-8">Continue exploring this topic.</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-display text-lg mb-4">Knowledge Hub</h3>
              <ul className="space-y-3">
                {INSIGHTS.slice(0, 4).map((post) => (
                  <li key={post.slug}>
                    <Link
                      to="/insights/$slug"
                      params={{ slug: post.slug }}
                      className="text-sm text-muted-foreground hover:text-[var(--navy)] transition-colors"
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/insights" className="text-sm text-[var(--gold)]">All insights →</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-display text-lg mb-4">Next steps</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link to="/industries" className="hover:text-[var(--navy)]">Browse industries we support</Link>
                </li>
                <li>
                  <Link to="/ecompliance" className="hover:text-[var(--navy)]">eCompliance continuous compliance</Link>
                </li>
                <li>
                  <Link to="/iso-certification" className="hover:text-[var(--navy)]">ISO certification by region</Link>
                </li>
                <li>
                  <Link to="/templates" className="hover:text-[var(--navy)]">Templates and document tools</Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-[var(--navy)]">Contact AACL</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[var(--navy-deep)] text-[var(--bone)]">
        <div className="container-x text-center max-w-3xl mx-auto">
          <Reveal>
            <div className="eyebrow mb-6 flex justify-center">Ready to begin</div>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">Speak with an AACL senior consultant about this engagement.</h2>
            <div className="mt-10 flex justify-center gap-4 flex-wrap">
              <Link to="/book" className="btn-gold">Book a consultation <ArrowRight size={16} /></Link>
              <Link to="/services" className="btn-outline-navy">All services</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
