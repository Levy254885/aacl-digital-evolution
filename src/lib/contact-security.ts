/**
 * Contact form hardening.
 *
 * This is the *first* line of defence only. The authoritative controls are:
 *   1. Firestore Security Rules (field allow-list, type + length checks,
 *      `timestamp == request.time`, reads blocked entirely).
 *   2. Firebase App Check (reCAPTCHA v3) enforced on Cloud Firestore, which is
 *      the CAPTCHA for every public write and is verified by Google, not by us.
 *
 * Everything below simply stops honest mistakes and cheap bot spam before a
 * request ever leaves the browser.
 */

export type LeadDraft = {
  name: string;
  email: string;
  phone: string;
  org: string;
  service: string;
  message: string;
};

export const LIMITS = {
  name: 120,
  email: 160,
  phone: 32,
  org: 160,
  service: 180,
  message: 5000,
} as const;

/** Minimum seconds a human plausibly needs to fill the form. */
const MIN_FILL_SECONDS = 3;
/** Sliding window rate limit, per browser. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const RATE_KEY = "aacl.lead.attempts";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[a-zA-Z]{2,}$/;
const LINK_RE = /(https?:\/\/|www\.)/gi;
const SPAM_RE =
  /(viagra|casino|crypto\s*airdrop|bitcoin\s+doubl|seo\s+service|backlink|loan\s+offer|porn|escort|\[url=|<a\s+href)/i;

export function clean(value: string, max: number): string {
  return value.replace(/\s+/g, " ").trim().slice(0, max);
}

export type ValidationResult = { ok: true; value: LeadDraft } | { ok: false; error: string };

export function validateLead(draft: LeadDraft): ValidationResult {
  const value: LeadDraft = {
    name: clean(draft.name, LIMITS.name),
    email: clean(draft.email, LIMITS.email).toLowerCase(),
    phone: clean(draft.phone, LIMITS.phone),
    org: clean(draft.org, LIMITS.org),
    service: clean(draft.service, LIMITS.service),
    message: draft.message.trim().slice(0, LIMITS.message),
  };

  if (value.name.length < 2) return { ok: false, error: "Please enter your full name." };
  if (!EMAIL_RE.test(value.email)) return { ok: false, error: "Please enter a valid email address." };
  if (value.phone && !/^[0-9+()\s-]{7,}$/.test(value.phone))
    return { ok: false, error: "Please enter a valid phone number." };
  if (value.service.length < 2)
    return { ok: false, error: "Please tell us which service you need." };
  if (value.message.length < 15)
    return { ok: false, error: "Please add a little more detail to your message." };

  const haystack = `${value.name} ${value.org} ${value.service} ${value.message}`;
  if (SPAM_RE.test(haystack))
    return { ok: false, error: "Your message was blocked by our spam filter." };
  if ((value.message.match(LINK_RE) ?? []).length > 2)
    return { ok: false, error: "Please remove the links from your message and try again." };
  if (LINK_RE.test(value.name))
    return { ok: false, error: "Please enter your name without a web address." };

  return { ok: true, value };
}

/** Honeypot + time-to-complete check. */
export function looksAutomated(honeypot: string, startedAt: number): boolean {
  if (honeypot.trim().length > 0) return true;
  return (Date.now() - startedAt) / 1000 < MIN_FILL_SECONDS;
}

/** Per-browser sliding-window rate limit. Returns false when over quota. */
export function allowAttempt(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const now = Date.now();
    const raw = window.localStorage.getItem(RATE_KEY);
    const recent: number[] = raw ? (JSON.parse(raw) as number[]) : [];
    const inWindow = recent.filter((t) => now - t < WINDOW_MS);
    if (inWindow.length >= MAX_PER_WINDOW) return false;
    inWindow.push(now);
    window.localStorage.setItem(RATE_KEY, JSON.stringify(inWindow));
    return true;
  } catch {
    return true;
  }
}
