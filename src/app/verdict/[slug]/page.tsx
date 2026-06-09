import { notFound } from "next/navigation";
import { AiVerdictCard } from "@/components/ai-verdict/ai-verdict-card";
import { RelatedContent } from "@/components/shared/related-content";
import { DecisionBar } from "@/components/verdict/decision-bar";
import { getAllVerdicts, getVerdictBySlug } from "@/lib/data-access";
import { createContentJsonLd, createMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/shared/json-ld";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllVerdicts().map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const verdict = getVerdictBySlug(slug);
  if (!verdict) return {};
  return createMetadata({
    title: `Verdict: ${verdict.title}`,
    description: verdict.conclusion.rekomendasiAkhir,
    path: `/verdict/${verdict.slug}`,
    type: "article",
    publishedAt: verdict.publishedAt,
    updatedAt: verdict.updatedAt,
  });
}

export default async function VerdictDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const verdict = getVerdictBySlug(slug);
  if (!verdict) notFound();

  return (
    <article className="mx-auto max-w-5xl px-4 py-10 pb-24 sm:px-6 md:pb-10 lg:px-8">
      <JsonLd data={createContentJsonLd(verdict)} />
      <AiVerdictCard verdict={verdict} variant="full" />
      <RelatedContent slugs={verdict.relatedContent} />
      <DecisionBar score={verdict.verdictScore} title={verdict.title} href="#rekomendasi" />
    </article>
  );
}
