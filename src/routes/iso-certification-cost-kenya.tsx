import { createFileRoute, Link } from "@tanstack/react-router";
import { absUrl } from "@/lib/site-url";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { ArrowRight } from "lucide-react";

const TITLE = "How Much Does ISO Certification Cost in Kenya? 2026 Guide | AACL Global";
const DESC = "Clear guide to ISO certification cost in Kenya. Pricing factors, typical ranges and how AACL Global scopes affordable, right-sized programmes. Talk budget first — no obligation.";
const SHARE = absUrl("/og-share.jpg");
const PATH = "/iso-certification-cost-kenya";

export const Route = createFileRoute("/iso-certification-cost-kenya")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "keywords", content: "how much does ISO cost in Kenya, ISO certification cost Kenya, ISO cost Nairobi, ISO pricing Kenya 2026" },
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
  component: IsoCostGuidePage,
});

function IsoCostGuidePage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Cost transparency"
        title="How much does ISO certification cost in Kenya?"
        lead="A practical 2026 guide to what drives cost and how to get a right-sized programme that fits your budget."
        image="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=2000&q=80"
      />
      <section className="py-16 bg-background">
        <div className="container-x max-w-3xl">
          <Reveal>
            <p className="text-lg text-muted-foreground leading-relaxed">
              There is no single price for ISO certification in Kenya. Cost depends on the standard(s), organisation size, number of sites, current maturity and whether you need onsite or remote delivery. AACL Global publishes indicative starting ranges and always starts with a conversation about your budget.
            </p>
            <p className="mt-4 text-muted-foreground">
              Consultancy support and certification body audit fees are separate. We help you understand both so you can plan with confidence.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/book" className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                Talk budget first <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/iso-9001-kenya-cost" className="inline-flex items-center gap-2 rounded-md border border-input px-5 py-3 text-sm font-medium hover:bg-accent">
                ISO 9001 cost details
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
