export type Grade = "A" | "B" | "C" | "D" | "F";

export type Severity = "low" | "medium" | "high" | "critical";

export interface DataTypeMatch {
  category: string;
  label: string;
  severity: Severity;
  matchedText: string;
  description: string;
}

export interface ThirdPartyMatch {
  name: string;
  category: string;
  matchedText: string;
  description: string;
}

export interface SketchyClause {
  id: string;
  label: string;
  severity: Severity;
  matchedText: string;
  explanation: string;
}

export interface ComplianceCheck {
  id: string;
  label: string;
  passed: boolean;
  details: string;
}

export interface ComplianceResult {
  framework: "GDPR" | "CCPA";
  checks: ComplianceCheck[];
  score: number; // 0-100
}

export interface ReadabilityResult {
  fleschKincaid: number;
  gradeLevel: number;
  label: string; // "Easy", "Moderate", "Difficult", "Very Difficult"
}

export interface PolicyMetadata {
  url: string;
  domain: string;
  title: string;
  wordCount: number;
  readTimeMinutes: number;
  lastModified?: string;
  scrapedAt: string;
}

export interface GradeBreakdown {
  category: string;
  score: number; // 0-100
  weight: number;
  label: string;
}

export interface AnalysisResult {
  grade: Grade;
  numericScore: number; // 0-100
  breakdown: GradeBreakdown[];
  dataTypes: DataTypeMatch[];
  thirdParties: ThirdPartyMatch[];
  sketchyClauses: SketchyClause[];
  gdpr: ComplianceResult;
  ccpa: ComplianceResult;
  readability: ReadabilityResult;
  metadata: PolicyMetadata;
  summary: string;
}

export interface AnalysisRequest {
  input: string;
  mode: "url" | "domain";
}

export interface AnalysisError {
  error: string;
  details?: string;
}
