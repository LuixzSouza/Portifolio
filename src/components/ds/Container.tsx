import { type ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

export function Container({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={twMerge("mx-auto w-full max-w-grid px-6 md:px-10 lg:px-16", className)}
      {...props}
    >
      {children}
    </div>
  );
}
