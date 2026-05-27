import { z } from "zod";
import { bilingual, pickLocalized } from "./shared";
import type { LocalizedText } from "@/lib/i18n";

/** Linha crua de testimonials.php → testimonial_row_to_api. */
export const apiTestimonialSchema = z.object({
  id: z.number().int(),
  name: z.string().min(1),
  role_pt: z.string().nullable(),
  role_en: z.string().nullable(),
  quote_pt: z.string().nullable(),
  quote_en: z.string().nullable(),
  image: z.string().nullable(),
  ordem: z.number().int(),
  publicado: z.boolean(),
});
export type ApiTestimonial = z.infer<typeof apiTestimonialSchema>;

export const testimonialsListResponseSchema = z.object({
  testimonials: z.array(apiTestimonialSchema),
});
export const testimonialResponseSchema = z.object({ testimonial: apiTestimonialSchema });

/** Modelo de domínio consumido pela UI. */
export interface Testimonial {
  id: number;
  name: string;
  role?: LocalizedText;
  quote?: LocalizedText;
  image?: string;
  ordem: number;
  publicado: boolean;
}

export function apiTestimonialToTestimonial(row: ApiTestimonial): Testimonial {
  return {
    id: row.id,
    name: row.name,
    role: pickLocalized(row.role_pt, row.role_en),
    quote: pickLocalized(row.quote_pt, row.quote_en),
    image: row.image ?? undefined,
    ordem: row.ordem,
    publicado: row.publicado,
  };
}

/** Payload de criação/edição enviado pelo painel. */
export const testimonialInputSchema = z.object({
  name: z.string().min(1, "Informe o nome."),
  role: bilingual.optional(),
  quote: bilingual.optional(),
  image: z.string().optional(),
  publicado: z.boolean(),
});
export type TestimonialInput = z.infer<typeof testimonialInputSchema>;
