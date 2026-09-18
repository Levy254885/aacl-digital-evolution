import { createFileRoute, Link } from "@tanstack/react-router";
import { absUrl } from "@/lib/site-url";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { ArrowRight } from "lucide-react";

const TITLE = "ISO 9001 Kenya Cost 2026 | Transparent Pricing & Consultants | AACL Global";
const DESC = "How much does ISO 9001 certification cost in Kenya? Transparent starting prices from AACL Global. ISO 9001 consultants in Nairobi and remote worldwide. Talk budget first.";
const SHARE = absUrl("/og-share.jpg");
const PATH = "/iso-9001-kenya-cost";

export const Route = createFileRoute("/iso-9001-kenya-cost")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "keywords", content: "ISO 9001 Kenya cost, ISO 9001 cost Kenya, ISO 9001 consultants Kenya, ISO 9001 Nairobi, how much does ISO 9001 cost in Kenya" },
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
  component: Iso9001CostPage,
});

function Iso9001CostPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Transparent pricing"
        title="ISO 9001 certification cost in Kenya."
        lead="Clear starting ranges by organisation size. No one-size-fits-all quotes. We talk budget first, then scope the right-sized path to certification."
        image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2000&q=80"
      />
      <section className="py-16 bg-background">
        <div className="container-x max-w-3xl">
          <Reveal>
            <p className="text-lg text-muted-foreground leading-relaxed">
              ISO 9001 cost in Kenya depends on company size, number of sites and how ready your current systems are. AACL Global publishes transparent starting ranges and always begins with a short, no-obligation budget conversation.
            </p>
            <p className="mt-4 text-muted-foreground">
              Typical consultancy support for a small single-site organisation starts in the lower range of our published pricing. Certification body audit fees are separate and depend on the accredited body you choose.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/book" className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                Talk budget first <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/services" className="inline-flex items-center gap-2 rounded-md border border-input px-5 py-3 text-sm font-medium hover:bg-accent">
                View all services
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
