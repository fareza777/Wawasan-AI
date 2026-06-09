import { notFound } from "next/navigation";
import Image from "next/image";
import { Clock } from "lucide-react";
import { RelatedContent } from "@/components/shared/related-content";
import { Badge } from "@/components/ui/badge";
import { getAllArticles, getArticleBySlug } from "@/lib/data-access";
import { createContentJsonLd, createMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/shared/json-ld";
import { formatDate } from "@/lib/utils";

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
    image: article.featuredImage,
    type: "article",
    publishedAt: article.publishedAt,
    updatedAt: article.updatedAt,
  });
}

const ARTICLE_BODY: Record<string, string[]> = {
  "apa-itu-llm": [
    "Large Language Model (LLM) adalah model AI yang dilatih pada teks dalam jumlah masif untuk memprediksi dan menghasilkan bahasa alami. Setiap tool AI populer — ChatGPT, Claude, Gemini — didukung oleh LLM di belakangnya.",
    "Cara kerjanya sederhana: model menerima prompt Anda, memprosesnya melalui miliaran parameter, lalu menghasilkan respons token per token. Yang terasa seperti 'berpikir' sebenarnya adalah prediksi statistik yang sangat canggih.",
    "Batasan penting: LLM bisa halusinasi (menghasilkan fakta palsu), tidak punya memori permanen antar sesi (kecuali fitur khusus), dan pengetahuan mereka terbatas pada data training. Selalu verifikasi output untuk keputusan penting.",
    "Untuk pemula Indonesia: mulai dengan Gemini (gratis, Bahasa Indonesia bagus) atau Claude (kualitas tinggi). Jangan langsung investasi besar sebelum memahami use case Anda.",
  ],
  "prompt-engineering-dasar": [
    "Prompt engineering bukan sihir — ini komunikasi yang jelas dengan AI. Framework CLEAR yang kami rekomendasikan: Context, Length, Examples, Audience, Requirements.",
    "Context: jelaskan siapa Anda dan situasinya. 'Saya owner UMKM kuliner di Surabaya' jauh lebih baik dari 'buatkan caption'.",
    "Length & Format: tentukan panjang dan format output. '3 paragraf, bullet points di akhir' menghasilkan output lebih konsisten.",
    "Examples: berikan 1-2 contoh output yang Anda inginkan. Ini single most effective technique untuk kualitas output.",
    "Hindari: prompt terlalu pendek, tidak ada constraint, atau mengharapkan AI menebak intent Anda.",
  ],
  "rag-explained": [
    "RAG (Retrieval-Augmented Generation) menggabungkan pencarian dokumen dengan generasi LLM. AI mencari informasi relevan dari database Anda, lalu menjawab berdasarkan sumber tersebut.",
    "Kapan perlu RAG: ketika AI harus menjawab dari data spesifik perusahaan (SOP, FAQ, katalog produk) yang tidak ada di training data model.",
    "Kapan tidak perlu: untuk tugas kreatif umum, brainstorming, atau coding — LLM standalone sudah cukup.",
    "Tool populer: Dify (no-code), Mem0 (memory layer), LangChain (developer). Untuk UMKM, mulai dengan Dify self-hosted.",
  ],
  "ai-untuk-umkm-indonesia": [
    "Langkah 1 — Customer Service: setup chatbot WhatsApp dengan FAQ bisnis Anda. Impact langsung: respon 24/7 tanpa hire staff tambahan.",
    "Langkah 2 — Marketing Copy: gunakan Gemini gratis untuk caption produk, deskripsi, dan email promo. Hemat 5-10 jam/minggu.",
    "Langkah 3 — Analisis Sederhana: upload spreadsheet penjualan ke AI, minta insight trend dan rekomendasi. Tidak perlu dashboard mahal.",
    "Budget realistis: Rp 0-300.000/bulan sudah cukup untuk ketiga langkah di atas. Lihat Stack UMKM kami untuk detail.",
  ],
  "keamanan-data-ai": [
    "Aturan emas: jangan input data pribadi pelanggan, rahasia dagang, atau informasi finansial sensitif ke AI publik gratis.",
    "Data yang aman: ide umum, draft marketing, kode open-source, pertanyaan edukatif.",
    "Data berisiko: NIK, rekening bank, data medis, kontrak rahasia, kredensial sistem.",
    "Untuk enterprise: gunakan tier enterprise (Claude Enterprise, Azure OpenAI) dengan data processing agreement. Atau self-host model open-weight.",
  ],
  "agentic-ai-masa-depan": [
    "Agentic AI adalah evolusi dari chatbot ke sistem yang bisa merencanakan, menggunakan tools, dan mengeksekusi tugas multi-step secara otonom.",
    "Contoh nyata 2026: Browser Use (kontrol browser), OpenManus (reasoning agent), Cursor (coding agent). Ini bukan demo — sudah dipakai production.",
    "Untuk bisnis: agent cocok untuk tugas repetitif terstruktur (data entry, riset awal, monitoring). Belum cocok untuk keputusan strategis atau interaksi pelanggan sensitif tanpa human oversight.",
    "Mulai dari mana: identifikasi 1 workflow repetitif di bisnis Anda, automate dengan agent sederhana, ukur ROI sebelum scale.",
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

      <div className="relative mb-8 aspect-[21/9] overflow-hidden rounded-xl bg-muted">
        <Image
          src={article.featuredImage}
          alt={article.title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Badge variant="outline" className="capitalize">{article.difficulty}</Badge>
        <span className="flex items-center gap-1 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          {article.readTime}
        </span>
      </div>

      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{article.title}</h1>
      <p className="mt-4 text-lg text-muted-foreground">{article.excerpt}</p>

      <div className="prose-custom mt-8 space-y-4">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-base leading-relaxed text-foreground/90">
            {p}
          </p>
        ))}
      </div>

      <p className="mt-8 text-sm text-muted-foreground">
        Oleh {article.author.name} · Diperbarui {formatDate(article.updatedAt)}
      </p>

      <RelatedContent slugs={article.relatedContent} />
    </article>
  );
}
