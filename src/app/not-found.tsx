import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <Logo className="mb-8" />
      <p className="text-7xl font-semibold tracking-tighter text-accent/80">404</p>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight">Halaman tidak ditemukan</h1>
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
        Konten mungkin dipindahkan atau belum tersedia. Gunakan pencarian untuk menemukan verdict, repo, atau workflow.
      </p>
      <div className="mt-8 flex gap-3">
        <Button asChild>
          <Link href="/">Beranda</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/verdict">AI Verdict</Link>
        </Button>
      </div>
    </div>
  );
}
