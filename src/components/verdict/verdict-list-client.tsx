"use client";

import { useMemo, useState } from "react";
import { SearchX } from "lucide-react";
import { AiVerdictCard } from "@/components/ai-verdict/ai-verdict-card";
import { FilterChips } from "@/components/shared/filter-chips";
import { Button } from "@/components/ui/button";
import type { VerdictContent } from "@/types/content";

const FILTERS = [
  { id: "all", label: "Semua" },
  { id: "pemula", label: "Pemula" },
  { id: "menengah", label: "Menengah" },
  { id: "coding", label: "Coding" },
  { id: "murah", label: "Murah" },
];

interface VerdictListClientProps {
  verdicts: VerdictContent[];
}

export function VerdictListClient({ verdicts }: VerdictListClientProps) {
  const [active, setActive] = useState("all");

  const filtered = useMemo(() => {
    if (active === "all") return verdicts;
    if (active === "pemula" || active === "menengah")
      return verdicts.filter((v) => v.difficulty === active);
    if (active === "coding")
      return verdicts.filter((v) => v.tags.some((t) => ["coding", "ide", "developer"].includes(t)));
    if (active === "murah")
      return verdicts.filter((v) => v.criteria.biaya >= 8);
    return verdicts;
  }, [active, verdicts]);

  return (
    <>
      <FilterChips options={FILTERS} active={active} onChange={setActive} className="mb-8" />
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-border bg-card/50 px-6 py-14 text-center">
          <SearchX className="mb-3 h-8 w-8 text-muted-foreground" strokeWidth={1.5} />
          <p className="font-medium">Tidak ada verdict untuk filter ini</p>
          <p className="mt-1 text-sm text-muted-foreground">Coba kategori lain atau lihat semua verdict.</p>
          <Button variant="outline" className="mt-4" onClick={() => setActive("all")}>
            Tampilkan semua
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((verdict) => (
            <AiVerdictCard key={verdict.slug} verdict={verdict} variant="compact" />
          ))}
        </div>
      )}
    </>
  );
}
