"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { twMerge } from "tailwind-merge";

interface ScrollRevealTextProps {
  /** Parágrafos (texto já no idioma ativo). */
  paragraphs: string[];
  className?: string;
}

const P_CLASS = "font-roobert text-lg leading-relaxed text-pretty text-foreground md:text-xl";

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  // Palavra "apagada" → "forte" conforme o scroll cruza a faixa dela.
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <motion.span style={{ opacity }} className="transition-none">
      {children}{" "}
    </motion.span>
  );
}

/**
 * Texto que "acende" conforme o scroll: cada palavra vai de apagada para a cor
 * cheia, em ordem de leitura (1ª palavra → última). CSS/scroll via framer.
 * Respeita prefers-reduced-motion → mostra o texto cheio, sem efeito de scroll.
 */
export function ScrollRevealText({ paragraphs, className }: ScrollRevealTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });

  if (reduced) {
    return (
      <div className={twMerge("flex flex-col gap-8", className)}>
        {paragraphs.map((p, i) => (
          <p key={i} className={P_CLASS}>
            {p}
          </p>
        ))}
      </div>
    );
  }

  // Índice global de cada palavra (atravessa todos os parágrafos) p/ a ativação
  // ser contínua do começo ao fim do bloco.
  let idx = 0;
  const blocks = paragraphs.map((p) =>
    p.split(" ").map((w) => ({ w, i: idx++ })),
  );
  const total = idx || 1;

  return (
    <div ref={ref} className={twMerge("flex flex-col gap-8", className)}>
      {blocks.map((words, pi) => (
        <p key={pi} className={P_CLASS}>
          {words.map(({ w, i }) => (
            <Word key={i} progress={scrollYProgress} range={[i / total, (i + 1) / total]}>
              {w}
            </Word>
          ))}
        </p>
      ))}
    </div>
  );
}
