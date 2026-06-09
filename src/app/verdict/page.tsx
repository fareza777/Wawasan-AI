import { PageHeader } from "@/components/layout/page-header";
import { VerdictListClient } from "@/components/verdict/verdict-list-client";
import { getAllVerdicts } from "@/lib/data-access";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "AI Verdict",
  description:
    "Keputusan tegas untuk setiap tool AI: cocok untuk siapa, tidak cocok untuk siapa, dan alternatifnya.",
  path: "/verdict",
});

export default function VerdictListPage() {
  const verdicts = getAllVerdicts();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        title="AI Verdict"
        description="Skor objektif berbasis 5 kriteria plus rekomendasi akhir yang tegas. Filter untuk menemukan tool yang cocok dengan Anda."
      />
      <VerdictListClient verdicts={verdicts} />
    </div>
  );
}
