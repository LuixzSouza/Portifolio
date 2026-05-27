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

type Variant = "curtain" | "theme" | "lang";

interface RunOptions {
  /** Tipo de transição: cortina padrão, círculo de tema ou painel de idioma. */
  variant?: Variant;
  /** Ponto de origem (px na viewport) do círculo de tema. */
  origin?: { x: number; y: number };
  /** Tema de destino — define a cor do círculo. */
  toTheme?: "dark" | "light";
  /** Rótulo grande exibido na transição de idioma. */
  label?: string;
  /** Bandeira (emoji) exibida na transição de idioma. */
  flag?: string;
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
  const langPanel = useAnimationControls();
  const busy = useRef(false);

  const [circleColor, setCircleColor] = useState<string>(BG.dark);
  const [iconTheme, setIconTheme] = useState<"dark" | "light">("dark");
  const [iconAt, setIconAt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [langLabel, setLangLabel] = useState("");
  const [langFlag, setLangFlag] = useState("");

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
        } else if (variant === "lang") {
          // Painel horizontal entra da direção correta: PT da direita, EN da esquerda.
          const isPortuguese = opts?.label?.includes("Português");
          const startPosition = isPortuguese ? "100%" : "-100%";
          const exitPosition = isPortuguese ? "-100%" : "100%";

          setLangLabel(opts?.label ?? "");
          setLangFlag(opts?.flag ?? "");
          langPanel.set({ x: startPosition });
          await langPanel.start({ x: "0%", transition: { duration: 0.45, ease: EASE } });
          apply();
          await sleep(160);
          await langPanel.start({ x: exitPosition, transition: { duration: 0.55, ease: EASE } });
          langPanel.set({ x: startPosition });
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
    [curtain, circle, themeIcon, langPanel],
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

      {/* Painel de idioma — desliza na horizontal com bandeira + nome do idioma */}
      <motion.div
        aria-hidden
        initial={{ x: "100%" }}
        animate={langPanel}
        className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-background text-foreground overflow-hidden"
      >
        {/* Padrão de fundo animado */}
        <div className="absolute inset-0 opacity-5">
          <motion.div
            initial={{ x: "-100%", rotate: 0 }}
            animate={{ x: "100%", rotate: 360 }}
            transition={{ duration: 2, ease: "linear", repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground to-transparent transform scale-[2] -skew-y-12"
          />
        </div>

        {/* Elementos decorativos flutuantes */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-foreground/20"
              initial={{
                opacity: 0,
                scale: 0,
                x: `${Math.random() * 100}vw`,
                y: `${Math.random() * 100}vh`
              }}
              animate={{
                opacity: [0, 0.3, 0],
                scale: [0, 1, 0],
                x: `${Math.random() * 100}vw`,
                y: `${Math.random() * 100}vh`
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                delay: i * 0.1,
                repeat: Infinity,
                repeatDelay: 1
              }}
            />
          ))}

          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`circle-${i}`}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/10"
              style={{
                width: `${200 + i * 100}px`,
                height: `${200 + i * 100}px`
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1.2, 1.5],
                opacity: [0, 0.1, 0]
              }}
              transition={{
                duration: 1.5,
                ease: "easeOut",
                delay: 0.2 + i * 0.1
              }}
            />
          ))}
        </div>

        {/* Conteúdo principal */}
        <motion.div
          key={langLabel}
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.12 }}
          className="flex flex-col items-center gap-6 relative z-10"
        >
          {/* Bandeira com animações */}
          <motion.div className="relative">
            <motion.span
              className="text-8xl drop-shadow-lg md:text-9xl block"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
                filter: [
                  "drop-shadow(0 0 0 rgba(255,255,255,0))",
                  "drop-shadow(0 0 20px rgba(255,255,255,0.3))",
                  "drop-shadow(0 0 0 rgba(255,255,255,0))"
                ]
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 0.5
              }}
            >
              {langFlag}
            </motion.span>

            <motion.div
              initial={{ scale: 0, rotate: 0 }}
              animate={{
                scale: [0.8, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 1.2,
                ease: "easeOut",
                delay: 0.2
              }}
              className="absolute inset-0 rounded-full border-2 border-foreground/20 border-dashed"
            />
          </motion.div>

          {/* Nome do idioma */}
          <div className="relative">
            <motion.span
              className="font-serif text-5xl font-normal italic md:text-7xl block relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {langLabel?.split('').map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.4 + i * 0.05,
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
              className="absolute -bottom-2 left-0 h-0.5 w-full bg-gradient-to-r from-transparent via-foreground/40 to-transparent origin-left"
            />
          </div>

          {/* Indicador de loading */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="flex gap-1"
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-foreground/50"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </motion.div>
        </motion.div>
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