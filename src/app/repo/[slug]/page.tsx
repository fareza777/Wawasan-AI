import { notFound } from "next/navigation";
import Link from "next/link";
import { ExternalLink, Star, GitBranch } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { DetailHero } from "@/components/layout/detail-hero";
import { RelatedContent } from "@/components/shared/related-content";
import { TagList } from "@/components/shared/tag-list";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAllRepos, getRepoBySlug } from "@/lib/data-access";
import { createContentJsonLd, createMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/shared/json-ld";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllRepos().map((repo) => ({ slug: repo.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const repo = getRepoBySlug(slug);
  if (!repo) return {};
  return createMetadata({
    title: repo.title,
    description: repo.description,
    path: `/repo/${repo.slug}`,
    type: "article",
    publishedAt: repo.publishedAt,
    updatedAt: repo.updatedAt,
  });
}

export default async function RepoDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const repo = getRepoBySlug(slug);
  if (!repo) notFound();

  return (
    <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd data={createContentJsonLd(repo)} />

      <Breadcrumbs
        items={[
          { label: "Beranda", href: "/" },
          { label: "Repo AI", href: "/repo" },
          { label: repo.title },
        ]}
      />

      <DetailHero
        category="repo"
        slug={repo.slug}
        title={repo.title}
        description={repo.description}
        updatedAt={repo.updatedAt}
        meta={
          <>
            <span className="flex items-center gap-1.5">
              <Star className="h-4 w-4" />
              {repo.stars.toLocaleString("id-ID")} stars
            </span>
            <span className="flex items-center gap-1.5">
              <GitBranch className="h-4 w-4" />
              {repo.language}
            </span>
          </>
        }
        badge={
          <>
            <Badge variant="muted">{repo.language}</Badge>
            <Badge variant="outline">{repo.license}</Badge>
            <Badge variant="outline" className="capitalize">{repo.difficulty}</Badge>
            <TagList tags={repo.tags} />
          </>
        }
      />

      <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
        <h2 className="text-lg font-semibold tracking-tight">Keputusan Cepat</h2>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Layak dicoba</strong> jika Anda butuh{" "}
          {repo.tags.slice(0, 2).join(" dan ")}. Level {repo.difficulty}.
          Commit terakhir: {repo.lastCommit}.
        </p>
        <Button className="mt-5" variant="accent" asChild>
          <Link href={repo.githubUrl} target="_blank" rel="noopener noreferrer">
            Lihat di GitHub
            <ExternalLink className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <RelatedContent slugs={repo.relatedContent} />
    </article>
  );
}
