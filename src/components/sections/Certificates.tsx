"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useCursorFollow } from "@/hooks/useCursorFollow";
import { Container } from "@/components/ds/Container";
import { Section } from "@/components/ds/Section";
import { Heading } from "@/components/ds/Heading";
import { Text } from "@/components/ds/Text";
import { Eyebrow } from "@/components/ds/Eyebrow";
import { Reveal } from "@/components/ds/Reveal";
import { certificates, type Certificate } from "@/data/certificates";
import { useCertificates } from "@/hooks/useCertificates";
import { slugify } from "@/lib/slug";
import { useTranslations } from "@/content/useTranslations";
import { useLocalizedHref } from "@/lib/useLocale";

export function Certificates({ items: initial = certificates }: { items?: Certificate[] }) {
  const t = useTranslations();
  const loc = useLocalizedHref();
  const items = useCertificates(initial);
  const [active, setActive] = useState<number | null>(null);
  const { x, y, follow } = useCursorFollow({ damping: 25, stiffness: 200, mass: 0.5 });

  return (
    <Section id="certificados" className="border-t border-foreground/10">
      <Container>
        <Reveal className="mb-14 flex flex-col gap-5 md:mb-20">
          <Eyebrow>{t.about.certificates.eyebrow}</Eyebrow>
          <Heading size="display-md" className="max-w-[16ch]">
            {t.about.certificates.headingLead}{" "}
            <span className="font-serif font-normal italic">{t.about.certificates.headingEmphasis}</span>
          </Heading>
          <Text tone="muted" size="lg" measure>
            {t.about.certificates.text}
          </Text>
        </Reveal>

        <ul onMouseMove={follow} className="relative flex flex-col">
          {items.map((c, i) => {
            const isActive = active === i;
            return (
              <Reveal key={c.course} delay={(i % 2) * 0.05}>
                <li>
                  <Link
                    href={loc(`/certificates/${slugify(c.course)}`)}
                    onMouseEnter={() => setActive(i)}
                    onMouseLeave={() => setActive(null)}
                    className={`group grid grid-cols-1 items-center gap-2 border-t border-foreground/10 py-6 transition-all duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] md:grid-cols-12 md:gap-6 md:py-7 ${
                      active !== null && !isActive ? "opacity-40" : "opacity-100"
                    }`}
                  >
                    <span className="font-mono text-sm text-muted md:col-span-1">{c.date}</span>
                    <Heading
                      as="h3"
                      size="display-sm"
                      className="text-xl transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-x-1.5 md:col-span-7 md:text-2xl"
                    >
                      {c.course}
                    </Heading>
                    <span className="text-sm text-muted md:col-span-3">{c.issuer}</span>
                    <span className="hidden items-center justify-end md:col-span-1 md:flex">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-500 group-hover:bg-foreground">
                        <ArrowUpRight
                          className="h-6 w-6 text-muted transition-all duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:rotate-45 group-hover:text-background"
                          strokeWidth={1.75}
                        />
                      </span>
                    </span>
                  </Link>
                </li>
              </Reveal>
            );
          })}

          {/* Preview da imagem do certificado seguindo o cursor */}
          <motion.div
            style={{ x, y, translateX: "-50%", translateY: "-115%" }}
            className="pointer-events-none fixed left-0 top-0 z-40 hidden lg:block"
          >
            <motion.div
              initial={false}
              animate={{
                scale: active !== null ? 1 : 0.8,
                opacity: active !== null ? 1 : 0,
                rotate: active !== null ? 0 : 4,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative h-56 w-80 overflow-hidden rounded-2xl border border-foreground/10 bg-surface shadow-2xl"
            >
              {items.map((c, i) => (
                <Image
                  key={c.course}
                  src={c.image}
                  alt={c.course}
                  fill
                  sizes="320px"
                  className={`object-cover transition-opacity duration-300 ${
                    active === i ? "z-10 opacity-100" : "z-0 opacity-0"
                  }`}
                />
              ))}
            </motion.div>
          </motion.div>
        </ul>
      </Container>
    </Section>
  );
}
