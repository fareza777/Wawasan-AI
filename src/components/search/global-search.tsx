"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Sparkles } from "lucide-react";
import { searchContent } from "@/lib/data-access";
import { Input } from "@/components/ui/input";
import { getCategoryLabel } from "@/lib/utils";
import Link from "next/link";

export function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const router = useRouter();
  const results = query.length >= 2 ? searchContent(query) : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (results.length > 0) {
      router.push(results[0].href);
      setQuery("");
      setFocused(false);
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <form onSubmit={handleSubmit}>
        <div className="search-luxury relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <Input
            type="search"
            placeholder="Tool AI mana yang harus saya gunakan?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 200)}
            className="h-14 border-0 bg-transparent pl-12 pr-12 text-base shadow-none focus-visible:ring-0"
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
            <Sparkles className="h-4 w-4 text-accent/60" />
          </div>
        </div>
      </form>

      {focused && results.length > 0 && (
        <div className="absolute top-full z-50 mt-3 w-full overflow-hidden rounded-xl border border-border bg-popover/95 shadow-2xl backdrop-blur-xl">
          {results.slice(0, 6).map((item) => (
            <Link
              key={`${item.category}-${item.slug}`}
              href={item.href}
              className="flex flex-col gap-0.5 border-b border-border px-4 py-3.5 last:border-0 transition-colors hover:bg-accent/5"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{item.title}</span>
                <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent">
                  {getCategoryLabel(item.category)}
                </span>
              </div>
              <span className="text-xs text-muted-foreground line-clamp-1">
                {item.description}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
