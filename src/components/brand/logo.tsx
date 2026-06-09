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
          d="M18 10c-4.4 0-8 3.1-8 7.5 0 2.2 1 4.2 2.6 5.5-.8 1.2-1.3 2.6-1.3 4 0 3.9 3.1 7 7 7s7-3.1 7-7c0-1.4-.5-2.8-1.3-4 1.6-1.3 2.6-3.3 2.6-5.5C26 13.1 22.4 10 18 10Z"
          className="fill-primary-foreground"
          opacity={0.12}
        />
        <ellipse
          cx="18"
          cy="17.5"
          rx="5.5"
          ry="4"
          className="stroke-primary-foreground"
          strokeWidth="1.5"
          fill="none"
        />
        <circle cx="18" cy="17.5" r="2.2" className="fill-accent" />
        <path
          d="M11 12.5c2-2.5 4.5-3.5 7-3.5M25 12.5c-2-2.5-4.5-3.5-7-3.5"
          className="stroke-accent"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity={0.85}
        />
      </svg>
      {showWordmark && (
        <span className="text-sm font-semibold tracking-tight">Wawasan AI</span>
      )}
    </div>
  );
}
