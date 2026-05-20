"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FichePedagogique } from "@/types/fiche";

export default function TableauDeBord() {
  const [fiches, setFiches] = useState<FichePedagogique[]>([]);
  const [loading, setLoading] = useState(true);
  const [recherche, setRecherche] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/fiches");
        const data = await res.json();
        if (!cancelled) setFiches(data.fiches || []);
      } catch {
        console.error("Erreur lors du chargement des fiches");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const supprimerFiche = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette fiche ?")) return;
    try {
      await fetch(`/api/fiches/${id}`, { method: "DELETE" });
      setFiches((prev) => prev.filter((f) => f.id !== id));
    } catch {
      alert("Erreur lors de la suppression.");
    }
  };

  const fichesFiltrees = fiches.filter((f) => {
    const q = recherche.toLowerCase();
    return (
      f.ficheDe.toLowerCase().includes(q) ||
      f.cours.toLowerCase().includes(q) ||
      f.sequence.toLowerCase().includes(q) ||
      f.dossierOuUnite.toLowerCase().includes(q)
    );
  });

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#2d2a26] mb-2">
          Tableau de bord
        </h1>
        <p className="text-[#8a8078]">
          Retrouvez et gérez toutes vos fiches pédagogiques
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="glass rounded-2xl p-5 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#b8860b]/20 to-[#d4a855]/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b8860b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#2d2a26]">{fiches.length}</p>
              <p className="text-xs text-[#8a8078]">Fiches créées</p>
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-5 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6b8f71]/20 to-[#8fb996]/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b8f71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#2d2a26]">
                {new Set(fiches.map((f) => f.cours).filter(Boolean)).size}
              </p>
              <p className="text-xs text-[#8a8078]">Cours différents</p>
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-5 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8b7355]/20 to-[#c4956a]/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8b7355" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#2d2a26]">
                {fiches.length > 0 ? formatDate(fiches[0].updatedAt).split(" à ")[0] : "—"}
              </p>
              <p className="text-xs text-[#8a8078]">Dernière modification</p>
            </div>
          </div>
        </div>
      </div>

      {/* Barre de recherche + Bouton */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#8a8078"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute left-3.5 top-1/2 -translate-y-1/2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder="Rechercher une fiche…"
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl glass border border-[#d4c5a9]/30 focus:border-[#b8860b]/50 focus:outline-none focus:ring-2 focus:ring-[#b8860b]/10 text-sm transition-all placeholder:text-[#b0a89e]"
          />
        </div>
        <Link
          href="/fiches/nouvelle"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#b8860b] to-[#d4a855] text-white rounded-xl text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Nouvelle fiche
        </Link>
      </div>

      {/* Liste des fiches */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-3 border-[#b8860b]/30 border-t-[#b8860b] rounded-full animate-spin" />
        </div>
      ) : fichesFiltrees.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#b8860b]/10 to-[#d4a855]/5 flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#b8860b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
              <path d="M12 18v-6" />
              <path d="M9 15h6" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-[#2d2a26] mb-1">
            {recherche ? "Aucun résultat" : "Aucune fiche pour le moment"}
          </h3>
          <p className="text-sm text-[#8a8078] mb-4">
            {recherche
              ? "Essayez avec d'autres termes de recherche."
              : "Créez votre première fiche pédagogique pour commencer."}
          </p>
          {!recherche && (
            <Link
              href="/fiches/nouvelle"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#b8860b] to-[#d4a855] text-white rounded-xl text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300"
            >
              Créer une fiche
            </Link>
          )}
        </div>
      ) : (
        <div className="grid gap-3">
          {fichesFiltrees.map((fiche) => (
            <div
              key={fiche.id}
              className="glass rounded-2xl p-5 transition-all duration-300 hover:shadow-lg group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-[#2d2a26] truncate">
                      {fiche.ficheDe || "Sans titre"}
                    </h3>
                    {fiche.ficheNumero && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[#b8860b]/10 text-[#8B6914] font-medium whitespace-nowrap">
                        N° {fiche.ficheNumero}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#8a8078]">
                    {fiche.cours && <span>Cours : {fiche.cours}</span>}
                    {fiche.sequence && <span>Séquence : {fiche.sequence}</span>}
                    {fiche.duree && <span>Durée : {fiche.duree}</span>}
                    <span>Modifié le {formatDate(fiche.updatedAt)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/fiches/${fiche.id}`}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[#b8860b]/10 text-[#8B6914] hover:bg-[#b8860b]/20 transition-colors"
                  >
                    Voir
                  </Link>
                  <Link
                    href={`/fiches/${fiche.id}/imprimer`}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[#6b8f71]/10 text-[#6b8f71] hover:bg-[#6b8f71]/20 transition-colors"
                  >
                    Imprimer
                  </Link>
                  <button
                    onClick={() => supprimerFiche(fiche.id)}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
