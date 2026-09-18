import { createFileRoute, Link } from "@tanstack/react-router";
import { absUrl } from "@/lib/site-url";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { ArrowRight, CheckCircle2 } from "lucide-react";

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

function PciDssKenyaPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Payment security"
        title="PCI DSS certification support in Kenya."
        lead="Practical gap assessment, remediation and audit readiness for organisations that store, process or transmit cardholder data. Combined ISO 27001 + PCI DSS programmes available."
        image="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=2000&q=80"
      />
      <section className="py-16 bg-background">
        <div className="container-x max-w-3xl">
          <Reveal>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Searching for <strong>PCI DSS certification in Kenya</strong> or combined ISO and PCI DSS support? AACL Global helps organisations scope, implement and prepare for PCI DSS assessments with clear evidence and board-ready reporting.
            </p>
          </Reveal>
          <Reveal delay={60}>
            <ul className="mt-8 space-y-3 text-muted-foreground">
              {[
                "Scope definition and gap assessment against current PCI DSS",
                "Remediation planning and control implementation",
                "Evidence and documentation packs for QSA / assessment",
                "Integration with ISO 27001 where both standards apply",
                "Ongoing compliance support via eCompliance",
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
                Discuss PCI DSS scope <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
