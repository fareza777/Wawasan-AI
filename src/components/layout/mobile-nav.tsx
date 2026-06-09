"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Logo } from "@/components/brand/logo";
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
        <Logo showWordmark className="mb-1" />
        <p className="mb-6 text-xs text-muted-foreground">{SITE_CONFIG.tagline}</p>
        <Navbar className="flex-col items-start gap-1" onNavigate={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
