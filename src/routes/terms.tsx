import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/site/PageShell";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — AACL" },
      { name: "description", content: "Terms and conditions governing use of the AACL website and services." },
      { property: "og:title", content: "Terms & Conditions — AACL" },
      { property: "og:description", content: "AACL website terms." },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: () => (
    <PageShell>
      <PageHero eyebrow="Legal" title="Terms & Conditions" />
      <section className="py-20 bg-background">
        <div className="container-x max-w-3xl space-y-8 text-muted-foreground leading-relaxed">
          <p>These terms govern your use of the AACL website. By accessing our website you agree to be bound by these terms.</p>
          <h2 className="font-display text-2xl text-foreground">Use of content</h2>
          <p>Content on this website is provided for general information purposes and does not constitute professional advice. Formal advice is provided only under a signed engagement letter with AACL.</p>
          <h2 className="font-display text-2xl text-foreground">Intellectual property</h2>
          <p>All content, trademarks and materials on this website are the property of AACL or its licensors. You may not reproduce, distribute or create derivative works without prior written consent.</p>
          <h2 className="font-display text-2xl text-foreground">Limitation of liability</h2>
          <p>To the maximum extent permitted by law, AACL is not liable for any indirect or consequential loss arising from your use of this website.</p>
          <h2 className="font-display text-2xl text-foreground">Governing law</h2>
          <p>These terms are governed by the laws of the Republic of Kenya.</p>
        </div>
      </section>
    </PageShell>
  ),
});
