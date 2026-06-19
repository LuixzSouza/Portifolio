"use client";

import { listTestimonials } from "@/lib/api";
import { useCmsList } from "./useCmsList";
import type { Testimonial } from "@/data/testimonials";

/**
 * Depoimentos publicados da API (client-side). `initial` (dados estáticos) é o
 * fallback: enquanto a API responde, ou se ela falhar/estiver indisponível, o
 * conteúdo estático continua à mostra — só é substituído se a API trouxer itens.
 * Mecânica compartilhada em [[useCmsList]].
 */
export function useTestimonials(initial: Testimonial[] = []): Testimonial[] {
  return useCmsList(
    listTestimonials,
    (data) =>
      data.map((t) => ({
        name: t.name,
        role: t.role ?? { pt: "", en: "" },
        quote: t.quote ?? { pt: "", en: "" },
        image: t.image,
      })),
    initial,
  );
}
