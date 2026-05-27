import { z } from "zod";
import { bilingual, localizedTextSchema, optionalUrl, pickLocalized } from "./shared";
import type { LocalizedText } from "@/lib/i18n";

export { localizedTextSchema };

/**
 * Linha crua que a API PHP retorna (colunas do MySQL). O PHP é responsável por
 * fazer o cast dos tipos: `tecnologias` via json_decode, `publicado` em boolean,
 * inteiros em number. Este schema valida a resposta antes de usá-la no front.
 */
export const apiProjectSchema = z.object({
  id: z.number().int(),
  slug: z.string().min(1),
  nome: z.string().min(1),
  imagem: z.string().nullable(),
  tecnologias: z.array(z.string()),
  link_linkedin: z.string().nullable(),
  link_github: z.string().nullable(),
  link_ver_projeto: z.string().nullable(),
  descricao_pt: z.string().nullable(),
  descricao_en: z.string().nullable(),
  data_pt: z.string().nullable(),
  data_en: z.string().nullable(),
  ordem: z.number().int(),
  publicado: z.boolean(),
});
export type ApiProject = z.infer<typeof apiProjectSchema>;

export const apiProjectsListSchema = z.array(apiProjectSchema);

/** Envelopes de resposta da API PHP. */
export const projectsListResponseSchema = z.object({ projects: apiProjectsListSchema });
export const projectResponseSchema = z.object({ project: apiProjectSchema });

export interface ProjectLinks {
  linkedin?: string;
  github?: string;
  verProjeto?: string;
}

/** Modelo de domínio consumido pelos componentes do front. */
export interface Project {
  id: number;
  slug: string;
  nome: string;
  imagem?: string;
  tecnologias: string[];
  links: ProjectLinks;
  descricao?: LocalizedText;
  data?: LocalizedText;
  ordem: number;
  publicado: boolean;
}

/** Converte a linha da API no modelo de domínio usado pela UI. */
export function apiProjectToProject(row: ApiProject): Project {
  return {
    id: row.id,
    slug: row.slug,
    nome: row.nome,
    imagem: row.imagem ?? undefined,
    tecnologias: row.tecnologias,
    links: {
      linkedin: row.link_linkedin ?? undefined,
      github: row.link_github ?? undefined,
      verProjeto: row.link_ver_projeto ?? undefined,
    },
    descricao: pickLocalized(row.descricao_pt, row.descricao_en),
    data: pickLocalized(row.data_pt, row.data_en),
    ordem: row.ordem,
    publicado: row.publicado,
  };
}

/** Payload de criação/edição enviado pelo painel ao backend. */
export const projectInputSchema = z.object({
  nome: z.string().min(1, "Informe o nome do projeto."),
  imagem: z.string().optional(),
  tecnologias: z.array(z.string().min(1)),
  links: z.object({
    linkedin: optionalUrl,
    github: optionalUrl,
    verProjeto: optionalUrl,
  }),
  descricao: bilingual.optional(),
  data: bilingual.optional(),
  publicado: z.boolean(),
});
export type ProjectInput = z.infer<typeof projectInputSchema>;
