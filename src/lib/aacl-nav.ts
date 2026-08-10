import { SERVICES, INDUSTRIES, INSIGHTS } from "./aacl-content";

export type NavChild = { label: string; to: string; params?: Record<string, string> };
export type NavItem = { label: string; to: string; children?: NavChild[] };

export const MENU: NavItem[] = [
  { label: "Who We Are", to: "/about" },
  {
    label: "ISO Management Systems",
    to: "/services",
    children: [
      { label: "All Services", to: "/services" },
      ...SERVICES.map((s) => ({
        label: s.title.length > 46 ? `${s.title.slice(0, 44)}…` : s.title,
        to: "/services/$slug",
        params: { slug: s.slug },
      })),
    ],
  },
  { label: "eCompliance", to: "/ecompliance" },
  { label: "Templates", to: "/templates" },

  {
    label: "Industries",
    to: "/industries",
    children: [
      { label: "All Industries", to: "/industries" },
      ...INDUSTRIES.map((i) => ({
        label: i.name,
        to: "/industries/$slug",
        params: { slug: i.slug },
      })),
    ],
  },
  {
    label: "Resources",
    to: "/insights",
    children: [
      { label: "Knowledge Hub", to: "/insights" },
      ...INSIGHTS.slice(0, 5).map((p) => ({
        label: p.title.length > 46 ? `${p.title.slice(0, 44)}…` : p.title,
        to: "/insights/$slug",
        params: { slug: p.slug },
      })),
      { label: "Careers", to: "/careers" },
    ],
  },
  { label: "Contact", to: "/contact" },
];

export const PILLARS = [
  {
    title: "Training Programs",
    body: "Awareness, auditor and implementation training. Live, virtual and recorded.",
  },
  {
    title: "Documentation",
    body: "Customisable, audit-ready documents tailored to ISO/IEC standards.",
  },
  {
    title: "Audit Support",
    body: "Hands-on audits, management review services and preparation for external reviews.",
  },
  {
    title: "Consultancy",
    body: "Certification gap assessments, implementation and expert guidance.",
  },
];

export const STATS = [
  { label: "Satisfied Clients", value: "150+" },
  { label: "Service Categories", value: "50+" },
  { label: "Professionals Trained", value: "1000+" },
];

export const TESTIMONIALS = [
  {
    quote:
      "AACL is a rare partner. Deep consulting expertise combined with the ability to drive impactful certification and assurance outcomes. They redefined how we approach quality, trust and compliance.",
    name: "Saket Vyas",
    role: "Group Head of Risk, Verger Group",
    featured: true,
  },
  {
    quote:
      "I highly recommend AACL for ISO implementation projects. They demonstrated exceptional expertise, ensuring a seamless and efficient process while communicating complex concepts clearly.",
    name: "Ali Allami",
    role: "Operations Manager",
    featured: true,
  },
  {
    quote:
      "Highly recommend the AACL team for their ISO 27001 work. Structured, pragmatic, and completely aligned with how our business actually operates.",
    name: "Grace Wanjiru",
    role: "CISO, Regional Bank",
    featured: false,
  },
  {
    quote:
      "A talented team of auditors and advisors. They helped us close every regulator finding within a single surveillance cycle.",
    name: "Peter Otieno",
    role: "Head of Compliance",
    featured: false,
  },
  {
    quote:
      "AACL helped us successfully achieve certification first time, with documentation our teams genuinely use day to day.",
    name: "Amina Yusuf",
    role: "Quality Director, Manufacturing",
    featured: false,
  },
];
