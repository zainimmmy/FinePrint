"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ComplianceResult } from "@/types/analysis";

interface CompliancePanelProps {
  result: ComplianceResult;
  delay?: number;
}

export function CompliancePanel({ result, delay = 0.6 }: CompliancePanelProps) {
  const passed = result.checks.filter((c) => c.passed).length;
  const total = result.checks.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card>
        <CardHeader>
          <CardTitle>
            {result.framework} Compliance
            <span className="text-muted text-sm font-normal ml-2">
              {passed}/{total} checks passed
            </span>
          </CardTitle>
        </CardHeader>
        <ProgressBar value={result.score} className="mb-4" />
        <div className="space-y-2">
          {result.checks.map((check) => (
            <div
              key={check.id}
              className="flex items-center gap-3 py-1.5"
            >
              <StatusBadge passed={check.passed} />
              <div className="flex-1">
                <span className="text-sm text-foreground">{check.label}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
