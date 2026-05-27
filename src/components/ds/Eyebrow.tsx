import { type ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

interface EyebrowProps extends ComponentPropsWithoutRef<"span"> {
  /** Numeração editorial opcional, ex.: "01". */
  index?: string;
}

export function Eyebrow({ index, className, children, ...props }: EyebrowProps) {
  return (
    <span
      className={twMerge(
        "inline-flex items-center gap-3 text-eyebrow font-medium uppercase text-muted",
        className,
      )}
      {...props}
    >
      {index && <span className="text-foreground/50">{index}</span>}
      <span className="h-px w-8 bg-foreground/30" aria-hidden />
      {children}
    </span>
  );
}
