import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

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

export async function generatePortfolio(cvText: string): Promise<string> {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 4096,
    },
  });

  const trimmedText = cvText.slice(0, 8000);
  const result = await model.generateContent(PROMPT + trimmedText);
  const response = result.response;
  const text = response.text();

  const cleaned = text
    .replace(/```json\s*/g, "")
    .replace(/```\s*/g, "")
    .trim();

  JSON.parse(cleaned);
  return cleaned;
}
