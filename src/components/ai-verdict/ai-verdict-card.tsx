import Link from "next/link";
import { ArrowRight, Check, X, Lightbulb } from "lucide-react";
import type { VerdictContent } from "@/types/content";
import { VerdictRadar } from "@/components/ai-verdict/verdict-radar";
import { ScoreRing } from "@/components/ai-verdict/score-ring";
import { getVerdictLabel } from "@/lib/verdict-label";
import { cn, formatDate } from "@/lib/utils";

interface AiVerdictCardProps {
  verdict: VerdictContent;
  variant?: "compact" | "full" | "featured";
  className?: string;
}

export function AiVerdictCard({ verdict, variant = "compact", className }: AiVerdictCardProps) {
  const { label, tone } = getVerdictLabel(verdict.verdictScore);

  if (variant === "featured") {
    return (
      <Link href={`/verdict/${verdict.slug}`} className={cn("group block", className)}>
        <div className="premium-surface gradient-border overflow-hidden rounded-2xl">
          <div className="relative p-6 md:p-8">
            <div className="absolute top-0 right-0 h-40 w-40 bg-accent/10 blur-3xl" />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <p className={cn("text-sm font-semibold", `tone-${tone}`)}>{label}</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tighter transition-colors group-hover:text-accent md:text-4xl">
                  {verdict.title}
                </h3>
                <p className="mt-3 max-w-xl text-muted-foreground leading-relaxed">
                  {verdict.conclusion.rekomendasiAkhir}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                  Baca verdict
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
              <div className="relative shrink-0 self-center">
                <ScoreRing score={verdict.verdictScore} size={96} />
                <p className="mt-2 text-center text-xs text-muted-foreground">dari 10</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={`/verdict/${verdict.slug}`} className={cn("group block", className)}>
        <div className="premium-surface gradient-border h-full overflow-hidden rounded-xl">
          <div className="p-5">
            <div className="mb-3 flex items-start justify-between gap-3">
              <p className={cn("text-xs font-semibold", `tone-${tone}`)}>{label}</p>
              <ScoreRing score={verdict.verdictScore} size={44} />
            </div>
            <h3 className="text-base font-semibold tracking-tight transition-colors group-hover:text-accent">
              {verdict.title}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground leading-relaxed">
              {verdict.description}
            </p>
            <p className="mt-4 text-xs text-muted-foreground">{formatDate(verdict.updatedAt)}</p>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className={cn("premium-surface overflow-hidden rounded-2xl", className)}>
      <div className="border-b border-border bg-gradient-to-br from-accent/5 to-transparent p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className={cn("text-sm font-semibold", `tone-${tone}`)}>{label}</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tighter md:text-3xl">{verdict.title}</h2>
            <p className="mt-2 max-w-2xl text-muted-foreground leading-relaxed">
              {verdict.description}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <ScoreRing score={verdict.verdictScore} size={96} />
            <p className="mt-2 text-xs text-muted-foreground">{verdict.pricing}</p>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-muted/20 p-5">
            <VerdictRadar criteria={verdict.criteria} />
          </div>

          <div className="space-y-5">
            <VerdictSection
              icon={<Check className="h-4 w-4 text-accent" strokeWidth={1.5} />}
              title="Cocok untuk"
              items={verdict.conclusion.cocokUntuk}
              variant="positive"
            />
            <VerdictSection
              icon={<X className="h-4 w-4 text-destructive" strokeWidth={1.5} />}
              title="Tidak cocok untuk"
              items={verdict.conclusion.tidakCocokUntuk}
              variant="negative"
            />
            <VerdictSection
              icon={<Lightbulb className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />}
              title="Alternatif"
              items={verdict.conclusion.alternatif}
              variant="neutral"
            />
          </div>
        </div>

        <div
          id="rekomendasi"
          className="mt-8 scroll-mt-24 rounded-xl border border-accent/25 bg-gradient-to-br from-accent/10 to-accent/5 p-6"
        >
          <h4 className="mb-2 text-sm font-semibold text-accent">Rekomendasi Akhir</h4>
          <p className="text-sm leading-relaxed">{verdict.conclusion.rekomendasiAkhir}</p>
        </div>
      </div>
    </div>
  );
}

function VerdictSection({
  icon,
  title,
  items,
  variant,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
  variant: "positive" | "negative" | "neutral";
}) {
  return (
    <div className="rounded-lg border border-border bg-card/50 p-4">
      <div className="mb-3 flex items-center gap-2">
        {icon}
        <h4 className="text-sm font-semibold">{title}</h4>
      </div>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className={cn(
              "flex gap-2 text-sm text-muted-foreground leading-relaxed",
              variant === "positive" && "before:shrink-0 before:font-bold before:text-accent before:content-['+']",
              variant === "negative" && "before:shrink-0 before:font-bold before:text-destructive before:content-['-']",
              variant === "neutral" && "before:shrink-0 before:text-muted-foreground before:content-['›']"
            )}
          >
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
