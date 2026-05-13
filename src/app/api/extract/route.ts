import { NextRequest } from "next/server";
import { PDFParse } from "pdf-parse";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return Response.json({ error: "Aucun fichier fourni" }, { status: 400 });
    }

    if (file.type !== "application/pdf") {
      return Response.json(
        { error: "Seuls les fichiers PDF sont acceptés" },
        { status: 400 }
      );
    }

    if (file.size > 10 * 1024 * 1024) {
      return Response.json(
        { error: "Le fichier doit faire moins de 10 Mo" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const pdf = new PDFParse({ data: new Uint8Array(buffer) });
    try {
      const result = await pdf.getText();
      const text = result.text?.trim() || "";

      if (text.length < 50) {
        return Response.json(
          {
            error:
              "Impossible d'extraire suffisamment de texte du PDF. Veuillez vérifier qu'il ne s'agit pas d'une image scannée.",
          },
          { status: 400 }
        );
      }

      return Response.json({ text });
    } finally {
      await pdf.destroy();
    }
  } catch (error) {
    console.error("PDF extraction error:", error);
    return Response.json(
      { error: "Échec du traitement du fichier PDF" },
      { status: 500 }
    );
  }
}
