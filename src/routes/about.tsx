import { createFileRoute, Link } from "@tanstack/react-router";
import { absUrl } from "@/lib/site-url";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { SiteBreadcrumbs } from "@/components/site/SiteBreadcrumbs";
import { SITE } from "@/lib/aacl-content";
import { Reveal } from "@/components/site/Reveal";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About AACL Global | Worldwide ISO & Security Compliance Consultancy" },
      {
        name: "description",
        content:
          "AACL Global is a worldwide consultancy for ISO certification, security standards, compliance and enterprise risk. Headquartered in Nairobi. Onsite or remote, anywhere you operate.",
      },
      { property: "og:title", content: "About AACL Global | Worldwide Consultancy" },
      {
        property: "og:description",
        content:
          "Worldwide assurance consultancy for regulated organisations. Same senior practitioners onsite or remote — Europe, US, Africa, Asia and beyond.",
      },
      { name: "twitter:title", content: "About AACL Global | Worldwide Consultancy" },
      {
        name: "twitter:description",
        content:
          "Worldwide assurance consultancy for regulated organisations. Onsite or remote, wherever you operate.",
      },
      { property: "og:url", content: absUrl("/about") },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: absUrl("/about") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
            { "@type": "ListItem", position: 2, name: "About AACL", item: absUrl("/about") },
          ],
        }),
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell>
      <SiteBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "About" },
        ]}
      />
      <PageHero
        eyebrow="Worldwide consultancy"
        title="Compliance Expertise Without Borders."
        lead="AACL Global is a worldwide practice. We work with organisations across Europe, the United States, Africa, Asia and the Middle East. Wherever you are headquartered, you get the same senior lead consultants and auditors, the same rigorous standards, and the same results — onsite or remote."
        image="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=2000&q=80"
      />

      <section className="py-16 bg-background border-b border-border">
        <div className="container-x grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <Reveal>
              <div className="eyebrow mb-4">Company profile</div>
              <h2 className="font-display text-3xl leading-tight">Who is AACL Global?</h2>
            </Reveal>
          </div>
          <div className="lg:col-span-8 space-y-5 text-muted-foreground leading-relaxed">
            <Reveal>
              <p>
                <strong className="text-foreground">AACL Global</strong> is the trading name of{" "}
                <strong className="text-foreground">{SITE.name}</strong> — a worldwide consultancy focused on
                security, compliance and ISO management systems. We are headquartered at {SITE.address.line1},{" "}
                {SITE.address.line2}, {SITE.address.city}, {SITE.address.country}, and deliver every engagement
                onsite or remotely for clients across continents.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <p>
                Core work includes physical and cybersecurity risk assessments, ISO management systems
                consultancy (including ISO 9001, ISO/IEC 27001, ISO 45001 and related standards), security
                standards implementation and audits (including GSMA SAS and PCI DSS), Security Manager as a
                Service, statutory compliance support, and continuous compliance through eCompliance.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p>
                Sectors supported include security printing, banking and financial services, manufacturing,
                hospitality, pharmaceuticals, food and beverage, technology, telecommunications, aviation
                and private security — worldwide. Contact:{" "}
                <a href={`mailto:${SITE.email}`} className="text-[var(--gold)] underline">
                  {SITE.email}
                </a>
                {" "}·{" "}
                <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="text-[var(--gold)] underline">
                  {SITE.phone}
                </a>
                .
              </p>
            </Reveal>
            <Reveal delay={160}>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link to="/services" className="btn-outline-navy">
                  Services
                </Link>
                <Link to="/industries" className="btn-outline-navy">
                  Industries
                </Link>
                <Link to="/iso-certification" className="btn-outline-navy">
                  Worldwide regions
                </Link>
                <Link to="/contact" className="btn-gold">
                  Contact AACL
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container-x grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="eyebrow mb-6">Who we are</div>
              <h2 className="font-display text-4xl leading-tight">
                A practice built by lead auditors, security engineers and former corporate leaders.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7 space-y-6 text-muted-foreground leading-relaxed">
            <Reveal delay={100}>
              <p>
                AACL was founded to close the gap between global assurance standards and the operational realities of
                complex regulated industries — wherever those organisations operate. Our consultants have led security,
                compliance and audit functions inside major banks, telecommunications operators, security printers and
                manufacturers before joining the practice.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p>
                We work with boards, executive teams and operational leaders on programmes that materially reduce
                enterprise risk, achieve internationally recognised certifications and satisfy demanding regulatory
                environments in multiple jurisdictions.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <p>
                Every engagement is delivered by named senior practitioners, evidence-based and structured for
                sustainment. Not one-off deliverables. Available onsite or remote, worldwide.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[var(--bone)]">
        <div className="container-x">
          <Reveal>
            <div className="eyebrow mb-4">Our values</div>
            <h2 className="font-display text-4xl md:text-5xl max-w-2xl leading-tight mb-14">
              The principles that shape every engagement.
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-px bg-border">
            {[
              {
                t: "Practical over theoretical",
                d: "We favour management systems that field teams actually use over documentation that satisfies auditors and no one else.",
              },
              {
                t: "Evidence-based decision making",
                d: "Recommendations are backed by measurement, benchmark and defensible analysis. Not opinion.",
              },
              {
                t: "Tailored engagement design",
                d: "No two organisations carry the same risk profile. We calibrate every programme to your context, sector and maturity — in any country you operate.",
              },
              {
                t: "Long-term partnership",
                d: "Certification is a milestone, not an outcome. We measure success in sustained compliance and improved resilience.",
              },
              {
                t: "Knowledge transfer",
                d: "Every engagement builds your internal capability. Through training, mentoring and structured handover.",
              },
              {
                t: "Executive discretion",
                d: "We handle sensitive information with the confidentiality and professionalism our clients expect, worldwide.",
              },
            ].map((v, i) => (
              <Reveal key={v.t} delay={i * 70}>
                <div className="bg-background p-10">
                  <div className="font-display text-[var(--gold)] tracking-[0.3em] text-sm">0{i + 1}</div>
                  <h3 className="font-display text-2xl mt-4">{v.t}</h3>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[var(--navy-deep)] text-[var(--bone)]">
        <div className="container-x grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="eyebrow eyebrow-light mb-6">Global reach</div>
            <h2 className="font-display text-4xl md:text-5xl leading-tight text-white">
              One worldwide practice. Headquartered in Nairobi. Delivered onsite or remote.
            </h2>
            <p className="mt-6 text-white/70 leading-relaxed">
              From Vision Towers in Westlands, Nairobi, we support clients across Africa, Europe, the United Kingdom,
              the United States, the Middle East and Asia-Pacific. Same consultants. Same standards. Same quality —
              wherever your operations sit.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/contact" className="btn-outline-gold inline-flex">
                Talk to Us <ArrowRight size={14} />
              </Link>
              <Link to="/iso-certification" className="btn-outline-gold inline-flex">
                ISO by region
              </Link>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <img
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=80"
              alt="AACL Global consultants collaborating worldwide"
              className="w-full h-[500px] object-cover"
            />
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
