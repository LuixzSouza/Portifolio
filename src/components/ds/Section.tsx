import { type ComponentPropsWithoutRef, type ElementType } from "react";
import { twMerge } from "tailwind-merge";

interface SectionProps extends ComponentPropsWithoutRef<"section"> {
  as?: ElementType;
}

export function Section({ as: Tag = "section", className, children, ...props }: SectionProps) {
  return (
    <Tag className={twMerge("py-20 md:py-28 lg:py-36", className)} {...props}>
      {children}
    </Tag>
  );
}
