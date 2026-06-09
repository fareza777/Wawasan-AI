import Link from "next/link";
import { Clock, ArrowUpRight } from "lucide-react";
import type { ArticleContent } from "@/types/content";
import { CategoryVisual } from "@/components/shared/category-visual";
import { Badge } from "@/components/ui/badge";
import { cn, formatDate } from "@/lib/utils";

interface ArticleCardProps {
  article: ArticleContent;
  variant?: "editorial" | "compact";
  className?: string;
}

export function ArticleCard({ article, variant = "editorial", className }: ArticleCardProps) {
  if (variant === "compact") {
    return (
      <Link
        href={`/belajar-ai/${article.slug}`}
        className={cn("group flex items-start gap-4 py-4 transition-colors hover:text-accent", className)}
      >
        <span className="mt-1 text-xs tabular-nums text-muted-foreground">{article.readTime}</span>
        <div className="flex-1 border-b border-border pb-4">
          <h3 className="font-medium tracking-tight group-hover:text-accent">{article.title}</h3>
          <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{article.excerpt}</p>
        </div>
        <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
      </Link>
    );
  }

  return (
    <Link href={`/belajar-ai/${article.slug}`} className={cn("group block", className)}>
      <article className="premium-surface h-full overflow-hidden rounded-xl border border-border transition-colors hover:border-accent/30">
        <CategoryVisual
          category="article"
          slug={article.slug}
          title={article.title}
          size="sm"
          className="rounded-none rounded-t-xl"
          showIcon={false}
        />
        <div className="p-5">
          <div className="mb-3 flex items-center gap-2">
            <Badge variant="outline" className="capitalize text-[10px]">
              {article.difficulty}
            </Badge>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {article.readTime}
            </span>
          </div>
          <h2 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-accent">
            {article.title}
          </h2>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {article.excerpt}
          </p>
          <p className="mt-4 text-xs text-muted-foreground">{formatDate(article.updatedAt)}</p>
        </div>
      </article>
    </Link>
  );
}
