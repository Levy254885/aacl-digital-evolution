import { createFileRoute, Link } from "@tanstack/react-router";
import { absUrl } from "@/lib/site-url";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { ArrowRight, CheckCircle2, Shield } from "lucide-react";

const TITLE = "GSMA SAS Kenya | SAS-UP & SAS-SM Audit Support | AACL Global";
const DESC =
  "GSMA SAS audit preparation for SAS-UP and SAS-SM in Kenya and worldwide. Expert support for security printing and UICC sites. Gap assessment, evidence packs and audit-day support.";
const SHARE = absUrl("/og-share.jpg");
const PATH = "/gsma-sas-kenya";

export const Route = createFileRoute("/gsma-sas-kenya")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      {
        name: "keywords",
        content:
          "gsma audit, gsma sas, gsma sas-sm, gsma sas-up, gsma sas up, gsma sas certification, sas up, GSMA SAS Kenya, security printing audit, UICC security, GSMA SAS Nairobi",
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
  component: GsmaSasKenyaPage,
});

function GsmaSasKenyaPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="GSMA SAS · SAS-UP · SAS-SM · Kenya & Worldwide"
        title="GSMA SAS audit preparation and certification support."
        lead="Expert readiness for GSMA Security Accreditation Scheme audits — SAS-UP and SAS-SM. Gap assessment, control implementation and audit-day support for security printing and UICC production sites."
        image="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2000&q=80"
      />

      <section className="py-16 bg-background">
        <div className="container-x max-w-3xl">
          <Reveal>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Searching for <strong>gsma audit</strong>, <strong>gsma sas</strong>, <strong>gsma sas-up</strong> or{" "}
              <strong>gsma sas-sm</strong>? AACL Global is a specialist consultancy for the GSMA Security Accreditation
              Scheme. We prepare security printing and UICC production organisations for formal SAS audits so you pass
              with confidence — from Nairobi and across Africa, Europe, the UK, the US and Asia.
            </p>
          </Reveal>
          <Reveal delay={60}>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              GSMA SAS is highly prescriptive. Physical premises, personnel screening, production processes, information
              security and supply-chain controls are all scrutinised. Our team combines security-printing operational
              experience with ISO 27001 and physical-security expertise so controls are designed once and work for both
              the scheme audit and ongoing operations.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 bg-[var(--navy-deep)] text-[var(--bone)]">
        <div className="container-x">
          <Reveal>
            <h2 className="font-display text-3xl mb-8">What we deliver for GSMA SAS</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "GSMA SAS-UP readiness (UICC / SIM production)",
              "GSMA SAS-SM readiness (subscription management)",
              "Full gap analysis against current GSMA requirements",
              "Physical and logical security control implementation",
              "Documentation and evidence packs for the auditor",
              "Internal audit and pre-audit walkthroughs",
              "Support during the formal GSMA SAS audit",
              "Integration with ISO 27001 and other management systems",
            ].map((item, i) => (
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
            <h2 className="font-display text-3xl mb-6">Why choose AACL for GSMA SAS</h2>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex gap-3">
                <Shield className="h-5 w-5 text-[var(--gold)] shrink-0" /> Specialist focus on security printing and
                regulated UICC production environments.
              </li>
              <li className="flex gap-3">
                <Shield className="h-5 w-5 text-[var(--gold)] shrink-0" /> Combined physical + cyber + management-system
                expertise.
              </li>
              <li className="flex gap-3">
                <Shield className="h-5 w-5 text-[var(--gold)] shrink-0" /> Nairobi-based (Vision Towers, Westlands) with
                proven delivery across Africa and international sites.
              </li>
              <li className="flex gap-3">
                <Shield className="h-5 w-5 text-[var(--gold)] shrink-0" /> Clear scoping and transparent commercial
                approach.
              </li>
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/book"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Discuss your GSMA SAS readiness <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/services/security-standards-implementation"
                className="inline-flex items-center gap-2 rounded-md border border-input px-5 py-3 text-sm font-medium hover:bg-accent"
              >
                Security Standards Implementation
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-12 bg-muted/40">
        <div className="container-x max-w-3xl">
          <h2 className="font-display text-xl mb-4">Related services, industries & reading</h2>
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
              <Link to="/industries/security-printing" className="hover:text-[var(--navy)]">
                Security Printing industry
              </Link>
            </li>
            <li>
              <Link to="/industries/telecommunications" className="hover:text-[var(--navy)]">
                Telecommunications industry
              </Link>
            </li>
            <li>
              <Link to="/insights/$slug" params={{ slug: "gsma-audit-what-to-expect" }} className="hover:text-[var(--navy)]">
                GSMA audit: what to expect on the day
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
            <li>
              <Link to="/gsma-audit" className="hover:text-[var(--navy)]">
                GSMA audit preparation service
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
