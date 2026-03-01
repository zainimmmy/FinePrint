"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { PolicyMetadata as PolicyMetadataType, ReadabilityResult } from "@/types/analysis";

interface PolicyMetadataProps {
  metadata: PolicyMetadataType;
  readability: ReadabilityResult;
}

export function PolicyMetadataPanel({ metadata, readability }: PolicyMetadataProps) {
  const stats = [
    { label: "Words", value: metadata.wordCount.toLocaleString() },
    { label: "Read Time", value: `${metadata.readTimeMinutes} min` },
    { label: "Reading Level", value: readability.label },
    { label: "Grade Level", value: `Grade ${readability.gradeLevel}` },
    { label: "Flesch-Kincaid", value: `${readability.fleschKincaid}/100` },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Policy Metadata</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center bg-surface-light rounded-lg p-3">
              <div className="text-lg font-bold font-mono text-foreground">
                {stat.value}
              </div>
              <div className="text-xs text-muted mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-muted">
            <span className="font-medium">Source:</span>{" "}
            <a
              href={metadata.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan hover:underline"
            >
              {metadata.url}
            </a>
          </p>
          <p className="text-xs text-muted mt-1">
            <span className="font-medium">Analyzed:</span>{" "}
            {new Date(metadata.scrapedAt).toLocaleString()}
          </p>
        </div>
      </Card>
    </motion.div>
  );
}
