"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLanguage, type Lang } from "./LanguageProvider";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Check } from "lucide-react";
import { LOCALES, localeFromPath } from "@/lib/locales";

// Config dos idiomas derivada de LOCALES (fonte única). Adicionar idioma lá
// reflete aqui automaticamente.
const LANGUAGES: Record<Lang, { flag: string; label: string; nativeName: string }> =
  Object.fromEntries(
    LOCALES.map((l) => [l.code, { flag: l.flag, label: l.label, nativeName: l.native }]),
  ) as Record<Lang, { flag: string; label: string; nativeName: string }>;

const OPTIONS: Lang[] = LOCALES.map((l) => l.code);

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [displayFlag, setDisplayFlag] = useState("");
  const [showCursor, setShowCursor] = useState(false);
  const [textWidth, setTextWidth] = useState(0);
  const [cursorPosition, setCursorPosition] = useState(0);
  const reduceMotion = useReducedMotion();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fecha dropdown no Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Mede o width necessário para evitar layout shift
  useEffect(() => {
    if (!measureRef.current) return;

    const measurements = OPTIONS.map(langKey => {
      const text = LANGUAGES[langKey].nativeName;
      measureRef.current!.textContent = text;
      return measureRef.current!.getBoundingClientRect().width;
    });

    // Adiciona margem extra para o cursor e espaçamento
    const maxWidth = Math.max(...measurements) + 20;
    setTextWidth(maxWidth);
  }, []);

  // Inicializa o display com o idioma atual
  useEffect(() => {
    if (!isChanging) {
      setDisplayText(LANGUAGES[lang].nativeName);
      setDisplayFlag(LANGUAGES[lang].flag);
    }
  }, [lang, isChanging]);

  // Animação typewriter criativa - simula digitação humana realística
  const typewriterTransition = async (newLang: Lang) => {
    if (reduceMotion) {
      setLang(newLang);
      return;
    }

    setIsChanging(true);
    const currentText = LANGUAGES[lang].nativeName;
    const newText = LANGUAGES[newLang].nativeName;
    const newFlag = LANGUAGES[newLang].flag;

    // Função para simular velocidade humana (variável)
    const humanDelay = () => Math.random() * 30 + 25;

    // Fase 1: Apagar o texto atual (backspace rápido)
    for (let i = currentText.length; i >= 0; i--) {
      const slicedText = currentText.slice(0, i);
      setDisplayText(slicedText);

      // Atualiza posição do cursor durante backspace
      if (measureRef.current && i > 0) {
        measureRef.current.textContent = slicedText;
        setCursorPosition(measureRef.current.getBoundingClientRect().width);
      } else {
        setCursorPosition(0);
      }

      await new Promise(resolve => setTimeout(resolve, 30));
    }

    // Fase 2: Pausa pensativa com cursor
    setShowCursor(true);
    await new Promise(resolve => setTimeout(resolve, 300));

    // Fase 3: Troca rápida da bandeira (como se fosse um "aha moment")
    setDisplayFlag(newFlag);
    await new Promise(resolve => setTimeout(resolve, 150));

    // Fase 4: Digitar o novo texto com ritmo humano
    for (let i = 1; i <= newText.length; i++) {
      const currentText = newText.slice(0, i);
      setDisplayText(currentText);

      // Atualiza posição do cursor baseada no texto atual
      if (measureRef.current) {
        measureRef.current.textContent = currentText;
        setCursorPosition(measureRef.current.getBoundingClientRect().width);
      }

      // Pausa extra em espaços (como humanos fazem)
      const isSpace = newText[i - 1] === ' ';
      await new Promise(resolve => setTimeout(resolve, isSpace ? 80 : humanDelay()));
    }

    // Fase 5: Pausa final e limpeza
    await new Promise(resolve => setTimeout(resolve, 100));
    setShowCursor(false);
    setLang(newLang);
    setIsChanging(false);
  };

  const handleLanguageChange = (newLang: Lang) => {
    if (newLang === lang || isChanging) return;

    setIsOpen(false);

    // Navega para a mesma página no novo idioma (URLs por idioma). O layout do
    // segmento destino semeia o LanguageProvider, então o conteúdo acompanha.
    const current = localeFromPath(pathname);
    const newPath = pathname.startsWith(`/${current}`)
      ? pathname.replace(`/${current}`, `/${newLang}`)
      : `/${newLang}${pathname === "/" ? "" : pathname}`;

    typewriterTransition(newLang).then(() => router.push(newPath));
  };


  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Botão principal */}
      <motion.button
        type="button"
        onClick={() => !isChanging && setIsOpen(!isOpen)}
        disabled={isChanging}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Selecionar idioma"
        className={`flex items-center gap-2 rounded-lg border border-foreground/15 bg-background px-3 py-2 text-sm font-medium text-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-foreground/20 ${
          isChanging
            ? "cursor-wait opacity-75"
            : "hover:border-foreground/30 hover:bg-surface/50 active:scale-[0.98] cursor-pointer"
        }`}
        whileTap={!reduceMotion && !isChanging ? { scale: 0.98 } : undefined}
      >
        {/* Bandeira do idioma atual com transição suave */}
        <motion.span
          key={displayFlag}
          initial={isChanging && !reduceMotion ? { scale: 0.8, opacity: 0 } : false}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="text-base leading-none"
        >
          {displayFlag}
        </motion.span>

        {/* Nome nativo com efeito typewriter - width fixo previne layout shift */}
        <div
          className="text-left flex items-center relative"
          style={{
            width: textWidth > 0 ? `${textWidth}px` : '70px',
            minWidth: '70px'
          }}
        >
          <span className="font-medium">
            {displayText}
          </span>
          {showCursor && (
            <motion.span
              initial={{ opacity: 1 }}
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                times: [0, 0.5, 0.5, 1],
                ease: "easeInOut"
              }}
              className="text-foreground font-mono text-lg absolute"
              style={{ left: `${cursorPosition + 2}px` }}
            >
              _
            </motion.span>
          )}
        </div>

        {/* Seta dropdown */}
        <motion.div
          animate={
            isChanging
              ? { rotate: 360 }
              : { rotate: isOpen ? 180 : 0 }
          }
          transition={
            isChanging
              ? { duration: 2, repeat: Infinity, ease: "linear" }
              : { duration: 0.2 }
          }
        >
          <ChevronDown className={`h-3.5 w-3.5 ${isChanging ? "text-foreground/40" : "text-muted"}`} />
        </motion.div>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && !isChanging && (
          <motion.div
            initial={!reduceMotion ? {
              opacity: 0,
              scale: 0.95,
              y: -8
            } : { opacity: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0
            }}
            exit={!reduceMotion ? {
              opacity: 0,
              scale: 0.95,
              y: -8
            } : { opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 top-full z-50 mt-2 min-w-[8rem] overflow-hidden rounded-lg border border-foreground/15 bg-background shadow-lg backdrop-blur-sm"
          >
            {OPTIONS.map((option, index) => {
              const isActive = option === lang;
              const langData = LANGUAGES[option];

              return (
                <motion.button
                  key={option}
                  type="button"
                  onClick={() => handleLanguageChange(option)}
                  initial={!reduceMotion ? {
                    opacity: 0,
                    x: -8
                  } : false}
                  animate={{
                    opacity: 1,
                    x: 0
                  }}
                  transition={{
                    duration: 0.15,
                    delay: index * 0.03
                  }}
                  className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors duration-150 ${
                    isActive
                      ? "bg-surface/80 text-foreground"
                      : "text-muted hover:bg-surface/50 hover:text-foreground"
                  }`}
                >
                  {/* Bandeira */}
                  <span className="text-base leading-none">
                    {langData.flag}
                  </span>

                  {/* Nome do idioma */}
                  <span className="flex-1 font-medium">
                    {langData.nativeName}
                  </span>

                  {/* Indicador ativo */}
                  {isActive && (
                    <motion.div
                      initial={!reduceMotion ? { scale: 0 } : false}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Check className="h-3.5 w-3.5 text-foreground" />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Elemento invisível para medir textos */}
      <span
        ref={measureRef}
        className="absolute invisible font-medium text-sm"
        style={{ top: -9999, left: -9999 }}
        aria-hidden="true"
      />
    </div>
  );
}