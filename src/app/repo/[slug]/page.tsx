import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Star, GitBranch, Calendar } from "lucide-react";
import { RelatedContent } from "@/components/shared/related-content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAllRepos, getRepoBySlug } from "@/lib/data-access";
import { createContentJsonLd, createMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/shared/json-ld";
import { formatDate } from "@/lib/utils";

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
    image: repo.featuredImage,
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

      <div className="relative mb-8 aspect-[21/9] overflow-hidden rounded-xl bg-muted">
        <Image
          src={repo.featuredImage}
          alt={repo.title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 896px) 100vw, 896px"
        />
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <Badge variant="muted">{repo.language}</Badge>
        <Badge variant="outline">{repo.license}</Badge>
        <Badge variant="outline" className="capitalize">{repo.difficulty}</Badge>
        {repo.tags.map((tag) => (
          <Badge key={tag} variant="secondary">{tag}</Badge>
        ))}
      </div>

      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{repo.title}</h1>
      <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{repo.description}</p>

      <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Star className="h-4 w-4" />
          {repo.stars.toLocaleString("id-ID")} stars
        </span>
        <span className="flex items-center gap-1.5">
          <GitBranch className="h-4 w-4" />
          {repo.language}
        </span>
        <span className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4" />
          Diperbarui {formatDate(repo.updatedAt)}
        </span>
      </div>

      <div className="mt-8 rounded-xl border border-border bg-muted/30 p-6">
        <h2 className="mb-3 text-lg font-semibold">Keputusan Cepat</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Layak dicoba</strong> jika Anda butuh{" "}
          {repo.tags.slice(0, 2).join(" dan ")}. Level {repo.difficulty} —{" "}
          {repo.difficulty === "pemula"
            ? "cocok untuk eksplorasi awal"
            : repo.difficulty === "menengah"
              ? "butuh pengalaman dasar AI/dev"
              : "untuk developer berpengalaman"}.
          Commit terakhir: {repo.lastCommit}.
        </p>
        <Button className="mt-4" variant="accent" asChild>
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
