import { articles } from "@/data/articles";
import { repos } from "@/data/repos";
import { stacks } from "@/data/stacks";
import { verdicts } from "@/data/verdicts";
import { workflows } from "@/data/workflows";
import type {
  ArticleContent,
  ContentCategory,
  ContentItem,
  RepoContent,
  SearchResult,
  StackContent,
  VerdictContent,
  WorkflowContent,
} from "@/types/content";
import { getCategoryPath } from "@/lib/utils";

function getAllContent(): ContentItem[] {
  return [...repos, ...verdicts, ...workflows, ...stacks, ...articles];
}

export function getAllRepos(): RepoContent[] {
  return [...repos].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getRepoBySlug(slug: string): RepoContent | undefined {
  return repos.find((item) => item.slug === slug);
}

export function getFeaturedRepos(limit = 4): RepoContent[] {
  return getAllRepos()
    .filter((item) => item.featured)
    .slice(0, limit);
}

export function getLatestRepos(limit = 4): RepoContent[] {
  return getAllRepos().slice(0, limit);
}

export function getAllVerdicts(): VerdictContent[] {
  return [...verdicts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getVerdictBySlug(slug: string): VerdictContent | undefined {
  return verdicts.find((item) => item.slug === slug);
}

export function getFeaturedVerdicts(limit = 4): VerdictContent[] {
  return getAllVerdicts()
    .filter((item) => item.featured)
    .slice(0, limit);
}

export function getLatestVerdicts(limit = 4): VerdictContent[] {
  return getAllVerdicts().slice(0, limit);
}

export function getAllWorkflows(): WorkflowContent[] {
  return [...workflows].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getWorkflowBySlug(slug: string): WorkflowContent | undefined {
  return workflows.find((item) => item.slug === slug);
}

export function getPopularWorkflows(limit = 6): WorkflowContent[] {
  return getAllWorkflows()
    .filter((item) => item.featured)
    .slice(0, limit);
}

export function getAllStacks(): StackContent[] {
  return [...stacks].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getStackBySlug(slug: string): StackContent | undefined {
  return stacks.find((item) => item.slug === slug);
}

export function getFeaturedStacks(limit = 4): StackContent[] {
  return getAllStacks()
    .filter((item) => item.featured)
    .slice(0, limit);
}

export function getAllArticles(): ArticleContent[] {
  return [...articles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getArticleBySlug(slug: string): ArticleContent | undefined {
  return articles.find((item) => item.slug === slug);
}

export function getFeaturedArticles(limit = 4): ArticleContent[] {
  return getAllArticles()
    .filter((item) => item.featured)
    .slice(0, limit);
}

export function getRelatedContent(
  slugs: string[],
  category: ContentCategory
): ContentItem[] {
  const all = getAllContent();
  return slugs
    .map((slug) => all.find((item) => item.slug === slug && item.category === category))
    .filter((item): item is ContentItem => item !== undefined);
}

export function getRelatedBySlugs(slugs: string[]): ContentItem[] {
  const all = getAllContent();
  return slugs
    .map((slug) => all.find((item) => item.slug === slug))
    .filter((item): item is ContentItem => item !== undefined);
}

export function searchContent(query: string): SearchResult[] {
  const normalized = query.toLowerCase().trim();
  if (!normalized) return [];

  return getAllContent()
    .filter(
      (item) =>
        item.title.toLowerCase().includes(normalized) ||
        item.description.toLowerCase().includes(normalized) ||
        item.tags.some((tag) => tag.toLowerCase().includes(normalized))
    )
    .map((item) => ({
      slug: item.slug,
      title: item.title,
      description: item.description,
      category: item.category,
      href: `${getCategoryPath(item.category)}/${item.slug}`,
    }))
    .slice(0, 12);
}

export function getAllSlugs(): { category: ContentCategory; slug: string }[] {
  return getAllContent().map((item) => ({
    category: item.category,
    slug: item.slug,
  }));
}
