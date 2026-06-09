import { AiVerdictCard } from "@/components/ai-verdict/ai-verdict-card";
import { SectionHeader } from "@/components/shared/section-header";
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
      <SectionHeader
        title="AI Verdict"
        description="Skor objektif berbasis 5 kriteria + rekomendasi akhir yang tegas"
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {verdicts.map((verdict) => (
          <AiVerdictCard key={verdict.slug} verdict={verdict} variant="compact" />
        ))}
      </div>
    </div>
  );
}
