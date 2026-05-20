"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FichePedagogique, PLANNING_FIELDS } from "@/types/fiche";

interface Props {
  ficheId: string;
}

export default function AffichageFiche({ ficheId }: Props) {
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

  const exporterPDF = () => {
    window.open(`/fiches/${ficheId}/imprimer`, "_blank");
  };

  if (loading || !fiche) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-3 border-[#b8860b]/30 border-t-[#b8860b] rounded-full animate-spin" />
      </div>
    );
  }

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      {/* En-tête */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => router.push("/fiches")}
            className="inline-flex items-center gap-1 text-sm text-[#8a8078] hover:text-[#2d2a26] transition-colors mb-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Retour aux fiches
          </button>
          <h1 className="text-2xl font-bold text-[#2d2a26]">
            {fiche.ficheDe || fiche.titre || "Fiche pédagogique"}
          </h1>
          <p className="text-xs text-[#8a8078] mt-1">
            Créée le {formatDate(fiche.createdAt)} — Modifiée le{" "}
            {formatDate(fiche.updatedAt)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/fiches/${fiche.id}/imprimer`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-[#6b8f71]/10 text-[#6b8f71] hover:bg-[#6b8f71]/20 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
            Aperçu impression
          </Link>
          <button
            onClick={exporterPDF}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-gradient-to-r from-[#b8860b] to-[#d4a855] text-white shadow-md hover:shadow-lg transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9V2h12v7" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect x="6" y="14" width="12" height="8" />
            </svg>
            Exporter PDF
          </button>
        </div>
      </div>

      {/* Contenu de la fiche — fidèle au canevas PDF */}
      <div className="glass rounded-2xl overflow-hidden">
        {/* Titre du canevas */}
        <div className="bg-gradient-to-r from-[#b8860b]/10 to-[#d4a855]/5 px-6 py-4 border-b border-[#d4c5a9]/20">
          <h2 className="text-lg font-bold text-[#2d2a26] text-center uppercase tracking-wide">
            Fiche Pédagogique
          </h2>
        </div>

        {/* ═══ EN-TÊTE — Structure fidèle au canevas PDF ═══ */}

        {/* Ligne 1 : Fiche de + Date */}
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] border-b border-[#d4c5a9]/20">
          <div className="px-4 py-3 sm:border-r border-[#d4c5a9]/10">
            <p className="text-[10px] uppercase tracking-wider text-[#8a8078] font-semibold mb-0.5">Fiche de</p>
            <p className="text-sm text-[#2d2a26] font-medium">{fiche.ficheDe || "—"}</p>
          </div>
          <div className="px-4 py-3 sm:w-48">
            <p className="text-[10px] uppercase tracking-wider text-[#8a8078] font-semibold mb-0.5">Date</p>
            <p className="text-sm text-[#2d2a26] font-medium">{fiche.date || "—"}</p>
          </div>
        </div>

        {/* Ligne 2 : Dossier ou Unité N° */}
        <div className="border-b border-[#d4c5a9]/20 px-4 py-3">
          <p className="text-[10px] uppercase tracking-wider text-[#8a8078] font-semibold mb-0.5">Dossier ou unité N°</p>
          <p className="text-sm text-[#2d2a26] font-medium">{fiche.dossierOuUnite || "—"}</p>
        </div>

        {/* Ligne 3 : S.A.N° + Séquence N° + Cours */}
        <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-[#d4c5a9]/20">
          <div className="px-4 py-3 border-b sm:border-b-0 sm:border-r border-[#d4c5a9]/10">
            <p className="text-[10px] uppercase tracking-wider text-[#8a8078] font-semibold mb-0.5">S.A.N°</p>
            <p className="text-sm text-[#2d2a26] font-medium">{fiche.san || "—"}</p>
          </div>
          <div className="px-4 py-3 border-b sm:border-b-0 sm:border-r border-[#d4c5a9]/10">
            <p className="text-[10px] uppercase tracking-wider text-[#8a8078] font-semibold mb-0.5">Séquence N°</p>
            <p className="text-sm text-[#2d2a26] font-medium">{fiche.sequence || "—"}</p>
          </div>
          <div className="px-4 py-3">
            <p className="text-[10px] uppercase tracking-wider text-[#8a8078] font-semibold mb-0.5">Cours</p>
            <p className="text-sm text-[#2d2a26] font-medium">{fiche.cours || "—"}</p>
          </div>
        </div>

        {/* Ligne 4 : Titre + Fiche N° + Durée */}
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] border-b border-[#d4c5a9]/20">
          <div className="px-4 py-3 border-b sm:border-b-0 sm:border-r border-[#d4c5a9]/10">
            <p className="text-[10px] uppercase tracking-wider text-[#8a8078] font-semibold mb-0.5">Titre</p>
            <p className="text-sm text-[#2d2a26] font-medium">{fiche.titre || "—"}</p>
          </div>
          <div className="px-4 py-3 border-b sm:border-b-0 sm:border-r border-[#d4c5a9]/10 sm:w-36">
            <p className="text-[10px] uppercase tracking-wider text-[#8a8078] font-semibold mb-0.5">Fiche N°</p>
            <p className="text-sm text-[#2d2a26] font-medium">{fiche.ficheNumero || "—"}</p>
          </div>
          <div className="px-4 py-3 sm:w-36">
            <p className="text-[10px] uppercase tracking-wider text-[#8a8078] font-semibold mb-0.5">Durée</p>
            <p className="text-sm text-[#2d2a26] font-medium">{fiche.duree || "—"}</p>
          </div>
        </div>

        {/* ═══ SECTIONS DE PLANIFICATION ═══ */}
        {PLANNING_FIELDS.map((field) => {
          const value = fiche[field.key];
          return (
            <div key={field.key} className="px-6 py-4 border-b border-[#d4c5a9]/10">
              <h3 className="text-xs uppercase tracking-wider text-[#8B6914] font-semibold mb-2">
                {field.label}
              </h3>
              <div className="text-sm text-[#2d2a26] leading-relaxed whitespace-pre-wrap min-h-[1.5em]">
                {value || ""}
              </div>
            </div>
          );
        })}

        {/* ═══ DÉROULEMENT — Grand tableau avec Consignes + Résultats ═══ */}
        <div className="border-t-2 border-[#d4c5a9]/40">
          <div className="bg-gradient-to-r from-[#b8860b]/15 to-[#d4a855]/8 px-6 py-4 border-b border-[#d4c5a9]/30">
            <h2 className="text-base font-bold text-[#2d2a26] text-center uppercase tracking-wide">
              Déroulement
            </h2>
          </div>

          {/* Zone déroulement libre */}
          {fiche.deroulement && (
            <div className="px-6 py-4 border-b border-[#d4c5a9]/20">
              <div className="text-sm text-[#2d2a26] leading-relaxed whitespace-pre-wrap">
                {fiche.deroulement}
              </div>
            </div>
          )}

          {/* Consignes + Résultats Attendus côte à côte */}
          <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr]">
            {/* En-têtes */}
            <div className="bg-[#b8860b]/8 px-5 py-2.5 border-b border-[#d4c5a9]/20 lg:border-r">
              <span className="text-xs font-bold text-[#2d2a26] uppercase tracking-wider">Consignes</span>
            </div>
            <div className="bg-[#b8860b]/8 px-5 py-2.5 border-b border-[#d4c5a9]/20">
              <span className="text-xs font-bold text-[#2d2a26] uppercase tracking-wider">Résultats attendus</span>
            </div>
            {/* Contenu */}
            <div className="px-6 py-4 lg:border-r border-[#d4c5a9]/20 min-h-[120px]">
              <div className="text-sm text-[#2d2a26] leading-relaxed whitespace-pre-wrap">
                {fiche.consignes || ""}
              </div>
            </div>
            <div className="px-6 py-4 border-t lg:border-t-0 border-[#d4c5a9]/20 min-h-[120px]">
              <div className="text-sm text-[#2d2a26] leading-relaxed whitespace-pre-wrap">
                {fiche.resultatsAttendus || ""}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bouton modifier */}
      <div className="mt-6 flex justify-center">
        <Link
          href={`/fiches/${fiche.id}?modifier=1`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium glass text-[#8B6914] hover:bg-[#b8860b]/10 transition-all border border-[#b8860b]/20"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
            <path d="m15 5 4 4" />
          </svg>
          Modifier cette fiche
        </Link>
      </div>
    </div>
  );
}
