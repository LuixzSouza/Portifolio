"use client";

import { useEffect, useState } from "react";
import { listSkillGroups } from "@/lib/api";
import type { SkillGroup } from "@/data/skills";

/**
 * Grupos de skills da API (client-side). `initial` (dados estáticos) é o fallback
 * — só é substituído se a API trouxer grupos. Ver [[useTestimonials]].
 */
export function useSkillGroups(initial: SkillGroup[] = []): SkillGroup[] {
  const [groups, setGroups] = useState<SkillGroup[]>(initial);

  useEffect(() => {
    let active = true;
    listSkillGroups()
      .then((data) => {
        if (!active || data.length === 0) return;
        setGroups(
          data.map((g) => ({
            category: g.category,
            skills: g.skills.map((s) => ({ name: s.name, level: s.level })),
          })),
        );
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  return groups;
}
