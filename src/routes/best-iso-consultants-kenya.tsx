import { createFileRoute, Link } from "@tanstack/react-router";
import { absUrl } from "@/lib/site-url";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const TITLE = "Best ISO Consultants in Kenya 2026 | Why Choose AACL Global";
const DESC = "Looking for the best ISO consultants in Kenya? AACL Global combines senior practitioners, transparent pricing, physical + cyber expertise and worldwide remote delivery from Nairobi.";
const SHARE = absUrl("/og-share.jpg");
const PATH = "/best-iso-consultants-kenya";

export const Route = createFileRoute("/best-iso-consultants-kenya")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "keywords", content: "best ISO consultants Kenya, best ISO consultants Nairobi, top ISO consultancy Kenya, ISO consultants Kenya 2026" },
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
  component: BestConsultantsPage,
});

function BestConsultantsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Why AACL"
        title="Best ISO consultants in Kenya — what actually matters."
        lead="Senior practitioners, transparent pricing, combined physical and cyber expertise, and delivery that works onsite in Nairobi or remote worldwide."
        image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80"
      />
      <section className="py-16 bg-background">
        <div className="container-x max-w-3xl">
          <Reveal>
            <p className="text-lg text-muted-foreground leading-relaxed">
              When organisations search for the best ISO consultants in Kenya they usually want three things: people who have done the work inside real businesses, systems that teams will actually use, and a commercial approach that respects budget. That is how AACL Global operates.
            </p>
          </Reveal>
          <Reveal delay={60}>
            <ul className="mt-8 space-y-3 text-muted-foreground">
              {["Named senior practitioners (ex-bank, telecom, security printing leaders)", "Transparent starting prices and talk-budget-first approach", "Physical + cyber + ISO + GSMA SAS capability in one practice", "Onsite in Nairobi / Kenya or fully remote worldwide", "Focus on sustainment, not one-off documentation"].map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <CheckCircle2 className="h-5 w-5 text-[var(--gold)] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/book" className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                Talk to us <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/about" className="inline-flex items-center gap-2 rounded-md border border-input px-5 py-3 text-sm font-medium hover:bg-accent">
                About AACL
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
