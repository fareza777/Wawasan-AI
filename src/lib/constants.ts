export const SITE_CONFIG = {
  name: "Wawasan AI",
  tagline: "Memahami, Memilih, dan Menerapkan AI",
  description:
    "Platform keputusan AI untuk Indonesia. Temukan tool, repo, workflow, dan stack AI yang tepat untuk kebutuhan Anda dalam 30 detik.",
  url: "https://wawasan.ai",
  locale: "id_ID",
  primaryColor: "#0F172A",
  accentColor: "#14B8A6",
} as const;

export const NAV_ITEMS = [
  { href: "/repo", label: "Repo AI" },
  { href: "/verdict", label: "AI Verdict" },
  { href: "/workflow", label: "Workflow" },
  { href: "/stack", label: "AI Stack" },
  { href: "/belajar-ai", label: "Belajar AI" },
] as const;

export const VERDICT_CRITERIA_LABELS = {
  kemudahanPenggunaan: "Kemudahan Penggunaan",
  biaya: "Biaya",
  manfaatPraktis: "Manfaat Praktis",
  stabilitas: "Stabilitas",
  cocokUntukPemula: "Cocok untuk Pemula",
} as const;
