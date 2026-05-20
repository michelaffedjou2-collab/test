import ApercuImpression from "@/components/fiches/ApercuImpression";

export default async function ImprimerFichePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ApercuImpression ficheId={id} />;
}
