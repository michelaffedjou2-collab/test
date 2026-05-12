export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  description?: string;
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface ContactInfo {
  email?: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  website?: string;
  location?: string;
}

export interface ColorTheme {
  primary: string;
  secondary: string;
  accent: string;
}

export interface PortfolioData {
  id: string;
  fullName: string;
  professionalTitle: string;
  bio: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  contact: ContactInfo;
  colorTheme: ColorTheme;
  createdAt: string;
}
