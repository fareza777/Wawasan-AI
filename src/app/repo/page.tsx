import { RepoCard } from "@/components/repo/repo-card";
import { SectionHeader } from "@/components/shared/section-header";
import { getAllRepos } from "@/lib/data-access";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Repo AI",
  description:
    "Kurasi repo GitHub AI yang layak dicoba — dari agent framework hingga LLMOps platform.",
  path: "/repo",
});

export default function RepoListPage() {
  const repos = getAllRepos();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeader
        title="Repo AI"
        description="GitHub repository AI terkurasi dengan analisis praktis untuk developer Indonesia"
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {repos.map((repo) => (
          <RepoCard key={repo.slug} repo={repo} />
        ))}
      </div>
    </div>
  );
}
