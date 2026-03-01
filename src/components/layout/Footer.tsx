export function Footer() {
  return (
    <footer className="border-t border-border py-8 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center text-sm text-muted">
        <p>
          <span className="text-foreground font-medium">FinePrint</span> — Privacy Policy Analyzer
        </p>
        <p className="mt-1">
          Built with Next.js, TypeScript, and rule-based heuristics. No data is stored.
        </p>
      </div>
    </footer>
  );
}
