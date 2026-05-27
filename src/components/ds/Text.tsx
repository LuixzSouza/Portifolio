import { type ComponentPropsWithoutRef, type ElementType } from "react";
import { twMerge } from "tailwind-merge";

const SIZES = {
  lg: "text-lg md:text-xl leading-relaxed",
  base: "text-base md:text-lg leading-relaxed",
  sm: "text-sm md:text-base leading-relaxed",
} as const;

interface TextProps extends Omit<ComponentPropsWithoutRef<"p">, "color"> {
  as?: ElementType;
  size?: keyof typeof SIZES;
  tone?: "default" | "muted";
  /** Limita a largura para boa legibilidade (~65 caracteres). */
  measure?: boolean;
}

export function Text({
  as: Tag = "p",
  size = "base",
  tone = "default",
  measure = false,
  className,
  children,
  ...props
}: TextProps) {
  return (
    <Tag
      className={twMerge(
        "font-roobert",
        SIZES[size],
        tone === "muted" ? "text-muted" : "text-foreground",
        measure && "max-w-[65ch]",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
