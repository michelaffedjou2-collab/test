import { NextRequest } from "next/server";
import { PDFParse } from "pdf-parse";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.type !== "application/pdf") {
      return Response.json(
        { error: "Only PDF files are accepted" },
        { status: 400 }
      );
    }

    if (file.size > 10 * 1024 * 1024) {
      return Response.json(
        { error: "File size must be under 10MB" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const pdf = new PDFParse({ data: new Uint8Array(buffer) });
    const result = await pdf.getText();

    const text = result.text?.trim() || "";

    if (text.length < 50) {
      return Response.json(
        {
          error:
            "Could not extract sufficient text from PDF. Please ensure it is not a scanned image.",
        },
        { status: 400 }
      );
    }

    return Response.json({ text });
  } catch (error) {
    console.error("PDF extraction error:", error);
    return Response.json(
      { error: "Failed to process PDF file" },
      { status: 500 }
    );
  }
}
