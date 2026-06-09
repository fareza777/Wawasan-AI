import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { SearchTrigger } from "@/components/search/search-trigger";
import { Navbar } from "@/components/layout/navbar";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { MobileNav } from "@/components/layout/mobile-nav";

export function Header() {
  return (
    <header className="glass-nav sticky top-0 z-40 w-full">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" aria-label="Wawasan AI beranda">
            <Logo showWordmark className="hidden sm:flex" />
            <Logo className="sm:hidden" />
          </Link>
          <Navbar className="hidden md:flex" />
        </div>

        <div className="flex items-center gap-1.5">
          <SearchTrigger />
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
