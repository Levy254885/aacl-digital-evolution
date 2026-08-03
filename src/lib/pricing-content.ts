/** Indicative pricing, cost-objection messaging and trust content from the client brief. */

export type PricingRow = {
  tier: string;
  price: string;
  /** Lower bound in USD, used for currency conversion of "from" prices. */
  from: number;
  notes: string;
};

export const ISO_PRICING: PricingRow[] = [
  {
    tier: "Small (up to 50 staff)",
    price: "$2,000 – $4,000",
    from: 2000,
    notes:
      "Single site, single standard. Includes initial certification fees — excludes auditor travel expenses.",
  },
  {
    tier: "Mid-size (51–250 staff)",
    price: "$5,000 – $10,000",
    from: 5000,
    notes:
      "Single site, single standard. Includes initial certification fees — excludes auditor travel expenses.",
  },
  {
    tier: "Enterprise (250+ staff)",
    price: "$10,000+",
    from: 10000,
    notes:
      "Single site, single standard. Includes initial certification fees — excludes auditor travel expenses. Custom quote.",
  },
];

export const ISO_PRICING_NOTES = [
  "Bundling discount: 15–20% off when you certify 2+ standards together (e.g. ISO 9001 + ISO 27001).",
  "Onsite delivery: add consultant travel, accommodation and a daily on-site rate of $450–$900/day.",
  "Remote delivery: daily rate of $250–$500/day, no travel cost — the faster, lower-cost default for international clients.",
];

export const TEMPLATE_PRICING: PricingRow[] = [
  { tier: "Simple", price: "$15 – $35", from: 15, notes: "Forms, registers, checklists" },
  { tier: "Standard", price: "$35 – $75", from: 35, notes: "Policies, SOPs, training materials" },
  {
    tier: "Complex",
    price: "$90 – $180",
    from: 90,
    notes: "Full manuals, risk registers, business continuity plans",
  },
];

export const TEMPLATE_PRICING_NOTES = [
  "Credit bundles (10/25/50 documents) at a 10–20% discount for repeat use.",
  "Optional “Human Reviewed” add-on: $50–$120 per document for consultant sign-off.",
];

export const ECOMPLIANCE_PRICING: PricingRow[] = [
  {
    tier: "Essentials",
    price: "$300 – $600 / month",
    from: 300,
    notes: "Single-standard maintenance, compliance calendar, document access",
  },
  {
    tier: "Growth",
    price: "$800 – $1,500 / month",
    from: 800,
    notes:
      "Multi-standard, quarterly internal audits, CAPA management, part-time remote compliance officer",
  },
  {
    tier: "Enterprise",
    price: "Custom quote",
    from: 0,
    notes:
      "Dedicated compliance officer, cybersecurity audits, unlimited AI document generation, onsite visits included",
  },
];

export const COST_PILLARS = [
  {
    title: "Premium quality, not a premium price",
    body:
      "The same rigor and the same certified consultants — scoped to a budget that fits your organization.",
  },
  {
    title: "We listen first",
    body:
      "Every engagement starts with a conversation about your risk, size and budget — not a fixed-price brochure.",
  },
  {
    title: "Scoped to fit",
    body:
      "A gap assessment defines exactly what's needed, so you never pay for more than your business requires.",
  },
];

export const COST_BANNERS = {
  a: "Think certification is out of reach? Most organizations are surprised by how affordable the right-sized plan is — let's talk before you rule it out.",
  b: "Don't let cost decide this for you. Tell us your budget and we'll tell you what's realistic — no obligation, no pressure.",
};

export const COST_FAQ = {
  q: "Isn't ISO certification expensive?",
  a: "Not necessarily. Cost depends on your organization's size and how many standards you're certifying against — which is exactly why we start with a free gap assessment and a conversation about your budget, not a one-size-fits-all quote. Many SMEs are certified for far less than they expect.",
};

export const PAYMENT_METHODS = [
  {
    method: "Card (Visa / Mastercard)",
    best: "International and enterprise clients",
    rail: "Stripe (global) or Flutterwave / Paystack for African card acquiring",
  },
  {
    method: "M-Pesa",
    best: "Kenyan SMEs and individual buyers, especially for Templates",
    rail: "Flutterwave, Pesapal or direct Safaricom Daraja API",
  },
  {
    method: "PayPal",
    best: "International clients who prefer a wallet over card details",
    rail: "PayPal Business Checkout",
  },
];

/** Named clients confirmed by the brief (Kenya, Ghana, Uganda, UK). */
export const CLIENT_NAMES = [
  "Complast Industries Limited (Kenya)",
  "Sintel Security Printing Solutions Ltd (Kenya)",
  "Skanem Interlabels Nairobi Ltd (Kenya)",
  "ICPS Ghana",
  "Margins ID Group (Ghana)",
  "Minimal Frame Projects UK Ltd (United Kingdom)",
  "Kamongo Waste Paper Kenya Ltd",
  "Digital Divide Data",
  "Centrofood Industries Ltd",
  "Medical Access Uganda Ltd",
  "United Health Distributors (Uganda)",
  "Africa Polysack",
  "Reeds Africa Consult",
];
