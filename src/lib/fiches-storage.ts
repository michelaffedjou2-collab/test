import { FichePedagogique } from "@/types/fiche";

const MAX_FICHES = 1000;

const fiches = new Map<string, FichePedagogique>();

export function saveFiche(data: FichePedagogique): void {
  if (!fiches.has(data.id) && fiches.size >= MAX_FICHES) {
    const oldestKey = fiches.keys().next().value;
    if (oldestKey) {
      fiches.delete(oldestKey);
    }
  }
  fiches.set(data.id, data);
}

export function getFiche(id: string): FichePedagogique | undefined {
  return fiches.get(id);
}

export function getAllFiches(): FichePedagogique[] {
  return Array.from(fiches.values()).sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

export function deleteFiche(id: string): boolean {
  return fiches.delete(id);
}

export function getFichesCount(): number {
  return fiches.size;
}
