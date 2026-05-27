#!/usr/bin/env node
/**
 * Script para integrar translations.json nos arquivos src/data/*.tsx
 * Atualiza LocalizedText com as 11 novas linguagens
 *
 * Uso: npx tsx scripts/apply-translations.mts
 */

import fs from "fs";
import path from "path";

interface Translation {
  key: string;
  pt: string;
  en: string;
  [key: string]: string;
}

async function main() {
  console.log("🔧 Integrando traduções nos arquivos de dados...\n");

  const translationsPath = path.join(process.cwd(), "translations.json");
  if (!fs.existsSync(translationsPath)) {
    console.error("❌ Arquivo translations.json não encontrado!");
    process.exit(1);
  }

  const translations: Translation[] = JSON.parse(
    fs.readFileSync(translationsPath, "utf-8")
  );

  // Lê todos os arquivos de dados
  const dataDir = path.join(process.cwd(), "src", "data");
  const files = fs.readdirSync(dataDir).filter((f) => f.endsWith(".tsx"));

  let totalUpdated = 0;

  for (const file of files) {
    const filePath = path.join(dataDir, file);
    let content = fs.readFileSync(filePath, "utf-8");
    let fileUpdated = 0;

    // Para cada tradução, procura no arquivo e atualiza
    for (const trans of translations) {
      // Extrai o nome do arquivo da key (ex: "projeto.formula-idiomas.descricao" -> "projeto")
      const [keyFile] = trans.key.split(".");

      // Verifica se é para este arquivo
      if (
        !file.includes(keyFile) &&
        !file.startsWith(keyFile.substring(0, 6))
      ) {
        continue;
      }

      // Extrai o nome do campo (ex: "objetivo-0", "descricao", "resumo")
      const fieldMatch = trans.key.match(/\.([a-z\-]+)(?:-\d+)?$/);
      if (!fieldMatch) continue;

      let fieldName = fieldMatch[1];

      // Normaliza nomes de campos
      if (fieldName.includes("objetivo")) {
        fieldName = "objetivos";
      } else if (fieldName.includes("desafio")) {
        fieldName = "desafios";
      } else if (fieldName.includes("aprendizado")) {
        fieldName = "aprendizados";
      } else if (fieldName.includes("melhoria")) {
        fieldName = "melhorias";
      } else if (fieldName.includes("conteudo")) {
        fieldName = "conteudo";
      }

      // Detecta se é um array item (ex: "objetivo-0")
      const isArrayItem = /-(conteudo|objetivo|desafio|aprendizado|melhoria)-?\d+/.test(
        trans.key
      );

      if (isArrayItem) {
        // Atualiza item de array
        fileUpdated += updateArrayField(content, fieldName, trans);
      } else {
        // Atualiza campo simples
        content = updateSimpleField(content, fieldName, trans);
        fileUpdated++;
      }
    }

    if (fileUpdated > 0) {
      fs.writeFileSync(filePath, content, "utf-8");
      console.log(`✓ ${file}: ${fileUpdated} campos atualizados`);
      totalUpdated += fileUpdated;
    }
  }

  console.log(`\n✅ Integração concluída!`);
  console.log(`   Total: ${totalUpdated} campos com novas traduções\n`);
  console.log(`📋 Próximos passos:`);
  console.log(`   1. npx tsx scripts/validate-translations.mts  (validar)`);
  console.log(`   2. npm run lint -- --fix                       (formatar)`);
  console.log(`   3. npm run build                               (testar build)`);
}

function updateSimpleField(
  content: string,
  fieldName: string,
  trans: Translation
): string {
  // Procura por: fieldName: { pt: "...", en: "..." }
  const pattern = new RegExp(
    `(${fieldName}\\s*:\\s*\\{\\s*)(pt\\s*:\\s*"[^"]*"\\s*,\\s*en\\s*:\\s*"[^"]*")(\\s*\\})`,
    "g"
  );

  return content.replace(pattern, (match, prefix, ptEnPart, suffix) => {
    const langs = buildLanguageObject(trans);
    return `${prefix}${langs}${suffix}`;
  });
}

function updateArrayField(
  content: string,
  fieldName: string,
  trans: Translation
): number {
  // Procura por: fieldName: { pt: [...], en: [...] }
  // Para cada item, adiciona as novas línguas

  let updated = 0;
  const itemPattern = new RegExp(
    `${fieldName}\\s*:\\s*\\{([^}]*)pt\\s*:\\s*\\[([^\\]]+)\\]`,
    "g"
  );

  // Lê todo o objeto do array field
  const match = content.match(
    new RegExp(
      `${fieldName}\\s*:\\s*\\{([\\s\\S]*?)\\}(?=\\s*[,}]|$)`,
      "m"
    )
  );

  if (!match) return 0;

  // Reconstrói o objeto com todas as línguas
  const objStart = match.index || 0;
  const objEnd = objStart + match[0].length;

  const rebuiltObj = rebuildArrayField(match[0], fieldName, trans);
  content =
    content.substring(0, objStart) + rebuiltObj + content.substring(objEnd);

  return 1;
}

function rebuildArrayField(
  fieldObj: string,
  fieldName: string,
  trans: Translation
): string {
  // Extrai arrays existentes
  const ptMatch = fieldObj.match(/pt\s*:\s*\[([^\]]*)\]/);
  const enMatch = fieldObj.match(/en\s*:\s*\[([^\]]*)\]/);

  if (!ptMatch || !enMatch) return fieldObj;

  const ptItems = parseArrayItems(ptMatch[1]);
  const enItems = parseArrayItems(enMatch[1]);

  // Encontra qual item atualizar
  const itemIndex = ptItems.findIndex((item) => item === trans.pt);
  if (itemIndex === -1) return fieldObj;

  // Atualiza todos os arrays
  const langArrays: Record<string, string[]> = {
    pt: ptItems,
    en: enItems,
  };

  for (const lang of [
    "es",
    "fr",
    "de",
    "it",
    "zh",
    "ja",
    "ru",
    "ar",
    "hi",
    "ko",
    "id",
  ]) {
    if ((trans as any)[lang]) {
      if (!langArrays[lang]) langArrays[lang] = [...ptItems];
      langArrays[lang][itemIndex] = (trans as any)[lang];
    }
  }

  // Reconstrói
  let newObj = `${fieldName}: {`;
  for (const [lang, items] of Object.entries(langArrays)) {
    const itemsStr = items
      .map((s) => `"${escapeString(s)}"`)
      .join(", ");
    newObj += `\n    ${lang}: [${itemsStr}],`;
  }
  newObj = newObj.slice(0, -1) + "\n  }"; // Remove última vírgula

  return newObj;
}

function buildLanguageObject(trans: Translation): string {
  const langs = ["pt", "en", "es", "fr", "de", "it", "zh", "ja", "ru", "ar", "hi", "ko", "id"];
  const parts: string[] = [];

  for (const lang of langs) {
    const value = (trans as any)[lang];
    if (value) {
      parts.push(`${lang}: "${escapeString(value)}"`);
    }
  }

  return `{ ${parts.join(", ")} }`;
}

function parseArrayItems(arrayStr: string): string[] {
  const items: string[] = [];
  const matches = arrayStr.match(/"([^"\\]*(?:\\.[^"\\]*)*)"/g) || [];

  for (const match of matches) {
    items.push(match.slice(1, -1).replace(/\\"/g, '"'));
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
  console.error(e.stack);
  process.exit(1);
});
