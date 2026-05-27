"use client";

import { usePathname } from "next/navigation";
import { localeFromPath, localizeHref, type Lang } from "@/lib/locales";

/** Idioma ativo derivado da URL (1º segmento). */
export function useLocale(): Lang {
  return localeFromPath(usePathname() || "/");
}

/**
 * Retorna uma função que prefixa hrefs internos com o idioma atual. Externos,
 * âncoras, mailto, /admin e hrefs já prefixados passam intactos (ver
 * localizeHref). Use nos componentes de link para localizar a navegação.
 */
export function useLocalizedHref(): (href: string) => string {
  const locale = useLocale();
  return (href: string) => localizeHref(href, locale);
}
