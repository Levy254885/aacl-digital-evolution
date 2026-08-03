import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";

export type HeroSlide = {
  image: string;
  alt: string;
  eyebrow: string;
  headline: string;
  sub: string;
  primary: { label: string; to: string };
  secondary: { label: string; to: string };
};

const DURATION = 6500;

function SlideText({ text, active, delay = 0 }: { text: string; active: boolean; delay?: number }) {
  const words = text.split(" ");
  return (
    <h1 className="font-display text-[2.4rem] leading-[1.06] md:text-[4.4rem] md:leading-[1.02] font-extrabold text-white max-w-5xl mx-auto">
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}
        >
          <span
            style={{
              display: "inline-block",
              transform: active ? "translateY(0)" : "translateY(110%)",
              opacity: active ? 1 : 0,
              filter: active ? "blur(0px)" : "blur(6px)",
              transition: `transform 1s cubic-bezier(0.22,1,0.36,1) ${delay + i * 70}ms, opacity 0.8s ease ${delay + i * 70}ms, filter 0.8s ease ${delay + i * 70}ms`,
            }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </h1>
  );
}

export function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    timer.current = setInterval(() => setIndex((i) => (i + 1) % slides.length), DURATION);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, slides.length]);

  return (
    <section
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[var(--navy)]"
      aria-roledescription="carousel"
      aria-label="AACL highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((s, i) => (
        <img
          key={s.image}
          src={s.image}
          alt={s.alt}
          loading={i === 0 ? "eager" : "lazy"}
          fetchPriority={i === 0 ? "high" : "low"}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-all duration-[1600ms] ease-out"
          style={{
            opacity: i === index ? 1 : 0,
            transform: i === index ? "scale(1)" : "scale(1.08)",
          }}
        />
      ))}

      <div className="absolute inset-0 bg-[var(--navy)]/82" />
      <div className="hero-aurora opacity-60" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-sheen" aria-hidden="true" />
      <div
        className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[var(--red-soft)] to-transparent"
        aria-hidden="true"
      />

      <div className="container-x relative py-36 md:py-40 text-center text-white">
        {slides.map((s, i) => {
          const active = i === index;
          return (
            <div
              key={s.headline}
              aria-hidden={!active}
              className={active ? "" : "pointer-events-none absolute inset-x-0 top-36 opacity-0"}
            >
              <div
                className="eyebrow eyebrow-light justify-center mb-7"
                style={{
                  opacity: active ? 1 : 0,
                  transform: active ? "translateY(0)" : "translateY(14px)",
                  transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                {s.eyebrow}
              </div>

              <SlideText text={s.headline} active={active} delay={120} />

              <p
                className="mt-8 mx-auto max-w-2xl text-base md:text-lg leading-relaxed text-white/80"
                style={{
                  opacity: active ? 1 : 0,
                  transform: active ? "translateY(0)" : "translateY(18px)",
                  transition:
                    "opacity 0.9s ease 500ms, transform 0.9s cubic-bezier(0.22,1,0.36,1) 500ms",
                }}
              >
                {s.sub}
              </p>

              <div
                className="mt-10 flex flex-wrap justify-center gap-4"
                style={{
                  opacity: active ? 1 : 0,
                  transform: active ? "translateY(0)" : "translateY(18px)",
                  transition:
                    "opacity 0.9s ease 680ms, transform 0.9s cubic-bezier(0.22,1,0.36,1) 680ms",
                }}
              >
                <Link to={s.primary.to} className="btn-gold">
                  {s.primary.label}
                </Link>
                <Link to={s.secondary.to} className="btn-outline-gold">
                  {s.secondary.label}
                </Link>
              </div>
            </div>
          );
        })}

        <div className="mt-14 flex items-center justify-center gap-3">
          {slides.map((s, i) => (
            <button
              key={s.image}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show slide ${i + 1}: ${s.headline}`}
              aria-current={i === index}
              className="h-[3px] w-12 overflow-hidden rounded-full bg-white/25"
            >
              <span
                className="block h-full bg-white"
                style={{
                  width: i === index ? "100%" : "0%",
                  transition:
                    i === index ? `width ${DURATION}ms linear` : "width 0.4s ease",
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
