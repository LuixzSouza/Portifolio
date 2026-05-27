"use client";

import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { RollText } from "./RollText";
import { useLocalizedHref } from "@/lib/useLocale";

type Variant = "solid" | "outline" | "ghost" | "link";
type Size = "md" | "lg";

const SIZES: Record<Size, string> = {
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

const EASE = "ease-[cubic-bezier(0.76,0,0.24,1)]";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
  children: ReactNode;
}

type ButtonProps =
  | (BaseProps & { href: string } & Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children">)
  | (BaseProps & { href?: undefined } & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">);

export function Button({
  variant = "solid",
  size = "md",
  withArrow = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const isLink = variant === "link";
  const loc = useLocalizedHref();

  const root = twMerge(
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden font-roobert font-medium tracking-tight",
    "transition-[transform,color,background-color,border-color] duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    !isLink && "rounded-full",
    !isLink && SIZES[size],
    variant === "solid" &&
      "bg-foreground text-background motion-safe:hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-12px_rgb(var(--foreground)/0.5)]",
    variant === "outline" &&
      "border border-foreground/25 text-foreground hover:text-background hover:border-foreground",
    variant === "ghost" && "text-foreground hover:bg-foreground/[0.06]",
    isLink && "h-auto p-0 text-foreground",
    className,
  );

  const label =
    typeof children === "string" && variant !== "link" ? (
      <RollText>{children}</RollText>
    ) : (
      <span className={isLink ? "relative inline-block" : undefined}>{children}</span>
    );

  const inner = (
    <>
      {/* Sweep de preenchimento (outline): sobe de baixo invertendo o botão */}
      {variant === "outline" && (
        <span
          aria-hidden
          className={`absolute inset-0 z-0 translate-y-full bg-foreground motion-safe:transition-transform motion-safe:duration-500 ${EASE} group-hover:translate-y-0`}
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-2">
        {label}
        {withArrow && (
          <ArrowUpRight
            className="h-[1.05em] w-[1.05em] motion-safe:transition-transform motion-safe:duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={2}
          />
        )}
      </span>
      {/* Sublinhado que "varre" da esquerda (variante link) */}
      {isLink && (
        <span
          aria-hidden
          className={`absolute -bottom-0.5 left-0 z-0 h-px w-full origin-right scale-x-0 bg-current motion-safe:transition-transform motion-safe:duration-500 ${EASE} group-hover:origin-left group-hover:scale-x-100`}
        />
      )}
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
