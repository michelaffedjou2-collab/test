import { getAllFiches, saveFiche } from "@/lib/fiches-storage";
import { FichePedagogique, FicheFormData } from "@/types/fiche";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  const fiches = getAllFiches();
  return Response.json({ fiches });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as FicheFormData;

    if (!body.ficheDe && !body.cours) {
      return Response.json(
        { erreur: "Les champs « Fiche de » ou « Cours » sont requis." },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();
    const fiche: FichePedagogique = {
      ...body,
      id: uuidv4(),
      createdAt: now,
      updatedAt: now,
    };

    saveFiche(fiche);

    return Response.json({ fiche }, { status: 201 });
  } catch {
    return Response.json(
      { erreur: "Données invalides." },
      { status: 400 }
    );
  }
}
