"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { ArrowButton } from "./ArrowButton";

interface MagneticButtonProps {
  children: string;
  href?: string;
  size?: "md" | "lg";
  /** Intensidade da atração ao cursor (0–1). */
  strength?: number;
  className?: string;
  onClick?: () => void;
}

export function MagneticButton({
  children,
  href,
  size = "lg",
  strength = 0.35,
  className,
  onClick,
}: MagneticButtonProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);

  // Só ativa o framer-motion depois de montar: no SSR e na 1ª renderização do
  // cliente sai um <span> simples idêntico → sem mismatch de hidratação, sem flash.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const config = { stiffness: 120, damping: 14, mass: 0.18 };
  const springX = useSpring(x, config);
  const springY = useSpring(y, config);

  function handleMove(e: React.MouseEvent) {
    if (reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  const button = href ? (
    <ArrowButton href={href} variant="solid" size={size}>
      {children}
    </ArrowButton>
  ) : (
    <ArrowButton variant="solid" size={size} onClick={onClick}>
      {children}
    </ArrowButton>
  );

  if (!mounted) {
    return <span className={twMerge("inline-flex", className)}>{button}</span>;
  }

  return (
    <motion.span
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className={twMerge("inline-flex", className)}
    >
      {button}
    </motion.span>
  );
}
