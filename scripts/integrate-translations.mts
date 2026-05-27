#!/usr/bin/env node
/**
 * Script para integrar traduções geradas em dados.tsx
 * Lê translations.json e atualiza src/data/*.tsx
 *
 * Uso: npx tsx scripts/integrate-translations.mts
 * Lê: translations.json (gerado por translate-all-languages.mts)
 * Modifica: src/data/*.tsx
 */

import fs from "fs";
import path from "path";

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

const SUPPORTED_LANGS = ["es", "fr", "de", "it", "zh", "ja", "ru", "ar", "hi", "ko", "id"];

interface UpdatedTranslation extends TranslationResult {}

async function main() {
  console.log("🔧 Integrando traduções nos arquivos de dados...\n");

  // Load translations
  const translationsPath = path.join(process.cwd(), "translations.json");
  if (!fs.existsSync(translationsPath)) {
    console.error("❌ Arquivo translations.json não encontrado!");
    console.error(`   Execute primeiro: npx tsx scripts/translate-all-languages.mts`);
    process.exit(1);
  }

  const translations: TranslationResult[] = JSON.parse(
    fs.readFileSync(translationsPath, "utf-8")
  );

  // Group by file
  const byFile = new Map<string, UpdatedTranslation[]>();
  for (const t of translations) {
    const [file] = t.key.split(".");
    const fileKey = `${file}.tsx`;
    if (!byFile.has(fileKey)) {
      byFile.set(fileKey, []);
    }
    byFile.get(fileKey)!.push(t);
  }

  // Process each file
  let totalUpdated = 0;
  for (const [file, items] of byFile) {
    const filePath = path.join(process.cwd(), "src", "data", file);
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️  Arquivo não encontrado: ${file}`);
      continue;
    }

    let content = fs.readFileSync(filePath, "utf-8");
    let updatedCount = 0;

    for (const item of items) {
      // Extract field name from key (e.g., "projects.descricao[0]" -> "descricao")
      const fieldMatch = item.key.match(/\.(\w+)(\[\d+\])?$/);
      if (!fieldMatch) continue;

      const fieldName = fieldMatch[1];
      const arrayIndex = fieldMatch[2]; // e.g., "[0]"

      if (arrayIndex) {
        // Array item — atualiza dentro do array
        const idx = parseInt(arrayIndex.slice(1, -1));
        content = updateArrayTranslation(content, fieldName, idx, item);
      } else {
        // Object field
        content = updateObjectTranslation(content, fieldName, item);
      }

      updatedCount++;
    }

    if (updatedCount > 0) {
      fs.writeFileSync(filePath, content, "utf-8");
      console.log(`✓ ${file}: ${updatedCount} campos atualizados`);
      totalUpdated += updatedCount;
    }
  }

  console.log(`\n✅ Integração concluída!`);
  console.log(`   Total: ${totalUpdated} campos traduzidos`);
  console.log(`\n🚀 Próximos passos:`);
  console.log(`   1. npm run lint -- --fix  (formatar código)`);
  console.log(`   2. npm run test          (validar traduções)`);
  console.log(`   3. git add -A && git commit -m "Feat: tradução automática para 11 idiomas"`);
}

function updateObjectTranslation(
  content: string,
  fieldName: string,
  translation: TranslationResult
): string {
  // Match pattern: fieldName: { pt: "...", en: "..." }
  const pattern = new RegExp(
    `(${fieldName}\\s*:\\s*\\{\\s*pt\\s*:\\s*")([^"]*)(",\\s*en\\s*:\\s*")([^"]*)("\\s*\\})`,
    "g"
  );

  return content.replace(pattern, (match) => {
    // Extrai o objeto original
    const objStart = match.indexOf("{");
    const objEnd = match.lastIndexOf("}") + 1;
    const objStr = match.substring(objStart, objEnd);

    // Parse o objeto existente
    let obj: Record<string, string> = {
      pt: translation.pt,
      en: translation.en,
    };

    try {
      // Tenta ler do objeto existente (em caso de já ter outras línguas)
      const evalObj = eval(`(${objStr})`);
      obj = { ...evalObj, ...obj };
    } catch {
      // Se falhar, mantém apenas pt/en
    }

    // Adiciona as novas traduções
    for (const lang of SUPPORTED_LANGS) {
      const langKey = lang as keyof typeof translation;
      if (translation[langKey]) {
        obj[lang] = translation[langKey];
      }
    }

    // Reconstrói o objeto
    const objRebuilt = buildObjectLiteral(obj);
    const prefix = match.substring(0, objStart);
    return prefix + objRebuilt;
  });
}

function updateArrayTranslation(
  content: string,
  fieldName: string,
  itemIndex: number,
  translation: TranslationResult
): string {
  // Match pattern: fieldName: { pt: [...], en: [...] }
  const pattern = new RegExp(
    `(${fieldName}\\s*:\\s*\\{[^}]*pt\\s*:\\s*\\[)([^]*?)(\\],\\s*en\\s*:\\s*\\[)([^]*?)(\\]\\s*\\})`,
    "g"
  );

  return content.replace(pattern, (match) => {
    // Extrai arrays
    const ptArrayStart = match.indexOf("[", match.indexOf("pt"));
    const ptArrayEnd = match.indexOf("]", ptArrayStart);
    const enArrayStart = match.indexOf("[", match.indexOf("en"));
    const enArrayEnd = match.indexOf("]", enArrayStart);

    const ptArrayStr = match.substring(ptArrayStart + 1, ptArrayEnd);
    const enArrayStr = match.substring(enArrayStart + 1, enArrayEnd);

    // Parse arrays
    const ptItems = extractArrayItems(ptArrayStr);
    const enItems = extractArrayItems(enArrayStr);

    // Atualiza item específico
    if (itemIndex < ptItems.length) {
      ptItems[itemIndex] = translation.pt;
    }
    if (itemIndex < enItems.length) {
      enItems[itemIndex] = translation.en;
    }

    // Reconstrói com novas linguagens
    const langArrays: Record<string, string[]> = {
      pt: ptItems,
      en: enItems,
    };

    for (const lang of SUPPORTED_LANGS) {
      const langKey = lang as keyof typeof translation;
      if (translation[langKey]) {
        if (!langArrays[lang]) {
          langArrays[lang] = [...ptItems]; // fallback
        }
        if (itemIndex < langArrays[lang].length) {
          langArrays[lang][itemIndex] = translation[langKey];
        }
      }
    }

    // Reconstrói o objeto com arrays
    const arrayObjStr = Object.entries(langArrays)
      .map(([lang, items]) => {
        const itemsStr = items.map((s) => `"${escapeString(s)}"`).join(", ");
        return `${lang}: [${itemsStr}]`;
      })
      .join(", ");

    const prefix = match.substring(0, match.indexOf("{") + 1);
    const suffix = match.substring(match.lastIndexOf("}"));
    return prefix + arrayObjStr + suffix;
  });
}

function buildObjectLiteral(obj: Record<string, string>): string {
  const entries = Object.entries(obj)
    .map(([key, value]) => `${key}: "${escapeString(value)}"`)
    .join(", ");
  return `{ ${entries} }`;
}

function extractArrayItems(arrayStr: string): string[] {
  const items: string[] = [];
  let current = "";
  let inString = false;
  let escape = false;

  for (let i = 0; i < arrayStr.length; i++) {
    const char = arrayStr[i];

    if (escape) {
      current += char;
      escape = false;
    } else if (char === "\\") {
      current += char;
      escape = true;
    } else if (char === '"') {
      inString = !inString;
      current += char;
    } else if (char === "," && !inString) {
      const trimmed = current.trim();
      if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
        items.push(trimmed.slice(1, -1));
      }
      current = "";
    } else {
      current += char;
    }
  }

  if (current.trim()) {
    const trimmed = current.trim();
    if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
      items.push(trimmed.slice(1, -1));
    }
  }

  return items;
}

function escapeString(str: string): string {
  return str
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r");
}

main().catch((e) => {
  console.error("❌ Erro:", e.message);
  if (e.stack) console.error(e.stack);
  process.exit(1);
});
