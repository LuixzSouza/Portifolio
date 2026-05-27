import type { LocalizedText } from "@/lib/i18n";

/** Converte um LocalizedText (string ou mapa por idioma) num par editável {pt,en}. */
export function pair(v?: LocalizedText): { pt: string; en: string } {
  if (!v) return { pt: "", en: "" };
  if (typeof v === "string") return { pt: v, en: v };
  return { pt: v.pt ?? "", en: v.en ?? "" };
}
