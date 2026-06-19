"use client";

import { listCertificates } from "@/lib/api";
import { useCmsList } from "./useCmsList";
import type { Certificate } from "@/data/certificates";

/**
 * Certificados publicados da API (client-side). `initial` (dados estáticos) é o
 * fallback — só é substituído se a API trouxer certificados. O slug continua
 * sendo derivado de `course` no componente (a API usa o mesmo slugify).
 * Mecânica compartilhada em [[useCmsList]].
 */
export function useCertificates(initial: Certificate[] = []): Certificate[] {
  return useCmsList(
    listCertificates,
    (data) =>
      data.map((c) => ({
        course: c.course,
        issuer: c.issuer,
        date: c.date ?? "",
        file: c.file ?? "",
        image: c.image ?? "",
        description: c.description ?? { pt: "", en: "" },
        skills: c.skills,
      })),
    initial,
  );
}
