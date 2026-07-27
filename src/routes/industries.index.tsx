import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { INDUSTRIES } from "@/lib/aacl-content";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/industries/")({
  head: () => ({
    meta: [
      { title: "Industries — AACL Sector Expertise" },
      { name: "description", content: "AACL delivers specialist assurance across banking, security printing, manufacturing, hospitality, pharmaceuticals, telecommunications and more." },
      { property: "og:title", content: "Industries — AACL" },
      { property: "og:description", content: "Sector expertise across regulated industries." },
      { property: "og:url", content: "/industries" },
    ],
    links: [{ rel: "canonical", href: "/industries" }],
  }),
  component: IndustriesPage,
});

function IndustriesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Industries"
        title="Sector expertise across the regulated economy."
        lead="AACL consultants have delivered assurance programmes across ten priority sectors — each with distinctive regulatory expectations, operational risks and certification demands."
        image="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2000&q=80"
      />
      <section className="py-24 bg-background">
        <div className="container-x grid md:grid-cols-2 gap-px bg-border">
          {INDUSTRIES.map((i, idx) => (
            <Reveal key={i.slug} delay={idx * 50}>
              <Link
                to="/industries/$slug"
                params={{ slug: i.slug }}
                className="group block bg-background p-10 hover:bg-[var(--navy-deep)] hover:text-[var(--bone)] transition-colors"
              >
                <div className="flex items-start gap-6">
                  <img src={i.image} alt="" className="w-24 h-24 object-cover shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-display text-2xl group-hover:text-[var(--bone)]">{i.name}</h3>
                    <p className="text-sm text-muted-foreground group-hover:text-white/70 mt-2 leading-relaxed">{i.short}</p>
                    <span className="inline-flex items-center gap-2 mt-4 text-xs uppercase tracking-[0.18em] text-[var(--gold)]">
                      Explore <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
