import { CURRENCIES, useCurrency } from "@/lib/currency";

/** Header currency dropdown; defaults to the visitor's detected region. */
export function CurrencySelector({ variant = "light" }: { variant?: "light" | "dark" }) {
  const { currency, setCode } = useCurrency();

  return (
    <label className="inline-flex items-center gap-2">
      <span className="sr-only">Display currency</span>
      <select
        value={currency.code}
        onChange={(e) => setCode(e.target.value)}
        className={`cursor-pointer rounded-full border bg-transparent px-3 py-2 text-[12px] font-semibold uppercase tracking-[0.08em] transition-colors focus:outline-none ${
          variant === "dark"
            ? "border-white/30 text-white [&>option]:text-[var(--navy)]"
            : "border-[var(--navy)]/20 text-[var(--navy)]"
        }`}
      >
        {CURRENCIES.map((c) => (
          <option key={c.code} value={c.code}>
            {c.code}
          </option>
        ))}
      </select>
    </label>
  );
}
