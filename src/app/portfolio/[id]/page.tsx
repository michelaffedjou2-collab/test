"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import ParticleBackground from "@/components/ParticleBackground";
import PortfolioPreview from "@/components/PortfolioPreview";
import { PortfolioData } from "@/types/portfolio";

export default function PortfolioPage() {
  const params = useParams();
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const id = params.id as string;
    if (!id) return;

    fetch(`/api/portfolio/${id}`)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Portfolio not found");
        }
        const data = await res.json();
        setPortfolio(data.portfolio);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Failed to load");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params.id]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Portfolio link copied to clipboard!");
  };

  if (loading) {
    return (
      <main className="relative min-h-screen bg-grid flex items-center justify-center">
        <ParticleBackground />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center z-10"
        >
          <div className="w-12 h-12 rounded-full mx-auto mb-4 animate-spin-slow" style={{
            background: "conic-gradient(from 0deg, #667eea, #764ba2, #f093fb, #667eea)",
          }} />
          <p className="text-gray-400">Loading portfolio...</p>
        </motion.div>
      </main>
    );
  }

  if (error || !portfolio) {
    return (
      <main className="relative min-h-screen bg-grid flex items-center justify-center">
        <ParticleBackground />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center z-10 glass rounded-2xl p-8 max-w-md mx-4"
        >
          <span className="text-4xl mb-4 block">😔</span>
          <h2 className="text-xl font-semibold text-white mb-2">
            Portfolio Not Found
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            This portfolio may have expired or the link is invalid. Portfolios
            are stored temporarily in memory.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-2.5 rounded-xl text-white font-medium bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105 transition-transform"
          >
            Create Your Portfolio
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-grid">
      <ParticleBackground />
      <div className="relative z-10 px-4 py-8">
        <PortfolioPreview data={portfolio} onShare={handleShare} />
      </div>
    </main>
  );
}
