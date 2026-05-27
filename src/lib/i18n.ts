import { FALLBACK_CHAIN, type Lang } from "@/lib/locales";

/**
 * Texto que pode ser uma string simples (ainda não traduzido) ou um mapa
 * parcial por idioma. Parcial de propósito: nem todo campo terá os 13 idiomas,
 * e `pickText` resolve o fallback.
 */
export type LocalizedText = string | Partial<Record<Lang, string>>;

/** Lista de strings por idioma (ex.: parágrafos). */
export type LocalizedList = string[] | Partial<Record<Lang, string[]>>;

/** Idioma pedido → cadeia de fallback (en, pt) → primeiro disponível. */
function resolve<T>(map: Partial<Record<Lang, T>>, lang: Lang): T | undefined {
  if (map[lang] !== undefined) return map[lang];
  for (const fb of FALLBACK_CHAIN) {
    if (map[fb] !== undefined) return map[fb];
  }
  const first = Object.values(map)[0];
  return first as T | undefined;
}

export function pickText(value: LocalizedText, lang: Lang): string {
  if (typeof value === "string") return value;
  return resolve(value, lang) ?? "";
}

export function pickList(value: LocalizedList, lang: Lang): string[] {
  if (Array.isArray(value)) return value;
  return resolve(value, lang) ?? [];
}
