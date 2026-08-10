export const SITE = {
  name: "Audits and Assurance Consult Ltd",
  short: "AACL",
  tagline: "Global Experts in Security, Compliance & ISO Management Systems",
  phone: "+254 719 876 524",
  email: "info@aacl.co.ke",
  address: {
    line1: "Vision Towers",
    line2: "Muthangari Drive, Westlands",
    city: "Nairobi",
    country: "Kenya",
  },
};

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

export const SERVICES: ServiceMeta[] = [
  {
    slug: "risk-and-vulnerability-assessments",
    number: "01",
    title: "Physical & Cybersecurity Risk & Vulnerability Assessments",
    short: "Enterprise-wide 360° risk assessments across physical, cyber and third-party domains.",
    summary:
      "We evaluate the full risk surface of your organisation, from perimeter security and access control to network posture, application security and third-party exposure, and translate findings into board-ready decisions and prioritised remediation roadmaps.",
    detail: [
      "AACL delivers integrated 360° assessments that combine physical security review, cybersecurity posture analysis and Vulnerability Assessment & Penetration Testing (VAPT). Our engagements are structured around ISO 31000 risk principles and calibrated to your regulatory environment, threat profile and business priorities.",
      "Assessments are executed by a multi-disciplinary team of security engineers, ISO lead auditors and former corporate security leaders. Every finding is contextualised. We do not simply hand over a tool output; we quantify likelihood, business impact and mitigation cost so executives can make defensible investment decisions.",
      "We work alongside your teams throughout the assessment lifecycle: scoping and asset discovery, controlled testing, evidence-based reporting, mitigation planning, and follow-up validation. The result is a durable improvement in resilience. Not a one-off report.",
    ],
    challenges: [
      "Fragmented visibility across physical premises, IT estate and third parties",
      "Regulatory pressure from data protection, financial services and industry-specific regimes",
      "Undocumented shadow infrastructure and legacy systems accumulating unmanaged risk",
      "Board-level demand for quantified, prioritised risk reporting",
      "Vendor and supply-chain exposure with limited assurance mechanisms",
    ],
    methodology: [
      { title: "Scoping & context", body: "Business-driven scoping workshop to define assets, threat scenarios, testing rules of engagement and success criteria." },
      { title: "Discovery & profiling", body: "Asset inventory, network mapping, physical walk-through, control baseline and stakeholder interviews." },
      { title: "Assessment & testing", body: "Controlled VAPT, configuration review, physical intrusion testing, third-party questionnaires and evidence collection." },
      { title: "Analysis & prioritisation", body: "Risk quantification against ISO 31000 / NIST SP 800-30, mapped to business impact and treatment cost." },
      { title: "Reporting & roadmap", body: "Executive summary, technical findings, prioritised remediation roadmap and board-ready dashboard." },
      { title: "Validation & continuous improvement", body: "Remediation support, control retesting and integration into your ongoing risk management cycle." },
    ],
    deliverables: [
      "Executive risk report with quantified heat map",
      "Technical findings register with reproducible evidence",
      "Prioritised remediation roadmap with cost and effort estimates",
      "Third-party risk register",
      "Board briefing pack and stakeholder presentation",
      "Post-remediation validation report",
    ],
    standards: ["ISO 31000", "ISO 27001", "GSMA SAS", "PCI DSS", "LPS 1175", "NIST SP 800-30", "COSO ERM"],
    industries: ["Banking & Financial Services", "Security Printing", "Telecommunications", "Manufacturing", "Aviation"],
    faqs: [
      { q: "How long does a typical assessment take?", a: "Between four and twelve weeks depending on scope, geographic footprint and asset complexity. We publish a detailed workplan at kick-off." },
      { q: "Do you perform physical intrusion testing?", a: "Yes. Under strictly authorised rules of engagement and with executive sign-off. Physical testing is central to our integrated methodology." },
      { q: "Will the report be defensible to regulators and auditors?", a: "Every report is structured to satisfy ISO 27001 Annex A, PCI DSS and sector-specific regulatory expectations, and is signed off by a certified lead auditor." },
    ],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "iso-management-systems",
    number: "02",
    title: "ISO Management Systems Consultancy",
    short: "Design, implement and certify management systems that endure beyond the audit.",
    summary:
      "We build management systems that are audit-ready, operationally practical and genuinely used by your teams. From gap assessment and documentation through internal audit, certification support and continual improvement.",
    detail: [
      "AACL has led ISO implementation programmes across banking, manufacturing, healthcare, aviation and technology sectors. Our consultants are trained lead auditors with hands-on operational backgrounds. We design management systems that work in the field, not only on paper.",
      "Every engagement is calibrated to your maturity level. For first-time certification we deliver full documentation, awareness, internal audit and certification support. For established systems we focus on integration, efficiency and closing systemic non-conformities.",
      "We deliver single-standard programmes as well as integrated management systems (IMS) that consolidate quality, environment, health & safety, information security and business continuity into one coherent framework.",
    ],
    challenges: [
      "Certification pressure from customers, regulators or parent groups",
      "Documentation that no one reads or follows",
      "Internal audits that surface the same findings year after year",
      "Multiple management systems operating in silos",
      "Difficulty translating standards into daily operational practice",
    ],
    methodology: [
      { title: "Gap assessment", body: "Benchmark current state against the target standard, identify systemic gaps and quantify effort." },
      { title: "System design", body: "Policy framework, process maps, risk register, objectives and KPIs aligned to your operating model." },
      { title: "Documentation", body: "Concise, usable procedures, work instructions and records. Designed for adoption, not shelfware." },
      { title: "Awareness & training", body: "Role-based training for leadership, process owners, internal auditors and general staff." },
      { title: "Internal audit & management review", body: "Full audit cycle, non-conformity management and management review facilitation." },
      { title: "Certification & continual improvement", body: "Certification body liaison, stage 1 and stage 2 audit support, and post-certification improvement." },
    ],
    deliverables: [
      "Gap assessment report and implementation plan",
      "Full management system documentation set",
      "Risk and opportunity register",
      "Internal audit programme and reports",
      "Management review pack",
      "Certification readiness statement",
    ],
    standards: ["ISO 27001", "ISO 9001", "ISO 13485", "ISO 14001", "ISO 45001", "ISO 22301", "ISO 50001", "FSSC 22000", "IFC Performance Standards"],
    industries: ["Manufacturing", "Pharmaceuticals", "Banking & Financial Services", "Technology", "Food & Beverage", "Hospitality"],
    faqs: [
      { q: "Which certification bodies do you work with?", a: "We are certification-body agnostic and support engagements with all major internationally accredited registrars operating in East Africa and beyond." },
      { q: "Can you integrate multiple standards?", a: "Yes. Our preferred approach for organisations with more than two standards is an Integrated Management System that eliminates duplication." },
      { q: "How quickly can we achieve certification?", a: "Typical first-time certification programmes run four to nine months depending on scope, sites and existing maturity." },
    ],
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "security-standards-implementation",
    number: "03",
    title: "Security Standards Implementation & Audits",
    short: "Specialist implementation and auditing of GSMA SAS, SOC, UL 2050, ASTM F1233 and PCI DSS.",
    summary:
      "AACL is one of the region's specialist consultancies for security certification schemes that combine physical and logical control requirements. Critical for security printers, SIM manufacturers, payment ecosystems and monitored high-security facilities.",
    detail: [
      "Security certification schemes such as GSMA SAS, UL 2050 and PCI DSS impose demanding, prescriptive controls that span physical premises, personnel screening, information security, production processes and supply chain governance. AACL provides end-to-end implementation and audit readiness for these programmes.",
      "Our consultants have supported certification programmes for security printers, SIM and eSIM manufacturers, payment processors and high-security storage facilities. We understand the operational realities of running certified facilities. From clean-room controls to CCTV retention and secure destruction.",
      "We provide both implementation (design, remediation, evidence packs) and independent second-party auditing to prepare organisations for scheme audits with confidence.",
    ],
    challenges: [
      "Onerous physical control requirements (LPS 1175, UL 2050) with long lead times",
      "Complex evidence expectations across production, personnel and IT",
      "Coordination between architects, security integrators, HR and IT",
      "Cost pressure to right-size controls without compromising certification",
      "Maintaining continuous compliance between annual audits",
    ],
    methodology: [
      { title: "Scheme scoping", body: "Interpret scheme requirements against your production, product and customer footprint." },
      { title: "Design & remediation", body: "Physical, procedural and technical control design with integrator coordination." },
      { title: "Evidence engineering", body: "Structured evidence packs mapped one-to-one against auditor checklists." },
      { title: "Mock audit", body: "Independent readiness audit simulating the certification body assessment." },
      { title: "Certification support", body: "On-site support during scheme audit and non-conformity closure." },
      { title: "Sustainment", body: "Annual surveillance readiness, KPI monitoring and control assurance." },
    ],
    deliverables: [
      "Scheme applicability statement",
      "Control design and remediation plan",
      "Auditor-mapped evidence pack",
      "Mock audit report",
      "Certification audit support",
      "Annual surveillance readiness pack",
    ],
    standards: ["GSMA SAS-UP / SAS-SM", "SOC 1 / SOC 2", "UL 2050", "ASTM F1233", "PCI DSS", "LPS 1175"],
    industries: ["Security Printing", "Telecommunications", "Banking & Financial Services", "Private Security", "Manufacturing"],
    faqs: [
      { q: "Do you support both SAS-UP and SAS-SM?", a: "Yes. We support UICC/eUICC production (SAS-UP) and subscription management (SAS-SM) certification programmes." },
      { q: "Can you assist with LPS 1175 rated construction?", a: "We do not manufacture rated products, but we work with certified integrators to specify, procure and validate LPS 1175 physical protection." },
    ],
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "security-manager-as-a-service",
    number: "04",
    title: "Security Manager as a Service (SMaaS)",
    short: "Outsourced security leadership, governance and enterprise risk oversight on retainer.",
    summary:
      "For organisations that need executive-grade security leadership without a full-time hire, SMaaS delivers strategy, governance, risk oversight and incident readiness through a dedicated AACL consultant supported by our wider practice.",
    detail: [
      "SMaaS is designed for mid-market and growth-stage organisations facing rising security expectations from customers, regulators and boards. You gain a named senior security leader, embedded in your governance rhythm, backed by AACL's technical and audit expertise.",
      "Engagements are structured as monthly retainers with clearly defined governance deliverables. Board reporting, policy stewardship, third-party assurance, incident response readiness and continuous improvement of your security programme.",
      "SMaaS scales with your organisation: from fractional oversight for a Series A company to interim leadership during CISO transition for large enterprises.",
    ],
    challenges: [
      "Absence of dedicated senior security leadership",
      "Board and customer demand for named security accountability",
      "Immature incident response and governance rhythms",
      "Difficulty attracting and retaining senior security talent",
      "Multiple compliance obligations without a coordinating owner",
    ],
    methodology: [
      { title: "Onboarding", body: "Baseline assessment of security posture, governance and stakeholder map." },
      { title: "Programme design", body: "Twelve-month security roadmap aligned to business objectives and risk appetite." },
      { title: "Governance rhythm", body: "Monthly executive reports, quarterly board briefings, policy stewardship and KPI oversight." },
      { title: "Operational oversight", body: "Vendor risk, incident response readiness, awareness programme and control monitoring." },
      { title: "Strategic advisory", body: "M&A due diligence, customer assurance responses, regulator engagement." },
      { title: "Transition & handover", body: "Structured handover to permanent CISO when the organisation is ready." },
    ],
    deliverables: [
      "Twelve-month security roadmap",
      "Monthly executive security report",
      "Quarterly board briefing pack",
      "Incident response playbook and tabletop exercises",
      "Vendor and customer assurance responses",
      "Named security leader on your organisation chart",
    ],
    standards: ["ISO 27001", "NIST CSF", "COSO ERM", "ISO 31000", "PCI DSS"],
    industries: ["Technology", "Banking & Financial Services", "Hospitality", "Telecommunications", "Manufacturing"],
    faqs: [
      { q: "How many days per month is the retainer?", a: "Retainers typically range from two to ten days per month, with escalation capacity for incidents and audits." },
      { q: "Do you represent us to customers and auditors?", a: "Yes. Your AACL security leader can attend customer assurance calls, respond to security questionnaires and support external audits." },
    ],
    image:
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "statutory-compliance",
    number: "05",
    title: "Statutory Compliance Consultancy, Audits & Training",
    short: "Occupational health & safety, environment, sustainability and data protection compliance.",
    summary:
      "AACL helps organisations meet Kenyan and international statutory obligations across occupational health & safety, environmental management, sustainability and data protection. Through compliance audits, remediation programmes, capacity building and ongoing advisory.",
    detail: [
      "Regulatory obligations across health & safety (DOSHS), environment (NEMA), data protection (ODPC) and sector-specific regulators have expanded significantly. Non-compliance carries reputational, financial and criminal exposure for directors and officers.",
      "Our consultants combine regulatory expertise with practical operational knowledge across manufacturing, hospitality, financial services and technology. We do not just identify gaps. We design and deliver the remediation and capacity-building needed to close them.",
      "Engagements include statutory compliance audits, policy and procedure development, employee training, regulator engagement support and ongoing compliance monitoring retainers.",
    ],
    challenges: [
      "Fragmented ownership of statutory compliance across HR, operations and legal",
      "Expanding data protection obligations under the Data Protection Act",
      "Environmental and sustainability reporting expectations from lenders and customers",
      "Health & safety incidents and inspection findings",
      "Personal liability exposure for directors and senior officers",
    ],
    methodology: [
      { title: "Compliance mapping", body: "Full inventory of applicable statutes, regulations and licence conditions." },
      { title: "Compliance audit", body: "Evidence-based audit against each obligation with severity ratings." },
      { title: "Remediation", body: "Policy, procedure, training and control remediation plan with clear owners and dates." },
      { title: "Capacity building", body: "Role-based training programmes for staff, supervisors and directors." },
      { title: "Regulator engagement", body: "Support for inspections, notifications and voluntary disclosures." },
      { title: "Ongoing assurance", body: "Retainer-based compliance monitoring, regulatory horizon scanning and reporting." },
    ],
    deliverables: [
      "Statutory compliance register",
      "Compliance audit report",
      "Remediation and capacity-building plan",
      "Employee, supervisor and director training",
      "Regulator engagement briefs",
      "Quarterly compliance monitoring reports",
    ],
    standards: ["Kenya Data Protection Act", "OSHA 2007", "NEMA / EMCA", "ISO 45001", "ISO 14001", "GRI Standards"],
    industries: ["Manufacturing", "Hospitality", "Banking & Financial Services", "Food & Beverage", "Aviation", "Pharmaceuticals"],
    faqs: [
      { q: "Can you act as our outsourced Data Protection Officer?", a: "Yes. AACL provides DPO-as-a-Service engagements including ODPC liaison, breach management and data subject request handling." },
      { q: "Do you deliver certified training?", a: "Our training programmes are aligned to internationally recognised syllabi and can be structured to meet DOSHS and NEMA training requirements." },
    ],
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
  },
];

export type IndustryMeta = {
  slug: string;
  name: string;
  short: string;
  risks: string[];
  regulations: string[];
  challenges: string[];
  approach: string;
  outcomes: string[];
  image: string;
};

export const INDUSTRIES: IndustryMeta[] = [
  {
    slug: "security-printing",
    name: "Security Printing",
    short: "GSMA SAS, UL 2050 and LPS 1175 certified security printing environments.",
    risks: ["Product diversion and counterfeit exposure", "Insider threat in production", "Physical intrusion of high-value stock"],
    regulations: ["GSMA SAS-UP", "UL 2050", "LPS 1175", "ISO 14298", "ISO 27001"],
    challenges: [
      "Meeting prescriptive physical and personnel security controls",
      "Sustaining evidence for annual scheme audits",
      "Coordinating architects, integrators and operations",
    ],
    approach:
      "AACL leads full certification programmes for security printers, from facility design review and personnel vetting frameworks through GSMA SAS and UL 2050 audit readiness.",
    outcomes: ["Successful scheme certification", "Reduced insider risk", "Board-visible security posture"],
    image: "/industries/security-printing.jpg",
  },
  {
    slug: "banking-financial-services",
    name: "Banking & Financial Services",
    short: "ISO 27001, PCI DSS and enterprise risk programmes for regulated financial institutions.",
    risks: ["Cyber fraud and payment channel compromise", "Third-party and fintech partner exposure", "Regulatory sanction and reputational loss"],
    regulations: ["CBK Guidance on Cybersecurity", "PCI DSS", "ISO 27001", "SOC 2", "Kenya Data Protection Act"],
    challenges: ["Rapid digital channel expansion", "Complex third-party ecosystems", "Board demand for quantified risk"],
    approach:
      "We deliver enterprise cyber and operational risk programmes, PCI DSS certification, third-party assurance and outsourced security leadership tailored to CBK expectations.",
    outcomes: ["Sustained regulatory compliance", "Quantified enterprise risk view", "Improved customer assurance"],
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    short: "Integrated quality, environment, safety and continuity management systems.",
    risks: ["Operational incidents and lost-time injuries", "Environmental non-compliance", "Supply chain disruption"],
    regulations: ["ISO 9001", "ISO 14001", "ISO 45001", "ISO 50001", "ISO 22301"],
    challenges: ["Aging equipment and legacy processes", "Multi-site consistency", "Customer audit pressure"],
    approach:
      "AACL implements integrated management systems that consolidate quality, HSE and continuity, backed by shop-floor training and internal audit programmes.",
    outcomes: ["Reduced incident rates", "Efficient integrated audits", "Certification across all sites"],
    image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    short: "Guest safety, food safety, data protection and operational compliance for hotels and resorts.",
    risks: ["Guest safety incidents", "Food safety outbreaks", "Data protection breaches on guest data"],
    regulations: ["FSSC 22000", "ISO 45001", "ISO 22301", "Kenya Data Protection Act"],
    challenges: ["Seasonal workforce turnover", "Multi-property standards", "Third-party service risk"],
    approach:
      "We build practical food safety, guest safety and data protection frameworks with property-level training and continuous auditing.",
    outcomes: ["Consistent brand standards", "Reduced incident exposure", "Regulator-ready compliance"],
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "pharmaceuticals",
    name: "Pharmaceuticals",
    short: "ISO 13485, GxP and cold-chain compliance for pharmaceutical manufacturers and distributors.",
    risks: ["Product quality and patient safety", "Cold-chain integrity", "Regulatory inspection findings"],
    regulations: ["ISO 13485", "ISO 9001", "GDP / GSP", "PPB requirements"],
    challenges: ["Regulator inspections", "Distribution partner assurance", "Documentation depth requirements"],
    approach:
      "AACL provides ISO 13485 implementation, quality management system optimisation and cold-chain compliance audits across the pharmaceutical value chain.",
    outcomes: ["Inspection-ready quality systems", "Reliable distribution assurance", "Certification maintenance"],
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "food-and-beverage",
    name: "Food & Beverage",
    short: "FSSC 22000 and HACCP programmes for food manufacturers, processors and distributors.",
    risks: ["Foodborne illness incidents", "Recall exposure", "Retailer audit failure"],
    regulations: ["FSSC 22000", "ISO 22000", "HACCP", "KEBS requirements"],
    challenges: ["Retailer certification demands", "Traceability across supply chain", "Workforce training scale"],
    approach:
      "We implement FSSC 22000 and HACCP end-to-end, with practical shop-floor training and retailer audit preparation.",
    outcomes: ["Retailer-approved certification", "Reduced recall exposure", "Robust traceability"],
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "technology",
    name: "Technology",
    short: "ISO 27001, SOC 2 and cloud security programmes for scale-ups and enterprises.",
    risks: ["Customer trust erosion from a security incident", "Data protection non-compliance", "Cloud misconfiguration"],
    regulations: ["ISO 27001", "SOC 2", "Kenya Data Protection Act", "GDPR", "NIST CSF"],
    challenges: ["Rapid product velocity vs. security", "Customer security questionnaires", "Fractional security leadership"],
    approach:
      "AACL delivers ISO 27001 and SOC 2 programmes calibrated to fast-moving product teams, plus SMaaS for organisations without a permanent CISO.",
    outcomes: ["Certifications closing enterprise deals", "Mature security governance", "Customer assurance velocity"],
    image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "telecommunications",
    name: "Telecommunications",
    short: "GSMA SAS, ISO 27001 and critical infrastructure resilience for MNOs and MVNOs.",
    risks: ["Subscriber data exposure", "SIM production compromise", "Critical infrastructure disruption"],
    regulations: ["GSMA SAS-UP / SAS-SM", "ISO 27001", "ISO 22301", "CA Kenya guidance"],
    challenges: ["Complex vendor ecosystems", "Regulatory scrutiny", "Scheme audit frequency"],
    approach:
      "We combine GSMA SAS specialist consultancy with enterprise ISO 27001 and business continuity programmes for telecommunications operators and their vendors.",
    outcomes: ["Sustained SAS certification", "Resilient critical operations", "Regulator confidence"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "aviation",
    name: "Aviation",
    short: "Safety management, security compliance and business continuity for aviation operators.",
    risks: ["Safety-of-life incidents", "Security threats to aviation assets", "Regulatory findings and licence risk"],
    regulations: ["ICAO Annex 17 / 19", "KCAA requirements", "ISO 45001", "ISO 22301"],
    challenges: ["Complex multi-agency oversight", "24/7 operational tempo", "Vendor and supplier assurance"],
    approach:
      "AACL supports aviation operators with integrated safety, security and continuity programmes aligned to KCAA and ICAO expectations.",
    outcomes: ["Sustained operator certification", "Reduced incident exposure", "Regulator-ready evidence"],
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "private-security",
    name: "Private Security",
    short: "Security operations governance, training and licensing compliance for guarding companies.",
    risks: ["Client incident exposure", "Officer safety and welfare", "Licensing and regulatory compliance"],
    regulations: ["PSRA requirements", "ISO 18788", "ISO 45001", "Kenya Data Protection Act"],
    challenges: ["High workforce turnover", "Officer training consistency", "Client audit demands"],
    approach:
      "We help private security operators design governance frameworks aligned to ISO 18788, plus statutory compliance and workforce capacity building.",
    outcomes: ["Improved client retention", "Reduced incident rates", "Regulator-ready operations"],
    image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?auto=format&fit=crop&w=1400&q=80",
  },
];

export const INSIGHTS = [
  {
    slug: "iso-27001-2022-transition",
    title: "Transitioning to ISO/IEC 27001:2022. A practitioner's roadmap",
    excerpt: "The 2022 revision consolidates Annex A controls and introduces new attributes. Here is how to plan a defensible transition without disrupting your operations.",
    date: "2026-05-14",
    readTime: "8 min read",
    category: "ISO Management Systems",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "board-reporting-on-cyber-risk",
    title: "Board reporting on cyber risk: moving beyond heat maps",
    excerpt: "Boards are asking for quantified, comparable and decision-useful cyber risk reporting. We outline a practical model that works in mid-market organisations.",
    date: "2026-04-02",
    readTime: "6 min read",
    category: "Governance",
    image: "https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "kenya-data-protection-act-lessons",
    title: "Two years of Kenya's Data Protection Act. Enforcement lessons",
    excerpt: "The ODPC has issued a growing number of enforcement decisions. Here is what compliance leaders should be prioritising in 2026.",
    date: "2026-02-19",
    readTime: "7 min read",
    category: "Compliance",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "gsma-sas-preparing-for-your-first-audit",
    title: "GSMA SAS: preparing for your first scheme audit",
    excerpt: "First-time SAS-UP applicants underestimate the physical and personnel control requirements. Our field guide walks through what to expect.",
    date: "2026-01-08",
    readTime: "9 min read",
    category: "Security Standards",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "integrated-management-systems",
    title: "The business case for integrated management systems",
    excerpt: "Organisations running three or more standards routinely duplicate effort. Integration reduces audit fatigue and unlocks measurable efficiency.",
    date: "2025-11-22",
    readTime: "5 min read",
    category: "ISO Management Systems",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "third-party-risk-in-financial-services",
    title: "Third-party risk in financial services: a maturity model",
    excerpt: "Third parties now underpin most customer-facing services. A structured maturity model helps banks focus assurance where it matters.",
    date: "2025-10-04",
    readTime: "6 min read",
    category: "Risk",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=80",
  },
];
