import { createFileRoute, Link } from "@tanstack/react-router";
import { absUrl } from "@/lib/site-url";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { ArrowRight, CheckCircle2, Shield, Clock, MapPin } from "lucide-react";

const TITLE = "ISO 27001 Certification Kenya | ISO 27001 Consultancy Nairobi | AACL Global";
const DESC =
  "ISO 27001 certification and consultancy in Kenya. AACL Global delivers practical ISO/IEC 27001:2022 implementation, gap assessment and certification support in Nairobi and worldwide. Onsite or remote.";
const SHARE = absUrl("/og-share.jpg");
const PATH = "/iso-27001-certification-kenya";

export const Route = createFileRoute("/iso-27001-certification-kenya")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      {
        name: "keywords",
        content:
          "ISO 27001 Kenya, ISO 27001 certification Kenya, ISO 27001 consultancy Nairobi, ISO 27001:2022 Kenya, information security Kenya, ISMS Kenya, ISO 27001 cost Kenya, ISO 27001 consultant Nairobi",
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
  component: Iso27001KenyaPage,
});

const processSteps = [
  {
    title: "Gap assessment",
    body: "We benchmark your current controls, policies and evidence against ISO/IEC 27001:2022 and the Kenya Data Protection Act. You receive a clear gap report and realistic implementation plan.",
  },
  {
    title: "ISMS design & documentation",
    body: "Policy framework, Statement of Applicability, risk assessment methodology, procedures and records designed for your size and risk profile — not generic templates.",
  },
  {
    title: "Implementation & awareness",
    body: "Controls are put into operation. Role-based training for leadership, process owners and staff so the system is used, not just audited.",
  },
  {
    title: "Internal audit & management review",
    body: "Full internal audit cycle, non-conformity management and facilitated management review so you are ready for the certification body.",
  },
  {
    title: "Certification support",
    body: "Stage 1 and Stage 2 audit support with any major accredited registrar. We stay with you through non-conformity closure and certificate issue.",
  },
  {
    title: "Sustainment",
    body: "Surveillance-cycle support, continuous improvement and optional eCompliance retainer so certification remains practical year after year.",
  },
];

const faqs = [
  {
    q: "How long does ISO 27001 certification take in Kenya?",
    a: "Typical first-time programmes run four to nine months depending on scope, number of sites, existing maturity and how quickly your team can close gaps. We publish a detailed workplan at kick-off.",
  },
  {
    q: "What drives the cost of ISO 27001 in Kenya?",
    a: "Cost is driven by organisation size, number of locations, complexity of systems, and whether you need a full implementation or mainly readiness and audit support. We start with a free conversation about budget and scope — not a fixed brochure price.",
  },
  {
    q: "Do you work with the Kenya Data Protection Act?",
    a: "Yes. We map ISO 27001 controls to ODPC expectations and help organisations demonstrate both international and local compliance in one coherent programme.",
  },
  {
    q: "Onsite or remote?",
    a: "Both. We deliver from Nairobi (Vision Towers, Westlands) and support clients across Kenya and internationally onsite or fully remote.",
  },
  {
    q: "Which certification bodies do you support?",
    a: "We are certification-body agnostic and work with all major internationally accredited registrars operating in Kenya and worldwide.",
  },
];

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
              AACL Global helps organisations in Kenya and internationally design, implement and certify Information
              Security Management Systems that actually work. We combine ISO/IEC 27001:2022 expertise with practical
              understanding of the Kenya Data Protection Act, banking and telecoms regulation, and the operational
              realities of East African businesses.
            </p>
          </Reveal>
          <Reveal delay={60}>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Whether you are pursuing first-time certification, transitioning to the 2022 edition, or integrating ISO
              27001 with PCI DSS or GSMA SAS, our lead auditors and security practitioners deliver programmes that
              survive the audit and remain usable after it.
            </p>
          </Reveal>
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
                ISO Management Systems service
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 bg-[var(--navy-deep)] text-[var(--bone)]">
        <div className="container-x">
          <Reveal>
            <h2 className="font-display text-3xl mb-4">Why organisations in Kenya choose ISO 27001</h2>
            <p className="text-white/70 max-w-2xl mb-10">
              Customer contracts, regulator expectations, tender requirements and board risk oversight increasingly
              demand demonstrable information security. ISO 27001 remains the most widely recognised framework.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Customer and tender security questionnaires",
              "Kenya Data Protection Act accountability",
              "Banking, fintech and telecoms regulatory pressure",
              "Board-level cyber risk reporting",
              "Supply-chain and third-party assurance",
              "International expansion and partner requirements",
            ].map((item, i) => (
              <Reveal key={i} delay={i * 40}>
                <div className="flex gap-3 items-start">
                  <CheckCircle2 className="h-5 w-5 text-[var(--gold)] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container-x max-w-3xl">
          <Reveal>
            <h2 className="font-display text-3xl mb-8">Our ISO 27001 process</h2>
          </Reveal>
          <div className="space-y-8">
            {processSteps.map((step, i) => (
              <Reveal key={i} delay={i * 50}>
                <div className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-display text-lg mb-1">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/40">
        <div className="container-x max-w-3xl">
          <Reveal>
            <div className="flex items-start gap-3 mb-6">
              <MapPin className="h-5 w-5 text-[var(--gold)] shrink-0 mt-1" />
              <div>
                <h2 className="font-display text-2xl mb-2">Nairobi base, worldwide delivery</h2>
                <p className="text-muted-foreground leading-relaxed">
                  AACL Global is headquartered at Vision Towers, Muthangari Drive, Westlands, Nairobi. We support clients
                  across Kenya onsite and deliver fully remote programmes for organisations in Africa, Europe, the UK,
                  the US and Asia-Pacific.
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-[var(--gold)] shrink-0 mt-1" />
              <div>
                <h3 className="font-display text-lg mb-1">Transparent scoping</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Cost and timeline depend on your size and complexity. We always start with a short discovery call so
                  you understand the realistic path before committing. See also our pages on{" "}
                  <Link to="/iso-certification-cost-kenya" className="text-primary hover:underline">
                    ISO certification cost in Kenya
                  </Link>{" "}
                  and{" "}
                  <Link to="/iso-9001-kenya-cost" className="text-primary hover:underline">
                    ISO 9001 Kenya cost
                  </Link>
                  .
                </p>
              </div>
            </div>
          </Reveal>
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
        </div>
      </section>

      <section className="py-16 bg-[var(--navy-deep)] text-[var(--bone)]">
        <div className="container-x max-w-3xl text-center">
          <Reveal>
            <Shield className="h-10 w-10 text-[var(--gold)] mx-auto mb-4" />
            <h2 className="font-display text-3xl mb-4">Ready to discuss ISO 27001 in Kenya?</h2>
            <p className="text-white/70 mb-8">
              Book a short call. We listen first, then outline a right-sized path to certification or ongoing compliance.
            </p>
            <Link
              to="/book"
              className="inline-flex items-center gap-2 rounded-md bg-[var(--gold)] px-6 py-3 text-sm font-medium text-[var(--navy)] hover:opacity-90"
            >
              Book a consultation <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="py-12 bg-muted/40">
        <div className="container-x max-w-3xl">
          <h2 className="font-display text-xl mb-4">Related services & reading</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/services/iso-management-systems" className="hover:text-[var(--navy)]">
                ISO Management Systems Consultancy
              </Link>
            </li>
            <li>
              <Link to="/services/risk-and-vulnerability-assessments" className="hover:text-[var(--navy)]">
                Physical & Cybersecurity Risk Assessments
              </Link>
            </li>
            <li>
              <Link to="/pci-dss-certification-kenya" className="hover:text-[var(--navy)]">
                PCI DSS certification in Kenya
              </Link>
            </li>
            <li>
              <Link to="/gsma-sas-kenya" className="hover:text-[var(--navy)]">
                GSMA SAS Kenya
              </Link>
            </li>
            <li>
              <Link to="/insights/$slug" params={{ slug: "iso-27001-2022-transition" }} className="hover:text-[var(--navy)]">
                Transitioning to ISO/IEC 27001:2022 — practitioner roadmap
              </Link>
            </li>
            <li>
              <Link to="/insights/$slug" params={{ slug: "kenya-data-protection-act-lessons" }} className="hover:text-[var(--navy)]">
                Kenya Data Protection Act — enforcement lessons
              </Link>
            </li>
            <li>
              <Link to="/insights/$slug" params={{ slug: "board-reporting-on-cyber-risk" }} className="hover:text-[var(--navy)]">
                Board reporting on cyber risk
              </Link>
            </li>
            <li>
              <Link to="/industries/banking-financial-services" className="hover:text-[var(--navy)]">
                Banking & Financial Services industry page
              </Link>
            </li>
            <li>
              <Link to="/industries/technology" className="hover:text-[var(--navy)]">
                Technology industry page
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
