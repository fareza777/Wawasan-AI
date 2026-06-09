"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
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
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
            strokeWidth={1.5}
          />
          <Input
            type="search"
            placeholder="Tool AI mana yang harus saya gunakan?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 200)}
            className="h-14 border-0 bg-transparent pl-12 pr-24 text-base shadow-none focus-visible:ring-0"
          />
          <kbd className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 rounded border border-border bg-muted/80 px-2 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline-block">
            Ctrl+K
          </kbd>
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
