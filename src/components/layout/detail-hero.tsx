import { formatDate, getCategoryLabel } from "@/lib/utils";
import type { ContentCategory } from "@/types/content";
import { CategoryVisual } from "@/components/shared/category-visual";

interface DetailHeroProps {
  category: ContentCategory;
  slug: string;
  title: string;
  description: string;
  updatedAt: string;
  meta?: React.ReactNode;
  badge?: React.ReactNode;
}

export function DetailHero({
  category,
  slug,
  title,
  description,
  updatedAt,
  meta,
  badge,
}: DetailHeroProps) {
  return (
    <header className="relative mb-10 overflow-hidden rounded-2xl border border-border bg-card">
      <div className="absolute inset-0 hero-mesh opacity-80" />
      <div className="relative grid gap-6 p-6 md:grid-cols-[auto_1fr] md:items-start md:p-8">
        <CategoryVisual
          category={category}
          slug={slug}
          title={title}
          size="lg"
          className="shrink-0"
        />
        <div>
          <p className="text-xs font-medium text-accent">{getCategoryLabel(category)}</p>
          {badge && <div className="mt-3 flex flex-wrap gap-2">{badge}</div>}
          <h1 className="heading-display mt-3 text-3xl text-balance md:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="text-lead mt-4 max-w-2xl text-lg text-muted-foreground">
            {description}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span>Diperbarui {formatDate(updatedAt)}</span>
            {meta}
          </div>
        </div>
      </div>
    </header>
  );
}
