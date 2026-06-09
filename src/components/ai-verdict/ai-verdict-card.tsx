import Link from "next/link";
import { ArrowRight, Check, X, Lightbulb } from "lucide-react";
import type { VerdictContent } from "@/types/content";
import { VerdictRadar } from "@/components/ai-verdict/verdict-radar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, formatDate } from "@/lib/utils";

interface AiVerdictCardProps {
  verdict: VerdictContent;
  variant?: "compact" | "full";
  className?: string;
}

export function AiVerdictCard({ verdict, variant = "compact", className }: AiVerdictCardProps) {
  if (variant === "compact") {
    return (
      <Link href={`/verdict/${verdict.slug}`} className={cn("group block", className)}>
        <Card className="h-full transition-all hover:border-accent/40 hover:shadow-md">
          <CardHeader className="pb-3">
            <div className="mb-2 flex items-center justify-between">
              <Badge variant="accent">AI Verdict</Badge>
              <span className="text-2xl font-bold tabular-nums text-accent">
                {verdict.verdictScore}
              </span>
            </div>
            <CardTitle className="group-hover:text-accent transition-colors">
              {verdict.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="line-clamp-2 text-sm text-muted-foreground">{verdict.description}</p>
            <p className="mt-3 text-xs text-muted-foreground">{formatDate(verdict.updatedAt)}</p>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="border-b border-border bg-muted/30">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Badge variant="accent" className="mb-3">AI Verdict</Badge>
            <CardTitle className="text-2xl md:text-3xl">{verdict.title}</CardTitle>
            <p className="mt-2 max-w-2xl text-muted-foreground">{verdict.description}</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold tabular-nums text-accent">
              {verdict.verdictScore}
            </div>
            <p className="text-xs text-muted-foreground">Skor Keseluruhan</p>
            <p className="mt-1 text-xs text-muted-foreground">{verdict.pricing}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid gap-8 lg:grid-cols-2">
          <VerdictRadar criteria={verdict.criteria} />

          <div className="space-y-6">
            <VerdictSection
              icon={<Check className="h-4 w-4 text-accent" />}
              title="Cocok untuk"
              items={verdict.conclusion.cocokUntuk}
              variant="positive"
            />
            <VerdictSection
              icon={<X className="h-4 w-4 text-destructive" />}
              title="Tidak cocok untuk"
              items={verdict.conclusion.tidakCocokUntuk}
              variant="negative"
            />
            <VerdictSection
              icon={<Lightbulb className="h-4 w-4 text-muted-foreground" />}
              title="Alternatif"
              items={verdict.conclusion.alternatif}
              variant="neutral"
            />
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-accent/30 bg-accent/5 p-5">
          <h4 className="mb-2 text-sm font-semibold text-accent">Rekomendasi Akhir</h4>
          <p className="text-sm leading-relaxed">{verdict.conclusion.rekomendasiAkhir}</p>
        </div>
      </CardContent>
    </Card>
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
    <div>
      <div className="mb-2 flex items-center gap-2">
        {icon}
        <h4 className="text-sm font-semibold">{title}</h4>
      </div>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li
            key={item}
            className={cn(
              "text-sm text-muted-foreground leading-relaxed",
              variant === "positive" && "before:mr-2 before:text-accent before:content-['+']",
              variant === "negative" && "before:mr-2 before:text-destructive before:content-['-']",
              variant === "neutral" && "before:mr-2 before:content-['>']"
            )}
          >
            {variant === "neutral" ? item : item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AiVerdictCardLink({ verdict }: { verdict: VerdictContent }) {
  return (
    <Button variant="outline" asChild className="mt-4">
      <Link href={`/verdict/${verdict.slug}`}>
        Lihat Verdict Lengkap
        <ArrowRight className="h-4 w-4" />
      </Link>
    </Button>
  );
}
