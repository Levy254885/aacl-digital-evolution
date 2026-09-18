import { createFileRoute, Link } from "@tanstack/react-router";
import { absUrl } from "@/lib/site-url";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { ArrowRight, CheckCircle2, Shield } from "lucide-react";

const TITLE = "ISO 27001 Certification Kenya | ISO 27001 Consultancy Nairobi | AACL Global";
const DESC = "ISO 27001 certification and consultancy in Kenya. AACL Global delivers practical ISO/IEC 27001:2022 implementation, gap assessment and certification support in Nairobi and worldwide. Onsite or remote.";
const SHARE = absUrl("/og-share.jpg");
const PATH = "/iso-27001-certification-kenya";

export const Route = createFileRoute("/iso-27001-certification-kenya")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "keywords", content: "ISO 27001 Kenya, ISO 27001 certification Kenya, ISO 27001 consultancy Nairobi, ISO 27001:2022 Kenya, information security Kenya, ISMS Kenya" },
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
  component: Iso27001KenyaPage,
});

function Iso27001KenyaPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Kenya & Worldwide"
        title="ISO 27001 certification and consultancy in Kenya."
        lead="Practical ISO/IEC 27001:2022 implementation, gap assessment and certification support from senior practitioners. Onsite in Nairobi or remote."
        image="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=2000&q=80"
      />
      <section className="py-16 bg-background">
        <div className="container-x max-w-3xl">
          <Reveal>
            <p className="text-lg text-muted-foreground leading-relaxed">
              AACL Global helps organisations in Kenya and internationally design, implement and certify Information Security Management Systems that actually work.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/book" className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                Talk budget first <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
