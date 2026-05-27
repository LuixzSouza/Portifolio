"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_LOCALE,
  LOCALES,
  isLocale,
  localeMeta,
  type Lang,
} from "@/lib/locales";

export type { Lang };

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

const STORAGE_KEY = "lang";
const LanguageContext = createContext<LanguageContextValue | null>(null);

/** Detecta o idioma do navegador a partir da lista de locales suportados. */
function detectBrowserLang(): Lang {
  const prefix = navigator.language.toLowerCase().split("-")[0];
  return LOCALES.find((l) => l.code === prefix)?.code ?? DEFAULT_LOCALE;
}

function applyHtmlLang(lang: Lang) {
  const meta = localeMeta(lang);
  document.documentElement.lang = meta.html;
  document.documentElement.dir = meta.dir;
}

export function LanguageProvider({
  children,
  initialLang,
}: {
  children: ReactNode;
  /** Idioma vindo do segmento de rota (/[locale]); semeia o primeiro render. */
  initialLang?: Lang;
}) {
  const [lang, setLangState] = useState<Lang>(initialLang ?? DEFAULT_LOCALE);

  useEffect(() => {
    // Se a rota já define o idioma, ele manda; só persiste a preferência.
    if (initialLang) {
      setLangState(initialLang);
      applyHtmlLang(initialLang);
      localStorage.setItem(STORAGE_KEY, initialLang);
      return;
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    const next = stored && isLocale(stored) ? stored : detectBrowserLang();
    setLangState(next);
    applyHtmlLang(next);
  }, [initialLang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    localStorage.setItem(STORAGE_KEY, next);
    applyHtmlLang(next);
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((prev) => {
      const idx = LOCALES.findIndex((l) => l.code === prev);
      const next = LOCALES[(idx + 1) % LOCALES.length].code;
      localStorage.setItem(STORAGE_KEY, next);
      applyHtmlLang(next);
      return next;
    });
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage deve ser usado dentro de <LanguageProvider>");
  return ctx;
}