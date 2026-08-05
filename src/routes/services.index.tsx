import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { SERVICES } from "@/lib/aacl-content";
import { ArrowRight } from "lucide-react";
import { ServiceOptions } from "@/components/site/ServiceOptions";
import { PricingTable } from "@/components/site/PricingTable";
import { CostBanner, CostFaq } from "@/components/site/CostObjection";
import { ISO_PRICING, ISO_PRICING_NOTES, type PricingRow } from "@/lib/pricing-content";
import { useCms } from "@/lib/cms";


export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — Security, Compliance & ISO Consultancy | AACL" },
      { name: "description", content: "AACL delivers risk assessments, ISO management systems, security standards implementation, SMaaS and statutory compliance consultancy." },
      { property: "og:title", content: "AACL Services" },
      { property: "og:description", content: "Executive-grade security, compliance and ISO consultancy across five practice areas." },
      { property: "og:url", content: "/services" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "/" },
            { "@type": "ListItem", position: 2, name: "ISO Management Systems", item: "/services" },
          ],
        }),
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const services = useCms<typeof SERVICES>("services", SERVICES);
  const pricing = useCms<PricingRow[]>("pricing_iso", ISO_PRICING);

  return (
    <PageShell>
      <PageHero
        eyebrow="ISO management systems"
        title="Certification, Without the Guesswork."
        lead="Whichever standard you need — ISO 9001, 27001, 45001, 22000 or any other — we walk you from gap assessment to certificate. Available Onsite or Remote — Worldwide."
        image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2000&q=80"
      />

      <section className="py-24 bg-background">
        <div className="container-x space-y-px bg-border">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 60}>
              <Link
                to="/services/$slug"
                params={{ slug: s.slug }}
                className="group bg-background grid md:grid-cols-12 gap-8 p-10 hover:bg-[var(--navy-deep)] hover:text-[var(--bone)] transition-colors"
              >
                <div className="md:col-span-1 font-display text-[var(--gold)] text-sm tracking-[0.3em]">{s.number}</div>
                <div className="md:col-span-4">
                  <h3 className="font-display text-2xl md:text-3xl leading-tight group-hover:text-[var(--bone)]">{s.title}</h3>
                </div>
                <div className="md:col-span-6 text-muted-foreground group-hover:text-white/70 leading-relaxed">
                  {s.short}
                </div>
                <div className="md:col-span-1 flex md:justify-end items-start">
                  <ArrowRight className="text-[var(--gold)] transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <ServiceOptions />

      <section className="py-24 bg-background">
        <div className="container-x">
          <Reveal>
            <div className="eyebrow mb-4">Indicative pricing</div>
            <h2 className="font-display text-3xl md:text-4xl leading-tight max-w-3xl">
              Transparent starting prices. Final scope confirmed on a short call.
            </h2>
          </Reveal>
          <div className="mt-12">
            <PricingTable rows={pricing} notes={ISO_PRICING_NOTES} />
          </div>
          <div className="mt-12 grid lg:grid-cols-2 gap-6 items-start">
            <CostBanner variant="b" />
            <CostFaq />
          </div>
        </div>
      </section>
    </PageShell>

  );
}
