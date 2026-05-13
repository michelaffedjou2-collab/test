import { NextRequest } from "next/server";
import { generatePortfolio } from "@/lib/gemini";
import { savePortfolio } from "@/lib/storage";
import { getGeminiApiKey, trackRequest, addUserRecord } from "@/lib/admin";
import { PortfolioData } from "@/types/portfolio";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    if (!getGeminiApiKey()) {
      return Response.json(
        { error: "Gemini API key is not configured. Please set the GEMINI_API_KEY environment variable." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { cvText } = body;

    if (!cvText || typeof cvText !== "string" || cvText.trim().length < 50) {
      return Response.json(
        { error: "CV text is too short or missing" },
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
            "Free API quota exceeded. The Gemini API free tier has limited requests per minute. Please wait a moment and try again.",
        },
        { status: 429 }
      );
    }

    if (
      errorMessage.includes("API_KEY_INVALID") ||
      errorMessage.includes("403")
    ) {
      return Response.json(
        { error: "Invalid Gemini API key. Please check your configuration." },
        { status: 403 }
      );
    }

    return Response.json(
      { error: "Failed to generate portfolio. Please try again." },
      { status: 500 }
    );
  }
}
