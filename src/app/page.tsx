import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AiVerdictCard } from "@/components/ai-verdict/ai-verdict-card";
import { Hero } from "@/components/home/hero";
import { StatsStrip } from "@/components/home/stats-strip";
import { Newsletter } from "@/components/home/newsletter";
import { RepoCard } from "@/components/repo/repo-card";
import { ContentCard } from "@/components/shared/content-card";
import { SectionHeader } from "@/components/shared/section-header";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getLatestRepos,
  getLatestVerdicts,
  getPopularWorkflows,
  getFeaturedStacks,
} from "@/lib/data-access";

export default function HomePage() {
  const latestRepos = getLatestRepos(4);
  const latestVerdicts = getLatestVerdicts(3);
  const [featuredVerdict, ...otherVerdicts] = latestVerdicts;
  const popularWorkflows = getPopularWorkflows(6);
  const featuredStacks = getFeaturedStacks(4);

  const workflowTabs = {
    umkm: popularWorkflows.filter((w) => w.tags.includes("umkm") || w.tags.includes("bisnis")),
    pemerintah: popularWorkflows.filter((w) => w.tags.includes("asn") || w.tags.includes("pemerintah")),
    content: popularWorkflows.filter((w) => w.tags.includes("content") || w.tags.includes("seo")),
  };

  return (
    <div>
      <Hero />
      <StatsStrip />

      <div className="mx-auto max-w-7xl space-y-20 px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        {/* AI Verdict — featured + grid */}
        <section>
          <SectionHeader
            title="AI Verdict Terbaru"
            description="Keputusan tegas berbasis 5 kriteria — cocok atau tidak, tanpa basa-basi"
            href="/verdict"
            accent
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

        <div className="section-divider" />

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

        <div className="section-divider" />

        {/* Workflow Populer */}
        <section>
          <SectionHeader
            title="Workflow Populer"
            description="Template praktis untuk use case nyata di Indonesia"
            href="/workflow"
            accent
          />
          <Tabs defaultValue="umkm">
            <TabsList className="mb-6 h-auto flex-wrap gap-1 bg-muted/60 p-1">
              <TabsTrigger value="umkm" className="rounded-lg px-4">
                UMKM & Bisnis
              </TabsTrigger>
              <TabsTrigger value="pemerintah" className="rounded-lg px-4">
                Pemerintah & ASN
              </TabsTrigger>
              <TabsTrigger value="content" className="rounded-lg px-4">
                Content & SEO
              </TabsTrigger>
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

        <div className="section-divider" />

        {/* AI Stack — bento */}
        <section>
          <SectionHeader
            title="AI Stack Pilihan"
            description="Kombinasi tool terbaik per kebutuhan dengan estimasi biaya"
            href="/stack"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredStacks.map((stack, i) => (
              <Link
                key={stack.slug}
                href={`/stack/${stack.slug}`}
                className={`premium-surface gradient-border group block overflow-hidden rounded-xl p-5 ${
                  i === 0 ? "sm:col-span-2 lg:row-span-1" : ""
                }`}
              >
                <div className={i === 0 ? "md:flex md:items-center md:justify-between md:gap-6" : ""}>
                  <div>
                    <Badge variant="accent" className="mb-3 border border-accent/15 bg-accent/10">
                      {stack.totalMonthlyCost}
                    </Badge>
                    <h3
                      className={`font-semibold tracking-tight transition-colors group-hover:text-accent ${
                        i === 0 ? "text-xl md:text-2xl" : ""
                      }`}
                    >
                      {stack.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground leading-relaxed">
                      {stack.description}
                    </p>
                  </div>
                  <span className="mt-4 flex items-center gap-1 text-sm font-medium text-accent md:mt-0 md:shrink-0">
                    Lihat stack
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <Newsletter />
      </div>
    </div>
  );
}
