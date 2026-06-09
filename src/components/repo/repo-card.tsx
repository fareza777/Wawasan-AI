import Link from "next/link";
import { Star, GitBranch, ArrowUpRight } from "lucide-react";
import type { RepoContent } from "@/types/content";
import { CategoryVisual } from "@/components/shared/category-visual";
import { cn, formatDate } from "@/lib/utils";

interface RepoCardProps {
  repo: RepoContent;
  className?: string;
}

export function RepoCard({ repo, className }: RepoCardProps) {
  return (
    <Link href={`/repo/${repo.slug}`} className={cn("group block", className)}>
      <div className="premium-surface gradient-border h-full overflow-hidden rounded-xl">
        <CategoryVisual
          category="repo"
          slug={repo.slug}
          title={repo.title}
          size="sm"
          className="rounded-none rounded-t-xl"
          showIcon={false}
        />
        <div className="p-5">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {repo.language}
            </span>
            <span className="flex items-center gap-1 text-xs font-medium text-accent">
              <Star className="h-3 w-3" />
              {(repo.stars / 1000).toFixed(1)}k
            </span>
          </div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold tracking-tight transition-colors group-hover:text-accent">
              {repo.title}
            </h3>
            <ArrowUpRight className="h-4 w-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground leading-relaxed">
            {repo.description}
          </p>
          <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <GitBranch className="h-3 w-3" />
              {repo.license}
            </span>
            <span>{formatDate(repo.updatedAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
