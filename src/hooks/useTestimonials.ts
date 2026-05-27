"use client";

import { useEffect, useState } from "react";
import { listTestimonials } from "@/lib/api";
import type { Testimonial } from "@/data/testimonials";

/**
 * Depoimentos publicados da API (client-side). `initial` (dados estáticos) é o
 * fallback: enquanto a API responde, ou se ela falhar/estiver indisponível, o
 * conteúdo estático continua à mostra — só é substituído se a API trouxer itens.
 */
export function useTestimonials(initial: Testimonial[] = []): Testimonial[] {
  const [items, setItems] = useState<Testimonial[]>(initial);

  useEffect(() => {
    let active = true;
    listTestimonials()
      .then((data) => {
        if (!active || data.length === 0) return;
        setItems(
          data.map((t) => ({
            name: t.name,
            role: t.role ?? { pt: "", en: "" },
            quote: t.quote ?? { pt: "", en: "" },
            image: t.image,
          })),
        );
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  return items;
}
