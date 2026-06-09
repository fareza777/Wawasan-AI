"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { CategoryVisual } from "@/components/shared/category-visual";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { WorkflowContent } from "@/types/content";

interface WorkflowShowcaseProps {
  workflows: WorkflowContent[];
}

export function WorkflowShowcase({ workflows }: WorkflowShowcaseProps) {
  const [activeSlug, setActiveSlug] = useState(workflows[0]?.slug ?? "");
  const active =
    workflows.find((w) => w.slug === activeSlug) ?? workflows[0];

  if (!active) return null;

  const compact = workflows.filter((w) => w.slug !== active.slug).slice(0, 2);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {workflows.slice(0, 4).map((workflow) => (
          <button
            key={workflow.slug}
            type="button"
            onClick={() => setActiveSlug(workflow.slug)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all",
              workflow.slug === active.slug
                ? "border-accent/40 bg-accent/10 text-foreground"
                : "border-border bg-card/80 text-muted-foreground hover:border-accent/30 hover:text-foreground"
            )}
          >
            {workflow.tags[0] ?? workflow.difficulty}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Link
          href={`/workflow/${active.slug}`}
          className="premium-surface gradient-border group overflow-hidden rounded-2xl"
        >
          <div className="grid md:grid-cols-[auto_1fr]">
            <CategoryVisual
              category="workflow"
              slug={active.slug}
              title={active.title}
              size="md"
              className="h-32 w-full rounded-none md:h-full md:w-36 md:rounded-l-2xl"
              showIcon={false}
            />
            <div className="p-6">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="accent" className="border-0 bg-accent/10 capitalize">
                  {active.difficulty}
                </Badge>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  {active.estimatedTime}
                </span>
              </div>
              <h3 className="mt-3 text-xl font-semibold tracking-tighter transition-colors group-hover:text-accent md:text-2xl">
                {active.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground leading-relaxed">
                {active.description}
              </p>
              <ol className="mt-5 space-y-2.5 border-t border-border pt-5">
                {active.steps.slice(0, 3).map((step, i) => (
                  <li key={step} className="flex gap-3 text-sm">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-semibold text-accent">
                      {i + 1}
                    </span>
                    <span className="text-muted-foreground leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent">
                Lihat workflow lengkap
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </div>
        </Link>

        <div className="flex flex-col gap-4">
          {compact.map((workflow) => (
            <Link
              key={workflow.slug}
              href={`/workflow/${workflow.slug}`}
              className="premium-surface gradient-border group flex flex-1 items-center gap-4 rounded-xl p-4"
            >
              <CategoryVisual
                category="workflow"
                slug={workflow.slug}
                title={workflow.title}
                size="sm"
                className="h-16 w-16 shrink-0 rounded-lg"
                showIcon={false}
              />
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-medium uppercase tracking-wider text-accent">
                  {workflow.useCase.split(" ").slice(0, 2).join(" ")}
                </p>
                <h4 className="mt-0.5 line-clamp-2 font-semibold tracking-tight transition-colors group-hover:text-accent">
                  {workflow.title}
                </h4>
                <p className="mt-1 text-xs text-muted-foreground">
                  {workflow.steps.length} langkah · {workflow.estimatedTime}
                </p>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-all group-hover:text-accent group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
