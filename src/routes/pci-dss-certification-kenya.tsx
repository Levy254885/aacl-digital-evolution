import { createFileRoute, Link } from "@tanstack/react-router";
import { absUrl } from "@/lib/site-url";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { ArrowRight, CheckCircle2, Shield } from "lucide-react";

const TITLE = "PCI DSS Certification in Kenya | ISO & PCI DSS Consultancy | AACL Global";
const DESC =
  "PCI DSS certification support in Kenya. Practical gap assessment, remediation and audit readiness for cardholder data environments. Combined with ISO 27001 where needed. Onsite or remote.";
const SHARE = absUrl("/og-share.jpg");
const PATH = "/pci-dss-certification-kenya";

export const Route = createFileRoute("/pci-dss-certification-kenya")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      {
        name: "keywords",
        content:
          "pci dss certification in kenya, iso pci dss certification in kenya, PCI DSS Kenya, PCI DSS consultants Nairobi, cardholder data security Kenya",
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
  component: PciDssKenyaPage,
});

const deliverables = [
  "Scope definition and gap assessment against current PCI DSS",
  "Remediation planning and control implementation",
  "Evidence and documentation packs for QSA / assessment",
  "Integration with ISO 27001 where both standards apply",
  "Network and application control guidance aligned to cardholder data flows",
  "Ongoing compliance support via eCompliance",
];

const faqs = [
  {
    q: "Who needs PCI DSS in Kenya?",
    a: "Any organisation that stores, processes or transmits cardholder data — merchants, processors, fintechs, and service providers in the payment chain — typically needs to comply at the appropriate SAQ or ROC level.",
  },
  {
    q: "Can PCI DSS and ISO 27001 be implemented together?",
    a: "Yes. Many controls overlap. We design combined programmes so evidence and policies serve both frameworks without double work.",
  },
  {
    q: "Do you perform the formal QSA assessment?",
    a: "We provide gap assessment, remediation and readiness. Formal ROC assessment is performed by a PCI SSC-approved QSA; we prepare you so that engagement is efficient.",
  },
];

function PciDssKenyaPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Payment security · Kenya & worldwide"
        title="PCI DSS certification support in Kenya."
        lead="Practical gap assessment, remediation and audit readiness for organisations that store, process or transmit cardholder data. Combined ISO 27001 + PCI DSS programmes available."
        image="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=2000&q=80"
      />

      <section className="py-16 bg-background">
        <div className="container-x max-w-3xl">
          <Reveal>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Searching for <strong>PCI DSS certification in Kenya</strong> or combined ISO and PCI DSS support? AACL
              Global helps organisations scope, implement and prepare for PCI DSS assessments with clear evidence and
              board-ready reporting. Delivery from Nairobi onsite or remote worldwide.
            </p>
          </Reveal>
          <Reveal delay={60}>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Scope is everything. We start by mapping cardholder data flows so you neither over-scope (wasted cost)
              nor under-scope (failed assessment). Remediation is prioritised by risk and assessment timeline.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 bg-[var(--navy-deep)] text-[var(--bone)]">
        <div className="container-x">
          <Reveal>
            <h2 className="font-display text-3xl mb-8">What we deliver</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {deliverables.map((item, i) => (
              <Reveal key={i} delay={i * 40}>
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
          <Reveal delay={120}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/book"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Discuss PCI DSS scope <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/iso-27001-certification-kenya"
                className="inline-flex items-center gap-2 rounded-md border border-input px-5 py-3 text-sm font-medium hover:bg-accent"
              >
                ISO 27001 Kenya
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-12 bg-muted/40">
        <div className="container-x max-w-3xl">
          <h2 className="font-display text-xl mb-4">Related services & reading</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/services/security-standards-implementation" className="hover:text-[var(--navy)]">
                Security Standards Implementation & Audits
              </Link>
            </li>
            <li>
              <Link to="/iso-27001-certification-kenya" className="hover:text-[var(--navy)]">
                ISO 27001 Certification Kenya
              </Link>
            </li>
            <li>
              <Link to="/industries/banking-financial-services" className="hover:text-[var(--navy)]">
                Banking & Financial Services
              </Link>
            </li>
            <li>
              <Link
                to="/insights/$slug"
                params={{ slug: "pci-dss-certification-kenya-guide" }}
                className="hover:text-[var(--navy)]"
              >
                PCI DSS certification in Kenya: scope, cost drivers and a practical path
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
