"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { UrlInput } from "@/components/features/UrlInput";
import { Card } from "@/components/ui/Card";

const features = [
  {
    icon: "🔍",
    title: "Data Collection",
    desc: "Identifies 15+ categories of personal data being collected",
  },
  {
    icon: "🔗",
    title: "Third-Party Sharing",
    desc: "Detects 30+ known trackers, ad networks, and data brokers",
  },
  {
    icon: "⚠️",
    title: "Sketchy Clauses",
    desc: "Flags forced arbitration, data selling, vague retention, and more",
  },
  {
    icon: "✅",
    title: "Compliance Checks",
    desc: "Evaluates GDPR and CCPA compliance with 20 automated checks",
  },
];

export default function HomePage() {
  const router = useRouter();

  const handleSubmit = (input: string, mode: "url" | "domain") => {
    const params = new URLSearchParams({ input, mode });
    router.push(`/analyze?${params.toString()}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-grid">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
            See what they&apos;re{" "}
            <span className="text-cyan">really</span> saying
          </h1>
          <p className="text-lg text-muted max-w-xl mx-auto">
            Analyze any website&apos;s privacy policy in seconds. Get a privacy risk grade,
            data collection insights, and compliance checks — all for free.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-2xl"
        >
          <UrlInput onSubmit={handleSubmit} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16 max-w-4xl w-full"
        >
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              <Card glow className="text-center h-full">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="text-sm font-semibold text-foreground mb-1">
                  {f.title}
                </h3>
                <p className="text-xs text-muted">{f.desc}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
