import { Suspense } from "react";
import PageDetailFiche from "@/components/fiches/PageDetailFiche";

export default async function FicheDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-3 border-[#b8860b]/30 border-t-[#b8860b] rounded-full animate-spin" />
        </div>
      }
    >
      <PageDetailFiche ficheId={id} />
    </Suspense>
  );
}
