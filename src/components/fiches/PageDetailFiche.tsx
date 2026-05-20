"use client";

import { useSearchParams } from "next/navigation";
import AffichageFiche from "./AffichageFiche";
import FormulaireFiche from "./FormulaireFiche";

interface Props {
  ficheId: string;
}

export default function PageDetailFiche({ ficheId }: Props) {
  const searchParams = useSearchParams();
  const modifier = searchParams.get("modifier") === "1";

  if (modifier) {
    return <FormulaireFiche ficheId={ficheId} />;
  }

  return <AffichageFiche ficheId={ficheId} />;
}
