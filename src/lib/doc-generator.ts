/* AACL AI Document Generator — corporate document engine.
 *
 * Each template carries bespoke, standard-specific content (clause maps,
 * procedures, matrices, KPIs, records schedules) and is rendered as a
 * print-ready, brand-styled A4 document with cover, control page, contents,
 * running headers/footers and an approval sign-off page.
 */

export type Block =
  | { kind: "p"; text: string }
  | { kind: "bullets"; items: string[] }
  | { kind: "steps"; items: string[] }
  | { kind: "callout"; title: string; text: string }
  | { kind: "table"; caption?: string; head: string[]; rows: string[][] };

export type DocSection = { heading: string; blocks: Block[] };

export type DocTemplate = {
  slug: string;
  name: string;
  standard: string;
  price: number;
  complexity: "Simple" | "Standard" | "Complex";
  format: "DOCX + PDF";
  summary: string;
  purpose: string;
  scopeStatement: string;
  clauseMap: string[][];
  roles: string[][];
  kpis: string[][];
  records: string[][];
  definitions: string[][];
  body: DocSection[];
  /** Flat headings, kept for list/preview UI. */
  sections: string[];
};

type TemplateSeed = Omit<DocTemplate, "sections">;

const COMMON_DEFINITIONS: string[][] = [
  ["Top management", "The person or group who directs and controls the organisation at the highest level."],
  ["Process owner", "The individual accountable for the performance, resourcing and improvement of a defined process."],
  ["Nonconformity", "Non-fulfilment of a requirement of the standard, a legal obligation, or the organisation's own documented arrangements."],
  ["Corrective action", "Action to eliminate the cause of a nonconformity and prevent recurrence."],
  ["Documented information", "Information required to be controlled and maintained, and the medium on which it is contained."],
];

const seeds: TemplateSeed[] = [
  {
    slug: "quality-manual-9001",
    name: "Quality Management System Manual",
    standard: "ISO 9001:2015",
    price: 149,
    complexity: "Complex",
    format: "DOCX + PDF",
    summary:
      "Full QMS manual covering clauses 4–10 with context analysis, interested-party matrix, process interaction map, risk methodology and performance framework.",
    purpose:
      "To define the quality management system (QMS) established to consistently deliver products and services that meet customer, statutory and regulatory requirements, and to demonstrate conformity with ISO 9001:2015.",
    scopeStatement:
      "This manual applies to all sites, functions, processes, products and services within the declared certification scope, including externally provided processes controlled by the organisation.",
    clauseMap: [
      ["4", "Context of the organisation", "Sections 1–2"],
      ["5", "Leadership", "Section 3"],
      ["6", "Planning", "Section 4"],
      ["7", "Support", "Section 5"],
      ["8", "Operation", "Section 6"],
      ["9", "Performance evaluation", "Section 7"],
      ["10", "Improvement", "Section 8"],
    ],
    roles: [
      ["Top management", "Accountable for the QMS, policy, objectives and resourcing", "Management review chair"],
      ["Quality Manager", "Maintains the QMS, audit programme, nonconformity and CAPA records", "Day-to-day system owner"],
      ["Process owners", "Operate, monitor and improve assigned processes", "KPI reporting"],
      ["All personnel", "Follow documented arrangements and report nonconformities", "Awareness and competence"],
    ],
    kpis: [
      ["On-time in-full delivery", "≥ 97%", "Monthly", "Operations"],
      ["Customer complaints", "≤ 2 per quarter", "Quarterly", "Quality Manager"],
      ["Internal audit completion", "100% of programme", "Quarterly", "Quality Manager"],
      ["Corrective actions closed on time", "≥ 90%", "Monthly", "Process owners"],
      ["Customer satisfaction index", "≥ 4.2 / 5", "Bi-annual", "Commercial"],
    ],
    records: [
      ["Management review minutes", "Quality Manager", "5 years", "Controlled drive"],
      ["Internal audit reports", "Quality Manager", "3 years", "Controlled drive"],
      ["Nonconformity and CAPA register", "Quality Manager", "3 years", "QMS register"],
      ["Competence and training records", "HR", "Duration of employment + 3 years", "HR system"],
      ["Supplier evaluation records", "Procurement", "3 years", "Procurement file"],
    ],
    definitions: [
      ["QMS", "Quality management system — the set of interrelated processes used to direct and control quality."],
      ["Interested party", "Person or organisation that can affect, be affected by, or perceive itself affected by a decision or activity."],
    ],
    body: [
      {
        heading: "Context of the organisation",
        blocks: [
          { kind: "p", text: "Top management has determined the external and internal issues relevant to the organisation's purpose and strategic direction, and which affect the ability of the QMS to achieve its intended results. Issues are reviewed at least annually and whenever significant change occurs." },
          {
            kind: "table",
            caption: "Context analysis (illustrative — confirm at first management review)",
            head: ["Category", "Issue", "Effect on the QMS", "Response"],
            rows: [
              ["External — market", "Customer tendering increasingly requires certification", "Positive: strengthens commercial position", "Maintain certification and publicise scope"],
              ["External — regulatory", "Changing statutory and contractual obligations", "Risk of non-compliance", "Legal register reviewed quarterly"],
              ["Internal — resources", "Competence dependency on key personnel", "Continuity risk", "Cross-training and documented procedures"],
              ["Internal — infrastructure", "Ageing equipment / systems", "Process capability risk", "Planned maintenance and capital plan"],
            ],
          },
          {
            kind: "table",
            caption: "Interested parties and requirements",
            head: ["Interested party", "Needs and expectations", "How monitored"],
            rows: [
              ["Customers", "Conforming product, on-time delivery, responsiveness", "Satisfaction surveys, complaints, OTIF"],
              ["Regulators", "Compliance with applicable law", "Compliance register, inspections"],
              ["Employees", "Safe, competent, well-resourced workplace", "Engagement reviews, training plan"],
              ["Suppliers", "Clear requirements and fair terms", "Supplier reviews"],
              ["Shareholders / owners", "Sustainable performance and reputation", "Management review reporting"],
            ],
          },
        ],
      },
      {
        heading: "Scope and process interaction",
        blocks: [
          { kind: "p", text: "The scope of the QMS is stated on the cover page of this manual and is available as documented information. No requirement of ISO 9001:2015 has been excluded unless justified below; where an exclusion is claimed, it does not affect the ability or responsibility to deliver conforming product and service." },
          { kind: "bullets", items: [
            "Core processes: enquiry to order, planning, delivery of product/service, verification and handover.",
            "Support processes: HR and competence, procurement, infrastructure and maintenance, IT, document control.",
            "Management processes: strategic planning, risk and opportunity management, internal audit, management review, improvement.",
          ] },
          { kind: "p", text: "Process interactions are recorded in the process map (Appendix A). For each process, inputs, outputs, owner, criteria, resources, risks and performance indicators are defined and monitored." },
        ],
      },
      {
        heading: "Leadership, policy and roles",
        blocks: [
          { kind: "p", text: "Top management demonstrates leadership and commitment by taking accountability for the effectiveness of the QMS, ensuring the policy and objectives are compatible with the strategic direction, promoting risk-based thinking and process approach, and ensuring resources are available." },
          { kind: "callout", title: "Quality policy statement", text: "We are committed to delivering products and services that consistently meet customer, statutory and regulatory requirements; to complying with the requirements of our management system; and to continually improving its effectiveness. This policy is communicated to all personnel, available to interested parties and reviewed annually for continued suitability." },
        ],
      },
      {
        heading: "Planning: risks, opportunities and objectives",
        blocks: [
          { kind: "p", text: "Risks and opportunities arising from the context analysis and interested-party requirements are recorded in the risk register, evaluated using the scoring approach below, and treated proportionately to their significance." },
          {
            kind: "table",
            caption: "Risk scoring matrix (likelihood × consequence)",
            head: ["Score", "Band", "Treatment expectation", "Authority"],
            rows: [
              ["1–4", "Low", "Monitor; no additional control required", "Process owner"],
              ["5–9", "Medium", "Controls reviewed; action plan where cost-effective", "Process owner"],
              ["10–16", "High", "Formal treatment plan with target date", "Quality Manager"],
              ["17–25", "Extreme", "Immediate action; escalate to top management", "Top management"],
            ],
          },
          { kind: "p", text: "Quality objectives are established at relevant functions and levels, are measurable, resourced, assigned, monitored and updated. Progress is reported at management review." },
        ],
      },
      {
        heading: "Support: resources, competence and documented information",
        blocks: [
          { kind: "bullets", items: [
            "People: staffing levels are planned against workload; competence requirements are defined per role.",
            "Infrastructure and environment: premises, equipment, utilities and IT are maintained under planned maintenance.",
            "Monitoring and measuring resources: calibrated or verified against traceable standards and recorded.",
            "Organisational knowledge: lessons learned, technical know-how and process knowledge are captured and retained.",
            "Communication: internal and external communication topics, timing, audience and channel are defined.",
          ] },
          { kind: "p", text: "Documented information is controlled for approval, review, version, distribution, access, retention and disposition. Obsolete documents are withdrawn from use and marked accordingly." },
        ],
      },
      {
        heading: "Operation",
        blocks: [
          { kind: "steps", items: [
            "Determine requirements for products and services, including customer, statutory and regulatory obligations.",
            "Review requirements before commitment and record the outcome, including changes.",
            "Plan and control design and development where applicable, with defined stages, reviews, verification and validation.",
            "Control externally provided processes, products and services, including supplier criteria and verification.",
            "Control production and service provision: documented criteria, suitable resources, monitoring, competence and release authority.",
            "Identify and trace outputs, protect property belonging to customers or external providers, and preserve outputs.",
            "Control nonconforming outputs by correction, segregation, return, suspension or concession under authority.",
          ] },
        ],
      },
      {
        heading: "Performance evaluation",
        blocks: [
          { kind: "p", text: "The organisation determines what needs to be monitored and measured, the methods used, when the measurement is performed, and when results are analysed and evaluated. Customer perception is monitored through surveys, complaints, returns and review meetings." },
          { kind: "p", text: "Internal audits are conducted at planned intervals against a risk-based programme covering all processes and clauses over each certification cycle. Management review is held at least annually and addresses all required inputs, producing decisions on improvement, change and resource needs." },
        ],
      },
      {
        heading: "Improvement",
        blocks: [
          { kind: "p", text: "Nonconformities are reacted to, controlled and corrected; consequences are dealt with; the need to eliminate causes is evaluated through root-cause analysis; corrective actions are implemented and their effectiveness reviewed. Opportunities for improvement are identified from audits, analysis, customer feedback and management review, and are prioritised against business benefit." },
        ],
      },
    ],
  },
  {
    slug: "isms-policy-27001",
    name: "Information Security Policy Set (ISMS)",
    standard: "ISO/IEC 27001:2022",
    price: 165,
    complexity: "Complex",
    format: "DOCX + PDF",
    summary:
      "Top-level ISMS policy plus supporting topic policies, Annex A control mapping, risk treatment methodology and Statement of Applicability structure.",
    purpose:
      "To establish top management's direction for information security, define the ISMS scope and risk approach, and set the mandatory topic-specific policies required by ISO/IEC 27001:2022 and its Annex A controls.",
    scopeStatement:
      "This policy set applies to all information assets, personnel, contractors, systems, cloud services and facilities within the ISMS scope, and to all processing of information owned by or entrusted to the organisation.",
    clauseMap: [
      ["4 / 5", "Context and leadership", "Sections 1–2"],
      ["6", "Planning and risk treatment", "Section 3"],
      ["7 / 8", "Support and operation", "Sections 4–6"],
      ["9 / 10", "Evaluation and improvement", "Sections 7–8"],
      ["Annex A 5", "Organisational controls", "Sections 2–5"],
      ["Annex A 6", "People controls", "Section 4"],
      ["Annex A 7", "Physical controls", "Section 5"],
      ["Annex A 8", "Technological controls", "Sections 5–6"],
    ],
    roles: [
      ["Top management", "Approves policy, accepts residual risk, allocates resources", "Risk acceptance authority"],
      ["Information Security Officer", "Operates the ISMS, risk register, SoA and awareness programme", "System owner"],
      ["Asset / system owners", "Classify assets, define access, approve changes", "Access recertification"],
      ["All users", "Comply with acceptable-use rules and report incidents without delay", "Annual attestation"],
    ],
    kpis: [
      ["Security incidents (high severity)", "0 per quarter", "Monthly", "ISO"],
      ["Phishing simulation failure rate", "< 5%", "Quarterly", "ISO"],
      ["Critical patches applied within SLA", "≥ 98% in 14 days", "Monthly", "IT"],
      ["Access recertification completed", "100% per cycle", "Bi-annual", "System owners"],
      ["Risk treatment actions overdue", "0", "Monthly", "ISO"],
    ],
    records: [
      ["Risk assessment and treatment plan", "ISO", "3 years", "ISMS repository"],
      ["Statement of Applicability", "ISO", "Current + 3 versions", "ISMS repository"],
      ["Incident register and post-incident reviews", "ISO", "3 years", "Incident system"],
      ["Access review evidence", "System owners", "3 years", "Identity system"],
      ["Awareness training records", "HR", "3 years", "LMS"],
    ],
    definitions: [
      ["Information asset", "Any data, system, service or media that has value to the organisation."],
      ["CIA", "Confidentiality, integrity and availability — the three security properties protected by the ISMS."],
      ["SoA", "Statement of Applicability — the controlled record of Annex A controls applied, justified or excluded."],
    ],
    body: [
      {
        heading: "Information security policy statement",
        blocks: [
          { kind: "callout", title: "Policy commitment", text: "The organisation protects the confidentiality, integrity and availability of information it holds, processes or transmits. It complies with applicable legal, regulatory and contractual security obligations, manages information risk to accepted levels, and continually improves the ISMS. Breach of this policy may result in disciplinary or contractual action." },
          { kind: "p", text: "This policy is approved by top management, communicated to all personnel and relevant external parties, and reviewed at least annually or after any significant incident or change." },
        ],
      },
      {
        heading: "Scope, boundaries and interfaces",
        blocks: [
          { kind: "p", text: "The ISMS scope is defined by organisational units, locations, information systems and cloud services listed on the cover page. Interfaces and dependencies on external providers — including hosting, SaaS, payroll and managed IT — are documented and covered by contractual security requirements." },
          { kind: "bullets", items: [
            "In scope: corporate information systems, client data processing, employee data, physical offices and remote working.",
            "Interfaces: cloud hosting, managed service providers, customer-supplied environments.",
            "Exclusions: any system explicitly excluded is justified in the Statement of Applicability.",
          ] },
        ],
      },
      {
        heading: "Risk assessment and treatment methodology",
        blocks: [
          { kind: "p", text: "Information security risks are identified against assets, threats and vulnerabilities, evaluated for impact on confidentiality, integrity and availability, and treated by modification, avoidance, sharing or informed acceptance. Residual risk is accepted in writing by the risk owner." },
          {
            kind: "table",
            caption: "Impact scale",
            head: ["Level", "Impact", "Illustrative consequence"],
            rows: [
              ["1", "Insignificant", "No operational or regulatory effect"],
              ["2", "Minor", "Short outage; internal effort only"],
              ["3", "Moderate", "Customer-visible disruption; contractual concern"],
              ["4", "Major", "Personal data breach; regulatory notification"],
              ["5", "Severe", "Sustained outage, material loss or loss of certification"],
            ],
          },
          { kind: "p", text: "The Statement of Applicability records every Annex A control, whether it is applied, the justification for inclusion or exclusion, and its implementation status. It is maintained under version control and reviewed with each risk assessment cycle." },
        ],
      },
      {
        heading: "People and access control",
        blocks: [
          { kind: "bullets", items: [
            "Screening proportionate to role sensitivity is performed before employment, subject to law.",
            "Terms of employment include information security responsibilities and confidentiality obligations.",
            "Access is granted on least privilege and need-to-know, formally approved by the asset owner.",
            "Privileged access is separately identified, restricted, logged and reviewed at least quarterly.",
            "Access is revoked on the last working day for leavers and adjusted immediately on role change.",
            "Multi-factor authentication is required for remote, administrative and cloud-console access.",
          ] },
        ],
      },
      {
        heading: "Acceptable use, classification and asset handling",
        blocks: [
          {
            kind: "table",
            caption: "Classification and handling rules",
            head: ["Classification", "Examples", "Storage", "Sharing"],
            rows: [
              ["Public", "Marketing material", "Any approved system", "No restriction"],
              ["Internal", "Procedures, internal reports", "Corporate systems only", "Internal recipients"],
              ["Confidential", "Client data, contracts, HR files", "Access-controlled repositories", "Named recipients; encrypted transfer"],
              ["Restricted", "Credentials, security designs, special-category data", "Encrypted, logged repositories", "Owner approval per instance"],
            ],
          },
          { kind: "p", text: "Removable media, printing, personal devices and public cloud storage are permitted only where explicitly authorised. Assets are recorded in the asset inventory with an assigned owner and are returned or securely disposed of at end of life." },
        ],
      },
      {
        heading: "Operations, cryptography and supplier security",
        blocks: [
          { kind: "bullets", items: [
            "Change management: security impact assessed and approved before production change.",
            "Malware protection, logging, monitoring and time synchronisation applied to all endpoints and servers.",
            "Vulnerability management: scanning at defined intervals, remediation SLAs by severity.",
            "Backup: defined schedule, encryption, offsite copy and periodic restore testing.",
            "Cryptography: TLS in transit, encryption at rest for confidential and restricted data, documented key management.",
            "Suppliers: security requirements in contracts, due diligence before onboarding, periodic reassessment.",
          ] },
        ],
      },
      {
        heading: "Incident management and continuity",
        blocks: [
          { kind: "steps", items: [
            "Report — any suspected event is reported to the Information Security Officer immediately.",
            "Triage — severity assigned; containment actions authorised.",
            "Contain and eradicate — isolate affected systems and remove the cause.",
            "Recover — restore service, verify integrity and monitor for recurrence.",
            "Notify — assess regulatory and contractual notification duties within statutory deadlines.",
            "Review — root-cause analysis, lessons learned and control improvement recorded.",
          ] },
          { kind: "p", text: "Business continuity and ICT readiness arrangements define recovery time and recovery point objectives for in-scope services and are tested at planned intervals." },
        ],
      },
      {
        heading: "Compliance, evaluation and improvement",
        blocks: [
          { kind: "p", text: "Legal, statutory, regulatory and contractual requirements — including data-protection obligations — are identified and maintained in the compliance register. Internal audits, technical compliance reviews and management review verify continued effectiveness, and nonconformities are addressed through corrective action." },
        ],
      },
    ],
  },
  {
    slug: "internal-audit-procedure",
    name: "Internal Audit Procedure and Programme",
    standard: "ISO 19011:2018 aligned",
    price: 79,
    complexity: "Standard",
    format: "DOCX + PDF",
    summary:
      "End-to-end audit procedure: risk-based programme, auditor competence, checklists, grading of findings, reporting and corrective-action follow-up.",
    purpose:
      "To define how internal audits of the management system are planned, conducted, reported and followed up so that conformity, effectiveness and improvement opportunities are determined objectively.",
    scopeStatement:
      "This procedure applies to all internal audits of the management system, covering every process, function, site and clause of the applicable standard across each certification cycle.",
    clauseMap: [
      ["9.2", "Internal audit", "Sections 1–6"],
      ["10.2", "Nonconformity and corrective action", "Section 6"],
      ["7.2", "Competence of auditors", "Section 2"],
      ["7.5", "Documented information / records", "Records schedule"],
    ],
    roles: [
      ["Audit programme manager", "Owns the annual programme, assigns auditors, monitors closure", "Quality/Compliance Manager"],
      ["Lead auditor", "Plans, opens, conducts and reports the audit", "Competence evidenced"],
      ["Auditee process owner", "Provides access and evidence, agrees actions and dates", "Accountable for closure"],
      ["Top management", "Reviews audit results at management review", "Resource decisions"],
    ],
    kpis: [
      ["Programme completion", "100% by year end", "Quarterly", "Programme manager"],
      ["Audits conducted on plan date", "≥ 90%", "Quarterly", "Programme manager"],
      ["Findings closed within agreed date", "≥ 90%", "Monthly", "Process owners"],
      ["Repeat findings", "0 per cycle", "Annual", "Programme manager"],
    ],
    records: [
      ["Annual audit programme", "Programme manager", "3 years", "Controlled drive"],
      ["Audit plans and checklists", "Lead auditor", "3 years", "Audit file"],
      ["Audit reports", "Programme manager", "3 years", "Audit file"],
      ["Nonconformity and corrective action forms", "Process owners", "3 years", "CAPA register"],
      ["Auditor competence records", "HR / Programme manager", "Duration + 3 years", "HR system"],
    ],
    definitions: [
      ["Audit criteria", "The set of requirements used as a reference against which objective evidence is compared."],
      ["Objective evidence", "Data supporting the existence or verity of something — records, statements of fact, observations."],
      ["Major nonconformity", "Absence or total breakdown of a required arrangement, or a finding that raises significant doubt about capability."],
      ["Minor nonconformity", "A single lapse in an otherwise effective arrangement."],
    ],
    body: [
      {
        heading: "Audit programme planning",
        blocks: [
          { kind: "p", text: "The audit programme is established annually and is risk-based: processes with higher risk, recent change, poor performance or previous findings are audited more frequently. Every process and clause is covered at least once per certification cycle." },
          {
            kind: "table",
            caption: "Annual audit programme (template)",
            head: ["Process / area", "Criteria", "Frequency", "Quarter", "Lead auditor"],
            rows: [
              ["Leadership and management review", "Clause 5, 9.3", "Annual", "Q4", "—"],
              ["Operations / service delivery", "Clause 8", "Bi-annual", "Q1, Q3", "—"],
              ["Procurement and external providers", "Clause 8.4", "Annual", "Q2", "—"],
              ["HR and competence", "Clause 7.2", "Annual", "Q2", "—"],
              ["Improvement, NC and CAPA", "Clause 10", "Annual", "Q4", "—"],
            ],
          },
        ],
      },
      {
        heading: "Auditor competence and impartiality",
        blocks: [
          { kind: "bullets", items: [
            "Auditors are trained in the applicable standard and in audit technique, with competence evidenced by certificate or supervised audit log.",
            "Auditors do not audit their own work; where independence is impossible, review by a second person is documented.",
            "Behaviour expectations: ethical conduct, fair presentation, due professional care, confidentiality, independence and evidence-based approach.",
          ] },
        ],
      },
      {
        heading: "Audit preparation",
        blocks: [
          { kind: "steps", items: [
            "Confirm objectives, scope and criteria with the audit programme manager.",
            "Review previous reports, findings, KPIs and process documentation.",
            "Prepare a checklist with sampling plan and evidence to be requested.",
            "Issue the audit plan to the auditee at least five working days in advance.",
          ] },
        ],
      },
      {
        heading: "Conducting the audit",
        blocks: [
          { kind: "p", text: "The audit begins with an opening meeting confirming scope, method, timing and reporting arrangements. Evidence is gathered through interview, observation and record sampling, and is verified before a finding is raised. Findings are discussed with the auditee as they arise so there are no surprises at closing." },
        ],
      },
      {
        heading: "Grading and reporting findings",
        blocks: [
          {
            kind: "table",
            caption: "Finding categories and response times",
            head: ["Category", "Definition", "Correction due", "Root cause / CAPA due"],
            rows: [
              ["Major NC", "Systemic breakdown or absence of a required arrangement", "5 working days", "30 days"],
              ["Minor NC", "Isolated lapse against a requirement", "20 working days", "45 days"],
              ["Observation", "Conformant but at risk of becoming a nonconformity", "—", "Considered at review"],
              ["Opportunity for improvement", "Potential to improve efficiency or effectiveness", "—", "Optional"],
            ],
          },
          { kind: "p", text: "The report is issued within ten working days of the closing meeting and states audit objective, scope, criteria, team, evidence sampled, findings by category, positive observations and conclusion on system effectiveness." },
        ],
      },
      {
        heading: "Corrective action and follow-up",
        blocks: [
          { kind: "steps", items: [
            "Auditee proposes correction, root cause and corrective action with owner and target date.",
            "Lead auditor reviews the adequacy of root-cause analysis before acceptance.",
            "Evidence of implementation is submitted by the target date.",
            "Effectiveness is verified — by desktop review for minor findings, by follow-up audit for major findings.",
            "The finding is closed in the CAPA register; overdue items are escalated to top management.",
          ] },
        ],
      },
    ],
  },
  {
    slug: "risk-register-31000",
    name: "Risk Management Framework and Register",
    standard: "ISO 31000:2018",
    price: 129,
    complexity: "Complex",
    format: "DOCX + PDF",
    summary:
      "Risk framework, appetite statement, 5×5 scoring matrix, treatment planning, escalation thresholds and a fully structured register with worked entries.",
    purpose:
      "To establish a consistent, organisation-wide approach to identifying, analysing, evaluating, treating, monitoring and reporting risk in line with the principles and framework of ISO 31000:2018.",
    scopeStatement:
      "This framework applies to strategic, operational, financial, compliance, information-security, health-and-safety and environmental risk across all functions, projects and sites.",
    clauseMap: [
      ["4", "Principles", "Section 1"],
      ["5", "Framework — leadership and integration", "Sections 1–2"],
      ["6.3", "Scope, context and criteria", "Section 2"],
      ["6.4", "Risk assessment", "Sections 3–4"],
      ["6.5", "Risk treatment", "Section 5"],
      ["6.6 / 6.7", "Monitoring, review and reporting", "Sections 6–7"],
    ],
    roles: [
      ["Board / top management", "Sets risk appetite, accepts extreme and high residual risk", "Quarterly review"],
      ["Risk owner", "Accountable for a specific risk and its treatment plan", "Named per entry"],
      ["Risk coordinator", "Maintains the register, facilitates workshops, reports trends", "Compliance function"],
      ["Process owners", "Identify and escalate emerging risks in their area", "Continuous"],
    ],
    kpis: [
      ["Register reviewed on schedule", "100%", "Quarterly", "Risk coordinator"],
      ["Extreme risks with active treatment plan", "100%", "Monthly", "Risk owners"],
      ["Overdue treatment actions", "0", "Monthly", "Risk coordinator"],
      ["Risks realised without prior identification", "0", "Annual", "Top management"],
    ],
    records: [
      ["Risk register (current version)", "Risk coordinator", "Live + 3 years of versions", "Controlled register"],
      ["Risk workshop notes", "Risk coordinator", "3 years", "Controlled drive"],
      ["Treatment plans and evidence", "Risk owners", "3 years", "Action tracker"],
      ["Risk acceptance approvals", "Top management", "5 years", "Board pack"],
    ],
    definitions: [
      ["Risk", "The effect of uncertainty on objectives — a deviation from the expected, positive or negative."],
      ["Inherent risk", "The level of risk before treatment or controls are considered."],
      ["Residual risk", "The level of risk remaining after treatment and existing controls."],
      ["Risk appetite", "The amount and type of risk the organisation is willing to pursue or retain."],
    ],
    body: [
      {
        heading: "Framework, principles and integration",
        blocks: [
          { kind: "p", text: "Risk management is integrated into governance, strategy and day-to-day operations rather than treated as a standalone exercise. It is structured, comprehensive, customised to context, inclusive of stakeholders, dynamic, based on the best available information, and subject to continual improvement." },
          { kind: "callout", title: "Risk appetite statement", text: "The organisation accepts measured commercial and innovation risk in pursuit of growth, but has a low appetite for risks affecting personnel safety, regulatory compliance, client confidentiality and certification status. Risks scoring in the Extreme band are never knowingly retained without documented board approval." },
        ],
      },
      {
        heading: "Scope, context and risk criteria",
        blocks: [
          { kind: "p", text: "Context is established from the internal and external issues affecting objectives, the requirements of interested parties, and the obligations to which the organisation subscribes. Criteria for evaluating significance are set out below and reviewed annually." },
          {
            kind: "table",
            caption: "Likelihood scale",
            head: ["Level", "Descriptor", "Indicative frequency"],
            rows: [
              ["1", "Rare", "May occur in exceptional circumstances (< once in 10 years)"],
              ["2", "Unlikely", "Could occur at some time (once in 5–10 years)"],
              ["3", "Possible", "Might occur at some time (once in 2–5 years)"],
              ["4", "Likely", "Will probably occur (annually)"],
              ["5", "Almost certain", "Expected to occur (multiple times per year)"],
            ],
          },
          {
            kind: "table",
            caption: "Consequence scale",
            head: ["Level", "Financial", "Operational", "Compliance / reputation"],
            rows: [
              ["1 Insignificant", "< 0.5% of revenue", "No disruption", "Internal note only"],
              ["2 Minor", "0.5–2%", "Short, contained disruption", "Customer complaint"],
              ["3 Moderate", "2–5%", "Multi-day disruption", "Regulator informed"],
              ["4 Major", "5–10%", "Key service unavailable", "Enforcement action; media interest"],
              ["5 Severe", "> 10%", "Business-critical failure", "Loss of licence or certification"],
            ],
          },
        ],
      },
      {
        heading: "Risk identification",
        blocks: [
          { kind: "bullets", items: [
            "Facilitated workshops per function, at least annually.",
            "Process-level review during internal audit and management review.",
            "Incident, complaint, near-miss and nonconformity analysis.",
            "Horizon scanning: regulatory change, market change, technology change.",
            "Project and change initiation — every material change requires a risk assessment.",
          ] },
        ],
      },
      {
        heading: "Analysis, evaluation and banding",
        blocks: [
          {
            kind: "table",
            caption: "Evaluation bands and escalation",
            head: ["Score (L × C)", "Band", "Escalation", "Review frequency"],
            rows: [
              ["1–4", "Low", "Process owner", "Annual"],
              ["5–9", "Medium", "Function head", "Bi-annual"],
              ["10–16", "High", "Top management", "Quarterly"],
              ["17–25", "Extreme", "Board — immediate", "Monthly"],
            ],
          },
        ],
      },
      {
        heading: "Risk treatment planning",
        blocks: [
          { kind: "bullets", items: [
            "Avoid — do not start or discontinue the activity generating the risk.",
            "Reduce — modify likelihood or consequence through additional controls.",
            "Share — transfer through insurance, contract or partnership.",
            "Accept — retain by informed decision, recorded with rationale and approver.",
            "Pursue — take the risk to seize an opportunity, with defined limits.",
          ] },
          {
            kind: "table",
            caption: "Risk register structure (worked example rows)",
            head: ["Ref", "Risk description", "Owner", "Inherent", "Controls", "Residual", "Treatment / due"],
            rows: [
              ["R-01", "Loss of key client concentration > 30% of revenue", "MD", "16 High", "Diversification plan, account governance", "9 Medium", "New-market pipeline / Q4"],
              ["R-02", "Data breach of client information", "ISO", "20 Extreme", "Access control, encryption, awareness, MFA", "8 Medium", "Annual pen test / Q3"],
              ["R-03", "Key person dependency in technical delivery", "Ops Director", "12 High", "Cross-training, documented procedures", "6 Medium", "Succession plan / Q2"],
              ["R-04", "Regulatory change in a served market", "Compliance", "9 Medium", "Legal register, subscription alerts", "4 Low", "Quarterly horizon scan"],
            ],
          },
        ],
      },
      {
        heading: "Monitoring and review",
        blocks: [
          { kind: "p", text: "The register is a living record. Risk owners update status ahead of each review cycle; the risk coordinator reports movement, new entries, closures and overdue actions. Trends and top risks form a standing management review input." },
        ],
      },
      {
        heading: "Reporting and assurance",
        blocks: [
          { kind: "p", text: "Reporting distinguishes inherent from residual risk, states control effectiveness, and identifies where residual exposure exceeds appetite. Assurance over key controls is obtained through internal audit, management review and, where appropriate, independent testing." },
        ],
      },
    ],
  },
  {
    slug: "ohs-manual-45001",
    name: "Occupational Health & Safety Manual",
    standard: "ISO 45001:2018",
    price: 155,
    complexity: "Complex",
    format: "DOCX + PDF",
    summary:
      "OH&S management system manual with hazard identification methodology, hierarchy of controls, worker participation, emergency response and incident investigation.",
    purpose:
      "To provide safe and healthy workplaces, prevent work-related injury and ill health, and continually improve OH&S performance in conformity with ISO 45001:2018 and applicable legal requirements.",
    scopeStatement:
      "This manual applies to all workers — including employees, contractors, agency staff and visitors — and to all activities, workplaces and equipment under the organisation's control.",
    clauseMap: [
      ["4", "Context and scope", "Section 1"],
      ["5.4", "Consultation and participation of workers", "Section 2"],
      ["6.1.2", "Hazard identification and risk assessment", "Section 3"],
      ["6.1.3", "Legal and other requirements", "Section 4"],
      ["8.1.2", "Eliminating hazards / hierarchy of controls", "Section 3"],
      ["8.2", "Emergency preparedness and response", "Section 5"],
      ["10.2", "Incident, nonconformity and corrective action", "Section 6"],
    ],
    roles: [
      ["Top management", "Overall accountability for OH&S, policy and resources", "Prevents reprisal for reporting"],
      ["OH&S Manager", "Maintains the system, risk assessments, legal register and training", "Competent person"],
      ["Line managers / supervisors", "Implement controls, brief workers, supervise safe working", "Daily"],
      ["Safety committee / worker reps", "Consultation, inspection participation, incident review", "Non-managerial workers"],
      ["All workers", "Work safely, use controls and PPE, report hazards and incidents", "Duty of care"],
    ],
    kpis: [
      ["Lost time injury frequency rate", "0", "Monthly", "OH&S Manager"],
      ["Near-miss reports submitted", "≥ 10 per quarter (leading indicator)", "Monthly", "Supervisors"],
      ["Risk assessments reviewed on schedule", "100%", "Quarterly", "OH&S Manager"],
      ["Toolbox talks delivered", "≥ 1 per team per month", "Monthly", "Supervisors"],
      ["Emergency drills completed", "≥ 2 per year per site", "Annual", "OH&S Manager"],
    ],
    records: [
      ["Risk assessments and method statements", "OH&S Manager", "5 years after superseded", "OH&S file"],
      ["Incident and near-miss reports", "OH&S Manager", "Statutory minimum, min 5 years", "Incident register"],
      ["Training and induction records", "HR", "Duration + 5 years", "HR system"],
      ["Statutory inspection certificates", "Facilities", "Life of asset", "Asset file"],
      ["Consultation and committee minutes", "OH&S Manager", "3 years", "Controlled drive"],
    ],
    definitions: [
      ["Hazard", "Source with a potential to cause injury and ill health."],
      ["Incident", "Occurrence arising out of or in the course of work that could or does result in injury and ill health."],
      ["Worker", "Person performing work under the control of the organisation, including contractors and agency staff."],
    ],
    body: [
      {
        heading: "OH&S policy and commitment",
        blocks: [
          { kind: "callout", title: "OH&S policy statement", text: "The organisation is committed to providing safe and healthy working conditions for the prevention of work-related injury and ill health; to eliminating hazards and reducing OH&S risks; to fulfilling legal and other requirements; to consultation and participation of workers and their representatives; and to continual improvement of the OH&S management system." },
        ],
      },
      {
        heading: "Worker consultation and participation",
        blocks: [
          { kind: "bullets", items: [
            "Non-managerial workers are consulted on hazard identification, control selection, incident investigation and training needs.",
            "A safety committee meets quarterly with documented minutes and actions.",
            "Barriers to participation — language, literacy, fear of reprisal, shift patterns — are actively identified and removed.",
            "A no-blame reporting culture is enforced; no worker is penalised for reporting a hazard, incident or unsafe condition.",
          ] },
        ],
      },
      {
        heading: "Hazard identification, risk assessment and control",
        blocks: [
          { kind: "p", text: "Hazards are identified proactively across routine and non-routine activities, emergency situations, human factors, changes and previous incidents. Risk is assessed and controls selected strictly in accordance with the hierarchy below — personal protective equipment is the last resort, never the first answer." },
          {
            kind: "table",
            caption: "Hierarchy of controls",
            head: ["Rank", "Control", "Example"],
            rows: [
              ["1", "Elimination", "Remove the task or hazardous substance entirely"],
              ["2", "Substitution", "Replace with a less hazardous material or method"],
              ["3", "Engineering controls", "Guarding, ventilation, isolation, edge protection"],
              ["4", "Administrative controls", "Permits to work, rotation, signage, training, supervision"],
              ["5", "PPE", "Helmets, gloves, respiratory and hearing protection"],
            ],
          },
          {
            kind: "table",
            caption: "Risk assessment register structure",
            head: ["Activity", "Hazard", "Who is harmed", "Existing controls", "Residual rating", "Further action"],
            rows: [
              ["Manual handling", "Musculoskeletal injury", "Warehouse staff", "Training, mechanical aids", "Low", "Refresher training annually"],
              ["Working at height", "Fall from height", "Maintenance", "Permit, harness, edge protection", "Medium", "Quarterly equipment inspection"],
              ["Electrical maintenance", "Electric shock", "Technicians", "Isolation, lock-out/tag-out, competence", "Low", "LOTO audit"],
              ["Driving on company business", "Road traffic collision", "All drivers", "Licence checks, journey planning", "Medium", "Fatigue policy review"],
            ],
          },
        ],
      },
      {
        heading: "Legal and other requirements",
        blocks: [
          { kind: "p", text: "Applicable OH&S legislation, regulations, permits, codes of practice and contractual obligations are recorded in the legal register with the responsible owner and the means of demonstrating compliance. The register is reviewed at least quarterly and compliance is evaluated at planned intervals." },
        ],
      },
      {
        heading: "Emergency preparedness and response",
        blocks: [
          { kind: "steps", items: [
            "Identify credible emergency scenarios per site — fire, medical, chemical release, security threat, natural hazard.",
            "Document response plans with roles, muster points, escalation and external services contacts.",
            "Provide equipment, first-aiders, marshals and communication arrangements.",
            "Train workers and brief visitors and contractors on arrival.",
            "Test through drills at least twice per year, record the outcome and improve the plan.",
          ] },
        ],
      },
      {
        heading: "Incident investigation and improvement",
        blocks: [
          { kind: "p", text: "All incidents, including near misses, are reported before end of shift. Investigation depth is proportionate to actual or potential severity, uses a structured root-cause method, and considers system and human factors rather than individual blame. Statutory reporting duties are assessed for every reportable event, and lessons learned are communicated across all sites." },
        ],
      },
    ],
  },
  {
    slug: "environmental-manual-14001",
    name: "Environmental Management System Manual",
    standard: "ISO 14001:2015",
    price: 149,
    complexity: "Complex",
    format: "DOCX + PDF",
    summary:
      "EMS manual with life-cycle aspects and impacts methodology, significance scoring, compliance obligations, objectives programme and emergency response.",
    purpose:
      "To manage environmental responsibilities systematically, protect the environment, fulfil compliance obligations and enhance environmental performance in conformity with ISO 14001:2015.",
    scopeStatement:
      "This manual applies to all activities, products and services under the organisation's control or influence, considering a life-cycle perspective from procurement through delivery to end-of-life.",
    clauseMap: [
      ["4", "Context and scope", "Section 1"],
      ["5.2", "Environmental policy", "Section 1"],
      ["6.1.2", "Environmental aspects", "Section 2"],
      ["6.1.3", "Compliance obligations", "Section 3"],
      ["6.2", "Objectives and planning", "Section 4"],
      ["8.1", "Operational planning and control", "Section 5"],
      ["8.2", "Emergency preparedness and response", "Section 6"],
      ["9.1", "Monitoring, measurement and evaluation of compliance", "Section 7"],
    ],
    roles: [
      ["Top management", "Policy, resources, accountability for EMS effectiveness", "Management review"],
      ["Environmental Manager", "Aspects register, compliance obligations, monitoring, reporting", "System owner"],
      ["Site / operations managers", "Implement operational controls and waste segregation", "Daily"],
      ["Procurement", "Apply environmental criteria to suppliers and materials", "Life-cycle influence"],
    ],
    kpis: [
      ["Energy intensity (kWh per unit output)", "−5% year on year", "Monthly", "Operations"],
      ["Waste diverted from landfill", "≥ 80%", "Monthly", "Environmental Manager"],
      ["Water consumption", "−3% year on year", "Monthly", "Facilities"],
      ["Reportable environmental incidents", "0", "Monthly", "Environmental Manager"],
      ["Compliance obligations evaluated on schedule", "100%", "Quarterly", "Environmental Manager"],
    ],
    records: [
      ["Environmental aspects and impacts register", "Environmental Manager", "3 years", "EMS repository"],
      ["Compliance obligations register and evaluations", "Environmental Manager", "5 years", "EMS repository"],
      ["Waste transfer and consignment notes", "Facilities", "Statutory (min 3 years)", "Waste file"],
      ["Monitoring data (energy, water, emissions)", "Facilities", "3 years", "Utilities log"],
      ["Emergency drill and incident reports", "Environmental Manager", "3 years", "EMS repository"],
    ],
    definitions: [
      ["Environmental aspect", "Element of activities, products or services that interacts or can interact with the environment."],
      ["Environmental impact", "Change to the environment, adverse or beneficial, resulting wholly or partially from an aspect."],
      ["Compliance obligation", "Legal requirements and other requirements to which the organisation subscribes."],
    ],
    body: [
      {
        heading: "Environmental policy and context",
        blocks: [
          { kind: "callout", title: "Environmental policy statement", text: "The organisation is committed to protecting the environment, including prevention of pollution and sustainable resource use; to fulfilling its compliance obligations; and to continual improvement of the EMS to enhance environmental performance. The policy provides the framework for setting environmental objectives and is available to interested parties." },
          { kind: "p", text: "Context includes climate-related conditions, resource availability, community expectations, and applicable regulatory regimes in every country of operation." },
        ],
      },
      {
        heading: "Environmental aspects and impacts",
        blocks: [
          { kind: "p", text: "Aspects are identified across normal, abnormal and emergency conditions with a life-cycle perspective. Significance is determined using severity, scale, likelihood, regulatory interest and interested-party concern; significant aspects drive operational controls and objectives." },
          {
            kind: "table",
            caption: "Aspects and impacts register (worked entries)",
            head: ["Activity", "Aspect", "Impact", "Condition", "Significance", "Control"],
            rows: [
              ["Facility operation", "Electricity consumption", "Resource depletion, GHG emissions", "Normal", "Significant", "Energy monitoring, efficiency programme"],
              ["Production / service", "General and hazardous waste", "Land contamination", "Normal", "Significant", "Segregation, licensed carriers, audits"],
              ["Fleet / travel", "Fuel combustion", "Air emissions, GHG", "Normal", "Significant", "Route planning, remote delivery, vehicle standards"],
              ["Chemical storage", "Spill to drain", "Water pollution", "Emergency", "Significant", "Bunding, spill kits, drills"],
              ["Procurement", "Embedded impact of supplies", "Upstream resource use", "Normal", "Moderate", "Supplier environmental criteria"],
            ],
          },
        ],
      },
      {
        heading: "Compliance obligations",
        blocks: [
          { kind: "p", text: "Legal and other requirements — permits, consents, discharge limits, waste duty of care, producer responsibility and customer requirements — are recorded with their applicability, owner and evaluation method. Compliance is evaluated at planned intervals and the status is reported at management review." },
        ],
      },
      {
        heading: "Objectives and improvement programme",
        blocks: [
          {
            kind: "table",
            caption: "Environmental objectives programme (template)",
            head: ["Objective", "Target", "Actions", "Resources", "Owner", "Due"],
            rows: [
              ["Reduce electricity use", "−5% per unit output", "LED retrofit, HVAC scheduling, sub-metering", "Capital budget", "Facilities", "12 months"],
              ["Increase landfill diversion", "≥ 80%", "Segregation points, staff training, carrier review", "Operating budget", "Environmental Manager", "9 months"],
              ["Reduce travel emissions", "−20% consultant travel", "Prioritise remote delivery mode", "None", "Operations", "12 months"],
            ],
          },
        ],
      },
      {
        heading: "Operational control and life cycle",
        blocks: [
          { kind: "bullets", items: [
            "Documented operating criteria for activities linked to significant aspects.",
            "Environmental requirements communicated to suppliers and contractors, including on-site rules.",
            "Design and procurement decisions consider durability, energy use, recyclability and end-of-life.",
            "Information on transport, use and end-of-life treatment provided to customers where relevant.",
          ] },
        ],
      },
      {
        heading: "Emergency preparedness and response",
        blocks: [
          { kind: "steps", items: [
            "Identify potential environmental emergencies — spill, fire, uncontrolled discharge, containment failure.",
            "Define response actions, containment equipment locations and notification duties to regulators.",
            "Train responders and test the plan through drills at planned intervals.",
            "Review and revise plans after any incident or drill.",
          ] },
        ],
      },
      {
        heading: "Monitoring, measurement and evaluation",
        blocks: [
          { kind: "p", text: "Energy, water, waste, emissions and discharge data are collected with calibrated equipment where applicable, analysed for trend and normalised against production or headcount. Results, compliance status and objective progress are inputs to management review." },
        ],
      },
    ],
  },
  {
    slug: "fsms-manual-22000",
    name: "Food Safety Management System Manual (HACCP)",
    standard: "ISO 22000:2018",
    price: 165,
    complexity: "Complex",
    format: "DOCX + PDF",
    summary:
      "FSMS manual with prerequisite programmes, seven HACCP principles, CCP determination, critical limits, monitoring, verification, traceability and recall.",
    purpose:
      "To ensure food safety along the food chain by controlling hazards to acceptable levels at the point of consumption, in conformity with ISO 22000:2018 and applicable food law.",
    scopeStatement:
      "This manual applies to all products, processes, sites and personnel involved in the receipt, storage, preparation, processing, packing, storage and dispatch of food products within the declared scope.",
    clauseMap: [
      ["5.2", "Food safety policy", "Section 1"],
      ["5.3 / 7.2", "Food safety team and competence", "Section 2"],
      ["8.2", "Prerequisite programmes (PRPs)", "Section 3"],
      ["8.5.2", "Hazard analysis", "Section 4"],
      ["8.5.4", "Hazard control plan (HACCP/OPRP)", "Section 5"],
      ["8.3", "Traceability system", "Section 6"],
      ["8.9.5", "Withdrawal / recall", "Section 6"],
      ["8.8 / 9.2", "Verification and internal audit", "Section 7"],
    ],
    roles: [
      ["Top management", "Policy, resources, food safety culture", "Accountable"],
      ["Food Safety Team Leader", "Chairs the team, owns hazard analysis and the control plan", "HACCP trained"],
      ["Food safety team", "Multidisciplinary: production, QA, engineering, hygiene, procurement", "Documented competence"],
      ["Line operators", "Monitor CCPs, record results, apply corrections", "Trained and verified"],
    ],
    kpis: [
      ["CCP deviations", "0 per month", "Daily / monthly", "Food Safety Team Leader"],
      ["Micro results within specification", "≥ 99%", "Monthly", "QA"],
      ["Hygiene audit score", "≥ 95%", "Weekly", "Hygiene lead"],
      ["Mock recall completed within 4 hours", "100% traceability", "Bi-annual", "Team Leader"],
      ["Customer food safety complaints", "0 critical", "Monthly", "QA"],
    ],
    records: [
      ["Hazard analysis and control plan", "Team Leader", "3 years", "FSMS repository"],
      ["CCP monitoring records", "Production", "Shelf life + 1 year (min 2 years)", "Line records"],
      ["Corrective action and deviation records", "QA", "3 years", "FSMS repository"],
      ["Cleaning, pest and maintenance records", "Hygiene / Engineering", "2 years", "Site logs"],
      ["Traceability and mock recall records", "QA", "3 years", "FSMS repository"],
    ],
    definitions: [
      ["CCP", "Critical control point — a step at which control is essential to prevent or reduce a hazard to an acceptable level."],
      ["OPRP", "Operational prerequisite programme — a control measure applied to prevent or reduce a significant hazard, not managed as a CCP."],
      ["Critical limit", "A measurable value separating acceptability from unacceptability at a CCP."],
    ],
    body: [
      {
        heading: "Food safety policy and culture",
        blocks: [
          { kind: "callout", title: "Food safety policy statement", text: "The organisation is committed to producing safe, legal and authentic food; to meeting customer and statutory food safety requirements; to internal and external communication along the food chain; to maintaining a positive food safety culture; and to continually improving the FSMS with competent, trained personnel." },
        ],
      },
      {
        heading: "Food safety team and responsibilities",
        blocks: [
          { kind: "p", text: "A multidisciplinary food safety team is appointed with documented competence in HACCP, the products and processes concerned, and applicable legislation. The team leader has direct access to top management and authority to stop production where food safety is at risk." },
        ],
      },
      {
        heading: "Prerequisite programmes (PRPs)",
        blocks: [
          {
            kind: "table",
            caption: "PRP schedule",
            head: ["PRP", "Requirement", "Frequency", "Verification"],
            rows: [
              ["Cleaning and sanitation", "Documented schedule per area and equipment", "Daily / weekly", "Swabs, visual audit"],
              ["Personal hygiene", "Handwashing, PPE, health screening, jewellery rules", "Continuous", "Hygiene audit"],
              ["Pest control", "Contracted service, bait map, trend analysis", "Monthly visit", "Report review"],
              ["Maintenance", "Food-grade lubricants, planned maintenance, post-work clearance", "Planned", "Engineering sign-off"],
              ["Supplier approval", "Specification, certificate, audit or questionnaire", "Annual", "Approved supplier list"],
              ["Allergen management", "Segregation, dedicated tools, changeover cleaning, labelling check", "Per changeover", "Allergen swab"],
              ["Water and air quality", "Potable water testing, filtered air where required", "Quarterly", "Lab certificate"],
              ["Waste and drainage", "Segregation, flow direction, covered containers", "Daily", "Site audit"],
            ],
          },
        ],
      },
      {
        heading: "Hazard analysis",
        blocks: [
          { kind: "p", text: "Product descriptions, intended use, vulnerable consumer groups and verified process flow diagrams are prepared for every product family. Biological, chemical, physical, allergen and food-fraud hazards are identified at each step and assessed for severity and likelihood to determine significance." },
          {
            kind: "table",
            caption: "Hazard analysis extract",
            head: ["Step", "Hazard", "Type", "Significant?", "Control measure", "Managed as"],
            rows: [
              ["Raw material intake", "Pathogen contamination", "Biological", "Yes", "Approved supplier, COA, temperature check", "OPRP"],
              ["Metal contact steps", "Metal fragments", "Physical", "Yes", "Metal detection with reject", "CCP 1"],
              ["Thermal process", "Pathogen survival", "Biological", "Yes", "Time/temperature control", "CCP 2"],
              ["Packing", "Undeclared allergen (label error)", "Allergen", "Yes", "Label verification at line start", "CCP 3"],
              ["Chilled storage", "Pathogen growth", "Biological", "Yes", "Temperature monitoring and alarms", "OPRP"],
            ],
          },
        ],
      },
      {
        heading: "Hazard control plan — CCPs and critical limits",
        blocks: [
          {
            kind: "table",
            caption: "HACCP control plan",
            head: ["CCP", "Critical limit", "Monitoring (what/how/when/who)", "Correction", "Verification", "Record"],
            rows: [
              ["CCP 1 — Metal detection", "Detect and reject Fe 2.0 mm / non-Fe 2.5 mm / SS 3.0 mm", "Test pieces at start, every 2 h and at end — operator", "Quarantine product back to last good check; re-test", "Daily QA review; annual validation", "Metal detection log"],
              ["CCP 2 — Thermal process", "≥ 72 °C for ≥ 2 minutes core", "Continuous probe with datalogger — operator verifies each batch", "Reprocess or reject batch; investigate", "Weekly probe calibration; chart review", "Cook record"],
              ["CCP 3 — Label verification", "Correct label, allergen declaration and date code", "Line-start and changeover check — supervisor", "Hold and re-label; check stock already packed", "Daily QA audit", "Label check sheet"],
            ],
          },
        ],
      },
      {
        heading: "Traceability, withdrawal and recall",
        blocks: [
          { kind: "steps", items: [
            "Assign a unique lot code to every batch, linking raw materials, packaging, process records and dispatch.",
            "Maintain one-step-back and one-step-forward traceability retrievable within four hours.",
            "Convene the incident team on any suspected unsafe product; assess and decide on hold, withdrawal or recall.",
            "Notify customers and the competent authority within statutory deadlines.",
            "Reconcile quantities produced, dispatched and recovered.",
            "Conduct root-cause analysis and a mock recall exercise at least twice per year.",
          ] },
        ],
      },
      {
        heading: "Verification, validation and improvement",
        blocks: [
          { kind: "p", text: "Control measures are validated before implementation to confirm capability. Verification activities — record review, product testing, environmental monitoring, internal audits and mock recalls — confirm ongoing effectiveness. Results are analysed and fed into FSMS updating and management review." },
        ],
      },
    ],
  },
  {
    slug: "management-review-pack",
    name: "Management Review Pack",
    standard: "All ISO management systems (clause 9.3)",
    price: 59,
    complexity: "Standard",
    format: "DOCX + PDF",
    summary:
      "Agenda, structured input pack, decision log and minutes template that satisfy clause 9.3 inputs and outputs for any ISO management system.",
    purpose:
      "To provide a complete, audit-proof structure for management review so that all clause 9.3 inputs are considered and all required outputs — decisions on improvement, change and resources — are recorded.",
    scopeStatement:
      "This pack applies to the periodic management review of the organisation's management system(s), held at least annually and chaired by top management.",
    clauseMap: [
      ["9.3.1", "General — planned intervals", "Section 1"],
      ["9.3.2", "Management review inputs", "Sections 2–6"],
      ["9.3.3", "Management review outputs", "Section 7"],
      ["10.3", "Continual improvement", "Section 7"],
    ],
    roles: [
      ["Chair (top management)", "Chairs the review, makes resource and improvement decisions", "Mandatory attendee"],
      ["System Manager", "Compiles the input pack and circulates it in advance", "Secretary"],
      ["Process owners", "Present performance, issues and improvement proposals", "Attend as required"],
      ["Action owners", "Deliver agreed actions by the target date", "Tracked to closure"],
    ],
    kpis: [
      ["Reviews held per plan", "100%", "Annual", "System Manager"],
      ["Input pack circulated ≥ 5 days ahead", "100%", "Per review", "System Manager"],
      ["Actions closed by due date", "≥ 90%", "Per review", "Action owners"],
      ["Actions carried over more than once", "0", "Annual", "Chair"],
    ],
    records: [
      ["Management review agenda and input pack", "System Manager", "5 years", "Controlled drive"],
      ["Management review minutes", "System Manager", "5 years", "Controlled drive"],
      ["Action log", "System Manager", "5 years", "Action tracker"],
      ["Attendance record", "System Manager", "5 years", "Controlled drive"],
    ],
    definitions: COMMON_DEFINITIONS.slice(0, 3),
    body: [
      {
        heading: "Purpose, frequency and attendance",
        blocks: [
          { kind: "p", text: "Management review is held at least annually — quarterly is recommended where the system is new or performance is unstable. It is chaired by top management, and attendance by all process owners is expected. Apologies do not remove accountability for the input contribution." },
        ],
      },
      {
        heading: "Standing agenda",
        blocks: [
          {
            kind: "table",
            caption: "Agenda and time allocation",
            head: ["#", "Agenda item", "Clause input", "Owner", "Time"],
            rows: [
              ["1", "Status of actions from previous reviews", "9.3.2 a", "System Manager", "10 min"],
              ["2", "Changes in external and internal issues", "9.3.2 b", "Chair", "10 min"],
              ["3", "Interested-party needs and compliance obligations", "9.3.2 b", "Compliance", "10 min"],
              ["4", "Performance and KPI trends", "9.3.2 c", "Process owners", "25 min"],
              ["5", "Nonconformities and corrective actions", "9.3.2 c", "System Manager", "15 min"],
              ["6", "Audit results — internal and external", "9.3.2 c", "System Manager", "15 min"],
              ["7", "Customer / interested-party feedback", "9.3.2 c", "Commercial", "10 min"],
              ["8", "Risks and opportunities — effectiveness of actions", "9.3.2 e", "Risk coordinator", "15 min"],
              ["9", "Adequacy of resources", "9.3.2 d", "Chair", "10 min"],
              ["10", "Opportunities for improvement", "9.3.2 f", "All", "15 min"],
              ["11", "Decisions, actions and owners", "9.3.3", "Chair", "15 min"],
            ],
          },
        ],
      },
      {
        heading: "Input pack — performance data",
        blocks: [
          {
            kind: "table",
            caption: "Performance summary (complete before the meeting)",
            head: ["Indicator", "Target", "Current", "Trend", "Owner", "Commentary"],
            rows: [
              ["Objective 1", "", "", "▲ / ▼ / ●", "", ""],
              ["Objective 2", "", "", "", "", ""],
              ["Complaints / feedback", "", "", "", "", ""],
              ["Nonconformities raised / closed", "", "", "", "", ""],
              ["Audit findings by category", "", "", "", "", ""],
            ],
          },
        ],
      },
      {
        heading: "Input pack — audits, nonconformities and risk",
        blocks: [
          { kind: "bullets", items: [
            "Internal audit programme completion and summary of findings by process.",
            "External audit / certification body findings and status of responses.",
            "Nonconformity analysis by root-cause category and repeat findings.",
            "Movement in the risk register: new, escalated, closed and overdue treatments.",
            "Effectiveness of actions taken to address risks and opportunities.",
          ] },
        ],
      },
      {
        heading: "Input pack — resources, change and obligations",
        blocks: [
          { kind: "p", text: "The review considers whether people, competence, infrastructure, technology and budget remain adequate; any planned organisational, product, process or regulatory change; and the status of compliance obligations, including any enforcement contact." },
        ],
      },
      {
        heading: "Minutes template",
        blocks: [
          { kind: "p", text: "Minutes record date, attendees, apologies, each agenda item discussed, evidence considered, conclusions reached and every decision made. A conclusion on the continuing suitability, adequacy and effectiveness of the management system is mandatory and must be stated explicitly." },
          { kind: "callout", title: "Mandatory closing statement", text: "\"The management team concludes that the management system remains suitable, adequate and effective, subject to the actions recorded below.\" — or a qualified statement where it does not, with the corrective programme attached." },
        ],
      },
      {
        heading: "Decision and action log",
        blocks: [
          {
            kind: "table",
            caption: "Action log",
            head: ["Ref", "Decision / action", "Category", "Owner", "Due date", "Status"],
            rows: [
              ["MR-01", "", "Improvement / change / resource", "", "", "Open"],
              ["MR-02", "", "", "", "", "Open"],
              ["MR-03", "", "", "", "", "Open"],
            ],
          },
          { kind: "p", text: "Actions are transferred to the central action tracker on the day of the meeting; progress is the first agenda item at the next review." },
        ],
      },
    ],
  },
];

export const DOC_TEMPLATES: DocTemplate[] = seeds.map((t) => ({
  ...t,
  sections: t.body.map((s) => s.heading),
}));

export type CompanyDetails = {
  companyName: string;
  contactName: string;
  email: string;
  country: string;
  scope: string;
  requirements: string;
};

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function renderBlock(b: Block): string {
  switch (b.kind) {
    case "p":
      return `<p>${esc(b.text)}</p>`;
    case "bullets":
      return `<ul>${b.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;
    case "steps":
      return `<ol class="steps">${b.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ol>`;
    case "callout":
      return `<div class="callout"><div class="callout-title">${esc(b.title)}</div><p>${esc(b.text)}</p></div>`;
    case "table":
      return `<figure class="tbl">
        ${b.caption ? `<figcaption>${esc(b.caption)}</figcaption>` : ""}
        <table>
          <thead><tr>${b.head.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead>
          <tbody>${b.rows
            .map((r) => `<tr>${r.map((c) => `<td>${esc(c) || "&nbsp;"}</td>`).join("")}</tr>`)
            .join("")}</tbody>
        </table>
      </figure>`;
  }
}

function docRefFor(template: DocTemplate) {
  const std = template.standard.replace(/[^0-9]/g, "").slice(0, 5) || "MS";
  return `AACL-${std}-${template.slug.split("-")[0].toUpperCase().slice(0, 4)}-01`;
}

/** Builds a complete, branded, print-ready corporate document. */
export function buildDocumentHtml(
  template: DocTemplate,
  details: CompanyDetails,
  logoDataUrl: string | null,
): string {
  const today = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const nextReview = new Date(Date.now() + 365 * 864e5).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const company = details.companyName || "Company Name";
  const owner = details.contactName || "Top management";
  const docRef = docRefFor(template);

  const frontSections: DocSection[] = [
    {
      heading: "Purpose and application",
      blocks: [
        { kind: "p", text: template.purpose },
        { kind: "p", text: `${company} maintains this document as controlled documented information. It applies to all personnel and, where stated, to contractors and external providers acting on behalf of ${company}.` },
        { kind: "p", text: `Scope of application: ${details.scope || template.scopeStatement}` },
        ...(details.requirements
          ? [
              {
                kind: "callout" as const,
                title: "Organisation-specific requirements",
                text: details.requirements,
              },
            ]
          : []),
        {
          kind: "table" as const,
          caption: `Cross-reference to ${template.standard}`,
          head: ["Clause", "Requirement", "Addressed in"],
          rows: template.clauseMap,
        },
      ],
    },
    {
      heading: "Definitions and abbreviations",
      blocks: [
        {
          kind: "table" as const,
          head: ["Term", "Definition"],
          rows: [...template.definitions, ...COMMON_DEFINITIONS],
        },
      ],
    },
    {
      heading: "Responsibilities and authorities",
      blocks: [
        { kind: "p", text: `Top management of ${company} has assigned the responsibilities and authorities below and ensures they are communicated and understood across the organisation.` },
        {
          kind: "table" as const,
          head: ["Role", "Responsibility", "Notes"],
          rows: template.roles,
        },
      ],
    },
  ];

  const backSections: DocSection[] = [
    {
      heading: "Performance indicators",
      blocks: [
        { kind: "p", text: "The following indicators are monitored to evaluate the effectiveness of the arrangements described in this document. Targets are confirmed annually and reported at management review." },
        {
          kind: "table" as const,
          head: ["Indicator", "Target", "Frequency", "Owner"],
          rows: template.kpis,
        },
      ],
    },
    {
      heading: "Records and retention schedule",
      blocks: [
        {
          kind: "table" as const,
          head: ["Record", "Owner", "Retention", "Location"],
          rows: template.records,
        },
        { kind: "p", text: "Records are legible, readily identifiable and retrievable, protected from unauthorised alteration, and disposed of securely at the end of the retention period." },
      ],
    },
    {
      heading: "Document control and review",
      blocks: [
        { kind: "p", text: `This document is reviewed at least annually, and whenever there is significant change to the organisation's context, structure, risks, obligations or processes. The next scheduled review is ${nextReview}. Printed copies are uncontrolled unless stamped as controlled by the document owner.` },
      ],
    },
  ];

  const all = [...frontSections, ...template.body, ...backSections];

  const toc = all
    .map((s, i) => `<li><span class="t">${i + 1}. ${esc(s.heading)}</span></li>`)
    .join("");

  const body = all
    .map(
      (s, i) => `<section class="sec">
        <h2><span class="num">${i + 1}</span>${esc(s.heading)}</h2>
        ${s.blocks.map(renderBlock).join("")}
      </section>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8" />
<title>${esc(company)} — ${esc(template.name)} (${esc(template.standard)})</title>
<style>
  @page { size: A4; margin: 20mm 16mm 18mm; }
  * { box-sizing: border-box; }
  body { font-family: "Segoe UI", Calibri, Arial, Helvetica, sans-serif; color:#1f2937; line-height:1.62; font-size:10.5pt; margin:0; }
  h1,h2,h3 { font-family: Georgia, "Times New Roman", serif; color:#0b1f3a; }

  /* Cover */
  .cover { position:relative; min-height:245mm; padding:0 0 24px; page-break-after:always; }
  .cover .bar { height:14px; background:linear-gradient(90deg,#99182a 0 62%,#0b1f3a 62% 100%); }
  .cover .inner { padding:38px 6mm 0; }
  .cover img.logo { max-height:78px; max-width:250px; object-fit:contain; margin-bottom:38px; }
  .cover .std { display:inline-block; background:#99182a; color:#fff; font-size:8.5pt; letter-spacing:2.6px; text-transform:uppercase; padding:6px 14px; border-radius:2px; }
  .cover h1 { font-size:31pt; line-height:1.12; margin:20px 0 6px; letter-spacing:-.4px; }
  .cover .company { font-size:15pt; color:#99182a; font-weight:600; margin-bottom:6px; }
  .cover .summary { color:#4b5563; max-width:135mm; font-size:10.5pt; margin-top:14px; }
  .cover .meta { margin-top:44px; border-top:2px solid #0b1f3a; padding-top:14px; }
  .cover .meta table { width:100%; border-collapse:collapse; font-size:9.5pt; }
  .cover .meta td { padding:6px 0; border-bottom:1px solid #e5e7eb; }
  .cover .meta td:first-child { color:#6b7280; width:46%; text-transform:uppercase; letter-spacing:.7px; font-size:8pt; }
  .cover .conf { margin-top:26px; font-size:8.5pt; color:#6b7280; border-left:3px solid #99182a; padding-left:10px; }

  /* Control page */
  .control { page-break-after:always; }
  h2 { font-size:13.5pt; margin:26px 0 10px; padding-bottom:6px; border-bottom:1px solid #e5e7eb; }
  h2 .num { display:inline-block; min-width:26px; height:22px; line-height:22px; text-align:center; background:#0b1f3a; color:#fff; font-family:"Segoe UI",Arial,sans-serif; font-size:9pt; border-radius:3px; margin-right:10px; }
  h3 { font-size:11pt; margin:18px 0 6px; }
  p { margin:0 0 10px; text-align:justify; }
  ul, ol { margin:0 0 12px; padding-left:20px; }
  li { margin-bottom:5px; }
  ol.steps li { margin-bottom:7px; }

  ol.toc { list-style:none; padding:0; margin:0 0 8px; counter-reset:toc; }
  ol.toc li { border-bottom:1px dotted #d1d5db; padding:6px 0; font-size:10pt; }

  figure.tbl { margin:14px 0 18px; page-break-inside:avoid; }
  figure.tbl figcaption { font-size:8.5pt; text-transform:uppercase; letter-spacing:1.1px; color:#99182a; font-weight:700; margin-bottom:6px; }
  table { width:100%; border-collapse:collapse; font-size:9pt; }
  thead th { background:#0b1f3a; color:#fff; text-align:left; padding:7px 8px; font-weight:600; font-size:8.5pt; letter-spacing:.4px; }
  tbody td { padding:7px 8px; border-bottom:1px solid #e5e7eb; vertical-align:top; }
  tbody tr:nth-child(even) td { background:#f7f8fa; }

  .callout { border-left:4px solid #99182a; background:#fbf4f5; padding:12px 16px; margin:14px 0 18px; page-break-inside:avoid; }
  .callout-title { font-weight:700; color:#99182a; font-size:9.5pt; text-transform:uppercase; letter-spacing:1px; margin-bottom:5px; }
  .callout p { margin:0; }

  .sec { page-break-inside:auto; }
  .signoff { page-break-before:always; }
  .sign-grid { display:flex; gap:18px; margin-top:18px; }
  .sign-box { flex:1; border:1px solid #d1d5db; border-radius:4px; padding:14px; font-size:9pt; }
  .sign-line { margin-top:34px; border-top:1px solid #9ca3af; padding-top:5px; color:#6b7280; }

  footer.doc { margin-top:34px; border-top:2px solid #0b1f3a; padding-top:9px; font-size:8pt; color:#6b7280; }
</style></head>
<body>

  <div class="cover">
    <div class="bar"></div>
    <div class="inner">
      ${logoDataUrl ? `<img class="logo" src="${logoDataUrl}" alt="${esc(company)} logo" />` : ""}
      <div class="std">${esc(template.standard)}</div>
      <h1>${esc(template.name)}</h1>
      <div class="company">${esc(company)}</div>
      <div class="summary">${esc(template.summary)}</div>
      <div class="meta"><table>
        <tr><td>Document reference</td><td><strong>${docRef}</strong></td></tr>
        <tr><td>Revision</td><td>01</td></tr>
        <tr><td>Issue date</td><td>${today}</td></tr>
        <tr><td>Next review date</td><td>${nextReview}</td></tr>
        <tr><td>Document owner</td><td>${esc(owner)}</td></tr>
        <tr><td>Country of operation</td><td>${esc(details.country || "—")}</td></tr>
        <tr><td>Classification</td><td>Confidential — internal use</td></tr>
        <tr><td>Prepared using</td><td>AACL AI Document Generator</td></tr>
      </table></div>
      <div class="conf">Confidential. This document is the property of ${esc(company)}. It contains management system information and must not be reproduced or distributed outside the organisation without written authorisation.</div>
    </div>
  </div>

  <div class="control">
    <h2><span class="num">i</span>Document control</h2>
    <figure class="tbl"><figcaption>Revision history</figcaption>
      <table><thead><tr><th>Rev</th><th>Date</th><th>Description of change</th><th>Prepared by</th><th>Approved by</th></tr></thead>
      <tbody>
        <tr><td>01</td><td>${today}</td><td>Initial issue</td><td>${esc(owner)}</td><td>Top management</td></tr>
        <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
        <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
      </tbody></table>
    </figure>

    <figure class="tbl"><figcaption>Approval</figcaption>
      <table><thead><tr><th>Role</th><th>Name</th><th>Responsibility</th><th>Date</th></tr></thead>
      <tbody>
        <tr><td>Prepared by</td><td>${esc(owner)}</td><td>Content accuracy and completeness</td><td>${today}</td></tr>
        <tr><td>Reviewed by</td><td>&nbsp;</td><td>Technical and process review</td><td>&nbsp;</td></tr>
        <tr><td>Approved by</td><td>&nbsp;</td><td>Authority to issue and implement</td><td>&nbsp;</td></tr>
      </tbody></table>
    </figure>

    <figure class="tbl"><figcaption>Distribution list</figcaption>
      <table><thead><tr><th>Copy</th><th>Holder</th><th>Format</th><th>Controlled</th></tr></thead>
      <tbody>
        <tr><td>Master</td><td>Document owner</td><td>Electronic</td><td>Yes</td></tr>
        <tr><td>01</td><td>Top management</td><td>Electronic</td><td>Yes</td></tr>
        <tr><td>02</td><td>All personnel (read access)</td><td>Intranet</td><td>Yes</td></tr>
        <tr><td>03</td><td>Certification body / auditor</td><td>On request</td><td>No</td></tr>
      </tbody></table>
    </figure>

    <h2><span class="num">ii</span>Contents</h2>
    <ol class="toc">${toc}</ol>
  </div>

  ${body}

  <section class="signoff">
    <h2><span class="num">✓</span>Authorisation and implementation</h2>
    <p>By signing below, the parties confirm that this document has been reviewed, approved for use, and communicated to all affected personnel of ${esc(company)}. Implementation is effective from the issue date shown on the cover page.</p>
    <div class="sign-grid">
      <div class="sign-box"><strong>Prepared by</strong><div class="sign-line">Name / Signature / Date</div></div>
      <div class="sign-box"><strong>Reviewed by</strong><div class="sign-line">Name / Signature / Date</div></div>
      <div class="sign-box"><strong>Approved by</strong><div class="sign-line">Name / Signature / Date</div></div>
    </div>
    <footer class="doc">
      ${docRef} · Revision 01 · Issued ${today} · ${esc(company)} · Confidential.<br />
      Prepared with the AACL AI Document Generator — Audits and Assurance Consult Ltd: ISO consultancy, training, documentation and audit support, onsite or remote, worldwide.
      Uncontrolled when printed. This template is a professionally structured starting point and should be adapted to your organisation's actual processes before audit.
    </footer>
  </section>
</body></html>`;
}

export function downloadBlob(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export function downloadDocx(template: DocTemplate, details: CompanyDetails, html: string) {
  const slug = (details.companyName || "company").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  downloadBlob(`${slug}-${template.slug}.doc`, html, "application/msword");
}

export function printPdf(html: string) {
  const w = window.open("", "_blank");
  if (!w) return false;
  w.document.write(html);
  w.document.close();
  w.focus();
  setTimeout(() => w.print(), 500);
  return true;
}
