import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { ScrollTop } from "./ScrollTop";
import { Reveal, TextReveal } from "./Reveal";

export function PageShell({
  children,
  transparentHeader = false,
}: {
  children: ReactNode;
  transparentHeader?: boolean;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SiteHeader transparent={transparentHeader} />
      <main className={`flex-1 ${transparentHeader ? "" : "pt-[72px] lg:pt-[92px]"}`}>{children}</main>
      <SiteFooter />
      <ScrollTop />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  lead,
  image,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  image?: string;
}) {
  return (
    <section className="surface-grey">
      <div className="container-x py-16 md:py-24 grid lg:grid-cols-12 gap-12 items-center">
        <div className={image ? "lg:col-span-7" : "lg:col-span-9"}>
          <Reveal>
            <div className="eyebrow mb-6">{eyebrow}</div>
          </Reveal>
          <TextReveal
            as="h1"
            text={title}
            className="font-display text-[2.4rem] md:text-5xl font-extrabold leading-[1.08]"
          />
          {lead && (
            <Reveal delay={220}>
              <p className="mt-6 text-base md:text-lg leading-relaxed text-muted-foreground max-w-2xl">
                {lead}
              </p>
            </Reveal>
          )}
        </div>
        {image && (
          <Reveal delay={160} className="lg:col-span-5">
            <img
              src={image}
              alt=""
              className="w-full h-[300px] md:h-[380px] object-cover rounded-[22px]"
              loading="lazy"
            />
          </Reveal>
        )}
      </div>
    </section>
  );
}
