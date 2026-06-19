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
        // overflow-hidden corta o overshoot horizontal do ease elástico (o traço
        // passa de 100% e "vazava" pra fora do texto). pb-[3px] dá o respiro pro
        // sublinhado morar DENTRO da caixa recortada (bottom-0), sem ser cortado.
        <span className="relative inline-block overflow-hidden pb-[3px]">
          {children}
          {/* Sublinhado: aparece no hover e fica fixo quando é a página ativa */}
          <span
            aria-hidden
            className={`absolute bottom-0 left-0 h-[1.5px] w-full bg-current transition-transform duration-500 ${SPRING_EASE} ${
              active
                ? "origin-left scale-x-100"
                : "origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100"
            }`}
          />
        </span>
      )}

      {/* Seta em "gaveta": a coluna do grid abre de 0fr→1fr revelando o ícone.
          O gap (ml-1.5) fica DENTRO do overflow-hidden, então abre junto com a
          seta — sem animar margin no texto (evita reflow/travada no hover). */}
      {withArrow && (
        <span
          aria-hidden
          className={`grid grid-cols-[0fr] opacity-0 transition-[grid-template-columns,opacity] duration-500 ${SPRING_EASE} group-hover:grid-cols-[1fr] group-hover:opacity-100`}
        >
          <span className="flex items-center overflow-hidden">
            <ArrowRight className="ml-1.5 h-4 w-4 text-current" strokeWidth={2} />
          </span>
        </span>
      )}
    </a>
  );
}