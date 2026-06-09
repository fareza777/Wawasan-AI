import { notFound } from "next/navigation";
import Image from "next/image";
import { Clock, Wrench } from "lucide-react";
import { RelatedContent } from "@/components/shared/related-content";
import { Badge } from "@/components/ui/badge";
import { getAllWorkflows, getWorkflowBySlug } from "@/lib/data-access";
import { createContentJsonLd, createMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/shared/json-ld";
import { formatDate } from "@/lib/utils";

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
    image: workflow.featuredImage,
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

      <div className="relative mb-8 aspect-[21/9] overflow-hidden rounded-xl bg-muted">
        <Image
          src={workflow.featuredImage}
          alt={workflow.title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 896px) 100vw, 896px"
        />
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {workflow.tags.map((tag) => (
          <Badge key={tag} variant="secondary">{tag}</Badge>
        ))}
        <Badge variant="outline" className="capitalize">{workflow.difficulty}</Badge>
      </div>

      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{workflow.title}</h1>
      <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{workflow.description}</p>

      <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" />
          {workflow.estimatedTime}
        </span>
        <span className="flex items-center gap-1.5">
          <Wrench className="h-4 w-4" />
          {workflow.tools.join(", ")}
        </span>
      </div>

      <div className="mt-8 space-y-6">
        <div className="rounded-xl border border-border bg-muted/30 p-6">
          <h2 className="mb-2 text-lg font-semibold">Untuk Siapa?</h2>
          <p className="text-sm text-muted-foreground">{workflow.useCase}</p>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-semibold">Langkah-langkah</h2>
          <ol className="space-y-3">
            {workflow.steps.map((step, i) => (
              <li
                key={i}
                className="flex gap-4 rounded-lg border border-border bg-card p-4"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        Diperbarui {formatDate(workflow.updatedAt)}
      </p>

      <RelatedContent slugs={workflow.relatedContent} />
    </article>
  );
}
