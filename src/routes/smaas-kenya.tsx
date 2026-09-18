import { createFileRoute, Link } from "@tanstack/react-router";
import { absUrl } from "@/lib/site-url";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { ArrowRight } from "lucide-react";

const TITLE = "SMaaS Kenya | Security Manager as a Service & Outsourced CISO | AACL Global";
const DESC = "Security Manager as a Service (SMaaS) and outsourced CISO in Kenya. Senior security leadership on retainer — governance, risk oversight and compliance without a full-time hire. Onsite or remote.";
const SHARE = absUrl("/og-share.jpg");
const PATH = "/smaas-kenya";

export const Route = createFileRoute("/smaas-kenya")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "keywords", content: "SMaaS Kenya, Security Manager as a Service Kenya, outsourced CISO Kenya, virtual CISO Kenya, security leadership Kenya" },
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

function SmaasKenyaPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Security leadership"
        title="Security Manager as a Service (SMaaS) in Kenya."
        lead="Senior security leadership and enterprise risk oversight on retainer. Outsourced CISO capability without the cost of a full-time executive hire."
        image="https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=2000&q=80"
      />
      <section className="py-16 bg-background">
        <div className="container-x max-w-3xl">
          <Reveal>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Many organisations need experienced security leadership but cannot justify a full-time CISO. AACL Global provides Security Manager as a Service — named senior practitioners who own governance, risk oversight, compliance calendars and board reporting on a retainer basis.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/book" className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                Discuss SMaaS <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/services/security-manager-as-a-service" className="inline-flex items-center gap-2 rounded-md border border-input px-5 py-3 text-sm font-medium hover:bg-accent">
                Full SMaaS details
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
