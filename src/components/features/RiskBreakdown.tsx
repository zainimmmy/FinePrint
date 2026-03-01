"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { GradeBreakdown } from "@/types/analysis";

interface RiskBreakdownProps {
  breakdown: GradeBreakdown[];
}

export function RiskBreakdown({ breakdown }: RiskBreakdownProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Risk Breakdown</CardTitle>
        </CardHeader>
        <div className="space-y-4">
          {breakdown.map((item) => (
            <ProgressBar
              key={item.category}
              value={item.score}
              label={`${item.category} (${Math.round(item.weight * 100)}%)`}
            />
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
