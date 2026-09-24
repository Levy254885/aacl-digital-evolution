export const SITE = {
  name: "Audits and Assurance Consult Ltd",
  short: "AACL",
  tagline:
    "Worldwide ISO, security compliance & certification consultancy — onsite or remote",
  phone: "+254 719 876 524",
  email: "info@aacl.co.ke",
  address: {
    line1: "Vision Towers",
    line2: "Muthangari Drive, Westlands",
    city: "Nairobi",
    country: "Kenya",
  },
};

// TEMPORARY STUB - RESTORE IMMEDIATELY FROM MAIN IF THIS APPEARS
export const NAV = [
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Industries", to: "/industries" },
  { label: "Insights", to: "/insights" },
  { label: "Contact", to: "/contact" },
];

export type ServiceMeta = {
  slug: string;
  number: string;
  title: string;
  short: string;
  summary: string;
  challenges: string[];
  methodology: { title: string; body: string }[];
  deliverables: string[];
  standards: string[];
  industries: string[];
  faqs: { q: string; a: string }[];
  detail: string[];
  image: string;
};

export const SERVICES: ServiceMeta[] = [];
export const INDUSTRIES: any[] = [];
export const INSIGHTS: any[] = [];
