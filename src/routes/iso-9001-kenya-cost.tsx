import { createFileRoute, Link } from "@tanstack/react-router";
import { absUrl } from "@/lib/site-url";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const TITLE = "ISO 9001 Kenya Cost 2026 | Transparent Pricing & Consultants | AACL Global";
const DESC =
  "How much does ISO 9001 certification cost in Kenya? Transparent starting prices from AACL Global. ISO 9001 consultants in Nairobi and remote worldwide. Talk budget first.";
const SHARE = absUrl("/og-share.jpg");
const PATH = "/iso-9001-kenya-cost";

export const Route = createFileRoute("/iso-9001-kenya-cost")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      {
        name: "keywords",
        content:
          "ISO 9001 Kenya cost, ISO 9001 cost Kenya, ISO 9001 consultants Kenya, ISO 9001 Nairobi, how much does ISO 9001 cost in Kenya",
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
  component: Iso9001CostPage,
});

const drivers = [
  "Organisation size and number of employees",
  "Number of sites and geographic spread",
  "Current process maturity and existing documentation",
  "Whether one or multiple standards are in scope",
  "Onsite workshops versus remote delivery",
  "Certification body audit fees (separate from consultancy)",
];

const faqs = [
  {
    q: "What is a typical starting range for ISO 9001 consultancy in Kenya?",
    a: "For a small single-site organisation, consultancy support often starts in the lower published range (indicative from roughly USD 2,000 depending on scope). Medium and multi-site programmes scale with complexity. We confirm exact scope on a short call.",
  },
  {
    q: "Are certification body fees included?",
    a: "No. Registrar audit fees are charged by the accredited certification body you choose. We help you understand both consultancy and audit cost so you can plan fully.",
  },
  {
    q: "How long does ISO 9001 take?",
    a: "First-time programmes typically run four to nine months depending on maturity and how quickly gaps are closed. We publish a workplan at kick-off.",
  },
];

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
              ISO 9001 cost in Kenya depends on company size, number of sites and how ready your current systems are.
              AACL Global publishes transparent starting ranges and always begins with a short, no-obligation budget
              conversation.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Typical consultancy support for a small single-site organisation starts in the lower range of our published
              pricing. Certification body audit fees are separate and depend on the accredited body you choose.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 bg-[var(--navy-deep)] text-[var(--bone)]">
        <div className="container-x max-w-3xl">
          <Reveal>
            <h2 className="font-display text-3xl mb-6">What drives ISO 9001 cost</h2>
          </Reveal>
          <ul className="space-y-3">
            {drivers.map((item, i) => (
              <Reveal key={i} delay={i * 30}>
                <li className="flex gap-3 items-start">
                  <CheckCircle2 className="h-5 w-5 text-[var(--gold)] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container-x max-w-3xl">
          <Reveal>
            <h2 className="font-display text-3xl mb-8">Frequently asked questions</h2>
          </Reveal>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <Reveal key={i} delay={i * 40}>
                <div>
                  <h3 className="font-display text-lg mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={100}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/book"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Talk budget first <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/services/iso-management-systems"
                className="inline-flex items-center gap-2 rounded-md border border-input px-5 py-3 text-sm font-medium hover:bg-accent"
              >
                ISO Management Systems
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-12 bg-muted/40">
        <div className="container-x max-w-3xl">
          <h2 className="font-display text-xl mb-4">Related pages</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/iso-certification-cost-kenya" className="hover:text-[var(--navy)]">
                How much does ISO certification cost in Kenya?
              </Link>
            </li>
            <li>
              <Link to="/iso-27001-certification-kenya" className="hover:text-[var(--navy)]">
                ISO 27001 Certification Kenya
              </Link>
            </li>
            <li>
              <Link to="/best-iso-consultants-kenya" className="hover:text-[var(--navy)]">
                Best ISO consultants in Kenya
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
