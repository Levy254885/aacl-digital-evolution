import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { absUrl } from "@/lib/site-url";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { INSIGHTS } from "@/lib/aacl-content";

export const Route = createFileRoute("/insights/$slug")({
  loader: ({ params }) => {
    const post = INSIGHTS.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Article not found | AACL" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.post;
    return {
      meta: [
        { title: `${p.title} | AACL Insights` },
        { name: "description", content: p.excerpt },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.excerpt },
        { name: "twitter:title", content: p.title },
        { name: "twitter:description", content: p.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: absUrl(`/insights/${p.slug}`) },
        { property: "og:image", content: p.image },
        { name: "twitter:image", content: p.image },
      ],
      links: [{ rel: "canonical", href: absUrl(`/insights/${p.slug}`) }],
    };
  },
  component: InsightDetail,
  notFoundComponent: () => (
    <PageShell><div className="container-x py-40 text-center"><h1 className="font-display text-4xl">Article not found</h1><Link to="/insights" className="btn-outline-gold mt-8 inline-flex">All insights</Link></div></PageShell>
  ),
  errorComponent: () => (
    <PageShell><div className="container-x py-40 text-center"><h1 className="font-display text-4xl">Something went wrong</h1></div></PageShell>
  ),
});

function InsightDetail() {
  const { post } = Route.useLoaderData() as { post: (typeof INSIGHTS)[number] };
  const sections = post.body ?? [];
  return (
    <PageShell>
      <PageHero eyebrow={post.category} title={post.title} lead={post.excerpt} image={post.image} />
      <article className="py-24 bg-background">
        <div className="container-x max-w-3xl">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-10">
            {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} · {post.readTime}
          </div>
          {sections.length > 0 ? (
            <div className="max-w-none text-foreground leading-relaxed">
              {sections.map((s) => (
                <section key={s.h} className="mb-12">
                  <h2 className="font-display text-2xl md:text-3xl mb-5 leading-tight">{s.h}</h2>
                  <div className="space-y-5">
                    {s.p.map((para, i) => (
                      <p key={i} className="text-muted-foreground">{para}</p>
                    ))}
                  </div>
                </section>
              ))}
              <p className="text-muted-foreground">
                To discuss this subject with our practitioners, write to{" "}
                <a href="mailto:info@aacl.co.ke" className="text-[var(--gold)] underline">info@aacl.co.ke</a>.
              </p>
            </div>
          ) : (
            <div className="max-w-none text-foreground space-y-6 leading-relaxed">
              <p className="text-muted-foreground">{post.excerpt}</p>
              <p className="text-muted-foreground">
                Our consultants publish regularly on governance, technology and regulation across the world's most demanding regulated sectors. To request the working paper behind this analysis or arrange a briefing, write to{" "}
                <a href="mailto:info@aacl.co.ke" className="text-[var(--gold)] underline">info@aacl.co.ke</a>.
              </p>
            </div>
          )}
          <div className="mt-16 pt-8 border-t border-border">
            <Link to="/insights" className="text-sm uppercase tracking-[0.18em] text-[var(--gold)]">← All insights</Link>
          </div>
        </div>
      </article>
    </PageShell>
  );
}
