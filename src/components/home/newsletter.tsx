"use client";

import { useState } from "react";
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
    <section className="rounded-2xl border border-border bg-muted/40 p-8 md:p-10">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
          Keputusan AI Mingguan
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Verdict terbaru, repo trending, dan workflow praktis — langsung ke inbox Anda.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Input
            type="email"
            placeholder="email@anda.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1"
          />
          <Button type="submit" variant="accent">
            Berlangganan
          </Button>
        </form>
        <p className="mt-3 text-xs text-muted-foreground">
          Gratis. Tanpa spam. Placeholder monetisasi newsletter premium.
        </p>
      </div>
    </section>
  );
}
