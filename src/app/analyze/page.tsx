"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { UrlInput } from "@/components/features/UrlInput";
import { LoadingState } from "@/components/features/LoadingState";
import { GradeOverview } from "@/components/features/GradeOverview";
import { RiskBreakdown } from "@/components/features/RiskBreakdown";
import { DataTypesPanel } from "@/components/features/DataTypesPanel";
import { ThirdPartiesPanel } from "@/components/features/ThirdPartiesPanel";
import { SketchyClausesPanel } from "@/components/features/SketchyClausesPanel";
import { CompliancePanel } from "@/components/features/CompliancePanel";
import { PolicyMetadataPanel } from "@/components/features/PolicyMetadata";
import { useAnalysis } from "@/hooks/useAnalysis";
import { Button } from "@/components/ui/Button";

function AnalyzeContent() {
  const searchParams = useSearchParams();
  const { status, result, error, analyze, reset } = useAnalysis();

  const input = searchParams.get("input") || "";
  const mode = (searchParams.get("mode") as "url" | "domain") || "domain";

  useEffect(() => {
    if (input && status === "idle") {
      analyze(input, mode);
    }
  }, [input, mode, status, analyze]);

  const handleNewAnalysis = (newInput: string, newMode: "url" | "domain") => {
    reset();
    // Small delay so the reset takes effect
    setTimeout(() => analyze(newInput, newMode), 50);
  };

  return (
    <div className="min-h-screen flex flex-col bg-grid">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8">
        {/* Search bar at top */}
        <div className="mb-8">
          <UrlInput onSubmit={handleNewAnalysis} isLoading={status === "loading"} />
        </div>

        {/* Loading state */}
        {status === "loading" && <LoadingState />}

        {/* Error state */}
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl mx-auto text-center"
          >
            <div className="bg-surface border border-red/30 rounded-xl p-8">
              <div className="text-4xl mb-4">&#x26A0;</div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Analysis Failed
              </h2>
              <p className="text-muted text-sm mb-6">{error}</p>
              <Button variant="secondary" onClick={reset}>
                Try Again
              </Button>
            </div>
          </motion.div>
        )}

        {/* Results */}
        {status === "success" && result && (
          <div className="space-y-6">
            <GradeOverview
              grade={result.grade}
              score={result.numericScore}
              summary={result.summary}
              domain={result.metadata.domain}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RiskBreakdown breakdown={result.breakdown} />
              <PolicyMetadataPanel
                metadata={result.metadata}
                readability={result.readability}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DataTypesPanel dataTypes={result.dataTypes} />
              <ThirdPartiesPanel thirdParties={result.thirdParties} />
            </div>

            <SketchyClausesPanel clauses={result.sketchyClauses} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CompliancePanel result={result.gdpr} delay={0.6} />
              <CompliancePanel result={result.ccpa} delay={0.7} />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default function AnalyzePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-muted">Loading...</div>
      </div>
    }>
      <AnalyzeContent />
    </Suspense>
  );
}
