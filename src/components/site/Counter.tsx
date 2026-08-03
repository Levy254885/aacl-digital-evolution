import { useEffect, useRef, useState } from "react";

function parse(value: string) {
  const num = Number(value.replace(/[^0-9.]/g, "")) || 0;
  const suffix = value.replace(/[0-9.,\s]/g, "");
  return { num, suffix };
}

/** Counts up to a numeric value (e.g. "150+") once it scrolls into view. */
export function Counter({ value, className = "" }: { value: string; className?: string }) {
  const { num, suffix } = parse(value);
  const ref = useRef<HTMLSpanElement | null>(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();

        if (reduce) {
          setShown(num);
          return;
        }

        const duration = 1800;
        const start = performance.now();
        let frame = 0;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setShown(Math.round(num * eased));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
      },
      { threshold: 0.4 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [num]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {shown.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
