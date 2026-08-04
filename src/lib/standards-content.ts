export type StandardItem = { label: string; code: string; desc: string };

export const STANDARDS: StandardItem[] = [
  {
    label: "Information Security",
    code: "ISO/IEC 27001:2022",
    desc: "Information security management systems — protect confidentiality, integrity and availability of information assets.",
  },
  {
    label: "Quality Management",
    code: "ISO 9001:2015",
    desc: "Quality management systems that consistently meet customer and regulatory requirements.",
  },
  {
    label: "Occupational Health & Safety",
    code: "ISO 45001:2018",
    desc: "Occupational health and safety management — prevent work-related injury and ill health.",
  },
  {
    label: "Business Continuity",
    code: "ISO 22301:2019",
    desc: "Business continuity management — prepare for, respond to and recover from disruptive incidents.",
  },
  {
    label: "Environmental Management",
    code: "ISO 14001:2015",
    desc: "Environmental management systems that improve environmental performance and compliance.",
  },
  {
    label: "Payment Card Security",
    code: "PCI DSS v4.0",
    desc: "Payment card industry data security standard for cardholder-data environments.",
  },
  {
    label: "Risk Management",
    code: "ISO 31000:2018",
    desc: "Enterprise-wide risk management principles, framework and process.",
  },
  {
    label: "Security Operations",
    code: "ISO 18788:2015",
    desc: "Management system for private security operations — governance, accountability and human rights.",
  },
];
