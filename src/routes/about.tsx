import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About AACL — Executive Assurance Consultancy" },
      { name: "description", content: "AACL is a specialist East African consultancy in security, compliance, ISO management systems and enterprise risk." },
      { property: "og:title", content: "About AACL" },
      { property: "og:description", content: "Executive assurance consultancy for regulated organisations." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Who we are"
        title="Compliance Expertise Without Borders."
        lead="AACL Global works with organizations across Europe, the US, Africa, Asia and beyond — and we're expanding into new markets. Wherever you're headquartered, you get the same highly qualified and certified lead consultants and auditors, the same rigorous standards, and superior results."
        image="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=2000&q=80"
      />

      <section className="pt-10">
        <div className="container-x">
          <Reveal>
            <Link to="/contact" className="btn-gold">Talk to Us</Link>
          </Reveal>
        </div>
      </section>


      <section className="py-24 bg-background">
        <div className="container-x grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="eyebrow mb-6">Who we are</div>
              <h2 className="font-display text-4xl leading-tight">A practice built by lead auditors, security engineers and former corporate leaders.</h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7 space-y-6 text-muted-foreground leading-relaxed">
            <Reveal delay={100}><p>AACL was founded to close the gap between global assurance standards and the operational realities of doing business in East Africa. Our consultants have led security, compliance and audit functions inside major banks, telecommunications operators, security printers and manufacturers before joining the practice.</p></Reveal>
            <Reveal delay={200}><p>We work with boards, executive teams and operational leaders on programmes that materially reduce enterprise risk, achieve internationally recognised certifications and satisfy demanding regulatory environments.</p></Reveal>
            <Reveal delay={300}><p>Every engagement is delivered by named senior practitioners, evidence-based and structured for sustainment — not one-off deliverables.</p></Reveal>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[var(--bone)]">
        <div className="container-x">
          <Reveal>
            <div className="eyebrow mb-4">Our values</div>
            <h2 className="font-display text-4xl md:text-5xl max-w-2xl leading-tight mb-14">The principles that shape every engagement.</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-px bg-border">
            {[
              { t: "Practical over theoretical", d: "We favour management systems that field teams actually use over documentation that satisfies auditors and no one else." },
              { t: "Evidence-based decision making", d: "Recommendations are backed by measurement, benchmark and defensible analysis — not opinion." },
              { t: "Tailored engagement design", d: "No two organisations carry the same risk profile. We calibrate every programme to your context, sector and maturity." },
              { t: "Long-term partnership", d: "Certification is a milestone, not an outcome. We measure success in sustained compliance and improved resilience." },
              { t: "Knowledge transfer", d: "Every engagement builds your internal capability — through training, mentoring and structured handover." },
              { t: "Executive discretion", d: "We handle sensitive information with the confidentiality and professionalism our clients expect." },
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
            <h2 className="font-display text-4xl md:text-5xl leading-tight text-white">Headquartered in Nairobi. Delivering worldwide — onsite or remote.</h2>
            <p className="mt-6 text-white/70 leading-relaxed">From our base at Vision Towers in Westlands we serve clients across Africa, Europe, the UK, the US and Asia — combining local presence with globally benchmarked expertise. Every engagement is available Onsite or Remote — Worldwide.</p>
            <Link to="/contact" className="btn-outline-gold mt-8 inline-flex">Talk to Us <ArrowRight size={14} /></Link>

          </Reveal>
          <Reveal delay={120}>
            <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=80" alt="Consultants collaborating" className="w-full h-[500px] object-cover" />
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
