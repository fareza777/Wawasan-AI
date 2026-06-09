import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CategoryVisual } from "@/components/shared/category-visual";
import { Badge } from "@/components/ui/badge";
import { cn, formatDate, getCategoryLabel, getCategoryPath } from "@/lib/utils";
import type { ContentItem } from "@/types/content";

interface ContentCardProps {
  item: ContentItem;
  className?: string;
}

export function ContentCard({ item, className }: ContentCardProps) {
  const href = `${getCategoryPath(item.category)}/${item.slug}`;

  return (
    <Link href={href} className={cn("group block", className)}>
      <div className="premium-surface gradient-border h-full overflow-hidden rounded-xl">
        <CategoryVisual category={item.category} size="sm" className="rounded-none rounded-t-xl" />
        <div className="p-5">
          <div className="mb-2 flex items-start justify-between gap-2">
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="accent" className="border-0 bg-accent/10 text-[10px]">
                {getCategoryLabel(item.category)}
              </Badge>
              <Badge variant="outline" className="capitalize text-[10px]">
                {item.difficulty}
              </Badge>
            </div>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-all group-hover:text-accent group-hover:opacity-100" />
          </div>
          <h3 className="line-clamp-2 font-semibold tracking-tight transition-colors group-hover:text-accent">
            {item.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground leading-relaxed">
            {item.description}
          </p>
          <p className="mt-3 text-xs text-muted-foreground">{formatDate(item.updatedAt)}</p>
        </div>
      </div>
    </Link>
  );
}
