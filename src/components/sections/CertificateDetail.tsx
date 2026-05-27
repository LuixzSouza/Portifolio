"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocalizedHref } from "@/lib/useLocale";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ds/Container";
import { Section } from "@/components/ds/Section";
import { Heading } from "@/components/ds/Heading";
import { Text } from "@/components/ds/Text";
import { Eyebrow } from "@/components/ds/Eyebrow";
import { Reveal } from "@/components/ds/Reveal";
import { ArrowButton } from "@/components/ds/ArrowButton";
import { certificates } from "@/data/certificates";
import { useCertificates } from "@/hooks/useCertificates";
import { slugify } from "@/lib/slug";
import { useTranslations } from "@/content/useTranslations";
import { useLanguage } from "@/components/ds/LanguageProvider";
import { pickText } from "@/lib/i18n";

const EASE = [0.76, 0, 0.24, 1] as const;

export function CertificateDetail({ slug }: { slug: string }) {
  const t = useTranslations();
  const loc = useLocalizedHref();
  const { lang } = useLanguage();
  const items = useCertificates(certificates);
  const cert = items.find((c) => slugify(c.course) === slug);

  if (!cert) {
    return (
      <Section className="flex min-h-[70vh] items-center pt-28 md:pt-36">
        <Container>
          <div className="flex flex-col items-center gap-6 text-center">
            <Heading size="display-md">404</Heading>
            <ArrowButton href="/about#certificados" variant="solid">
              {t.certificateDetail.back}
            </ArrowButton>
          </div>
        </Container>
      </Section>
    );
  }

  const { course, issuer, date, file, image, description, skills } = cert;
  const others = items.filter((c) => slugify(c.course) !== slug);

  return (
    <Section className="pt-32 md:pt-40">
      <Container>
        <Link
          href={loc("/about#certificados")}
          className="group flex w-fit items-center gap-3 text-sm font-semibold uppercase tracking-widest text-muted transition-colors hover:text-foreground"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 transition-colors duration-300 group-hover:border-foreground/40 group-hover:bg-foreground/5">
            <ArrowLeft className="h-4 w-4 transition-transform duration-500 group-hover:-translate-x-1" />
          </span>
          {t.certificateDetail.back}
        </Link>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Imagem do certificado */}
          <motion.div
            initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
            animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-foreground/10 bg-surface-2">
              <Image src={image} alt={course} fill priority sizes="(max-width: 1024px) 100vw, 60vw" className="object-contain p-3" />
            </div>
          </motion.div>

          {/* Informações */}
          <div className="flex flex-col gap-7 lg:col-span-5">
            <Eyebrow>{t.certificateDetail.label}</Eyebrow>
            <Heading as="h1" size="display-md" className="tracking-tight">
              {course}
            </Heading>

            <div className="grid grid-cols-2 gap-6 border-y border-foreground/10 py-5">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold uppercase tracking-widest text-muted">
                  {t.certificateDetail.issuer}
                </span>
                <span className="font-roobert text-lg">{issuer}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold uppercase tracking-widest text-muted">
                  {t.certificateDetail.date}
                </span>
                <span className="font-roobert text-lg">{date}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted">
                {t.certificateDetail.about}
              </span>
              <Text tone="muted" className="leading-relaxed">
                {pickText(description, lang)}
              </Text>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted">
                {t.certificateDetail.skills}
              </span>
              <ul className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-foreground/15 px-3 py-1 text-xs font-medium text-muted"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-2">
              <ArrowButton href={file} target="_blank" rel="noopener noreferrer" variant="solid">
                {t.certificateDetail.viewPdf}
              </ArrowButton>
            </div>
          </div>
        </div>

        {/* Outros certificados */}
        <div className="mt-20 border-t border-foreground/15 pt-8 md:mt-32">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted">
            {t.certificateDetail.others}
          </span>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((c) => (
              <Reveal key={c.course}>
                <Link
                  href={loc(`/certificates/${slugify(c.course)}`)}
                  className="group flex items-center gap-4 rounded-2xl border border-foreground/10 p-4 transition-colors duration-300 hover:border-foreground/30 hover:bg-foreground/[0.03]"
                >
                  <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-surface-2">
                    <Image src={c.image} alt={c.course} fill sizes="80px" className="object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col gap-0.5">
                    <span className="font-roobert text-sm font-medium leading-tight">{c.course}</span>
                    <span className="text-xs text-muted">{c.issuer}</span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted transition-all duration-300 group-hover:rotate-45 group-hover:text-foreground" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
