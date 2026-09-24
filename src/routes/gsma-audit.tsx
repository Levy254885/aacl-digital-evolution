import { createFileRoute, Link } from "@tanstack/react-router";
import { absUrl } from "@/lib/site-url";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const TITLE = "GSMA Audit Preparation | GSMA SAS Audit Support | AACL Global";
const DESC =
  "GSMA audit preparation and GSMA SAS audit support. Specialist readiness for security printing and UICC sites — SAS-UP and SAS-SM. Gap assessment, evidence and audit-day support.";
const SHARE = absUrl("/og-share.jpg");
const PATH = "/gsma-audit";

export const Route = createFileRoute("/gsma-audit")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      {
        name: "keywords",
        content: "gsma audit, gsma sas audit, gsma audit preparation, GSMA security audit, security printing audit",
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
  component: GsmaAuditPage,
});

const steps = [
  "Pre-audit gap assessment against current GSMA SAS requirements",
  "Remediation support for physical and logical controls",
  "Evidence packs and documentation the auditor expects",
  "Internal walkthrough before the formal GSMA audit",
  "Onsite or remote support during the audit itself",
  "Non-conformity closure and sustainment between cycles",
];

const faqs = [
  {
    q: "What is a GSMA audit?",
    a: "Under the GSMA Security Accreditation Scheme, appointed auditors assess physical premises, personnel, production processes, information security and supply-chain controls at UICC production (SAS-UP) or subscription management (SAS-SM) sites.",
  },
  {
    q: "How long does preparation take?",
    a: "Depends on current control maturity. First-time sites often need several months of remediation; renewal sites with continuous compliance need a focused readiness cycle.",
  },
  {
    q: "Do you support both SAS-UP and SAS-SM?",
    a: "Yes. We support UICC/eUICC production sites and subscription management platforms.",
  },
];

function GsmaAuditPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="GSMA audit · SAS-UP · SAS-SM"
        title="GSMA audit preparation and SAS audit support."
        lead="Ready your site for a GSMA Security Accreditation Scheme audit. Practical gap assessment, control work and evidence packs for SAS-UP and SAS-SM."
        image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2000&q=80"
      />

      <section className="py-16 bg-background">
        <div className="container-x max-w-3xl">
          <Reveal>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A <strong>GSMA audit</strong> under the Security Accreditation Scheme is a formal assessment of physical
              and logical security controls at UICC production or subscription management sites. AACL Global prepares
              organisations so the audit is predictable and successful — from Nairobi and international locations.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 bg-[var(--navy-deep)] text-[var(--bone)]">
        <div className="container-x">
          <Reveal>
            <h2 className="font-display text-3xl mb-8">How we prepare you</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {steps.map((item, i) => (
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
          <Reveal delay={120}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/book"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Prepare for your GSMA audit <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/gsma-sas-kenya"
                className="inline-flex items-center gap-2 rounded-md border border-input px-5 py-3 text-sm font-medium hover:bg-accent"
              >
                Full GSMA SAS details
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-12 bg-muted/40">
        <div className="container-x max-w-3xl">
          <h2 className="font-display text-xl mb-4">Related reading & services</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/gsma-sas-kenya" className="hover:text-[var(--navy)]">
                GSMA SAS Kenya service page
              </Link>
            </li>
            <li>
              <Link to="/services/security-standards-implementation" className="hover:text-[var(--navy)]">
                Security Standards Implementation & Audits
              </Link>
            </li>
            <li>
              <Link to="/industries/security-printing" className="hover:text-[var(--navy)]">
                Security Printing industry
              </Link>
            </li>
            <li>
              <Link to="/insights/$slug" params={{ slug: "gsma-audit-what-to-expect" }} className="hover:text-[var(--navy)]">
                GSMA audit: what to expect on the day and how to prepare
              </Link>
            </li>
            <li>
              <Link
                to="/insights/$slug"
                params={{ slug: "gsma-sas-preparing-for-your-first-audit" }}
                className="hover:text-[var(--navy)]"
              >
                GSMA SAS: Preparing for Your First Scheme Audit
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
