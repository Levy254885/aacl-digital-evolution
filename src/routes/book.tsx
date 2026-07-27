import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { SERVICES, SITE } from "@/lib/aacl-content";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book a Consultation — AACL" },
      { name: "description", content: "Book a consultation with an AACL senior consultant on your certification, risk or compliance programme." },
      { property: "og:title", content: "Book a Consultation — AACL" },
      { property: "og:description", content: "Schedule a discovery call with AACL." },
      { property: "og:url", content: "/book" },
    ],
    links: [{ rel: "canonical", href: "/book" }],
  }),
  component: BookPage,
});

const EMPTY = {
  name: "", title: "", org: "", industry: "", email: "", phone: "",
  service: "", brief: "", timing: "This week",
};

function BookPage() {
  const [values, setValues] = useState(EMPTY);
  const [sending, setSending] = useState(false);

  const set =
    (k: keyof typeof EMPTY) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setValues((v) => ({ ...v, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    try {
      const key = "aacl:consultation-requests";
      const prev = JSON.parse(localStorage.getItem(key) || "[]");
      localStorage.setItem(key, JSON.stringify([...prev, { ...values, at: new Date().toISOString() }]));
      toast.success("Consultation requested", { description: "We will confirm your 30-minute discovery call within one business day." });
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
        eyebrow="Book consultation"
        title="Schedule A Discovery Call"
        lead="Tell us about your programme. We will match you with a lead consultant and confirm a 30-minute discovery call within one business day."
      />
      <section className="py-24">
        <div className="container-x max-w-3xl">
          <Reveal>
            <form onSubmit={onSubmit} className="surface-grey rounded-[22px] p-8 md:p-10 space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <input className="field-line" placeholder="Full name" value={values.name} onChange={set("name")} required />
                <input className="field-line" placeholder="Job title" value={values.title} onChange={set("title")} />
                <input className="field-line" placeholder="Organisation" value={values.org} onChange={set("org")} required />
                <input className="field-line" placeholder="Industry" value={values.industry} onChange={set("industry")} />
                <input className="field-line" type="email" placeholder="Work email" value={values.email} onChange={set("email")} required />
                <input className="field-line" placeholder="Telephone" value={values.phone} onChange={set("phone")} />
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="text-[12px] uppercase tracking-[0.12em] text-muted-foreground">Select the service</label>
                  <select className="field-line mt-2" value={values.service} onChange={set("service")}>
                    <option value="">Select a service</option>
                    {SERVICES.map((s) => (
                      <option key={s.slug} value={s.slug}>{s.title}</option>
                    ))}
                    <option value="other">Other / not sure yet</option>
                  </select>
                </div>
                <div>
                  <label className="text-[12px] uppercase tracking-[0.12em] text-muted-foreground">Preferred timing</label>
                  <select className="field-line mt-2" value={values.timing} onChange={set("timing")}>
                    <option>This week</option>
                    <option>Next week</option>
                    <option>Within the month</option>
                    <option>Flexible</option>
                  </select>
                </div>
              </div>
              <textarea className="field-line" rows={6} placeholder="Briefly describe your programme" value={values.brief} onChange={set("brief")} />
              <button className="btn-gold" type="submit" disabled={sending}>
                {sending ? "Sending…" : "Request consultation"}
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
