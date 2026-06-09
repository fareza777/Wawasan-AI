import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateString));
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    repo: "Repo AI",
    verdict: "AI Verdict",
    workflow: "Workflow",
    stack: "AI Stack",
    article: "Belajar AI",
  };
  return labels[category] ?? category;
}

export function getCategoryPath(category: string): string {
  const paths: Record<string, string> = {
    repo: "/repo",
    verdict: "/verdict",
    workflow: "/workflow",
    stack: "/stack",
    article: "/belajar-ai",
  };
  return paths[category] ?? "/";
}
