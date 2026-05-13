import { NextRequest } from "next/server";
import { verifyAdminPassword, getQuotaInfo, getUserRecords, getGeminiApiKey } from "@/lib/admin";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password || !verifyAdminPassword(password)) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const apiKey = getGeminiApiKey();
    const maskedKey = apiKey
      ? `${apiKey.slice(0, 6)}...${apiKey.slice(-4)}`
      : "";

    return Response.json({
      apiKeyConfigured: !!apiKey,
      apiKeyMasked: maskedKey,
      quota: getQuotaInfo(),
      users: getUserRecords(),
    });
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
}
