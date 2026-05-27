"use client";

import { useRef } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";
import { Container } from "@/components/ds/Container";
import { Section } from "@/components/ds/Section";
import { Heading } from "@/components/ds/Heading";
import { Text } from "@/components/ds/Text";
import { Eyebrow } from "@/components/ds/Eyebrow";
import { MaskReveal } from "@/components/ds/MaskReveal";
import { aboutGallery } from "@/data/about";
import { useTranslations } from "@/content/useTranslations";
import { useLanguage } from "@/components/ds/LanguageProvider";
import { pickText } from "@/lib/i18n";

export function PersonalGallery() {
  const t = useTranslations();
  const { lang } = useLanguage();
  const g = t.about.gallery;

  // Drag-to-scroll só no mouse (touch/trackpad usam scroll nativo).
  const scroller = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, startLeft: 0 });

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const el = scroller.current;
    if (!el) return;
    drag.current = { down: true, startX: e.clientX, startLeft: el.scrollLeft };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const el = scroller.current;
    if (!el || !drag.current.down) return;
    el.scrollLeft = drag.current.startLeft - (e.clientX - drag.current.startX);
  };
  const endDrag = () => {
    drag.current.down = false;
  };

  if (aboutGallery.length === 0) return null;

  return (
    <Section id="galeria" className="border-t border-foreground/10">
      <Container>
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="flex flex-col gap-5 lg:col-span-8">
            <Eyebrow>{g.eyebrow}</Eyebrow>
            <Heading size="display-lg" className="max-w-[14ch] leading-[0.95]">
              <MaskReveal>{g.headingLead}</MaskReveal>
              <MaskReveal delay={0.08} className="font-serif font-normal italic text-foreground/80">
                {g.headingEmphasis}
              </MaskReveal>
            </Heading>
          </div>
          <div className="lg:col-span-4">
            <Text size="lg" tone="muted" className="text-pretty">
              {g.text}
            </Text>
          </div>
        </div>
      </Container>

      <div
        ref={scroller}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] md:mt-16 md:gap-6 md:px-10 lg:cursor-grab lg:px-16 lg:active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
      >
        {aboutGallery.map((item, i) => (
          <figure
            key={i}
            className="group w-[78vw] max-w-[300px] shrink-0 snap-start sm:w-[44vw] md:w-[340px]"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-foreground/10 bg-surface">
              {item.src ? (
                <Image
                  src={item.src}
                  alt={pickText(item.caption, lang)}
                  fill
                  draggable={false}
                  sizes="(max-width: 768px) 78vw, 340px"
                  className="select-none object-cover grayscale transition-[filter,transform] duration-700 ease-out group-hover:scale-[1.04] group-hover:grayscale-0"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-muted transition-colors duration-500 group-hover:text-foreground/60">
                  <Camera className="h-8 w-8" strokeWidth={1.5} aria-hidden />
                  <span className="text-eyebrow font-medium uppercase tracking-widest">
                    {g.placeholder}
                  </span>
                </div>
              )}
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-foreground/10" />
            </div>
            <figcaption className="mt-4 flex items-center gap-2.5 font-roobert text-base text-foreground">
              <span aria-hidden className="h-px w-5 bg-foreground/30" />
              {pickText(item.caption, lang)}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
