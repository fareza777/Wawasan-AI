import { getAllArticles, getAllRepos, getAllVerdicts, getAllWorkflows } from "@/lib/data-access";

export function StatsStrip() {
  const stats = [
    { label: "AI Verdict", value: getAllVerdicts().length },
    { label: "Repo AI", value: getAllRepos().length },
    { label: "Workflow", value: getAllWorkflows().length },
    { label: "Artikel", value: getAllArticles().length },
  ];

  return (
    <div className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-8 px-4 py-4 sm:gap-12 sm:px-6 lg:px-8">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold tabular-nums tracking-tight text-accent score-glow">
              {stat.value}
            </span>
            <span className="text-sm text-muted-foreground">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
