export type DocSection = { heading: string; body: string };

export type DocTemplate = {
  slug: string;
  name: string;
  standard: string;
  price: number;
  format: "DOCX + PDF";
  summary: string;
  sections: string[];
};

export const DOC_TEMPLATES: DocTemplate[] = [
  {
    slug: "quality-manual-9001",
    name: "Quality Manual",
    standard: "ISO 9001:2015",
    price: 49,
    format: "DOCX + PDF",
    summary: "Full quality management system manual covering clauses 4–10, scope, context and process interactions.",
    sections: [
      "Scope of the management system",
      "Context of the organisation",
      "Leadership and policy",
      "Planning, risks and opportunities",
      "Support and resources",
      "Operational planning and control",
      "Performance evaluation",
      "Improvement",
    ],
  },
  {
    slug: "isms-policy-27001",
    name: "Information Security Policy Set",
    standard: "ISO/IEC 27001:2022",
    price: 59,
    format: "DOCX + PDF",
    summary: "Top-level ISMS policy plus supporting topic policies aligned to Annex A controls.",
    sections: [
      "Information security policy statement",
      "Scope and boundaries of the ISMS",
      "Roles and responsibilities",
      "Risk assessment and treatment approach",
      "Access control policy",
      "Acceptable use and asset handling",
      "Incident management",
      "Continual improvement",
    ],
  },
  {
    slug: "internal-audit-procedure",
    name: "Internal Audit Procedure",
    standard: "ISO 19011 aligned",
    price: 39,
    format: "DOCX + PDF",
    summary: "Audit programme, planning, execution, reporting and follow-up procedure with responsibilities.",
    sections: [
      "Purpose and scope",
      "Audit programme planning",
      "Auditor competence and impartiality",
      "Conducting the audit",
      "Reporting findings",
      "Corrective action follow-up",
      "Records retained",
    ],
  },
  {
    slug: "risk-register-31000",
    name: "Risk Register and Methodology",
    standard: "ISO 31000:2018",
    price: 45,
    format: "DOCX + PDF",
    summary: "Risk methodology, scoring matrix and register structure with treatment planning.",
    sections: [
      "Risk management framework",
      "Risk criteria and scoring matrix",
      "Risk identification approach",
      "Analysis and evaluation",
      "Risk treatment planning",
      "Monitoring and review",
    ],
  },
  {
    slug: "ohs-manual-45001",
    name: "Occupational Health & Safety Manual",
    standard: "ISO 45001:2018",
    price: 55,
    format: "DOCX + PDF",
    summary: "OH&S management system manual including hazard identification and worker participation.",
    sections: [
      "OH&S policy and commitment",
      "Worker consultation and participation",
      "Hazard identification and risk assessment",
      "Legal and other requirements",
      "Emergency preparedness and response",
      "Incident investigation",
      "Performance evaluation",
    ],
  },
  {
    slug: "environmental-manual-14001",
    name: "Environmental Management Manual",
    standard: "ISO 14001:2015",
    price: 55,
    format: "DOCX + PDF",
    summary: "EMS manual with environmental aspects, impacts, compliance obligations and objectives.",
    sections: [
      "Environmental policy",
      "Environmental aspects and impacts",
      "Compliance obligations",
      "Objectives and programmes",
      "Operational control",
      "Emergency preparedness",
      "Monitoring and measurement",
    ],
  },
  {
    slug: "fsms-manual-22000",
    name: "Food Safety Manual (FSMS)",
    standard: "ISO 22000:2018",
    price: 59,
    format: "DOCX + PDF",
    summary: "FSMS manual with prerequisite programmes, HACCP plan structure and verification.",
    sections: [
      "Food safety policy",
      "Food safety team and responsibilities",
      "Prerequisite programmes",
      "Hazard analysis and HACCP plan",
      "Traceability and recall",
      "Verification and validation",
      "Management review",
    ],
  },
  {
    slug: "management-review-pack",
    name: "Management Review Pack",
    standard: "All ISO management systems",
    price: 35,
    format: "DOCX + PDF",
    summary: "Agenda, input pack and minutes template satisfying clause 9.3 of any ISO management system.",
    sections: [
      "Review agenda",
      "Status of previous actions",
      "Performance and KPI inputs",
      "Audit results and non-conformities",
      "Risk and opportunity changes",
      "Resource adequacy",
      "Decisions and actions",
    ],
  },
];

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

function paragraphsFor(section: string, template: DocTemplate, details: CompanyDetails): string[] {
  const company = details.companyName || "the organisation";
  return [
    `${company} has established, documented and implemented arrangements for "${section.toLowerCase()}" as part of its management system conforming to ${template.standard}.`,
    `Scope: ${details.scope || "all activities, products and services delivered by the organisation."}`,
    details.requirements
      ? `Organisation-specific requirements considered in this section: ${details.requirements}`
      : `This section is maintained by the appointed process owner and reviewed at least annually, or upon significant change to the organisation's context, risks or obligations.`,
    `Records demonstrating conformity are retained and made available during internal and external audits. Responsibility for maintaining this section rests with top management of ${company}.`,
  ];
}

/** Builds a complete, branded, print-ready HTML document. */
export function buildDocumentHtml(
  template: DocTemplate,
  details: CompanyDetails,
  logoDataUrl: string | null,
): string {
  const today = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const docRef = `${template.standard.replace(/[^A-Z0-9]/gi, "").slice(0, 10)}-${template.slug.slice(0, 6).toUpperCase()}-01`;

  const toc = template.sections
    .map((s, i) => `<li><span>${i + 1}. ${esc(s)}</span></li>`)
    .join("");

  const body = template.sections
    .map(
      (s, i) => `
      <section class="sec">
        <h2>${i + 1}. ${esc(s)}</h2>
        ${paragraphsFor(s, template, details)
          .map((p) => `<p>${esc(p)}</p>`)
          .join("")}
      </section>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8" />
<title>${esc(details.companyName || "Company")} — ${esc(template.name)}</title>
<style>
  @page { size: A4; margin: 22mm 18mm; }
  body { font-family: Georgia, "Times New Roman", serif; color: #111827; line-height: 1.6; font-size: 11.5pt; }
  .cover { text-align: center; padding: 40px 0 60px; border-bottom: 3px solid #99182a; margin-bottom: 32px; }
  .cover img { max-height: 90px; max-width: 260px; object-fit: contain; margin-bottom: 24px; }
  .cover h1 { font-size: 26pt; margin: 0 0 8px; letter-spacing: -0.5px; }
  .cover .std { color: #99182a; letter-spacing: 3px; text-transform: uppercase; font-size: 9pt; }
  .meta { margin-top: 28px; font-size: 10pt; color: #4b5563; }
  .meta table { margin: 0 auto; border-collapse: collapse; }
  .meta td { padding: 4px 14px; border-bottom: 1px solid #e5e7eb; }
  h2 { font-size: 14pt; margin: 26px 0 10px; color: #0b1f3a; }
  ol.toc { margin: 0 0 28px 0; padding-left: 18px; color: #374151; }
  .sec { page-break-inside: avoid; }
  footer { margin-top: 40px; border-top: 1px solid #e5e7eb; padding-top: 10px; font-size: 8.5pt; color: #6b7280; }
</style></head>
<body>
  <div class="cover">
    ${logoDataUrl ? `<img src="${logoDataUrl}" alt="${esc(details.companyName)} logo" />` : ""}
    <div class="std">${esc(template.standard)}</div>
    <h1>${esc(template.name)}</h1>
    <div>${esc(details.companyName || "Company Name")}</div>
    <div class="meta"><table>
      <tr><td>Document reference</td><td>${docRef}</td></tr>
      <tr><td>Revision</td><td>01</td></tr>
      <tr><td>Issue date</td><td>${today}</td></tr>
      <tr><td>Document owner</td><td>${esc(details.contactName || "Top management")}</td></tr>
      <tr><td>Country of operation</td><td>${esc(details.country || "—")}</td></tr>
    </table></div>
  </div>

  <h2>Contents</h2>
  <ol class="toc">${toc}</ol>

  ${body}

  <footer>
    Prepared for ${esc(details.companyName || "the organisation")} using the AACL AI Document Generator.
    Audits and Assurance Consult Ltd — ISO consultancy, training, documentation and audit support, onsite or remote, worldwide.
    Uncontrolled when printed.
  </footer>
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
  setTimeout(() => w.print(), 400);
  return true;
}
