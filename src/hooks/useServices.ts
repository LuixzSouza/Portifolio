"use client";

import { listServices } from "@/lib/api";
import { useCmsList } from "./useCmsList";
import type { ServiceDetailData } from "@/data/services";

/**
 * Serviços publicados da API (client-side). `initial` (dados estáticos) é o
 * fallback — só é substituído se a API trouxer serviços. Mecânica compartilhada
 * em [[useCmsList]].
 */
export function useServices(initial: ServiceDetailData[] = []): ServiceDetailData[] {
  return useCmsList(
    listServices,
    (data) =>
      data.map((s) => ({
        slug: s.slug,
        n: s.n ?? "",
        image: s.image ?? "",
        accent: s.accent ?? "",
        title: s.title,
        tagline: s.tagline,
        intro: s.intro,
        forWho: s.forWho,
        process: s.process,
        includes: s.includes,
        tags: s.tags,
        metaTitle: s.metaTitle,
        metaDescription: s.metaDescription,
      })),
    initial,
  );
}
