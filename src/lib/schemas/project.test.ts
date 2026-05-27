import { describe, it, expect } from "vitest";
import {
  apiProjectSchema,
  apiProjectToProject,
  localizedTextSchema,
  projectInputSchema,
  type ApiProject,
} from "./project";

const validRow: ApiProject = {
  id: 1,
  slug: "casa-pronta",
  nome: "Casa Pronta",
  imagem: "/image/p.webp",
  tecnologias: ["Next.js", "PHP"],
  link_linkedin: "https://www.linkedin.com/in/x",
  link_github: null,
  link_ver_projeto: "https://casaprontaconstrusilva.com.br",
  descricao_pt: "Projeto real",
  descricao_en: "Real project",
  data_pt: "20 de Janeiro 2025",
  data_en: "January 20, 2025",
  ordem: 0,
  publicado: true,
};

describe("apiProjectSchema", () => {
  it("aceita uma linha válida da API", () => {
    expect(apiProjectSchema.safeParse(validRow).success).toBe(true);
  });

  it("rejeita slug ausente/vazio", () => {
    expect(apiProjectSchema.safeParse({ ...validRow, slug: "" } as unknown).success).toBe(false);
  });

  it("rejeita tecnologias que não são array de strings", () => {
    expect(apiProjectSchema.safeParse({ ...validRow, tecnologias: "Next.js" } as unknown).success).toBe(false);
  });

  it("rejeita publicado como número (espera boolean já convertido pelo PHP)", () => {
    expect(apiProjectSchema.safeParse({ ...validRow, publicado: 1 } as unknown).success).toBe(false);
  });
});

describe("apiProjectToProject", () => {
  it("agrupa _pt/_en em LocalizedText { pt, en } e monta os links", () => {
    const p = apiProjectToProject(validRow);
    expect(p.descricao).toEqual({ pt: "Projeto real", en: "Real project" });
    expect(p.data).toEqual({ pt: "20 de Janeiro 2025", en: "January 20, 2025" });
    expect(p.links).toEqual({
      linkedin: "https://www.linkedin.com/in/x",
      github: undefined,
      verProjeto: "https://casaprontaconstrusilva.com.br",
    });
  });

  it("usa string simples quando só um idioma existe", () => {
    const p = apiProjectToProject({ ...validRow, descricao_en: null });
    expect(p.descricao).toBe("Projeto real");
  });

  it("omite o campo quando ambos os idiomas são nulos", () => {
    const p = apiProjectToProject({ ...validRow, data_pt: null, data_en: null });
    expect(p.data).toBeUndefined();
  });

  it("converte imagem null em undefined", () => {
    const p = apiProjectToProject({ ...validRow, imagem: null });
    expect(p.imagem).toBeUndefined();
  });
});

describe("localizedTextSchema", () => {
  it("aceita string", () => {
    expect(localizedTextSchema.safeParse("oi").success).toBe(true);
  });
  it("aceita { pt, en }", () => {
    expect(localizedTextSchema.safeParse({ pt: "oi", en: "hi" }).success).toBe(true);
  });
  it("aceita mapa parcial (subconjunto de idiomas)", () => {
    // Multilíngue: nem todo campo tem os 13 idiomas; o fallback resolve no pickText.
    expect(localizedTextSchema.safeParse({ pt: "oi" }).success).toBe(true);
    expect(localizedTextSchema.safeParse({ es: "hola", ja: "やあ" }).success).toBe(true);
  });
  it("rejeita chave de idioma desconhecida", () => {
    expect(localizedTextSchema.safeParse({ xx: "?" }).success).toBe(false);
  });
  it("rejeita tipos não suportados", () => {
    expect(localizedTextSchema.safeParse(42).success).toBe(false);
  });
});

describe("projectInputSchema", () => {
  const validInput = {
    nome: "Novo Projeto",
    tecnologias: ["React"],
    links: { linkedin: "", github: "https://github.com/x", verProjeto: "" },
    publicado: true,
  };

  it("aceita um payload válido (URLs vazias permitidas)", () => {
    expect(projectInputSchema.safeParse(validInput).success).toBe(true);
  });

  it("rejeita nome vazio", () => {
    expect(projectInputSchema.safeParse({ ...validInput, nome: "" }).success).toBe(false);
  });

  it("rejeita URL inválida", () => {
    const bad = { ...validInput, links: { github: "nao-e-url" } };
    expect(projectInputSchema.safeParse(bad).success).toBe(false);
  });
});
