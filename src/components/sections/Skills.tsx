"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Cloud, Component, GitBranch, PenTool, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ds/Container";
import { Section } from "@/components/ds/Section";
import { Heading } from "@/components/ds/Heading";
import { Text } from "@/components/ds/Text";
import { Eyebrow } from "@/components/ds/Eyebrow";
import { Reveal } from "@/components/ds/Reveal";
import { skillGroups, type SkillGroup } from "@/data/skills";
import { useSkillGroups } from "@/hooks/useSkillGroups";
import { useTranslations } from "@/content/useTranslations";
import { useLanguage } from "@/components/ds/LanguageProvider";
import { pickText } from "@/lib/i18n";

const LEVELS = 5;
// Curva elástica super suave para os hovers
const SPRING_EASE = "ease-[cubic-bezier(0.34,1.56,0.64,1)]";

// Logo da tecnologia (SVGs em /public/icons). Chave = nome exato da skill.
const SKILL_LOGOS: Record<string, string> = {
  HTML5: "/icons/html5.svg",
  CSS3: "/icons/CSS3.svg",
  JavaScript: "/icons/JavaScript.svg",
  React: "/icons/React.svg",
  "Next.js": "/icons/next.svg",
  Sass: "/icons/Sass.svg",
  "Styled Components": "/icons/styled-components.svg",
  Bootstrap: "/icons/bootstrap.svg",
  "Node.js": "/icons/Node.svg",
  PHP: "/icons/PHP.svg",
  MySQL: "/icons/mysql.svg",
  Java: "/icons/java.svg",
  Python: "/icons/python.svg",
  C: "/icons/C.svg",
  Figma: "/icons/Figma.svg",
  "VS Code": "/icons/vsCode.svg",
  Linux: "/icons/Linux.svg",
  Netlify: "/icons/netlify.svg",
  WordPress: "/icons/wordpress.svg",
};

// Fallback (sem logo de marca) → ícone de linha do lucide.
const SKILL_ICONS: Record<string, LucideIcon> = {
  Git: GitBranch,
  AWS: Cloud,
  "UI/UX": PenTool,
  Prototipação: Component,
};

/** Chip branco com o logo da tecnologia (ou ícone fallback). */
function SkillIcon({ name }: { name: string }) {
  const logo = SKILL_LOGOS[name];
  const Fallback = SKILL_ICONS[name];
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white ring-1 ring-black/5">
      {logo ? (
        <Image src={logo} alt="" width={18} height={18} className="h-[18px] w-[18px] object-contain" />
      ) : Fallback ? (
        <Fallback className="h-4 w-4 text-neutral-800" strokeWidth={2} aria-hidden />
      ) : (
        <span className="text-xs font-semibold text-neutral-800">{name.charAt(0)}</span>
      )}
    </span>
  );
}

function Level({ value }: { value: number }) {
  return (
    <span role="img" className="flex items-center gap-1.5" aria-label={`Proficiência ${value} de ${LEVELS}`}>
      {Array.from({ length: LEVELS }).map((_, i) => {
        const isFilled = i < value;
        return (
          <motion.span
            key={i}
            // As barrinhas nascem encolhidas e com opacidade zero
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              delay: i * 0.08, // Atraso em cascata para dar o efeito de "carregando"
            }}
            className={`h-1.5 w-5 rounded-full transition-all duration-500 ${SPRING_EASE} ${
              isFilled
                ? "bg-foreground group-hover:scale-y-150 group-hover:bg-foreground" // Barras cheias engrossam no hover
                : "bg-foreground/15 group-hover:bg-foreground/25" // Barras vazias clareiam levemente
            }`}
          />
        );
      })}
    </span>
  );
}

export function Skills({ groups: initial = skillGroups }: { groups?: SkillGroup[] }) {
  const t = useTranslations();
  const { lang } = useLanguage();
  const groups = useSkillGroups(initial);

  return (
    <Section id="habilidades" className="border-t border-foreground/10">
      <Container>
        <Reveal className="mb-16 flex flex-col gap-5 md:mb-24">
          <Eyebrow>{t.skills.eyebrow}</Eyebrow>
          <Heading size="display-md" className="max-w-[18ch]">
            {t.skills.heading}
          </Heading>
          <Text tone="muted" size="lg" measure>
            {t.skills.text}
          </Text>
        </Reveal>

        <div className="grid gap-x-12 gap-y-16 sm:grid-cols-2 md:gap-y-20">
          {groups.map((group, i) => (
            <Reveal key={i} delay={(i % 2) * 0.08}>
              <div className="flex flex-col gap-2">
                {/* Cabeçalho do Grupo */}
                <span className="mb-5 inline-flex items-center gap-4 text-eyebrow font-medium uppercase tracking-widest text-muted">
                  <span className="text-foreground/40">{String(i + 1).padStart(2, "0")}</span>
                  <span className="h-px w-12 bg-foreground/20" aria-hidden />
                  {pickText(group.category, lang)}
                </span>
                
                {/* Lista de Habilidades */}
                <ul className="flex flex-col">
                  {group.skills.map((skill) => (
                    <li
                      key={skill.name}
                      // group permite que os filhos (ícone, nome e Level) reajam ao passar o mouse na linha toda
                      className="group flex items-center justify-between gap-6 border-b border-foreground/10 py-4 transition-colors duration-500 hover:border-foreground/40"
                    >
                      <span className="flex min-w-0 items-center">
                        {/* Logo aparece à esquerda no hover, empurrando o nome para a direita */}
                        <span
                          className={`grid grid-cols-[0fr] opacity-0 transition-all duration-500 ${SPRING_EASE} group-hover:mr-3 group-hover:grid-cols-[1fr] group-hover:opacity-100`}
                        >
                          <span className="overflow-hidden">
                            <SkillIcon name={skill.name} />
                          </span>
                        </span>
                        <span className="font-roobert text-base text-foreground md:text-lg">
                          {skill.name}
                        </span>
                      </span>
                      <Level value={skill.level} />
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}