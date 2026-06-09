import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
      <h2 className="mt-4 text-xl font-semibold">Halaman tidak ditemukan</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Konten yang Anda cari mungkin sudah dipindahkan atau belum tersedia.
      </p>
      <Button className="mt-6" asChild>
        <Link href="/">Kembali ke Beranda</Link>
      </Button>
    </div>
  );
}
