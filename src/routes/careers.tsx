import { createFileRoute, Link } from "@tanstack/react-router";
import { absUrl } from "@/lib/site-url";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers at AACL — Join our practice" },
      { name: "description", content: "Explore career opportunities at Audits and Assurance Consult Ltd — a specialist consultancy for security, compliance and ISO management systems." },
      { property: "og:title", content: "Careers at AACL" },
      { property: "og:description", content: "Careers at AACL." },
      { property: "og:url", content: absUrl("/careers") },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: absUrl("/careers") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
            { "@type": "ListItem", position: 2, name: "Careers", item: absUrl("/careers") },
          ],
        }),
      },
    ],
  }),
  component: () => (
    <PageShell>
      <PageHero
        eyebrow="Careers"
        title="Build a career at the intersection of assurance, security and compliance."
        lead="AACL is a practice of lead auditors, security engineers and former corporate leaders. We hire selectively for consulting positions and structured graduate roles."
        image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80"
      />
      <section className="py-24 bg-background">
        <div className="container-x max-w-3xl">
          <Reveal>
            <h2 className="font-display text-3xl mb-6">Current openings</h2>
            <p className="text-muted-foreground leading-relaxed">We are not actively hiring at this time. We accept speculative applications from experienced ISO lead auditors, cybersecurity consultants, and statutory compliance specialists.</p>
            <p className="text-muted-foreground leading-relaxed mt-4">To submit a speculative application, email your CV and cover note to <a href="mailto:info@aacl.co.ke" className="text-[var(--gold)] underline">info@aacl.co.ke</a>.</p>
            <Link to="/contact" className="btn-gold mt-10 inline-flex">Contact us <ArrowRight size={16} /></Link>
          </Reveal>
        </div>
      </section>
    </PageShell>
  ),
});
