import { createFileRoute, Link } from "@tanstack/react-router";
import { absUrl } from "@/lib/site-url";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { ArrowRight, CheckCircle2, Shield } from "lucide-react";

const TITLE = "SMaaS Kenya | Security Manager as a Service & Outsourced CISO | AACL Global";
const DESC =
  "Security Manager as a Service (SMaaS) and outsourced CISO in Kenya. Senior security leadership on retainer — governance, risk oversight and compliance without a full-time hire. Onsite or remote.";
const SHARE = absUrl("/og-share.jpg");
const PATH = "/smaas-kenya";

export const Route = createFileRoute("/smaas-kenya")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      {
        name: "keywords",
        content:
          "SMaaS Kenya, Security Manager as a Service Kenya, outsourced CISO Kenya, virtual CISO Kenya, security leadership Kenya",
      },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { property: "og:url", content: absUrl(PATH) },
      { property: "og:type", content: "website" },
      { property: "og:image", content: SHARE },
      { name: "twitter:image", content: SHARE },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: absUrl(PATH) }],
  }),
  component: SmaasKenyaPage,
});

const deliverables = [
  "Named senior security leader on your organisation chart",
  "Twelve-month security roadmap aligned to risk appetite",
  "Monthly executive security reports",
  "Quarterly board briefing packs",
  "Policy stewardship and compliance calendar ownership",
  "Vendor and customer assurance responses",
  "Incident response readiness and tabletop exercises",
  "Support during ISO 27001, PCI DSS or regulatory audits",
];

const faqs = [
  {
    q: "How many days per month is a typical SMaaS retainer?",
    a: "Retainers commonly range from two to ten days per month, with escalation capacity for incidents and audits. We size the engagement to your risk profile and budget.",
  },
  {
    q: "Is this the same as a virtual CISO?",
    a: "SMaaS is our branded model for outsourced / fractional security leadership — equivalent in intent to a virtual or fractional CISO, with clear governance deliverables and AACL practice backing.",
  },
  {
    q: "Do you work only in Kenya?",
    a: "We are based in Nairobi and serve clients across Kenya onsite and internationally remote. Many retainers are delivered primarily remotely with periodic onsite presence.",
  },
];

function SmaasKenyaPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Security leadership · Kenya & worldwide"
        title="Security Manager as a Service (SMaaS) in Kenya."
        lead="Senior security leadership and enterprise risk oversight on retainer. Outsourced CISO capability without the cost of a full-time executive hire."
        image="https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=2000&q=80"
      />

      <section className="py-16 bg-background">
        <div className="container-x max-w-3xl">
          <Reveal>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Many organisations need experienced security leadership but cannot justify a full-time CISO. AACL Global
              provides Security Manager as a Service — named senior practitioners who own governance, risk oversight,
              compliance calendars and board reporting on a retainer basis.
            </p>
          </Reveal>
          <Reveal delay={60}>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Ideal for growth-stage companies, mid-market firms facing rising customer and regulator expectations, and
              enterprises needing interim leadership during CISO transition. Backed by AACL’s wider ISO, GSMA and risk
              practice.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 bg-[var(--navy-deep)] text-[var(--bone)]">
        <div className="container-x">
          <Reveal>
            <h2 className="font-display text-3xl mb-8">What SMaaS delivers</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {deliverables.map((item, i) => (
              <Reveal key={i} delay={i * 35}>
                <div className="flex gap-3 items-start">
                  <CheckCircle2 className="h-5 w-5 text-[var(--gold)] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container-x max-w-3xl">
          <Reveal>
            <h2 className="font-display text-3xl mb-8">Frequently asked questions</h2>
          </Reveal>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <Reveal key={i} delay={i * 40}>
                <div>
                  <h3 className="font-display text-lg mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={100}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/book"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Discuss SMaaS <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/services/security-manager-as-a-service"
                className="inline-flex items-center gap-2 rounded-md border border-input px-5 py-3 text-sm font-medium hover:bg-accent"
              >
                Full SMaaS service details
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-12 bg-muted/40">
        <div className="container-x max-w-3xl">
          <h2 className="font-display text-xl mb-4">Related services</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/services/security-manager-as-a-service" className="hover:text-[var(--navy)]">
                Security Manager as a Service
              </Link>
            </li>
            <li>
              <Link to="/services/risk-and-vulnerability-assessments" className="hover:text-[var(--navy)]">
                Risk & Vulnerability Assessments
              </Link>
            </li>
            <li>
              <Link to="/iso-27001-certification-kenya" className="hover:text-[var(--navy)]">
                ISO 27001 Certification Kenya
              </Link>
            </li>
            <li>
              <Link to="/ecompliance" className="hover:text-[var(--navy)]">
                eCompliance
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
