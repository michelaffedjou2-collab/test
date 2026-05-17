import { NextRequest } from "next/server";
import { generatePortfolio, isQuotaError, isInvalidKeyError } from "@/lib/gemini";
import { savePortfolio } from "@/lib/storage";
import { getGeminiApiKey, trackRequest, addUserRecord } from "@/lib/admin";
import { PortfolioData, TemplateId } from "@/types/portfolio";
import { v4 as uuidv4 } from "uuid";

function extractBasicPortfolio(cvText: string): Omit<PortfolioData, "id" | "createdAt"> {
  const lines = cvText.split("\n").map((l) => l.trim()).filter(Boolean);

  const fullName = lines[0]?.slice(0, 80) || "Candidat";

  let professionalTitle = "";
  const titleKeywords = ["ingénieur", "développeur", "manager", "responsable", "consultant", "designer", "chef", "directeur", "analyste", "technicien", "assistant", "engineer", "developer"];
  for (const line of lines.slice(0, 10)) {
    if (titleKeywords.some((k) => line.toLowerCase().includes(k))) {
      professionalTitle = line.slice(0, 100);
      break;
    }
  }
  if (!professionalTitle && lines.length > 1) {
    professionalTitle = lines[1]?.slice(0, 100) || "Professionnel";
  }

  const emailMatch = cvText.match(/[\w.+-]+@[\w-]+\.[\w.]+/);
  const phoneMatch = cvText.match(/(?:\+?\d{1,3}[\s.-]?)?\(?\d{2,4}\)?[\s.-]?\d{2,4}[\s.-]?\d{2,4}/);
  const linkedinMatch = cvText.match(/linkedin\.com\/in\/[\w-]+/i);

  const skillKeywords = ["compétences", "skills", "technologies", "outils", "langages", "frameworks", "logiciels"];
  const skills: string[] = [];
  let inSkillsSection = false;
  for (const line of lines) {
    const lower = line.toLowerCase();
    if (skillKeywords.some((k) => lower.includes(k))) {
      inSkillsSection = true;
      continue;
    }
    if (inSkillsSection) {
      if (line.length > 100 || /^(expéri|éducation|formation|projets|contact)/i.test(line)) {
        inSkillsSection = false;
        continue;
      }
      const items = line.split(/[,;|•·–—\-/]/).map((s) => s.trim()).filter((s) => s.length > 1 && s.length < 40);
      skills.push(...items);
    }
  }

  return {
    fullName,
    professionalTitle,
    bio: `Professionnel avec une expérience diversifiée. Portfolio généré automatiquement à partir du CV.`,
    skills: skills.slice(0, 15),
    experience: [],
    education: [],
    projects: [],
    contact: {
      email: emailMatch?.[0] || undefined,
      phone: phoneMatch?.[0] || undefined,
      linkedin: linkedinMatch ? `https://${linkedinMatch[0]}` : undefined,
    },
    colorTheme: { primary: "#6366f1", secondary: "#8b5cf6", accent: "#06b6d4" },
    template: "modern-developer" as TemplateId,
    aiGenerated: false,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cvText, template } = body;

    if (!cvText || typeof cvText !== "string" || cvText.trim().length < 50) {
      return Response.json(
        { error: "Le texte du CV est trop court ou manquant" },
        { status: 400 }
      );
    }

    const apiKey = getGeminiApiKey();

    if (!apiKey) {
      const basic = extractBasicPortfolio(cvText);
      const portfolio: PortfolioData = {
        ...basic,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        template: (template as TemplateId) || basic.template,
        aiGenerated: false,
      };
      savePortfolio(portfolio);
      addUserRecord(portfolio);
      return Response.json({
        portfolio,
        warning: "La clé API Gemini n'est pas configurée. Portfolio standard généré sans IA.",
      });
    }

    try {
      const jsonString = await generatePortfolio(cvText);
      const parsed = JSON.parse(jsonString);

      const portfolio: PortfolioData = {
        id: uuidv4(),
        fullName: parsed.fullName || "Candidat",
        professionalTitle: parsed.professionalTitle || "Professionnel",
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
        template: (template as TemplateId) || "modern-developer",
        aiGenerated: true,
      };

      savePortfolio(portfolio);
      trackRequest(true);
      addUserRecord(portfolio);

      return Response.json({ portfolio });
    } catch (aiError: unknown) {
      const errorMessage = aiError instanceof Error ? aiError.message : "Unknown error";
      console.error("[Generate] AI error, falling back:", errorMessage);
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
        const basic = extractBasicPortfolio(cvText);
        const portfolio: PortfolioData = {
          ...basic,
          id: uuidv4(),
          createdAt: new Date().toISOString(),
          template: (template as TemplateId) || basic.template,
          aiGenerated: false,
        };
        savePortfolio(portfolio);
        addUserRecord(portfolio);
        return Response.json({
          portfolio,
          warning:
            "La génération IA est temporairement limitée, mais votre portfolio standard est prêt.",
        });
      }

      return Response.json(
        { error: `Échec de la génération du portfolio. Détails : ${errorMessage}` },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("[Generate] Error:", errorMessage);
    return Response.json(
      { error: `Échec de la génération du portfolio. Détails : ${errorMessage}` },
      { status: 500 }
    );
  }
}
