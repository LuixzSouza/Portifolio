import { describe, it, expect } from "vitest";
import { apiCertificateToCertificate, certificatesListResponseSchema } from "./certificate";
import { apiTestimonialToTestimonial, testimonialsListResponseSchema } from "./testimonial";
import { apiMilestoneToMilestone, milestonesListResponseSchema } from "./milestone";
import { apiSkillGroupToSkillGroup, skillGroupsResponseSchema } from "./skill";
import { apiServiceToService, servicesListResponseSchema } from "./service";
import { contentMapResponseSchema, getFacts, getList, getText } from "./content";

/**
 * Contrato com o backend PHP (src/php/api/*.php → *_row_to_api). Estes fixtures
 * espelham EXATAMENTE o JSON que cada endpoint devolve. Se o PHP mudar o formato,
 * o teste quebra — é o aviso, já que o PHP não roda nos testes.
 */

describe("contrato — certificados", () => {
  const row = {
    id: 1,
    slug: "especialista-php",
    course: "Especialista PHP",
    issuer: "Rocketseat",
    date: "2024",
    file: "/certificates/x.pdf",
    image: "/certificates/x.webp",
    descricao_pt: "Formação PHP",
    descricao_en: "PHP training",
    skills: ["PHP", "MySQL"],
    ordem: 0,
    publicado: true,
  };

  it("valida ?action=list", () => {
    expect(certificatesListResponseSchema.safeParse({ certificates: [row] }).success).toBe(true);
  });

  it("mapeia _pt/_en em LocalizedText e nulos em undefined", () => {
    const c = apiCertificateToCertificate(row);
    expect(c.description).toEqual({ pt: "Formação PHP", en: "PHP training" });
    const semImagem = apiCertificateToCertificate({ ...row, image: null, descricao_en: null });
    expect(semImagem.image).toBeUndefined();
    expect(semImagem.description).toBe("Formação PHP");
  });
});

describe("contrato — depoimentos", () => {
  const row = {
    id: 1,
    name: "Eduardo Souza",
    role_pt: "Visual Design",
    role_en: "Visual Design",
    quote_pt: "Ótimo dev",
    quote_en: "Great dev",
    image: "/image/edu.webp",
    ordem: 0,
    publicado: true,
  };

  it("valida ?action=list", () => {
    expect(testimonialsListResponseSchema.safeParse({ testimonials: [row] }).success).toBe(true);
  });

  it("mapeia role/quote", () => {
    const t = apiTestimonialToTestimonial(row);
    expect(t.role).toEqual({ pt: "Visual Design", en: "Visual Design" });
    expect(t.quote).toEqual({ pt: "Ótimo dev", en: "Great dev" });
  });
});

describe("contrato — timeline", () => {
  const row = {
    id: 1,
    year_pt: "Hoje",
    year_en: "Today",
    title_pt: "Clean code",
    title_en: "Clean code",
    desc_pt: "Evolução",
    desc_en: "Growth",
    techs: ["TDD"],
    ordem: 0,
    publicado: true,
  };

  it("valida ?action=list", () => {
    expect(milestonesListResponseSchema.safeParse({ milestones: [row] }).success).toBe(true);
  });

  it("year é sempre LocalizedText", () => {
    const m = apiMilestoneToMilestone(row);
    expect(m.year).toEqual({ pt: "Hoje", en: "Today" });
    expect(m.techs).toEqual(["TDD"]);
  });
});

describe("contrato — skills", () => {
  const group = {
    id: 1,
    category_pt: "Front-end",
    category_en: "Front-end",
    ordem: 0,
    skills: [{ id: 10, name: "React", level: 4 }],
  };

  it("valida ?action=list", () => {
    expect(skillGroupsResponseSchema.safeParse({ skillGroups: [group] }).success).toBe(true);
  });

  it("rejeita level fora de 1..5", () => {
    const bad = { ...group, skills: [{ id: 10, name: "React", level: 9 }] };
    expect(skillGroupsResponseSchema.safeParse({ skillGroups: [bad] }).success).toBe(false);
  });

  it("mapeia category para LocalizedText", () => {
    const g = apiSkillGroupToSkillGroup(group);
    expect(g.category).toEqual({ pt: "Front-end", en: "Front-end" });
    expect(g.skills[0]).toEqual({ id: 10, name: "React", level: 4 });
  });
});

describe("contrato — serviços", () => {
  const row = {
    id: 1,
    slug: "sites",
    n: "01",
    image: "/services/sites.webp",
    accent: "#5B8DEF",
    title_pt: "Sites",
    title_en: "Websites",
    tagline_pt: "tl pt",
    tagline_en: "tl en",
    intro_pt: "in pt",
    intro_en: "in en",
    forwho_pt: "fw pt",
    forwho_en: "fw en",
    process: [{ title: { pt: "Descoberta", en: "Discovery" }, desc: { pt: "d pt", en: "d en" } }],
    includes: [{ pt: "Design", en: "Design" }],
    tags: ["SEO"],
    meta_title_pt: "mt pt",
    meta_title_en: "mt en",
    meta_description_pt: "md pt",
    meta_description_en: "md en",
    ordem: 0,
    publicado: true,
  };

  it("valida ?action=list", () => {
    expect(servicesListResponseSchema.safeParse({ services: [row] }).success).toBe(true);
  });

  it("mapeia process/includes e campos bilíngues", () => {
    const s = apiServiceToService(row);
    expect(s.title).toEqual({ pt: "Sites", en: "Websites" });
    expect(s.process[0].title).toEqual({ pt: "Descoberta", en: "Discovery" });
    expect(s.includes[0]).toEqual({ pt: "Design", en: "Design" });
    expect(s.tags).toEqual(["SEO"]);
  });
});

describe("contrato — content (textos de seção)", () => {
  const map = {
    content: {
      "about.bio": { tipo: "text", valor: { pt: "Bio PT", en: "Bio EN" } },
      "about.story.paragraphs": { tipo: "list", valor: { pt: ["p1"], en: ["p1"] } },
      "about.facts": {
        tipo: "facts",
        valor: [{ label: { pt: "Base", en: "Based in" }, value: { pt: "MG", en: "MG" } }],
      },
    },
  };

  it("valida ?action=list", () => {
    expect(contentMapResponseSchema.safeParse(map).success).toBe(true);
  });

  it("getters validam o valor por tipo", () => {
    const parsed = contentMapResponseSchema.parse(map).content;
    expect(getText(parsed, "about.bio")).toEqual({ pt: "Bio PT", en: "Bio EN" });
    expect(getList(parsed, "about.story.paragraphs")).toEqual({ pt: ["p1"], en: ["p1"] });
    expect(getFacts(parsed, "about.facts")?.[0].label).toEqual({ pt: "Base", en: "Based in" });
    expect(getText(parsed, "inexistente")).toBeUndefined();
  });
});
