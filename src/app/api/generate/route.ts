import { NextRequest } from "next/server";
import { generatePortfolio, isQuotaError, isInvalidKeyError } from "@/lib/gemini";
import { savePortfolio } from "@/lib/storage";
import { getGeminiApiKey, trackRequest, addUserRecord } from "@/lib/admin";
import { PortfolioData } from "@/types/portfolio";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    if (!getGeminiApiKey()) {
      return Response.json(
        { error: "La clé API Gemini n'est pas configurée. Veuillez définir la variable d'environnement GEMINI_API_KEY ou la configurer depuis le panel admin." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { cvText } = body;

    if (!cvText || typeof cvText !== "string" || cvText.trim().length < 50) {
      return Response.json(
        { error: "Le texte du CV est trop court ou manquant" },
        { status: 400 }
      );
    }

    const jsonString = await generatePortfolio(cvText);
    const parsed = JSON.parse(jsonString);

    const portfolio: PortfolioData = {
      id: uuidv4(),
      fullName: parsed.fullName || "Unknown",
      professionalTitle: parsed.professionalTitle || "Professional",
      bio: parsed.bio || "",
      skills: parsed.skills || [],
      experience: parsed.experience || [],
      education: parsed.education || [],
      projects: parsed.projects || [],
      contact: parsed.contact || {},
      colorTheme: parsed.colorTheme || {
        primary: "#6366f1",
        secondary: "#8b5cf6",
        accent: "#06b6d4",
      },
      createdAt: new Date().toISOString(),
    };

    savePortfolio(portfolio);
    trackRequest(true);
    addUserRecord(portfolio);

    return Response.json({ portfolio });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    console.error("[Generate] Error:", errorMessage);
    trackRequest(false, errorMessage);

    if (isInvalidKeyError(errorMessage)) {
      return Response.json(
        {
          error:
            "La clé API Gemini est invalide ou révoquée. Veuillez générer une nouvelle clé sur https://aistudio.google.com/apikey et la mettre à jour dans le panel admin.",
        },
        { status: 403 }
      );
    }

    if (isQuotaError(errorMessage)) {
      return Response.json(
        {
          error:
            "Le quota de l'API Gemini est temporairement dépassé. Veuillez patienter 1 à 2 minutes et réessayer. Si le problème persiste, vérifiez que votre clé API est toujours valide sur https://aistudio.google.com/apikey.",
        },
        { status: 429 }
      );
    }

    return Response.json(
      {
        error: `Échec de la génération du portfolio. Détails : ${errorMessage}`,
      },
      { status: 500 }
    );
  }
}
