import { createFileRoute, Link } from "@tanstack/react-router";
import { absUrl } from "@/lib/site-url";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { ArrowRight, CheckCircle2, Shield } from "lucide-react";

const TITLE = "GSMA SAS Kenya | Security Printing Audit & SAS-UP / SAS-SM | AACL Global";
const DESC = "GSMA SAS (SAS-UP and SAS-SM) preparation, implementation and audit support in Kenya. Specialist security printing and UICC production consultancy from AACL Global. Onsite or remote.";
const SHARE = absUrl("/og-share.jpg");
const PATH = "/gsma-sas-kenya";

export const Route = createFileRoute("/gsma-sas-kenya")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "keywords", content: "GSMA SAS Kenya, GSMA SAS audit, SAS-UP Kenya, SAS-SM Kenya, security printing audit Kenya, UICC security certification" },
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
        eyebrow="Security Printing & UICC"
        title="GSMA SAS preparation and audit support in Kenya."
        lead="Specialist support for GSMA Security Accreditation Scheme (SAS-UP and SAS-SM). Practical preparation for security printing and UICC production sites."
        image="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2000&q=80"
      />
      <section className="py-16 bg-background">
        <div className="container-x max-w-3xl">
          <Reveal>
            <p className="text-lg text-muted-foreground leading-relaxed">
              AACL Global supports security printing and UICC production organisations preparing for GSMA SAS audits. We combine physical and logical security expertise with practical experience of regulated production environments.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/book" className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                Discuss your SAS readiness <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
