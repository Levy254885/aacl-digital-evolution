import { Reveal, TextReveal } from "./Reveal";

import centrofood from "@/assets/clients/centrofood.jpg.asset.json";
import complast from "@/assets/clients/complast.png.asset.json";
import ddd from "@/assets/clients/digital-divide-data.jpg.asset.json";
import dpl from "@/assets/clients/dpl.png.asset.json";
import icps from "@/assets/clients/icps.jpg.asset.json";
import medical from "@/assets/clients/medical-access.png.asset.json";
import minimal from "@/assets/clients/minimal-frame-projects.png.asset.json";
import reeds from "@/assets/clients/reeds-africa-consult.png.asset.json";
import sintel from "@/assets/clients/sintel.jpg.asset.json";
import skanem from "@/assets/clients/skanem.jpg.asset.json";

const CLIENTS = [
  { name: "Centrofood Industries Ltd", logo: centrofood.url },
  { name: "Complast", logo: complast.url },
  { name: "Digital Divide Data", logo: ddd.url },
  { name: "DPL — The Packaging Experts", logo: dpl.url },
  { name: "ICPS — Intelligent Card Production Systems", logo: icps.url },
  { name: "Medical Access", logo: medical.url },
  { name: "Minimal Frame Projects", logo: minimal.url },
  { name: "Reeds Africa Consult", logo: reeds.url },
  { name: "Sintel", logo: sintel.url },
  { name: "Skanem", logo: skanem.url },
];

export function PastClients() {
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
              Past clients of AACL
            </span>
          </div>
          <Reveal delay={120}>
            <p className="text-muted-foreground max-w-md leading-relaxed">
              A selection of organisations we have supported with ISO certification, compliance and
              assurance engagements across East Africa and beyond.
            </p>
          </Reveal>
        </div>

        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-[var(--grey-2)] border border-[var(--grey-2)] rounded-[12px] overflow-hidden">
          {CLIENTS.map((c, i) => (
            <Reveal key={c.name} delay={i * 50}>
              <li className="group relative bg-background aspect-[3/2] flex flex-col items-center justify-center p-5 transition-colors duration-300 hover:bg-[var(--grey)]">
                <img
                  src={c.logo}
                  alt={`${c.name} logo`}
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
