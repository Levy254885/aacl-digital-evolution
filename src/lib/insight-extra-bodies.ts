/** Full body content for insights that were published as title+excerpt only. */
export const EXTRA_BODIES: Record<string, { h: string; p: string[] }[]> = {
  "board-reporting-on-cyber-risk": [
    {
      h: "Why heat maps stop being enough",
      p: [
        "Red-amber-green heat maps are useful for internal prioritisation. They are weak as a board instrument. Directors cannot compare this quarter to last, cannot see residual risk after treatment, and cannot connect cyber risk to capital allocation or insurance decisions.",
        "Regulators, lenders and large customers increasingly expect quantified or at least structured narrative reporting on cyber and data risk. In Kenya this sits alongside ODPC expectations and sector rules for banks and payment providers. Globally, boards are being asked the same question: what could go wrong, how likely is it, and what are we doing about it.",
      ],
    },
    {
      h: "A practical board pack structure",
      p: [
        "Keep the pack short. One page of executive summary, one page of residual risk against appetite, one page of incidents and near-misses, one page of control and programme status, and an appendix for detail. Directors will not read a 40-page technical report.",
        "Report residual risk in the same language you use for other enterprise risks. If the board already uses a 5x5 matrix or a financial impact scale for operational risk, map cyber onto that scale. Consistency beats sophistication.",
        "Include trend, not only status. Show open critical findings closed this quarter, mean time to remediate, phishing simulation results, and third-party assurance progress. Boards respond to direction of travel.",
      ],
    },
    {
      h: "Linking cyber risk to decisions",
      p: [
        "Every board paper should answer three questions: what do we need to decide, what happens if we do nothing, and what does treatment cost. Pure information papers train boards to skim.",
        "Where possible, express impact in business terms: hours of customer-facing downtime, regulatory fine range, cost of a material data incident, or loss of a key customer assurance requirement. Abstract CVSS scores alone do not drive budget.",
      ],
    },
    {
      h: "How AACL helps leadership teams",
      p: [
        "Through Security Manager as a Service and targeted governance engagements, AACL builds board reporting rhythms that directors actually use. We design the pack, the metrics and the escalation path, and we present or coach your internal lead.",
        "This is especially useful for organisations that do not yet have a full-time CISO but still face board and customer pressure for credible cyber governance. Onsite in Kenya or remote worldwide.",
      ],
    },
  ],
  "iso-27001-2022-transition": [
    {
      h: "What actually changed in ISO/IEC 27001:2022",
      p: [
        "ISO/IEC 27001:2022 is not a complete rewrite of the management system. Clauses 4 to 10 remain structurally familiar. The material change sits in Annex A, which now references ISO/IEC 27002:2022 and consolidates the previous 114 controls into 93, organised into four themes: Organisational, People, Physical and Technological.",
        "Eleven controls are new (including threat intelligence, information security for cloud services, ICT readiness for business continuity, and secure coding). Many existing controls were merged or retitled. Attributes were introduced to help organisations filter and report controls more usefully.",
        "If you are already certified to the 2013 version, the transition is primarily a control mapping and evidence exercise, not a full re-implementation.",
      ],
    },
    {
      h: "A practical transition sequence",
      p: [
        "Start with a formal gap assessment against the 2022 control set. Map every 2013 control you currently claim to its 2022 equivalent, identify the eleven new controls, and decide which are applicable based on risk. Update the Statement of Applicability and risk treatment plan before you rewrite policies.",
        "Next, refresh documentation only where the control intent or evidence requirement has changed. Avoid a wholesale policy rewrite. Auditors want to see that the system still works, not that every document has a new date stamp.",
        "Run an internal audit against the 2022 version, close findings, and schedule the certification body transition audit within your allowed window.",
      ],
    },
    {
      h: "Common failure points we see in Kenya and internationally",
      p: [
        "Treating cloud services as out of scope without a documented risk decision. Control 5.23 (information security for use of cloud services) is frequently under-implemented.",
        "Leaving threat intelligence as a subscription to a feed with no process for intake, prioritisation or action.",
        "Physical and people controls that were informal under 2013 becoming visible gaps under the clearer 2022 structure.",
        "Management review still focused on audit findings alone, with no discussion of threat landscape changes or performance of the new controls.",
      ],
    },
    {
      h: "How AACL supports ISO 27001:2022 transitions",
      p: [
        "We run focused gap assessments against the 2022 control set, rebuild Statements of Applicability that boards can defend, and support internal audit and certification body liaison for transition audits. Delivery is available onsite in Nairobi and Kenya, or fully remote worldwide.",
        "If you are planning a first-time ISO 27001 certification on the 2022 version, the same methodology applies from day one. Talk to us early if your certificate transition deadline is approaching.",
      ],
    },
  ],
  "kenya-data-protection-act-lessons": [
    {
      h: "What the ODPC has actually enforced",
      p: [
        "Kenya's Data Protection Act and the Office of the Data Protection Commissioner have moved from awareness to enforcement. Published decisions and guidance emphasise lawful basis, transparency to data subjects, security of processing, and the duty to notify breaches within the statutory window.",
        "Organisations that treat registration with the ODPC as the end of compliance are exposed. Registration is a starting point. The operational questions are whether processing is mapped, whether consent or another lawful basis is documented, and whether security measures are proportionate to the risk.",
      ],
    },
    {
      h: "Priorities for 2026 compliance programmes",
      p: [
        "Complete or refresh a processing inventory that covers systems, vendors and cross-border transfers. Many mid-market organisations still cannot answer where personal data actually lives.",
        "Review vendor contracts for data protection clauses and transfer mechanisms. Cloud and SaaS providers are in scope even when the brand is international.",
        "Test breach detection and notification playbooks against the Act's timelines. A tabletop exercise is cheaper than a late notification finding.",
        "Align privacy work with ISO 27001 or equivalent security controls. Security of processing is both a legal duty and a certification requirement for many of our clients.",
      ],
    },
    {
      h: "Lessons for groups operating in and outside Kenya",
      p: [
        "Global operators often underestimate local registration and guidance while over-indexing on EU GDPR templates. Kenya-specific notices, retention and subject access processes are still required.",
        "Conversely, a strong ISO 27001 or SOC 2 programme is useful evidence of security of processing, but it does not replace the accountability and transparency duties under the Act.",
      ],
    },
    {
      h: "How AACL supports data protection programmes",
      p: [
        "We help organisations map processing, close ODPC registration and policy gaps, and integrate data protection with ISO 27001 and broader compliance retainers. Delivery is practical and evidence-led, onsite in Nairobi or remote for regional and international groups.",
      ],
    },
  ],
  "integrated-management-systems": [
    {
      h: "Why separate systems become expensive",
      p: [
        "When ISO 9001, ISO 14001, ISO 45001 and ISO 27001 are run as four parallel manuals, you pay four times for document control, internal audit scheduling, management review and corrective action tracking. Staff learn four slightly different ways of describing the same process.",
        "Certification body time also multiplies. Integrated audits are available from most major registrars once the system is genuinely integrated — not merely stapled together.",
      ],
    },
    {
      h: "What real integration looks like",
      p: [
        "One process map per value stream, with quality, environment, safety and information security requirements attached where they apply. One risk register with domains, not four siloed registers. One internal audit programme that samples across standards. One management review agenda that covers performance of the whole system.",
        "Clause-level alignment in the High Level Structure (HLS) makes this possible. The work is organisational, not documentary: process owners must own the combined requirements.",
      ],
    },
    {
      h: "Where integration pays back fastest",
      p: [
        "Manufacturing and multi-site operations with three or more certificates. Financial services combining ISO 27001 with operational resilience and quality obligations. Security printers already carrying GSMA SAS who also need ISO 27001 and quality systems.",
        "Typical savings show up in reduced audit days, fewer duplicated non-conformities, and clearer accountability. Soft benefits include less training load and a single source of truth for procedures.",
      ],
    },
    {
      h: "How AACL designs IMS programmes",
      p: [
        "We start with a shared process architecture, not a merged manual. Gap assessments are run once across the target standards, documentation is rationalised, and internal auditors are trained to work across domains. Certification support is coordinated with your registrar for integrated surveillance where possible.",
        "Available onsite in Kenya or remote for international groups. Talk to us if you are carrying three or more certificates and the overhead is becoming the product.",
      ],
    },
  ],
  "third-party-risk-in-financial-services": [
    {
      h: "Why third-party risk is now a board topic",
      p: [
        "Core banking, payments, cloud, customer support and even parts of compliance are frequently delivered by vendors. A material outage or data incident at a critical third party is a material incident for the bank. Regulators in Kenya and internationally increasingly expect formal third-party risk management, not informal relationship management.",
        "The difficulty is volume. A mid-sized institution can have hundreds of suppliers. Treating all of them with the same questionnaire wastes effort and still misses the concentration risk in the top ten.",
      ],
    },
    {
      h: "A simple maturity model",
      p: [
        "Level 1 — Inventory only: a list of vendors with contracts on file. Level 2 — Tiering: criticality rating based on data access, customer impact and substitutability. Level 3 — Risk-based assurance: questionnaires, certifications (ISO 27001, SOC 2, PCI DSS) and contractual rights calibrated to tier. Level 4 — Continuous monitoring: performance SLAs, security ratings, incident obligations and periodic re-assessment. Level 5 — Integrated: third-party risk feeds enterprise risk, operational resilience and board reporting.",
        "Most institutions we assess sit between Level 2 and Level 3. The jump to Level 4 requires tooling and clear ownership, not only more spreadsheets.",
      ],
    },
    {
      h: "What good looks like in practice",
      p: [
        "A living inventory owned by procurement and risk jointly. Exit and concentration analysis for the critical tier. Right to audit and evidence clauses that are actually exercised. Alignment with ISO 27001 Annex A supplier controls and with PCI DSS where card data is involved.",
        "For security printing and telecom clients, third-party risk also covers production subcontractors and hosting partners that fall inside GSMA SAS scope — scheme requirements do not stop at the factory gate.",
      ],
    },
    {
      h: "How AACL supports third-party risk programmes",
      p: [
        "We design tiering models, assurance programmes and board reporting for banks, payment firms and regulated manufacturers. Engagements can stand alone or sit inside a broader ISO 27001, PCI DSS or SMaaS retainer. Onsite in Kenya or remote worldwide.",
      ],
    },
  ],
  "gsma-audit-what-to-expect": [
    {
      h: "What a GSMA audit is really testing",
      p: [
        "A GSMA SAS audit is not a generic ISO-style management system review. Auditors work from a published consolidated controls list and expect evidence that physical, personnel, production and logical controls operate as written — on the day and in the records.",
        "Whether the engagement is SAS-UP (UICC / SIM / eSIM production) or SAS-SM (subscription management), the pattern is the same: walk the secure zones, interview operators and security staff, sample ceremony and logistics records, and test whether the layering of controls holds under real conditions.",
      ],
    },
    {
      h: "What happens on audit day",
      p: [
        "Expect an opening meeting, a site and system orientation, then a mix of physical inspection, document sampling and interviews. Auditors often start where findings are historically common: zone boundaries, access control and anti-passback, CCTV coverage and retention, key or cryptographic ceremonies, and scrap or reject reconciliation.",
        "You should have a named escort, a prepared evidence pack mapped to the checklist, and process owners who can demonstrate the control — not only point at a procedure. Closing meetings summarise findings; non-conformities need a clear corrective action path.",
      ],
    },
    {
      h: "Evidence gaps that most often become findings",
      p: [
        "Procedures that do not match how operators actually work. Logs that are retained but never reviewed. Screening that covers employees but not contractors. Quantity variances in card or component flows without a documented investigation. Key ceremonies described in policy but thin in completed records.",
        "Change is another trap: a new product line, courier, hosting environment or shift pattern that was never assessed against the SAS checklist. Maintain a change register with security impact assessments and renewals become reviews rather than rediscovery exercises.",
      ],
    },
    {
      h: "How to prepare in the final eight weeks",
      p: [
        "Run an independent mock audit against the current GSMA requirements. Close critical gaps. Rehearse interviews with operators and security staff. Confirm CCTV retention, access reviews and ceremony logs are complete for the recent period auditors will sample.",
        "AACL Global supports pre-audit readiness, mock audits and onsite or remote support during the formal GSMA audit for SAS-UP and SAS-SM programmes. If your audit date is fixed, start the final preparation window as early as you can.",
      ],
    },
  ],
  "pci-dss-certification-kenya-guide": [
    {
      h: "Scoping is where cost is won or lost",
      p: [
        "PCI DSS applies to systems that store, process or transmit cardholder data, and to connected systems that can affect the security of the cardholder data environment (CDE). In Kenya, many organisations over-scope by treating the entire corporate network as in-scope, or under-scope by ignoring connected systems and third parties.",
        "A clear network and data-flow diagram, segmentation where justified, and a documented applicability decision are the foundation of a manageable programme. Scope mistakes show up later as assessment delays or findings.",
      ],
    },
    {
      h: "What drives PCI DSS cost in Kenya",
      p: [
        "Cost is driven by scope size, number of locations, whether you are a merchant or service provider, the assessment type (SAQ vs QSA assessment), and how much remediation is required before assessment. Tooling, penetration testing and compensating controls also add to the total.",
        "Combining PCI DSS with an existing or planned ISO 27001 programme reduces duplication: risk assessment, access control, logging, vendor management and security awareness can serve both if designed deliberately.",
      ],
    },
    {
      h: "A practical path for Kenyan organisations",
      p: [
        "Map card data flows and define the CDE. Close obvious gaps (default passwords, missing MFA on admin access, unencrypted transmission). Align policies and evidence with the current PCI DSS version. Engage a QSA or complete the correct SAQ path for your channel type.",
        "Do not treat the ROC or SAQ as a one-off project. Maintaining evidence and change control between assessments is what keeps certification sustainable.",
      ],
    },
    {
      h: "How AACL supports PCI DSS in Kenya",
      p: [
        "We help organisations scope the CDE, run gap assessments, remediate controls, and prepare for QSA assessment or SAQ completion. Programmes can stand alone or integrate with ISO 27001 and broader security retainers. Onsite in Nairobi and Kenya, or remote worldwide.",
      ],
    },
  ],
};
