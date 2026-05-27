"use client";

import { type MouseEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useSpring, type MotionValue } from "framer-motion";

/** Motion values que seguem o cursor (com mola) + handler de onMouseMove. */
export function useCursorFollow() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spring = { damping: 22, stiffness: 350, mass: 0.4 };
  const x = useSpring(mouseX, spring);
  const y = useSpring(mouseY, spring);
  const follow = (e: MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };
  return { x, y, follow };
}

/**
 * Disco translúcido com blur ("Visualizar") que segue o cursor sobre os cards
 * de trabalho. Só no desktop (lg+); no toque/mobile os cards mostram o badge
 * central. Reaproveita o padrão de cursor-follow das Certificações.
 */
export function WorkCursor({
  x,
  y,
  active,
  label,
}: {
  x: MotionValue<number>;
  y: MotionValue<number>;
  active: boolean;
  label: string;
}) {
  return (
    <motion.div
      aria-hidden
      // Desloca para cima e à direita do cursor (não fica em cima do ponteiro).
      style={{ x, y, translateX: "30%", translateY: "-115%" }}
      className="pointer-events-none fixed left-0 top-0 z-40 hidden lg:block"
    >
      <motion.div
        initial={false}
        animate={{ scale: active ? 1 : 0, opacity: active ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="flex h-24 w-24 flex-col items-center justify-center gap-1 rounded-full border border-white/30 bg-white/10 text-white shadow-2xl backdrop-blur-md"
      >
        <ArrowUpRight className="h-5 w-5" strokeWidth={1.5} />
        <span className="text-xs font-medium tracking-wide">{label}</span>
      </motion.div>
    </motion.div>
  );
}
