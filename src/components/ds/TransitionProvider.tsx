"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { motion, useAnimationControls } from "framer-motion";

type Variant = "curtain" | "theme";

interface RunOptions {
  /** Tipo de transição: cortina padrão ou círculo de tema. */
  variant?: Variant;
  /** Ponto de origem (px na viewport) do círculo de tema. */
  origin?: { x: number; y: number };
  /** Tema de destino — define a cor do círculo. */
  toTheme?: "dark" | "light";
}

interface TransitionContextValue {
  /** Aplica uma mudança (tema, idioma…) escondida atrás de uma transição animada. */
  run: (apply: () => void, opts?: RunOptions) => void;
}

const TransitionContext = createContext<TransitionContextValue | null>(null);

// Ease "expo" suave — encorpado, desacelera no fim.
const EASE = [0.76, 0, 0.24, 1] as const;
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const BG = { dark: "#090909", light: "#FBFAF7" } as const;
const FG = { dark: "#F4F3EE", light: "#111110" } as const;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function TransitionProvider({ children }: { children: ReactNode }) {
  const curtain = useAnimationControls();
  const circle = useAnimationControls();
  const themeIcon = useAnimationControls();
  const busy = useRef(false);

  const [circleColor, setCircleColor] = useState<string>(BG.dark);
  const [iconTheme, setIconTheme] = useState<"dark" | "light">("dark");
  const [iconAt, setIconAt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const run = useCallback(
    (apply: () => void, opts?: RunOptions) => {
      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReduced || busy.current) {
        apply();
        return;
      }

      busy.current = true;
      const variant = opts?.variant ?? "curtain";

      void (async () => {
        if (variant === "theme") {
          // Círculo da cor do NOVO tema floresce a partir do botão e cobre a tela.
          const w = window.innerWidth;
          const h = window.innerHeight;
          const ox = opts?.origin?.x ?? w - 40;
          const oy = opts?.origin?.y ?? 40;
          const r = Math.max(
            Math.hypot(ox, oy),
            Math.hypot(w - ox, oy),
            Math.hypot(ox, h - oy),
            Math.hypot(w - ox, h - oy),
          );

          const to = opts?.toTheme ?? "dark";
          setCircleColor(BG[to]);
          setIconTheme(to);
          setIconAt({ x: ox, y: oy });
          circle.set({ opacity: 1, clipPath: `circle(0px at ${ox}px ${oy}px)` });
          themeIcon.set({ opacity: 0, scale: 0.3 });
          await circle.start({
            clipPath: `circle(${Math.ceil(r)}px at ${ox}px ${oy}px)`,
            transition: { duration: 0.55, ease: EASE_OUT },
          });
          apply(); // troca o tema escondida atrás do círculo (cor já igual ao novo bg)
          // O ícone do novo tema dá um "pop" no ponto de origem.
          void themeIcon.start({
            opacity: [0, 1, 1, 0],
            scale: [0.3, 1, 1, 0.7],
            transition: { duration: 0.6, ease: EASE_OUT, times: [0, 0.3, 0.7, 1] },
          });
          await sleep(260);
          await circle.start({ opacity: 0, transition: { duration: 0.45, ease: "easeOut" } });
          circle.set({ clipPath: "circle(0px at 50% 50%)" });
        } else {
          // Cortina vertical padrão.
          await curtain.start({ y: "0%", transition: { duration: 0.5, ease: EASE } });
          apply();
          await sleep(130);
          await curtain.start({ y: "-100%", transition: { duration: 0.55, ease: EASE } });
          curtain.set({ y: "100%" });
        }
        busy.current = false;
      })();
    },
    [curtain, circle, themeIcon],
  );

  return (
    <TransitionContext.Provider value={{ run }}>
      {children}

      {/* Círculo de tema — floresce do botão e inunda a tela com a nova cor */}
      <motion.div
        aria-hidden
        initial={{ clipPath: "circle(0px at 50% 50%)" }}
        animate={circle}
        style={{ backgroundColor: circleColor }}
        className="pointer-events-none fixed inset-0 z-[100]"
      />

      {/* Ícone do novo tema (sol/lua) com "pop" no ponto de origem do clique */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.3 }}
        animate={themeIcon}
        style={{ left: iconAt.x, top: iconAt.y, color: FG[iconTheme] }}
        className="pointer-events-none fixed z-[101] -translate-x-1/2 -translate-y-1/2"
      >
        {iconTheme === "dark" ? <MoonGlyph /> : <SunGlyph />}
      </motion.div>

      {/* Cortina vertical padrão (fallback) */}
      <motion.div
        aria-hidden
        initial={{ y: "100%" }}
        animate={curtain}
        className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a]"
      >
        <span className="font-roobert text-3xl font-semibold uppercase tracking-tight text-white md:text-4xl">
          <span className="text-white/35">&lt;</span>
          LS
          <span className="text-white/35">/&gt;</span>
        </span>
      </motion.div>
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx) {
    throw new Error("useTransition deve ser usado dentro de <TransitionProvider>");
  }
  return ctx;
}

function SunGlyph() {
  return (
    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="5" fill="currentColor" stroke="none" />
      <g>
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </g>
    </svg>
  );
}

function MoonGlyph() {
  return (
    <svg width="56" height="56" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}