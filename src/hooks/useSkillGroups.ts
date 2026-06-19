"use client";

import { listSkillGroups } from "@/lib/api";
import { useCmsList } from "./useCmsList";
import type { SkillGroup } from "@/data/skills";

/**
 * Grupos de skills da API (client-side). `initial` (dados estáticos) é o fallback
 * — só é substituído se a API trouxer grupos. Mecânica compartilhada em
 * [[useCmsList]].
 */
export function useSkillGroups(initial: SkillGroup[] = []): SkillGroup[] {
  return useCmsList(
    listSkillGroups,
    (data) =>
      data.map((g) => ({
        category: g.category,
        skills: g.skills.map((s) => ({ name: s.name, level: s.level })),
      })),
    initial,
  );
}
