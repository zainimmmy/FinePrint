"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const SCAN_LINES = [
  "Discovering privacy policy...",
  "Fetching page content...",
  "Extracting policy text...",
  "Analyzing data collection patterns...",
  "Identifying third-party sharing...",
  "Scanning for sketchy clauses...",
  "Checking GDPR compliance...",
  "Checking CCPA compliance...",
  "Computing readability score...",
  "Calculating privacy grade...",
];

export function LoadingState() {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < SCAN_LINES.length) {
        setLines((prev) => [...prev, SCAN_LINES[idx]]);
        idx++;
      } else {
        // Loop back
        idx = 0;
        setLines([]);
      }
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-xl mx-auto"
    >
      <div className="bg-surface border border-border rounded-xl p-6 font-mono text-sm">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
          <div className="w-3 h-3 rounded-full bg-red/60" />
          <div className="w-3 h-3 rounded-full bg-amber/60" />
          <div className="w-3 h-3 rounded-full bg-emerald/60" />
          <span className="text-muted ml-2 text-xs">fineprint — analysis</span>
        </div>
        <div className="space-y-1.5">
          {lines.map((line, i) => (
            <motion.div
              key={`${line}-${i}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <span className="text-cyan">$</span>
              <span className="text-foreground/80">{line}</span>
              {i === lines.length - 1 && (
                <span className="text-cyan cursor-blink">_</span>
              )}
            </motion.div>
          ))}
          {lines.length === 0 && (
            <div className="flex items-center gap-2">
              <span className="text-cyan">$</span>
              <span className="text-cyan cursor-blink">_</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
