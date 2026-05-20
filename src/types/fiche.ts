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
  titre: string;
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

export const HEADER_FIELDS: { key: keyof FicheFormData; label: string }[] = [
  { key: "ficheDe", label: "Fiche de" },
  { key: "date", label: "Date" },
  { key: "dossierOuUnite", label: "Dossier ou unité N°" },
  { key: "san", label: "S.A.N°" },
  { key: "sequence", label: "Séquence N°" },
  { key: "cours", label: "Cours" },
  { key: "titre", label: "Titre" },
  { key: "ficheNumero", label: "Fiche N°" },
  { key: "duree", label: "Durée" },
];

export const PLANNING_FIELDS: { key: keyof FicheFormData; label: string }[] = [
  { key: "elementsPlanification", label: "Éléments de planification" },
  { key: "contenuFormation", label: "Contenu de formation" },
  { key: "competencesDisciplinaires", label: "Compétences disciplinaires" },
  { key: "competencesTransversales", label: "Comp. Transv. / Comp. Transdisc." },
  { key: "connaissancesTechniques", label: "Connaissances et techniques" },
  { key: "strategieObjetApprentissage", label: "Stratégie objet d'apprentissage" },
  { key: "strategiesEnseignement", label: "Stratégie d'ens. / apprent. / éval." },
  { key: "materiel", label: "Matériel" },
];

export const DEROULEMENT_FIELDS: { key: keyof FicheFormData; label: string }[] = [
  { key: "consignes", label: "Consignes" },
  { key: "resultatsAttendus", label: "Résultats attendus" },
];

export const FICHE_FIELDS: { key: keyof FicheFormData; label: string; type: "short" | "long" }[] = [
  { key: "ficheDe", label: "Fiche de", type: "short" },
  { key: "dossierOuUnite", label: "Dossier ou unité N°", type: "short" },
  { key: "san", label: "S.A.N°", type: "short" },
  { key: "sequence", label: "Séquence N°", type: "short" },
  { key: "date", label: "Date", type: "short" },
  { key: "cours", label: "Cours", type: "short" },
  { key: "ficheNumero", label: "Fiche N°", type: "short" },
  { key: "duree", label: "Durée", type: "short" },
  { key: "titre", label: "Titre", type: "short" },
  { key: "elementsPlanification", label: "Éléments de planification", type: "long" },
  { key: "contenuFormation", label: "Contenu de formation", type: "long" },
  { key: "competencesDisciplinaires", label: "Compétences disciplinaires", type: "long" },
  { key: "competencesTransversales", label: "Comp. Transv. / Comp. Transdisc.", type: "long" },
  { key: "connaissancesTechniques", label: "Connaissances et techniques", type: "long" },
  { key: "strategieObjetApprentissage", label: "Stratégie objet d'apprentissage", type: "long" },
  { key: "strategiesEnseignement", label: "Stratégie d'ens. / apprent. / éval.", type: "long" },
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
    titre: "",
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
