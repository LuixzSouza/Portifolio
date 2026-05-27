"use client";

import { useEffect, useState } from "react";
import { listMilestones } from "@/lib/api";
import type { Milestone } from "@/data/timeline";
import { pickText } from "@/lib/i18n";

/**
 * Marcos da trajetória da API (client-side). `initial` (dados estáticos) é o
 * fallback — só é substituído se a API trouxer marcos. Ver [[useTestimonials]].
 */
export function useMilestones(initial: Milestone[] = []): Milestone[] {
  const [items, setItems] = useState<Milestone[]>(initial);

  useEffect(() => {
    let active = true;
    // A API ainda não guarda imagem dos marcos; preserva a imagem curada
    // casando pelo ano (estável mesmo se o painel reordenar os marcos).
    const imageByYear = new Map(initial.map((m) => [pickText(m.year, "pt"), m.image] as const));
    listMilestones()
      .then((data) => {
        if (!active || data.length === 0) return;
        setItems(
          data.map((m) => ({
            year: m.year,
            title: m.title ?? { pt: "", en: "" },
            desc: m.desc ?? { pt: "", en: "" },
            techs: m.techs,
            image: imageByYear.get(pickText(m.year, "pt")),
          })),
        );
      })
      .catch(() => {});
    return () => {
      active = false;
    };
    // `initial` é a lista curada estável (default do módulo); buscar só uma vez.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return items;
}
