import { Reveal, TextReveal } from "./Reveal";
import { CLIENT_LOGOS, type ClientLogo } from "@/lib/clients-content";
import { useCms } from "@/lib/cms";


export function PastClients() {
  const clients = useCms<ClientLogo[]>("logos", CLIENT_LOGOS);

  return (
    <section className="py-24 md:py-28" aria-labelledby="past-clients-heading">
      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <Reveal>
              <div className="eyebrow mb-4">Past clients</div>
            </Reveal>
            <TextReveal
              as="h2"
              text="Trusted across sectors and borders."
              className="font-display text-[2rem] md:text-[3rem] font-extrabold leading-[1.05]"
            />
            <span id="past-clients-heading" className="sr-only">
              Past clients of AACL Global
            </span>
          </div>
          <Reveal delay={120}>
            <p className="text-muted-foreground max-w-md leading-relaxed">
              A selection of organisations we have supported with ISO certification, compliance and
              assurance engagements worldwide, onsite and remote.
            </p>
          </Reveal>
        </div>

        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-[var(--grey-2)] border border-[var(--grey-2)] rounded-[12px] overflow-hidden">
          {clients.map((c, i) => (
            <Reveal key={c.name} delay={i * 50}>
              <li className="group relative bg-background aspect-[3/2] flex flex-col items-center justify-center p-5 transition-colors duration-300 hover:bg-[var(--grey)]">
                <img
                  src={c.logo}
                  alt={`${c.name} logo`}
                  width={c.width}
                  height={c.height}
                  sizes="(min-width: 1024px) 16vw, (min-width: 640px) 28vw, 42vw"
                  loading="lazy"
                  decoding="async"
                  className="max-h-[64%] max-w-[80%] object-contain grayscale opacity-80 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                />
                <span className="mt-3 text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground text-center leading-tight">
                  {c.name}
                </span>
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={200}>
          <p className="mt-8 text-sm text-muted-foreground text-center">
            Client logos are displayed with permission. Full case studies available on request.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
