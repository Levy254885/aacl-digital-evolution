import { useEffect, useRef, useState, type ReactNode, createElement } from "react";

function useInView<T extends HTMLElement>(threshold = 0.12) {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, seen };
}

export function Reveal({
  children,
  delay = 0,
  as = "div",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
}) {
  const { ref, seen } = useInView<HTMLElement>();

  return createElement(
    as,
    {
      ref,
      className,
      style: {
        opacity: seen ? 1 : 0,
        transform: seen ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.9s cubic-bezier(0.2,0.7,0.2,1) ${delay}ms, transform 0.9s cubic-bezier(0.2,0.7,0.2,1) ${delay}ms`,
      },
    },
    children,
  );
}

/** Word-by-word text reveal, ITIC-style headline animation. */
export function TextReveal({
  text,
  className = "",
  as = "h2",
  delay = 0,
  stagger = 55,
}: {
  text: string;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  delay?: number;
  stagger?: number;
}) {
  const { ref, seen } = useInView<HTMLElement>(0.2);
  const words = text.split(" ");

  return createElement(
    as,
    { ref, className },
    words.map((w, i) => (
      <span key={`${w}-${i}`} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
        <span
          style={{
            display: "inline-block",
            transform: seen ? "translateY(0)" : "translateY(105%)",
            opacity: seen ? 1 : 0,
            transition: `transform 0.85s cubic-bezier(0.22,1,0.36,1) ${delay + i * stagger}ms, opacity 0.6s ease ${delay + i * stagger}ms`,
          }}
        >
          {w}
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      </span>
    )),
  );
}

/** Thin line that draws itself in when scrolled into view. */
export function LineReveal({ className = "" }: { className?: string }) {
  const { ref, seen } = useInView<HTMLDivElement>(0.4);
  return (
    <div ref={ref} className={`h-px w-full bg-border overflow-hidden ${className}`}>
      <div
        className="h-px bg-[var(--navy)]"
        style={{
          width: seen ? "100%" : "0%",
          transition: "width 1.1s cubic-bezier(0.22,1,0.36,1)",
        }}
      />
    </div>
  );
}
