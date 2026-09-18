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

function GsmaAuditPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="GSMA audit"
        title="GSMA audit preparation and SAS audit support."
        lead="Ready your site for a GSMA Security Accreditation Scheme audit. Practical gap assessment, control work and evidence packs for SAS-UP and SAS-SM."
        image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2000&q=80"
      />
      <section className="py-16 bg-background">
        <div className="container-x max-w-3xl">
          <Reveal>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A <strong>GSMA audit</strong> under the Security Accreditation Scheme is a formal assessment of physical and logical security controls at UICC production or subscription management sites. AACL Global prepares organisations so the audit is predictable and successful.
            </p>
          </Reveal>
          <Reveal delay={60}>
            <ul className="mt-8 space-y-3 text-muted-foreground">
              {[
                "Pre-audit gap assessment against GSMA SAS requirements",
                "Remediation support for physical and logical controls",
                "Evidence packs and documentation the auditor expects",
                "Internal walkthrough before the formal GSMA audit",
                "Onsite or remote support during the audit itself",
              ].map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <CheckCircle2 className="h-5 w-5 text-[var(--gold)] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
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
    </PageShell>
  );
}
