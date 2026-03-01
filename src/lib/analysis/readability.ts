import { ReadabilityResult } from "@/types/analysis";
import { countWords, countSyllables } from "@/utils/textUtils";

export function analyzeReadability(text: string): ReadabilityResult {
  const sentences = text
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  const words = text.split(/\s+/).filter((w) => w.length > 0);

  const totalWords = words.length;
  const totalSentences = Math.max(sentences.length, 1);
  const totalSyllables = words.reduce(
    (sum, word) => sum + countSyllables(word),
    0
  );

  // Flesch-Kincaid Reading Ease
  const fleschKincaid =
    206.835 -
    1.015 * (totalWords / totalSentences) -
    84.6 * (totalSyllables / totalWords);

  // Flesch-Kincaid Grade Level
  const gradeLevel =
    0.39 * (totalWords / totalSentences) +
    11.8 * (totalSyllables / totalWords) -
    15.59;

  const clamped = Math.max(0, Math.min(100, Math.round(fleschKincaid)));
  const grade = Math.max(0, Math.round(gradeLevel * 10) / 10);

  let label: string;
  if (clamped >= 60) label = "Easy";
  else if (clamped >= 40) label = "Moderate";
  else if (clamped >= 20) label = "Difficult";
  else label = "Very Difficult";

  return {
    fleschKincaid: clamped,
    gradeLevel: grade,
    label,
  };
}
