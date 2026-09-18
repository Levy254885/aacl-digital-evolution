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
import { SiteBreadcrumbs } from "@/components/site/SiteBreadcrumbs";
import { PricingTable, PaymentMethods } from "@/components/site/PricingTable";
import { startEcomplianceCheckout } from "@/lib/ecompliance-checkout";
import type { PaymentMethodId } from "@/lib/orders";
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

const TITLE = "eCompliance | Compliance as a Service, Onsite or Remote | AACL";
const DESCRIPTION =
  "AACL eCompliance is a managed compliance platform: dashboards, CAPA, risk registers, audit tracking, compliance calendars and document workflows. Delivered onsite or remotely, worldwide.";

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
          name: "eCompliance. Compliance as a Service",
          serviceType: "Managed ISO compliance platform and consultancy",
          description: DESCRIPTION,
          provider: {
            "@type": "Organization",
            name: "Audits and Assurance Consult Ltd",
            alternateName: "AACL Global",
            url: absUrl("/"),
          },
          areaServed: "Worldwide",
          url: absUrl("/ecompliance"),
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
      <SiteBreadcrumbs items={[{ label: "Home", href: "/" }, { label: "eCompliance" }]} />
      <PageHero
        eyebrow="eCompliance"
        title="World Class Compliance to Drive Your Business Forward."
        lead="Cybersecurity audits, health & safety, physical and logical security and ongoing ISO maintenance. Handled continuously for one predictable monthly fee, onsite or remote, anywhere in the world."
      />

      <section className="py-12 border-b border-border bg-background">
        <div className="container-x max-w-3xl">
          <Reveal>
            <h2 className="font-display text-2xl leading-tight text-foreground mb-4">What is eCompliance?</h2>
            <p className="text-base md:text-lg leading-relaxed text-foreground">
              eCompliance is AACL Global's compliance-as-a-service model: continuous management of ISO
              and related compliance obligations so your organisation stays audit-ready without building a
              full in-house compliance team.
            </p>
          </Reveal>
        </div>
      </section>

      <ServiceOptions />

      <section className="py-24 bg-background">
        <div className="container-x">
          <Reveal>
            <div className="eyebrow mb-4">Subscription plans</div>
            <h2 className="font-display text-3xl md:text-4xl leading-tight max-w-3xl">
              Indicative pricing. Confirmed after a short scoping call.
            </h2>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {ECOMPLIANCE_PLANS.map((p, i) => (
              <Reveal key={p.name} delay={i * 90}>
                <div
                  className={`h-full rounded-[18px] p-8 flex flex-col border ${
                    p.featured ? "border-[var(--gold)] bg-[var(--bone)]" : "border-border bg-background"
                  }`}
                >
                  <h3 className="font-display text-2xl">{p.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
                  <p className="mt-6 font-display text-3xl">
                    <span className="text-sm text-muted-foreground align-middle mr-1">From</span>${p.from}
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
            <SubscribePanel />
          </div>
        </div>
      </section>

      <section className="py-24 bg-[var(--bone)]">
        <div className="container-x grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-4">
            <Reveal>
              <div className="eyebrow mb-4">FAQ</div>
              <h2 className="font-display text-3xl md:text-4xl leading-tight">eCompliance, answered.</h2>
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

function SubscribePanel() {
  const [tier, setTier] = useState("Essentials");
  const [method, setMethod] = useState<PaymentMethodId>("card");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [busy, setBusy] = useState(false);

  return (
    <div className="mt-14 rounded-[20px] border border-border bg-background p-8 md:p-10">
      <h3 className="font-display text-2xl">Start eCompliance</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Pay by M-Pesa, Visa/Mastercard, or PayPal. We activate your retainer after payment confirms.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="text-sm">
          Plan
          <select className="mt-1 w-full rounded-md border border-border px-3 py-2" value={tier} onChange={(e) => setTier(e.target.value)}>
            <option>Essentials</option>
            <option>Growth</option>
            <option>Enterprise</option>
          </select>
        </label>
        <label className="text-sm">
          Payment method
          <select className="mt-1 w-full rounded-md border border-border px-3 py-2" value={method} onChange={(e) => setMethod(e.target.value as PaymentMethodId)}>
            <option value="mpesa">M-Pesa</option>
            <option value="card">Visa / Mastercard</option>
            <option value="paypal">PayPal</option>
          </select>
        </label>
        <label className="text-sm">
          Full name
          <input className="mt-1 w-full rounded-md border border-border px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label className="text-sm">
          Work email
          <input type="email" className="mt-1 w-full rounded-md border border-border px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        {method === "mpesa" && (
          <label className="text-sm md:col-span-2">
            M-Pesa phone
            <input className="mt-1 w-full rounded-md border border-border px-3 py-2" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="2547…" />
          </label>
        )}
      </div>
      <button
        type="button"
        className="btn-gold mt-6"
        disabled={busy}
        onClick={async () => {
          setBusy(true);
          try {
            await startEcomplianceCheckout({ tier, method, name, email, phone });
          } finally {
            setBusy(false);
          }
        }}
      >
        {busy ? "Starting…" : "Continue to payment"}
      </button>
    </div>
  );
}
