import { Clock, Globe2, Shield, Zap } from "lucide-react";

const VALUE_PROPS = [
  { icon: Zap, label: "Keputusan dalam 30 detik" },
  { icon: Globe2, label: "Bahasa Indonesia" },
  { icon: Shield, label: "Kurasi independen" },
  { icon: Clock, label: "Diperbarui berkala" },
] as const;

export function StatsStrip() {
  return (
    <div className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-6 px-4 py-4 sm:gap-10 sm:px-6 lg:px-8">
        {VALUE_PROPS.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.5} />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
