import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AiVerdictCard } from "@/components/ai-verdict/ai-verdict-card";
import { Hero } from "@/components/home/hero";
import { RepoScroll } from "@/components/home/repo-scroll";
import { StatsStrip } from "@/components/home/stats-strip";
import { Newsletter } from "@/components/home/newsletter";
import { ArticleCard } from "@/components/shared/article-card";
import { CategoryVisual } from "@/components/shared/category-visual";
import { ContentCard } from "@/components/shared/content-card";
import { SectionHeader } from "@/components/shared/section-header";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getLatestRepos,
  getLatestVerdicts,
  getPopularWorkflows,
  getFeaturedStacks,
  getFeaturedArticles,
} from "@/lib/data-access";

export default function HomePage() {
  const latestRepos = getLatestRepos(6);
  const latestVerdicts = getLatestVerdicts(3);
  const [featuredVerdict, ...otherVerdicts] = latestVerdicts;
  const popularWorkflows = getPopularWorkflows(6);
  const featuredStacks = getFeaturedStacks(4);
  const featuredArticles = getFeaturedArticles(2);

  const workflowTabs = {
    umkm: popularWorkflows.filter((w) => w.tags.includes("umkm") || w.tags.includes("bisnis")),
    pemerintah: popularWorkflows.filter((w) => w.tags.includes("asn") || w.tags.includes("pemerintah")),
    content: popularWorkflows.filter((w) => w.tags.includes("content") || w.tags.includes("seo")),
  };

  const [heroStack, ...otherStacks] = featuredStacks;

  return (
    <div>
      <Hero />
      <StatsStrip />

      <div className="mx-auto max-w-7xl space-y-20 px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <section>
          <SectionHeader
            title="AI Verdict Terbaru"
            description="Keputusan tegas dalam 30 detik"
            href="/verdict"
          />
          {featuredVerdict && (
            <div className="mb-5">
              <AiVerdictCard verdict={featuredVerdict} variant="featured" />
            </div>
          )}
          <div className="grid gap-4 md:grid-cols-2">
            {otherVerdicts.map((verdict) => (
              <AiVerdictCard key={verdict.slug} verdict={verdict} variant="compact" />
            ))}
          </div>
        </section>

        <section>
          <SectionHeader
            title="Repo AI Trending"
            description="Geser untuk eksplorasi kurasi minggu ini"
            href="/repo"
          />
          <RepoScroll repos={latestRepos} />
        </section>

        <section>
          <SectionHeader
            title="Workflow Populer"
            description="Langkah praktis per use case"
            href="/workflow"
          />
          <Tabs defaultValue="umkm">
            <TabsList className="mb-6 h-auto flex-wrap gap-1 bg-muted/60 p-1">
              <TabsTrigger value="umkm" className="rounded-lg px-4">UMKM</TabsTrigger>
              <TabsTrigger value="pemerintah" className="rounded-lg px-4">ASN</TabsTrigger>
              <TabsTrigger value="content" className="rounded-lg px-4">Content</TabsTrigger>
            </TabsList>
            {(["umkm", "pemerintah", "content"] as const).map((tab) => (
              <TabsContent key={tab} value={tab}>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {(workflowTabs[tab].length > 0 ? workflowTabs[tab] : popularWorkflows.slice(0, 3)).map(
                    (item) => (
                      <ContentCard key={item.slug} item={item} />
                    )
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        <section>
          <SectionHeader title="AI Stack Pilihan" href="/stack" />
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:grid-rows-2">
            {heroStack && (
              <Link
                href={`/stack/${heroStack.slug}`}
                className="premium-surface gradient-border group relative col-span-2 row-span-2 overflow-hidden rounded-2xl"
              >
                <CategoryVisual
                  category="stack"
                  slug={heroStack.slug}
                  title={heroStack.title}
                  size="md"
                  className="absolute inset-0 h-full w-full rounded-2xl opacity-30"
                  showIcon={false}
                />
                <div className="relative flex h-full min-h-[280px] flex-col justify-between p-6 md:p-8">
                  <div>
                    <Badge variant="accent" className="mb-4 border-0 bg-accent/10">
                      {heroStack.totalMonthlyCost}
                    </Badge>
                    <h3 className="text-2xl font-semibold tracking-tighter transition-colors group-hover:text-accent md:text-3xl">
                      {heroStack.title}
                    </h3>
                    <p className="mt-3 max-w-md text-muted-foreground leading-relaxed">
                      {heroStack.description}
                    </p>
                  </div>
                  <span className="mt-6 flex items-center gap-1 text-sm font-medium text-accent">
                    Lihat stack
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            )}
            {otherStacks.map((stack) => (
              <Link
                key={stack.slug}
                href={`/stack/${stack.slug}`}
                className="premium-surface gradient-border group overflow-hidden rounded-xl"
              >
                <CategoryVisual
                  category="stack"
                  slug={stack.slug}
                  title={stack.title}
                  size="sm"
                  className="rounded-none rounded-t-xl"
                  showIcon={false}
                />
                <div className="p-4">
                  <Badge variant="outline" className="mb-2 text-[10px]">
                    {stack.totalMonthlyCost}
                  </Badge>
                  <h3 className="font-semibold tracking-tight transition-colors group-hover:text-accent">
                    {stack.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{stack.bestFor}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <SectionHeader title="Belajar AI" description="Fondasi sebelum memutuskan" href="/belajar-ai" />
          <div className="grid gap-6 md:grid-cols-2">
            {featuredArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>

        <Newsletter />
      </div>
    </div>
  );
}
