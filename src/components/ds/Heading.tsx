import { type ComponentPropsWithoutRef, type ElementType } from "react";
import { twMerge } from "tailwind-merge";

const SIZES = {
  "display-xl": "text-display-xl",
  "display-lg": "text-display-lg",
  "display-md": "text-display-md",
  "display-sm": "text-display-sm",
} as const;

interface HeadingProps extends Omit<ComponentPropsWithoutRef<"h2">, "color"> {
  as?: ElementType;
  size?: keyof typeof SIZES;
  /** Usa a serif (Playfair) — para destaques editoriais. */
  serif?: boolean;
}

export function Heading({
  as: Tag = "h2",
  size = "display-md",
  serif = false,
  className,
  children,
  ...props
}: HeadingProps) {
  return (
    <Tag
      className={twMerge(
        "text-balance text-foreground",
        serif ? "font-serif font-normal" : "font-roobert font-medium",
        SIZES[size],
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
