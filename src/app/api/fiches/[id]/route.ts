import { getFiche, saveFiche, deleteFiche } from "@/lib/fiches-storage";
import { FicheFormData } from "@/types/fiche";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const fiche = getFiche(id);

  if (!fiche) {
    return Response.json({ erreur: "Fiche non trouvée." }, { status: 404 });
  }

  return Response.json({ fiche });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const existing = getFiche(id);

  if (!existing) {
    return Response.json({ erreur: "Fiche non trouvée." }, { status: 404 });
  }

  try {
    const body = (await request.json()) as Partial<FicheFormData>;

    const updated = {
      ...existing,
      ...body,
      id: existing.id,
      createdAt: existing.createdAt,
      updatedAt: new Date().toISOString(),
    };

    saveFiche(updated);

    return Response.json({ fiche: updated });
  } catch {
    return Response.json(
      { erreur: "Données invalides." },
      { status: 400 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const deleted = deleteFiche(id);

  if (!deleted) {
    return Response.json({ erreur: "Fiche non trouvée." }, { status: 404 });
  }

  return Response.json({ message: "Fiche supprimée avec succès." });
}
