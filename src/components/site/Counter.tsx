import { useEffect, useRef, useState } from "react";

function parse(value: string) {
  const num = Number(value.replace(/[^0-9.]/g, "")) || 0;
  const suffix = value.replace(/[0-9.,\s]/g, "");
  return { num, suffix };
}

/**
 * Displays a numeric value with an optional count-up animation.
 * Initial render uses the final value so crawlers and no-JS users
 * never see a misleading "0+". Animation still runs after the
 * element scrolls into view. Verified site figures (e.g. 120+,
 * 50+, 850+) must remain accurate on first paint.
 */
export function Counter({ value, className = "" }: { value: string; className?: string }) {
  const { num, suffix } = parse(value);
  const ref = useRef<HTMLSpanElement | null>(null);
  // Start at final value for correct first paint / SSR / crawlers
  const [shown, setShown] = useState(num);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || animated) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      setShown(num);
      setAnimated(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        setAnimated(true);

        // Brief reset then animate up for visual interest
        setShown(0);
        const duration = 1800;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setShown(Math.round(num * eased));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [num, animated]);

  return (
    <span
      ref={ref}
      className={`tabular-nums ${className}`}
      data-value={`${num}${suffix}`}
      aria-label={`${num.toLocaleString("en-US")}${suffix}`}
    >
      {shown.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
