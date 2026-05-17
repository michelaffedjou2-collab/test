import { getPortfolio, savePortfolio } from "@/lib/storage";
import { PortfolioData } from "@/types/portfolio";

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

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const existing = getPortfolio(id);

  if (!existing) {
    return Response.json({ error: "Portfolio not found" }, { status: 404 });
  }

  const updates: Partial<PortfolioData> = await request.json();

  const updated: PortfolioData = {
    ...existing,
    ...(updates.template !== undefined && { template: updates.template }),
    ...(updates.bio !== undefined && { bio: updates.bio }),
    ...(updates.professionalTitle !== undefined && { professionalTitle: updates.professionalTitle }),
    ...(updates.skills !== undefined && { skills: updates.skills }),
    ...(updates.experience !== undefined && { experience: updates.experience }),
  };

  savePortfolio(updated);
  return Response.json({ portfolio: updated });
}
