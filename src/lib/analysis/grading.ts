import { Grade, GradeBreakdown, Severity } from "@/types/analysis";
import { DataTypeMatch } from "@/types/analysis";
import { ThirdPartyMatch } from "@/types/analysis";
import { SketchyClause } from "@/types/analysis";
import { ComplianceResult } from "@/types/analysis";
import { ReadabilityResult } from "@/types/analysis";

const SEVERITY_PENALTY: Record<Severity, number> = {
  low: 3,
  medium: 8,
  high: 15,
  critical: 25,
};

function scoreDataTypes(matches: DataTypeMatch[]): number {
  let penalty = 0;
  for (const m of matches) {
    penalty += SEVERITY_PENALTY[m.severity];
  }
  return Math.max(0, 100 - penalty);
}

function scoreThirdParties(matches: ThirdPartyMatch[]): number {
  const namedParties = matches.filter((m) => m.category !== "Data Sharing");
  const genericSharing = matches.filter((m) => m.category === "Data Sharing");

  let penalty = namedParties.length * 8 + genericSharing.length * 5;

  // Extra penalties for especially concerning categories
  const adCount = namedParties.filter(
    (m) => m.category === "Advertising" || m.category === "Data Broker"
  ).length;
  penalty += adCount * 5;

  return Math.max(0, 100 - penalty);
}

function scoreSketchyClauses(clauses: SketchyClause[]): number {
  let penalty = 0;
  for (const c of clauses) {
    penalty += SEVERITY_PENALTY[c.severity] * 1.5;
  }
  return Math.max(0, 100 - penalty);
}

function scoreReadability(result: ReadabilityResult): number {
  // Higher Flesch-Kincaid = easier to read = better score
  return result.fleschKincaid;
}

export function calculateGrade(
  dataTypes: DataTypeMatch[],
  thirdParties: ThirdPartyMatch[],
  sketchyClauses: SketchyClause[],
  gdpr: ComplianceResult,
  ccpa: ComplianceResult,
  readability: ReadabilityResult
): { grade: Grade; numericScore: number; breakdown: GradeBreakdown[] } {
  const breakdown: GradeBreakdown[] = [
    {
      category: "Data Collection",
      score: scoreDataTypes(dataTypes),
      weight: 0.2,
      label: "Types of data collected",
    },
    {
      category: "Third Parties",
      score: scoreThirdParties(thirdParties),
      weight: 0.2,
      label: "Third-party data sharing",
    },
    {
      category: "Sketchy Clauses",
      score: scoreSketchyClauses(sketchyClauses),
      weight: 0.25,
      label: "Concerning language and clauses",
    },
    {
      category: "GDPR Compliance",
      score: gdpr.score,
      weight: 0.15,
      label: "GDPR compliance indicators",
    },
    {
      category: "CCPA Compliance",
      score: ccpa.score,
      weight: 0.1,
      label: "CCPA compliance indicators",
    },
    {
      category: "Readability",
      score: scoreReadability(readability),
      weight: 0.1,
      label: "How easy the policy is to read",
    },
  ];

  const numericScore = Math.round(
    breakdown.reduce((sum, b) => sum + b.score * b.weight, 0)
  );

  let grade: Grade;
  if (numericScore >= 80) grade = "A";
  else if (numericScore >= 65) grade = "B";
  else if (numericScore >= 50) grade = "C";
  else if (numericScore >= 35) grade = "D";
  else grade = "F";

  return { grade, numericScore, breakdown };
}
