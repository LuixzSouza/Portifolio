"use client";

import { useEffect, useState } from "react";
import { getContent } from "@/lib/api";
import { cmsCoversLocale } from "@/lib/locales";
import { useLocale } from "@/lib/useLocale";
import type { ContentMap } from "@/lib/schemas/content";

/**
 * Mapa de textos de seção (content.php), client-side. Retorna null até a API
 * responder; em falha/indisponibilidade segue null e o componente usa o
 * conteúdo estático de fallback. Use com getText/getList/getFacts de
 * @/lib/schemas/content. Ver [[useTestimonials]].
 */
export function useSectionContent(): ContentMap | null {
  const [content, setContent] = useState<ContentMap | null>(null);
  const locale = useLocale();

  useEffect(() => {
    if (!cmsCoversLocale(locale)) return; // idioma sem CMS → mantém o estático
    let active = true;
    getContent()
      .then((map) => {
        if (active) setContent(map);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [locale]);

  return content;
}
