"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FichePedagogique, FICHE_FIELDS } from "@/types/fiche";

interface Props {
  ficheId: string;
}

export default function ApercuImpression({ ficheId }: Props) {
  const router = useRouter();
  const [fiche, setFiche] = useState<FichePedagogique | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/fiches/${ficheId}`);
        if (!res.ok) {
          router.push("/fiches");
          return;
        }
        const data = await res.json();
        if (!cancelled) setFiche(data.fiche);
      } catch {
        router.push("/fiches");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [ficheId, router]);

  const imprimer = () => {
    window.print();
  };

  if (loading || !fiche) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-3 border-[#b8860b]/30 border-t-[#b8860b] rounded-full animate-spin" />
      </div>
    );
  }

  const shortFields = FICHE_FIELDS.filter((f) => f.type === "short");
  const longFields = FICHE_FIELDS.filter((f) => f.type === "long");

  return (
    <>
      {/* Barre d'outils (cachée à l'impression) */}
      <div className="print:hidden fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-sm text-[#6b6560] hover:text-[#2d2a26] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Retour
          </button>
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#8a8078]">Aperçu avant impression</span>
            <button
              onClick={imprimer}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#b8860b] to-[#d4a855] text-white rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9V2h12v7" />
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <rect x="6" y="14" width="12" height="8" />
              </svg>
              Imprimer / PDF
            </button>
          </div>
        </div>
      </div>

      {/* Document imprimable */}
      <div className="print:mt-0 mt-16 max-w-4xl mx-auto p-6 lg:p-8">
        <div className="bg-white rounded-lg shadow-sm print:shadow-none border border-gray-200 print:border-gray-400">
          {/* Titre */}
          <div className="border-b-2 border-gray-800 px-8 py-5 text-center">
            <h1 className="text-xl font-bold text-gray-900 uppercase tracking-wide">
              Fiche Pédagogique
            </h1>
          </div>

          {/* Grille d'informations */}
          <div className="grid grid-cols-4 print:grid-cols-4">
            {shortFields.map((field, i) => (
              <div
                key={field.key}
                className={`px-4 py-2.5 border-b border-gray-300 ${
                  (i + 1) % 4 !== 0 ? "border-r border-gray-300" : ""
                }`}
              >
                <p className="text-[9px] uppercase tracking-wider text-gray-500 font-bold mb-0.5">
                  {field.label}
                </p>
                <p className="text-xs text-gray-900 font-medium min-h-[1.2em]">
                  {fiche[field.key] || ""}
                </p>
              </div>
            ))}
          </div>

          {/* Sections détaillées */}
          {longFields.map((field) => (
            <div
              key={field.key}
              className="border-b border-gray-300 last:border-b-0"
            >
              <div className="px-8 py-3">
                <h3 className="text-[10px] uppercase tracking-wider text-gray-600 font-bold mb-1.5 border-b border-gray-200 pb-1">
                  {field.label}
                </h3>
                <div
                  className={`text-xs text-gray-800 leading-relaxed whitespace-pre-wrap ${
                    field.key === "deroulement" ? "min-h-[200px]" : "min-h-[40px]"
                  }`}
                >
                  {fiche[field.key] || ""}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Styles d'impression */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:mt-0 {
            margin-top: 0 !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          .print\\:border-gray-400 {
            border-color: #9ca3af !important;
          }
          @page {
            margin: 1cm;
            size: A4;
          }
        }
      `}</style>
    </>
  );
}
