import { createFileRoute, Link } from "@tanstack/react-router";
import { absUrl } from "@/lib/site-url";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const TITLE = "How Much Does ISO Certification Cost in Kenya? 2026 Guide | AACL Global";
const DESC =
  "Clear guide to ISO certification cost in Kenya. Pricing factors, typical ranges and how AACL Global scopes affordable, right-sized programmes. Talk budget first — no obligation.";
const SHARE = absUrl("/og-share.jpg");
const PATH = "/iso-certification-cost-kenya";

export const Route = createFileRoute("/iso-certification-cost-kenya")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      {
        name: "keywords",
        content:
          "how much does ISO cost in Kenya, ISO certification cost Kenya, ISO cost Nairobi, ISO pricing Kenya 2026",
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
  component: IsoCostGuidePage,
});

const factors = [
  {
    title: "Which standard(s)",
    body: "ISO 9001, ISO 27001, ISO 45001, ISO 14001, ISO 22301 or an integrated management system each have different documentation and audit effort.",
  },
  {
    title: "Organisation size and sites",
    body: "Headcount, number of locations and process complexity drive both consultancy days and certification body audit time.",
  },
  {
    title: "Current maturity",
    body: "Organisations with usable procedures and records need less build work than those starting from scratch.",
  },
  {
    title: "Delivery model",
    body: "Onsite workshops in Kenya versus fully remote delivery affect travel and facilitation cost.",
  },
  {
    title: "Certification body fees",
    body: "Registrar Stage 1, Stage 2 and surveillance fees are separate from consultancy and vary by body and scope.",
  },
];

const faqs = [
  {
    q: "Is there a fixed price for ISO certification in Kenya?",
    a: "No. Legitimate providers scope to your size and maturity. Fixed brochure prices often hide scope limitations. We publish indicative ranges and confirm on a discovery call.",
  },
  {
    q: "Can SMEs afford ISO certification?",
    a: "Yes. Many SMEs certify successfully with right-sized programmes. Cost should never be the reason you stay off the register — we start with budget, then design the path.",
  },
  {
    q: "What about combined ISO 9001 + ISO 27001?",
    a: "Integrated programmes can reduce duplication. We design IMS approaches where more than one standard is required.",
  },
];

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
              There is no single price for ISO certification in Kenya. Cost depends on the standard(s), organisation
              size, number of sites, current maturity and whether you need onsite or remote delivery. AACL Global
              publishes indicative starting ranges and always starts with a conversation about your budget.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Consultancy support and certification body audit fees are separate. We help you understand both so you can
              plan with confidence.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 bg-[var(--navy-deep)] text-[var(--bone)]">
        <div className="container-x max-w-3xl">
          <Reveal>
            <h2 className="font-display text-3xl mb-8">Cost factors explained</h2>
          </Reveal>
          <div className="space-y-6">
            {factors.map((f, i) => (
              <Reveal key={i} delay={i * 40}>
                <div className="flex gap-3 items-start">
                  <CheckCircle2 className="h-5 w-5 text-[var(--gold)] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-display text-lg mb-1">{f.title}</h3>
                    <p className="text-white/70 text-sm leading-relaxed">{f.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
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
                to="/iso-9001-kenya-cost"
                className="inline-flex items-center gap-2 rounded-md border border-input px-5 py-3 text-sm font-medium hover:bg-accent"
              >
                ISO 9001 cost details
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
              <Link to="/iso-9001-kenya-cost" className="hover:text-[var(--navy)]">
                ISO 9001 Kenya cost
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
            <li>
              <Link to="/services/iso-management-systems" className="hover:text-[var(--navy)]">
                ISO Management Systems Consultancy
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
