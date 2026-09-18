import { createFileRoute, Link } from "@tanstack/react-router";
import { absUrl } from "@/lib/site-url";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { ArrowRight, CheckCircle2, Shield } from "lucide-react";

const TITLE = "GSMA SAS Audit | SAS-UP & SAS-SM Certification Support | AACL Global";
const DESC =
  "GSMA SAS audit preparation for SAS-UP and SAS-SM. Expert support for security printing and UICC sites. Gap assessment, evidence packs and audit-day support — Kenya and worldwide.";
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
          "gsma audit, gsma sas, gsma sas-sm, gsma sas-up, gsma sas up, gsma sas certification, sas up, GSMA SAS Kenya, security printing audit, UICC security",
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
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
                { "@type": "ListItem", position: 2, name: "Services", item: absUrl("/services") },
                { "@type": "ListItem", position: 3, name: "GSMA SAS Audit", item: absUrl(PATH) },
              ],
            },
            {
              "@type": "Service",
              name: "GSMA SAS Audit Preparation (SAS-UP & SAS-SM)",
              provider: { "@type": "Organization", name: "AACL Global", url: absUrl("/") },
              areaServed: ["Kenya", "Africa", "Worldwide"],
              description: DESC,
              url: absUrl(PATH),
            },
            {
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What is a GSMA SAS audit?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "A GSMA SAS audit assesses whether a security printing or UICC production site meets the Security Accreditation Scheme requirements (SAS-UP for UICC production and SAS-SM for subscription management). AACL prepares sites for these audits with gap assessment, control implementation and evidence packs.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What is the difference between GSMA SAS-UP and SAS-SM?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "SAS-UP covers UICC (SIM) production environments. SAS-SM covers subscription management systems. AACL supports preparation for both schemes.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Do you support GSMA SAS audits in Kenya and internationally?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. We deliver onsite in Kenya and remote or hybrid support for sites worldwide.",
                  },
                },
              ],
            },
          ],
        }),
      },
    ],
  }),
  component: GsmaSasKenyaPage,
});

function GsmaSasKenyaPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="GSMA SAS · SAS-UP · SAS-SM"
        title="GSMA SAS audit preparation and certification support."
        lead="Expert readiness for GSMA Security Accreditation Scheme audits — SAS-UP and SAS-SM. Gap assessment, control implementation and audit-day support for security printing and UICC production sites."
        image="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2000&q=80"
      />

      <section className="py-16 bg-background">
        <div className="container-x max-w-3xl">
          <Reveal>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Searching for <strong>gsma audit</strong>, <strong>gsma sas</strong>, <strong>gsma sas-up</strong> or <strong>gsma sas-sm</strong>? AACL Global is a specialist consultancy for the GSMA Security Accreditation Scheme. We prepare security printing and UICC production organisations for formal SAS audits so you pass with confidence.
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
                <Shield className="h-5 w-5 text-[var(--gold)] shrink-0" /> Specialist focus on security printing and regulated UICC production environments.
              </li>
              <li className="flex gap-3">
                <Shield className="h-5 w-5 text-[var(--gold)] shrink-0" /> Combined physical + cyber + management-system expertise.
              </li>
              <li className="flex gap-3">
                <Shield className="h-5 w-5 text-[var(--gold)] shrink-0" /> Nairobi-based with proven delivery across Africa and international sites.
              </li>
              <li className="flex gap-3">
                <Shield className="h-5 w-5 text-[var(--gold)] shrink-0" /> Clear scoping and transparent commercial approach.
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
                to="/services"
                className="inline-flex items-center gap-2 rounded-md border border-input px-5 py-3 text-sm font-medium hover:bg-accent"
              >
                All services
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 bg-muted/40">
        <div className="container-x max-w-3xl">
          <Reveal>
            <h2 className="font-display text-2xl mb-6">GSMA SAS FAQs</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold">What is a GSMA SAS audit?</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  A formal assessment of whether a security printing or UICC production site meets GSMA Security Accreditation Scheme requirements (SAS-UP or SAS-SM).
                </p>
              </div>
              <div>
                <h3 className="font-semibold">SAS-UP vs SAS-SM?</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  SAS-UP covers UICC (SIM) production. SAS-SM covers subscription management. We support both.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Do you work only in Kenya?</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  No. We deliver onsite in Kenya and remote or hybrid support worldwide.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
