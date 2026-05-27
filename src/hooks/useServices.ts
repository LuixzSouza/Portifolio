"use client";

import { useEffect, useState } from "react";
import { listServices } from "@/lib/api";
import type { ServiceDetailData } from "@/data/services";

/**
 * Serviços publicados da API (client-side). `initial` (dados estáticos) é o
 * fallback — só é substituído se a API trouxer serviços. Ver [[useTestimonials]].
 */
export function useServices(initial: ServiceDetailData[] = []): ServiceDetailData[] {
  const [items, setItems] = useState<ServiceDetailData[]>(initial);

  useEffect(() => {
    let active = true;
    listServices()
      .then((data) => {
        if (!active || data.length === 0) return;
        setItems(
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
        );
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  return items;
}
