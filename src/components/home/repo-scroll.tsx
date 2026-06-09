import Link from "next/link";
import { Star, ArrowUpRight, ChevronRight } from "lucide-react";
import type { RepoContent } from "@/types/content";
import { CategoryVisual } from "@/components/shared/category-visual";
import { formatDate } from "@/lib/utils";

interface RepoScrollProps {
  repos: RepoContent[];
}

export function RepoScroll({ repos }: RepoScrollProps) {
  return (
    <div className="relative">
      <div className="flex gap-4 overflow-x-auto pb-2 pl-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {repos.map((repo) => (
          <Link
            key={repo.slug}
            href={`/repo/${repo.slug}`}
            className="premium-surface gradient-border group w-[280px] shrink-0 overflow-hidden rounded-xl sm:w-[300px]"
          >
            <CategoryVisual
              category="repo"
              slug={repo.slug}
              title={repo.title}
              size="sm"
              className="rounded-none rounded-t-xl"
              showIcon={false}
            />
            <div className="p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {repo.language}
                </span>
                <span className="flex items-center gap-1 text-xs text-accent">
                  <Star className="h-3 w-3" />
                  {(repo.stars / 1000).toFixed(1)}k
                </span>
              </div>
              <h3 className="font-semibold tracking-tight transition-colors group-hover:text-accent">
                {repo.title}
              </h3>
              <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{repo.description}</p>
              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span>{formatDate(repo.updatedAt)}</span>
                <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" />
      <p className="mt-2 flex items-center justify-end gap-1 text-xs text-muted-foreground md:hidden">
        Geser untuk lihat lebih
        <ChevronRight className="h-3 w-3" />
      </p>
    </div>
  );
}
