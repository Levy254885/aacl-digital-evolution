import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Download,
  FileText,
  ImageUp,
  Loader2,
  Lock,
  Sparkles,
} from "lucide-react";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { ServiceOptions } from "@/components/site/ServiceOptions";
import {
  DOC_TEMPLATES,
  buildDocumentHtml,
  downloadDocx,
  printPdf,
  type CompanyDetails,
  type DocTemplate,
} from "@/lib/doc-generator";
import { saveDocumentRequest, uploadCompanyLogo } from "@/lib/document-requests";

const TITLE = "AI ISO Document Generator — Branded Templates | AACL";
const DESCRIPTION =
  "Generate branded, audit-ready ISO manuals, policies and procedures in minutes. Choose a document, add your logo and company details, preview, pay securely and download as PDF or DOCX.";

export const Route = createFileRoute("/templates")({
  head: () => {
    const jsonld = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          name: "AI ISO Document Generator",
          serviceType: "ISO documentation generation",
          description: DESCRIPTION,
          provider: { "@type": "Organization", name: "Audits and Assurance Consult Ltd", url: "/" },
          areaServed: "Worldwide",
          url: "/templates",
          offers: DOC_TEMPLATES.map((t) => ({
            "@type": "Offer",
            name: t.name,
            price: t.price,
            priceCurrency: "USD",
            description: t.summary,
          })),
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "/" },
            { "@type": "ListItem", position: 2, name: "Templates", item: "/templates" },
          ],
        },
      ],
    };
    return {
      meta: [
        { title: TITLE },
        { name: "description", content: DESCRIPTION },
        { property: "og:title", content: TITLE },
        { property: "og:description", content: DESCRIPTION },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "/templates" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: "/templates" }],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonld) }],
    };
  },
  component: TemplatesPage,
});

const STEPS = ["Document", "Branding", "Details", "Preview", "Payment", "Download"] as const;

const EMPTY_DETAILS: CompanyDetails = {
  companyName: "",
  contactName: "",
  email: "",
  country: "",
  scope: "",
  requirements: "",
};

const PAYMENT_METHODS = [
  { id: "mpesa", label: "M-Pesa", hint: "Paybill prompt to your phone" },
  { id: "card", label: "Card (Stripe)", hint: "Visa, Mastercard, Amex" },
  { id: "invoice", label: "Request invoice", hint: "Bank transfer, 7-day terms" },
];

function TemplatesPage() {
  const [step, setStep] = useState(0);
  const [template, setTemplate] = useState<DocTemplate | null>(null);
  const [details, setDetails] = useState<CompanyDetails>(EMPTY_DETAILS);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoDataUrl, setLogoDataUrl] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [phone, setPhone] = useState("");
  const [busy, setBusy] = useState(false);
  const [reference, setReference] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);

  const html = useMemo(
    () => (template ? buildDocumentHtml(template, details, logoDataUrl) : ""),
    [template, details, logoDataUrl],
  );

  const set =
    (k: keyof CompanyDetails) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setDetails((d) => ({ ...d, [k]: e.target.value }));

  function onLogo(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file (PNG, JPG or SVG).");
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      toast.error("Logo must be under 3 MB.");
      return;
    }
    setLogoFile(file);
    const reader = new FileReader();
    reader.onload = () => setLogoDataUrl(String(reader.result));
    reader.readAsDataURL(file);
  }

  const detailsValid =
    details.companyName.trim().length > 1 &&
    details.contactName.trim().length > 1 &&
    /\S+@\S+\.\S+/.test(details.email) &&
    details.scope.trim().length > 3;

  const canAdvance =
    step === 0 ? Boolean(template) : step === 1 ? true : step === 2 ? detailsValid : step === 3 ? true : false;

  async function pay() {
    if (!template) return;
    if (paymentMethod === "mpesa" && !/^[0-9+\s-]{9,15}$/.test(phone)) {
      toast.error("Enter the mobile number to receive the M-Pesa prompt.");
      return;
    }
    setBusy(true);
    try {
      let logoUrl: string | null = null;
      if (logoFile) {
        try {
          logoUrl = await uploadCompanyLogo(logoFile, details.companyName);
        } catch {
          logoUrl = null;
        }
      }
      const ref = `AACL-${Date.now().toString(36).toUpperCase()}`;
      await saveDocumentRequest({
        templateSlug: template.slug,
        templateName: template.name,
        standard: template.standard,
        ...details,
        amount: template.price,
        currency: "USD",
        paymentMethod,
        paymentReference: ref,
        logoUrl,
      });
      setReference(ref);
      setStep(5);
      toast.success("Payment confirmed", { description: "Your branded document is ready to download." });
    } catch {
      toast.error("We could not complete that", {
        description: "Please try again or contact us and we will issue the document manually.",
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <PageShell>
      <PageHero
        eyebrow="Templates — AI Document Generator"
        title="Branded, audit-ready ISO documents in minutes."
        lead="Select a document, upload your logo, describe your organisation, and generate a fully branded ISO manual, policy or procedure. Preview it before you pay, then download as PDF or DOCX."
      />

      {/* Stepper */}
      <section className="py-10 bg-background border-b border-border">
        <div className="container-x">
          <ol className="flex flex-wrap gap-x-8 gap-y-3">
            {STEPS.map((s, i) => (
              <li key={s} className="flex items-center gap-2 text-sm">
                <span
                  className={`w-7 h-7 rounded-full grid place-items-center text-xs font-medium shrink-0 ${
                    i < step
                      ? "bg-[var(--gold)] text-[var(--navy-deep)]"
                      : i === step
                        ? "bg-[var(--navy-deep)] text-[var(--bone)]"
                        : "bg-[var(--bone)] text-muted-foreground"
                  }`}
                >
                  {i < step ? <Check size={13} /> : i + 1}
                </span>
                <span className={i === step ? "text-foreground" : "text-muted-foreground"}>{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="container-x">
          {/* Step 0 — choose document */}
          {step === 0 && (
            <div>
              <h2 className="font-display text-3xl mb-8">Choose a document type</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {DOC_TEMPLATES.map((t) => {
                  const active = template?.slug === t.slug;
                  return (
                    <button
                      key={t.slug}
                      type="button"
                      onClick={() => setTemplate(t)}
                      aria-pressed={active}
                      className={`text-left h-full rounded-[18px] p-7 border transition-colors ${
                        active ? "border-[var(--gold)] bg-[var(--bone)]" : "border-border hover:border-[var(--gold)]/60"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <FileText size={20} className="text-[var(--gold)] shrink-0" aria-hidden="true" />
                        <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground text-right">
                          {t.standard}
                        </span>
                      </div>
                      <h3 className="font-display text-xl mt-5">{t.name}</h3>
                      <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{t.summary}</p>
                      <p className="mt-5 font-display text-lg">
                        <span className="text-sm text-muted-foreground mr-1">From</span>${t.price}
                        <span className="text-sm text-muted-foreground font-sans ml-1">USD</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{t.format}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 1 — branding */}
          {step === 1 && (
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl mb-4">Upload your company logo</h2>
              <p className="text-muted-foreground mb-8">
                Your logo is placed on the document cover and stored securely in AACL's cloud storage. PNG, JPG or SVG,
                up to 3 MB. You can skip this and add branding later.
              </p>
              <div className="border border-dashed border-border rounded-[18px] p-10 text-center bg-[var(--bone)]">
                {logoDataUrl ? (
                  <img src={logoDataUrl} alt="Your uploaded company logo" className="mx-auto max-h-24 object-contain" />
                ) : (
                  <ImageUp size={34} className="mx-auto text-[var(--gold)]" aria-hidden="true" />
                )}
                <input
                  ref={fileInput}
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={onLogo}
                  aria-label="Company logo file"
                />
                <div className="mt-6 flex justify-center gap-3 flex-wrap">
                  <button type="button" className="btn-gold" onClick={() => fileInput.current?.click()}>
                    {logoDataUrl ? "Replace logo" : "Choose file"}
                  </button>
                  {logoDataUrl && (
                    <button
                      type="button"
                      className="btn-outline-navy"
                      onClick={() => {
                        setLogoFile(null);
                        setLogoDataUrl(null);
                      }}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2 — details */}
          {step === 2 && (
            <div className="max-w-3xl">
              <h2 className="font-display text-3xl mb-8">Company details and requirements</h2>
              <div className="grid md:grid-cols-2 gap-5">
                <input className="field-line" placeholder="Company name" value={details.companyName} onChange={set("companyName")} required />
                <input className="field-line" placeholder="Document owner / contact name" value={details.contactName} onChange={set("contactName")} required />
                <input className="field-line" type="email" placeholder="Email address" value={details.email} onChange={set("email")} required />
                <input className="field-line" placeholder="Country of operation" value={details.country} onChange={set("country")} />
              </div>
              <input
                className="field-line mt-5"
                placeholder="Scope of the management system (e.g. manufacture and supply of packaging)"
                value={details.scope}
                onChange={set("scope")}
                required
              />
              <textarea
                className="field-line mt-5"
                rows={6}
                placeholder="Describe your requirements — sites, headcount, existing certifications, regulators, anything the document must reflect."
                value={details.requirements}
                onChange={set("requirements")}
              />
              {!detailsValid && (
                <p className="text-sm text-muted-foreground mt-4">
                  Company name, contact name, a valid email and the system scope are required.
                </p>
              )}
            </div>
          )}

          {/* Step 3 — preview */}
          {step === 3 && template && (
            <div>
              <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
                <div>
                  <h2 className="font-display text-3xl">Preview your document</h2>
                  <p className="text-muted-foreground mt-2">
                    {template.name} · {template.standard} · {template.sections.length} sections
                  </p>
                </div>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Lock size={14} /> Watermark-free download unlocks after payment.
                </p>
              </div>
              <div className="rounded-[18px] border border-border overflow-hidden bg-[var(--bone)]">
                <iframe
                  title="Document preview"
                  srcDoc={html}
                  className="w-full h-[620px] bg-white"
                  sandbox=""
                />
              </div>
            </div>
          )}

          {/* Step 4 — payment */}
          {step === 4 && template && (
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl mb-2">Payment</h2>
              <p className="text-muted-foreground mb-8">
                {template.name} — <span className="text-foreground">${template.price} USD</span>. One-time payment,
                includes the editable DOCX and print-ready PDF.
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                {PAYMENT_METHODS.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id)}
                    aria-pressed={paymentMethod === m.id}
                    className={`text-left rounded-[14px] border p-5 transition-colors ${
                      paymentMethod === m.id ? "border-[var(--gold)] bg-[var(--bone)]" : "border-border hover:border-[var(--gold)]/60"
                    }`}
                  >
                    <div className="font-display">{m.label}</div>
                    <div className="text-xs text-muted-foreground mt-1">{m.hint}</div>
                  </button>
                ))}
              </div>
              {paymentMethod === "mpesa" && (
                <input
                  className="field-line mt-6"
                  placeholder="Mobile number for the M-Pesa prompt (e.g. +254 7XX XXX XXX)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  inputMode="tel"
                />
              )}
              <button type="button" className="btn-gold mt-8" onClick={pay} disabled={busy}>
                {busy ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                {busy ? "Processing…" : `Pay $${template.price} and generate`}
              </button>
              <p className="text-xs text-muted-foreground mt-4">
                Payments are processed by AACL's payment partners. Your details and logo are stored securely and used
                only to produce your document.
              </p>
            </div>
          )}

          {/* Step 5 — download */}
          {step === 5 && template && (
            <div className="max-w-2xl">
              <div className="w-12 h-12 rounded-full bg-[var(--gold)] text-[var(--navy-deep)] grid place-items-center">
                <Check size={22} />
              </div>
              <h2 className="font-display text-3xl mt-6">Your document is ready</h2>
              <p className="text-muted-foreground mt-3">
                {template.name} for {details.companyName}. Reference{" "}
                <span className="text-foreground">{reference}</span>. A copy of this request has been logged with our
                consulting team, who can review the document with you at no extra cost.
              </p>
              <div className="mt-8 flex gap-4 flex-wrap">
                <button
                  type="button"
                  className="btn-gold"
                  onClick={() => {
                    if (!printPdf(html)) toast.error("Allow pop-ups to export the PDF.");
                  }}
                >
                  <Download size={16} /> Download PDF
                </button>
                <button type="button" className="btn-outline-navy" onClick={() => downloadDocx(template, details, html)}>
                  <Download size={16} /> Download DOCX
                </button>
              </div>
              <div className="mt-10 flex gap-4 flex-wrap">
                <button
                  type="button"
                  className="text-sm underline text-muted-foreground"
                  onClick={() => {
                    setStep(0);
                    setTemplate(null);
                    setDetails(EMPTY_DETAILS);
                    setLogoFile(null);
                    setLogoDataUrl(null);
                    setReference("");
                  }}
                >
                  Generate another document
                </button>
                <Link to="/ecompliance" className="text-sm underline text-muted-foreground">
                  Explore eCompliance
                </Link>
              </div>
            </div>
          )}

          {/* Nav */}
          {step < 5 && (
            <div className="mt-12 flex items-center justify-between gap-4 border-t border-border pt-8">
              <button
                type="button"
                className="btn-outline-navy"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
              >
                <ArrowLeft size={16} /> Back
              </button>
              {step < 4 && (
                <button
                  type="button"
                  className="btn-gold"
                  onClick={() => setStep((s) => s + 1)}
                  disabled={!canAdvance}
                >
                  {step === 3 ? "Continue to payment" : "Continue"} <ArrowRight size={16} />
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      <ServiceOptions compact />

      <section className="py-24 bg-[var(--navy-deep)] text-[var(--bone)]">
        <div className="container-x text-center max-w-3xl mx-auto">
          <Reveal>
            <div className="eyebrow eyebrow-light mb-6 flex justify-center">Need it reviewed?</div>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">
              Have a senior AACL consultant validate your documentation.
            </h2>
            <div className="mt-10 flex justify-center gap-4 flex-wrap">
              <Link to="/book" className="btn-gold">
                Book a consultation <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn-outline-navy">
                Talk to us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
