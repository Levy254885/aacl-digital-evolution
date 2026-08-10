import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";
import { COST_BANNERS, COST_FAQ, COST_PILLARS } from "@/lib/pricing-content";

/** Reassurance banner placed near every price point on the site. */
export function CostBanner({ variant = "a" }: { variant?: "a" | "b" }) {
  return (
    <Reveal>
      <div className="rounded-[18px] bg-[var(--navy)] p-8 md:p-10 text-white">
        <div className="eyebrow eyebrow-light mb-5">Talk budget first</div>
        <p className="font-display text-xl md:text-[1.6rem] font-extrabold leading-snug max-w-3xl">
          {COST_BANNERS[variant]}
        </p>
        <Link to="/contact" className="btn-outline-gold mt-8">
          Talk Budget First. No Obligation
        </Link>
      </div>
    </Reveal>
  );
}

/** Three message pillars answering the cost objection head-on. */
export function CostPillars() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {COST_PILLARS.map((p, i) => (
        <Reveal key={p.title} delay={i * 90}>
          <div className="h-full surface-grey rounded-[18px] p-8">
            <h3 className="font-display text-xl font-extrabold leading-snug">{p.title}</h3>
            <p className="mt-4 text-sm leading-[1.95] text-muted-foreground">{p.body}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/** Short FAQ block addressing perceived cost of certification. */
export function CostFaq() {
  return (
    <Reveal>
      <div className="rounded-[18px] border border-border p-8">
        <h3 className="font-display text-xl font-extrabold">{COST_FAQ.q}</h3>
        <p className="mt-4 text-sm leading-[1.95] text-muted-foreground">{COST_FAQ.a}</p>
      </div>
    </Reveal>
  );
}
