"use client";

import { type ComponentPropsWithoutRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { useLocalizedHref } from "@/lib/useLocale";

// easeInOutCubic — acelera e desacelera suave (sensação "molhada", não seca).
const EASE = "ease-[cubic-bezier(0.65,0,0.35,1)]";

type Variant = "outline" | "solid";
type Size = "md" | "lg";

const SIZE: Record<Size, { pill: string; badge: string; icon: string; edge: string }> = {
  md: { pill: "h-12 pl-6 pr-1.5 gap-3 text-sm", badge: "h-9 w-9", icon: "h-4 w-4", edge: "right-1.5" },
  lg: { pill: "h-14 pl-8 pr-2 gap-4 text-base", badge: "h-10 w-10", icon: "h-5 w-5", edge: "right-2" },
};

interface BaseProps {
  children: string;
  variant?: Variant;
  size?: Size;
  className?: string;
}

type ArrowButtonProps =
  | (BaseProps & { href: string } & Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children">)
  | (BaseProps & { href?: undefined } & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">);

/**
 * Botão "fora da casinha": a seta vive num círculo à direita; no hover esse
 * círculo cresce e preenche o botão inteiro (da direita pra esquerda) enquanto
 * a seta gira. Mesma linguagem do card de projeto. CSS puro + reduced-motion.
 */
export function ArrowButton({
  variant = "outline",
  size = "lg",
  className,
  children,
  ...props
}: ArrowButtonProps) {
  const s = SIZE[size];
  const isSolid = variant === "solid";
  const loc = useLocalizedHref();

  const root = twMerge(
    // justify-between + max-w-full: se o botão for esticado (ex.: w-full), a seta
    // continua na direita (alinhada com o preenchimento) e nada vaza da tela.
    "group relative inline-flex max-w-full items-center justify-between overflow-hidden rounded-full border font-roobert font-medium tracking-tight",
    "transition-colors duration-300 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    s.pill,
    isSolid
      ? "border-foreground bg-foreground text-background"
      : "border-foreground/25 text-foreground",
    className,
  );

  const inner = (
    <>
      {/* Brilho sutil que varre o botão de tempos em tempos (pausa no hover) */}
      {isSolid && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-20 w-1/4 animate-shine bg-gradient-to-r from-transparent via-background/30 to-transparent group-hover:[animation-play-state:paused]"
        />
      )}
      {/* Círculo que cresce a partir da seta e engole o botão */}
      <span
        aria-hidden
        className={twMerge(
          "pointer-events-none absolute top-1/2 z-0 -translate-y-1/2 scale-100 rounded-full",
          s.badge,
          s.edge,
          isSolid ? "bg-background" : "bg-foreground",
          `transition-transform duration-[600ms] ${EASE} group-hover:scale-[16]`,
        )}
      />
      <span
        className={twMerge(
          "relative z-10 whitespace-nowrap transition-colors duration-300 delay-150 ease-out",
          isSolid ? "group-hover:text-foreground" : "group-hover:text-background",
        )}
      >
        {children}
      </span>
      <span
        className={twMerge(
          "relative z-10 flex items-center justify-center rounded-full",
          s.badge,
          isSolid ? "bg-background text-foreground" : "bg-foreground text-background",
        )}
      >
        <ArrowUpRight
          className={`${s.icon} transition-transform duration-500 ${EASE} group-hover:rotate-45`}
          strokeWidth={2}
        />
      </span>
    </>
  );

  if ("href" in props && props.href !== undefined) {
    const { href, ...rest } = props as ComponentPropsWithoutRef<"a">;
    return (
      <a className={root} href={loc(href ?? "")} {...rest}>
        {inner}
      </a>
    );
  }

  return (
    <button className={root} {...(props as ComponentPropsWithoutRef<"button">)}>
      {inner}
    </button>
  );
}
