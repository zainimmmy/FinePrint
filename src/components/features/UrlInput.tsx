"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";

interface UrlInputProps {
  onSubmit: (input: string, mode: "url" | "domain") => void;
  isLoading?: boolean;
}

export function UrlInput({ onSubmit, isLoading }: UrlInputProps) {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"domain" | "url">("domain");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input.trim(), mode);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      {/* Mode toggle */}
      <div className="flex justify-center gap-1 mb-4 bg-surface rounded-lg p-1 max-w-xs mx-auto">
        <button
          type="button"
          onClick={() => setMode("domain")}
          className={cn(
            "px-4 py-1.5 rounded-md text-sm font-medium transition-all cursor-pointer",
            mode === "domain"
              ? "bg-cyan/10 text-cyan"
              : "text-muted hover:text-foreground"
          )}
        >
          Domain
        </button>
        <button
          type="button"
          onClick={() => setMode("url")}
          className={cn(
            "px-4 py-1.5 rounded-md text-sm font-medium transition-all cursor-pointer",
            mode === "url"
              ? "bg-cyan/10 text-cyan"
              : "text-muted hover:text-foreground"
          )}
        >
          Direct URL
        </button>
      </div>

      {/* Input field */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              mode === "domain"
                ? "e.g. spotify, chatgpt, google.com"
                : "e.g. https://spotify.com/privacy"
            }
            className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted/50 focus:outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/30 font-mono text-sm transition-all"
            disabled={isLoading}
          />
          <div className="absolute inset-0 rounded-lg pointer-events-none opacity-0 focus-within:opacity-100 transition-opacity"
            style={{ boxShadow: "0 0 20px rgba(34, 211, 238, 0.1)" }}
          />
        </div>
        <Button type="submit" disabled={!input.trim() || isLoading} size="lg">
          {isLoading ? "Analyzing..." : "Analyze"}
        </Button>
      </div>
    </form>
  );
}
