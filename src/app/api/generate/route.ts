import { NextRequest } from "next/server";
import { generatePortfolio } from "@/lib/gemini";
import { savePortfolio } from "@/lib/storage";
import { getGeminiApiKey, trackRequest, addUserRecord } from "@/lib/admin";
import { PortfolioData } from "@/types/portfolio";
import { v4 as uuidv4 } from "uuid";

async function tryGenerate(cvText: string, retries = 1): Promise<string> {
  try {
    return await generatePortfolio(cvText);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "";
    if (
      retries > 0 &&
      (msg.includes("429") || msg.includes("RESOURCE_EXHAUSTED") || msg.includes("quota"))
    ) {
      await new Promise((r) => setTimeout(r, 5000));
      return tryGenerate(cvText, retries - 1);
    }
    throw err;
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!getGeminiApiKey()) {
      return Response.json(
        { error: "La clé API Gemini n'est pas configurée. Veuillez définir la variable d'environnement GEMINI_API_KEY." },
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

    const jsonString = await tryGenerate(cvText);
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
    console.error("Generation error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    trackRequest(false, errorMessage);

    if (
      errorMessage.includes("429") ||
      errorMessage.includes("quota") ||
      errorMessage.includes("RESOURCE_EXHAUSTED")
    ) {
      return Response.json(
        {
          error:
            "Votre quota d'API gratuite est dépassé. L'offre gratuite de l'API Gemini est limitée en nombre de requêtes par minute. Veuillez patienter quelques instants et réessayer.",
        },
        { status: 429 }
      );
    }

    if (
      errorMessage.includes("API_KEY_INVALID") ||
      errorMessage.includes("403")
    ) {
      return Response.json(
        { error: "Clé API Gemini invalide. Veuillez vérifier votre configuration." },
        { status: 403 }
      );
    }

    return Response.json(
      { error: "Échec de la génération du portfolio. Veuillez réessayer." },
      { status: 500 }
    );
  }
}
