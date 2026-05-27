"use client";

import { type ComponentPropsWithoutRef } from "react";
import { ArrowRight } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { RollText } from "./RollText";
import { useLocalizedHref } from "@/lib/useLocale";

// Curva Bézier elástica para um movimento de "mola" ultra suave
const SPRING_EASE = "ease-[cubic-bezier(0.34,1.56,0.64,1)]";

interface AnimatedLinkProps extends ComponentPropsWithoutRef<"a"> {
  children: string;
  effect?: "underline" | "roll";
  withArrow?: boolean;
  /** Marca o link como o da página atual (sublinhado fixo + aria-current). */
  active?: boolean;
}

export function AnimatedLink({
  children,
  effect = "underline",
  withArrow = false,
  active = false,
  className,
  href,
  ...props
}: AnimatedLinkProps) {
  const loc = useLocalizedHref();
  return (
    <a
      aria-current={active ? "page" : undefined}
      href={href !== undefined ? loc(href) : undefined}
      className={twMerge(
        // Removi o gap-1.5 fixo e adicionei active:scale-[0.98] para o clique afundar levemente
        "group relative inline-flex w-fit items-center font-roobert font-medium text-foreground transition-transform active:scale-[0.98]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm",
        className,
      )}
      {...props}
    >
      {effect === "roll" ? (
        // Roll preserva o hover de rolagem; ativo ganha um sublinhado fixo (fora do
        // RollText, que tem overflow-hidden e cortaria o traço).
        <span className="relative inline-block">
          <RollText>{children}</RollText>
          <span
            aria-hidden
            className={`absolute -bottom-1 left-0 h-[1.5px] w-full bg-current transition-transform duration-500 ${SPRING_EASE} ${
              active ? "origin-left scale-x-100" : "origin-right scale-x-0"
            }`}
          />
        </span>
      ) : (
        <span className="relative inline-block">
          {children}
          {/* Sublinhado: aparece no hover e fica fixo quando é a página ativa */}
          <span
            aria-hidden
            className={`absolute -bottom-0.5 left-0 h-[1.5px] w-full bg-current transition-transform duration-500 ${SPRING_EASE} ${
              active
                ? "origin-left scale-x-100"
                : "origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100"
            }`}
          />
        </span>
      )}

      {/* Seta com efeito de gaveta usando CSS Grid */}
      {withArrow && (
        <div
          aria-hidden
          className={`grid transition-all duration-500 ${SPRING_EASE} ml-0 grid-cols-[0fr] opacity-0 group-hover:ml-1.5 group-hover:grid-cols-[1fr] group-hover:opacity-100`}
        >
          <div className="flex items-center overflow-hidden">
            {/* O ícone desliza da esquerda para a direita (como se saísse de dentro da palavra) */}
            <ArrowRight
              className={`h-4 w-4 -translate-x-full text-current transition-transform duration-500 ${SPRING_EASE} group-hover:translate-x-0`}
              strokeWidth={2}
            />
          </div>
        </div>
      )}
    </a>
  );
}