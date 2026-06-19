"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageProvider";

/**
 * Mascara o reflow de texto na troca de idioma com um "blink" rápido: uma
 * cortina da cor do fundo aparece e some em ~400ms, escondendo o instante em
 * que os textos trocam de tamanho/posição. Disparado pela mudança de `lang` no
 * LanguageProvider. Respeita prefers-reduced-motion (não pisca).
 */
export function LocaleFlash() {
  const { lang } = useLanguage();
  const prev = useRef(lang);
  const reduce = useReducedMotion();
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (prev.current === lang) return;
    prev.current = lang;
    if (reduce) return;
    setFlash(true);
    const t = setTimeout(() => setFlash(false), 200);
    return () => clearTimeout(t);
  }, [lang, reduce]);

  return (
    <AnimatePresence>
      {flash && (
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: "easeInOut" }}
          className="pointer-events-none fixed inset-0 z-[120] bg-background"
        />
      )}
    </AnimatePresence>
  );
}
