import { z } from "zod";
import { bilingual } from "./shared";
import type { LocalizedText } from "@/lib/i18n";

/** Skill individual dentro de um grupo. */
export const apiSkillSchema = z.object({
  id: z.number().int(),
  name: z.string().min(1),
  level: z.number().int().min(1).max(5),
});

/** Grupo de skills de skills.php → fetch_skill_groups. */
export const apiSkillGroupSchema = z.object({
  id: z.number().int(),
  category_pt: z.string(),
  category_en: z.string(),
  ordem: z.number().int(),
  skills: z.array(apiSkillSchema),
});
export type ApiSkillGroup = z.infer<typeof apiSkillGroupSchema>;

export const skillGroupsResponseSchema = z.object({
  skillGroups: z.array(apiSkillGroupSchema),
});
export const skillGroupResponseSchema = z.object({ skillGroup: apiSkillGroupSchema });

/** Modelo de domínio consumido pela UI. */
export interface Skill {
  id: number;
  name: string;
  level: number;
}
export interface SkillGroup {
  id: number;
  category: LocalizedText;
  ordem: number;
  skills: Skill[];
}

export function apiSkillGroupToSkillGroup(row: ApiSkillGroup): SkillGroup {
  return {
    id: row.id,
    category: { pt: row.category_pt, en: row.category_en },
    ordem: row.ordem,
    skills: row.skills.map((s) => ({ id: s.id, name: s.name, level: s.level })),
  };
}

/** Payload de criação/edição enviado pelo painel (grupo + suas skills). */
export const skillGroupInputSchema = z.object({
  category: bilingual,
  skills: z.array(
    z.object({
      name: z.string().min(1),
      level: z.number().int().min(1).max(5),
    }),
  ),
});
export type SkillGroupInput = z.infer<typeof skillGroupInputSchema>;
