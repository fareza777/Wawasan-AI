import { getRelatedBySlugs } from "@/lib/data-access";
import { ContentCard } from "@/components/shared/content-card";
import { SectionHeader } from "@/components/shared/section-header";

interface RelatedContentProps {
  slugs: string[];
}

export function RelatedContent({ slugs }: RelatedContentProps) {
  const items = getRelatedBySlugs(slugs);

  if (items.length === 0) return null;

  return (
    <section className="mt-12">
      <SectionHeader title="Konten Terkait" description="Eksplorasi lebih lanjut untuk keputusan Anda" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <ContentCard key={`${item.category}-${item.slug}`} item={item} />
        ))}
      </div>
    </section>
  );
}
