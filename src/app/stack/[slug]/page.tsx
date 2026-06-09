import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { DetailHero } from "@/components/layout/detail-hero";
import { RelatedContent } from "@/components/shared/related-content";
import { Badge } from "@/components/ui/badge";
import { getAllStacks, getStackBySlug } from "@/lib/data-access";
import { createContentJsonLd, createMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/shared/json-ld";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllStacks().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const stack = getStackBySlug(slug);
  if (!stack) return {};
  return createMetadata({
    title: stack.title,
    description: stack.description,
    path: `/stack/${stack.slug}`,
    type: "article",
    publishedAt: stack.publishedAt,
    updatedAt: stack.updatedAt,
  });
}

export default async function StackDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const stack = getStackBySlug(slug);
  if (!stack) notFound();

  return (
    <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd data={createContentJsonLd(stack)} />

      <Breadcrumbs
        items={[
          { label: "Beranda", href: "/" },
          { label: "AI Stack", href: "/stack" },
          { label: stack.title },
        ]}
      />

      <DetailHero
        category="stack"
        slug={stack.slug}
        title={stack.title}
        description={stack.description}
        updatedAt={stack.updatedAt}
        meta={<span className="font-medium text-accent">{stack.totalMonthlyCost}/bulan</span>}
        badge={<Badge variant="outline" className="capitalize">{stack.difficulty}</Badge>}
      />

      <div className="mb-8 rounded-2xl border border-accent/25 bg-accent/5 p-6">
        <h2 className="text-sm font-semibold text-accent">Terbaik Untuk</h2>
        <p className="mt-1 text-sm leading-relaxed">{stack.bestFor}</p>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold tracking-tight">Komponen Stack</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {stack.tools.map((tool) => (
            <div key={tool.name} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold tracking-tight">{tool.name}</h3>
                <span className="shrink-0 text-sm font-medium text-accent">{tool.cost}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{tool.role}</p>
            </div>
          ))}
        </div>
      </div>

      <RelatedContent slugs={stack.relatedContent} />
    </article>
  );
}
