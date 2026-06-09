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
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium">{item.title}</span>
                    <span className="text-xs text-muted-foreground line-clamp-1">
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
