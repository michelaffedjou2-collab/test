"use client";

import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import { PortfolioData } from "@/types/portfolio";

interface AIAssistantProps {
  portfolio: PortfolioData;
  onUpdate: (updated: PortfolioData) => void;
  sessionId: string;
}

type EnhanceField = "bio" | "title" | "experience" | "skills";

const FIELD_LABELS: Record<EnhanceField, string> = {
  bio: "Améliorer la biographie",
  title: "Améliorer le titre professionnel",
  experience: "Améliorer les expériences",
  skills: "Suggérer des compétences",
};

const FIELD_ICONS: Record<EnhanceField, string> = {
  bio: "📝",
  title: "💼",
  experience: "📈",
  skills: "🎯",
};

export default function AIAssistant({ portfolio, onUpdate, sessionId }: AIAssistantProps) {
  const [loading, setLoading] = useState<EnhanceField | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const enhance = useCallback(async (field: EnhanceField) => {
    setLoading(field);
    setMessage(null);

    let text = "";
    switch (field) {
      case "bio":
        text = portfolio.bio;
        break;
      case "title":
        text = portfolio.professionalTitle;
        break;
      case "experience":
        text = portfolio.experience.map((e) => `${e.role} chez ${e.company}: ${e.description}`).join("\n");
        break;
      case "skills":
        text = `Titre: ${portfolio.professionalTitle}\nCompétences: ${portfolio.skills.join(", ")}`;
        break;
    }

    try {
      const res = await fetch("/api/enhance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ field, text, sessionId }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || "Erreur lors de l'amélioration");
        return;
      }

      const updated = { ...portfolio };
      switch (field) {
        case "bio":
          updated.bio = data.enhanced;
          break;
        case "title":
          updated.professionalTitle = data.enhanced;
          break;
        case "experience":
          if (updated.experience.length > 0) {
            const descriptions = data.enhanced.split("\n").filter(Boolean);
            updated.experience = updated.experience.map((exp, i) => ({
              ...exp,
              description: descriptions[i] || exp.description,
            }));
          }
          break;
        case "skills": {
          const newSkills = data.enhanced.split(",").map((s: string) => s.trim()).filter(Boolean);
          const existing = new Set(updated.skills.map((s) => s.toLowerCase()));
          const unique = newSkills.filter((s: string) => !existing.has(s.toLowerCase()));
          updated.skills = [...updated.skills, ...unique];
          break;
        }
      }

      onUpdate(updated);
      setMessage("Amélioration appliquée !");
    } catch {
      setMessage("Erreur de connexion. Réessayez.");
    } finally {
      setLoading(null);
    }
  }, [portfolio, onUpdate, sessionId]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-5xl mx-auto"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full glass rounded-2xl p-4 flex items-center justify-between hover:bg-white/80 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">🤖</span>
          <div className="text-left">
            <h3 className="font-semibold text-gray-800 text-sm">Assistant IA</h3>
            <p className="text-xs text-gray-500">Améliorez votre portfolio avec l&apos;IA</p>
          </div>
        </div>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="w-5 h-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-2 glass rounded-2xl p-5 space-y-3"
        >
          <p className="text-sm text-gray-600">
            Utilisez l&apos;IA pour améliorer chaque section de votre portfolio :
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {(Object.keys(FIELD_LABELS) as EnhanceField[]).map((field) => (
              <button
                key={field}
                onClick={() => enhance(field)}
                disabled={loading !== null}
                className={`flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                  loading === field
                    ? "bg-amber-50 border-amber-200"
                    : "bg-white/60 border-gray-200 hover:bg-white hover:shadow-sm"
                } border ${loading !== null && loading !== field ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <span className="text-lg">{FIELD_ICONS[field]}</span>
                <div>
                  <span className="text-sm font-medium text-gray-700">{FIELD_LABELS[field]}</span>
                  {loading === field && (
                    <p className="text-xs text-amber-600 animate-pulse">Amélioration en cours...</p>
                  )}
                </div>
              </button>
            ))}
          </div>
          {message && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-sm text-center py-2 px-4 rounded-lg ${
                message.includes("Erreur") || message.includes("Limite")
                  ? "bg-red-50 text-red-600"
                  : "bg-green-50 text-green-600"
              }`}
            >
              {message}
            </motion.p>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
