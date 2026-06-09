"use client";

import { useMemo, useState } from "react";
import { AiVerdictCard } from "@/components/ai-verdict/ai-verdict-card";
import { FilterChips } from "@/components/shared/filter-chips";
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((verdict) => (
          <AiVerdictCard key={verdict.slug} verdict={verdict} variant="compact" />
        ))}
      </div>
    </>
  );
}
