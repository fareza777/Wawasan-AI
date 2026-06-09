"use client";

import type { VerdictCriteria } from "@/types/content";
import { VERDICT_CRITERIA_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface VerdictRadarProps {
  criteria: VerdictCriteria;
  className?: string;
}

const CRITERIA_KEYS = Object.keys(VERDICT_CRITERIA_LABELS) as (keyof VerdictCriteria)[];

export function VerdictRadar({ criteria, className }: VerdictRadarProps) {
  const center = 120;
  const maxRadius = 80;
  const angleStep = (2 * Math.PI) / CRITERIA_KEYS.length;

  const points = CRITERIA_KEYS.map((key, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const value = criteria[key] / 10;
    const r = value * maxRadius;
    return {
      key,
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
      labelX: center + (maxRadius + 28) * Math.cos(angle),
      labelY: center + (maxRadius + 28) * Math.sin(angle),
      angle,
    };
  });

  const polygonPoints = points.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className={cn("w-full", className)}>
      <svg viewBox="0 0 240 240" className="mx-auto h-auto w-full max-w-[240px]" aria-hidden>
        {[0.25, 0.5, 0.75, 1].map((level) => (
          <polygon
            key={level}
            points={CRITERIA_KEYS.map((_, i) => {
              const angle = i * angleStep - Math.PI / 2;
              const r = level * maxRadius;
              return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
            }).join(" ")}
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.1}
            strokeWidth={1}
          />
        ))}

        {CRITERIA_KEYS.map((_, i) => {
          const angle = i * angleStep - Math.PI / 2;
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={center + maxRadius * Math.cos(angle)}
              y2={center + maxRadius * Math.sin(angle)}
              stroke="currentColor"
              strokeOpacity={0.1}
              strokeWidth={1}
            />
          );
        })}

        <polygon
          points={polygonPoints}
          fill="rgb(20 184 166 / 0.2)"
          stroke="rgb(20 184 166)"
          strokeWidth={2}
        />

        {points.map((p) => (
          <circle key={p.key} cx={p.x} cy={p.y} r={3} fill="rgb(20 184 166)" />
        ))}
      </svg>

      <div className="mt-4 space-y-2.5">
        {CRITERIA_KEYS.map((key) => (
          <div key={key} className="flex items-center gap-3">
            <span className="w-36 shrink-0 text-xs text-muted-foreground">
              {VERDICT_CRITERIA_LABELS[key]}
            </span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-accent transition-all"
                style={{ width: `${criteria[key] * 10}%` }}
              />
            </div>
            <span className="w-8 text-right text-xs font-medium tabular-nums">
              {criteria[key]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
