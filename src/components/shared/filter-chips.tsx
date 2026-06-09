"use client";

import { cn } from "@/lib/utils";

export interface FilterOption {
  id: string;
  label: string;
}

interface FilterChipsProps {
  options: FilterOption[];
  active: string;
  onChange: (id: string) => void;
  className?: string;
}

export function FilterChips({ options, active, onChange, className }: FilterChipsProps) {
  return (
    <div
      className={cn(
        "flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className
      )}
    >
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          onClick={() => onChange(opt.id)}
          className={cn(
            "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-all active:scale-[0.98]",
            active === opt.id
              ? "border-accent/40 bg-accent/15 text-accent"
              : "border-border bg-card/60 text-muted-foreground hover:border-accent/25 hover:text-foreground"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
