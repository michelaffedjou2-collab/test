import { GoogleGenerativeAI } from "@google/generative-ai";
import { getGeminiApiKey } from "@/lib/admin";

const PROMPT = `You are a professional portfolio generator. Analyze the following CV/resume text and extract structured information. Return ONLY valid JSON (no markdown, no code blocks) with this exact structure:

{
  "fullName": "string",
  "professionalTitle": "string (concise professional title)",
  "bio": "string (2-3 sentences professional summary)",
  "skills": ["string array of key skills"],
  "experience": [
    {
      "company": "string",
      "role": "string",
      "period": "string",
      "description": "string (1-2 sentences)"
    }
  ],
  "education": [
    {
      "institution": "string",
      "degree": "string",
      "period": "string",
      "description": "string (optional)"
    }
  ],
  "projects": [
    {
      "name": "string",
      "description": "string",
      "technologies": ["string"],
      "link": "string (optional)"
    }
  ],
  "contact": {
    "email": "string or null",
    "phone": "string or null",
    "linkedin": "string or null",
    "github": "string or null",
    "website": "string or null",
    "location": "string or null"
  },
  "colorTheme": {
    "primary": "hex color matching the person's industry",
    "secondary": "hex color complementary to primary",
    "accent": "hex color for highlights"
  }
}

Rules:
- Extract all available information from the CV
- If information is not found, use reasonable defaults or empty arrays
- The bio should be professional and engaging
- Skills should be concise keywords
- Color theme should match the person's industry (e.g., blue for tech, green for finance)
- Return ONLY the JSON object, nothing else

CV Text:
`;

const MODELS = ["gemini-2.0-flash-lite", "gemini-2.0-flash", "gemini-1.5-flash"];

async function callGeminiModel(
  apiKey: string,
  modelName: string,
  prompt: string
): Promise<string> {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: modelName,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 4096,
    },
  });

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();

  const cleaned = text
    .replace(/```json\s*/g, "")
    .replace(/```\s*/g, "")
    .trim();

  JSON.parse(cleaned);
  return cleaned;
}

export function isQuotaError(msg: string): boolean {
  const lower = msg.toLowerCase();
  return (
    lower.includes("429") ||
    lower.includes("resource_exhausted") ||
    lower.includes("rate limit") ||
    (lower.includes("resource") && lower.includes("exhausted"))
  );
}

export function isInvalidKeyError(msg: string): boolean {
  const lower = msg.toLowerCase();
  return (
    lower.includes("api_key_invalid") ||
    lower.includes("api key not valid") ||
    lower.includes("permission_denied") ||
    (lower.includes("403") && !lower.includes("quota"))
  );
}

export async function generatePortfolio(cvText: string): Promise<string> {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    throw new Error("La clé API Gemini n'est pas configurée.");
  }

  const trimmedText = cvText.slice(0, 8000);
  const fullPrompt = PROMPT + trimmedText;
  let lastError: Error | null = null;

  for (const modelName of MODELS) {
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        console.log(`[Gemini] Trying model=${modelName}, attempt=${attempt + 1}`);
        return await callGeminiModel(apiKey, modelName, fullPrompt);
      } catch (err) {
        lastError = err instanceof Error ? err : new Error(String(err));
        console.error(
          `[Gemini] Error model=${modelName} attempt=${attempt + 1}:`,
          lastError.message
        );

        if (isInvalidKeyError(lastError.message)) {
          throw lastError;
        }

        if (isQuotaError(lastError.message)) {
          const delay = Math.min(3000 * Math.pow(2, attempt), 15000);
          console.log(`[Gemini] Quota error, waiting ${delay}ms before retry...`);
          await new Promise((r) => setTimeout(r, delay));
          continue;
        }

        break;
      }
    }
  }

  throw lastError || new Error("Tous les modèles ont échoué.");
}
