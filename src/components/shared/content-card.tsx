import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      <Card className="h-full overflow-hidden transition-all hover:border-accent/30 hover:shadow-md">
        <div className="relative aspect-[16/9] overflow-hidden bg-muted">
          <Image
            src={item.featuredImage}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardHeader className="pb-2">
          <div className="mb-2 flex items-center gap-2">
            <Badge variant="muted">{getCategoryLabel(item.category)}</Badge>
            <Badge variant="outline" className="capitalize">{item.difficulty}</Badge>
          </div>
          <CardTitle className="line-clamp-2 text-base group-hover:text-accent transition-colors">
            {item.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-2 text-sm text-muted-foreground">{item.description}</p>
          <p className="mt-3 text-xs text-muted-foreground">{formatDate(item.updatedAt)}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
