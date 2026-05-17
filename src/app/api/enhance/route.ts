import { NextRequest } from "next/server";
import { getGeminiApiKey } from "@/lib/admin";
import { isQuotaError, isInvalidKeyError } from "@/lib/gemini";
import { GoogleGenerativeAI } from "@google/generative-ai";

const ENHANCE_PROMPTS: Record<string, string> = {
  bio: "Réécris cette biographie professionnelle pour la rendre plus percutante, engageante et professionnelle. Garde le même sens mais améliore le style. Réponds UNIQUEMENT avec le texte amélioré, rien d'autre. Maximum 3 phrases.",
  title: "Propose un titre professionnel plus impactant basé sur ce titre actuel. Réponds UNIQUEMENT avec le titre amélioré, rien d'autre. Maximum 8 mots.",
  experience: "Réécris cette description d'expérience professionnelle pour la rendre plus percutante avec des verbes d'action. Réponds UNIQUEMENT avec le texte amélioré, rien d'autre. Maximum 2 phrases.",
  skills: "À partir de ces compétences et de ce profil, suggère 5 compétences supplémentaires pertinentes. Réponds UNIQUEMENT avec les compétences séparées par des virgules, rien d'autre.",
};

const enhanceCounts = new Map<string, { count: number; resetAt: number }>();
const MAX_ENHANCES_PER_SESSION = 10;
const SESSION_WINDOW_MS = 15 * 60 * 1000;
const MAX_RATE_LIMIT_ENTRIES = 1000;

function cleanupExpiredEntries(): void {
  const now = Date.now();
  for (const [key, entry] of enhanceCounts) {
    if (now > entry.resetAt) {
      enhanceCounts.delete(key);
    }
  }
}

function checkRateLimit(sessionId: string): boolean {
  const now = Date.now();

  if (enhanceCounts.size > MAX_RATE_LIMIT_ENTRIES) {
    cleanupExpiredEntries();
  }

  const entry = enhanceCounts.get(sessionId);
  if (!entry || now > entry.resetAt) {
    enhanceCounts.set(sessionId, { count: 1, resetAt: now + SESSION_WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_ENHANCES_PER_SESSION) return false;
  entry.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = getGeminiApiKey();
    if (!apiKey) {
      return Response.json(
        { error: "La clé API Gemini n'est pas configurée." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { field, text, sessionId } = body;

    if (!field || !text || !sessionId) {
      return Response.json(
        { error: "Paramètres manquants (field, text, sessionId)" },
        { status: 400 }
      );
    }

    const promptTemplate = ENHANCE_PROMPTS[field];
    if (!promptTemplate) {
      return Response.json(
        { error: `Type d'amélioration non supporté: ${field}` },
        { status: 400 }
      );
    }

    if (!checkRateLimit(sessionId)) {
      return Response.json(
        { error: "Limite d'améliorations IA atteinte pour cette session (10 max). Veuillez patienter 15 minutes." },
        { status: 429 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-lite",
      generationConfig: { temperature: 0.7, maxOutputTokens: 500 },
    });

    const prompt = `${promptTemplate}\n\nTexte actuel:\n${text.slice(0, 2000)}`;
    const result = await model.generateContent(prompt);
    const enhanced = result.response.text().trim();

    return Response.json({ enhanced });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Erreur inconnue";

    if (isInvalidKeyError(msg)) {
      return Response.json(
        { error: "La clé API Gemini est invalide." },
        { status: 403 }
      );
    }
    if (isQuotaError(msg)) {
      return Response.json(
        { error: "Le quota IA est temporairement dépassé. Réessayez dans 1-2 minutes." },
        { status: 429 }
      );
    }

    return Response.json({ error: `Erreur d'amélioration: ${msg}` }, { status: 500 });
  }
}
