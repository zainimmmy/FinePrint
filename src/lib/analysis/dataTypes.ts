import { DataTypeMatch } from "@/types/analysis";
import { DATA_TYPE_PATTERNS } from "@/lib/constants/patterns";
import { splitSentences } from "@/utils/textUtils";

export function analyzeDataTypes(text: string): DataTypeMatch[] {
  const sentences = splitSentences(text);
  const matches: DataTypeMatch[] = [];
  const seen = new Set<string>();

  for (const pattern of DATA_TYPE_PATTERNS) {
    for (const sentence of sentences) {
      const matched = pattern.patterns.some((re) => re.test(sentence));
      if (matched && !seen.has(pattern.category + pattern.label)) {
        seen.add(pattern.category + pattern.label);
        matches.push({
          category: pattern.category,
          label: pattern.label,
          severity: pattern.severity,
          matchedText: sentence.slice(0, 200),
          description: pattern.description,
        });
        break;
      }
    }
  }

  return matches;
}
