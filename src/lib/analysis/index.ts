import { AnalysisResult, PolicyMetadata } from "@/types/analysis";
import { analyzeDataTypes } from "./dataTypes";
import { analyzeThirdParties } from "./thirdParties";
import { analyzeSketchyClauses } from "./sketchyClauses";
import { analyzeGdprCompliance } from "./gdprCompliance";
import { analyzeCcpaCompliance } from "./ccpaCompliance";
import { analyzeReadability } from "./readability";
import { calculateGrade } from "./grading";
import { countWords, estimateReadTime } from "@/utils/textUtils";

export function analyzePolicy(
  text: string,
  metadata: Omit<PolicyMetadata, "wordCount" | "readTimeMinutes" | "scrapedAt">
): AnalysisResult {
  const dataTypes = analyzeDataTypes(text);
  const thirdParties = analyzeThirdParties(text);
  const sketchyClauses = analyzeSketchyClauses(text);
  const gdpr = analyzeGdprCompliance(text);
  const ccpa = analyzeCcpaCompliance(text);
  const readability = analyzeReadability(text);

  const { grade, numericScore, breakdown } = calculateGrade(
    dataTypes,
    thirdParties,
    sketchyClauses,
    gdpr,
    ccpa,
    readability
  );

  const wordCount = countWords(text);

  const fullMetadata: PolicyMetadata = {
    ...metadata,
    wordCount,
    readTimeMinutes: estimateReadTime(wordCount),
    scrapedAt: new Date().toISOString(),
  };

  const summary = generateSummary(
    grade,
    dataTypes.length,
    thirdParties.length,
    sketchyClauses.length,
    gdpr.score,
    ccpa.score
  );

  return {
    grade,
    numericScore,
    breakdown,
    dataTypes,
    thirdParties,
    sketchyClauses,
    gdpr,
    ccpa,
    readability,
    metadata: fullMetadata,
    summary,
  };
}

function generateSummary(
  grade: string,
  dataTypeCount: number,
  thirdPartyCount: number,
  sketchyCount: number,
  gdprScore: number,
  ccpaScore: number
): string {
  const parts: string[] = [];

  if (grade === "A" || grade === "B") {
    parts.push("This privacy policy is relatively transparent and privacy-respecting.");
  } else if (grade === "C") {
    parts.push("This privacy policy has some concerning aspects that users should be aware of.");
  } else {
    parts.push("This privacy policy raises significant privacy concerns.");
  }

  if (dataTypeCount > 8) {
    parts.push(`It collects ${dataTypeCount} categories of personal data, which is extensive.`);
  } else if (dataTypeCount > 4) {
    parts.push(`It collects ${dataTypeCount} categories of personal data.`);
  }

  if (thirdPartyCount > 5) {
    parts.push(`Data is shared with ${thirdPartyCount} identified third parties or categories.`);
  } else if (thirdPartyCount > 0) {
    parts.push(`Some third-party data sharing was identified.`);
  }

  if (sketchyCount > 0) {
    parts.push(`${sketchyCount} potentially concerning clause(s) were found.`);
  }

  if (gdprScore < 50) {
    parts.push("GDPR compliance appears limited.");
  }

  if (ccpaScore < 50) {
    parts.push("CCPA compliance appears limited.");
  }

  return parts.join(" ");
}
