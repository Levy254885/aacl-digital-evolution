import { useEffect, useState } from "react";

export function ScrollTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`fixed bottom-8 right-6 z-40 h-12 w-12 rounded-full border border-[var(--navy)]/25 bg-background text-[var(--navy)] flex items-center justify-center shadow-[0_10px_30px_-12px_rgba(20,33,53,0.5)] transition-all duration-300 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 19V5M12 5l-7 7M12 5l7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
