import Link from "next/link";
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/constants";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
                <span className="text-xs font-bold text-primary-foreground">W</span>
              </div>
              <span className="font-semibold">{SITE_CONFIG.name}</span>
            </div>
            <p className="max-w-xs text-sm text-muted-foreground leading-relaxed">
              {SITE_CONFIG.tagline}. Platform keputusan AI untuk Indonesia.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Navigasi</h3>
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Monetisasi</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Placeholder untuk affiliate links, sponsored verdicts, dan newsletter premium.
              Analytics: Google Analytics / Plausible (placeholder).
            </p>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-2 text-xs text-muted-foreground sm:flex-row">
          <p>&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. Semua hak dilindungi.</p>
          <p>Diperbarui terus untuk akurasi keputusan AI Anda.</p>
        </div>
      </div>
    </footer>
  );
}
