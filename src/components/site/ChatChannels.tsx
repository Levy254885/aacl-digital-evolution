import { SITE } from "@/lib/aacl-content";

const DIGITS = SITE.phone.replace(/\D/g, "");
const MSG = encodeURIComponent(
  "Hello AACL, I'd like to enquire about your assurance and compliance services.",
);

/** TODO: replace with the live Threema Work business ID once the licence is active. */
export const THREEMA_ID = "AACLGLB";

export const CHAT_CHANNELS = [
  {
    name: "WhatsApp",
    href: `https://wa.me/${DIGITS}?text=${MSG}`,
    note: "Fastest reply. Our primary channel",
    primary: true,
  },
  {
    name: "Signal",
    href: `https://signal.me/#p/${SITE.phone.replace(/\s/g, "")}`,
    note: "End-to-end encrypted, open source",
    primary: false,
  },
  {
    name: "Threema",
    href: `https://threema.id/${THREEMA_ID}`,
    note: "Swiss-hosted, no phone number required",
    primary: false,
  },
] as const;

function ChannelIcon({ name }: { name: string }) {
  if (name === "WhatsApp") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.94.53 3.75 1.46 5.3L2 22l4.98-1.6a9.9 9.9 0 0 0 5.06 1.38h.01c5.43 0 9.83-4.4 9.83-9.84C21.88 6.4 17.48 2 12.04 2Zm5.75 14.03c-.24.68-1.4 1.3-1.93 1.35-.53.06-1.03.26-3.55-.85-2.9-1.28-4.7-4.3-4.84-4.5-.14-.2-1.13-1.6-1.13-3.06 0-1.45.75-2.16 1.02-2.46.27-.3.58-.37.78-.37h.55c.18 0 .42-.02.64.51.24.6.83 2.06.9 2.2.07.15.12.32.02.51-.1.2-.16.32-.3.5l-.45.53c-.15.15-.3.32-.13.62.17.3.75 1.28 1.6 2.07 1.1 1.01 1.86 1.31 2.13 1.46.27.15.43.13.6-.06.16-.18.7-.8.9-1.08.2-.28.38-.22.64-.12.26.1 1.66.8 1.94.94.28.15.47.22.54.34.07.13.07.75-.17 1.43Z" />
      </svg>
    );
  }
  if (name === "Signal") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-8.7 14.94L2 22l5.14-1.28A10 10 0 1 0 12 2Zm0 2a8 8 0 1 1-4.2 14.8l-.4-.24-3 .75.72-2.92-.25-.4A8 8 0 0 1 12 4Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 3c-5 0-9 3.2-9 7.2 0 2.3 1.3 4.3 3.4 5.6L6 21l4.2-2.1c.6.1 1.2.15 1.8.15 5 0 9-3.2 9-7.2S17 3 12 3Z" />
      <circle cx="8.5" cy="10.5" r="1.2" fill="#fff" />
      <circle cx="12" cy="10.5" r="1.2" fill="#fff" />
      <circle cx="15.5" cy="10.5" r="1.2" fill="#fff" />
    </svg>
  );
}

/** Row of encrypted-chat channels. `variant` controls the surface it sits on. */
export function ChatChannels({
  variant = "light",
  showNotes = false,
}: {
  variant?: "light" | "dark";
  showNotes?: boolean;
}) {
  return (
    <div>
      <ul className="flex flex-wrap items-center gap-3">
        {CHAT_CHANNELS.map((c) => (
          <li key={c.name}>
            <a
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Chat with AACL on ${c.name}`}
              className={`inline-flex items-center gap-2.5 rounded-full transition-all duration-300 hover:-translate-y-0.5 ${
                c.primary
                  ? "bg-[#25D366] text-white px-5 py-3 text-[13px] font-semibold uppercase tracking-[0.08em]"
                  : variant === "dark"
                    ? "border border-white/30 text-white px-5 py-3 text-[13px] font-semibold uppercase tracking-[0.08em] hover:bg-white/10"
                    : "border border-[var(--navy)]/20 text-[var(--navy)] px-5 py-3 text-[13px] font-semibold uppercase tracking-[0.08em] hover:bg-[var(--grey)]"
              }`}
            >
              <ChannelIcon name={c.name} />
              {c.name}
            </a>
          </li>
        ))}
      </ul>
      {showNotes ? (
        <ul
          className={`mt-5 space-y-2 text-sm leading-relaxed ${
            variant === "dark" ? "text-white/70" : "text-muted-foreground"
          }`}
        >
          {CHAT_CHANNELS.map((c) => (
            <li key={c.name}>
              <strong className="font-semibold">{c.name}</strong>, {c.note}
            </li>
          ))}
        </ul>
      ) : (
        <p
          className={`mt-3 text-[12px] uppercase tracking-[0.1em] ${
            variant === "dark" ? "text-white/60" : "text-muted-foreground"
          }`}
        >
          Choose the channel you trust
        </p>
      )}
    </div>
  );
}
