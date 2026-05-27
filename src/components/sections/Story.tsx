"use client";

import { Container } from "@/components/ds/Container";
import { Section } from "@/components/ds/Section";
import { Heading } from "@/components/ds/Heading";
import { Eyebrow } from "@/components/ds/Eyebrow";
import { Reveal } from "@/components/ds/Reveal";
import { MaskReveal } from "@/components/ds/MaskReveal";
import { ScrollRevealText } from "@/components/ds/ScrollRevealText";
import { storyParagraphs, storyQuote } from "@/data/about";
import { useSectionContent } from "@/hooks/useSectionContent";
import { getList, getText } from "@/lib/schemas/content";
import { useTranslations } from "@/content/useTranslations";
import { useLanguage } from "@/components/ds/LanguageProvider";
import { pickText, pickList } from "@/lib/i18n";

export function Story() {
  const t = useTranslations();
  const { lang } = useLanguage();
  const content = useSectionContent();
  const quote = (content && getText(content, "about.story.quote")) ?? storyQuote;
  const paragraphsSrc = (content && getList(content, "about.story.paragraphs")) ?? storyParagraphs;
  const paragraphs = pickList(paragraphsSrc, lang);
  return (
    <Section id="historia" className="border-t border-foreground/10">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal className="sticky top-28 flex flex-col gap-5">
              <Eyebrow>{t.about.story.eyebrow}</Eyebrow>
              <Heading size="display-md" className="max-w-[12ch] leading-[0.98]">
                <MaskReveal>{t.about.story.headingLead}</MaskReveal>
                <MaskReveal delay={0.08} className="font-serif font-normal italic">
                  {t.about.story.headingEmphasis}
                </MaskReveal>
              </Heading>
            </Reveal>
          </div>

          <div className="flex flex-col gap-8 lg:col-span-8">
            <ScrollRevealText paragraphs={paragraphs} />

            <Reveal className="mt-6 border-l-2 border-foreground/20 pl-6">
              <Heading as="blockquote" size="display-sm" serif className="italic text-foreground">
                &ldquo;{pickText(quote, lang)}&rdquo;
              </Heading>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
