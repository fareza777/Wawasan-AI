import {
  BookOpen,
  GitBranch,
  Layers,
  Scale,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ContentCategory } from "@/types/content";

const CATEGORY_CONFIG: Record<
  ContentCategory,
  { icon: LucideIcon; gradient: string; iconColor: string }
> = {
  repo: {
    icon: GitBranch,
    gradient: "from-slate-800 via-slate-900 to-slate-950",
    iconColor: "text-teal-400",
  },
  verdict: {
    icon: Scale,
    gradient: "from-teal-950 via-slate-900 to-slate-950",
    iconColor: "text-teal-400",
  },
  workflow: {
    icon: Workflow,
    gradient: "from-indigo-950 via-slate-900 to-slate-950",
    iconColor: "text-indigo-300",
  },
  stack: {
    icon: Layers,
    gradient: "from-cyan-950 via-slate-900 to-slate-950",
    iconColor: "text-cyan-300",
  },
  article: {
    icon: BookOpen,
    gradient: "from-slate-800 via-slate-900 to-zinc-950",
    iconColor: "text-slate-300",
  },
};

interface CategoryVisualProps {
  category: ContentCategory;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZE_MAP = {
  sm: { box: "h-24 w-full", icon: "h-6 w-6", rounded: "rounded-lg" },
  md: { box: "h-36 w-full", icon: "h-8 w-8", rounded: "rounded-xl" },
  lg: { box: "h-28 w-28 md:h-32 md:w-32", icon: "h-10 w-10", rounded: "rounded-2xl" },
};

export function CategoryVisual({ category, size = "md", className }: CategoryVisualProps) {
  const config = CATEGORY_CONFIG[category];
  const Icon = config.icon;
  const s = SIZE_MAP[size];

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-gradient-to-br",
        config.gradient,
        s.box,
        s.rounded,
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgb(20_184_166/0.15),transparent_55%)]" />
      <Icon className={cn("relative", config.iconColor, s.icon)} strokeWidth={1.5} />
    </div>
  );
}
