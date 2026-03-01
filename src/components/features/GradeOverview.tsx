"use client";

import { motion } from "framer-motion";
import { GradeRing } from "@/components/ui/GradeRing";
import { Card } from "@/components/ui/Card";
import { Grade } from "@/types/analysis";

interface GradeOverviewProps {
  grade: Grade;
  score: number;
  summary: string;
  domain: string;
}

export function GradeOverview({ grade, score, summary, domain }: GradeOverviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <Card className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
        <GradeRing grade={grade} score={score} />
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-2xl font-bold text-foreground mb-1">{domain}</h2>
          <p className="text-muted text-sm leading-relaxed">{summary}</p>
        </div>
      </Card>
    </motion.div>
  );
}
