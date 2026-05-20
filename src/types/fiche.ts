export interface FichePedagogique {
  id: string;
  ficheDe: string;
  dossierOuUnite: string;
  san: string;
  sequence: string;
  date: string;
  cours: string;
  ficheNumero: string;
  duree: string;
  elementsPlanification: string;
  contenuFormation: string;
  competencesDisciplinaires: string;
  competencesTransversales: string;
  connaissancesTechniques: string;
  strategieObjetApprentissage: string;
  strategiesEnseignement: string;
  materiel: string;
  deroulement: string;
  consignes: string;
  resultatsAttendus: string;
  createdAt: string;
  updatedAt: string;
}

export type FicheFormData = Omit<FichePedagogique, "id" | "createdAt" | "updatedAt">;

export const FICHE_FIELDS: { key: keyof FicheFormData; label: string; type: "short" | "long" }[] = [
  { key: "ficheDe", label: "Fiche de", type: "short" },
  { key: "dossierOuUnite", label: "Dossier ou unité", type: "short" },
  { key: "san", label: "S.A.N", type: "short" },
  { key: "sequence", label: "Séquence", type: "short" },
  { key: "date", label: "Date", type: "short" },
  { key: "cours", label: "Cours", type: "short" },
  { key: "ficheNumero", label: "Fiche N°", type: "short" },
  { key: "duree", label: "Durée", type: "short" },
  { key: "elementsPlanification", label: "Éléments de planification", type: "long" },
  { key: "contenuFormation", label: "Contenu de formation", type: "long" },
  { key: "competencesDisciplinaires", label: "Compétences disciplinaires", type: "long" },
  { key: "competencesTransversales", label: "Compétences transversales", type: "long" },
  { key: "connaissancesTechniques", label: "Connaissances et techniques", type: "long" },
  { key: "strategieObjetApprentissage", label: "Stratégie objet d'apprentissage", type: "long" },
  { key: "strategiesEnseignement", label: "Stratégies d'enseignement / apprentissage / évaluation", type: "long" },
  { key: "materiel", label: "Matériel", type: "long" },
  { key: "deroulement", label: "Déroulement", type: "long" },
  { key: "consignes", label: "Consignes", type: "long" },
  { key: "resultatsAttendus", label: "Résultats attendus", type: "long" },
];

export function createEmptyFicheForm(): FicheFormData {
  return {
    ficheDe: "",
    dossierOuUnite: "",
    san: "",
    sequence: "",
    date: "",
    cours: "",
    ficheNumero: "",
    duree: "",
    elementsPlanification: "",
    contenuFormation: "",
    competencesDisciplinaires: "",
    competencesTransversales: "",
    connaissancesTechniques: "",
    strategieObjetApprentissage: "",
    strategiesEnseignement: "",
    materiel: "",
    deroulement: "",
    consignes: "",
    resultatsAttendus: "",
  };
}
