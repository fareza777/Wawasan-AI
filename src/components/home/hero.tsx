import Link from "next/link";
import { GitBranch, Layers, Scale, Workflow } from "lucide-react";
import { GlobalSearch } from "@/components/search/global-search";
import { SITE_CONFIG } from "@/lib/constants";

const QUICK_LINKS = [
  { href: "/verdict", label: "Verdict", icon: Scale },
  { href: "/repo", label: "Repo", icon: GitBranch },
  { href: "/workflow", label: "Workflow", icon: Workflow },
  { href: "/stack", label: "Stack", icon: Layers },
] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border hero-mesh animate-rise">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pt-14 pb-12 sm:px-6 sm:pt-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="heading-display text-4xl text-balance sm:text-5xl md:text-6xl">
            {SITE_CONFIG.name}
          </h1>
          <p className="text-lead mx-auto mt-4 max-w-xl text-lg text-muted-foreground text-balance">
            {SITE_CONFIG.tagline}
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-2xl">
          <GlobalSearch />
        </div>

        <div className="mx-auto mt-6 flex max-w-xl flex-wrap items-center justify-center gap-2">
          {QUICK_LINKS.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-center gap-2 rounded-full border border-border bg-card/80 px-3.5 py-1.5 text-sm font-medium backdrop-blur-sm transition-all hover:border-accent/40 hover:bg-accent/5 active:scale-[0.98]"
            >
              <Icon className="h-3.5 w-3.5 text-accent" strokeWidth={1.5} />
              {label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
