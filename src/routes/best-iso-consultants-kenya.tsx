import { createFileRoute, Link } from "@tanstack/react-router";
import { absUrl } from "@/lib/site-url";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { ArrowRight, CheckCircle2, Shield } from "lucide-react";

const TITLE = "Best ISO Consultants in Kenya 2026 | Why Choose AACL Global";
const DESC =
  "Looking for the best ISO consultants in Kenya? AACL Global combines senior practitioners, transparent pricing, physical + cyber expertise and worldwide remote delivery from Nairobi.";
const SHARE = absUrl("/og-share.jpg");
const PATH = "/best-iso-consultants-kenya";

export const Route = createFileRoute("/best-iso-consultants-kenya")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      {
        name: "keywords",
        content:
          "best ISO consultants Kenya, best ISO consultants Nairobi, top ISO consultancy Kenya, ISO consultants Kenya 2026, ISO certification consultants Kenya",
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
  component: BestConsultantsPage,
});

const criteria = [
  {
    title: "Named senior practitioners",
    body: "Consultants who have led security, compliance and audit functions inside banks, telecoms, security printers and manufacturers — not only classroom-trained advisors.",
  },
  {
    title: "Systems teams actually use",
    body: "Documentation and controls designed for daily operations, not shelfware that satisfies an auditor once and is ignored thereafter.",
  },
  {
    title: "Transparent commercial approach",
    body: "Talk budget first. Indicative ranges by organisation size, then a scoped proposal — no one-size-fits-all brochure pricing.",
  },
  {
    title: "Physical + cyber + standards in one practice",
    body: "ISO management systems, GSMA SAS, PCI DSS, risk assessment and statutory compliance under one roof so programmes stay coherent.",
  },
  {
    title: "Onsite Nairobi or remote worldwide",
    body: "Headquartered at Vision Towers, Westlands. Delivery across Kenya onsite and fully remote for international clients.",
  },
  {
    title: "Sustainment after the certificate",
    body: "Surveillance support, internal audit and optional eCompliance so certification remains practical year after year.",
  },
];

const faqs = [
  {
    q: "What should I look for in an ISO consultant in Kenya?",
    a: "Experience implementing systems that survive real operations, clear scoping and pricing, relevant sector knowledge, and the ability to support you through certification body audits — not only documentation templates.",
  },
  {
    q: "Does AACL work only in Nairobi?",
    a: "No. We are based in Westlands, Nairobi, and deliver onsite across Kenya as well as remote programmes worldwide.",
  },
  {
    q: "Which standards do you support?",
    a: "ISO 9001, ISO/IEC 27001, ISO 45001, ISO 14001, ISO 22301 and related standards, plus GSMA SAS, PCI DSS and statutory compliance programmes.",
  },
];

function BestConsultantsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Why AACL"
        title="Best ISO consultants in Kenya — what actually matters."
        lead="Senior practitioners, transparent pricing, combined physical and cyber expertise, and delivery that works onsite in Nairobi or remote worldwide."
        image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80"
      />

      <section className="py-16 bg-background">
        <div className="container-x max-w-3xl">
          <Reveal>
            <p className="text-lg text-muted-foreground leading-relaxed">
              When organisations search for the best ISO consultants in Kenya they usually want three things: people who
              have done the work inside real businesses, systems that teams will actually use, and a commercial approach
              that respects budget. That is how AACL Global operates.
            </p>
          </Reveal>
          <Reveal delay={60}>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              AACL Global is the trading name of Audits and Assurance Consult Ltd. We are headquartered in Nairobi and
              serve clients across Africa and international markets with the same senior practitioners onsite or remote.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 bg-[var(--navy-deep)] text-[var(--bone)]">
        <div className="container-x">
          <Reveal>
            <h2 className="font-display text-3xl mb-8">How we define “best”</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-8">
            {criteria.map((c, i) => (
              <Reveal key={i} delay={i * 40}>
                <div className="flex gap-3 items-start">
                  <CheckCircle2 className="h-5 w-5 text-[var(--gold)] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-display text-lg mb-1">{c.title}</h3>
                    <p className="text-white/70 text-sm leading-relaxed">{c.body}</p>
                  </div>
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
                Talk to us <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-md border border-input px-5 py-3 text-sm font-medium hover:bg-accent"
              >
                About AACL
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-12 bg-muted/40">
        <div className="container-x max-w-3xl">
          <h2 className="font-display text-xl mb-4">Related services & pages</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/iso-27001-certification-kenya" className="hover:text-[var(--navy)]">
                ISO 27001 Certification Kenya
              </Link>
            </li>
            <li>
              <Link to="/iso-certification-cost-kenya" className="hover:text-[var(--navy)]">
                ISO certification cost in Kenya
              </Link>
            </li>
            <li>
              <Link to="/iso-9001-kenya-cost" className="hover:text-[var(--navy)]">
                ISO 9001 Kenya cost
              </Link>
            </li>
            <li>
              <Link to="/services/iso-management-systems" className="hover:text-[var(--navy)]">
                ISO Management Systems Consultancy
              </Link>
            </li>
            <li>
              <Link to="/gsma-sas-kenya" className="hover:text-[var(--navy)]">
                GSMA SAS Kenya
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
