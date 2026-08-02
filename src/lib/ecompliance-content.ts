export type DeliveryOption = {
  id: "onsite" | "remote";
  name: string;
  tagline: string;
  body: string;
  includes: string[];
  bestFor: string;
};

export const DELIVERY_OPTIONS: DeliveryOption[] = [
  {
    id: "onsite",
    name: "Consultancy as a Service (Onsite)",
    tagline: "Senior consultants embedded with your team",
    body:
      "A named AACL consultant works on your site through implementation, internal audit and certification — leading workshops, interviewing process owners and walking the floor with your teams.",
    includes: [
      "Onsite gap assessment and process walkthroughs",
      "Facilitated workshops with process owners",
      "Documentation built with your teams, not for them",
      "Onsite internal audit and management review",
      "Certification audit attendance and support",
    ],
    bestFor: "Multi-site operations, manufacturing, labs and first-time certification.",
  },
  {
    id: "remote",
    name: "Compliance as a Service (Remote)",
    tagline: "A managed compliance function, delivered remotely",
    body:
      "We run your management system as a subscription — remote audits, document control, corrective actions, risk register and calendar upkeep — with scheduled video sessions across your timezone.",
    includes: [
      "Remote gap assessment and implementation plan",
      "Cloud document control with version history",
      "Scheduled remote internal audits",
      "CAPA and risk register maintained by AACL",
      "Compliance calendar, reminders and reporting",
    ],
    bestFor: "Lean teams, services, tech, and organisations certifying across borders.",
  },
];

export const DELIVERY_STRAPLINE = "Available Onsite or Remote — Worldwide.";

export const ECOMPLIANCE_MODULES = [
  {
    icon: "gauge",
    title: "Compliance dashboard",
    body: "One live view of conformity by clause, open findings, overdue actions and audit readiness score.",
  },
  {
    icon: "wrench",
    title: "CAPA management",
    body: "Raise, assign and close corrective and preventive actions with root-cause analysis and evidence trails.",
  },
  {
    icon: "shield-alert",
    title: "Risk register",
    body: "Risk and opportunity register with scoring, treatment plans, owners and review cycles per ISO 31000.",
  },
  {
    icon: "clipboard-check",
    title: "Audit tracking",
    body: "Internal and external audit programmes, checklists, findings, and surveillance cycle planning.",
  },
  {
    icon: "calendar-clock",
    title: "Compliance calendar",
    body: "Every legal, certification and internal obligation on one calendar with automated reminders.",
  },
  {
    icon: "siren",
    title: "Incident reporting",
    body: "Capture incidents, near misses and non-conformities from any device, routed to the right owner.",
  },
  {
    icon: "file-check",
    title: "Document approval workflows",
    body: "Draft, review, approve and publish controlled documents with revision history and read receipts.",
  },
  {
    icon: "bell-ring",
    title: "Reminders and escalation",
    body: "Automated nudges before due dates and escalation to management when actions slip.",
  },
  {
    icon: "bar-chart-3",
    title: "Management reporting",
    body: "Management review packs, KPI trends and board-ready compliance reports generated on demand.",
  },
];

export const ECOMPLIANCE_PLANS = [
  {
    name: "Essential",
    from: 180,
    period: "per month",
    body: "A single management system, remotely maintained.",
    features: ["1 standard", "Quarterly remote internal audit", "Document control", "CAPA and risk register"],
  },
  {
    name: "Integrated",
    from: 420,
    period: "per month",
    body: "Multiple standards operated as one integrated system.",
    features: [
      "Up to 3 standards",
      "Monthly remote audit sessions",
      "Compliance calendar and reminders",
      "Management review packs",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    from: 950,
    period: "per month",
    body: "Group-wide compliance with onsite consultancy blended in.",
    features: [
      "Unlimited standards and sites",
      "Onsite consultancy days included",
      "Dedicated senior consultant",
      "Board and regulator reporting",
    ],
  },
];

export const ECOMPLIANCE_FAQS = [
  {
    q: "What is the difference between Consultancy as a Service and Compliance as a Service?",
    a: "Consultancy as a Service is onsite delivery — a senior AACL consultant works physically with your teams through implementation and certification. Compliance as a Service is a remote subscription in which AACL operates and maintains your management system on an ongoing basis. Both are available worldwide and can be combined.",
  },
  {
    q: "Can eCompliance support more than one ISO standard at once?",
    a: "Yes. Integrated management systems are the norm at AACL — for example ISO 9001, ISO 14001 and ISO 45001 operated as a single system with shared documentation, one audit programme and one management review.",
  },
  {
    q: "Do you work outside Kenya and East Africa?",
    a: "Yes. Remote delivery is worldwide across all timezones, and onsite consultancy is arranged globally on request.",
  },
  {
    q: "Is eCompliance suitable for certification audits?",
    a: "It is designed for them. Every record an auditor asks for — document control, internal audits, CAPA, risk, management review — is maintained continuously rather than assembled in the weeks before an audit.",
  },
  {
    q: "How is pricing structured?",
    a: "Plans start from the indicative monthly figures shown and are confirmed after a short scoping call, based on the number of standards, sites and headcount. USD is the reference currency.",
  },
];
