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
};
