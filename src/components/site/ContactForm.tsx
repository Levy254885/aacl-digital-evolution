import { useState } from "react";
import { toast } from "sonner";
import { SITE } from "@/lib/aacl-content";
import { submitContactLead } from "@/lib/contact-leads";

const EMPTY = { name: "", org: "", email: "", phone: "", service: "", message: "" };

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [values, setValues] = useState(EMPTY);
  const [sending, setSending] = useState(false);

  const set =
    (k: keyof typeof EMPTY) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues((v) => ({ ...v, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    try {
      await submitContactLead({
        name: values.name,
        email: values.email,
        service: values.service || values.org || "General enquiry",
        message: values.message,
      });
      toast.success("Enquiry received", {
        description: "A senior consultant will respond within one business day.",
      });
      setValues(EMPTY);
    } catch {
      toast.error("Something went wrong", { description: `Please email us directly at ${SITE.email}` });
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid md:grid-cols-2 gap-5">
        <input className="field-line" placeholder="Name" value={values.name} onChange={set("name")} required />
        <input
          className="field-line"
          type="email"
          placeholder="Email Address"
          value={values.email}
          onChange={set("email")}
          required
        />
        <input className="field-line" placeholder="Phone" value={values.phone} onChange={set("phone")} />
        <input className="field-line" placeholder="Organisation Name" value={values.org} onChange={set("org")} />
      </div>
      <input className="field-line" placeholder="Service required" value={values.service} onChange={set("service")} required />
      <textarea
        className="field-line"
        rows={compact ? 4 : 6}
        placeholder="Message"
        value={values.message}
        onChange={set("message")}
        required
      />
      <button className="btn-gold" type="submit" disabled={sending}>
        {sending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
