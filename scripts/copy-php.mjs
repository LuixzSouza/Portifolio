// Copia o backend PHP (src/php) para dentro do export (out/php), para que um
// único upload de `out/` para public_html leve o site estático + a API.
//
// EXCLUI:
//   - config.php  → segredos reais; o servidor mantém o seu próprio (não versionado).
//   - sql/        → schema/seed importados à parte (phpMyAdmin); não precisam ser web.
//
//   node scripts/copy-php.mjs   (rode após `next build`)

import { cp, rm } from "node:fs/promises";
import { existsSync } from "node:fs";

const SRC = "src/php";
const DEST = "out/php";

if (!existsSync("out")) {
  console.error("Pasta out/ não existe. Rode `npm run build` antes.");
  process.exit(1);
}

const norm = (p) => p.replace(/\\/g, "/");
const EXCLUDED = [`${SRC}/config.php`, `${SRC}/sql`];

await rm(DEST, { recursive: true, force: true });
await cp(SRC, DEST, {
  recursive: true,
  filter: (src) => {
    const p = norm(src);
    return !EXCLUDED.some((ex) => p === ex || p.startsWith(`${ex}/`));
  },
});

console.log("OK: backend copiado para out/php (sem config.php nem sql/).");
console.log("No servidor: garanta public_html/php/config.php com as credenciais reais.");
