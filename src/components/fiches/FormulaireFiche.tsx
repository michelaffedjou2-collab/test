"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  FichePedagogique,
  FicheFormData,
  FICHE_FIELDS,
  createEmptyFicheForm,
} from "@/types/fiche";

interface Props {
  ficheId?: string;
}

export default function FormulaireFiche({ ficheId }: Props) {
  const router = useRouter();
  const [formData, setFormData] = useState<FicheFormData>(createEmptyFicheForm());
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [loading, setLoading] = useState(!!ficheId);
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentFicheId = useRef<string | null>(ficheId || null);

  useEffect(() => {
    if (!ficheId) return;
    (async () => {
      try {
        const res = await fetch(`/api/fiches/${ficheId}`);
        if (!res.ok) {
          router.push("/fiches");
          return;
        }
        const data = await res.json();
        const fiche: FichePedagogique = data.fiche;
        const {
          id: ficheLoadedId,
          createdAt: _createdAt,
          updatedAt: _updatedAt,
          ...rest
        } = fiche;
        void _createdAt;
        void _updatedAt;
        setFormData(rest);
        currentFicheId.current = ficheLoadedId;
      } catch {
        router.push("/fiches");
      } finally {
        setLoading(false);
      }
    })();
  }, [ficheId, router]);

  const sauvegarder = useCallback(
    async (data: FicheFormData, quiet = false) => {
      if (!quiet) setSaving(true);
      try {
        if (currentFicheId.current) {
          await fetch(`/api/fiches/${currentFicheId.current}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
        } else {
          const res = await fetch("/api/fiches", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
          const result = await res.json();
          if (result.fiche) {
            currentFicheId.current = result.fiche.id;
          }
        }
        setLastSaved(
          new Date().toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          })
        );
      } catch {
        if (!quiet) alert("Erreur lors de la sauvegarde.");
      } finally {
        if (!quiet) setSaving(false);
      }
    },
    []
  );

  const handleChange = (key: keyof FicheFormData, value: string) => {
    const updated = { ...formData, [key]: value };
    setFormData(updated);

    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(() => {
      sauvegarder(updated, true);
    }, 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sauvegarder(formData);
    if (currentFicheId.current) {
      router.push(`/fiches/${currentFicheId.current}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-3 border-[#b8860b]/30 border-t-[#b8860b] rounded-full animate-spin" />
      </div>
    );
  }

  const shortFields = FICHE_FIELDS.filter((f) => f.type === "short");
  const longFields = FICHE_FIELDS.filter((f) => f.type === "long");

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#2d2a26]">
            {ficheId ? "Modifier la fiche" : "Nouvelle fiche pédagogique"}
          </h1>
          <p className="text-sm text-[#8a8078] mt-1">
            {ficheId
              ? "Modifiez les informations de votre fiche."
              : "Remplissez les champs pour créer votre fiche selon le canevas."}
          </p>
        </div>
        {lastSaved && (
          <span className="text-xs text-[#6b8f71] glass px-3 py-1.5 rounded-full">
            Sauvegardé à {lastSaved}
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* En-tête de la fiche — champs courts */}
        <div className="glass rounded-2xl p-6">
          <h2 className="text-sm font-semibold text-[#8B6914] uppercase tracking-wider mb-4">
            Informations générales
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {shortFields.map((field) => (
              <div key={field.key}>
                <label className="block text-xs font-medium text-[#6b6560] mb-1.5">
                  {field.label}
                </label>
                <input
                  type={field.key === "date" ? "date" : "text"}
                  value={formData[field.key]}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#d4c5a9]/40 bg-white/60 focus:border-[#b8860b]/50 focus:outline-none focus:ring-2 focus:ring-[#b8860b]/10 text-sm transition-all placeholder:text-[#c4b8a8]"
                  placeholder={field.label}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Sections longues */}
        {longFields.map((field) => (
          <div key={field.key} className="glass rounded-2xl p-6">
            <label className="block text-sm font-semibold text-[#8B6914] uppercase tracking-wider mb-3">
              {field.label}
            </label>
            <textarea
              value={formData[field.key]}
              onChange={(e) => handleChange(field.key, e.target.value)}
              rows={field.key === "deroulement" ? 10 : 4}
              className="w-full px-4 py-3 rounded-xl border border-[#d4c5a9]/40 bg-white/60 focus:border-[#b8860b]/50 focus:outline-none focus:ring-2 focus:ring-[#b8860b]/10 text-sm transition-all resize-y placeholder:text-[#c4b8a8] leading-relaxed"
              placeholder={`Saisissez ${field.label.toLowerCase()}…`}
            />
          </div>
        ))}

        {/* Boutons d'action */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#b8860b] to-[#d4a855] text-white rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sauvegarde…
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                {ficheId ? "Enregistrer les modifications" : "Créer la fiche"}
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => router.push("/fiches")}
            className="px-6 py-3 rounded-xl text-sm font-medium text-[#6b6560] glass hover:bg-[#e8dcc8]/50 transition-all"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}
