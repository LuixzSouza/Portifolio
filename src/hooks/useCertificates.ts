"use client";

import { useEffect, useState } from "react";
import { listCertificates } from "@/lib/api";
import type { Certificate } from "@/data/certificates";

/**
 * Certificados publicados da API (client-side). `initial` (dados estáticos) é o
 * fallback — só é substituído se a API trouxer certificados. O slug continua
 * sendo derivado de `course` no componente (a API usa o mesmo slugify).
 * Ver [[useTestimonials]].
 */
export function useCertificates(initial: Certificate[] = []): Certificate[] {
  const [items, setItems] = useState<Certificate[]>(initial);

  useEffect(() => {
    let active = true;
    listCertificates()
      .then((data) => {
        if (!active || data.length === 0) return;
        setItems(
          data.map((c) => ({
            course: c.course,
            issuer: c.issuer,
            date: c.date ?? "",
            file: c.file ?? "",
            image: c.image ?? "",
            description: c.description ?? { pt: "", en: "" },
            skills: c.skills,
          })),
        );
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  return items;
}
