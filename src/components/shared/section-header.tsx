import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  className?: string;
  accent?: boolean;
}

export function SectionHeader({
  title,
  description,
  href,
  linkLabel = "Lihat semua",
  className,
  accent = false,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-8 flex items-end justify-between gap-4", className)}>
      <div>
        {accent && (
          <div className="mb-2 h-0.5 w-8 rounded-full bg-accent" />
        )}
        <h2 className="text-2xl font-semibold tracking-tighter md:text-3xl">{title}</h2>
        {description && (
          <p className="mt-1.5 max-w-lg text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="group flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-all hover:border-accent/40 hover:bg-accent/5 active:scale-[0.98]"
        >
          {linkLabel}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
