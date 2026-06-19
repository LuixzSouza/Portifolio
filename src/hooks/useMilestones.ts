"use client";

import { listMilestones } from "@/lib/api";
import { useCmsList } from "./useCmsList";
import { pickText } from "@/lib/i18n";
import type { Milestone } from "@/data/timeline";

/**
 * Marcos da trajetória da API (client-side). `initial` (dados estáticos) é o
 * fallback — só é substituído se a API trouxer marcos. Mecânica compartilhada
 * em [[useCmsList]].
 */
export function useMilestones(initial: Milestone[] = []): Milestone[] {
  return useCmsList(
    listMilestones,
    (data, curated) => {
      // A API ainda não guarda imagem dos marcos; preserva a imagem curada
      // casando pelo ano (estável mesmo se o painel reordenar os marcos).
      const imageByYear = new Map(
        curated.map((m) => [pickText(m.year, "pt"), m.image] as const),
      );
      return data.map((m) => ({
        year: m.year,
        title: m.title ?? { pt: "", en: "" },
        desc: m.desc ?? { pt: "", en: "" },
        techs: m.techs,
        image: imageByYear.get(pickText(m.year, "pt")),
      }));
    },
    initial,
  );
}
