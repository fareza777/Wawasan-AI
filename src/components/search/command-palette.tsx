"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { searchContent } from "@/lib/data-access";
import { Badge } from "@/components/ui/badge";
import { getCategoryLabel } from "@/lib/utils";
import type { SearchResult } from "@/types/content";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    setResults(searchContent(query));
  }, [query]);

  const handleSelect = useCallback(
    (href: string) => {
      setOpen(false);
      setQuery("");
      router.push(href);
    },
    [router]
  );

  const grouped = results.reduce<Record<string, SearchResult[]>>((acc, item) => {
    const label = getCategoryLabel(item.category);
    if (!acc[label]) acc[label] = [];
    acc[label].push(item);
    return acc;
  }, {});

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <div className="flex items-center justify-between border-b border-border/80 bg-muted/20 px-4 py-2.5">
        <span className="text-xs text-muted-foreground">
          Pencarian cepat
        </span>
        <kbd className="hidden rounded border border-border bg-card px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline">
          Ctrl+K
        </kbd>
      </div>
      <CommandInput
        placeholder="Cari tool, repo, workflow, stack..."
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>Tidak ada hasil untuk &quot;{query}&quot;</CommandEmpty>
        {Object.entries(grouped).map(([group, items], index) => (
          <div key={group}>
            {index > 0 && <CommandSeparator />}
            <CommandGroup heading={group}>
              {items.map((item) => (
                <CommandItem
                  key={`${item.category}-${item.slug}`}
                  value={`${item.title} ${item.description}`}
                  onSelect={() => handleSelect(item.href)}
                >
                  <Badge variant="outline" className="shrink-0 text-[9px] uppercase tracking-wide">
                    {getCategoryLabel(item.category).split(" ")[0]}
                  </Badge>
                  <div className="min-w-0 flex flex-col gap-0.5">
                    <span className="truncate font-medium">{item.title}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {item.description}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </div>
        ))}
      </CommandList>
    </CommandDialog>
  );
}
