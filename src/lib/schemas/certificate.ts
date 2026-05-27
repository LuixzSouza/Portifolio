import { z } from "zod";
import { bilingual, pickLocalized } from "./shared";
import type { LocalizedText } from "@/lib/i18n";

/** Linha crua de certificates.php → certificate_row_to_api. */
export const apiCertificateSchema = z.object({
  id: z.number().int(),
  slug: z.string().min(1),
  course: z.string().min(1),
  issuer: z.string(),
  date: z.string().nullable(),
  file: z.string().nullable(),
  image: z.string().nullable(),
  descricao_pt: z.string().nullable(),
  descricao_en: z.string().nullable(),
  skills: z.array(z.string()),
  ordem: z.number().int(),
  publicado: z.boolean(),
});
export type ApiCertificate = z.infer<typeof apiCertificateSchema>;

export const certificatesListResponseSchema = z.object({
  certificates: z.array(apiCertificateSchema),
});
export const certificateResponseSchema = z.object({ certificate: apiCertificateSchema });

/** Modelo de domínio consumido pela UI. */
export interface Certificate {
  id: number;
  slug: string;
  course: string;
  issuer: string;
  date?: string;
  file?: string;
  image?: string;
  description?: LocalizedText;
  skills: string[];
  ordem: number;
  publicado: boolean;
}

export function apiCertificateToCertificate(row: ApiCertificate): Certificate {
  return {
    id: row.id,
    slug: row.slug,
    course: row.course,
    issuer: row.issuer,
    date: row.date ?? undefined,
    file: row.file ?? undefined,
    image: row.image ?? undefined,
    description: pickLocalized(row.descricao_pt, row.descricao_en),
    skills: row.skills,
    ordem: row.ordem,
    publicado: row.publicado,
  };
}

/** Payload de criação/edição enviado pelo painel. */
export const certificateInputSchema = z.object({
  course: z.string().min(1, "Informe o nome do curso."),
  issuer: z.string().optional(),
  date: z.string().optional(),
  file: z.string().optional(),
  image: z.string().optional(),
  descricao: bilingual.optional(),
  skills: z.array(z.string().min(1)),
  publicado: z.boolean(),
});
export type CertificateInput = z.infer<typeof certificateInputSchema>;
