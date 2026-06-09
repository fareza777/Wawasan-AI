import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AiVerdictCard } from "@/components/ai-verdict/ai-verdict-card";
import { GlobalSearch } from "@/components/search/global-search";
import { Newsletter } from "@/components/home/newsletter";
import { RepoCard } from "@/components/repo/repo-card";
import { ContentCard } from "@/components/shared/content-card";
import { SectionHeader } from "@/components/shared/section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getLatestRepos,
  getLatestVerdicts,
  getPopularWorkflows,
  getFeaturedStacks,
} from "@/lib/data-access";
import { SITE_CONFIG } from "@/lib/constants";

export default function HomePage() {
  const latestRepos = getLatestRepos(4);
  const latestVerdicts = getLatestVerdicts(3);
  const popularWorkflows = getPopularWorkflows(6);
  const featuredStacks = getFeaturedStacks(4);

  const workflowTabs = {
    umkm: popularWorkflows.filter((w) => w.tags.includes("umkm") || w.tags.includes("bisnis")),
    pemerintah: popularWorkflows.filter((w) => w.tags.includes("asn") || w.tags.includes("pemerintah")),
    content: popularWorkflows.filter((w) => w.tags.includes("content") || w.tags.includes("seo")),
  };

  return (
    <div>
      {/* Hero - Perplexity editorial: search-first */}
      <section className="border-b border-border bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="accent" className="mb-4">
              Platform Keputusan AI Indonesia
            </Badge>
            <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl">
              {SITE_CONFIG.name}
            </h1>
            <p className="mt-3 text-lg text-muted-foreground text-balance">
              {SITE_CONFIG.tagline}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Jawab dalam 30 detik: tool mana, repo mana, workflow mana, stack mana.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-2xl">
            <GlobalSearch />
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link href="/verdict">Lihat AI Verdict</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/repo">Jelajahi Repo</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/stack">Pilih Stack</Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Repo Terbaru */}
        <section>
          <SectionHeader
            title="Repo Terbaru"
            description="GitHub AI yang layak dicoba minggu ini"
            href="/repo"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {latestRepos.map((repo) => (
              <RepoCard key={repo.slug} repo={repo} />
            ))}
          </div>
        </section>

        {/* AI Verdict Terbaru */}
        <section>
          <SectionHeader
            title="AI Verdict Terbaru"
            description="Keputusan tegas: cocok atau tidak"
            href="/verdict"
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {latestVerdicts.map((verdict) => (
              <AiVerdictCard key={verdict.slug} verdict={verdict} variant="compact" />
            ))}
          </div>
        </section>

        {/* Workflow Populer */}
        <section>
          <SectionHeader
            title="Workflow Populer"
            description="Template praktis untuk use case nyata"
            href="/workflow"
          />
          <Tabs defaultValue="umkm">
            <TabsList className="mb-4">
              <TabsTrigger value="umkm">UMKM & Bisnis</TabsTrigger>
              <TabsTrigger value="pemerintah">Pemerintah & ASN</TabsTrigger>
              <TabsTrigger value="content">Content & SEO</TabsTrigger>
            </TabsList>
            <TabsContent value="umkm">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {(workflowTabs.umkm.length > 0 ? workflowTabs.umkm : popularWorkflows.slice(0, 3)).map(
                  (item) => (
                    <ContentCard key={item.slug} item={item} />
                  )
                )}
              </div>
            </TabsContent>
            <TabsContent value="pemerintah">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {(workflowTabs.pemerintah.length > 0
                  ? workflowTabs.pemerintah
                  : popularWorkflows.slice(0, 3)
                ).map((item) => (
                  <ContentCard key={item.slug} item={item} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="content">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {(workflowTabs.content.length > 0
                  ? workflowTabs.content
                  : popularWorkflows.slice(0, 3)
                ).map((item) => (
                  <ContentCard key={item.slug} item={item} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* AI Stack Pilihan */}
        <section>
          <SectionHeader
            title="AI Stack Pilihan"
            description="Kombinasi tool terbaik per kebutuhan"
            href="/stack"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredStacks.map((stack) => (
              <Link
                key={stack.slug}
                href={`/stack/${stack.slug}`}
                className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-accent/30 hover:shadow-md"
              >
                <Badge variant="accent" className="mb-3">
                  {stack.totalMonthlyCost}
                </Badge>
                <h3 className="font-semibold group-hover:text-accent transition-colors">
                  {stack.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {stack.description}
                </p>
                <span className="mt-4 flex items-center gap-1 text-sm font-medium text-accent">
                  Lihat stack
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <Newsletter />
      </div>
    </div>
  );
}
