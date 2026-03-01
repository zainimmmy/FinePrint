"use client";

import { Grade } from "@/types/analysis";
import { cn } from "@/utils/cn";

const gradeColors: Record<Grade, string> = {
  A: "#10b981",
  B: "#22d3ee",
  C: "#f59e0b",
  D: "#f97316",
  F: "#ef4444",
};

interface GradeRingProps {
  grade: Grade;
  score: number;
  size?: number;
  className?: string;
}

export function GradeRing({ grade, score, size = 140, className }: GradeRingProps) {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = gradeColors[grade];

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-border"
        />
        {/* Score ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="animate-draw-ring"
          style={{ filter: `drop-shadow(0 0 6px ${color}50)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="text-4xl font-bold"
          style={{ color }}
        >
          {grade}
        </span>
        <span className="text-sm text-muted">{score}/100</span>
      </div>
    </div>
  );
}
