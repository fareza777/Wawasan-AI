"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SearchTrigger() {
  const openPalette = () => {
    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true })
    );
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={openPalette}
      className="hidden h-9 gap-2 border-border/60 bg-card/50 text-muted-foreground backdrop-blur-sm hover:border-accent/30 hover:bg-accent/5 sm:flex"
    >
      <Search className="h-4 w-4" />
      <span className="text-sm">Cari</span>
      <kbd className="pointer-events-none ml-1 hidden rounded border border-border bg-muted/80 px-1.5 py-0.5 font-mono text-[10px] lg:inline-block">
        Ctrl+K
      </kbd>
    </Button>
  );
}
