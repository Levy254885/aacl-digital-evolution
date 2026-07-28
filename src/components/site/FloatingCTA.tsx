import { Phone, MessageCircle } from "lucide-react";
import { SITE } from "@/lib/aacl-content";

const WHATSAPP_NUMBER = SITE.phone.replace(/\D/g, "");
const WHATSAPP_MSG = encodeURIComponent(
  "Hello AACL, I'd like to enquire about your assurance and compliance services.",
);

export function FloatingCTA() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 print:hidden">
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with AACL on WhatsApp"
        className="group flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.6)] transition-transform duration-300 hover:-translate-y-1 hover:scale-105"
      >
        <MessageCircle size={24} strokeWidth={2} aria-hidden="true" />
        <span className="sr-only">WhatsApp</span>
      </a>
      <a
        href={`tel:${SITE.phone.replace(/\s/g, "")}`}
        aria-label={`Call AACL on ${SITE.phone}`}
        className="group flex h-14 w-14 items-center justify-center rounded-full bg-[var(--navy)] text-white shadow-[0_10px_30px_-8px_rgba(20,33,53,0.6)] transition-transform duration-300 hover:-translate-y-1 hover:scale-105"
      >
        <Phone size={22} strokeWidth={2} aria-hidden="true" />
        <span className="sr-only">Call now</span>
      </a>
    </div>
  );
}
