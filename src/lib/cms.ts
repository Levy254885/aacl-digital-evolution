/**
 * Firestore-backed content layer.
 *
 * Every editable section of the website lives in the `cms` collection as a
 * single document keyed by the entries below. Each document stores either
 * `items` (an array) or `data` (an object). When Firestore is unreachable,
 * empty, or during SSR, the static fallback shipped with the code is used, so
 * the site renders identically to before.
 */

import { useQuery } from "@tanstack/react-query";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { getFirebaseDb, isFirebaseConfigured } from "@/lib/firebase";
import { recordAudit } from "@/lib/audit";

import { SITE, SERVICES, INSIGHTS, INDUSTRIES } from "@/lib/aacl-content";
import { PILLARS, STATS, TESTIMONIALS } from "@/lib/aacl-nav";
import {
  ISO_PRICING,
  TEMPLATE_PRICING,
  ECOMPLIANCE_PRICING,
  COST_FAQ,
  PAYMENT_METHODS,
} from "@/lib/pricing-content";
import { HERO_SLIDES } from "@/lib/hero-content";
import { STANDARDS } from "@/lib/standards-content";
import { CLIENT_LOGOS } from "@/lib/clients-content";

export type CmsKind = "list" | "object";

export type CmsCollection = {
  key: string;
  label: string;
  description: string;
  kind: CmsKind;
  /** Minimum role required to edit. */
  editableBy: "editor" | "admin";
  fallback: unknown;
};

export const CMS_COLLECTIONS: CmsCollection[] = [
  {
    key: "hero",
    label: "Hero slides",
    description: "Homepage carousel: image, eyebrow, headline, sub-copy and both CTAs.",
    kind: "list",
    editableBy: "editor",
    fallback: HERO_SLIDES,
  },
  {
    key: "standards",
    label: "ISO standards",
    description: "\"Standards We Support\" list with hover descriptions.",
    kind: "list",
    editableBy: "editor",
    fallback: STANDARDS,
  },
  {
    key: "services",
    label: "Services",
    description: "ISO management system service cards (slug, number, title, summary).",
    kind: "list",
    editableBy: "admin",
    fallback: SERVICES,
  },
  {
    key: "industries",
    label: "Industries",
    description: "Industry tiles shown on the homepage and /industries.",
    kind: "list",
    editableBy: "editor",
    fallback: INDUSTRIES,
  },
  {
    key: "testimonials",
    label: "Testimonials",
    description: "Client quotes. Set `featured: true` for the two large cards.",
    kind: "list",
    editableBy: "editor",
    fallback: TESTIMONIALS,
  },
  {
    key: "logos",
    label: "Past client logos",
    description: "Logo grid. `logo` is a public path (e.g. /clients/name.png) or an https URL.",
    kind: "list",
    editableBy: "editor",
    fallback: CLIENT_LOGOS,
  },
  {
    key: "blog",
    label: "Blog / insights",
    description: "Knowledge hub articles (slug, title, category, date, readTime, image).",
    kind: "list",
    editableBy: "editor",
    fallback: INSIGHTS,
  },
  {
    key: "faqs",
    label: "FAQs",
    description: "Question and answer pairs used across pricing and service pages.",
    kind: "list",
    editableBy: "editor",
    fallback: [COST_FAQ],
  },
  {
    key: "pricing_iso",
    label: "Pricing — ISO certification",
    description: "Tier, from (number, USD), price label and notes.",
    kind: "list",
    editableBy: "admin",
    fallback: ISO_PRICING,
  },
  {
    key: "pricing_templates",
    label: "Pricing — document templates",
    description: "Template pricing tiers.",
    kind: "list",
    editableBy: "admin",
    fallback: TEMPLATE_PRICING,
  },
  {
    key: "pricing_ecompliance",
    label: "Pricing — eCompliance",
    description: "Monthly eCompliance subscription tiers.",
    kind: "list",
    editableBy: "admin",
    fallback: ECOMPLIANCE_PRICING,
  },
  {
    key: "payment_methods",
    label: "Payment methods",
    description: "Payment rails shown at checkout.",
    kind: "list",
    editableBy: "admin",
    fallback: PAYMENT_METHODS,
  },
  {
    key: "pillars",
    label: "Service pillars",
    description: "Training, Documentation, Audit Support, Consultancy blurbs.",
    kind: "list",
    editableBy: "editor",
    fallback: PILLARS,
  },
  {
    key: "stats",
    label: "Stats counters",
    description: "Animated counters (label + value such as 150+).",
    kind: "list",
    editableBy: "editor",
    fallback: STATS,
  },
  {
    key: "contact",
    label: "Contact details",
    description: "Company name, tagline, phone, email and address.",
    kind: "object",
    editableBy: "admin",
    fallback: SITE,
  },
];

export function getCmsCollection(key: string): CmsCollection | undefined {
  return CMS_COLLECTIONS.find((c) => c.key === key);
}

async function fetchCmsDoc(key: string): Promise<unknown | null> {
  const snap = await getDoc(doc(getFirebaseDb(), "cms", key));
  if (!snap.exists()) return null;
  const data = snap.data() as { items?: unknown[]; data?: Record<string, unknown> };
  if (Array.isArray(data.items)) return data.items;
  if (data.data && typeof data.data === "object") return data.data;
  return null;
}

/**
 * Read a CMS entry, falling back to the static content that ships with the
 * build. Safe during SSR (returns the fallback immediately).
 */
export function useCms<T>(key: string, fallback: T): T {
  const enabled = typeof window !== "undefined" && isFirebaseConfigured;
  const { data } = useQuery({
    queryKey: ["cms", key],
    queryFn: () => fetchCmsDoc(key),
    enabled,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
  return (data as T | null | undefined) ?? fallback;
}

/** Admin write path — guarded by Firestore rules on the server side. */
export async function saveCmsDoc(key: string, value: unknown, uid: string, email?: string | null) {
  const collectionDef = getCmsCollection(key);
  if (!collectionDef) throw new Error(`Unknown content collection: ${key}`);

  const payload =
    collectionDef.kind === "list"
      ? { items: value as unknown[] }
      : { data: value as Record<string, unknown> };

  await setDoc(
    doc(getFirebaseDb(), "cms", key),
    { ...payload, updatedAt: serverTimestamp(), updatedBy: uid },
    { merge: true },
  );

  await recordAudit({
    action: "content.publish",
    target: key,
    targetLabel: collectionDef.label,
    summary:
      collectionDef.kind === "list"
        ? `Published ${(value as unknown[])?.length ?? 0} item(s)`
        : `Updated ${Object.keys((value ?? {}) as Record<string, unknown>).length} field(s)`,
    actorUid: uid,
    actorEmail: email,
  });
}

/** Load the current stored value for the admin editor (null when unset). */
export async function loadCmsDoc(key: string) {
  return fetchCmsDoc(key);
}
