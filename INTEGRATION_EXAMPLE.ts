/**
 * EXEMPLO DE INTEGRAÇÃO — Traduções para 11 Idiomas
 *
 * Este arquivo demonstra como integrar o arquivo translations-11-languages.json
 * no projeto. Escolha uma das 3 estratégias abaixo.
 */

// ============================================================================
// ESTRATÉGIA 1: Expandir dictionaries.ts com as novas traduções
// ============================================================================

// src/content/dictionaries.ts (EXPANDIDO)

import type { LocalizedText } from "@/lib/i18n";
import type { Lang } from "@/components/ds/LanguageProvider";

/**
 * Interface expandida com os novos grupos de dados traduzidos
 */
export interface DictionaryExpanded {
  // ... existente ...

  about: {
    bio: string;
    facts: Array<{
      label: string;
      value: string;
    }>;
    storyQuote: string;
    storyParagraphs: string[];
  };

  skills: {
    categories: string[];
  };

  timeline: {
    milestones: Array<{
      year: string;
      title: string;
      desc: string;
    }>;
  };

  services: {
    sites: {
      title: string;
      tagline: string;
      intro: string;
      forWho: string;
      process: Array<{
        title: string;
        desc: string;
      }>;
      includes: string[];
      metaTitle: string;
      metaDescription: string;
    };
    // ... sistemas e lojas seguem o mesmo padrão ...
  };
}

// Exemplo de como preencher um idioma (ES):
const es: DictionaryExpanded = {
  // ... mantém o existente ...

  about: {
    bio: "Desarrollador Front-End apasionado por crear interfaces que conectan a las personas con productos innovadores. Con base en São Paulo, combino habilidades técnicas en React, Next.js y Tailwind con enfoque obsesivo en UX, rendimiento y accesibilidad. Lejos de la pantalla, soy adicto a los videojuegos, la música synthwave y la eterna búsqueda del café perfecto.",
    facts: [
      {
        label: "Experiencia",
        value: "Desde 2021 en desarrollo web",
      },
      {
        label: "Stack Tecnológico",
        value: "React, Next.js, TypeScript, Tailwind, PHP",
      },
      {
        label: "Educación",
        value: "Análisis y Desarrollo de Sistemas (Univas)",
      },
      {
        label: "Enfoque",
        value: "UX, Accesibilidad, Rendimiento y Código Limpio",
      },
    ],
    storyQuote: "El código bonito es el que otras personas pueden entender — y que usted aún puede entender 6 meses después.",
    storyParagraphs: [
      "Mi viaje por la programación comenzó casi por accidente durante la universidad. Un proyecto desafiante me cautivó, y desde entonces, la curiosidad sobre cómo funcionan las cosas no ha dejado de crecer.",
      // ... mais 4 parágrafos ...
    ],
  },

  skills: {
    categories: [
      "Front-End",
      "Back-End & Datos",
      "Diseño & UI/UX",
      "Herramientas e Infraestructura",
    ],
  },

  timeline: {
    milestones: [
      {
        year: "2021",
        title: "Primer sitio web en producción",
        desc: "Lanzamiento del primer proyecto profesional, marcando el comienzo del viaje como desarrollador independiente.",
      },
      // ... mais 5 marcos ...
    ],
  },

  services: {
    sites: {
      title: "Sitios Web y Páginas de Destino",
      tagline: "Presencia digital que convierte",
      intro: "Construyo sitios web institucionales, portfólios y páginas de destino enfocadas en la conversión. Diseño responsivo, rendimiento optimizado y SEO estratégico para atraer y convertir visitantes en clientes.",
      forWho: "Autónomos, pequeñas agencias, empresarios que buscan presencia profesional en línea",
      process: [
        {
          title: "Entender el negocio",
          desc: "Análisis profundo de objetivos, audiencia objetivo y competencia para definir estrategia.",
        },
        // ... mais 3 etapas ...
      ],
      includes: [
        "Diseño responsivo y mobile-first",
        "Optimización SEO completa",
        // ... mais 4 itens ...
      ],
      metaTitle: "Sitios Web y Páginas de Destino Profesionales | Luiz Souza",
      metaDescription: "Desarrollo de sitios web, páginas de destino y portafolios con enfoque en conversión, SEO y rendimiento. Diseño responsivo, código limpio.",
    },
  },
};

// ============================================================================
// ESTRATÉGIA 2: Criar helper para carregar a partir do JSON externo
// ============================================================================

// src/lib/translations-loader.ts

import translationsJSON from "../../translations-11-languages.json";

export interface TranslationEntry {
  key: string;
  [lang: string]: string;
}

/**
 * Carrega traduções do JSON e organiza por idioma
 */
export function loadTranslationsByLang(lang: string): Record<string, string> {
  const result: Record<string, string> = {};

  (translationsJSON as TranslationEntry[]).forEach((entry) => {
    if (lang in entry) {
      result[entry.key] = entry[lang];
    }
  });

  return result;
}

/**
 * Hook para usar uma tradução específica por chave
 */
export function useTranslation(key: string, lang: string): string {
  const translations = loadTranslationsByLang(lang);
  return translations[key] || key; // fallback: retorna a chave se não encontrar
}

// Uso no componente:
// const bio = useTranslation('about.bio', 'es');

// ============================================================================
// ESTRATÉGIA 3: Converter para TypeScript tipado (type-safe)
// ============================================================================

// src/data/translations-extended.ts

export interface TranslationsByLanguage {
  pt: string;
  en: string;
  es: string;
  fr: string;
  de: string;
  it: string;
  ja: string;
  zh: string;
  ru: string;
  ar: string;
  ko: string;
  tr: string;
  pl: string;
}

export interface TranslationsExtended {
  about: {
    bio: TranslationsByLanguage;
    facts: {
      [key: string]: TranslationsByLanguage; // fact1, fact2, etc.
    };
    story: {
      quote: TranslationsByLanguage;
      paragraphs: {
        [key: string]: TranslationsByLanguage; // paragraph1, paragraph2, etc.
      };
    };
  };
  skills: {
    categories: {
      [key: string]: TranslationsByLanguage; // frontend, backend, design, tools
    };
  };
  timeline: {
    milestones: {
      [key: string]: {
        year: TranslationsByLanguage;
        title: TranslationsByLanguage;
        desc: TranslationsByLanguage;
      };
    };
  };
  services: {
    sites: {
      title: TranslationsByLanguage;
      tagline: TranslationsByLanguage;
      intro: TranslationsByLanguage;
      forWho: TranslationsByLanguage;
      process: {
        [key: string]: {
          title: TranslationsByLanguage;
          desc: TranslationsByLanguage;
        };
      };
      includes: {
        [key: string]: TranslationsByLanguage;
      };
      meta: {
        title: TranslationsByLanguage;
        description: TranslationsByLanguage;
      };
    };
  };
}

export const translationsExtended: TranslationsExtended = {
  about: {
    bio: {
      pt: "Desenvolvedor Front-End apaixonado...",
      en: "Front-End Developer passionate...",
      es: "Desarrollador Front-End apasionado...",
      // ... + 10 idiomas
    },
    facts: {
      experience: {
        label: {
          pt: "Experiência",
          en: "Experience",
          es: "Experiencia",
          // ... + 10 idiomas
        },
        value: {
          pt: "Desde 2021 em desenvolvimento web",
          en: "Since 2021 in web development",
          es: "Desde 2021 en desarrollo web",
          // ... + 10 idiomas
        },
      },
      // ... tech, education, focus
    },
    // ... story.quote, story.paragraphs
  },
  // ... skills, timeline, services
};

// ============================================================================
// ESTRATÉGIA 4: Validar e Gerar Type-Safe com Zod
// ============================================================================

// src/lib/schemas/translations.ts

import { z } from "zod";

const langs = ["pt", "en", "es", "fr", "de", "it", "ja", "zh", "ru", "ar", "ko", "tr", "pl"] as const;

const TranslationsByLanguageSchema = z.object({
  pt: z.string(),
  en: z.string(),
  es: z.string(),
  fr: z.string(),
  de: z.string(),
  it: z.string(),
  ja: z.string(),
  zh: z.string(),
  ru: z.string(),
  ar: z.string(),
  ko: z.string(),
  tr: z.string(),
  pl: z.string(),
});

const TranslationEntrySchema = z.object({
  key: z.string(),
  ...TranslationsByLanguageSchema.shape,
});

export type TranslationsByLanguage = z.infer<typeof TranslationsByLanguageSchema>;
export type TranslationEntry = z.infer<typeof TranslationEntrySchema>;

/**
 * Valida o JSON de traduções na build-time
 */
export function validateTranslations(data: unknown): TranslationEntry[] {
  return z.array(TranslationEntrySchema).parse(data);
}

// ============================================================================
// EXEMPLO DE USO EM COMPONENTE
// ============================================================================

// src/components/sections/AboutHeroExpanded.tsx

"use client";

import { useTranslations } from "@/hooks/useTranslations"; // hook customizado
import type { Lang } from "@/components/ds/LanguageProvider";

interface AboutHeroExpandedProps {
  lang: Lang;
}

export function AboutHeroExpanded({ lang }: AboutHeroExpandedProps) {
  // Estratégia 1: usar dictionaries expandido
  // const bio = dictionaries[lang].about.bio;

  // Estratégia 2: usar loader
  // const bio = useTranslation('about.bio', lang);

  // Estratégia 3: usar dados tipados
  const { t } = useTranslations(lang);
  const bio = t("about.bio");

  return (
    <section>
      <p>{bio}</p>
      {/* Renderizar fatos */}
      <dl>
        {t("about.facts").map((fact) => (
          <div key={fact.label}>
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>

      {/* Renderizar parágrafos da story */}
      <blockquote>"{t('about.storyQuote')}"</blockquote>
      <article>
        {t("about.storyParagraphs").map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}
      </article>
    </section>
  );
}

// ============================================================================
// SCRIPT PARA GERAR SEED SQL
// ============================================================================

// scripts/json-to-seed.ts
// Execute com: npx tsx scripts/json-to-seed.ts

import fs from "fs";
import path from "path";
import translationsJSON from "../translations-11-languages.json";

const langs = ["pt", "en", "es", "fr", "de", "it", "ja", "zh", "ru", "ar", "ko", "tr", "pl"];

function generateSeedSQL(): string {
  let sql = `-- Translations Seed
-- Generated from translations-11-languages.json

INSERT INTO translations (\`key\`, language, value) VALUES\n`;

  const entries: any[] = translationsJSON;
  const values: string[] = [];

  entries.forEach((entry) => {
    langs.forEach((lang) => {
      if (entry[lang]) {
        const key = entry.key;
        const value = entry[lang].replace(/'/g, "''"); // escape quotes
        values.push(`('${key}', '${lang}', '${value}')`);
      }
    });
  });

  sql += values.join(",\n") + ";";
  return sql;
}

const seedSQL = generateSeedSQL();
fs.writeFileSync(path.join(__dirname, "../src/php/sql/translations-seed.sql"), seedSQL);
console.log("✅ Seed SQL gerado: src/php/sql/translations-seed.sql");

// ============================================================================
// PRÓXIMOS PASSOS
// ============================================================================

/**
 * 1. Escolha a estratégia que melhor se encaixa ao seu projeto
 * 2. Adapte os tipos e estruturas conforme necessário
 * 3. Teste a renderização em cada idioma
 * 4. Atualize sitemap.xml e hreflang tags se necessário
 * 5. Implemente fallback para idiomas não encontrados
 * 6. Adicione testes de contrato (entities-contract.test.ts)
 */
