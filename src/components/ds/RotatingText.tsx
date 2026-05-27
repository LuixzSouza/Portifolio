"use client";

import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface RotatingTextProps {
  words: string[];
  /** Intervalo entre trocas (ms). */
  interval?: number;
  className?: string;
}

/**
 * Cicla palavras com um slide-up suave. Hydration-safe: no SSR e na 1ª
 * renderização sai sempre a primeira palavra; o ciclo começa após montar.
 */
export function RotatingText({ words, interval = 2200, className }: RotatingTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length <= 1) return;
    const id = setInterval(() => setIndex((v) => (v + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    <span className={twMerge("relative inline-flex overflow-hidden align-bottom", className)}>
      {/* Reserva de largura: maior palavra invisível mantém o layout estável. */}
      <span aria-hidden className="invisible">
        {words.reduce((a, b) => (b.length > a.length ? b : a), "")}
      </span>
      <span key={index} aria-live="polite" className="animate-word-in absolute inset-0">
        {words[index]}
      </span>
    </span>
  );
}
