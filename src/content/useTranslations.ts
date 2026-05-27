"use client";

import { useLanguage } from "@/components/ds/LanguageProvider";
import { getDictionary, type Dictionary } from "./dictionaries";

/** Retorna o dicionário do idioma ativo. Use em client components. */
export function useTranslations(): Dictionary {
  const { lang } = useLanguage();
  return getDictionary(lang);
}
