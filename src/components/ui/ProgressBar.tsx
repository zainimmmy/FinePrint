"use client";

import { cn } from "@/utils/cn";

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  className?: string;
  label?: string;
}

export function ProgressBar({
  value,
  max = 100,
  color,
  className,
  label,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  const barColor =
    color ||
    (pct >= 70
      ? "bg-emerald"
      : pct >= 40
        ? "bg-amber"
        : "bg-red");

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-muted">{label}</span>
          <span className="text-sm font-mono text-foreground">{Math.round(pct)}%</span>
        </div>
      )}
      <div className="w-full h-2 bg-surface-light rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-1000 ease-out", barColor)}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
