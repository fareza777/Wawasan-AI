import Link from "next/link";
import { SearchTrigger } from "@/components/search/search-trigger";
import { Navbar } from "@/components/layout/navbar";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SITE_CONFIG } from "@/lib/constants";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">W</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-sm font-semibold tracking-tight">{SITE_CONFIG.name}</span>
            </div>
          </Link>
          <Navbar className="hidden md:flex" />
        </div>

        <div className="flex items-center gap-2">
          <SearchTrigger />
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
