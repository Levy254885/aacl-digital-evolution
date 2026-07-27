import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { Reveal, TextReveal } from "@/components/site/Reveal";
import { SERVICES, INDUSTRIES, INSIGHTS } from "@/lib/aacl-content";
import { PILLARS, STATS, TESTIMONIALS } from "@/lib/aacl-nav";
import { ContactForm } from "@/components/site/ContactForm";
import { GraduationCap, FileText, ShieldCheck, Briefcase } from "lucide-react";

const PILLAR_ICONS = [GraduationCap, FileText, ShieldCheck, Briefcase] as const;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AACL — Security, Compliance & ISO Management Systems" },
      {
        name: "description",
        content:
          "Audits and Assurance Consult Ltd (AACL) is East Africa's specialist consultancy for security, compliance, governance, risk and ISO management systems.",
      },
      { property: "og:title", content: "AACL — Security, Compliance & ISO Management Systems" },
      {
        property: "og:description",
        content:
          "Executive consultancy for security, compliance, governance, risk and ISO management systems across East Africa.",
      },
      { property: "og:url", content: "/" },
      {
        property: "og:image",
        content:
          "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1600&q=80",
      },
      {
        name: "twitter:image",
        content:
          "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1600&q=80",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const STANDARDS = [
  { label: "Information Security", code: "ISO/IEC 27001:2022", desc: "Information security management systems — protect confidentiality, integrity and availability of information assets." },
  { label: "Quality Management", code: "ISO 9001:2015", desc: "Quality management systems that consistently meet customer and regulatory requirements." },
  { label: "Occupational Health & Safety", code: "ISO 45001:2018", desc: "Occupational health and safety management — prevent work-related injury and ill health." },
  { label: "Business Continuity", code: "ISO 22301:2019", desc: "Business continuity management — prepare for, respond to and recover from disruptive incidents." },
  { label: "Environmental Management", code: "ISO 14001:2015", desc: "Environmental management systems that improve environmental performance and compliance." },
  { label: "Payment Card Security", code: "PCI DSS v4.0", desc: "Payment card industry data security standard for cardholder-data environments." },
  { label: "Risk Management", code: "ISO 31000:2018", desc: "Enterprise-wide risk management principles, framework and process." },
  { label: "Security Operations", code: "ISO 18788:2015", desc: "Management system for private security operations — governance, accountability and human rights." },
];

const WHY = [
  {
    t: "Assurance Excellence",
    d: "Proven delivery across ISO 27001, 9001, 45001, 22301 and sector-specific regulatory regimes.",
    dark: false,
  },
  {
    t: "Expert Leadership",
    d: "Certified lead auditors, security engineers and former corporate compliance leaders.",
    dark: true,
  },
  {
    t: "Ready-To-Use Systems",
    d: "Audit-tested policy sets, registers and evidence packs that shorten certification timelines.",
    dark: true,
  },
  {
    t: "Ongoing Support",
    d: "Surveillance-cycle support, internal audit and continuous improvement after certification.",
    dark: false,
  },
];

function ArrowCircle() {
  return (
    <span className="shrink-0 h-14 w-14 rounded-full border border-[var(--navy)]/25 flex items-center justify-center transition-all duration-300 group-hover:bg-[var(--navy)] group-hover:text-white">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M7 17L17 7M17 7H8M17 7v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function HomePage() {
  return (
    <PageShell transparentHeader>
      {/* HERO — full-bleed image with overlay */}
      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=2000&q=80"
          alt="AACL advisors in a client working session"
          className="absolute inset-0 h-full w-full object-cover hero-zoom"
        />
        <div className="absolute inset-0 bg-[var(--navy)]/75" />
        <div className="container-x relative py-40 text-center text-white">
          <Reveal>
            <div className="eyebrow eyebrow-light justify-center mb-7">Expert guidance at every step</div>
          </Reveal>
          <TextReveal
            as="h1"
            text="We Support Your Compliance Journey"
            className="font-display text-[2.6rem] leading-[1.06] md:text-[4.6rem] md:leading-[1.02] font-extrabold text-white max-w-5xl mx-auto"
          />
          <Reveal delay={420}>
            <p className="mt-8 mx-auto max-w-2xl text-base md:text-lg leading-relaxed text-white/80">
              Security, risk and ISO management systems for banks, telcos, hospitals and critical
              infrastructure across East Africa — built to pass audit, and built to be used.
            </p>
          </Reveal>
          <Reveal delay={520}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link to="/services" className="btn-gold">Discover more</Link>
              <Link to="/book" className="btn-outline-gold">Book a consultation</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PILLARS — navy band with notch */}
      <section className="relative bg-[var(--navy)] text-white/72 pt-20 pb-32">
        <div className="container-x grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => {
            const Icon = PILLAR_ICONS[i] ?? Briefcase;
            return (
              <Reveal key={p.title} delay={i * 90}>
                <div className="group">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-[14px] border border-white/30 mb-7 text-white transition-colors duration-300 group-hover:bg-white/10">
                    <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-2xl md:text-[1.75rem] font-extrabold text-white leading-tight">
                    {p.title}
                  </h3>
                  <p className="mt-4 text-sm leading-[1.95]">{p.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="absolute left-1/2 -bottom-9 -translate-x-1/2">
          <a
            href="#about"
            aria-label="Scroll to next section"
            className="h-[74px] w-[74px] rounded-full bg-[var(--navy)] border-[10px] border-background text-white flex items-center justify-center transition-transform duration-300 hover:translate-y-1"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 5v14M12 19l7-7M12 19l-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </section>

      {/* ABOUT — overlapping images + stats */}
      <section id="about" className="py-24 md:py-32 scroll-mt-24">
        <div className="container-x grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="relative pb-24 sm:pb-32">
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80"
                alt="AACL consultants reviewing management system evidence"
                className="w-full sm:w-[78%] h-[320px] sm:h-[420px] object-cover rounded-[18px]"
                loading="lazy"
              />
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80"
                alt="Audit planning workshop with a client team"
                className="w-[72%] h-[240px] sm:h-[300px] object-cover rounded-[18px] absolute right-0 bottom-0 border-8 border-background"
                loading="lazy"
              />
            </div>
          </Reveal>

          <div>
            <Reveal><div className="eyebrow mb-6">What about us</div></Reveal>
            <TextReveal
              text="Simplifying Compliance With Proven Expertise"
              className="font-display text-[2.1rem] md:text-[3.1rem] font-extrabold leading-[1.08]"
            />
            <Reveal delay={240}>
              <p className="mt-7 text-base leading-[1.95] text-muted-foreground max-w-xl">
                We are a team of assurance specialists with decades of experience across security,
                risk and certification. Our mission is to deliver trusted solutions that simplify
                compliance, strengthen operations and drive sustainable success.
              </p>
            </Reveal>

            <div className="mt-12 pt-10 border-t border-border grid grid-cols-3 divide-x divide-border">
              {STATS.map((s, i) => (
                <Reveal key={s.label} delay={i * 110} className={i === 0 ? "pr-4" : "px-4"}>
                  <div className="text-sm text-muted-foreground">{s.label}</div>
                  <div className="font-display text-3xl md:text-[2.6rem] font-extrabold mt-2">{s.value}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STANDARDS */}
      <section className="py-24 md:py-28 surface-grey">
        <div className="container-x">
          <div className="text-center max-w-3xl mx-auto">
            <Reveal><div className="eyebrow justify-center mb-5">Conformity assessment standards</div></Reveal>
            <TextReveal
              text="Standards We Support"
              className="font-display text-[2.2rem] md:text-[3.4rem] font-extrabold leading-tight justify-center text-center"
            />
          </div>

          <div className="mt-16 grid md:grid-cols-2 gap-x-20">
            {STANDARDS.map((s, i) => (
              <Reveal key={s.code} delay={(i % 2) * 90}>
                <Link
                  to="/services"
                  className="group flex items-center gap-6 py-8 border-b border-[var(--grey-2)]"
                >
                  <span className="text-sm text-muted-foreground tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-[12px] uppercase tracking-[0.12em] text-muted-foreground">
                      {s.label}
                    </span>
                    <span className="block font-display text-xl md:text-[1.7rem] font-extrabold mt-2 transition-transform duration-300 group-hover:translate-x-1">
                      {s.code}
                    </span>
                  </span>
                  <ArrowCircle />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 md:py-32">
        <div className="container-x grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-5">
            <Reveal><div className="eyebrow mb-6">Why choose us</div></Reveal>
            <TextReveal
              text="Empowering Compliance With Real Expertise"
              className="font-display text-[2.1rem] md:text-[3.1rem] font-extrabold leading-[1.08]"
            />
            <Reveal delay={220}>
              <p className="mt-7 text-base leading-[1.95] text-muted-foreground max-w-md">
                We are trusted by organisations across the region, delivering practical solutions
                that simplify and strengthen every compliance journey.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <Link to="/about" className="btn-gold mt-10">Learn more</Link>
            </Reveal>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
            {WHY.map((w, i) => (
              <Reveal key={w.t} delay={i * 90}>
                <div
                  className={`h-full rounded-[18px] p-8 transition-transform duration-300 hover:-translate-y-1.5 ${
                    w.dark ? "bg-[var(--navy)] text-white/72" : "surface-grey text-muted-foreground"
                  }`}
                >
                  <span
                    className={`block h-11 w-11 rounded-[12px] border mb-7 ${
                      w.dark ? "border-white/30" : "border-[var(--navy)]/25"
                    }`}
                  />
                  <h3 className={`font-display text-2xl font-extrabold leading-snug ${w.dark ? "text-white" : ""}`}>
                    {w.t}
                  </h3>
                  <p className="mt-4 text-sm leading-[1.95]">{w.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 surface-grey">
        <div className="container-x">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal><div className="eyebrow justify-center mb-5">Practice areas</div></Reveal>
            <TextReveal
              text="Services Built Around Your Risk"
              className="font-display text-[2.2rem] md:text-[3.2rem] font-extrabold leading-tight text-center"
            />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={i * 70}>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="group h-full flex flex-col rounded-[18px] bg-background p-8 transition-all duration-300 hover:-translate-y-1.5 hover:bg-[var(--navy)]"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--navy)] text-white text-sm font-bold transition-colors group-hover:bg-white group-hover:text-[var(--navy)]">
                    {s.number}
                  </span>
                  <h3 className="font-display text-xl font-extrabold mt-7 leading-snug transition-colors group-hover:text-white">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-[1.9] flex-1 text-muted-foreground transition-colors group-hover:text-white/70">
                    {s.short}
                  </p>
                  <span className="mt-7 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em] text-[var(--navy)] transition-colors group-hover:text-white">
                    Read more
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Link>
              </Reveal>
            ))}
            <Reveal delay={SERVICES.length * 70}>
              <div className="h-full rounded-[18px] bg-[var(--navy)] p-8 flex flex-col justify-between">
                <p className="font-display text-2xl font-extrabold leading-snug text-white">
                  Combining practice areas into single, coherent programmes.
                </p>
                <Link to="/book" className="btn-outline-gold mt-10 self-start">Talk to us</Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="py-24">
        <div className="container-x">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <Reveal><div className="eyebrow mb-5">Industries</div></Reveal>
              <TextReveal
                text="Trusted By Regulated Organisations"
                className="font-display text-[2rem] md:text-[3rem] font-extrabold max-w-xl leading-tight"
              />
            </div>
            <Reveal delay={100}>
              <Link to="/industries" className="link-arrow">All industries</Link>
            </Reveal>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
            {INDUSTRIES.map((i, idx) => (
              <Reveal key={i.slug} delay={idx * 40}>
                <Link
                  to="/industries/$slug"
                  params={{ slug: i.slug }}
                  className="group block relative overflow-hidden rounded-[18px] aspect-[4/5]"
                >
                  <img
                    src={i.image}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)] via-[var(--navy)]/55 to-transparent" />
                  <div className="relative h-full flex flex-col justify-end p-5 text-white">
                    <div className="font-display font-bold text-sm leading-tight">{i.name}</div>
                    <span className="mt-3 h-px w-8 bg-white/60 transition-all duration-300 group-hover:w-14" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BLOGS */}
      <section className="py-24 surface-grey">
        <div className="container-x">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal><div className="eyebrow justify-center mb-5">From the knowledge hub</div></Reveal>
            <TextReveal
              text="Explore Our Blogs"
              className="font-display text-[2.2rem] md:text-[3.4rem] font-extrabold leading-tight text-center"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {INSIGHTS.slice(0, 3).map((p, i) => (
              <Reveal key={p.slug} delay={i * 100}>
                <article className="h-full flex flex-col">
                  <Link
                    to="/insights/$slug"
                    params={{ slug: p.slug }}
                    className="group relative block overflow-hidden rounded-[16px] h-[290px]"
                  >
                    <img
                      src={p.image}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[var(--navy)]/78" />
                    <div className="relative h-full p-7 flex flex-col justify-center text-white">
                      <h3 className="font-display text-xl font-extrabold leading-snug">{p.title}</h3>
                      <p className="mt-4 text-[12px] text-white/70 leading-relaxed">
                        By AACL Practitioners · {p.category}
                      </p>
                      <span className="mt-4 self-start rounded-full bg-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.14em]">
                        {p.category}
                      </span>
                    </div>
                  </Link>

                  <div className="pt-7 flex flex-col flex-1">
                    <div className="text-[12px] uppercase tracking-[0.12em] text-muted-foreground">
                      {new Date(p.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })} · {p.readTime}
                    </div>
                    <h4 className="font-display text-[1.35rem] font-extrabold leading-snug mt-3">{p.title}</h4>
                    <div className="mt-6 pt-6 border-t border-[var(--grey-2)]">
                      <Link to="/insights/$slug" params={{ slug: p.slug }} className="btn-gold px-7 py-3.5">
                        Read more
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 md:py-32">
        <div className="container-x grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-5">
            <Reveal><div className="eyebrow mb-6">Testimonials</div></Reveal>
            <TextReveal
              text="Empowering Businesses, As Told By Clients"
              className="font-display text-[2.1rem] md:text-[3.1rem] font-extrabold leading-[1.08]"
            />
            <div className="mt-10 pt-8 border-t border-border">
              <div className="font-display text-xl font-extrabold">Excellent 180+ Reviews</div>
              <div className="mt-3 flex items-center gap-3">
                <span className="flex gap-1" aria-hidden="true">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <svg key={s} width="18" height="18" viewBox="0 0 24 24" fill="var(--navy)">
                      <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z" />
                    </svg>
                  ))}
                </span>
                <span className="text-sm text-muted-foreground">4.9/5</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
            {TESTIMONIALS.filter((t) => t.featured).map((t, i) => (
              <Reveal key={t.name} delay={i * 100}>
                <figure className="h-full flex flex-col rounded-[18px] overflow-hidden">
                  <blockquote className="flex-1 surface-grey p-8 text-sm leading-[1.95] text-muted-foreground">
                    {t.quote}
                  </blockquote>
                  <figcaption className="bg-[var(--navy)] p-7 flex items-center gap-4">
                    <span className="h-12 w-12 rounded-full bg-white/15 border border-white/25 flex items-center justify-center font-display font-extrabold text-white">
                      {t.name.charAt(0)}
                    </span>
                    <span>
                      <span className="block font-display text-lg font-extrabold text-white leading-tight">{t.name}</span>
                      <span className="block text-xs text-white/60 mt-1">{t.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          <div className="lg:col-span-12 grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.filter((t) => !t.featured).map((t, i) => (
              <Reveal key={t.name} delay={i * 90}>
                <figure className="h-full surface-grey rounded-[18px] p-8">
                  <blockquote className="text-sm leading-[1.95] text-muted-foreground">{t.quote}</blockquote>
                  <figcaption className="mt-6 pt-5 border-t border-[var(--grey-2)]">
                    <span className="block font-display font-extrabold">{t.name}</span>
                    <span className="block text-xs text-muted-foreground mt-1">{t.role}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-24 surface-grey">
        <div className="container-x grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <Reveal><div className="eyebrow mb-6">Contact us</div></Reveal>
            <TextReveal
              text="Our Team Will Respond"
              className="font-display text-[2.2rem] md:text-[3.2rem] font-extrabold leading-[1.08] mb-10"
            />
            <Reveal delay={200}>
              <div className="rounded-[18px] bg-background p-7 md:p-9">
                <ContactForm compact />
              </div>
            </Reveal>
          </div>

          <Reveal delay={160} className="hidden lg:block">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg"
              alt="Map showing AACL client coverage"
              className="w-full opacity-25"
              loading="lazy"
            />
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
