import { useRef, useState } from "react";
import { toast } from "sonner";
import { SITE } from "@/lib/aacl-content";
import { submitContactLead } from "@/lib/contact-leads";
import { LIMITS, allowAttempt, looksAutomated, validateLead } from "@/lib/contact-security";

const EMPTY = { name: "", org: "", email: "", phone: "", service: "", message: "" };

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [values, setValues] = useState(EMPTY);
  const [honeypot, setHoneypot] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const startedAt = useRef(Date.now());

  const set =
    (k: keyof typeof EMPTY) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues((v) => ({ ...v, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    // Bots fill hidden fields and submit instantly.
    if (looksAutomated(honeypot, startedAt.current)) {
      setError("Please take a moment to complete the form, then try again.");
      return;
    }

    const checked = validateLead(values);
    if (!checked.ok) {
      setError(checked.error);
      return;
    }

    if (!allowAttempt()) {
      setError(
        `You have sent several enquiries recently. Please email us directly at ${SITE.email}.`,
      );
      return;
    }

    setSending(true);
    try {
      const v = checked.value;
      await submitContactLead({
        name: v.name,
        email: v.email,
        phone: v.phone,
        org: v.org,
        service: v.service || v.org || "General enquiry",
        message: v.message,
      });
      toast.success("Enquiry received", {
        description: "A senior consultant will respond within one business day.",
      });
      setValues(EMPTY);
      startedAt.current = Date.now();
    } catch {
      setError(`We could not send your enquiry. Please email us directly at ${SITE.email}.`);
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid md:grid-cols-2 gap-5">
        <input
          className="field-line"
          placeholder="Name"
          value={values.name}
          onChange={set("name")}
          maxLength={LIMITS.name}
          autoComplete="name"
          required
        />
        <input
          className="field-line"
          type="email"
          placeholder="Email Address"
          value={values.email}
          onChange={set("email")}
          maxLength={LIMITS.email}
          autoComplete="email"
          required
        />
        <input
          className="field-line"
          placeholder="Phone"
          value={values.phone}
          onChange={set("phone")}
          maxLength={LIMITS.phone}
          autoComplete="tel"
          inputMode="tel"
        />
        <input
          className="field-line"
          placeholder="Organisation Name"
          value={values.org}
          onChange={set("org")}
          maxLength={LIMITS.org}
          autoComplete="organization"
        />
      </div>
      <input
        className="field-line"
        placeholder="Service required"
        value={values.service}
        onChange={set("service")}
        maxLength={LIMITS.service}
        required
      />
      <textarea
        className="field-line"
        rows={compact ? 4 : 6}
        placeholder="Message"
        value={values.message}
        onChange={set("message")}
        maxLength={LIMITS.message}
        required
      />

      {/* Honeypot: hidden from people, irresistible to bots. */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor="company-website">Company website</label>
        <input
          id="company-website"
          name="company-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-[var(--red)]">
          {error}
        </p>
      )}

      <button className="btn-gold" type="submit" disabled={sending}>
        {sending ? "Sending…" : "Send message"}
      </button>

      <p className="text-[12px] leading-relaxed text-muted-foreground">
        Your details are used only to respond to this enquiry. This form is protected against
        automated abuse and never shares your information with third parties.
      </p>
    </form>
  );
}
