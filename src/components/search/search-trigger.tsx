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
      className="hidden h-9 gap-2 text-muted-foreground sm:flex"
    >
      <Search className="h-4 w-4" />
      <span className="text-sm">Cari...</span>
      <kbd className="pointer-events-none ml-2 hidden rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium lg:inline-block">
        Ctrl+K
      </kbd>
    </Button>
  );
}
