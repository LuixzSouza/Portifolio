"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface MaskRevealProps {
  children: ReactNode;
  /** Atraso em segundos para encadear linhas. */
  delay?: number;
  className?: string;
}

/**
 * Revelação editorial (estilo exoape/moss): a linha sobe a partir de uma máscara
 * (overflow-hidden) ao entrar na viewport. CSS + IntersectionObserver (sem inline
 * style de framer no SSR) → conteúdo NUNCA nasce preso escondido: o estado oculto
 * só existe sob `motion-safe`, então em reduced-motion (ou sem JS) o texto já
 * aparece visível. O padding/-margin interno dá folga p/ descendentes e itálicos.
 */
export function MaskReveal({ children, delay = 0, className }: MaskRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span ref={ref} className={twMerge("block overflow-hidden", className)}>
      <span
        className={twMerge(
          "block pb-[0.18em] -mb-[0.18em] will-change-transform",
          "motion-safe:transition-transform motion-safe:duration-[900ms] motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]",
          shown ? "translate-y-0" : "motion-safe:translate-y-[115%]",
        )}
        style={shown && delay ? { transitionDelay: `${delay}s` } : undefined}
      >
        {children}
      </span>
    </span>
  );
}
