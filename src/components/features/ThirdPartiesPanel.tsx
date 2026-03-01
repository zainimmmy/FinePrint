"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { ThirdPartyMatch } from "@/types/analysis";

const categoryColors: Record<string, string> = {
  Analytics: "text-blue",
  Advertising: "text-orange",
  "Data Broker": "text-red",
  "Social Login": "text-purple",
  Payment: "text-emerald",
  Cloud: "text-cyan",
  CRM: "text-amber",
  "Email Marketing": "text-amber",
  Support: "text-cyan",
  "Data Sharing": "text-muted",
};

interface ThirdPartiesPanelProps {
  thirdParties: ThirdPartyMatch[];
}

export function ThirdPartiesPanel({ thirdParties }: ThirdPartiesPanelProps) {
  if (thirdParties.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Third-Party Sharing</CardTitle>
        </CardHeader>
        <p className="text-muted text-sm">No third-party sharing detected.</p>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>
            Third-Party Sharing
            <span className="text-muted text-sm font-normal ml-2">
              {thirdParties.length} found
            </span>
          </CardTitle>
        </CardHeader>
        <div className="space-y-2">
          {thirdParties.map((tp, i) => (
            <div
              key={`${tp.name}-${i}`}
              className="bg-surface-light rounded-lg p-3 border border-border flex items-start gap-3"
            >
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full bg-surface border border-border whitespace-nowrap ${
                  categoryColors[tp.category] || "text-muted"
                }`}
              >
                {tp.category}
              </span>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium text-foreground">
                  {tp.name}
                </span>
                <p className="text-xs text-muted mt-0.5 line-clamp-2">
                  &ldquo;{tp.matchedText}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
