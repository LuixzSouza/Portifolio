"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { useTransition } from "./TransitionProvider";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const { run } = useTransition();
  const reduceMotion = useReducedMotion();

  const isDark = theme === "dark";

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();

    // Haptic feedback
    if ("vibrate" in navigator) {
      navigator.vibrate([20]);
    }

    run(toggleTheme, {
      variant: "theme",
      origin: { x: r.left + r.width / 2, y: r.top + r.height / 2 },
      toTheme: isDark ? "light" : "dark",
    });
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
      className={`relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-foreground/15 text-foreground transition-all duration-300 hover:border-foreground/30 hover:bg-surface/50 ${className}`}
    >
      <motion.svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        initial={false}
        animate={isDark ? "dark" : "light"}
      >
        {/* Moon mask */}
        <mask id="moon-mask">
          <rect x="0" y="0" width="24" height="24" fill="white" />
          <motion.circle
            r="9"
            fill="black"
            variants={{
              light: { cx: 24, cy: 0 },
              dark: { cx: 12, cy: 4 },
            }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          />
        </mask>

        {/* Sun/Moon circle */}
        <motion.circle
          cx="12"
          cy="12"
          fill="currentColor"
          mask="url(#moon-mask)"
          variants={{
            light: { r: 5 },
            dark: { r: 9 },
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        />

        {/* Sun rays */}
        <motion.g
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          variants={{
            light: { opacity: 1, scale: 1, rotate: 0 },
            dark: { opacity: 0, scale: 0.5, rotate: 90 },
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          style={{ originX: "50%", originY: "50%" }}
        >
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </motion.g>
      </motion.svg>
    </motion.button>
  );
}