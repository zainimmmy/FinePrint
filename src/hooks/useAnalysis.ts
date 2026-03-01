"use client";

import { useState, useCallback } from "react";
import { AnalysisResult } from "@/types/analysis";

type Status = "idle" | "loading" | "success" | "error";

interface UseAnalysisReturn {
  status: Status;
  result: AnalysisResult | null;
  error: string | null;
  analyze: (input: string, mode: "url" | "domain") => Promise<void>;
  reset: () => void;
}

export function useAnalysis(): UseAnalysisReturn {
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyze = useCallback(async (input: string, mode: "url" | "domain") => {
    setStatus("loading");
    setResult(null);
    setError(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input, mode }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Analysis failed.");
        setStatus("error");
        return;
      }

      setResult(data as AnalysisResult);
      setStatus("success");
    } catch {
      setError("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }, []);

  const reset = useCallback(() => {
    setStatus("idle");
    setResult(null);
    setError(null);
  }, []);

  return { status, result, error, analyze, reset };
}
