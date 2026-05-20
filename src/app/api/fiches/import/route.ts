import { saveFiche } from "@/lib/fiches-storage";
import { FichePedagogique, FicheFormData } from "@/types/fiche";
import { v4 as uuidv4 } from "uuid";

const API_SECRET = process.env.FICHES_API_SECRET || "votre-cle-secrete-ici";

export async function POST(request: Request) {
  const authHeader = request.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return Response.json(
      { erreur: "En-tête d'autorisation manquant ou invalide." },
      { status: 401 }
    );
  }

  const token = authHeader.replace("Bearer ", "");

  if (token !== API_SECRET) {
    return Response.json(
      { erreur: "Clé d'API non autorisée." },
      { status: 403 }
    );
  }

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
      id: uuidv4(),
      ...body,
      createdAt: now,
      updatedAt: now,
    };

    saveFiche(fiche);

    return Response.json(
      {
        message: "Fiche importée avec succès.",
        fiche,
      },
      { status: 201 }
    );
  } catch {
    return Response.json(
      { erreur: "Format JSON invalide." },
      { status: 400 }
    );
  }
}
