import { Link } from "@tanstack/react-router";
import { ArrowRight, Building2, Globe2, Check } from "lucide-react";
import { Reveal } from "./Reveal";
import { DELIVERY_OPTIONS, DELIVERY_STRAPLINE } from "@/lib/ecompliance-content";

/**
 * The two AACL service options shown on every ISO Management Systems
 * and eCompliance page.
 */
export function ServiceOptions({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`${compact ? "py-16" : "py-24"} bg-[var(--bone)]`}>
      <div className="container-x">
        <Reveal>
          <div className="eyebrow mb-4">Two ways to engage AACL</div>
          <h2 className="font-display text-3xl md:text-4xl leading-tight max-w-3xl">
            Choose the delivery model that fits your team.
          </h2>
          <p className="mt-4 font-display text-[var(--red,#99182a)] tracking-[0.18em] text-xs uppercase">
            {DELIVERY_STRAPLINE}
          </p>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {DELIVERY_OPTIONS.map((o, i) => (
            <Reveal key={o.id} delay={i * 100}>
              <div className="h-full bg-background border border-border rounded-[18px] p-8 flex flex-col">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-[var(--navy-deep)] text-[var(--bone)] grid place-items-center shrink-0">
                    {o.id === "onsite" ? <Building2 size={18} /> : <Globe2 size={18} />}
                  </span>
                  <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {o.id === "onsite" ? "Onsite" : "Remote"}
                  </span>
                </div>
                <h3 className="font-display text-2xl mt-5 leading-snug">{o.name}</h3>
                <p className="text-sm text-[var(--gold)] mt-2">{o.tagline}</p>
                <p className="mt-4 text-muted-foreground leading-relaxed">{o.body}</p>
                <ul className="mt-6 space-y-3 flex-1">
                  {o.includes.map((inc) => (
                    <li key={inc} className="flex gap-3 items-start text-sm">
                      <Check size={16} className="text-[var(--gold)] mt-0.5 shrink-0" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 pt-5 border-t border-border text-sm text-muted-foreground">
                  <span className="text-foreground font-medium">Best for: </span>
                  {o.bestFor}
                </p>
                <Link to="/book" className="btn-gold mt-6 self-start">
                  Discuss this option <ArrowRight size={16} />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
