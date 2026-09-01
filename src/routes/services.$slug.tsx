import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { absUrl } from "@/lib/site-url";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { SERVICES, type ServiceMeta } from "@/lib/aacl-content";
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
          provider: { "@type": "Organization", name: "Audits and Assurance Consult Ltd", alternateName: "AACL Global", url: "/" },
          areaServed: "Worldwide",
          url: `/services/${s.slug}`,
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
        { title: `${s.title} | AACL` },
        { name: "description", content: s.summary },
        { property: "og:title", content: `${s.title} | AACL` },
        { property: "og:description", content: s.summary },
        { name: "twitter:title", content: `${s.title} | AACL` },
        { name: "twitter:description", content: s.summary },
        { property: "og:url", content: absUrl(`/services/${s.slug}`) },
        { property: "og:type", content: "article" },
        { property: "og:image", content: s.image },
        { name: "twitter:image", content: s.image },
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
      <PageHero eyebrow={`Service ${s.number}`} title={s.title} lead={s.short} image={s.image} />

      <section className="pt-10">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow">Available onsite or remote. Worldwide.</p>
          </Reveal>
        </div>
      </section>


      {/* Overview */}
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

      {/* Challenges */}
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

      {/* Methodology */}
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

      {/* Deliverables + Standards */}
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

      {/* FAQ */}
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

      {/* CTA */}
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
