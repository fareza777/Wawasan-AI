import Link from "next/link";
import { GitBranch, Layers, Scale, Workflow } from "lucide-react";
import { GlobalSearch } from "@/components/search/global-search";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG } from "@/lib/constants";

const QUICK_LINKS = [
  { href: "/verdict", label: "AI Verdict", icon: Scale },
  { href: "/repo", label: "Repo AI", icon: GitBranch },
  { href: "/workflow", label: "Workflow", icon: Workflow },
  { href: "/stack", label: "AI Stack", icon: Layers },
] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border hero-mesh">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute top-1/2 -right-32 h-48 w-48 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-14 sm:px-6 sm:pt-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Badge
            variant="accent"
            className="mb-5 border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-medium tracking-wide"
          >
            Platform Keputusan AI Indonesia
          </Badge>

          <h1 className="text-4xl font-semibold tracking-tighter text-balance sm:text-5xl md:text-6xl md:leading-[1.05]">
            {SITE_CONFIG.name}
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground text-balance leading-relaxed">
            {SITE_CONFIG.tagline}. Temukan jawaban dalam 30 detik.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-2xl">
          <GlobalSearch />
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Tekan <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px]">Ctrl+K</kbd> untuk pencarian cepat
          </p>
        </div>

        <div className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-2">
          {QUICK_LINKS.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2 text-sm font-medium backdrop-blur-sm transition-all hover:border-accent/40 hover:bg-accent/5 active:scale-[0.98]"
            >
              <Icon className="h-3.5 w-3.5 text-accent transition-transform group-hover:scale-110" />
              {label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
