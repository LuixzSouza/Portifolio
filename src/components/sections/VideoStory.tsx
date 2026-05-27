"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/components/ds/Container";
import { Section } from "@/components/ds/Section";
import { Heading } from "@/components/ds/Heading";
import { Text } from "@/components/ds/Text";
import { Eyebrow } from "@/components/ds/Eyebrow";
import { MaskReveal } from "@/components/ds/MaskReveal";
import { Parallax } from "@/components/ds/Parallax";
import { aboutVideos, type AboutVideo } from "@/data/about";
import { useTranslations } from "@/content/useTranslations";
import { useLanguage } from "@/components/ds/LanguageProvider";
import { pickText } from "@/lib/i18n";
import type { Lang } from "@/components/ds/LanguageProvider";

const frameVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 60 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

function VideoFrame({
  video,
  lang,
  featured = false,
  durationSuffix,
  delay = 0,
}: {
  video: AboutVideo;
  lang: Lang;
  featured?: boolean;
  durationSuffix: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.figure
      variants={reduced ? undefined : frameVariants}
      initial={reduced ? undefined : "hidden"}
      whileInView={reduced ? undefined : "visible"}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={reduced ? undefined : { delay }}
      className="group flex flex-col gap-5"
    >
      <div className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-surface shadow-xl shadow-black/20 transition-colors duration-500 group-hover:border-foreground/25">
        <div className="aspect-video w-full">
          <iframe
            src={`https://drive.google.com/file/d/${video.driveId}/preview`}
            title={pickText(video.title, lang)}
            allow="autoplay; encrypted-media"
            allowFullScreen
            loading="lazy"
            className="h-full w-full"
          />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-foreground/10"
        />
      </div>

      <figcaption className="flex flex-col gap-1.5">
        <span className="text-eyebrow font-medium uppercase tracking-widest text-muted">
          {pickText(video.category, lang)}
        </span>
        <Heading
          as="h3"
          size="display-sm"
          className={featured ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"}
        >
          {pickText(video.title, lang)}
        </Heading>
        <Text size="sm" tone="muted">
          {pickText(video.date, lang)} • {pickText(video.duration, lang)} {durationSuffix}
        </Text>
      </figcaption>
    </motion.figure>
  );
}

export function VideoStory() {
  const t = useTranslations();
  const { lang } = useLanguage();
  const [featured, ...rest] = aboutVideos;
  const suffix = t.about.videos.durationSuffix;

  if (!featured) return null;

  return (
    <Section id="videos" className="border-t border-foreground/10">
      <Container>
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="flex flex-col gap-5 lg:col-span-8">
            <Eyebrow>{t.about.videos.eyebrow}</Eyebrow>
            <Heading size="display-lg" className="max-w-[14ch] leading-[0.95]">
              <MaskReveal>{t.about.videos.headingLead}</MaskReveal>
              <MaskReveal delay={0.08} className="font-serif font-normal italic text-foreground/80">
                {t.about.videos.headingEmphasis}
              </MaskReveal>
            </Heading>
          </div>
          <div className="lg:col-span-4">
            <Text size="lg" tone="muted" className="text-pretty">
              {t.about.videos.text}
            </Text>
          </div>
        </div>

        <div className="mt-16 md:mt-20">
          <Parallax distance={50} className="mx-auto max-w-4xl">
            <VideoFrame video={featured} lang={lang} featured durationSuffix={suffix} />
          </Parallax>
        </div>

        {rest.length > 0 && (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 md:mt-16 md:gap-10">
            {rest.map((video, i) => (
              <VideoFrame
                key={video.driveId}
                video={video}
                lang={lang}
                durationSuffix={suffix}
                delay={i * 0.12}
              />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
