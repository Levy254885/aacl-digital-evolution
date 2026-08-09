import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/lib/site-url";
import { ContactForm } from "@/components/site/ContactForm";
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
      { property: "og:url", content: absUrl("/contact") },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: absUrl("/contact") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
            { "@type": "ListItem", position: 2, name: "Contact", item: absUrl("/contact") },
          ],
        }),
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
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
            <div className="surface-grey rounded-[22px] p-8 md:p-10">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
