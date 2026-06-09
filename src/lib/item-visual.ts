import type { ContentCategory } from "@/types/content";

const CATEGORY_HUE: Record<ContentCategory, number> = {
  repo: 185,
  verdict: 172,
  workflow: 235,
  stack: 195,
  article: 215,
};

export function hashSlug(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash << 5) - hash + slug.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function getVisualHue(slug: string, category: ContentCategory): number {
  const base = CATEGORY_HUE[category];
  const offset = hashSlug(slug) % 24;
  return base + offset - 12;
}

export function getMonogram(title: string): string {
  const cleaned = title.replace(/[^a-zA-Z0-9\s]/g, "").trim();
  const words = cleaned.split(/\s+/).filter(Boolean);
  if (words.length >= 2) {
    return `${words[0][0] ?? ""}${words[1][0] ?? ""}`.toUpperCase();
  }
  return cleaned.slice(0, 2).toUpperCase() || "AI";
}

export function getItemVisualStyle(hue: number, mode: "light" | "dark") {
  if (mode === "dark") {
    return {
      background: `linear-gradient(145deg, hsl(${hue} 42% 16%) 0%, hsl(${hue} 28% 10%) 45%, hsl(222 40% 7%) 100%)`,
      monogramColor: `hsl(${hue} 75% 72%)`,
      glow: `hsl(${hue} 80% 50% / 0.18)`,
    };
  }
  return {
    background: `linear-gradient(145deg, hsl(${hue} 45% 94%) 0%, hsl(${hue} 30% 97%) 50%, hsl(210 30% 99%) 100%)`,
    monogramColor: `hsl(${hue} 55% 32%)`,
    glow: `hsl(${hue} 60% 45% / 0.12)`,
  };
}
