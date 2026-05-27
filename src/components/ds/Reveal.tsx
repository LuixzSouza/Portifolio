"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface RevealProps {
  children: ReactNode;
  /** Atraso em segundos para encadear elementos. */
  delay?: number;
  className?: string;
}

/**
 * Entrada por scroll com CSS + IntersectionObserver (sem framer-motion no SSR).
 * Saída de HTML determinística → seguro para hidratação. Respeita reduced-motion
 * via variantes `motion-safe:` (em reduced-motion o conteúdo já nasce visível).
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
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
      { rootMargin: "0px 0px -80px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={twMerge(
        "motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]",
        shown ? "opacity-100 translate-y-0" : "motion-safe:translate-y-6 motion-safe:opacity-0",
        className,
      )}
      style={shown && delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
