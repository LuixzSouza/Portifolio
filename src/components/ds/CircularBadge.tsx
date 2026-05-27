"use client";

import { useId } from "react";
import { ArrowUpRight } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface CircularBadgeProps {
  /** Texto que circula a borda (será repetido p/ preencher o círculo). */
  text: string;
  className?: string;
}

/**
 * Selo circular estilo estúdio: texto correndo na borda + seta no centro.
 * O giro é gated por `motion-safe` → sob prefers-reduced-motion fica parado
 * (mas legível). Cores via tokens (background/foreground) → ok em dark e light.
 */
export function CircularBadge({ text, className }: CircularBadgeProps) {
  const uid = useId().replace(/[:]/g, "");
  const pathId = `badge-path-${uid}`;

  return (
    <div
      className={twMerge(
        "relative grid aspect-square place-items-center rounded-full border border-foreground/15 bg-background/70 backdrop-blur-md",
        className,
      )}
    >
      <svg
        viewBox="0 0 100 100"
        className="h-full w-full motion-safe:animate-[spin_16s_linear_infinite]"
        aria-hidden
      >
        <defs>
          <path id={pathId} fill="none" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
        </defs>
        <text
          className="fill-foreground font-roobert"
          style={{ fontSize: "8.2px", letterSpacing: "0.12em", fontWeight: 500 }}
        >
          <textPath href={`#${pathId}`} startOffset="0">
            {text}
            {text}
          </textPath>
        </text>
      </svg>
      <span className="absolute grid h-2/5 w-2/5 place-items-center rounded-full bg-foreground text-background">
        <ArrowUpRight className="h-1/2 w-1/2" strokeWidth={2} aria-hidden />
      </span>
    </div>
  );
}
