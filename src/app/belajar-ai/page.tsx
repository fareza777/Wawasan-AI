import { PageHeader } from "@/components/layout/page-header";
import { ArticleCard } from "@/components/shared/article-card";
import { getAllArticles } from "@/lib/data-access";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Belajar AI",
  description:
    "Panduan AI dalam Bahasa Indonesia — dari dasar LLM hingga implementasi bisnis.",
  path: "/belajar-ai",
});

export default function BelajarAiListPage() {
  const articles = getAllArticles();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        title="Belajar AI"
        description="Fondasi pengetahuan untuk keputusan yang lebih baik. Baca dulu, putuskan kemudian."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}
