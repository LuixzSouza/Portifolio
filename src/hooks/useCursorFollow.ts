"use client";

import { type MouseEvent } from "react";
import { useMotionValue, useSpring } from "framer-motion";

/** Mola padrão do disco que segue o cursor na seção Trabalhos. */
const DEFAULT_SPRING = { damping: 22, stiffness: 350, mass: 0.4 };

/**
 * Motion values `x`/`y` que seguem o cursor com física de mola, mais o handler
 * `follow` para o `onMouseMove` do container. Padrão compartilhado pelo disco de
 * Trabalhos ([[WorkCursor]] em FeaturedWork/WorkGrid/ProjectDetail), pelos cards
 * de Certificados e por ServicesInteractive. `spring` ajusta a sensação do
 * arrasto (default = o disco de Trabalhos).
 */
export function useCursorFollow(spring = DEFAULT_SPRING) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, spring);
  const y = useSpring(mouseY, spring);
  const follow = (e: MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };
  return { x, y, follow };
}
