"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FichePedagogique, PLANNING_FIELDS } from "@/types/fiche";

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

      {/* Document imprimable — fidèle au canevas PDF */}
      <div className="print:mt-0 mt-16 max-w-4xl mx-auto p-6 lg:p-8">
        <div className="bg-white rounded-lg shadow-sm print:shadow-none border border-gray-300 print:border-gray-400">

          {/* ═══ TITRE PRINCIPAL ═══ */}
          <div className="border-b-2 border-gray-800 px-8 py-4 text-center">
            <h1 className="text-xl font-bold text-gray-900 uppercase tracking-wide">
              Fiche Pédagogique
            </h1>
          </div>

          {/* ═══ EN-TÊTE — Structure fidèle au canevas PDF ═══ */}

          {/* Ligne 1 : FICHE DE + Date */}
          <div className="grid grid-cols-[1fr_auto] border-b border-gray-300">
            <div className="px-4 py-2 border-r border-gray-300">
              <p className="text-[9px] uppercase tracking-wider text-gray-500 font-bold">Fiche de :</p>
              <p className="text-xs text-gray-900 font-medium min-h-[1.2em]">{fiche.ficheDe || ""}</p>
            </div>
            <div className="px-4 py-2 w-40">
              <p className="text-[9px] uppercase tracking-wider text-gray-500 font-bold">Date :</p>
              <p className="text-xs text-gray-900 font-medium min-h-[1.2em]">{fiche.date || ""}</p>
            </div>
          </div>

          {/* Ligne 2 : DOSSIER OU UNITÉ N° */}
          <div className="border-b border-gray-300 px-4 py-2">
            <p className="text-[9px] uppercase tracking-wider text-gray-500 font-bold">Dossier ou unité N° :</p>
            <p className="text-xs text-gray-900 font-medium min-h-[1.2em]">{fiche.dossierOuUnite || ""}</p>
          </div>

          {/* Ligne 3 : S.A.N° + SÉQUENCE N° + Cours */}
          <div className="grid grid-cols-3 border-b border-gray-300">
            <div className="px-4 py-2 border-r border-gray-300">
              <p className="text-[9px] uppercase tracking-wider text-gray-500 font-bold">S.A.N° :</p>
              <p className="text-xs text-gray-900 font-medium min-h-[1.2em]">{fiche.san || ""}</p>
            </div>
            <div className="px-4 py-2 border-r border-gray-300">
              <p className="text-[9px] uppercase tracking-wider text-gray-500 font-bold">Séquence N° :</p>
              <p className="text-xs text-gray-900 font-medium min-h-[1.2em]">{fiche.sequence || ""}</p>
            </div>
            <div className="px-4 py-2">
              <p className="text-[9px] uppercase tracking-wider text-gray-500 font-bold">Cours :</p>
              <p className="text-xs text-gray-900 font-medium min-h-[1.2em]">{fiche.cours || ""}</p>
            </div>
          </div>

          {/* Ligne 4 : TITRE + Fiche N° + Durée */}
          <div className="grid grid-cols-[1fr_auto_auto] border-b border-gray-300">
            <div className="px-4 py-2 border-r border-gray-300">
              <p className="text-[9px] uppercase tracking-wider text-gray-500 font-bold">Titre :</p>
              <p className="text-xs text-gray-900 font-medium min-h-[1.2em]">{fiche.titre || ""}</p>
            </div>
            <div className="px-4 py-2 border-r border-gray-300 w-28">
              <p className="text-[9px] uppercase tracking-wider text-gray-500 font-bold">Fiche N° :</p>
              <p className="text-xs text-gray-900 font-medium min-h-[1.2em]">{fiche.ficheNumero || ""}</p>
            </div>
            <div className="px-4 py-2 w-28">
              <p className="text-[9px] uppercase tracking-wider text-gray-500 font-bold">Durée :</p>
              <p className="text-xs text-gray-900 font-medium min-h-[1.2em]">{fiche.duree || ""}</p>
            </div>
          </div>

          {/* ═══ SECTIONS DE PLANIFICATION ═══ */}
          {PLANNING_FIELDS.map((field) => (
            <div key={field.key} className="border-b border-gray-300">
              <div className="px-6 py-2.5">
                <h3 className="text-[10px] uppercase tracking-wider text-gray-600 font-bold mb-1 border-b border-gray-200 pb-0.5">
                  {field.label} :
                </h3>
                <div className="text-xs text-gray-800 leading-relaxed whitespace-pre-wrap min-h-[28px]">
                  {fiche[field.key] || ""}
                </div>
              </div>
            </div>
          ))}

          {/* ═══ DÉROULEMENT — Grand tableau ═══ */}
          <div className="border-b-2 border-gray-800">
            <div className="bg-gray-100 px-6 py-3 border-b-2 border-gray-800 text-center">
              <h2 className="text-base font-bold text-gray-900 uppercase tracking-wider">
                Déroulement
              </h2>
            </div>

            {/* Zone libre déroulement */}
            {fiche.deroulement && (
              <div className="px-6 py-3 border-b border-gray-300">
                <div className="text-xs text-gray-800 leading-relaxed whitespace-pre-wrap min-h-[60px]">
                  {fiche.deroulement}
                </div>
              </div>
            )}

            {/* Tableau Consignes + Résultats Attendus */}
            <div className="grid grid-cols-[7fr_3fr]">
              {/* En-têtes avec fond hachuré (simulé) */}
              <div className="bg-gray-200 px-4 py-2 border-b border-gray-800 border-r border-r-gray-800 text-center">
                <span className="text-[10px] font-bold text-gray-900 uppercase tracking-wider">Consignes</span>
              </div>
              <div className="bg-gray-200 px-4 py-2 border-b border-gray-800 text-center">
                <span className="text-[10px] font-bold text-gray-900 uppercase tracking-wider">Résultats attendus</span>
              </div>
              {/* Contenu */}
              <div className="px-4 py-3 border-r border-gray-800 min-h-[200px]">
                <div className="text-xs text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {fiche.consignes || ""}
                </div>
              </div>
              <div className="px-4 py-3 min-h-[200px]">
                <div className="text-xs text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {fiche.resultatsAttendus || ""}
                </div>
              </div>
            </div>
          </div>
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
