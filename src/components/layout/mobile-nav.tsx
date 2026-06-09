"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Navbar } from "@/components/layout/navbar";
import { SITE_CONFIG } from "@/lib/constants";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72">
        <div className="mb-6 mt-2">
          <p className="text-sm font-semibold">{SITE_CONFIG.name}</p>
          <p className="text-xs text-muted-foreground">{SITE_CONFIG.tagline}</p>
        </div>
        <Navbar className="flex-col items-start gap-1" onNavigate={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
