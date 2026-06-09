import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
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
        <div className="relative aspect-[16/9] overflow-hidden bg-muted">
          <Image
            src={item.featuredImage}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 flex gap-1.5">
            <Badge variant="accent" className="border-0 bg-accent/90 text-accent-foreground text-[10px]">
              {getCategoryLabel(item.category)}
            </Badge>
          </div>
        </div>
        <div className="p-5">
          <div className="mb-2 flex items-start justify-between gap-2">
            <Badge variant="outline" className="capitalize text-[10px]">
              {item.difficulty}
            </Badge>
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
