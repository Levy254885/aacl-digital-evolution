import { Reveal } from "./Reveal";
import { useCurrency } from "@/lib/currency";
import { PAYMENT_METHODS, type PricingRow } from "@/lib/pricing-content";

/**
 * Indicative pricing table. Prices publish as "from …" starting points in the
 * visitor's selected currency, with USD kept as the reference figure.
 */
export function PricingTable({
  rows,
  columnLabel = "Organization size",
  notes = [],
}: {
  rows: PricingRow[];
  columnLabel?: string;
  notes?: string[];
}) {
  const { format, currency } = useCurrency();

  return (
    <div>
      <div className="overflow-hidden rounded-[18px] border border-border">
        <table className="w-full text-left border-collapse">
          <caption className="sr-only">Indicative pricing</caption>
          <thead className="bg-[var(--navy)] text-white">
            <tr>
              <th scope="col" className="p-5 text-[12px] uppercase tracking-[0.12em] font-semibold">
                {columnLabel}
              </th>
              <th scope="col" className="p-5 text-[12px] uppercase tracking-[0.12em] font-semibold">
                From
              </th>
              <th
                scope="col"
                className="p-5 text-[12px] uppercase tracking-[0.12em] font-semibold hidden md:table-cell"
              >
                What's included
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.tier} className="border-t border-border align-top">
                <th scope="row" className="p-5 font-display text-base md:text-lg font-extrabold">
                  {r.tier}
                </th>
                <td className="p-5">
                  <span className="block font-display text-lg md:text-xl font-extrabold text-[var(--red)]">
                    {r.from > 0 ? `from ${format(r.from)}` : "Custom quote"}
                  </span>
                  <span className="block text-[12px] text-muted-foreground mt-1">
                    {currency.code === "USD" ? r.price : `${r.price} USD reference`}
                  </span>
                  <span className="block text-sm text-muted-foreground mt-3 md:hidden">{r.notes}</span>
                </td>
                <td className="p-5 text-sm leading-[1.9] text-muted-foreground hidden md:table-cell">
                  {r.notes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {notes.length > 0 && (
        <ul className="mt-6 space-y-3">
          {notes.map((n) => (
            <li key={n} className="flex gap-3 text-sm leading-[1.9] text-muted-foreground">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--red)]" aria-hidden="true" />
              {n}
            </li>
          ))}
        </ul>
      )}

      <p className="mt-6 text-[13px] text-muted-foreground">
        Published as starting prices, not final quotes. Prices shown in {currency.code}; USD is our
        reference currency and payment settles in the currency your chosen method supports.
      </p>
    </div>
  );
}

/** Payment rails supported at checkout. */
export function PaymentMethods() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {PAYMENT_METHODS.map((m, i) => (
        <Reveal key={m.method} delay={i * 80}>
          <div className="flex h-full flex-col rounded-[18px] border border-border bg-white p-7">
            <div className="flex h-16 items-center">
              <img
                src={m.logo}
                alt={m.logoAlt}
                width={220}
                height={64}
                loading="lazy"
                decoding="async"
                className="h-12 w-auto max-w-[190px] object-contain object-left"
              />
            </div>
            <p className="mt-5 text-sm leading-[1.9] text-muted-foreground">
              Best for: {m.best}
            </p>
            <p className="mt-3 text-[12px] uppercase tracking-[0.1em] text-muted-foreground">
              {m.rail}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
