import { z } from "zod";
import { bilingual } from "./shared";
import type { LocalizedText } from "@/lib/i18n";

/** Passo do processo, já bilíngue no JSON da coluna `process`. */
const apiServiceStepSchema = z.object({ title: bilingual, desc: bilingual });

/** Linha crua de services.php → service_row_to_api. */
export const apiServiceSchema = z.object({
  id: z.number().int(),
  slug: z.string().min(1),
  n: z.string().nullable(),
  image: z.string().nullable(),
  accent: z.string().nullable(),
  title_pt: z.string().nullable(),
  title_en: z.string().nullable(),
  tagline_pt: z.string().nullable(),
  tagline_en: z.string().nullable(),
  intro_pt: z.string().nullable(),
  intro_en: z.string().nullable(),
  forwho_pt: z.string().nullable(),
  forwho_en: z.string().nullable(),
  process: z.array(apiServiceStepSchema),
  includes: z.array(bilingual),
  tags: z.array(z.string()),
  meta_title_pt: z.string().nullable(),
  meta_title_en: z.string().nullable(),
  meta_description_pt: z.string().nullable(),
  meta_description_en: z.string().nullable(),
  ordem: z.number().int(),
  publicado: z.boolean(),
});
export type ApiService = z.infer<typeof apiServiceSchema>;

export const servicesListResponseSchema = z.object({ services: z.array(apiServiceSchema) });
export const serviceResponseSchema = z.object({ service: apiServiceSchema });

export interface ServiceStep {
  title: LocalizedText;
  desc: LocalizedText;
}

/** Modelo de domínio consumido pela UI (espelha ServiceDetailData + metadados). */
export interface Service {
  id: number;
  slug: string;
  n?: string;
  image?: string;
  accent?: string;
  title: LocalizedText;
  tagline: LocalizedText;
  intro: LocalizedText;
  forWho: LocalizedText;
  process: ServiceStep[];
  includes: LocalizedText[];
  tags: string[];
  metaTitle: LocalizedText;
  metaDescription: LocalizedText;
  ordem: number;
  publicado: boolean;
}

/** Campo bilíngue de serviço: sempre LocalizedText (vazio se ambos nulos). */
function loc(pt: string | null, en: string | null): LocalizedText {
  return { pt: pt ?? "", en: en ?? "" };
}

export function apiServiceToService(row: ApiService): Service {
  return {
    id: row.id,
    slug: row.slug,
    n: row.n ?? undefined,
    image: row.image ?? undefined,
    accent: row.accent ?? undefined,
    title: loc(row.title_pt, row.title_en),
    tagline: loc(row.tagline_pt, row.tagline_en),
    intro: loc(row.intro_pt, row.intro_en),
    forWho: loc(row.forwho_pt, row.forwho_en),
    process: row.process,
    includes: row.includes,
    tags: row.tags,
    metaTitle: loc(row.meta_title_pt, row.meta_title_en),
    metaDescription: loc(row.meta_description_pt, row.meta_description_en),
    ordem: row.ordem,
    publicado: row.publicado,
  };
}

/** Payload de criação/edição enviado pelo painel. */
export const serviceInputSchema = z.object({
  n: z.string().optional(),
  image: z.string().optional(),
  accent: z.string().optional(),
  title: bilingual,
  tagline: bilingual.optional(),
  intro: bilingual.optional(),
  forWho: bilingual.optional(),
  process: z.array(z.object({ title: bilingual, desc: bilingual })),
  includes: z.array(bilingual),
  tags: z.array(z.string().min(1)),
  metaTitle: bilingual.optional(),
  metaDescription: bilingual.optional(),
  publicado: z.boolean(),
});
export type ServiceInput = z.infer<typeof serviceInputSchema>;
