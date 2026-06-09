import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  size?: "sm" | "md";
}

export function Logo({ className, showWordmark = false, size = "md" }: LogoProps) {
  const iconSize = size === "sm" ? 32 : 36;

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 36 36"
        fill="none"
        aria-hidden
        className="shrink-0"
      >
        <rect width="36" height="36" rx="10" className="fill-primary" />
        <path
          d="M10 24V12h4.2l3.4 7.2L21 12h4.2v12h-3.2v-7.1L18.4 24h-2.8l-3.6-7.1V24H10z"
          className="fill-primary-foreground"
        />
        <circle cx="27" cy="9" r="3" className="fill-accent" />
      </svg>
      {showWordmark && (
        <span className="text-sm font-semibold tracking-tight">Wawasan AI</span>
      )}
    </div>
  );
}
