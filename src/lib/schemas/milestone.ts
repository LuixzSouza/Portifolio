import { z } from "zod";
import { bilingual, pickLocalized } from "./shared";
import type { LocalizedText } from "@/lib/i18n";

/** Linha crua de milestones.php → milestone_row_to_api. */
export const apiMilestoneSchema = z.object({
  id: z.number().int(),
  year_pt: z.string(),
  year_en: z.string(),
  title_pt: z.string().nullable(),
  title_en: z.string().nullable(),
  desc_pt: z.string().nullable(),
  desc_en: z.string().nullable(),
  techs: z.array(z.string()),
  ordem: z.number().int(),
  publicado: z.boolean(),
});
export type ApiMilestone = z.infer<typeof apiMilestoneSchema>;

export const milestonesListResponseSchema = z.object({
  milestones: z.array(apiMilestoneSchema),
});
export const milestoneResponseSchema = z.object({ milestone: apiMilestoneSchema });

/** Modelo de domínio consumido pela UI. */
export interface Milestone {
  id: number;
  year: LocalizedText;
  title?: LocalizedText;
  desc?: LocalizedText;
  techs: string[];
  ordem: number;
  publicado: boolean;
}

export function apiMilestoneToMilestone(row: ApiMilestone): Milestone {
  return {
    id: row.id,
    // year é obrigatório: o PHP preenche ambos os idiomas (espelha pt no en e vice-versa).
    year: pickLocalized(row.year_pt, row.year_en) ?? row.year_pt,
    title: pickLocalized(row.title_pt, row.title_en),
    desc: pickLocalized(row.desc_pt, row.desc_en),
    techs: row.techs,
    ordem: row.ordem,
    publicado: row.publicado,
  };
}

/** Payload de criação/edição enviado pelo painel. */
export const milestoneInputSchema = z.object({
  year: bilingual,
  title: bilingual.optional(),
  desc: bilingual.optional(),
  techs: z.array(z.string().min(1)),
  publicado: z.boolean(),
});
export type MilestoneInput = z.infer<typeof milestoneInputSchema>;
