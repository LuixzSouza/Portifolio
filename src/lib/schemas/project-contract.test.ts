import { describe, it, expect } from "vitest";
import {
  apiProjectToProject,
  projectResponseSchema,
  projectsListResponseSchema,
} from "./project";

/**
 * Contrato com o backend PHP (src/php/api/projects.php → project_row_to_api).
 * Estes fixtures espelham EXATAMENTE o JSON que a API devolve. Se o PHP mudar o
 * formato, este teste quebra — é o nosso "aviso" já que o PHP não roda nos testes.
 */
const rowComTudo = {
  id: 1,
  slug: "casa-pronta",
  nome: "Casa Pronta",
  imagem: "/uploads/abc123.webp",
  tecnologias: ["Next.js", "React", "PHP"],
  link_linkedin: "https://www.linkedin.com/in/x",
  link_github: "https://github.com/LuixzSouza",
  link_ver_projeto: "https://casaprontaconstrusilva.com.br",
  descricao_pt: "Projeto real",
  descricao_en: "Real project",
  data_pt: "20 de Janeiro 2025",
  data_en: "January 20, 2025",
  ordem: 0,
  publicado: true,
};

// Linha com os campos opcionais nulos (como o PHP devolve quando vazios).
const rowComNulos = {
  ...rowComTudo,
  id: 2,
  slug: "rascunho",
  imagem: null,
  link_linkedin: null,
  link_github: null,
  link_ver_projeto: null,
  descricao_pt: null,
  descricao_en: null,
  data_pt: null,
  data_en: null,
  publicado: false,
};

describe("contrato da API de projetos", () => {
  it("valida a resposta de ?action=list ({ projects: [...] })", () => {
    const res = projectsListResponseSchema.safeParse({ projects: [rowComTudo, rowComNulos] });
    expect(res.success).toBe(true);
  });

  it("valida a resposta de ?action=get ({ project: {...} })", () => {
    const res = projectResponseSchema.safeParse({ project: rowComTudo });
    expect(res.success).toBe(true);
  });

  it("mapeia a linha da API para o domínio, mesmo com nulos", () => {
    const p = apiProjectToProject(rowComNulos);
    expect(p.imagem).toBeUndefined();
    expect(p.descricao).toBeUndefined();
    expect(p.links).toEqual({ linkedin: undefined, github: undefined, verProjeto: undefined });
    expect(p.publicado).toBe(false);
    expect(p.tecnologias).toEqual(["Next.js", "React", "PHP"]);
  });
});
