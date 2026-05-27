#!/usr/bin/env node
/**
 * Script de tradução de máquina usando Claude API
 * Extrai textos PT/EN de src/data/* e traduz para 11 idiomas novos
 *
 * Uso: npx tsx scripts/translate-all-languages.mts
 * Lê: src/data/*.tsx
 * Saída: translations.json (na raiz do projeto)
 */

import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";

interface TranslationItem {
  key: string;
  pt: string;
  en: string;
  context?: string;
}

interface TranslationResult {
  key: string;
  pt: string;
  en: string;
  es?: string;
  fr?: string;
  de?: string;
  it?: string;
  zh?: string;
  ja?: string;
  ru?: string;
  ar?: string;
  hi?: string;
  ko?: string;
  id?: string;
}

const LANGUAGES = {
  es: "Español (España)",
  fr: "Français (France)",
  de: "Deutsch (Alemanha)",
  it: "Italiano (Itália)",
  zh: "中文 (Chinês Simplificado)",
  ja: "日本語 (Japonês)",
  ru: "Русский (Russo)",
  ar: "العربية (Árabe)",
  hi: "हिन्दी (Hindi)",
  ko: "한국어 (Coreano)",
  id: "Bahasa Indonesia",
};

async function extractTextsFromData(): Promise<TranslationItem[]> {
  const dataDir = path.join(process.cwd(), "src", "data");
  const items: TranslationItem[] = [];

  const files = fs.readdirSync(dataDir).filter((f) => f.endsWith(".tsx"));

  for (const file of files) {
    const content = fs.readFileSync(path.join(dataDir, file), "utf-8");

    // Detecta LocalizedText com regex simples
    const textMatches = content.matchAll(
      /(\w+):\s*{\s*pt:\s*"([^"]+)",\s*en:\s*"([^"]+)"\s*}/g
    );

    for (const match of textMatches) {
      const [, fieldName, pt, en] = match;
      items.push({
        key: `${file.replace(".tsx", "")}.${fieldName}`,
        pt,
        en,
        context: `Campo: ${fieldName} em ${file}`,
      });
    }

    // Detecta LocalizedList (arrays)
    const listMatches = content.matchAll(
      /(\w+):\s*{\s*pt:\s*\[([\s\S]*?)\],\s*en:\s*\[([\s\S]*?)\]\s*}/g
    );

    for (const match of listMatches) {
      const [, fieldName, ptArray, enArray] = match;

      // Parse arrays (simplificado)
      const ptItems = ptArray.match(/"([^"]+)"/g) || [];
      const enItems = enArray.match(/"([^"]+)"/g) || [];

      ptItems.forEach((pt, idx) => {
        const en = enItems[idx];
        if (pt && en) {
          items.push({
            key: `${file.replace(".tsx", "")}.${fieldName}[${idx}]`,
            pt: pt.slice(1, -1), // Remove quotes
            en: en.slice(1, -1),
            context: `Array item ${idx} do campo: ${fieldName} em ${file}`,
          });
        }
      });
    }
  }

  return items;
}

async function translateWithClaude(items: TranslationItem[]): Promise<TranslationResult[]> {
  const client = new Anthropic();

  // Agrupa em chunks para melhor contexto
  const chunks = [];
  for (let i = 0; i < items.length; i += 50) {
    chunks.push(items.slice(i, i + 50));
  }

  const allResults: TranslationResult[] = [];

  for (let chunkIdx = 0; chunkIdx < chunks.length; chunkIdx++) {
    const chunk = chunks[chunkIdx];
    console.log(
      `Traduzindo chunk ${chunkIdx + 1}/${chunks.length} (${chunk.length} itens)...`
    );

    const itemsList = chunk
      .map(
        (item) =>
          `- Key: ${item.key}\n  PT: "${item.pt}"\n  EN: "${item.en}"`
      )
      .join("\n");

    const prompt = `Você é um tradutor profissional especializado em portfólios e sites de desenvolvedores. Traduz textos de um portfólio português/inglês para múltiplos idiomas, mantendo tom profissional, clareza e naturalidade.

IMPORTANTE:
- Retorna APENAS um JSON válido, sem markdown, explicações ou prefixos
- Cada tradução mantém o tom original (profissional, amigável, técnico quando necessário)
- Siglas, nomes próprios, tecnologias e links NÃO TRADUZEM
- Para árabe: use árabe padrão moderno (MSA)
- Para chinês: use simplificado

TEXTOS PARA TRADUZIR:
${itemsList}

Retorna um JSON array com este formato (sem markdown):
[
  {
    "key": "projects.descricao[0]",
    "pt": "texto original em PT",
    "en": "texto original em EN",
    "es": "traducción al español",
    "fr": "traduction en français",
    "de": "Übersetzung ins Deutsche",
    "it": "traduzione in italiano",
    "zh": "中文翻译",
    "ja": "日本語翻訳",
    "ru": "Русский перевод",
    "ar": "الترجمة بالعربية",
    "hi": "हिंदी अनुवाद",
    "ko": "한국어 번역",
    "id": "Terjemahan dalam bahasa Indonesia"
  }
]`;

    const response = await client.messages.create({
      model: "claude-opus-4-7",
      max_tokens: 4096,
      messages: [{ role: "user", content: prompt }],
    });

    const content =
      response.content[0].type === "text" ? response.content[0].text : "";

    // Parse JSON response
    try {
      // Remove markdown code blocks if present
      let jsonStr = content;
      if (jsonStr.includes("```json")) {
        jsonStr = jsonStr.split("```json")[1].split("```")[0];
      } else if (jsonStr.includes("```")) {
        jsonStr = jsonStr.split("```")[1].split("```")[0];
      }

      const translations = JSON.parse(jsonStr.trim());
      allResults.push(...translations);
      console.log(`  ✓ ${translations.length} itens traduzidos`);

      // Delay entre chunks para evitar rate limit
      if (chunkIdx < chunks.length - 1) {
        await new Promise((r) => setTimeout(r, 1000));
      }
    } catch (e) {
      console.error(`  ✗ Erro parsing chunk ${chunkIdx + 1}:`, e);
      console.error("  Resposta:", content.slice(0, 200));
    }
  }

  return allResults;
}

async function main() {
  console.log("🌍 Iniciando tradução de portfólio para 11 idiomas...\n");

  // Step 1: Extract
  console.log("📖 Extraindo textos PT/EN de src/data/*.tsx...");
  const items = await extractTextsFromData();
  console.log(`  ✓ ${items.length} itens encontrados\n`);

  if (items.length === 0) {
    console.error("❌ Nenhum texto bilíngue encontrado!");
    process.exit(1);
  }

  // Step 2: Translate
  console.log("🔄 Chamando Claude API para traduzir...");
  const translations = await translateWithClaude(items);
  console.log(`  ✓ ${translations.length} itens traduzidos\n`);

  // Step 3: Save
  const outputPath = path.join(process.cwd(), "translations.json");
  fs.writeFileSync(outputPath, JSON.stringify(translations, null, 2));
  console.log(`✅ Traduções salvas em: ${outputPath}`);
  console.log(
    `\n📊 Próximo passo: execute 'npx tsx scripts/integrate-translations.mts' para integrar nos arquivos.`
  );
}

main().catch((e) => {
  console.error("❌ Erro:", e.message);
  process.exit(1);
});
