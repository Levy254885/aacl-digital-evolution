import { Link } from "@tanstack/react-router";
import { SITE, SERVICES, INDUSTRIES } from "@/lib/aacl-content";
import aaclLogo from "@/assets/aacl-logo.png";

export function SiteFooter() {
  return (
    <footer className="bg-[var(--navy)] text-white/65">
      <div className="container-x pt-20 pb-16">
        {/* Big statement + rotating badge */}
        <div className="grid gap-10 lg:grid-cols-12 items-center">
          <h2 className="lg:col-span-8 font-display text-3xl md:text-5xl font-extrabold leading-[1.1] text-white">
            Expert Guidance For Long Term Business Success.
          </h2>
          <div className="lg:col-span-4 flex lg:justify-end">
            <div className="relative h-[170px] w-[170px]">
              <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full spin-slow" aria-hidden="true">
                <defs>
                  <path id="aacl-badge" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
                </defs>
                <text fill="rgba(255,255,255,0.8)" fontSize="13" letterSpacing="3.4">
                  <textPath href="#aacl-badge">
                    AUDIT · ASSURANCE · COMPLIANCE · CERTIFICATION · RISK ·
                  </textPath>
                </text>
              </svg>
              <div className="absolute inset-[34px] rounded-full bg-white flex items-center justify-center">
                <img src={aaclLogo} alt="AACL" className="h-16 w-16 object-contain" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 h-px w-full bg-white/12" />

        <div className="mt-14 grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-11 w-11 rounded-full bg-white flex items-center justify-center overflow-hidden">
                <img src={aaclLogo} alt="AACL" className="h-full w-full object-contain" />
              </span>
              <span>
                <span className="block font-display text-xl font-extrabold text-white leading-none">AACL</span>
                <span className="block text-[9px] uppercase tracking-[0.14em] text-white/40 mt-1">
                  Audits &amp; Assurance Consult Ltd
                </span>
              </span>
            </div>
            <p className="text-sm leading-[1.9] max-w-sm">
              At AACL, we believe in clarity, credibility and systems that turn compliance into lasting trust.
            </p>
            <div className="mt-7 flex gap-3">
              {["in", "X", "f", "yt"].map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  className="h-11 w-11 rounded-full bg-white text-[var(--navy)] text-xs font-bold flex items-center justify-center transition-transform duration-300 hover:-translate-y-1"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 lg:border-l lg:border-white/12 lg:pl-14">
            <div className="font-display text-xl font-extrabold text-white mb-7">Useful Links</div>
            <div className="grid grid-cols-2 gap-x-8">
              <ul className="space-y-4 text-sm">
                {[
                  { label: "Home", to: "/" },
                  { label: "Who We Are", to: "/about" },
                  { label: "Services", to: "/services" },
                  { label: "Industries", to: "/industries" },
                  { label: "Knowledge Hub", to: "/insights" },
                  { label: "Careers", to: "/careers" },
                ].map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="footer-dash hover:text-white transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="space-y-4 text-sm">
                {SERVICES.slice(0, 5).map((s) => (
                  <li key={s.slug}>
                    <Link
                      to="/services/$slug"
                      params={{ slug: s.slug }}
                      className="footer-dash hover:text-white transition-colors"
                    >
                      {s.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/industries/$slug" params={{ slug: INDUSTRIES[0].slug }} className="footer-dash hover:text-white transition-colors">
                    {INDUSTRIES[0].name}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="font-display text-xl font-extrabold text-white mb-7">Contact Info</div>
            <ul className="space-y-5 text-sm leading-[1.9]">
              <li>
                <span className="block text-white mb-1">Address:</span>
                {SITE.address.line1}, {SITE.address.line2}, {SITE.address.city}, {SITE.address.country}
              </li>
              <li>
                <span className="block text-white mb-1">Email:</span>
                <a href={`mailto:${SITE.email}`} className="hover:text-white">{SITE.email}</a>
              </li>
              <li>
                <span className="block text-white mb-1">Phone:</span>
                <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="hover:text-white">{SITE.phone}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center text-xs uppercase tracking-[0.14em] text-white/40">
          <div>© {new Date().getFullYear()} Audits and Assurance Consult Ltd. All rights reserved.</div>
          <div className="flex flex-wrap gap-6">
            <Link to="/privacy" className="hover:text-white">Privacy</Link>
            <Link to="/terms" className="hover:text-white">Terms</Link>
            <Link to="/cookies" className="hover:text-white">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
