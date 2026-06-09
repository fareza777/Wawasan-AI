import { notFound } from "next/navigation";
import { Clock } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { DetailHero } from "@/components/layout/detail-hero";
import { RelatedContent } from "@/components/shared/related-content";
import { Badge } from "@/components/ui/badge";
import { getAllArticles, getArticleBySlug } from "@/lib/data-access";
import { createContentJsonLd, createMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/shared/json-ld";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return createMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/belajar-ai/${article.slug}`,
    type: "article",
    publishedAt: article.publishedAt,
    updatedAt: article.updatedAt,
  });
}

const ARTICLE_BODY: Record<string, string[]> = {
  "apa-itu-llm": [
    "Large Language Model (LLM) adalah model AI yang dilatih pada teks dalam jumlah masif untuk memprediksi dan menghasilkan bahasa alami. Setiap tool AI populer didukung oleh LLM di belakangnya.",
    "Cara kerjanya: model menerima prompt, memproses melalui miliaran parameter, lalu menghasilkan respons token per token.",
    "Batasan: LLM bisa halusinasi, tidak punya memori permanen antar sesi, dan pengetahuan terbatas pada data training.",
    "Untuk pemula Indonesia: mulai dengan Gemini atau Claude sebelum investasi besar.",
  ],
  "prompt-engineering-dasar": [
    "Prompt engineering adalah komunikasi yang jelas dengan AI. Framework CLEAR: Context, Length, Examples, Audience, Requirements.",
    "Context menjelaskan situasi. Examples adalah teknik paling efektif untuk output konsisten.",
    "Hindari prompt terlalu pendek tanpa constraint yang jelas.",
  ],
  "rag-explained": [
    "RAG menggabungkan pencarian dokumen dengan generasi LLM dari data Anda sendiri.",
    "Perlu RAG ketika AI harus menjawab dari knowledge base perusahaan.",
    "Tidak perlu untuk tugas kreatif umum atau coding sederhana.",
  ],
  "ai-untuk-umkm-indonesia": [
    "Langkah 1: chatbot WhatsApp dengan FAQ bisnis.",
    "Langkah 2: marketing copy dengan Gemini gratis.",
    "Langkah 3: analisis penjualan dari spreadsheet.",
  ],
  "keamanan-data-ai": [
    "Jangan input data pribadi pelanggan atau rahasia dagang ke AI publik gratis.",
    "Untuk enterprise: gunakan tier dengan data processing agreement.",
  ],
  "agentic-ai-masa-depan": [
    "Agentic AI mengeksekusi tugas multi-step secara otonom.",
    "Cocok untuk tugas repetitif terstruktur dengan human oversight.",
  ],
};

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const paragraphs = ARTICLE_BODY[slug] ?? [article.excerpt, article.description];

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd data={createContentJsonLd(article)} />

      <Breadcrumbs
        items={[
          { label: "Beranda", href: "/" },
          { label: "Belajar AI", href: "/belajar-ai" },
          { label: article.title },
        ]}
      />

      <DetailHero
        category="article"
        slug={article.slug}
        title={article.title}
        description={article.excerpt}
        updatedAt={article.updatedAt}
        meta={
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {article.readTime}
          </span>
        }
        badge={<Badge variant="outline" className="capitalize">{article.difficulty}</Badge>}
      />

      <div className="prose-custom space-y-5">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-base leading-relaxed text-foreground/90">
            {p}
          </p>
        ))}
      </div>

      <p className="mt-10 border-t border-border pt-6 text-sm text-muted-foreground">
        Oleh {article.author.name}
      </p>

      <RelatedContent slugs={article.relatedContent} />
    </article>
  );
}
