import type { Metadata } from "next";
import Navigation from "@/components/fiches/Navigation";

export const metadata: Metadata = {
  title: "Fiches Pédagogiques — Gestion scolaire",
  description:
    "Application de gestion de fiches pédagogiques pour enseignants. Créez, organisez et exportez vos fiches selon le canevas officiel.",
};

export default function FichesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FAF6F0] bg-grid">
      <Navigation />
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        {children}
      </main>
    </div>
  );
}
