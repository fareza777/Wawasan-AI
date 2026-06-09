import { notFound } from "next/navigation";
import { Clock, Wrench } from "lucide-react";
import { DetailHero } from "@/components/layout/detail-hero";
import { RelatedContent } from "@/components/shared/related-content";
import { Badge } from "@/components/ui/badge";
import { getAllWorkflows, getWorkflowBySlug } from "@/lib/data-access";
import { createContentJsonLd, createMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/shared/json-ld";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllWorkflows().map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const workflow = getWorkflowBySlug(slug);
  if (!workflow) return {};
  return createMetadata({
    title: workflow.title,
    description: workflow.description,
    path: `/workflow/${workflow.slug}`,
    type: "article",
    publishedAt: workflow.publishedAt,
    updatedAt: workflow.updatedAt,
  });
}

export default async function WorkflowDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const workflow = getWorkflowBySlug(slug);
  if (!workflow) notFound();

  return (
    <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd data={createContentJsonLd(workflow)} />

      <DetailHero
        category="workflow"
        title={workflow.title}
        description={workflow.description}
        updatedAt={workflow.updatedAt}
        meta={
          <>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {workflow.estimatedTime}
            </span>
            <span className="flex items-center gap-1.5">
              <Wrench className="h-4 w-4" />
              {workflow.tools.join(", ")}
            </span>
          </>
        }
        badge={
          <>
            {workflow.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
            <Badge variant="outline" className="capitalize">{workflow.difficulty}</Badge>
          </>
        }
      />

      <div className="space-y-6">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-semibold tracking-tight">Untuk Siapa?</h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{workflow.useCase}</p>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-semibold tracking-tight">Langkah-langkah</h2>
          <ol className="space-y-3">
            {workflow.steps.map((step, i) => (
              <li
                key={i}
                className="flex gap-4 rounded-xl border border-border bg-card p-4"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <RelatedContent slugs={workflow.relatedContent} />
    </article>
  );
}
