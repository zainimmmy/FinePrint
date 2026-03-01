"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { DataTypeMatch } from "@/types/analysis";

interface DataTypesPanelProps {
  dataTypes: DataTypeMatch[];
}

export function DataTypesPanel({ dataTypes }: DataTypesPanelProps) {
  if (dataTypes.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Data Collection</CardTitle>
        </CardHeader>
        <p className="text-muted text-sm">No specific data collection patterns detected.</p>
      </Card>
    );
  }

  // Group by category
  const grouped = dataTypes.reduce<Record<string, DataTypeMatch[]>>((acc, dt) => {
    (acc[dt.category] ??= []).push(dt);
    return acc;
  }, {});

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>
            Data Collection
            <span className="text-muted text-sm font-normal ml-2">
              {dataTypes.length} type{dataTypes.length !== 1 ? "s" : ""} detected
            </span>
          </CardTitle>
        </CardHeader>
        <div className="space-y-4">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-xs font-medium text-muted uppercase tracking-wider mb-2">
                {category}
              </h4>
              <div className="space-y-2">
                {items.map((item) => (
                  <div
                    key={item.label}
                    className="bg-surface-light rounded-lg p-3 border border-border"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-foreground">
                        {item.label}
                      </span>
                      <Badge severity={item.severity}>{item.severity}</Badge>
                    </div>
                    <p className="text-xs text-muted line-clamp-2">
                      &ldquo;{item.matchedText}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
