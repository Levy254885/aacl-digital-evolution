export type RegionFaq = { q: string; a: string };

export type Region = {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  heading: string;
  lead: string;
  intro: string[];
  standards: string[];
  sectors: string[];
  delivery: string;
  faqs: RegionFaq[];
  image: string;
};

export const REGIONS: Region[] = [
  {
    slug: "united-kingdom",
    name: "United Kingdom",
    metaTitle: "ISO Certification Consultants in the United Kingdom | AACL Global",
    metaDescription:
      "ISO 9001, ISO 27001, ISO 45001 and PCI DSS consultancy for UK organisations. UKAS-ready documentation, gap assessments and audit support, remote or onsite.",
    heading: "ISO certification consultancy for UK organisations.",
    lead: "UKAS-ready management systems, built with your team and evidenced the way UK certification bodies expect to see it.",
    intro: [
      "UK buyers, insurers and public sector frameworks increasingly treat certification as a pass or fail gate. AACL Global prepares UK organisations for assessment against ISO and security standards with documentation that maps directly to the clauses auditors test, not a generic template pack.",
      "We work with UKAS accredited certification bodies routinely, so we know how stage 1 and stage 2 assessments are run, what evidence needs to exist before the auditor arrives, and how to keep surveillance visits uneventful.",
      "Engagements run remotely by default, with onsite weeks scheduled where process walkthroughs, plant tours or physical security reviews make that the faster route.",
    ],
    standards: [
      "ISO 9001 quality management",
      "ISO/IEC 27001 information security",
      "ISO 45001 occupational health and safety",
      "ISO 22301 business continuity",
      "PCI DSS and Cyber Essentials alignment",
    ],
    sectors: [
      "Technology and SaaS suppliers bidding for enterprise contracts",
      "Public sector and framework suppliers",
      "Manufacturing and logistics",
      "Financial and professional services",
    ],
    delivery: "Remote delivery across all UK regions, with onsite audit weeks on request.",
    faqs: [
      {
        q: "How long does ISO 27001 certification take for a UK company?",
        a: "A focused scope with an engaged team typically reaches certification readiness in three to five months, followed by the certification body's stage 1 and stage 2 assessments.",
      },
      {
        q: "Do you work with UKAS accredited certification bodies?",
        a: "Yes. We prepare your system for assessment by any UKAS accredited body and can shortlist bodies whose sector experience matches your scope.",
      },
      {
        q: "Can the whole engagement be delivered remotely?",
        a: "Yes. Documentation, training, internal audits and management review can all run remotely; onsite time is optional and scheduled where it adds value.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=2000&q=80",
  },
  {
    slug: "europe",
    name: "Europe",
    metaTitle: "ISO Certification & Compliance Consultants in Europe | AACL Global",
    metaDescription:
      "ISO 27001, ISO 9001 and GSMA SAS consultancy for European organisations. GDPR aligned information security, multi-site scopes, remote or onsite delivery.",
    heading: "ISO and security certification across Europe.",
    lead: "Multi-site, multi-language certification programmes aligned with EU regulation and the standards your customers audit against.",
    intro: [
      "European organisations rarely face a single standard in isolation. Information security sits alongside GDPR obligations, NIS2 duties and customer security questionnaires. We design one management system that answers all of them, then keep it evidenced.",
      "Multi-site groups get a scope architecture that avoids duplicating effort: shared central controls, site level records, and an internal audit programme that satisfies sampling rules.",
      "Our consultants have delivered GSMA SAS, ISO/IEC 27001 and ISO 9001 programmes for European manufacturers and technology providers operating across several jurisdictions.",
    ],
    standards: [
      "ISO/IEC 27001 with GDPR and NIS2 alignment",
      "ISO 9001 quality management",
      "ISO 14001 environmental management",
      "GSMA SAS-UP and SAS-SM",
      "PCI DSS",
    ],
    sectors: [
      "SIM, eSIM and smart card manufacturers",
      "Security printers and high security facilities",
      "Technology and cloud providers",
      "Industrial manufacturing groups",
    ],
    delivery: "Remote delivery across the EU and EEA, with onsite assessment weeks per site.",
    faqs: [
      {
        q: "Does ISO 27001 certification help with GDPR and NIS2?",
        a: "It gives you most of the governance, risk and control evidence both regimes expect, but it is not a substitute for legal compliance work. We map the overlap explicitly so you can show regulators where each obligation is met.",
      },
      {
        q: "Can one certificate cover several European sites?",
        a: "Yes. A multi-site scope with central control and site sampling is normally the most efficient route, provided the sites share a common management system.",
      },
      {
        q: "Do you support GSMA SAS audits in Europe?",
        a: "Yes. SAS-UP and SAS-SM preparation is one of our specialist practices, including physical security, logical security and process documentation.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=2000&q=80",
  },
  {
    slug: "united-states",
    name: "United States",
    metaTitle: "ISO Certification & Security Compliance Consultants USA | AACL Global",
    metaDescription:
      "ISO 27001, ISO 9001 and PCI DSS consultancy for US organisations. Certification readiness, security questionnaire support, remote delivery in your time zone.",
    heading: "ISO and security certification for US organisations.",
    lead: "Certification readiness for companies whose sales cycles stall on security reviews and vendor questionnaires.",
    intro: [
      "In the US market, certification is usually driven by procurement. Enterprise buyers want ISO/IEC 27001, and often SOC 2 alongside it. We build the single control environment that supports both, so evidence is collected once and used twice.",
      "For payment and card handling businesses we scope PCI DSS pragmatically, cutting the assessed environment down before adding controls to it.",
      "Delivery is remote and scheduled in your working hours, with US and Canada wide coverage and optional onsite weeks for manufacturing and facility scopes.",
    ],
    standards: [
      "ISO/IEC 27001 information security",
      "ISO 9001 quality management",
      "PCI DSS",
      "ISO 22301 business continuity",
      "Control mapping alongside SOC 2 programmes",
    ],
    sectors: [
      "SaaS and technology vendors selling to enterprise",
      "Payment processors and fintech",
      "Healthcare suppliers and business associates",
      "Manufacturing and industrial supply chains",
    ],
    delivery: "Remote delivery across all US time zones, onsite weeks available.",
    faqs: [
      {
        q: "Should a US company choose ISO 27001 or SOC 2?",
        a: "If your buyers are international, ISO/IEC 27001 travels further; SOC 2 is often expected by US enterprise procurement. Many clients do both from one control set, which is cheaper than running two separate programmes.",
      },
      {
        q: "Do you handle PCI DSS scope reduction?",
        a: "Yes. Reducing the cardholder data environment is normally the first step, because it removes cost from every later control decision.",
      },
      {
        q: "How do you work across time zones?",
        a: "Workshops, audits and reviews are scheduled in your business hours, with asynchronous document review between sessions.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&w=2000&q=80",
  },
  {
    slug: "middle-east",
    name: "Middle East",
    metaTitle: "ISO Certification Consultants in the Middle East & UAE | AACL Global",
    metaDescription:
      "ISO 9001, ISO 27001, ISO 45001 and PCI DSS consultancy across the UAE, Saudi Arabia and the wider Gulf. Tender ready certification, onsite or remote.",
    heading: "ISO certification across the Gulf and wider Middle East.",
    lead: "Tender ready management systems for organisations bidding into government and large contractor supply chains.",
    intro: [
      "Across the UAE, Saudi Arabia, Qatar and Oman, certification is written into tender prequalification. We build systems that satisfy both the tender requirement and the operational reality of large project delivery.",
      "Health and safety expectations on Gulf construction and energy projects are demanding. ISO 45001 work is delivered with the incident, permit and contractor control evidence that main contractors inspect.",
      "Information security programmes are mapped to national frameworks where relevant, including regulator expectations for financial and telecom operators.",
    ],
    standards: [
      "ISO 9001 quality management",
      "ISO 45001 occupational health and safety",
      "ISO/IEC 27001 information security",
      "ISO 14001 environmental management",
      "PCI DSS and GSMA SAS",
    ],
    sectors: [
      "Construction, contracting and facilities management",
      "Oil, gas and energy services",
      "Telecom operators and suppliers",
      "Banking and financial services",
    ],
    delivery: "Onsite mobilisation across the GCC, with remote workstreams between visits.",
    faqs: [
      {
        q: "Is ISO certification required for government tenders in the Gulf?",
        a: "Many prequalification packs require ISO 9001, ISO 45001 and ISO 14001 as a minimum, and information security certification is increasingly requested for technology scopes.",
      },
      {
        q: "Can you mobilise consultants onsite?",
        a: "Yes. Onsite weeks are standard for construction, energy and facility scopes, combined with remote documentation and training work.",
      },
      {
        q: "How quickly can we be certified for a live bid?",
        a: "Accelerated programmes are possible, but no credible certification body issues a certificate without a real audit. We will tell you honestly what is achievable in your window.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2000&q=80",
  },
  {
    slug: "africa",
    name: "Africa",
    metaTitle: "ISO Certification & Compliance Consultants in Africa | AACL Global",
    metaDescription:
      "ISO 9001, ISO 27001, ISO 22000 and PCI DSS consultancy across Africa from our Nairobi headquarters. Onsite mobilisation and remote delivery in every market.",
    heading: "ISO certification across Africa, from our Nairobi headquarters.",
    lead: "Deep operating knowledge of African regulatory environments, combined with international certification experience.",
    intro: [
      "Our headquarters is in Nairobi, and our consultants have delivered certification programmes across East, West and Southern Africa for banks, manufacturers, telecom operators and public institutions.",
      "That means we understand the practical constraints: intermittent supplier documentation, multi country group structures, and regulators whose expectations differ from the standard's wording.",
      "We deliver certification without importing a template designed for a different continent. Systems are built around how your operation actually runs, then evidenced to international standard.",
    ],
    standards: [
      "ISO 9001 quality management",
      "ISO/IEC 27001 information security",
      "ISO 22000 and FSSC food safety",
      "ISO 45001 and ISO 14001",
      "PCI DSS and GSMA SAS",
    ],
    sectors: [
      "Banking, microfinance and mobile money",
      "Food and beverage manufacturing",
      "Telecom operators and SIM suppliers",
      "Public institutions and development programmes",
    ],
    delivery: "Onsite delivery across Africa with remote workstreams between visits.",
    faqs: [
      {
        q: "Which certification bodies do you work with in Africa?",
        a: "We prepare clients for assessment by internationally accredited bodies operating in the region, and can shortlist those with sector specific auditors.",
      },
      {
        q: "Do you support group structures across several countries?",
        a: "Yes. Group certification with central controls and country level records is a common scope for our banking and manufacturing clients.",
      },
      {
        q: "Is your pricing different for African markets?",
        a: "Pricing follows scope and site count, and the site shows indicative prices in your local currency where we support it.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1519659528534-7fd733a832a0?auto=format&fit=crop&w=2000&q=80",
  },
  {
    slug: "asia-pacific",
    name: "Asia Pacific",
    metaTitle: "ISO Certification & GSMA SAS Consultants in Asia Pacific | AACL Global",
    metaDescription:
      "ISO 27001, ISO 9001 and GSMA SAS consultancy across Asia Pacific. Manufacturing, SIM and eSIM, and technology scopes delivered remotely or onsite.",
    heading: "ISO and GSMA SAS certification across Asia Pacific.",
    lead: "Manufacturing and technology scopes prepared for the security schemes your customers audit hardest.",
    intro: [
      "Asia Pacific manufacturers supplying mobile operators, payment schemes and global brands face some of the most demanding audit regimes in the world. GSMA SAS-UP and SAS-SM sit at the top of that list.",
      "We prepare production sites for those audits end to end: physical security zoning, key and material accountability, logical security, and the process documentation that evidences it.",
      "For technology and services organisations, ISO/IEC 27001 programmes are delivered remotely with workshops scheduled in local hours.",
    ],
    standards: [
      "GSMA SAS-UP and SAS-SM",
      "ISO/IEC 27001 information security",
      "ISO 9001 quality management",
      "PCI DSS and card production security",
      "ISO 14001 environmental management",
    ],
    sectors: [
      "SIM, eSIM and smart card production",
      "Electronics and contract manufacturing",
      "Technology and outsourcing providers",
      "Logistics and distribution",
    ],
    delivery: "Remote delivery in local hours, with onsite audit weeks at production sites.",
    faqs: [
      {
        q: "What does GSMA SAS preparation involve?",
        a: "A gap assessment against the current SAS standard, physical and logical security remediation, documented process controls, staff training, and a full internal audit before the GSMA appointed auditor visits.",
      },
      {
        q: "Can you audit a production site onsite?",
        a: "Yes. Production security scopes almost always require onsite time, and we plan those weeks around your production schedule.",
      },
      {
        q: "Do you support both SAS-UP and SAS-SM?",
        a: "Yes, including sites that hold both because they produce and personalise subscriber credentials.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1535139262971-c51845709a48?auto=format&fit=crop&w=2000&q=80",
  },
];

export function findRegion(slug: string) {
  return REGIONS.find((r) => r.slug === slug);
}
