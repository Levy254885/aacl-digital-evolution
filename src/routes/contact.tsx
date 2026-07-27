import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { SITE } from "@/lib/aacl-content";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact AACL — Nairobi, Kenya" },
      { name: "description", content: `Contact AACL at ${SITE.address.line1}, ${SITE.address.line2}, Nairobi. Phone ${SITE.phone}. Email ${SITE.email}.` },
      { property: "og:title", content: "Contact AACL" },
      { property: "og:description", content: "Speak with AACL about your assurance, certification or compliance programme." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const EMPTY = { name: "", org: "", email: "", phone: "", subject: "", message: "" };

function ContactPage() {
  const [values, setValues] = useState(EMPTY);
  const [sending, setSending] = useState(false);

  const set = (k: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    // Submissions are stored locally until the Firebase backend is connected.
    try {
      const key = "aacl:contact-enquiries";
      const prev = JSON.parse(localStorage.getItem(key) || "[]");
      localStorage.setItem(key, JSON.stringify([...prev, { ...values, at: new Date().toISOString() }]));
      toast.success("Enquiry received", { description: "A senior consultant will respond within one business day." });
      setValues(EMPTY);
    } catch {
      toast.error("Something went wrong", { description: "Please email us directly at " + SITE.email });
    } finally {
      setSending(false);
    }
  }

  return (
    <PageShell>
      <PageHero
        eyebrow="Contact us"
        title="Our Team Will Respond"
        lead="For consultation, tender or partnership enquiries, our practice team responds within one business day."
      />
      <section className="py-24">
        <div className="container-x grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-5 space-y-10">
            {[
              { l: "Office", v: `${SITE.address.line1}, ${SITE.address.line2}, ${SITE.address.city}, ${SITE.address.country}` },
              { l: "Telephone", v: SITE.phone, href: `tel:${SITE.phone.replace(/\s/g, "")}` },
              { l: "Email", v: SITE.email, href: `mailto:${SITE.email}` },
              { l: "Office hours", v: "Monday – Friday · 08:30 – 17:30 EAT" },
            ].map((row, i) => (
              <Reveal key={row.l} delay={i * 90}>
                <div className="border-b border-border pb-6">
                  <div className="eyebrow mb-3">{row.l}</div>
                  {row.href ? (
                    <a href={row.href} className="text-lg font-display font-extrabold hover:underline">{row.v}</a>
                  ) : (
                    <div className="leading-relaxed text-muted-foreground">{row.v}</div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={150} className="lg:col-span-7">
            <form onSubmit={onSubmit} className="surface-grey rounded-[22px] p-8 md:p-10 space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <input className="field-line" placeholder="Name" value={values.name} onChange={set("name")} required />
                <input className="field-line" type="email" placeholder="Email Address" value={values.email} onChange={set("email")} required />
                <input className="field-line" placeholder="Phone" value={values.phone} onChange={set("phone")} />
                <input className="field-line" placeholder="Organisation Name" value={values.org} onChange={set("org")} />
              </div>
              <input className="field-line" placeholder="Subject" value={values.subject} onChange={set("subject")} required />
              <textarea className="field-line" rows={6} placeholder="Message" value={values.message} onChange={set("message")} required />
              <button className="btn-gold" type="submit" disabled={sending}>
                {sending ? "Sending…" : "Send message"}
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
