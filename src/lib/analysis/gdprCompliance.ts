import { ComplianceResult } from "@/types/analysis";

interface GdprCheck {
  id: string;
  label: string;
  patterns: RegExp[];
}

const GDPR_CHECKS: GdprCheck[] = [
  {
    id: "data-controller",
    label: "Identifies Data Controller",
    patterns: [
      /\bdata\s*controller\b/i,
      /\bcontroller\s*of\s*(your\s*)?(personal\s*)?(data|information)\b/i,
      /\bresponsible\s*for\s*(processing|collecting)\b/i,
    ],
  },
  {
    id: "legal-basis",
    label: "States Legal Basis for Processing",
    patterns: [
      /\blegal\s*basis\b/i,
      /\blawful\s*basis\b/i,
      /\blegitimate\s*interest/i,
      /\bconsent\b.*\blegal\b/i,
      /\bcontractual\s*necessity\b/i,
    ],
  },
  {
    id: "right-to-access",
    label: "Right to Access Data",
    patterns: [
      /\bright\s*to\s*access\b/i,
      /\baccess\s*(your|the)\s*(personal\s*)?(data|information)\b/i,
      /\brequest\s*(a\s*)?copy\s*of\b/i,
      /\bsubject\s*access\s*request\b/i,
    ],
  },
  {
    id: "right-to-erasure",
    label: "Right to Erasure / Deletion",
    patterns: [
      /\bright\s*to\s*(erasure|deletion|be\s*forgotten)\b/i,
      /\bdelete\s*(your|the)\s*(personal\s*)?(data|information|account)\b/i,
      /\brequest\s*(the\s*)?deletion\b/i,
    ],
  },
  {
    id: "right-to-rectification",
    label: "Right to Rectification",
    patterns: [
      /\bright\s*to\s*rectif/i,
      /\bcorrect\s*(your|inaccurate)\s*(personal\s*)?(data|information)\b/i,
      /\bupdate\s*(your\s*)?(personal\s*)?(data|information)\b/i,
    ],
  },
  {
    id: "right-to-portability",
    label: "Right to Data Portability",
    patterns: [
      /\bdata\s*portability\b/i,
      /\bright\s*to\s*portability\b/i,
      /\btransfer\s*(your\s*)?data\s*to\s*(another|a\s*different)/i,
      /\bexport\s*(your\s*)?(personal\s*)?(data|information)\b/i,
    ],
  },
  {
    id: "right-to-object",
    label: "Right to Object to Processing",
    patterns: [
      /\bright\s*to\s*object\b/i,
      /\bobject\s*to\s*(the\s*)?(processing|use)\b/i,
      /\bopt[\s-]*out\s*of\s*(the\s*)?(processing|use)\b/i,
    ],
  },
  {
    id: "dpo-contact",
    label: "Data Protection Officer Contact",
    patterns: [
      /\bdata\s*protection\s*officer\b/i,
      /\bDPO\b/,
      /\bprivacy\s*officer\b/i,
      /\bprivacy@|dpo@|dataprotection@/i,
    ],
  },
  {
    id: "breach-notification",
    label: "Data Breach Notification",
    patterns: [
      /\bdata\s*breach\b/i,
      /\bbreach\s*notification\b/i,
      /\bnotify\b.*\bbreach\b/i,
      /\bsecurity\s*incident\b/i,
    ],
  },
  {
    id: "cross-border-safeguards",
    label: "Cross-Border Transfer Safeguards",
    patterns: [
      /\bstandard\s*contractual\s*clauses\b/i,
      /\badequacy\s*decision\b/i,
      /\bbinding\s*corporate\s*rules\b/i,
      /\bprivacy\s*shield\b/i,
      /\bsafeguards?\b.*\btransfer\b/i,
    ],
  },
];

export function analyzeGdprCompliance(text: string): ComplianceResult {
  const checks = GDPR_CHECKS.map((check) => {
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

  return { framework: "GDPR", checks, score };
}
