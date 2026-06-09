import { Badge } from "@/components/ui/badge";

interface TagListProps {
  tags: string[];
  max?: number;
  variant?: "secondary" | "outline" | "muted";
}

export function TagList({ tags, max = 3, variant = "secondary" }: TagListProps) {
  const visible = tags.slice(0, max);
  const overflow = tags.length - max;

  return (
    <>
      {visible.map((tag) => (
        <Badge key={tag} variant={variant} className="capitalize">
          {tag}
        </Badge>
      ))}
      {overflow > 0 && (
        <Badge variant="outline">+{overflow}</Badge>
      )}
    </>
  );
}
