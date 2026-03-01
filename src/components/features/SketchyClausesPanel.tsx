"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SketchyClause } from "@/types/analysis";

interface SketchyClausesPanelProps {
  clauses: SketchyClause[];
}

export function SketchyClausesPanel({ clauses }: SketchyClausesPanelProps) {
  if (clauses.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sketchy Clauses</CardTitle>
        </CardHeader>
        <p className="text-emerald text-sm">No concerning clauses detected. Nice!</p>
      </Card>
    );
  }

  const sorted = [...clauses].sort((a, b) => {
    const order = { critical: 0, high: 1, medium: 2, low: 3 };
    return order[a.severity] - order[b.severity];
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>
            Sketchy Clauses
            <span className="text-red text-sm font-normal ml-2">
              {clauses.length} found
            </span>
          </CardTitle>
        </CardHeader>
        <div className="space-y-3">
          {sorted.map((clause) => (
            <div
              key={clause.id}
              className="bg-surface-light rounded-lg p-4 border border-border"
            >
              <div className="flex items-center gap-2 mb-2">
                <Badge severity={clause.severity}>{clause.severity}</Badge>
                <span className="text-sm font-semibold text-foreground">
                  {clause.label}
                </span>
              </div>
              <p className="text-sm text-muted mb-2">{clause.explanation}</p>
              <p className="text-xs text-muted/70 italic line-clamp-3">
                &ldquo;{clause.matchedText}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
