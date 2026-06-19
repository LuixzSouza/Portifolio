"use client";

import { useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { BrandMark } from "./BrandMark";

// Mesma curva "expo" das outras transições do site.
const EASE = [0.76, 0, 0.24, 1] as const;
const COUNT_MS = 1400;

/**
 * Intro de carregamento (estilo Exoape): marca + contador 0→100 e a cortina
 * sobe revelando o site. Renderiza visível já no SSR para cobrir o conteúdo
 * durante a hidratação (sem flash). Toca uma vez por sessão; pula com
 * prefers-reduced-motion.
 */
export function Preloader() {
  const controls = useAnimationControls();
  const [hidden, setHidden] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("intro-seen");
    if (reduced || seen) {
      setHidden(true);
      return;
    }
    sessionStorage.setItem("intro-seen", "1");
    document.body.style.overflow = "hidden";

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / COUNT_MS);
      setCount(Math.round(p * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        controls
          .start({ y: "-100%", transition: { duration: 0.8, ease: EASE } })
          .then(() => {
            document.body.style.overflow = "";
            setHidden(true);
          });
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, [controls]);

  if (hidden) return null;

  return (
    <motion.div
      aria-hidden
      initial={{ y: 0 }}
      animate={controls}
      className="fixed inset-0 z-[110] flex flex-col items-center justify-center gap-7 bg-[#0a0a0a] text-white"
    >
      <motion.div
        initial={{ y: 18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <BrandMark className="text-5xl md:text-7xl" />
      </motion.div>

      {/* Linha fina de progresso sob a marca — sem contador. */}
      <div className="h-px w-40 overflow-hidden bg-white/15 md:w-56">
        <div
          className="h-full bg-white"
          style={{ width: `${count}%`, transition: "width 80ms linear" }}
        />
      </div>
    </motion.div>
  );
}
