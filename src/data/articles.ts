import type { ArticleContent } from "@/types/content";

export const articles: ArticleContent[] = [
  {
    slug: "apa-itu-llm",
    title: "Apa Itu LLM? Panduan Dasar untuk Pemula",
    description:
      "Memahami Large Language Model dari nol: cara kerja, batasan, dan kapan harus (dan tidak harus) menggunakannya.",
    category: "article",
    tags: ["dasar", "llm", "pemula", "konsep"],
    featuredImage:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    publishedAt: "2025-10-01T08:00:00Z",
    updatedAt: "2026-05-10T10:00:00Z",
    author: { name: "Tim Wawasan", role: "Educator" },
    relatedContent: ["gemini-2-5", "stack-murah"],
    featured: true,
    difficulty: "pemula",
    readTime: "8 menit",
    excerpt:
      "LLM adalah fondasi semua tool AI modern. Artikel ini menjelaskan konsepnya tanpa jargon berlebihan.",
  },
  {
    slug: "prompt-engineering-dasar",
    title: "Prompt Engineering Dasar yang Benar-benar Berfungsi",
    description:
      "Teknik prompt yang terbukti efektif untuk hasil lebih baik — bukan tips viral yang tidak konsisten.",
    category: "article",
    tags: ["prompt", "teknik", "pemula", "praktis"],
    featuredImage:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
    publishedAt: "2025-11-15T08:00:00Z",
    updatedAt: "2026-05-15T10:00:00Z",
    author: { name: "Tim Wawasan", role: "Educator" },
    relatedContent: ["claude-4", "artikel-seo"],
    featured: true,
    difficulty: "pemula",
    readTime: "12 menit",
    excerpt:
      "Pelajari framework CLEAR untuk menulis prompt yang menghasilkan output konsisten dan actionable.",
  },
  {
    slug: "rag-explained",
    title: "RAG Dijelaskan: Kapan AI Perlu 'Ingatan' Eksternal",
    description:
      "Retrieval-Augmented Generation untuk bisnis: kapan perlu, cara kerja, dan tool yang tersedia.",
    category: "article",
    tags: ["rag", "menengah", "bisnis", "teknis"],
    featuredImage:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
    publishedAt: "2026-01-10T08:00:00Z",
    updatedAt: "2026-05-18T10:00:00Z",
    author: { name: "Tim Wawasan", role: "AI Researcher" },
    relatedContent: ["mem0", "dify", "customer-service-whatsapp"],
    featured: false,
    difficulty: "menengah",
    readTime: "15 menit",
    excerpt:
      "RAG membuat AI menjawab dari data Anda sendiri. Ini kapan worth the complexity.",
  },
  {
    slug: "ai-untuk-umkm-indonesia",
    title: "AI untuk UMKM Indonesia: Mulai dari Mana?",
    description:
      "Roadmap praktis adoptasi AI untuk usaha kecil di Indonesia tanpa budget besar atau tim IT.",
    category: "article",
    tags: ["umkm", "indonesia", "bisnis", "roadmap"],
    featuredImage:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    publishedAt: "2026-02-01T08:00:00Z",
    updatedAt: "2026-05-20T10:00:00Z",
    author: { name: "Tim Wawasan", role: "Business Analyst" },
    relatedContent: ["stack-umkm", "customer-service-whatsapp"],
    featured: true,
    difficulty: "pemula",
    readTime: "10 menit",
    excerpt:
      "Tiga langkah pertama yang paling berdampak untuk UMKM: chatbot, copywriting, dan analisis sederhana.",
  },
  {
    slug: "keamanan-data-ai",
    title: "Keamanan Data Saat Menggunakan AI",
    description:
      "Apa yang boleh dan tidak boleh Anda share ke ChatGPT, Claude, dan tool AI lainnya di lingkungan kerja.",
    category: "article",
    tags: ["keamanan", "privacy", "enterprise", "best-practice"],
    featuredImage:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
    publishedAt: "2026-03-01T08:00:00Z",
    updatedAt: "2026-05-22T10:00:00Z",
    author: { name: "Tim Wawasan", role: "Security Analyst" },
    relatedContent: ["claude-4", "stack-enterprise"],
    featured: false,
    difficulty: "menengah",
    readTime: "11 menit",
    excerpt:
      "Checklist keamanan data sebelum tim Anda adopt AI tools di lingkungan produksi.",
  },
  {
    slug: "agentic-ai-masa-depan",
    title: "Agentic AI: Apa yang Berubah di 2026",
    description:
      "Dari chatbot ke agent otonom: apa artinya bagi bisnis, developer, dan pengguna biasa.",
    category: "article",
    tags: ["agent", "trend", "2026", "masa-depan"],
    featuredImage:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
    publishedAt: "2026-04-15T08:00:00Z",
    updatedAt: "2026-05-25T10:00:00Z",
    author: { name: "Tim Wawasan", role: "AI Researcher" },
    relatedContent: ["openmanus", "browser-use", "riset-ai"],
    featured: true,
    difficulty: "menengah",
    readTime: "14 menit",
    excerpt:
      "Agent AI bukan hype lagi — ini workflow baru. Pelajari kapan siap dan kapan masih terlalu dini.",
  },
];
