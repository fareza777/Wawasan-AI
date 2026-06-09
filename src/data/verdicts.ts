import type { VerdictContent } from "@/types/content";

export const verdicts: VerdictContent[] = [
  {
    slug: "claude-4",
    title: "Claude 4",
    description:
      "Model frontier Anthropic dengan reasoning kuat, konteks panjang, dan keamanan tinggi untuk tugas analitis dan coding.",
    category: "verdict",
    tags: ["llm", "anthropic", "coding", "reasoning"],
    featuredImage:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    publishedAt: "2025-11-01T08:00:00Z",
    updatedAt: "2026-05-25T10:00:00Z",
    author: { name: "Tim Wawasan", role: "AI Analyst" },
    relatedContent: ["cursor", "gemini-2-5", "mem0"],
    featured: true,
    difficulty: "menengah",
    verdictScore: 9.2,
    criteria: {
      kemudahanPenggunaan: 8.5,
      biaya: 7.0,
      manfaatPraktis: 9.5,
      stabilitas: 9.5,
      cocokUntukPemula: 7.5,
    },
    conclusion: {
      cocokUntuk: [
        "Developer dan analis yang butuh reasoning mendalam",
        "Tim yang menulis dokumen teknis panjang",
        "Proyek coding kompleks dengan konteks besar",
      ],
      tidakCocokUntuk: [
        "Budget sangat terbatas tanpa ROI jelas",
        "Kebutuhan real-time streaming murah skala besar",
        "Pengguna yang hanya butuh chat sederhana",
      ],
      alternatif: ["Gemini 2.5 Pro", "DeepSeek V3", "GPT-4o"],
      rekomendasiAkhir:
        "Pilihan premium terbaik untuk produktivitas profesional. Investasi biaya sebanding dengan kualitas output, terutama untuk coding dan analisis dokumen.",
    },
    pricing: "Mulai $20/bulan (Claude Pro)",
  },
  {
    slug: "gemini-2-5",
    title: "Gemini 2.5 Pro",
    description:
      "Model Google dengan multimodal kuat, konteks 1M token, dan integrasi ekosistem Google Workspace.",
    category: "verdict",
    tags: ["llm", "google", "multimodal", "long-context"],
    featuredImage:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
    publishedAt: "2025-12-15T08:00:00Z",
    updatedAt: "2026-05-24T10:00:00Z",
    author: { name: "Tim Wawasan", role: "AI Analyst" },
    relatedContent: ["claude-4", "vimax", "stack-content-creator"],
    featured: true,
    difficulty: "pemula",
    verdictScore: 8.8,
    criteria: {
      kemudahanPenggunaan: 9.0,
      biaya: 8.5,
      manfaatPraktis: 9.0,
      stabilitas: 8.5,
      cocokUntukPemula: 9.0,
    },
    conclusion: {
      cocokUntuk: [
        "Pengguna Google Workspace yang ingin AI terintegrasi",
        "Analisis dokumen dan video dalam satu platform",
        "Tim yang butuh konteks sangat panjang",
      ],
      tidakCocokUntuk: [
        "Workflow coding intensif (lebih baik Claude/Cursor)",
        "Kebutuhan privasi data ketat di luar ekosistem Google",
      ],
      alternatif: ["Claude 4", "GPT-4o", "Qwen 2.5"],
      rekomendasiAkhir:
        "Pilihan seimbang untuk pengguna umum dan bisnis kecil. Gratis tier cukup untuk eksplorasi, Pro worth it untuk produktivitas harian.",
    },
    pricing: "Gratis / $19.99/bulan (AI Pro)",
  },
  {
    slug: "deepseek-v3",
    title: "DeepSeek V3",
    description:
      "Model open-weight dengan performa kompetitif, biaya API sangat rendah, dan kemampuan coding yang mengesankan.",
    category: "verdict",
    tags: ["llm", "open-weight", "coding", "murah"],
    featuredImage:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80",
    publishedAt: "2026-01-20T08:00:00Z",
    updatedAt: "2026-05-23T10:00:00Z",
    author: { name: "Tim Wawasan", role: "AI Analyst" },
    relatedContent: ["qwen-2-5", "openmanus", "stack-murah"],
    featured: true,
    difficulty: "menengah",
    verdictScore: 8.5,
    criteria: {
      kemudahanPenggunaan: 7.5,
      biaya: 9.8,
      manfaatPraktis: 8.5,
      stabilitas: 8.0,
      cocokUntukPemula: 6.5,
    },
    conclusion: {
      cocokUntuk: [
        "Developer yang self-host atau pakai API murah",
        "Startup dengan budget API ketat",
        "Proyek coding dan reasoning berat volume tinggi",
      ],
      tidakCocokUntuk: [
        "Pengguna non-teknis yang butuh UI siap pakai",
        "Enterprise dengan compliance data ketat",
        "Kebutuhan dukungan customer resmi",
      ],
      alternatif: ["Qwen 2.5", "Claude 4", "Llama 3.3"],
      rekomendasiAkhir:
        "Value terbaik per rupiah untuk developer. Wajib dicoba jika Anda bangun produk AI sendiri dan sensitif terhadap biaya API.",
    },
    pricing: "API mulai $0.14/1M input tokens",
  },
  {
    slug: "qwen-2-5",
    title: "Qwen 2.5",
    description:
      "Model Alibaba dengan dukungan multilingual kuat termasuk Bahasa Indonesia, open-weight, dan performa solid.",
    category: "verdict",
    tags: ["llm", "multilingual", "open-weight", "indonesia"],
    featuredImage:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
    publishedAt: "2026-02-01T08:00:00Z",
    updatedAt: "2026-05-22T10:00:00Z",
    author: { name: "Tim Wawasan", role: "AI Analyst" },
    relatedContent: ["deepseek-v3", "stack-umkm"],
    featured: false,
    difficulty: "menengah",
    verdictScore: 8.0,
    criteria: {
      kemudahanPenggunaan: 7.0,
      biaya: 9.5,
      manfaatPraktis: 8.0,
      stabilitas: 8.0,
      cocokUntukPemula: 7.0,
    },
    conclusion: {
      cocokUntuk: [
        "Aplikasi berbahasa Indonesia dan Asia Tenggara",
        "Self-hosting dengan hardware terbatas",
        "Riset akademik dan eksperimen open model",
      ],
      tidakCocokUntuk: [
        "Kebutuhan reasoning frontier level",
        "Tim tanpa kapasitas deploy model sendiri",
      ],
      alternatif: ["DeepSeek V3", "Gemini 2.5", "Llama 3.3"],
      rekomendasiAkhir:
        "Pilihan terbaik untuk use case berbahasa Indonesia dengan budget minimal. Cocok untuk chatbot lokal dan UMKM.",
    },
    pricing: "Gratis (open-weight) / API kompetitif",
  },
  {
    slug: "cursor",
    title: "Cursor",
    description:
      "IDE berbasis VS Code dengan AI terintegrasi untuk coding, refactoring, dan debugging dalam satu workflow.",
    category: "verdict",
    tags: ["ide", "coding", "productivity", "developer"],
    featuredImage:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
    publishedAt: "2025-10-01T08:00:00Z",
    updatedAt: "2026-05-25T10:00:00Z",
    author: { name: "Tim Wawasan", role: "Developer Advocate" },
    relatedContent: ["claude-4", "stack-ai-builder"],
    featured: true,
    difficulty: "pemula",
    verdictScore: 9.0,
    criteria: {
      kemudahanPenggunaan: 9.0,
      biaya: 7.5,
      manfaatPraktis: 9.5,
      stabilitas: 8.5,
      cocokUntukPemula: 8.5,
    },
    conclusion: {
      cocokUntuk: [
        "Developer solo dan tim kecil",
        "Proyek dengan codebase existing",
        "Siapa pun yang sudah familiar VS Code",
      ],
      tidakCocokUntuk: [
        "Non-developer tanpa kebutuhan coding",
        "Tim dengan policy IDE ketat (JetBrains only)",
        "Budget nol — free tier terbatas",
      ],
      alternatif: ["GitHub Copilot", "Windsurf", "Claude Code"],
      rekomendasiAkhir:
        "Must-have untuk developer di 2026. ROI langsung terasa dari hari pertama, terutama dengan model Claude/GPT di belakangnya.",
    },
    pricing: "Gratis / $20/bulan (Pro)",
  },
  {
    slug: "minimax",
    title: "MiniMax",
    description:
      "Platform AI China dengan model teks, suara, dan video. Kompetitif di generasi konten multimedia.",
    category: "verdict",
    tags: ["multimodal", "video", "voice", "china"],
    featuredImage:
      "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&q=80",
    publishedAt: "2026-03-01T08:00:00Z",
    updatedAt: "2026-05-20T10:00:00Z",
    author: { name: "Tim Wawasan", role: "Content Analyst" },
    relatedContent: ["vimax", "stack-content-creator"],
    featured: false,
    difficulty: "menengah",
    verdictScore: 7.5,
    criteria: {
      kemudahanPenggunaan: 7.0,
      biaya: 8.5,
      manfaatPraktis: 7.5,
      stabilitas: 7.0,
      cocokUntukPemula: 6.5,
    },
    conclusion: {
      cocokUntuk: [
        "Content creator butuh generasi video/suara",
        "Eksperimen multimedia AI dengan budget terbatas",
      ],
      tidakCocokUntuk: [
        "Enterprise dengan data sovereignty Eropa/AS",
        "Workflow coding dan reasoning utama",
        "Butuh dokumentasi dan komunitas bahasa Inggris besar",
      ],
      alternatif: ["Runway", "ElevenLabs", "Gemini 2.5"],
      rekomendasiAkhir:
        "Worth exploring untuk creator multimedia, tapi belum jadi default choice. Pantau perkembangan model video mereka.",
    },
    pricing: "Freemium / pay-per-use",
  },
];
