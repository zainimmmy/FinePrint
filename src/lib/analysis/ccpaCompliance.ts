import { ComplianceResult } from "@/types/analysis";

interface CcpaCheck {
  id: string;
  label: string;
  patterns: RegExp[];
}

const CCPA_CHECKS: CcpaCheck[] = [
  {
    id: "right-to-know",
    label: "Right to Know What Data Is Collected",
    patterns: [
      /\bright\s*to\s*know\b/i,
      /\bcategories\s*of\s*(personal\s*)?(information|data)\s*(we\s*)?(collect|gathered)/i,
      /\bwhat\s*(personal\s*)?(information|data)\s*(we|is)\s*(collect|gathered)/i,
    ],
  },
  {
    id: "right-to-delete",
    label: "Right to Delete Personal Information",
    patterns: [
      /\bright\s*to\s*delet/i,
      /\brequest\s*(that\s*we\s*)?delet/i,
      /\bCCPA\b.*\bdelet/i,
      /\bcalifornia\b.*\bdelet/i,
    ],
  },
  {
    id: "right-to-opt-out",
    label: "Right to Opt-Out of Sale",
    patterns: [
      /\bdo\s*not\s*sell\b/i,
      /\bopt[\s-]*out\s*of\s*(the\s*)?sale\b/i,
      /\bright\s*to\s*opt[\s-]*out\b/i,
      /\bdo\s*not\s*sell\s*(or\s*share\s*)?my\s*personal/i,
    ],
  },
  {
    id: "non-discrimination",
    label: "Non-Discrimination for Exercising Rights",
    patterns: [
      /\bnon[\s-]*discrimination\b/i,
      /\bnot\s*(be\s*)?discriminat/i,
      /\bwill\s*not\s*(deny|charge|provide\s*a\s*different)/i,
    ],
  },
  {
    id: "financial-incentive",
    label: "Financial Incentive Disclosure",
    patterns: [
      /\bfinancial\s*incentive/i,
      /\bprice\s*or\s*service\s*difference/i,
      /\bincentive\s*program/i,
    ],
  },
  {
    id: "authorized-agent",
    label: "Authorized Agent Provisions",
    patterns: [
      /\bauthori[sz]ed\s*agent\b/i,
      /\bagent\b.*\b(submit|make)\b.*\brequest\b/i,
    ],
  },
  {
    id: "categories-disclosed",
    label: "Categories of Data Disclosed to Third Parties",
    patterns: [
      /\bcategories\b.*\b(disclosed|shared|sold)\b.*\bthird[\s-]*part/i,
      /\bthird[\s-]*part\b.*\bcategories\b.*\b(information|data)\b/i,
    ],
  },
  {
    id: "business-purpose",
    label: "Business Purpose for Collection",
    patterns: [
      /\bbusiness\s*(purpose|reason)\b/i,
      /\bpurpose\s*of\s*(collecting|processing)\b/i,
      /\bwhy\s*we\s*collect\b/i,
    ],
  },
  {
    id: "verification-process",
    label: "Verification Process for Requests",
    patterns: [
      /\bverif(y|ication)\b.*\b(identity|request)\b/i,
      /\bidentity\b.*\bverif/i,
      /\bconfirm\s*(your\s*)?identity\b/i,
    ],
  },
  {
    id: "contact-method",
    label: "Contact Method for Privacy Requests",
    patterns: [
      /\b(toll[\s-]*free|phone\s*number|email)\b.*\b(privacy|request|opt[\s-]*out)\b/i,
      /\bprivacy\b.*\b(contact|email|phone|form)\b/i,
      /\bsubmit\s*(a\s*)?request\b/i,
    ],
  },
];

export function analyzeCcpaCompliance(text: string): ComplianceResult {
  const checks = CCPA_CHECKS.map((check) => {
    const passed = check.patterns.some((re) => re.test(text));
    return {
      id: check.id,
      label: check.label,
      passed,
      details: passed
        ? `Found reference to ${check.label.toLowerCase()}.`
        : `No mention of ${check.label.toLowerCase()} found.`,
    };
  });

  const passedCount = checks.filter((c) => c.passed).length;
  const score = Math.round((passedCount / checks.length) * 100);

  return { framework: "CCPA", checks, score };
}
