import { TemplateId, PortfolioData } from "@/types/portfolio";

export interface TemplateDefinition {
  id: TemplateId;
  name: string;
  description: string;
  icon: string;
  gradient: string;
  keywords: string[];
}

export const TEMPLATES: TemplateDefinition[] = [
  {
    id: "modern-developer",
    name: "Développeur Moderne",
    description: "Design épuré et technique, parfait pour les profils tech et développeurs",
    icon: "💻",
    gradient: "from-blue-600 to-cyan-500",
    keywords: [
      "developer", "développeur", "engineer", "ingénieur", "software", "logiciel",
      "frontend", "backend", "fullstack", "devops", "web", "mobile", "data",
      "python", "javascript", "react", "node", "java", "api", "cloud",
      "informatique", "programmeur", "tech", "it", "système", "réseau",
    ],
  },
  {
    id: "creative-designer",
    name: "Designer Créatif",
    description: "Layout artistique et vibrant pour les créatifs et designers",
    icon: "🎨",
    gradient: "from-purple-600 to-pink-500",
    keywords: [
      "designer", "design", "graphique", "graphic", "ux", "ui", "creative",
      "créatif", "artist", "artiste", "illustrat", "photo", "vidéo", "video",
      "animation", "motion", "brand", "marque", "visuel", "visual", "3d",
      "directeur artistique", "webdesign", "maquette",
    ],
  },
  {
    id: "corporate-professional",
    name: "Professionnel Corporate",
    description: "Sobre et élégant, idéal pour les cadres et managers",
    icon: "🏢",
    gradient: "from-slate-700 to-gray-500",
    keywords: [
      "manager", "directeur", "director", "responsable", "chef de projet",
      "consultant", "business", "finance", "banque", "audit", "comptab",
      "marketing", "commercial", "vente", "rh", "ressources humaines",
      "stratégi", "gestion", "management", "cadre", "executive", "ceo", "cto",
    ],
  },
  {
    id: "student-junior",
    name: "Étudiant / Junior",
    description: "Frais et dynamique, parfait pour les jeunes diplômés",
    icon: "🎓",
    gradient: "from-emerald-500 to-teal-400",
    keywords: [
      "étudiant", "student", "stagiaire", "intern", "junior", "apprenti",
      "alternance", "diplôm", "master", "licence", "bachelor", "bts", "dut",
      "école", "universit", "formation", "débutant", "entry level",
    ],
  },
  {
    id: "freelancer",
    name: "Freelancer",
    description: "Moderne et accrocheur pour les indépendants et entrepreneurs",
    icon: "🚀",
    gradient: "from-orange-500 to-amber-400",
    keywords: [
      "freelance", "indépendant", "independent", "entrepreneur", "fondateur",
      "founder", "auto-entrepreneur", "startup", "agence", "agency",
      "consultant indépendant", "prestataire", "micro-entreprise",
    ],
  },
  {
    id: "educator",
    name: "Éducateur",
    description: "Clair et structuré pour les enseignants et formateurs",
    icon: "📚",
    gradient: "from-indigo-500 to-violet-400",
    keywords: [
      "enseignant", "teacher", "professeur", "professor", "formateur",
      "trainer", "éducateur", "educator", "chercheur", "researcher",
      "académique", "academic", "pédagog", "coach", "mentor", "tuteur",
      "learning", "formation", "institut",
    ],
  },
];

export function recommendTemplate(data: PortfolioData): TemplateId {
  const text = [
    data.professionalTitle,
    data.bio,
    ...data.skills,
    ...data.experience.map((e) => `${e.role} ${e.company} ${e.description}`),
    ...data.education.map((e) => `${e.degree} ${e.institution}`),
    ...data.projects.map((p) => `${p.name} ${p.description} ${p.technologies.join(" ")}`),
  ]
    .join(" ")
    .toLowerCase();

  const scores: Record<TemplateId, number> = {
    "modern-developer": 0,
    "creative-designer": 0,
    "corporate-professional": 0,
    "student-junior": 0,
    "freelancer": 0,
    "educator": 0,
  };

  for (const template of TEMPLATES) {
    for (const keyword of template.keywords) {
      const regex = new RegExp(keyword, "gi");
      const matches = text.match(regex);
      if (matches) {
        scores[template.id] += matches.length;
      }
    }
  }

  let best: TemplateId = "modern-developer";
  let maxScore = 0;
  for (const [id, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      best = id as TemplateId;
    }
  }

  return best;
}
