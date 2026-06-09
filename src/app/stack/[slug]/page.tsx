import { notFound } from "next/navigation";
import Image from "next/image";
import { RelatedContent } from "@/components/shared/related-content";
import { Badge } from "@/components/ui/badge";
import { getAllStacks, getStackBySlug } from "@/lib/data-access";
import { createContentJsonLd, createMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/shared/json-ld";
import { formatDate } from "@/lib/utils";

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
    image: stack.featuredImage,
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

      <div className="relative mb-8 aspect-[21/9] overflow-hidden rounded-xl bg-muted">
        <Image
          src={stack.featuredImage}
          alt={stack.title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 896px) 100vw, 896px"
        />
      </div>

      <Badge variant="accent" className="mb-4">
        Estimasi: {stack.totalMonthlyCost}/bulan
      </Badge>

      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{stack.title}</h1>
      <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{stack.description}</p>

      <div className="mt-8 rounded-xl border border-accent/30 bg-accent/5 p-5">
        <h2 className="text-sm font-semibold text-accent">Terbaik Untuk</h2>
        <p className="mt-1 text-sm">{stack.bestFor}</p>
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold">Komponen Stack</h2>
        <div className="overflow-hidden rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Tool</th>
                <th className="px-4 py-3 text-left font-medium">Peran</th>
                <th className="px-4 py-3 text-right font-medium">Biaya</th>
              </tr>
            </thead>
            <tbody>
              {stack.tools.map((tool) => (
                <tr key={tool.name} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-medium">{tool.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{tool.role}</td>
                  <td className="px-4 py-3 text-right text-accent">{tool.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        Diperbarui {formatDate(stack.updatedAt)}
      </p>

      <RelatedContent slugs={stack.relatedContent} />
    </article>
  );
}
