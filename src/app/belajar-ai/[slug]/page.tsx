import { notFound } from "next/navigation";
import { Clock } from "lucide-react";
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
    "Large Language Model (LLM) adalah model AI yang dilatih pada teks dalam jumlah masif untuk memprediksi dan menghasilkan bahasa alami. Setiap tool AI populer — ChatGPT, Claude, Gemini — didukung oleh LLM di belakangnya.",
    "Cara kerjanya sederhana: model menerima prompt Anda, memprosesnya melalui miliaran parameter, lalu menghasilkan respons token per token. Yang terasa seperti berpikir sebenarnya adalah prediksi statistik yang sangat canggih.",
    "Batasan penting: LLM bisa halusinasi, tidak punya memori permanen antar sesi, dan pengetahuan mereka terbatas pada data training. Selalu verifikasi output untuk keputusan penting.",
    "Untuk pemula Indonesia: mulai dengan Gemini (gratis, Bahasa Indonesia bagus) atau Claude (kualitas tinggi). Jangan langsung investasi besar sebelum memahami use case Anda.",
  ],
  "prompt-engineering-dasar": [
    "Prompt engineering bukan sihir — ini komunikasi yang jelas dengan AI. Framework CLEAR yang kami rekomendasikan: Context, Length, Examples, Audience, Requirements.",
    "Context: jelaskan siapa Anda dan situasinya. Audience: siapa pembaca output tersebut. Requirements: format dan constraint yang Anda butuhkan.",
    "Examples: berikan 1-2 contoh output yang Anda inginkan. Ini teknik paling efektif untuk kualitas output yang konsisten.",
    "Hindari prompt terlalu pendek tanpa constraint, atau mengharapkan AI menebak intent Anda.",
  ],
  "rag-explained": [
    "RAG (Retrieval-Augmented Generation) menggabungkan pencarian dokumen dengan generasi LLM. AI mencari informasi relevan dari database Anda, lalu menjawab berdasarkan sumber tersebut.",
    "Kapan perlu RAG: ketika AI harus menjawab dari data spesifik perusahaan yang tidak ada di training data model.",
    "Kapan tidak perlu: untuk tugas kreatif umum, brainstorming, atau coding — LLM standalone sudah cukup.",
    "Tool populer: Dify (no-code), Mem0 (memory layer). Untuk UMKM, mulai dengan Dify self-hosted.",
  ],
  "ai-untuk-umkm-indonesia": [
    "Langkah 1 — Customer Service: setup chatbot WhatsApp dengan FAQ bisnis Anda.",
    "Langkah 2 — Marketing Copy: gunakan Gemini gratis untuk caption produk dan email promo.",
    "Langkah 3 — Analisis Sederhana: upload spreadsheet penjualan ke AI, minta insight trend.",
    "Budget realistis: Rp 0-300.000/bulan sudah cukup. Lihat Stack UMKM kami untuk detail.",
  ],
  "keamanan-data-ai": [
    "Aturan emas: jangan input data pribadi pelanggan, rahasia dagang, atau informasi finansial sensitif ke AI publik gratis.",
    "Data yang aman: ide umum, draft marketing, kode open-source, pertanyaan edukatif.",
    "Data berisiko: NIK, rekening bank, data medis, kontrak rahasia, kredensial sistem.",
    "Untuk enterprise: gunakan tier enterprise dengan data processing agreement, atau self-host model open-weight.",
  ],
  "agentic-ai-masa-depan": [
    "Agentic AI adalah evolusi dari chatbot ke sistem yang bisa merencanakan, menggunakan tools, dan mengeksekusi tugas multi-step secara otonom.",
    "Contoh nyata: Browser Use, OpenManus, Cursor. Ini bukan demo — sudah dipakai di production.",
    "Untuk bisnis: agent cocok untuk tugas repetitif terstruktur. Belum cocok untuk keputusan strategis tanpa human oversight.",
    "Mulai dari mana: identifikasi 1 workflow repetitif, automate dengan agent sederhana, ukur ROI sebelum scale.",
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

      <DetailHero
        category="article"
        title={article.title}
        description={article.excerpt}
        updatedAt={article.updatedAt}
        meta={
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {article.readTime}
          </span>
        }
        badge={
          <Badge variant="outline" className="capitalize">{article.difficulty}</Badge>
        }
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
