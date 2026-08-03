import { Phone } from "lucide-react";
import { SITE } from "@/lib/aacl-content";
import { CHAT_CHANNELS } from "./ChatChannels";

const STYLES: Record<string, string> = {
  WhatsApp: "h-14 w-14 bg-[#25D366] shadow-[0_10px_30px_-8px_rgba(37,211,102,0.6)]",
  Signal: "h-12 w-12 bg-[#3A76F0] shadow-[0_10px_30px_-8px_rgba(58,118,240,0.55)]",
  Threema: "h-12 w-12 bg-[#2A2A2A] shadow-[0_10px_30px_-8px_rgba(0,0,0,0.5)]",
};

function Icon({ name }: { name: string }) {
  if (name === "WhatsApp") {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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

export function FloatingCTA() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 print:hidden">
      {CHAT_CHANNELS.map((c) => (
        <a
          key={c.name}
          href={c.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Chat with AACL on ${c.name}`}
          title={`${c.name} — ${c.note}`}
          className={`flex items-center justify-center rounded-full text-white transition-transform duration-300 hover:-translate-y-1 hover:scale-105 ${STYLES[c.name]}`}
        >
          <Icon name={c.name} />
          <span className="sr-only">{c.name}</span>
        </a>
      ))}
      <a
        href={`tel:${SITE.phone.replace(/\s/g, "")}`}
        aria-label={`Call AACL on ${SITE.phone}`}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--navy)] text-white shadow-[0_10px_30px_-8px_rgba(20,33,53,0.6)] transition-transform duration-300 hover:-translate-y-1 hover:scale-105"
      >
        <Phone size={20} strokeWidth={2} aria-hidden="true" />
        <span className="sr-only">Call now</span>
      </a>
    </div>
  );
}
