import { z } from "zod";
import type { LocalizedText } from "@/lib/i18n";
import { LOCALE_CODES, type Lang } from "@/lib/locales";

/** Mapa parcial idioma→string (qualquer subconjunto dos locales suportados). */
const localizedMap = z.partialRecord(
  z.enum(LOCALE_CODES as [Lang, ...Lang[]]),
  z.string(),
);

/** Texto localizado: string simples (fallback) ou mapa parcial por idioma. */
export const localizedTextSchema = z.union([z.string(), localizedMap]);

/**
 * Par bilíngue do payload do painel. Continua {pt,en} porque o backend ainda
 * grava colunas _pt/_en (a expansão p/ N idiomas no banco é a Fase 6).
 */
export const bilingual = z.object({ pt: z.string(), en: z.string() });

/** URL opcional que também aceita string vazia (campo deixado em branco no form). */
export const optionalUrl = z.union([z.url(), z.literal("")]).optional();

/** Junta as colunas _pt/_en num LocalizedText; string simples se só um idioma existe. */
export function pickLocalized(pt: string | null, en: string | null): LocalizedText | undefined {
  if (pt && en) return { pt, en };
  return pt ?? en ?? undefined;
}
