import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/30 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Logo showWordmark className="mb-4" />
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
            <h3 className="mb-4 text-sm font-semibold tracking-tight">Tentang</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Kurasi independen tool, repo, workflow, dan stack AI untuk membantu Anda memutuskan lebih cepat.
            </p>
          </div>
        </div>

        <div className="section-divider mt-10 mb-6" />

        <div className="flex flex-col items-center justify-between gap-2 text-xs text-muted-foreground sm:flex-row">
          <p>&copy; {new Date().getFullYear()} {SITE_CONFIG.name}</p>
          <p>Konten diperbarui berkala untuk akurasi keputusan</p>
        </div>
      </div>
    </footer>
  );
}
