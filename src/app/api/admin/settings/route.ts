import { NextRequest } from "next/server";
import { verifyAdminPassword, setGeminiApiKey, getGeminiApiKey } from "@/lib/admin";

export async function POST(request: NextRequest) {
  try {
    const { password, apiKey } = await request.json();

    if (!password || !verifyAdminPassword(password)) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (typeof apiKey !== "string") {
      return Response.json({ error: "API key must be a string" }, { status: 400 });
    }

    setGeminiApiKey(apiKey.trim());

    const currentKey = getGeminiApiKey();
    const maskedKey = currentKey
      ? `${currentKey.slice(0, 6)}...${currentKey.slice(-4)}`
      : "";

    return Response.json({
      success: true,
      apiKeyConfigured: !!currentKey,
      apiKeyMasked: maskedKey,
    });
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
}
