"use client";

import { useState, type MouseEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { Button } from "./Button";

type Variant = "solid" | "outline";
type Size = "md" | "lg";

const SIZES: Record<Size, string> = {
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

interface FillButtonProps {
  children: string;
  href?: string;
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
  onClick?: () => void;
}

/**
 * Botão com preenchimento que nasce do ponto exato onde o cursor entra/sai
 * (efeito "tinta"). Suave e orgânico — nada de sweep seco.
 */
export function FillButton({
  children,
  href,
  variant = "outline",
  size = "lg",
  withArrow = true,
  className,
  onClick,
}: FillButtonProps) {
  const reduceMotion = useReducedMotion();
  const [fill, setFill] = useState({ x: 0, y: 0, d: 0, on: false });

  function update(on: boolean) {
    return (e: MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const d = 2.4 * Math.max(rect.width, rect.height);
      setFill({ x: e.clientX - rect.left, y: e.clientY - rect.top, d, on });
    };
  }

  // Acessibilidade: sem animação se o usuário prefere menos movimento.
  if (reduceMotion) {
    const shared = { variant, size, withArrow, className } as const;
    return href ? (
      <Button href={href} {...shared}>{children}</Button>
    ) : (
      <Button onClick={onClick} {...shared}>{children}</Button>
    );
  }

  const root = twMerge(
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border font-roobert font-medium tracking-tight",
    "transition-colors duration-300 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    SIZES[size],
    variant === "solid"
      ? `bg-foreground border-foreground ${fill.on ? "text-foreground" : "text-background"}`
      : `border-foreground/25 ${fill.on ? "border-foreground text-background" : "text-foreground"}`,
    className,
  );

  const inner = (
    <>
      <span
        aria-hidden
        className={`pointer-events-none absolute z-0 rounded-full ${variant === "solid" ? "bg-background" : "bg-foreground"}`}
        style={{
          left: fill.x,
          top: fill.y,
          width: fill.d,
          height: fill.d,
          transform: `translate(-50%, -50%) scale(${fill.on ? 1 : 0})`,
          transition: "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        {withArrow && (
          <ArrowUpRight
            className="h-[1.05em] w-[1.05em] transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={2}
          />
        )}
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={root} onMouseEnter={update(true)} onMouseLeave={update(false)}>
        {inner}
      </a>
    );
  }

  return (
    <button className={root} onClick={onClick} onMouseEnter={update(true)} onMouseLeave={update(false)}>
      {inner}
    </button>
  );
}
