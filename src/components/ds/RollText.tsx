import { twMerge } from "tailwind-merge";

/**
 * Texto com "roll" vertical no hover do grupo pai (use dentro de algo com `group`).
 * A cópia de baixo sobe enquanto a de cima sai — efeito de estúdio premium.
 */
export function RollText({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const ease = "ease-[cubic-bezier(0.65,0,0.35,1)]";
  return (
    <span className={twMerge("relative inline-block overflow-hidden leading-[1.15]", className)}>
      <span
        className={`block transition-transform duration-[550ms] ${ease} group-hover:-translate-y-full`}
      >
        {children}
      </span>
      <span
        aria-hidden
        className={`absolute left-0 top-0 block translate-y-full transition-transform duration-[550ms] ${ease} group-hover:translate-y-0`}
      >
        {children}
      </span>
    </span>
  );
}
