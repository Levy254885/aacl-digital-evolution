import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Currency = {
  code: string;
  symbol: string;
  /** Indicative units per 1 USD. Reference only, settlement happens in the payment rail's currency. */
  rate: number;
  label: string;
};

export const CURRENCIES: Currency[] = [
  { code: "USD", symbol: "$", rate: 1, label: "US Dollar" },
  { code: "KES", symbol: "KSh", rate: 129, label: "Kenyan Shilling" },
  { code: "UGX", symbol: "USh", rate: 3800, label: "Ugandan Shilling" },
  { code: "TZS", symbol: "TSh", rate: 2600, label: "Tanzanian Shilling" },
  { code: "RWF", symbol: "FRw", rate: 1350, label: "Rwandan Franc" },
  { code: "ETB", symbol: "Br", rate: 128, label: "Ethiopian Birr" },
  { code: "GHS", symbol: "GH₵", rate: 15.5, label: "Ghanaian Cedi" },
  { code: "NGN", symbol: "₦", rate: 1550, label: "Nigerian Naira" },
  { code: "ZAR", symbol: "R", rate: 18.2, label: "South African Rand" },
  { code: "ZMW", symbol: "ZK", rate: 26, label: "Zambian Kwacha" },
  { code: "EGP", symbol: "E£", rate: 48, label: "Egyptian Pound" },
  { code: "MAD", symbol: "DH", rate: 9.9, label: "Moroccan Dirham" },
  { code: "GBP", symbol: "£", rate: 0.79, label: "Pound Sterling" },
  { code: "EUR", symbol: "€", rate: 0.92, label: "Euro" },
  { code: "CHF", symbol: "CHF", rate: 0.88, label: "Swiss Franc" },
  { code: "AED", symbol: "AED", rate: 3.67, label: "UAE Dirham" },
  { code: "SAR", symbol: "SAR", rate: 3.75, label: "Saudi Riyal" },
  { code: "INR", symbol: "₹", rate: 84, label: "Indian Rupee" },
  { code: "CAD", symbol: "CA$", rate: 1.37, label: "Canadian Dollar" },
  { code: "AUD", symbol: "A$", rate: 1.52, label: "Australian Dollar" },
];

const STORAGE_KEY = "aacl.currency";
const COUNTRY_KEY = "aacl.currency.country";

/** ISO-3166 country → currency for the markets AACL serves. */
const COUNTRY_TO_CURRENCY: Record<string, string> = {
  KE: "KES",
  UG: "UGX",
  TZ: "TZS",
  RW: "RWF",
  BI: "TZS",
  ET: "ETB",
  SS: "KES",
  SO: "KES",
  GH: "GHS",
  NG: "NGN",
  ZA: "ZAR",
  ZM: "ZMW",
  ZW: "USD",
  BW: "ZAR",
  NA: "ZAR",
  LS: "ZAR",
  SZ: "ZAR",
  MW: "USD",
  MZ: "USD",
  EG: "EGP",
  MA: "MAD",
  GB: "GBP",
  IE: "EUR",
  FR: "EUR",
  DE: "EUR",
  NL: "EUR",
  BE: "EUR",
  ES: "EUR",
  IT: "EUR",
  PT: "EUR",
  AT: "EUR",
  FI: "EUR",
  GR: "EUR",
  LU: "EUR",
  CH: "CHF",
  AE: "AED",
  SA: "SAR",
  QA: "AED",
  OM: "AED",
  KW: "AED",
  BH: "AED",
  IN: "INR",
  PK: "INR",
  CA: "CAD",
  AU: "AUD",
  NZ: "AUD",
  US: "USD",
};

/** Timezone → country, used as an offline fallback before the geo lookup lands. */
const TZ_TO_COUNTRY: Record<string, string> = {
  "Africa/Nairobi": "KE",
  "Africa/Kampala": "UG",
  "Africa/Dar_es_Salaam": "TZ",
  "Africa/Kigali": "RW",
  "Africa/Addis_Ababa": "ET",
  "Africa/Accra": "GH",
  "Africa/Lagos": "NG",
  "Africa/Johannesburg": "ZA",
  "Africa/Lusaka": "ZM",
  "Africa/Cairo": "EG",
  "Africa/Casablanca": "MA",
  "Europe/London": "GB",
  "Europe/Dublin": "IE",
  "Europe/Zurich": "CH",
  "Asia/Dubai": "AE",
  "Asia/Riyadh": "SA",
  "Asia/Kolkata": "IN",
  "Asia/Calcutta": "IN",
  "America/Toronto": "CA",
  "America/Vancouver": "CA",
  "Australia/Sydney": "AU",
  "Australia/Melbourne": "AU",
  "Pacific/Auckland": "NZ",
};

function supported(code: string | undefined | null) {
  return Boolean(code && CURRENCIES.some((c) => c.code === code));
}

function currencyForCountry(country: string | undefined | null): string | null {
  if (!country) return null;
  const code = COUNTRY_TO_CURRENCY[country.toUpperCase()];
  return supported(code) ? code! : null;
}

/** Best-effort synchronous guess from the browser's timezone and locale region. */
function guessFromBrowser(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
    const fromTz = currencyForCountry(TZ_TO_COUNTRY[tz]);
    if (fromTz) return fromTz;

    const locale = navigator.language ?? "";
    const region = locale.split("-")[1];
    const fromLocale = currencyForCountry(region);
    if (fromLocale) return fromLocale;

    if (tz.startsWith("Europe/")) return "EUR";
    if (tz.startsWith("Africa/")) return "USD";
  } catch {
    /* fall through to USD */
  }
  return "USD";
}

/** Resolve the visitor's country from their IP, then map it to a currency. */
async function detectFromIp(): Promise<string | null> {
  try {
    const res = await fetch("https://ipapi.co/json/", {
      signal: AbortSignal.timeout(3500),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { country_code?: string; currency?: string };
    const byCountry = currencyForCountry(data.country_code);
    if (byCountry) {
      try {
        window.localStorage.setItem(COUNTRY_KEY, String(data.country_code));
      } catch {
        /* storage unavailable */
      }
      return byCountry;
    }
    return supported(data.currency) ? data.currency! : null;
  } catch {
    return null;
  }
}

type Ctx = {
  currency: Currency;
  setCode: (code: string) => void;
  /** True while the currency is the auto-detected one (no manual override). */
  autoDetected: boolean;
  /** Formats a USD amount into the active currency as a rounded "from" price. */
  format: (usd: number) => string;
};

const CurrencyContext = createContext<Ctx | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [code, setCode] = useState("USD");
  const [manual, setManual] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let cancelled = false;

    let saved: string | null = null;
    try {
      saved = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      /* storage unavailable */
    }

    if (supported(saved)) {
      setCode(saved!);
      setManual(true);
      return;
    }

    // Instant guess from the browser, then refine with the IP-based country.
    setCode(guessFromBrowser());
    void detectFromIp().then((detected) => {
      if (!cancelled && detected) setCode(detected);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo<Ctx>(() => {
    const currency = CURRENCIES.find((c) => c.code === code) ?? CURRENCIES[0]!;
    return {
      currency,
      autoDetected: !manual,
      setCode: (next) => {
        setCode(next);
        setManual(true);
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
  }, [code, manual]);

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency(): Ctx {
  const ctx = useContext(CurrencyContext);
  if (ctx) return ctx;
  const currency = CURRENCIES[0]!;
  return {
    currency,
    autoDetected: false,
    setCode: () => {},
    format: (usd: number) => `$${usd.toLocaleString("en-US")}`,
  };
}
