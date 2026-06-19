"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { WorkCursor } from "@/components/sections/WorkCursor";
import { useCursorFollow } from "@/hooks/useCursorFollow";
import { WorkCardMedia } from "@/components/sections/WorkCardMedia";
import { Container } from "@/components/ds/Container";
import { Section } from "@/components/ds/Section";
import { Heading } from "@/components/ds/Heading";
import { Text } from "@/components/ds/Text";
import { Eyebrow } from "@/components/ds/Eyebrow";
import { Reveal } from "@/components/ds/Reveal";
import { ArrowButton } from "@/components/ds/ArrowButton";
import { projetos, type Projeto } from "@/data/projects";
import { shuffle } from "@/lib/shuffle";
import { screenshotUrl } from "@/lib/screenshot";
import { useTranslations } from "@/content/useTranslations";

// Só projetos com site no ar entram nos destaques (o hover mostra o site real).
const POOL = projetos.filter((p) => p.links.verProjeto);
const COUNT = 4;

export function FeaturedWork() {
  const t = useTranslations();
  const { x, y, follow } = useCursorFollow();
  const [hovering, setHovering] = useState(false);
  // Random só no cliente (evita mismatch de hidratação): o SSR mostra os 4 primeiros.
  const [items, setItems] = useState<Projeto[]>(() => POOL.slice(0, COUNT));
  useEffect(() => {
    setItems(shuffle(POOL).slice(0, COUNT));
  }, []);

  return (
    <Section id="trabalhos" className="border-t border-foreground/10">
      <Container>
        <Reveal className="mb-14 flex flex-col gap-5 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-5">
            <Eyebrow>{t.featuredWork.eyebrow}</Eyebrow>
            <Heading size="display-md" className="max-w-[16ch]">
              {t.featuredWork.heading}
            </Heading>
          </div>
          <Text tone="muted" measure>
            {t.featuredWork.text}
          </Text>
        </Reveal>

        <div className="grid gap-10 sm:grid-cols-2 md:gap-14" onMouseMove={follow}>
          {items.map((p, i) => (
            <Reveal key={p.nome} delay={i * 0.1}>
              <motion.a
                href={p.links.verProjeto}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                initial="rest"
                whileHover="hover"
                whileFocus="hover"
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-foreground/10 bg-surface-2">
                  <WorkCardMedia
                    image={p.imagem}
                    hoverSrc={p.links.verProjeto ? screenshotUrl(p.links.verProjeto) : undefined}
                    alt={p.nome}
                    sizes="(max-width: 640px) 100vw, 45vw"
                  />

                  {/* Overlay escuro para contraste no hover (decorativo) */}
                  <motion.div
                    className="pointer-events-none absolute inset-0 bg-black/30"
                    variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Badge central (mobile/toque): no desktop quem aparece é o cursor "Visualizar" */}
                  <motion.div
                    className="pointer-events-none absolute inset-0 flex items-center justify-center lg:hidden"
                    variants={{
                      rest: { opacity: 0, scale: 0.8 },
                      hover: { opacity: 1, scale: 1 },
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white shadow-2xl backdrop-blur-md">
                      <ArrowUpRight className="h-7 w-7" strokeWidth={1.5} />
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  className="mt-6 flex flex-col gap-1.5 px-2"
                  variants={{ rest: { x: 0 }, hover: { x: 8 } }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <Heading as="h3" size="display-sm" className="text-2xl">
                    {p.nome}
                  </Heading>
                  <span className="text-sm font-medium text-muted">
                    {p.tecnologias.slice(0, 2).join(" · ")}
                  </span>
                </motion.div>
              </motion.a>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 flex justify-center md:mt-24">
          <ArrowButton href="/work" variant="outline">
            {t.featuredWork.button}
          </ArrowButton>
        </Reveal>
      </Container>

      <WorkCursor x={x} y={y} active={hovering} label={t.featuredWork.viewLabel} />
    </Section>
  );
}
