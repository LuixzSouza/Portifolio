"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ds/Container";
import { Section } from "@/components/ds/Section";
import { Heading } from "@/components/ds/Heading";
import { Text } from "@/components/ds/Text";
import { Eyebrow } from "@/components/ds/Eyebrow";
import { Reveal } from "@/components/ds/Reveal";
import { testimonials, type Testimonial } from "@/data/testimonials";
import { useTestimonials } from "@/hooks/useTestimonials";
import { useTranslations } from "@/content/useTranslations";
import { useLanguage } from "@/components/ds/LanguageProvider";
import { pickText } from "@/lib/i18n";

export function Testimonials({ items: initial = testimonials }: { items?: Testimonial[] }) {
  const t = useTranslations();
  const { lang } = useLanguage();
  const items = useTestimonials(initial);

  return (
    <Section id="depoimentos" className="border-t border-foreground/10">
      <Container>
        <Reveal className="mb-14 flex flex-col gap-5 md:mb-20">
          <Eyebrow>{t.testimonials.eyebrow}</Eyebrow>
          <Heading size="display-md" className="max-w-[16ch]">
            {t.testimonials.headingLead}{" "}
            <span className="font-serif font-normal italic text-foreground/80">
              {t.testimonials.headingEmphasis}
            </span>
          </Heading>
        </Reveal>

        {/* CSS Columns mantém o layout alvenaria (masonry), perfeito para textos de tamanhos diferentes */}
        <div className="gap-8 space-y-8 sm:columns-2 lg:columns-3">
          {items.map((testimonial, i) => (
            <Reveal key={testimonial.name} delay={(i % 3) * 0.08} className="break-inside-avoid">
              <motion.figure
                initial="rest"
                whileHover="hover"
                whileTap={{ scale: 0.98 }} // Efeito de afundar ao clique
                className="group relative flex flex-col gap-6 overflow-hidden rounded-3xl border border-foreground/10 bg-surface p-7 transition-all duration-500 hover:border-foreground/20 hover:shadow-2xl hover:shadow-foreground/5 md:p-8"
              >
                {/* MARCA D'ÁGUA: Aspas gigantes animadas no fundo */}
                <motion.span
                  variants={{
                    rest: { scale: 1, opacity: 0.04, rotate: 0 },
                    hover: { scale: 1.15, opacity: 0.08, rotate: -6 },
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="pointer-events-none absolute -left-4 -top-8 select-none font-serif text-[140px] leading-none text-foreground"
                >
                  &ldquo;
                </motion.span>

                {/* TEXTO DO DEPOIMENTO: Fica mais nítido no hover */}
                <blockquote className="relative z-10">
                  <Text 
                    tone="muted" 
                    className="text-balance transition-colors duration-500 group-hover:text-foreground/90"
                  >
                    {pickText(testimonial.quote, lang)}
                  </Text>
                </blockquote>

                {/* RODAPÉ DO CARD: Foto e Nome */}
                <figcaption className="relative z-10 mt-auto flex items-center gap-4 border-t border-foreground/10 pt-6">
                  {testimonial.image && (
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-foreground/10 transition-colors duration-500 group-hover:border-foreground/30">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        sizes="48px"
                        // Restaura a cor e dá um leve zoom na foto
                        className="object-cover grayscale transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 group-hover:grayscale-0"
                      />
                    </div>
                  )}
                  
                  {/* Textos deslizam levemente como micro-interação */}
                  <div className="flex flex-col overflow-hidden">
                    <span className="truncate font-roobert text-sm font-semibold text-foreground transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-1">
                      {testimonial.name}
                    </span>
                    <span className="truncate text-xs font-medium text-muted transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-1">
                      {pickText(testimonial.role, lang)}
                    </span>
                  </div>
                </figcaption>
              </motion.figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}