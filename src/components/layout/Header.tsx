"use client";

import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-border bg-surface/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-cyan/10 flex items-center justify-center border border-cyan/30 group-hover:glow-cyan transition-all">
            <span className="text-cyan font-bold text-sm font-mono">FP</span>
          </div>
          <span className="font-semibold text-foreground text-lg">
            Fine<span className="text-cyan">Print</span>
          </span>
        </Link>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted hover:text-foreground transition-colors text-sm"
        >
          GitHub
        </a>
      </div>
    </header>
  );
}
