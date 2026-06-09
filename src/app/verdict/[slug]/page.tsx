import { notFound } from "next/navigation";
import Image from "next/image";
import { AiVerdictCard } from "@/components/ai-verdict/ai-verdict-card";
import { RelatedContent } from "@/components/shared/related-content";
import { Badge } from "@/components/ui/badge";
import { getAllVerdicts, getVerdictBySlug } from "@/lib/data-access";
import { createContentJsonLd, createMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/shared/json-ld";
import { formatDate } from "@/lib/utils";

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
    image: verdict.featuredImage,
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
    <article className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd data={createContentJsonLd(verdict)} />

      <div className="relative mb-8 aspect-[21/9] overflow-hidden rounded-xl bg-muted">
        <Image
          src={verdict.featuredImage}
          alt={verdict.title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 1024px"
        />
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {verdict.tags.map((tag) => (
          <Badge key={tag} variant="secondary">{tag}</Badge>
        ))}
        <Badge variant="outline" className="capitalize">{verdict.difficulty}</Badge>
      </div>

      <p className="mb-6 text-sm text-muted-foreground">
        Diperbarui {formatDate(verdict.updatedAt)} oleh {verdict.author.name}
      </p>

      <AiVerdictCard verdict={verdict} variant="full" />

      <RelatedContent slugs={verdict.relatedContent} />
    </article>
  );
}
