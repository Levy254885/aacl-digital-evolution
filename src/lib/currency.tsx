import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Currency = {
  code: string;
  symbol: string;
  /** Indicative units per 1 USD — reference only, settlement happens in the payment rail's currency. */
  rate: number;
  label: string;
};

export const CURRENCIES: Currency[] = [
  { code: "USD", symbol: "$", rate: 1, label: "US Dollar" },
  { code: "KES", symbol: "KSh", rate: 129, label: "Kenyan Shilling" },
  { code: "GHS", symbol: "GH₵", rate: 15.5, label: "Ghanaian Cedi" },
  { code: "UGX", symbol: "USh", rate: 3800, label: "Ugandan Shilling" },
  { code: "GBP", symbol: "£", rate: 0.79, label: "Pound Sterling" },
  { code: "EUR", symbol: "€", rate: 0.92, label: "Euro" },
];

const STORAGE_KEY = "aacl.currency";

/** Maps an IANA timezone region to a local currency, used for auto-detection. */
function detectCode(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
    if (tz.includes("Nairobi")) return "KES";
    if (tz.includes("Accra")) return "GHS";
    if (tz.includes("Kampala")) return "UGX";
    if (tz.includes("London")) return "GBP";
    if (tz.startsWith("Europe/")) return "EUR";
  } catch {
    /* fall through to USD */
  }
  return "USD";
}

type Ctx = {
  currency: Currency;
  setCode: (code: string) => void;
  /** Formats a USD amount into the active currency as a rounded "from" price. */
  format: (usd: number) => string;
};

const CurrencyContext = createContext<Ctx | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [code, setCode] = useState("USD");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
    setCode(saved && CURRENCIES.some((c) => c.code === saved) ? saved : detectCode());
  }, []);

  const value = useMemo<Ctx>(() => {
    const currency = CURRENCIES.find((c) => c.code === code) ?? CURRENCIES[0]!;
    return {
      currency,
      setCode: (next) => {
        setCode(next);
        try {
          window.localStorage.setItem(STORAGE_KEY, next);
        } catch {
          /* storage unavailable */
        }
      },
      format: (usd: number) => {
        const raw = usd * currency.rate;
        const step = raw >= 100000 ? 10000 : raw >= 1000 ? 100 : raw >= 100 ? 10 : 1;
        const rounded = Math.round(raw / step) * step;
        return `${currency.symbol}${rounded.toLocaleString("en-US")}`;
      },
    };
  }, [code]);

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency(): Ctx {
  const ctx = useContext(CurrencyContext);
  if (ctx) return ctx;
  const currency = CURRENCIES[0]!;
  return {
    currency,
    setCode: () => {},
    format: (usd: number) => `$${usd.toLocaleString("en-US")}`,
  };
}
