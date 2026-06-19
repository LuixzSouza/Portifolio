"use client";

import { useEffect, useState } from "react";
import { cmsCoversLocale } from "@/lib/locales";
import { useLocale } from "@/lib/useLocale";

/**
 * Padrão compartilhado dos hooks de CMS (client-side): renderiza `initial`
 * (dados estáticos) e só substitui quando a API traz itens. Enquanto a API
 * responde — ou se ela falhar, estiver indisponível ou voltar vazia — o
 * conteúdo estático continua à mostra. Em idioma sem CMS, nem consulta.
 *
 * `map` recebe a resposta crua da API e a lista `initial`, para os casos que
 * precisam mesclar dados curados (ex.: a imagem por ano em [[useMilestones]]).
 * Refaz só na troca de idioma; `fetcher`/`map`/`initial` são lidos do render
 * vigente. Ver [[useTestimonials]].
 */
export function useCmsList<TApi, TItem>(
  fetcher: () => Promise<TApi[]>,
  map: (data: TApi[], initial: TItem[]) => TItem[],
  initial: TItem[] = [],
): TItem[] {
  const [items, setItems] = useState<TItem[]>(initial);
  const locale = useLocale();

  useEffect(() => {
    if (!cmsCoversLocale(locale)) return; // idioma sem CMS → mantém o estático
    let active = true;
    fetcher()
      .then((data) => {
        if (!active || data.length === 0) return;
        setItems(map(data, initial));
      })
      .catch(() => {});
    return () => {
      active = false;
    };
    // `initial`/`fetcher`/`map` são estáveis na prática; refaz só na troca de idioma.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  return items;
}
