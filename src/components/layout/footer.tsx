import Link from "next/link";
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/30 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-sm">
                <span className="text-sm font-bold text-primary-foreground">W</span>
              </div>
              <span className="font-semibold tracking-tight">{SITE_CONFIG.name}</span>
            </div>
            <p className="max-w-xs text-sm text-muted-foreground leading-relaxed">
              {SITE_CONFIG.tagline}. Platform keputusan AI untuk Indonesia.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-tight">Navigasi</h3>
            <ul className="space-y-2.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-tight">Monetisasi</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Placeholder untuk affiliate links, sponsored verdicts, dan newsletter premium.
              Analytics: Google Analytics / Plausible.
            </p>
          </div>
        </div>

        <div className="section-divider mt-10 mb-6" />

        <div className="flex flex-col items-center justify-between gap-2 text-xs text-muted-foreground sm:flex-row">
          <p>&copy; {new Date().getFullYear()} {SITE_CONFIG.name}</p>
          <p>Diperbarui terus untuk akurasi keputusan AI Anda</p>
        </div>
      </div>
    </footer>
  );
}
