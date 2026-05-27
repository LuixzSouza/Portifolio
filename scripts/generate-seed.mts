/**
 * Gera src/php/sql/seed.sql a partir dos dados tipados em src/data/*.
 * Mantém o seed em sincronia com o conteúdo do front (sem transcrição manual).
 *
 *   npx tsx scripts/generate-seed.mts
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

import { projetos } from "../src/data/projects";
import { certificates } from "../src/data/certificates";
import { testimonials } from "../src/data/testimonials";
import { skillGroups } from "../src/data/skills";
import { milestones } from "../src/data/timeline";
import { services } from "../src/data/services";
import { aboutBio, aboutFacts, storyQuote, storyParagraphs } from "../src/data/about";
import { slugify } from "../src/lib/slug";
import type { LocalizedText } from "../src/lib/i18n";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "../src/php/sql/seed.sql");

/** Literal SQL: string entre aspas ou NULL. */
function s(v: string | null | undefined): string {
  if (v === null || v === undefined || v === "") return "NULL";
  return "'" + v.replace(/\\/g, "\\\\").replace(/'/g, "\\'") + "'";
}

/** Coluna JSON a partir de um valor serializável. */
function j(v: unknown): string {
  return s(JSON.stringify(v));
}

const pt = (v: LocalizedText): string => (typeof v === "string" ? v : v.pt);
const en = (v: LocalizedText): string => (typeof v === "string" ? v : v.en);
const optPt = (v?: LocalizedText): string | null => (v === undefined ? null : pt(v));
const optEn = (v?: LocalizedText): string | null => (v === undefined ? null : en(v));

/** Garante slugs únicos dentro de uma mesma tabela. */
function uniqueSlugger() {
  const seen = new Map<string, number>();
  return (base: string): string => {
    const b = base || "item";
    const n = (seen.get(b) ?? 0) + 1;
    seen.set(b, n);
    return n === 1 ? b : `${b}-${n}`;
  };
}

const out: string[] = [];
out.push("-- Seed gerado por scripts/generate-seed.mts — NÃO editar à mão.");
out.push("-- Reflete o conteúdo de src/data/* no momento da geração.");
out.push("SET NAMES utf8mb4;");
out.push("");

// --- Projetos ---
const projSlug = uniqueSlugger();
out.push("-- Projetos");
projetos.forEach((p, i) => {
  const slug = projSlug(slugify(p.nome));
  out.push(
    "INSERT INTO projects (slug, nome, imagem, tecnologias, link_linkedin, link_github, link_ver_projeto, descricao_pt, descricao_en, data_pt, data_en, ordem, publicado) VALUES (" +
      [
        s(slug),
        s(p.nome),
        s(p.imagem),
        j(p.tecnologias),
        s(p.links.linkedin),
        s(p.links.github),
        s(p.links.verProjeto),
        s(optPt(p.descricao)),
        s(optEn(p.descricao)),
        s(optPt(p.data)),
        s(optEn(p.data)),
        i,
        1,
      ].join(", ") +
      ");"
  );
});
out.push("");

// --- Certificados ---
const certSlug = uniqueSlugger();
out.push("-- Certificados");
certificates.forEach((c, i) => {
  const slug = certSlug(slugify(c.course));
  out.push(
    "INSERT INTO certificates (slug, course, issuer, data_curso, file, image, descricao_pt, descricao_en, skills, ordem, publicado) VALUES (" +
      [
        s(slug),
        s(c.course),
        s(c.issuer),
        s(c.date),
        s(c.file),
        s(c.image),
        s(pt(c.description)),
        s(en(c.description)),
        j(c.skills),
        i,
        1,
      ].join(", ") +
      ");"
  );
});
out.push("");

// --- Depoimentos ---
out.push("-- Depoimentos");
testimonials.forEach((t, i) => {
  out.push(
    "INSERT INTO testimonials (nome, role_pt, role_en, quote_pt, quote_en, image, ordem, publicado) VALUES (" +
      [s(t.name), s(pt(t.role)), s(en(t.role)), s(pt(t.quote)), s(en(t.quote)), s(t.image), i, 1].join(", ") +
      ");"
  );
});
out.push("");

// --- Skills (grupos + skills) ---
out.push("-- Skills");
skillGroups.forEach((g, gi) => {
  out.push(
    "INSERT INTO skill_groups (category_pt, category_en, ordem) VALUES (" +
      [s(pt(g.category)), s(en(g.category)), gi].join(", ") +
      ");"
  );
  out.push("SET @gid = LAST_INSERT_ID();");
  g.skills.forEach((sk, si) => {
    out.push(
      "INSERT INTO skills (group_id, name, level, ordem) VALUES (" +
        ["@gid", s(sk.name), sk.level, si].join(", ") +
        ");"
    );
  });
});
out.push("");

// --- Timeline ---
out.push("-- Timeline (marcos)");
milestones.forEach((m, i) => {
  out.push(
    "INSERT INTO milestones (year_pt, year_en, title_pt, title_en, desc_pt, desc_en, techs, ordem, publicado) VALUES (" +
      [
        s(pt(m.year)),
        s(en(m.year)),
        s(pt(m.title)),
        s(en(m.title)),
        s(pt(m.desc)),
        s(en(m.desc)),
        j(m.techs),
        i,
        1,
      ].join(", ") +
      ");"
  );
});
out.push("");

// --- Serviços ---
out.push("-- Serviços");
services.forEach((sv, i) => {
  const process = sv.process.map((step) => ({
    title: { pt: pt(step.title), en: en(step.title) },
    desc: { pt: pt(step.desc), en: en(step.desc) },
  }));
  const includes = sv.includes.map((it) => ({ pt: pt(it), en: en(it) }));
  out.push(
    "INSERT INTO services (slug, n, image, accent, title_pt, title_en, tagline_pt, tagline_en, intro_pt, intro_en, forwho_pt, forwho_en, process, includes, tags, meta_title_pt, meta_title_en, meta_description_pt, meta_description_en, ordem, publicado) VALUES (" +
      [
        s(sv.slug),
        s(sv.n),
        s(sv.image),
        s(sv.accent),
        s(pt(sv.title)),
        s(en(sv.title)),
        s(pt(sv.tagline)),
        s(en(sv.tagline)),
        s(pt(sv.intro)),
        s(en(sv.intro)),
        s(pt(sv.forWho)),
        s(en(sv.forWho)),
        j(process),
        j(includes),
        j(sv.tags),
        s(pt(sv.metaTitle)),
        s(en(sv.metaTitle)),
        s(pt(sv.metaDescription)),
        s(en(sv.metaDescription)),
        i,
        1,
      ].join(", ") +
      ");"
  );
});
out.push("");

// --- Textos de seção (about) ---
out.push("-- Textos de seção (about)");
const facts = aboutFacts.map((f) => ({
  label: { pt: pt(f.label), en: en(f.label) },
  value: { pt: pt(f.value), en: en(f.value) },
}));
const sectionRows: Array<[string, string, unknown]> = [
  ["about.bio", "text", { pt: pt(aboutBio), en: en(aboutBio) }],
  ["about.story.quote", "text", { pt: pt(storyQuote), en: en(storyQuote) }],
  ["about.story.paragraphs", "list", { pt: storyParagraphs.pt, en: storyParagraphs.en }],
  ["about.facts", "facts", facts],
];
sectionRows.forEach(([chave, tipo, valor]) => {
  out.push(
    "INSERT INTO section_content (chave, tipo, valor) VALUES (" +
      [s(chave), s(tipo), j(valor)].join(", ") +
      ");"
  );
});
out.push("");

writeFileSync(OUT, out.join("\n"), "utf8");
console.log(`Seed gerado: ${OUT} (${out.length} linhas)`);
