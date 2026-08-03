import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MENU } from "@/lib/aacl-nav";
import { SITE } from "@/lib/aacl-content";
import aaclLogo from "@/assets/aacl-logo.png";
import { CurrencySelector } from "./CurrencySelector";


function Chevron({ open }: { open?: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SiteHeader({ transparent = false }: { transparent?: boolean }) {
  const [open, setOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = !transparent || scrolled || open;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        solid ? "bg-background shadow-[0_1px_0_0_var(--border)]" : "bg-transparent"
      }`}
    >
      <div className="container-x flex items-center justify-between h-[72px] lg:h-[92px] gap-6">
        <Link
          to="/"
          className="flex items-center gap-3 shrink-0"
          onClick={() => setOpen(false)}
          aria-label="AACL Global — home"
        >
          <span
            className={`inline-flex items-center rounded-[10px] px-3 py-2 transition-colors ${
              solid ? "bg-transparent" : "bg-white/95"
            }`}
          >
            <img
              src={aaclLogo}
              alt="AACL — Audits and Assurance Consult Ltd"
              width={1920}
              height={382}
              className="h-6 lg:h-8 w-auto object-contain"
            />
          </span>
          <span
            className={`hidden sm:block text-[9px] uppercase tracking-[0.14em] leading-tight max-w-[9rem] ${
              solid ? "text-muted-foreground" : "text-white/70"
            }`}
          >
            Audits &amp; Assurance Consult Ltd
          </span>
        </Link>


        <nav className="hidden xl:flex items-center gap-1">
          {MENU.map((item) => (
            <div key={item.label} className="relative group">
              <Link
                to={item.to}
                className={`flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.08em] transition-colors ${
                  solid
                    ? "text-[var(--navy)] group-hover:bg-[var(--navy)] group-hover:text-white"
                    : "text-white group-hover:bg-white/15"
                }`}
                activeProps={{ className: "underline underline-offset-8 decoration-2" }}
              >
                {item.label}
                {item.children && <Chevron />}
              </Link>

              {item.children && (
                <div className="absolute left-0 top-full pt-3 opacity-0 invisible translate-y-2 transition-all duration-250 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
                  <div className="w-[320px] rounded-[16px] bg-background border border-border shadow-[0_24px_60px_-24px_rgba(20,33,53,0.45)] p-3">
                    {item.children.map((c) => (
                      <Link
                        key={c.label}
                        to={c.to}
                        params={c.params as never}
                        className="block rounded-[10px] px-4 py-3 text-[13px] font-medium text-[var(--navy)] hover:bg-[var(--grey)] transition-colors"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden xl:flex items-center gap-4 shrink-0">
          <CurrencySelector variant={solid ? "light" : "dark"} />
          <a
            href={`tel:${SITE.phone.replace(/\s/g, "")}`}
            className={`text-[13px] font-semibold transition-colors ${
              solid ? "text-muted-foreground hover:text-[var(--navy)]" : "text-white/80 hover:text-white"
            }`}
          >
            {SITE.phone}
          </a>
          <Link
            to="/templates"
            className={`inline-flex items-center rounded-full px-6 py-3.5 text-[13px] font-semibold uppercase tracking-[0.1em] transition-all duration-300 hover:-translate-y-0.5 ${
              solid ? "bg-[var(--red)] text-white hover:bg-[var(--red-deep)]" : "bg-[var(--red)] text-white"
            }`}
          >
            Generate a Document
          </Link>
          <Link
            to="/book"
            className={`inline-flex items-center rounded-full px-6 py-3.5 text-[13px] font-semibold uppercase tracking-[0.1em] transition-all duration-300 hover:-translate-y-0.5 ${
              solid ? "bg-[var(--navy)] text-white" : "bg-white text-[var(--navy)]"
            }`}
          >
            Get Certified, Faster
          </Link>
        </div>


        <button
          className="xl:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`block h-[2px] w-6 transition-all duration-300 ${solid ? "bg-[var(--navy)]" : "bg-white"} ${
                open && i === 0 ? "translate-y-[8px] rotate-45" : ""
              } ${open && i === 1 ? "opacity-0" : ""} ${open && i === 2 ? "-translate-y-[8px] -rotate-45" : ""}`}
            />
          ))}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`xl:hidden overflow-y-auto bg-background transition-[max-height] duration-500 ${
          open ? "max-h-[calc(100vh-72px)] border-t border-border" : "max-h-0"
        }`}
      >
        <div className="container-x py-6 flex flex-col gap-1 pb-14">
          {MENU.map((item) =>
            item.children ? (
              <div key={item.label} className="border-b border-border">
                <button
                  className="w-full flex items-center justify-between py-4 text-sm font-semibold uppercase tracking-[0.1em] text-[var(--navy)]"
                  onClick={() => setMobileGroup((g) => (g === item.label ? null : item.label))}
                  aria-expanded={mobileGroup === item.label}
                >
                  {item.label}
                  <Chevron open={mobileGroup === item.label} />
                </button>
                <div
                  className={`overflow-hidden transition-[max-height] duration-400 ${
                    mobileGroup === item.label ? "max-h-[600px]" : "max-h-0"
                  }`}
                >
                  <div className="pb-4 flex flex-col">
                    {item.children.map((c) => (
                      <Link
                        key={c.label}
                        to={c.to}
                        params={c.params as never}
                        onClick={() => setOpen(false)}
                        className="py-3 pl-4 text-sm text-muted-foreground hover:text-[var(--navy)]"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setOpen(false)}
                className="py-4 border-b border-border text-sm font-semibold uppercase tracking-[0.1em] text-[var(--navy)]"
              >
                {item.label}
              </Link>
            ),
          )}

          <a
            href={`tel:${SITE.phone.replace(/\s/g, "")}`}
            className="py-4 text-sm font-semibold text-muted-foreground"
          >
            {SITE.phone}
          </a>
          <Link to="/book" onClick={() => setOpen(false)} className="btn-gold mt-2 self-start">
            Book Now
          </Link>
        </div>
      </div>
    </header>
  );
}
