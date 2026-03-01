import { SketchyClause, Severity } from "@/types/analysis";
import { splitSentences } from "@/utils/textUtils";

interface SketchyPattern {
  id: string;
  label: string;
  severity: Severity;
  patterns: RegExp[];
  explanation: string;
}

const SKETCHY_PATTERNS: SketchyPattern[] = [
  {
    id: "data-selling",
    label: "Data Selling",
    severity: "critical",
    patterns: [
      /\b(sell|sold|selling)\b.*\b(personal\s*(data|information)|your\s*(data|information))/i,
      /\b(personal\s*(data|information))\b.*\b(sell|sold|selling)\b/i,
      /\bmoneti[sz]e\b.*\b(data|information)\b/i,
    ],
    explanation: "The policy suggests your personal data may be sold to others.",
  },
  {
    id: "unlimited-sharing",
    label: "Unlimited Data Sharing",
    severity: "critical",
    patterns: [
      /\bshare\b.*\b(any|all)\b.*\b(information|data)\b.*\b(any|all)\b.*\bthird[\s-]*part/i,
      /\bwithout\s*(any\s*)?restriction/i,
      /\bfor\s*any\s*purpose\b/i,
    ],
    explanation:
      "The policy claims broad, unrestricted rights to share your data.",
  },
  {
    id: "retroactive-changes",
    label: "Retroactive Policy Changes",
    severity: "high",
    patterns: [
      /\b(change|modify|update|amend|revise)\b.*\b(policy|terms)\b.*\b(at\s*any\s*time|without\s*(prior\s*)?notice)/i,
      /\bwithout\s*(prior\s*)?notice\b.*\b(change|modify|update)\b/i,
      /\bcontinued\s*use\b.*\bconstitutes?\s*(acceptance|agreement|consent)/i,
    ],
    explanation:
      "The policy can change without notice, and continued use means acceptance.",
  },
  {
    id: "forced-arbitration",
    label: "Forced Arbitration",
    severity: "high",
    patterns: [
      /\b(binding\s*arbitration|mandatory\s*arbitration|agree\s*to\s*arbitrat)/i,
      /\bwaive\b.*\b(right\s*to\s*(a\s*)?(jury\s*)?trial|class[\s-]*action)/i,
    ],
    explanation:
      "You may be forced into arbitration and waive your right to sue.",
  },
  {
    id: "class-action-waiver",
    label: "Class Action Waiver",
    severity: "high",
    patterns: [
      /\bclass[\s-]*action\s*waiver\b/i,
      /\bwaive\b.*\bclass[\s-]*action\b/i,
      /\bno\s*class[\s-]*action/i,
    ],
    explanation:
      "You waive your right to participate in class action lawsuits.",
  },
  {
    id: "vague-retention",
    label: "Vague Data Retention",
    severity: "medium",
    patterns: [
      /\b(retain|keep|store)\b.*\b(indefinitely|as\s*long\s*as\s*(necessary|needed)|for\s*as\s*long\s*as)/i,
      /\b(no\s*(specific|defined)\s*retention|retention\s*period\s*is\s*not\s*defined)/i,
    ],
    explanation:
      "The policy is vague about how long your data is kept.",
  },
  {
    id: "broad-collection",
    label: "Broad Data Collection",
    severity: "high",
    patterns: [
      /\b(collect|gather)\b.*\b(all\s*available|any\s*(and\s*all)?|as\s*much\s*as)\b.*\b(data|information)\b/i,
      /\b(any\s*information\s*(you|that)|all\s*information\s*(you|that))\b.*\b(provid|submit|enter)/i,
    ],
    explanation:
      "The policy claims rights to collect very broad categories of data.",
  },
  {
    id: "third-party-tracking",
    label: "Extensive Third-Party Tracking",
    severity: "high",
    patterns: [
      /\b(third[\s-]*party)\b.*\b(track|monitor|surveil)/i,
      /\b(advertising\s*partners?|ad\s*networks?)\b.*\b(track|collect|monitor)\b/i,
      /\bcross[\s-]*site\s*tracking\b/i,
    ],
    explanation:
      "Third parties may track your activity across websites.",
  },
  {
    id: "government-sharing",
    label: "Government Data Sharing",
    severity: "medium",
    patterns: [
      /\b(law\s*enforcement|government|authorities|subpoena|court\s*order|legal\s*process)\b.*\b(share|disclose|provide|hand\s*over)/i,
      /\b(disclose|share|provide)\b.*\b(law\s*enforcement|government|authorities)/i,
    ],
    explanation:
      "The policy mentions sharing data with government/law enforcement.",
  },
  {
    id: "surveillance",
    label: "User Monitoring / Surveillance",
    severity: "critical",
    patterns: [
      /\b(monitor|surveil|record)\b.*\b(activit|behavior|action|keystroke|screen)/i,
      /\b(screenshot|screen\s*capture|keylog|keystroke\s*log)/i,
    ],
    explanation:
      "The policy mentions monitoring or surveilling user activity.",
  },
  {
    id: "no-opt-out",
    label: "No Opt-Out Option",
    severity: "high",
    patterns: [
      /\b(cannot|can\s*not|unable\s*to)\s*(opt[\s-]*out|decline|refuse)\b/i,
      /\bno\s*(option|ability|way)\s*to\s*(opt[\s-]*out|decline|refuse)\b/i,
    ],
    explanation:
      "The policy indicates you cannot opt out of certain data practices.",
  },
  {
    id: "data-transfer-abroad",
    label: "International Data Transfer",
    severity: "medium",
    patterns: [
      /\b(transfer|transmit|send)\b.*\b(data|information)\b.*\b(outside|abroad|international|other\s*countr)/i,
      /\b(data|information)\b.*\b(transfer|transmit)\b.*\b(outside|abroad|international)/i,
    ],
    explanation:
      "Your data may be transferred to other countries with different privacy laws.",
  },
];

export function analyzeSketchyClauses(text: string): SketchyClause[] {
  const sentences = splitSentences(text);
  const matches: SketchyClause[] = [];
  const seen = new Set<string>();

  for (const pattern of SKETCHY_PATTERNS) {
    for (const sentence of sentences) {
      if (
        !seen.has(pattern.id) &&
        pattern.patterns.some((re) => re.test(sentence))
      ) {
        seen.add(pattern.id);
        matches.push({
          id: pattern.id,
          label: pattern.label,
          severity: pattern.severity,
          matchedText: sentence.slice(0, 250),
          explanation: pattern.explanation,
        });
        break;
      }
    }
  }

  return matches;
}
