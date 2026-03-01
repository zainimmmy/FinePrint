import { cn } from "@/utils/cn";
import { Severity } from "@/types/analysis";

const severityStyles: Record<Severity, string> = {
  low: "bg-emerald/10 text-emerald border-emerald/20",
  medium: "bg-amber/10 text-amber border-amber/20",
  high: "bg-orange/10 text-orange border-orange/20",
  critical: "bg-red/10 text-red border-red/20",
};

interface BadgeProps {
  severity: Severity;
  children: React.ReactNode;
  className?: string;
}

export function Badge({ severity, children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border",
        severityStyles[severity],
        className
      )}
    >
      {children}
    </span>
  );
}

export function StatusBadge({
  passed,
  className,
}: {
  passed: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold",
        passed
          ? "bg-emerald/20 text-emerald"
          : "bg-red/20 text-red",
        className
      )}
    >
      {passed ? "\u2713" : "\u2717"}
    </span>
  );
}
