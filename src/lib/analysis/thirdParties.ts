import { ThirdPartyMatch } from "@/types/analysis";
import {
  THIRD_PARTY_ENTITIES,
  GENERIC_SHARING_PATTERNS,
} from "@/lib/constants/thirdPartyList";
import { splitSentences } from "@/utils/textUtils";

export function analyzeThirdParties(text: string): ThirdPartyMatch[] {
  const textLower = text.toLowerCase();
  const sentences = splitSentences(text);
  const matches: ThirdPartyMatch[] = [];
  const seen = new Set<string>();

  // Named entity matching
  for (const entity of THIRD_PARTY_ENTITIES) {
    for (const alias of entity.aliases) {
      if (textLower.includes(alias) && !seen.has(entity.name)) {
        seen.add(entity.name);
        const matchedSentence =
          sentences.find((s) => s.toLowerCase().includes(alias)) || alias;
        matches.push({
          name: entity.name,
          category: entity.category,
          matchedText: matchedSentence.slice(0, 200),
          description: entity.description,
        });
        break;
      }
    }
  }

  // Generic sharing pattern detection
  for (const pattern of GENERIC_SHARING_PATTERNS) {
    for (const sentence of sentences) {
      if (pattern.test(sentence) && !seen.has(sentence.slice(0, 50))) {
        seen.add(sentence.slice(0, 50));
        matches.push({
          name: "Third-Party Sharing",
          category: "Data Sharing",
          matchedText: sentence.slice(0, 200),
          description: "Generic third-party data sharing detected.",
        });
        break; // One match per pattern is enough
      }
    }
  }

  return matches;
}
