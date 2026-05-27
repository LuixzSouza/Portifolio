import { z } from "zod";
import { bilingual } from "./shared";

/**
 * Textos de seção (content.php). O `valor` varia conforme `tipo`:
 *   text  -> { pt, en }
 *   list  -> { pt: string[], en: string[] }
 *   facts -> [{ label:{pt,en}, value:{pt,en} }]
 */
export const contentEntrySchema = z.object({ tipo: z.string(), valor: z.unknown() });
export type ContentEntry = z.infer<typeof contentEntrySchema>;

/** ?action=list → mapa { chave: { tipo, valor } }. */
export const contentMapResponseSchema = z.object({
  content: z.record(z.string(), contentEntrySchema),
});
export type ContentMap = Record<string, ContentEntry>;

/** ?action=get → { content: { chave, tipo, valor } }. */
export const contentItemResponseSchema = z.object({
  content: z.object({ chave: z.string(), tipo: z.string(), valor: z.unknown() }),
});

// Schemas do `valor` por tipo.
export const contentTextSchema = bilingual;
export const contentListSchema = z.object({ pt: z.array(z.string()), en: z.array(z.string()) });
export const contentFactsSchema = z.array(z.object({ label: bilingual, value: bilingual }));

export type ContentText = z.infer<typeof contentTextSchema>;
export type ContentList = z.infer<typeof contentListSchema>;
export type ContentFacts = z.infer<typeof contentFactsSchema>;

/** Lê e valida uma entrada `text` do mapa; undefined se ausente/ inválida. */
export function getText(map: ContentMap, key: string): ContentText | undefined {
  const parsed = contentTextSchema.safeParse(map[key]?.valor);
  return parsed.success ? parsed.data : undefined;
}

export function getList(map: ContentMap, key: string): ContentList | undefined {
  const parsed = contentListSchema.safeParse(map[key]?.valor);
  return parsed.success ? parsed.data : undefined;
}

export function getFacts(map: ContentMap, key: string): ContentFacts | undefined {
  const parsed = contentFactsSchema.safeParse(map[key]?.valor);
  return parsed.success ? parsed.data : undefined;
}

/** Payload de upsert enviado pelo painel. */
export const contentInputSchema = z.object({
  chave: z.string().min(1),
  tipo: z.enum(["text", "list", "facts"]),
  valor: z.unknown(),
});
export type ContentInput = z.infer<typeof contentInputSchema>;
