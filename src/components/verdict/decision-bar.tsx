"use client";

import { ArrowRight } from "lucide-react";
import { ScoreRing } from "@/components/ai-verdict/score-ring";
import { getVerdictLabel } from "@/lib/verdict-label";
import { Button } from "@/components/ui/button";

interface DecisionBarProps {
  score: number;
  title: string;
  href: string;
}

export function DecisionBar({ score, title, href }: DecisionBarProps) {
  const { label } = getVerdictLabel(score);

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/90 p-3 backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-lg items-center gap-3">
        <ScoreRing score={score} size={44} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{title}</p>
          <p className="text-xs text-accent">{label}</p>
        </div>
        <Button variant="accent" size="sm" asChild>
          <a href={href}>
            Rekomendasi
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </Button>
      </div>
    </div>
  );
}
