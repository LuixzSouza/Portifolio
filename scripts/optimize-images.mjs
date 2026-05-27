// Converte imagens de /public para formatos modernos e leves.
// - imgShareCover -> JPG (OG image: máxima compatibilidade com redes sociais)
// - demais PNG/JPG -> WebP (qualidade 80, largura máx. 1600px)
// Remove os originais após converter. Rode com: node scripts/optimize-images.mjs
import { readdir, stat, rm } from "node:fs/promises";
import { join, extname, basename, dirname } from "node:path";
import sharp from "sharp";

const PUBLIC = "public";
const MAX_WIDTH = 1600;
const exts = new Set([".png", ".jpg", ".jpeg"]);

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

function fmt(bytes) {
  return `${(bytes / 1024).toFixed(0)}KB`;
}

const files = (await walk(PUBLIC)).filter((f) => exts.has(extname(f).toLowerCase()));
let before = 0;
let after = 0;

for (const file of files) {
  const srcSize = (await stat(file)).size;
  before += srcSize;

  const name = basename(file, extname(file));
  const isOg = name === "imgShareCover";
  const out = join(dirname(file), `${name}.${isOg ? "jpg" : "webp"}`);

  // Idempotente: pula se a saída seria o próprio arquivo (ex.: OG .jpg já gerada).
  if (out === file) {
    after += srcSize;
    continue;
  }

  let pipeline = sharp(file).resize({
    width: MAX_WIDTH,
    withoutEnlargement: true,
  });
  pipeline = isOg
    ? pipeline.jpeg({ quality: 82, mozjpeg: true })
    : pipeline.webp({ quality: 80 });

  await pipeline.toFile(out);
  const outSize = (await stat(out)).size;
  after += outSize;

  if (out !== file) await rm(file);
  console.log(`${basename(file)} ${fmt(srcSize)} -> ${basename(out)} ${fmt(outSize)}`);
}

console.log(
  `\nTotal: ${fmt(before)} -> ${fmt(after)} (-${(((before - after) / before) * 100).toFixed(0)}%) em ${files.length} imagens`,
);
