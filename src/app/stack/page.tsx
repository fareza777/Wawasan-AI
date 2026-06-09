import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { CategoryVisual } from "@/components/shared/category-visual";
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
      <PageHeader
        title="AI Stack"
        description="Pilih kombinasi tool yang tepat dengan estimasi biaya bulanan yang transparan."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {stacks.map((stack) => (
          <Link
            key={stack.slug}
            href={`/stack/${stack.slug}`}
            className="premium-surface gradient-border group overflow-hidden rounded-xl"
          >
            <div className="grid sm:grid-cols-[140px_1fr]">
              <CategoryVisual category="stack" size="sm" className="h-full min-h-[120px] rounded-none sm:min-h-0" />
              <div className="p-5">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <Badge variant="accent" className="border-0 bg-accent/10">
                    {stack.totalMonthlyCost}
                  </Badge>
                  <Badge variant="outline" className="capitalize">{stack.difficulty}</Badge>
                </div>
                <h2 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-accent">
                  {stack.title}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">{stack.description}</p>
                <span className="mt-4 flex items-center gap-1 text-sm font-medium text-accent">
                  Detail stack
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
