import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { Badge } from "@/components/ui/badge";
import { getAllArticles } from "@/lib/data-access";
import { createMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

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
      <SectionHeader
        title="Belajar AI"
        description="Fondasi pengetahuan untuk keputusan AI yang lebih baik"
      />
      <div className="grid gap-6 sm:grid-cols-2">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/belajar-ai/${article.slug}`}
            className="group flex gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-accent/30 hover:shadow-md sm:p-5"
          >
            <div className="relative hidden h-24 w-32 shrink-0 overflow-hidden rounded-lg bg-muted sm:block">
              <Image
                src={article.featuredImage}
                alt={article.title}
                fill
                className="object-cover"
                sizes="128px"
              />
            </div>
            <div className="flex-1">
              <div className="mb-2 flex items-center gap-2">
                <Badge variant="outline" className="capitalize">{article.difficulty}</Badge>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {article.readTime}
                </span>
              </div>
              <h2 className="font-semibold group-hover:text-accent transition-colors">
                {article.title}
              </h2>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                {article.excerpt}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                {formatDate(article.updatedAt)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
