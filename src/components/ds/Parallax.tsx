"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { twMerge } from "tailwind-merge";

interface ParallaxProps {
  children: ReactNode;
  /** Deslocamento total em px ao longo da janela de scroll. Maior = mais movimento. */
  distance?: number;
  /** Inverte a direção (move para baixo conforme rola). */
  reverse?: boolean;
  className?: string;
}

/**
 * Move o conteúdo verticalmente conforme ele cruza a viewport (parallax ligado
 * ao scroll). O elemento externo (ref) não recebe transform, então a medição de
 * scroll fica estável; só o interno se desloca. Respeita prefers-reduced-motion.
 */
export function Parallax({ children, distance = 80, reverse = false, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const from = reverse ? -distance : distance;
  const y = useTransform(scrollYProgress, [0, 1], [from, -from]);

  return (
    <div ref={ref} className={twMerge("relative", className)}>
      <motion.div style={reduced ? undefined : { y }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}
