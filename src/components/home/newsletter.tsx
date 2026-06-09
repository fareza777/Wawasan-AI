"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
    alert("Terima kasih! Newsletter placeholder — integrasi email service coming soon.");
  };

  return (
    <section className="newsletter-premium relative overflow-hidden rounded-2xl p-8 md:p-12">
      <div className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
      <div className="relative mx-auto max-w-xl text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15">
          <Mail className="h-5 w-5 text-accent" />
        </div>
        <h2 className="text-2xl font-semibold tracking-tighter md:text-3xl">
          Keputusan AI Mingguan
        </h2>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          Verdict terbaru, repo trending, dan workflow praktis — langsung ke inbox Anda.
        </p>
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Input
            type="email"
            placeholder="email@anda.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-12 flex-1 border-border/60 bg-background/80"
          />
          <Button type="submit" variant="accent" size="lg" className="shrink-0">
            Berlangganan
          </Button>
        </form>
        <p className="mt-4 text-xs text-muted-foreground">
          Gratis. Tanpa spam. Batal kapan saja.
        </p>
      </div>
    </section>
  );
}
