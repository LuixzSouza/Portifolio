"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocalizedHref } from "@/lib/useLocale";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ds/Container";
import { Section } from "@/components/ds/Section";
import { Heading } from "@/components/ds/Heading";
import { Text } from "@/components/ds/Text";
import { Eyebrow } from "@/components/ds/Eyebrow";
import { Reveal } from "@/components/ds/Reveal";
import { ArrowButton } from "@/components/ds/ArrowButton";
import { services } from "@/data/services";
import { useServices } from "@/hooks/useServices";
import { useTranslations } from "@/content/useTranslations";
import { useLanguage } from "@/components/ds/LanguageProvider";
import { pickText } from "@/lib/i18n";

const EASE = [0.76, 0, 0.24, 1] as const;

export function ServiceDetail({ slug }: { slug: string }) {
  const t = useTranslations();
  const loc = useLocalizedHref();
  const { lang } = useLanguage();
  const items = useServices(services);
  const service = items.find((s) => s.slug === slug);

  if (!service) {
    return (
      <Section className="flex min-h-[70vh] items-center pt-28 md:pt-36">
        <Container>
          <div className="flex flex-col items-center gap-6 text-center">
            <Heading size="display-md">404</Heading>
            <ArrowButton href="/#servicos" variant="solid">
              {t.serviceDetail.back}
            </ArrowButton>
          </div>
        </Container>
      </Section>
    );
  }

  const { n, image, accent, title, tagline, intro, forWho, process, includes, tags } = service;
  const others = items.filter((s) => s.slug !== slug);

  return (
    <Section className="pt-32 md:pt-40">
      <Container>
        {/* Voltar */}
        <Link
          href={loc("/#servicos")}
          className="group flex w-fit items-center gap-3 text-sm font-semibold uppercase tracking-widest text-muted transition-colors hover:text-foreground"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 transition-colors duration-300 group-hover:border-foreground/40 group-hover:bg-foreground/5">
            <ArrowLeft className="h-4 w-4 transition-transform duration-500 group-hover:-translate-x-1" />
          </span>
          {t.serviceDetail.back}
        </Link>

        {/* Cabeçalho */}
        <div className="mt-10 flex flex-col gap-6">
          <Eyebrow index={n}>
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} aria-hidden />
              {t.serviceDetail.label}
            </span>
          </Eyebrow>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE }}
          >
            <Heading as="h1" size="display-lg" className="max-w-[16ch] tracking-tighter">
              {pickText(title, lang)}
            </Heading>
          </motion.div>
          <Text size="lg" tone="muted" measure className="text-xl md:text-2xl">
            {pickText(tagline, lang)}
          </Text>
        </div>

        {/* Imagem com cortina */}
        <motion.div
          initial={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}
          animate={{ clipPath: "inset(0% 0 0 0)", opacity: 1 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.15 }}
          className="relative mt-14 aspect-[16/10] w-full overflow-hidden rounded-3xl border border-foreground/10 bg-surface-2 md:mt-20 md:aspect-[21/9]"
        >
          <Image src={image} alt={pickText(title, lang)} fill priority sizes="100vw" className="object-cover" />
          <div
            className="absolute inset-x-0 bottom-0 h-1.5"
            style={{ backgroundColor: accent }}
            aria-hidden
          />
        </motion.div>

        {/* Intro + Para quem */}
        <div className="mt-16 grid gap-12 md:mt-24 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-8">
            <Text className="text-pretty text-xl leading-relaxed text-foreground/80 md:text-2xl md:leading-[1.6]">
              {pickText(intro, lang)}
            </Text>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-4">
            <div className="flex flex-col gap-4 border-l-2 pl-6" style={{ borderColor: accent }}>
              <span className="text-xs font-semibold uppercase tracking-widest text-muted">
                {t.serviceDetail.forWho}
              </span>
              <Text tone="muted">{pickText(forWho, lang)}</Text>
              <ul className="mt-2 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-foreground/15 px-3 py-1 text-xs font-medium text-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Como funciona */}
        <div className="mt-20 md:mt-32">
          <Reveal>
            <Heading size="display-sm" className="mb-10 md:mb-14">
              {t.serviceDetail.how}
            </Heading>
          </Reveal>
          <motion.ol
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid gap-px overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/10 sm:grid-cols-2 lg:grid-cols-4"
          >
            {process.map((step, i) => (
              <motion.li
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                }}
                className="flex flex-col gap-4 bg-background p-7 transition-colors duration-300 hover:bg-surface"
              >
                <span
                  className="font-serif text-3xl italic"
                  style={{ color: accent }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Heading as="h3" size="display-sm" className="text-lg md:text-xl">
                  {pickText(step.title, lang)}
                </Heading>
                <Text tone="muted" size="sm">
                  {pickText(step.desc, lang)}
                </Text>
              </motion.li>
            ))}
          </motion.ol>
        </div>

        {/* O que está incluído */}
        <div className="mt-20 md:mt-32">
          <Reveal>
            <Heading size="display-sm" className="mb-10 md:mb-14">
              {t.serviceDetail.included}
            </Heading>
          </Reveal>
          <ul className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {includes.map((item, i) => (
              <Reveal key={i} delay={(i % 2) * 0.05}>
                <li className="flex items-start gap-3 border-b border-foreground/10 pb-5">
                  <span
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${accent}22` }}
                  >
                    <Check className="h-4 w-4" style={{ color: accent }} strokeWidth={2.5} />
                  </span>
                  <Text className="text-lg">{pickText(item, lang)}</Text>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <Reveal className="mt-20 flex flex-col items-start gap-6 rounded-3xl border border-foreground/10 bg-surface p-8 md:mt-32 md:flex-row md:items-center md:justify-between md:p-12">
          <Heading size="display-sm" className="max-w-[16ch] text-2xl md:text-3xl">
            {t.serviceDetail.ctaTitle}
          </Heading>
          <ArrowButton href="/contact" variant="solid">
            {t.serviceDetail.ctaButton}
          </ArrowButton>
        </Reveal>

        {/* Outros serviços */}
        <div className="mt-20 border-t border-foreground/15 pt-8 md:mt-32">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted">
            {t.serviceDetail.others}
          </span>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {others.map((s) => (
              <Link
                key={s.slug}
                href={loc(`/services/${s.slug}`)}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-foreground/10 p-6 transition-colors duration-300 hover:border-foreground/30 hover:bg-foreground/[0.03]"
              >
                <div className="flex items-center gap-4">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: s.accent }} aria-hidden />
                  <span className="font-roobert text-lg font-medium">{pickText(s.title, lang)}</span>
                </div>
                <ArrowUpRight className="h-5 w-5 text-muted transition-all duration-300 group-hover:rotate-45 group-hover:text-foreground" />
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
