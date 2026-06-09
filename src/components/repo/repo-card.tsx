import Link from "next/link";
import { Star, GitBranch } from "lucide-react";
import type { RepoContent } from "@/types/content";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, formatDate } from "@/lib/utils";

interface RepoCardProps {
  repo: RepoContent;
  className?: string;
}

export function RepoCard({ repo, className }: RepoCardProps) {
  return (
    <Link href={`/repo/${repo.slug}`} className={cn("group block", className)}>
      <Card className="h-full transition-all hover:border-accent/30 hover:shadow-md">
        <CardHeader className="pb-2">
          <div className="mb-2 flex items-center justify-between">
            <Badge variant="muted">{repo.language}</Badge>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="h-3.5 w-3.5" />
              {(repo.stars / 1000).toFixed(1)}k
            </div>
          </div>
          <CardTitle className="text-base group-hover:text-accent transition-colors">
            {repo.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-2 text-sm text-muted-foreground">{repo.description}</p>
          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <GitBranch className="h-3 w-3" />
              {repo.license}
            </span>
            <span>{formatDate(repo.updatedAt)}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
