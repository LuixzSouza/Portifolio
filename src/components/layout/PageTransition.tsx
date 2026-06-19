"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useAnimationControls } from "framer-motion";
import { BrandMark } from "./BrandMark";
import { useLanguage } from "@/components/ds/LanguageProvider";
import type { Lang } from "@/components/ds/LanguageProvider";

const EASE = [0.76, 0, 0.24, 1] as const; // expo — encorpado, desacelera no fim
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/**
 * Espera a navegação commitar de fato: a URL do navegador só muda para `dest`
 * quando o Next já carregou o chunk da rota e renderizou. Em dev, o chunk
 * compila sob demanda (pode levar segundos) — por isso esperamos a URL bater em
 * vez de um timeout cego, que revelaria a página antiga cedo demais. `maxMs`
 * destrava a cortina se a navegação falhar.
 */
function waitForLocation(dest: string, maxMs = 6000): Promise<void> {
  return new Promise((resolve) => {
    const start = performance.now();
    const tick = () => {
      const now = window.location.pathname + window.location.search;
      if (now === dest || performance.now() - start > maxMs) resolve();
      else requestAnimationFrame(tick);
    };
    tick();
  });
}

/** Resolve após a nova página ter pintado ao menos um frame (dois rAF). */
function nextPaint(): Promise<void> {
  return new Promise((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
  );
}

/** Nome humano do destino a partir do pathname (bilíngue). */
function destLabel(pathname: string, lang: Lang): string {
  const map: Record<string, [string, string]> = {
    "/": ["Início", "Home"],
    "/work": ["Trabalhos", "Work"],
    "/about": ["Sobre", "About"],
    "/contact": ["Contato", "Contact"],
    "/project": ["Projeto", "Project"],
    "/services": ["Serviços", "Services"],
    "/certificates": ["Certificados", "Certificates"],
    "/styleguide": ["Styleguide", "Styleguide"],
  };
  const key = Object.keys(map).find((k) => k !== "/" && pathname.startsWith(k));
  const pair = map[pathname] ?? (key ? map[key] : undefined);
  if (pair) return lang === "pt" ? pair[0] : pair[1];
  const first = pathname.split("/").filter(Boolean)[0] ?? "";
  if (first) return first.charAt(0).toUpperCase() + first.slice(1);
  return lang === "pt" ? "Página" : "Page";
}

/**
 * Transição entre páginas (estilo Exoape) em CAMADAS: duas cortinas sobem com
 * leve defasagem (sensação de profundidade) cobrindo a tela; a rota troca
 * escondida atrás; depois as cortinas continuam subindo e revelam a nova página.
 * No centro aparece o destino: nome da página + o caminho (ex.: Sobre · /about).
 *
 * Intercepta cliques no nível do documento (fase de captura) p/ não precisar
 * trocar todos os <Link>. Ignora modificadores, novo separador, âncoras, links
 * externos, downloads e arquivos (.pdf). Respeita prefers-reduced-motion.
 */
export function PageTransition() {
  const back = useAnimationControls();
  const front = useAnimationControls();
  const router = useRouter();
  const { lang } = useLanguage();

  const busy = useRef(false);
  const revealing = useRef(false);
  const [info, setInfo] = useState<{ label: string; path: string } | null>(null);

  const reveal = useCallback(async () => {
    if (revealing.current) return;
    revealing.current = true;
    window.scrollTo(0, 0);
    // A cortina da frente sai primeiro (revela a de trás), depois a de trás.
    void front.start({ y: "-100%", transition: { duration: 0.6, ease: EASE } });
    await back.start({ y: "-100%", transition: { duration: 0.6, ease: EASE, delay: 0.1 } });
    front.set({ y: "100%" });
    back.set({ y: "100%" });
    busy.current = false;
    revealing.current = false;
    setInfo(null);
  }, [front, back]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }
      const anchor = (e.target as HTMLElement | null)?.closest?.("a");
      if (!anchor) return;

      const rawHref = anchor.getAttribute("href");
      if (
        !rawHref ||
        anchor.getAttribute("target") === "_blank" ||
        anchor.hasAttribute("download") ||
        rawHref.startsWith("#") ||
        rawHref.startsWith("mailto:") ||
        rawHref.startsWith("tel:")
      ) {
        return;
      }

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return; // externo
      if (/\.[^/]+$/.test(url.pathname)) return; // arquivo (.pdf, .png…), não é rota

      const dest = url.pathname + url.search;
      const current = window.location.pathname + window.location.search;
      if (dest === current) {
        e.preventDefault();
        return;
      }

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return; // deixa o Next navegar sem cortina

      // Bloqueia a navegação nativa/Link e assume o controle.
      e.preventDefault();
      e.stopImmediatePropagation();
      if (busy.current) return;

      busy.current = true;
      setInfo({ label: destLabel(url.pathname, lang), path: url.pathname });

      void (async () => {
        // A de trás sobe primeiro; a da frente segue com defasagem → profundidade.
        void back.start({ y: "0%", transition: { duration: 0.5, ease: EASE } });
        await front.start({ y: "0%", transition: { duration: 0.5, ease: EASE, delay: 0.1 } });
        router.push(dest);
        // Só revela quando a navegação commitou (URL = dest) e a nova página
        // pintou — evita a cortina subir mostrando a página antiga.
        await waitForLocation(dest);
        await nextPaint();
        void reveal();
      })();
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [back, front, router, reveal, lang]);

  return (
    <>
      {/* Cortina de trás (mais clara) — cria a profundidade */}
      <motion.div
        aria-hidden
        initial={{ y: "100%" }}
        animate={back}
        className="pointer-events-none fixed inset-0 z-[88] bg-[#1c1c1c]"
      />

      {/* Cortina da frente (escura) — carrega a marca + destino */}
      <motion.div
        aria-hidden
        initial={{ y: "100%" }}
        animate={front}
        className="pointer-events-none fixed inset-0 z-[90] flex items-center justify-center bg-[#0a0a0a]"
      >
        <div className="flex flex-col items-center gap-6 text-white">
          <BrandMark className="text-3xl text-white md:text-4xl" />
          {info && (
            <motion.div
              key={info.path}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.5, ease: EASE_OUT }}
              className="flex flex-col items-center gap-2.5"
            >
              <span aria-hidden className="h-px w-10 bg-white/25" />
              <span className="font-serif text-3xl font-normal italic md:text-4xl">{info.label}</span>
              <span className="font-roobert text-xs uppercase tracking-[0.25em] text-white/40">
                {info.path}
              </span>
            </motion.div>
          )}
        </div>
      </motion.div>
    </>
  );
}
