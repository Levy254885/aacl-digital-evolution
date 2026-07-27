import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/site/PageShell";

function LegalPage({ title, sections }: { title: string; sections: { h: string; p: string[] }[] }) {
  return (
    <PageShell>
      <PageHero eyebrow="Legal" title={title} />
      <section className="py-20 bg-background">
        <div className="container-x max-w-3xl space-y-12">
          {sections.map((s) => (
            <div key={s.h}>
              <h2 className="font-display text-2xl mb-4">{s.h}</h2>
              {s.p.map((para, i) => <p key={i} className="text-muted-foreground leading-relaxed mb-4">{para}</p>)}
            </div>
          ))}
          <p className="text-xs text-muted-foreground pt-8 border-t border-border">Last updated: January 2026. For questions about this notice, contact info@aacl.co.ke.</p>
        </div>
      </section>
    </PageShell>
  );
}

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — AACL" },
      { name: "description", content: "How Audits and Assurance Consult Ltd collects, uses and protects personal information." },
      { property: "og:title", content: "Privacy Policy — AACL" },
      { property: "og:description", content: "AACL privacy policy." },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: () => (
    <LegalPage
      title="Privacy Policy"
      sections={[
        { h: "Introduction", p: ["Audits and Assurance Consult Ltd (AACL) is committed to protecting the personal information of our clients, prospects, employees and website visitors in accordance with the Kenya Data Protection Act, 2019 and internationally recognised data protection principles."] },
        { h: "Information we collect", p: ["We collect personal information you provide directly (via forms, email, telephone or engagement documents) and limited technical information collected automatically when you visit our website (such as browser type, device identifiers and general location)."] },
        { h: "How we use information", p: ["Information is used to respond to enquiries, deliver contracted services, maintain business records, communicate about relevant insights and comply with legal and regulatory obligations. We do not sell personal information to third parties."] },
        { h: "Data sharing", p: ["We share information only with contracted processors bound by confidentiality obligations, with regulators where required by law, and with your explicit consent."] },
        { h: "Retention", p: ["Personal information is retained only as long as necessary for the purposes for which it was collected, or as required by applicable law."] },
        { h: "Your rights", p: ["You have rights of access, rectification, erasure, objection and portability in respect of your personal information. Contact us to exercise these rights."] },
      ]}
    />
  ),
});
