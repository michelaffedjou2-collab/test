"use client";

import { useState, useCallback, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ParticleBackground from "@/components/ParticleBackground";
import FileUpload from "@/components/FileUpload";
import LoadingAnimation from "@/components/LoadingAnimation";
import PortfolioPreview from "@/components/PortfolioPreview";
import TemplateSelector from "@/components/TemplateSelector";
import AIAssistant from "@/components/AIAssistant";
import { PortfolioData, TemplateId } from "@/types/portfolio";
import { recommendTemplate } from "@/lib/templates";

type AppStep = "landing" | "processing" | "template-select" | "portfolio";

export default function Home() {
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [step, setStep] = useState<AppStep>("landing");
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>("modern-developer");
  const [recommendedTemplate, setRecommendedTemplate] = useState<TemplateId>("modern-developer");
  const cvTextRef = useRef<string>("");
  const sessionId = useMemo(() => {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return `session-${crypto.randomUUID()}`;
    }
    return "session-fallback";
  }, []);

  const handleFileSelected = useCallback(async (file: File) => {
    setStep("processing");
    setError(null);
    setWarning(null);

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
      cvTextRef.current = text;

      const generateRes = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cvText: text }),
      });

      if (!generateRes.ok) {
        const errData = await generateRes.json();
        throw new Error(errData.error || "Échec de la génération du portfolio");
      }

      const result = await generateRes.json();
      const data: PortfolioData = result.portfolio;

      if (result.warning) {
        setWarning(result.warning);
      }

      const rec = recommendTemplate(data);
      setRecommendedTemplate(rec);
      setSelectedTemplate(rec);
      data.template = rec;
      setPortfolio(data);
      setStep("template-select");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Une erreur est survenue";
      setError(message);
      setStep("landing");
    }
  }, []);

  const handleTemplateConfirm = useCallback(() => {
    if (!portfolio) return;
    setPortfolio({ ...portfolio, template: selectedTemplate });
    setStep("portfolio");
  }, [portfolio, selectedTemplate]);

  const handleShare = useCallback(() => {
    if (!portfolio) return;
    const url = `${window.location.origin}/portfolio/${portfolio.id}`;
    navigator.clipboard.writeText(url);
    alert("Lien du portfolio copié !");
  }, [portfolio]);

  const handleReset = useCallback(() => {
    setPortfolio(null);
    setStep("landing");
    setError(null);
    setWarning(null);
  }, []);

  const handlePortfolioUpdate = useCallback((updated: PortfolioData) => {
    setPortfolio(updated);
  }, []);

  return (
    <main className="relative min-h-screen bg-grid overflow-hidden">
      <ParticleBackground />

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {step === "processing" && <LoadingAnimation key="loading" />}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {step === "template-select" && portfolio && (
            <motion.div
              key="template-select"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center min-h-screen px-4 py-12"
            >
              <div className="flex justify-center mb-6">
                <button
                  onClick={handleReset}
                  className="glass px-5 py-2 rounded-xl text-gray-600 hover:text-gray-800 text-sm transition-all hover:scale-105"
                >
                  &larr; Nouveau CV
                </button>
              </div>

              {warning && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-xl mx-auto mb-6 glass rounded-xl p-4 border border-amber-300/40 bg-amber-50/80"
                >
                  <p className="text-amber-700 text-sm text-center">{warning}</p>
                </motion.div>
              )}

              <TemplateSelector
                selected={selectedTemplate}
                recommended={recommendedTemplate}
                onSelect={setSelectedTemplate}
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8"
              >
                <button
                  onClick={handleTemplateConfirm}
                  className="px-8 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg shadow-amber-200 hover:shadow-xl hover:scale-105 transition-all"
                >
                  Voir mon portfolio
                </button>
              </motion.div>
            </motion.div>
          )}

          {step === "portfolio" && portfolio && (
            <motion.div
              key="portfolio"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-4 py-8"
            >
              <div className="flex justify-center gap-3 mb-6">
                <button
                  onClick={handleReset}
                  className="glass px-5 py-2 rounded-xl text-gray-600 hover:text-gray-800 text-sm transition-all hover:scale-105"
                >
                  &larr; Nouveau CV
                </button>
                <button
                  onClick={() => setStep("template-select")}
                  className="glass px-5 py-2 rounded-xl text-gray-600 hover:text-gray-800 text-sm transition-all hover:scale-105"
                >
                  Changer de template
                </button>
              </div>

              {warning && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="max-w-xl mx-auto mb-6 glass rounded-xl p-4 border border-amber-300/40 bg-amber-50/80"
                >
                  <p className="text-amber-700 text-sm text-center">{warning}</p>
                </motion.div>
              )}

              <AIAssistant
                portfolio={portfolio}
                onUpdate={handlePortfolioUpdate}
                sessionId={sessionId}
              />

              <div className="mt-6">
                <PortfolioPreview data={portfolio} onShare={handleShare} />
              </div>
            </motion.div>
          )}

          {step === "landing" && (
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
                  Uploadez votre CV, choisissez un template premium, et laissez
                  l&apos;IA créer un magnifique portfolio en quelques secondes.
                </motion.p>
              </div>

              {/* Upload */}
              <FileUpload
                onFileSelected={handleFileSelected}
                isProcessing={false}
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
                className="grid md:grid-cols-4 gap-5 mt-20 max-w-5xl w-full"
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
                    icon: "🎨",
                    title: "6 Templates Premium",
                    desc: "Choisissez le style qui vous correspond",
                  },
                  {
                    icon: "🚀",
                    title: "Portfolio Instantané",
                    desc: "Partagez votre portfolio en un clic",
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
