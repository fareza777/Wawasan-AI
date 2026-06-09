import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { Badge } from "@/components/ui/badge";
import { getAllStacks } from "@/lib/data-access";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "AI Stack",
  description:
    "Kombinasi tool AI terbaik per kebutuhan: murah, UMKM, content creator, developer, enterprise.",
  path: "/stack",
});

export default function StackListPage() {
  const stacks = getAllStacks();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeader
        title="AI Stack"
        description="Pilih kombinasi tool yang tepat — dengan estimasi biaya bulanan"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {stacks.map((stack) => (
          <Link
            key={stack.slug}
            href={`/stack/${stack.slug}`}
            className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-accent/30 hover:shadow-md"
          >
            <div className="mb-3 flex items-center justify-between">
              <Badge variant="accent">{stack.totalMonthlyCost}</Badge>
              <Badge variant="outline" className="capitalize">{stack.difficulty}</Badge>
            </div>
            <h2 className="text-xl font-semibold group-hover:text-accent transition-colors">
              {stack.title}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">{stack.description}</p>
            <p className="mt-3 text-xs text-muted-foreground">
              {stack.tools.length} tools · {stack.bestFor}
            </p>
            <span className="mt-4 flex items-center gap-1 text-sm font-medium text-accent">
              Lihat detail
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
