"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  BookOpen,
  GitBranch,
  Layers,
  Scale,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { getItemVisualStyle, getMonogram, getVisualHue } from "@/lib/item-visual";
import { cn } from "@/lib/utils";
import type { ContentCategory } from "@/types/content";

const CATEGORY_ICON: Record<ContentCategory, LucideIcon> = {
  repo: GitBranch,
  verdict: Scale,
  workflow: Workflow,
  stack: Layers,
  article: BookOpen,
};

interface CategoryVisualProps {
  category: ContentCategory;
  slug: string;
  title: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  showIcon?: boolean;
}

const SIZE_MAP = {
  sm: { box: "h-24 w-full", mono: "text-xl", icon: "h-5 w-5", rounded: "rounded-lg" },
  md: { box: "h-36 w-full", mono: "text-2xl", icon: "h-6 w-6", rounded: "rounded-xl" },
  lg: { box: "h-28 w-28 md:h-32 md:w-32", mono: "text-3xl", icon: "h-7 w-7", rounded: "rounded-2xl" },
};

export function CategoryVisual({
  category,
  slug,
  title,
  size = "md",
  className,
  showIcon = true,
}: CategoryVisualProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const hue = getVisualHue(slug, category);
  const monogram = getMonogram(title);
  const mode = mounted && resolvedTheme === "light" ? "light" : "dark";
  const visual = getItemVisualStyle(hue, mode);
  const Icon = CATEGORY_ICON[category];
  const s = SIZE_MAP[size];

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden border border-border/40",
        s.box,
        s.rounded,
        className
      )}
      style={{ background: visual.background }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at 28% 22%, ${visual.glow}, transparent 58%)`,
        }}
      />
      <div className="relative flex flex-col items-center gap-1">
        <span
          className={cn("font-semibold tracking-tighter", s.mono)}
          style={{ color: visual.monogramColor }}
        >
          {monogram}
        </span>
        {showIcon && size !== "sm" && (
          <Icon className={cn(s.icon, "opacity-40")} style={{ color: visual.monogramColor }} strokeWidth={1.5} />
        )}
      </div>
    </div>
  );
}
