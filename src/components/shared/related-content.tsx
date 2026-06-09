import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getRelatedBySlugs } from "@/lib/data-access";
import { CategoryVisual } from "@/components/shared/category-visual";
import { getCategoryLabel, getCategoryPath } from "@/lib/utils";

interface RelatedContentProps {
  slugs: string[];
}

export function RelatedContent({ slugs }: RelatedContentProps) {
  const items = getRelatedBySlugs(slugs);

  if (items.length === 0) return null;

  return (
    <section className="mt-12 border-t border-border pt-10">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h2 className="heading-display text-xl md:text-2xl">Konten Terkait</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Eksplorasi singkat tanpa memanjang scroll
          </p>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item) => {
          const href = `${getCategoryPath(item.category)}/${item.slug}`;
          return (
            <Link
              key={`${item.category}-${item.slug}`}
              href={href}
              className="premium-surface gradient-border group flex w-[min(280px,85vw)] shrink-0 items-center gap-3 rounded-xl p-3"
            >
              <CategoryVisual
                category={item.category}
                slug={item.slug}
                title={item.title}
                size="sm"
                className="h-14 w-14 shrink-0 rounded-lg"
                showIcon={false}
              />
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-medium uppercase tracking-wider text-accent">
                  {getCategoryLabel(item.category)}
                </p>
                <h3 className="mt-0.5 line-clamp-2 text-sm font-semibold tracking-tight transition-colors group-hover:text-accent">
                  {item.title}
                </h3>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-all group-hover:text-accent group-hover:opacity-100" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
