import { getPortfolio } from "@/lib/storage";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const portfolio = getPortfolio(id);

  if (!portfolio) {
    return Response.json({ error: "Portfolio not found" }, { status: 404 });
  }

  return Response.json({ portfolio });
}
