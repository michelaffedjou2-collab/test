"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ParticleBackground from "@/components/ParticleBackground";
import FileUpload from "@/components/FileUpload";
import LoadingAnimation from "@/components/LoadingAnimation";
import PortfolioPreview from "@/components/PortfolioPreview";
import { PortfolioData } from "@/types/portfolio";

export default function Home() {
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelected = useCallback(async (file: File) => {
    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const extractRes = await fetch("/api/extract", {
        method: "POST",
        body: formData,
      });

      if (!extractRes.ok) {
        const errData = await extractRes.json();
        throw new Error(errData.error || "Échec de l'extraction du texte du PDF");
      }

      const { text } = await extractRes.json();

      const generateRes = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cvText: text }),
      });

      if (!generateRes.ok) {
        const errData = await generateRes.json();
        throw new Error(errData.error || "Échec de la génération du portfolio");
      }

      const { portfolio: data } = await generateRes.json();
      setPortfolio(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Une erreur est survenue";
      setError(message);
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const handleShare = useCallback(() => {
    if (!portfolio) return;
    const url = `${window.location.origin}/portfolio/${portfolio.id}`;
    navigator.clipboard.writeText(url);
    alert("Lien du portfolio copié !");
  }, [portfolio]);

  const handleReset = useCallback(() => {
    setPortfolio(null);
    setError(null);
  }, []);

  return (
    <main className="relative min-h-screen bg-grid overflow-hidden">
      <ParticleBackground />

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {isProcessing && <LoadingAnimation key="loading" />}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {portfolio ? (
            <motion.div
              key="portfolio"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-4 py-8"
            >
              <div className="flex justify-center mb-8">
                <button
                  onClick={handleReset}
                  className="glass px-6 py-2.5 rounded-xl text-gray-600 hover:text-gray-800 text-sm transition-all hover:scale-105"
                >
                  &larr; Générer un autre portfolio
                </button>
              </div>
              <PortfolioPreview data={portfolio} onShare={handleShare} />
            </motion.div>
          ) : (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center min-h-screen px-4 py-16"
            >
              {/* Hero */}
              <div className="text-center space-y-6 mb-12 max-w-3xl">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-sm text-amber-700"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  Propulsé par Gemini AI
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="text-5xl md:text-7xl font-bold leading-tight"
                >
                  <span className="text-gray-800">Transformez votre CV</span>
                  <br />
                  <span className="text-gradient">en Portfolio</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-lg text-gray-500 max-w-xl mx-auto"
                >
                  Uploadez votre CV et regardez l&apos;IA créer un magnifique
                  portfolio moderne en quelques secondes. Aucune compétence en design requise.
                </motion.p>
              </div>

              {/* Upload */}
              <FileUpload
                onFileSelected={handleFileSelected}
                isProcessing={isProcessing}
              />

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-6 max-w-xl mx-auto glass rounded-xl p-4 border border-red-400/30 bg-red-50"
                  >
                    <p className="text-red-600 text-sm text-center">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="grid md:grid-cols-3 gap-6 mt-20 max-w-4xl w-full"
              >
                {[
                  {
                    icon: "📄",
                    title: "Uploadez votre CV",
                    desc: "Glissez-déposez simplement votre CV en PDF",
                  },
                  {
                    icon: "🤖",
                    title: "Analyse IA",
                    desc: "Gemini AI extrait et structure vos données",
                  },
                  {
                    icon: "🚀",
                    title: "Obtenez votre Portfolio",
                    desc: "Recevez un magnifique portfolio partageable",
                  },
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + i * 0.1 }}
                    className="glass rounded-2xl p-6 text-center hover:scale-105 transition-transform shadow-sm"
                  >
                    <span className="text-3xl mb-3 block">{feature.icon}</span>
                    <h3 className="text-gray-800 font-semibold mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-500">{feature.desc}</p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Footer */}
              <motion.footer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="mt-20 text-center text-sm text-gray-400"
              >
                <p>
                  Créé par{" "}
                  <span className="text-amber-700">Michel AFFEDJOU</span>
                </p>
                <p className="text-xs mt-1">
                  Responsable de Projet Innovant chez Ehuzu Learning Lab
                </p>
              </motion.footer>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
