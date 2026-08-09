import { createFileRoute, Link } from "@tanstack/react-router";
import { absUrl } from "@/lib/site-url";
import { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import {
  ArrowRight,
  BarChart3,
  BellRing,
  CalendarClock,
  Check,
  ChevronDown,
  ClipboardCheck,
  FileCheck,
  Gauge,
  ShieldAlert,
  Siren,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { PricingTable, PaymentMethods } from "@/components/site/PricingTable";
import { CostBanner, CostFaq } from "@/components/site/CostObjection";
import { ECOMPLIANCE_PRICING } from "@/lib/pricing-content";

import { Reveal } from "@/components/site/Reveal";
import { ServiceOptions } from "@/components/site/ServiceOptions";
import {
  ECOMPLIANCE_FAQS,
  ECOMPLIANCE_MODULES,
  ECOMPLIANCE_PLANS,
  DELIVERY_STRAPLINE,
} from "@/lib/ecompliance-content";

const TITLE = "eCompliance — Compliance as a Service, Onsite or Remote | AACL";
const DESCRIPTION =
  "AACL eCompliance is a managed compliance platform: dashboards, CAPA, risk registers, audit tracking, compliance calendars and document workflows — delivered onsite or remotely, worldwide.";

const ICONS: Record<string, LucideIcon> = {
  gauge: Gauge,
  wrench: Wrench,
  "shield-alert": ShieldAlert,
  "clipboard-check": ClipboardCheck,
  "calendar-clock": CalendarClock,
  siren: Siren,
  "file-check": FileCheck,
  "bell-ring": BellRing,
  "bar-chart-3": BarChart3,
};

export const Route = createFileRoute("/ecompliance")({
  head: () => {
    const jsonld = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          name: "eCompliance — Compliance as a Service",
          serviceType: "Managed ISO compliance platform and consultancy",
          description: DESCRIPTION,
          provider: { "@type": "Organization", name: "Audits and Assurance Consult Ltd", url: "/" },
          areaServed: "Worldwide",
          url: "/ecompliance",
          offers: ECOMPLIANCE_PLANS.map((p) => ({
            "@type": "Offer",
            name: p.name,
            price: p.from,
            priceCurrency: "USD",
            description: p.body,
          })),
        },
        {
          "@type": "FAQPage",
          mainEntity: ECOMPLIANCE_FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
            { "@type": "ListItem", position: 2, name: "eCompliance", item: absUrl("/ecompliance") },
          ],
        },
      ],
    };
    return {
      meta: [
        { title: TITLE },
        { name: "description", content: DESCRIPTION },
        { property: "og:title", content: TITLE },
        { property: "og:description", content: DESCRIPTION },
        { name: "twitter:title", content: TITLE },
        { name: "twitter:description", content: DESCRIPTION },
        { property: "og:type", content: "website" },
        { property: "og:url", content: absUrl("/ecompliance") },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: absUrl("/ecompliance") }],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonld) }],
    };
  },
  component: ECompliancePage,
});

function ECompliancePage() {
  const [openFaq, setOpenFaq] = useState<string>();

  return (
    <PageShell>
      <PageHero
        eyebrow="eCompliance"
        title="World Class Compliance to Drive Your Business Forward."
        lead="Cybersecurity audits, health & safety, physical and logical security and ongoing ISO maintenance — handled continuously for one predictable monthly fee, onsite or remote, anywhere in the world."
      />


      {/* Value strip */}
      <section className="py-16 bg-[var(--navy-deep)] text-[var(--bone)]">
        <div className="container-x grid md:grid-cols-3 gap-px bg-white/10">
          {[
            { k: "Always audit-ready", v: "Evidence maintained continuously, clause by clause." },
            { k: "One integrated system", v: "Multiple standards, one audit programme, one review." },
            { k: DELIVERY_STRAPLINE, v: "Remote across every timezone; onsite on request." },
          ].map((item, i) => (
            <Reveal key={item.k} delay={i * 80}>
              <div className="bg-[var(--navy-deep)] p-8">
                <h3 className="font-display text-xl text-[var(--bone)]">{item.k}</h3>
                <p className="text-sm text-white/60 mt-3 leading-relaxed">{item.v}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Modules */}
      <section className="py-24 bg-background">
        <div className="container-x">
          <Reveal>
            <div className="eyebrow mb-4">Platform modules</div>
            <h2 className="font-display text-3xl md:text-4xl leading-tight max-w-3xl">
              Everything an auditor asks for, in one operating system.
            </h2>
          </Reveal>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ECOMPLIANCE_MODULES.map((m, i) => {
              const Icon = ICONS[m.icon] ?? Gauge;
              return (
                <Reveal key={m.title} delay={i * 60}>
                  <div className="h-full border border-border rounded-[18px] p-7 bg-background hover:border-[var(--gold)]/60 transition-colors">
                    <span className="w-11 h-11 rounded-full bg-[var(--bone)] grid place-items-center">
                      <Icon size={19} className="text-[var(--gold)]" aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-xl mt-5">{m.title}</h3>
                    <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{m.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Two service options */}
      <ServiceOptions />

      {/* Plans */}
      <section className="py-24 bg-background">
        <div className="container-x">
          <Reveal>
            <div className="eyebrow mb-4">Subscription plans</div>
            <h2 className="font-display text-3xl md:text-4xl leading-tight max-w-3xl">
              Indicative pricing. Confirmed after a short scoping call.
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl">
              Reference currency is USD. Bundled discounts apply when eCompliance is combined with certification
              consultancy or training.
            </p>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {ECOMPLIANCE_PLANS.map((p, i) => (
              <Reveal key={p.name} delay={i * 90}>
                <div
                  className={`h-full rounded-[18px] p-8 flex flex-col border ${
                    p.featured
                      ? "border-[var(--gold)] bg-[var(--bone)]"
                      : "border-border bg-background"
                  }`}
                >
                  <h3 className="font-display text-2xl">{p.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
                  <p className="mt-6 font-display text-3xl">
                    <span className="text-sm text-muted-foreground align-middle mr-1">From</span>
                    ${p.from}
                    <span className="text-sm text-muted-foreground font-sans ml-1">USD {p.period}</span>
                  </p>
                  <ul className="mt-6 space-y-3 flex-1">
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-3 items-start text-sm">
                        <Check size={16} className="text-[var(--gold)] mt-0.5 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/book" className={`mt-8 self-start ${p.featured ? "btn-gold" : "btn-outline-navy"}`}>
                    Request a quote <ArrowRight size={16} />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-16">
            <PricingTable rows={ECOMPLIANCE_PRICING} columnLabel="eCompliance plan" />
          </div>
          <div className="mt-12 grid lg:grid-cols-2 gap-6 items-start">
            <CostBanner variant="a" />
            <CostFaq />
          </div>
          <div className="mt-16">
            <h3 className="font-display text-2xl font-extrabold mb-6">Ways to pay</h3>
            <PaymentMethods />
          </div>
        </div>
      </section>



      {/* FAQ */}
      <section className="py-24 bg-[var(--bone)]">
        <div className="container-x grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-4">
            <Reveal>
              <div className="eyebrow mb-4">FAQ</div>
              <h2 className="font-display text-3xl md:text-4xl leading-tight">
                eCompliance, answered.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Accordion.Root type="single" collapsible value={openFaq} onValueChange={setOpenFaq}>
              {ECOMPLIANCE_FAQS.map((f, i) => (
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
            <div className="eyebrow eyebrow-light mb-6 flex justify-center">Get started</div>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">
              Put your compliance on autopilot with AACL.
            </h2>
            <div className="mt-10 flex justify-center gap-4 flex-wrap">
              <Link to="/book" className="btn-gold">
                Book a scoping call <ArrowRight size={16} />
              </Link>
              <Link to="/templates" className="btn-outline-gold">
                Generate ISO documents
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
