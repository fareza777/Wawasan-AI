# Wawasan AI

Platform keputusan AI untuk Indonesia — **Memahami, Memilih, dan Menerapkan AI**.

## Fitur

- **AI Verdict** — Skor 5 kriteria + rekomendasi tegas per tool AI
- **Repo AI** — Kurasi GitHub repository AI terbaik
- **Workflow** — Template praktis (ASN, UMKM, Content, Riset)
- **AI Stack** — Kombinasi tool per kebutuhan dengan estimasi biaya
- **Belajar AI** — Panduan dasar Bahasa Indonesia
- **Global Search** + Command Palette (`Ctrl+K`)

## Tech Stack

- Next.js 15 (App Router, Server Components)
- TypeScript (strict)
- Tailwind CSS v4
- Shadcn/ui + Lucide React
- Mock data (Supabase-ready architecture)

## Development

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Struktur

```
src/
  app/           # Routes & pages
  components/    # UI components
  data/          # Mock content
  lib/           # Utils, SEO, data access
  types/         # TypeScript interfaces
```

## Lisensi

MIT
