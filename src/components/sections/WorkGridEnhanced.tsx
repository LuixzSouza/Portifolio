/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useLocalizedHref } from "@/lib/useLocale";
import Image from "next/image";
import { Clock, Users, ArrowUpRight, Github, ExternalLink, Star, Calendar, Target } from "lucide-react";
import { WorkCursor, useCursorFollow } from "./WorkCursor";
import { WorkFilters } from "./WorkFilters";
import { WorkStats } from "./WorkStats";
import { Container } from "@/components/ds/Container";
import { Section } from "@/components/ds/Section";
import { Heading } from "@/components/ds/Heading";
import { Text } from "@/components/ds/Text";
import { Eyebrow } from "@/components/ds/Eyebrow";
import { LiveProjectButton } from "@/components/ds/LiveProjectButton";
import { projetos, type Projeto } from "@/data/projects";
import { listProjects } from "@/lib/api";
import { slugify } from "@/lib/slug";
import { screenshotUrl } from "@/lib/screenshot";
import { useTranslations } from "@/content/useTranslations";
import { useLanguage } from "@/components/ds/LanguageProvider";
import { pickText } from "@/lib/i18n";

const ITEMS_PER_PAGE = 8;
const EASE = [0.6, 0, 0.4, 1] as const;

const STATUS_COLORS = {
  active: "bg-green-500/20 text-green-600 border-green-500/30",
  archived: "bg-gray-500/20 text-gray-600 border-gray-500/30",
  "in-development": "bg-blue-500/20 text-blue-600 border-blue-500/30",
  prototype: "bg-purple-500/20 text-purple-600 border-purple-500/30"
};

const COMPLEXITY_COLORS = {
  basic: "bg-emerald-500/20 text-emerald-600 border-emerald-500/30",
  intermediate: "bg-yellow-500/20 text-yellow-600 border-yellow-500/30",
  advanced: "bg-orange-500/20 text-orange-600 border-orange-500/30",
  expert: "bg-red-500/20 text-red-600 border-red-500/30"
};

interface ProjectCardProps {
  project: Projeto;
  index: number;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onMouseMove: (e: React.MouseEvent) => void;
}

function ProjectCard({ project, index, onMouseEnter, onMouseLeave, onMouseMove }: ProjectCardProps) {
  const { lang } = useLanguage();
  const _t = useTranslations();
  const loc = useLocalizedHref();
  const reduceMotion = useReducedMotion();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hoverSrc, setHoverSrc] = useState<string | null>(null);

  const slug = slugify(project.nome);
  const hasLiveProject = Boolean(project.links.verProjeto);

  // Carregar screenshot no hover
  useEffect(() => {
    if (hasLiveProject && hoverSrc === null) {
      const screenshot = screenshotUrl(project.links.verProjeto!);
      setHoverSrc(screenshot);
    }
  }, [hasLiveProject, hoverSrc, project.links.verProjeto]);

  const statusLabels = {
    active: lang === "pt" ? "Ativo" : "Active",
    archived: lang === "pt" ? "Arquivado" : "Archived",
    "in-development": lang === "pt" ? "Em Desenvolvimento" : "In Development",
    prototype: lang === "pt" ? "Protótipo" : "Prototype"
  };

  const complexityLabels = {
    basic: lang === "pt" ? "Básico" : "Basic",
    intermediate: lang === "pt" ? "Intermediário" : "Intermediate",
    advanced: lang === "pt" ? "Avançado" : "Advanced",
    expert: lang === "pt" ? "Expert" : "Expert"
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: EASE,
        delay: reduceMotion ? 0 : index * 0.1
      }
    }
  };

  return (
    <motion.article
      variants={cardVariants}
      className="group relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
    >
      <div className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-surface transition-all duration-500 group-hover:border-foreground/20 group-hover:shadow-xl group-hover:shadow-black/5">
        {/* Badge de destaque */}
        {project.destaque && (
          <div className="absolute left-4 top-4 z-20">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1 text-xs font-medium text-white shadow-lg">
              <Star className="h-3 w-3 fill-current" />
              <span>{lang === "pt" ? "Destaque" : "Featured"}</span>
            </div>
          </div>
        )}

        {/* Metadados do projeto */}
        <div className="absolute right-4 top-4 z-20 flex gap-2">
          <span className={`inline-flex items-center rounded-full border px-2 py-1 text-xs font-medium ${STATUS_COLORS[project.status]}`}>
            {statusLabels[project.status]}
          </span>
          <span className={`inline-flex items-center rounded-full border px-2 py-1 text-xs font-medium ${COMPLEXITY_COLORS[project.complexidade]}`}>
            {complexityLabels[project.complexidade]}
          </span>
        </div>

        {/* Imagem do projeto */}
        <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
          {project.imagem && (
            <>
              {/* Imagem principal */}
              <Image
                src={project.imagem}
                alt={project.nome}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className={`object-cover transition-all duration-700 ${imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"} ${hoverSrc ? "group-hover:opacity-0" : ""}`}
                onLoad={() => setImageLoaded(true)}
                priority={index < 4}
              />

              {/* Screenshot do site ao vivo (hover) */}
              {hoverSrc && (
                <Image
                  src={hoverSrc}
                  alt={`${project.nome} - preview`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                />
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </>
          )}

          {/* Loading placeholder */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-surface-2 to-surface animate-pulse" />
          )}
        </div>

        {/* Conteúdo do card */}
        <div className="p-6 space-y-4">
          {/* Cabeçalho */}
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-3">
              <Link
                href={loc(`/project?id=${slug}`)}
                className="group/title"
              >
                <h3 className="text-xl font-bold text-foreground transition-colors group-hover/title:text-muted">
                  {project.nome}
                </h3>
              </Link>

              {/* Links de ação */}
              <div className="flex items-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-foreground/20 bg-background/50 text-muted transition-colors hover:text-foreground backdrop-blur-sm"
                    aria-label="GitHub"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                )}
                {project.links.verProjeto && (
                  <a
                    href={project.links.verProjeto}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-foreground/20 bg-background/50 text-muted transition-colors hover:text-foreground backdrop-blur-sm"
                    aria-label="Ver projeto"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Descrição */}
            {project.descricao && (
              <p className="text-sm text-muted line-clamp-2">
                {pickText(project.descricao, lang)}
              </p>
            )}
          </div>

          {/* Metadados do projeto */}
          <div className="flex items-center gap-4 text-xs text-muted">
            {project.data && (
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3 w-3" />
                <span>{pickText(project.data, lang)}</span>
              </div>
            )}
            {project.duracao && (
              <div className="flex items-center gap-1.5">
                <Clock className="h-3 w-3" />
                <span>{project.duracao}</span>
              </div>
            )}
            {project.tamanhoEquipe && project.tamanhoEquipe > 1 && (
              <div className="flex items-center gap-1.5">
                <Users className="h-3 w-3" />
                <span>{project.tamanhoEquipe}</span>
              </div>
            )}
          </div>

          {/* Tecnologias */}
          <div className="flex flex-wrap gap-1.5">
            {project.tecnologiasPrincipais?.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="inline-flex rounded-md border border-foreground/10 bg-background/50 px-2 py-1 text-xs font-medium text-foreground backdrop-blur-sm"
              >
                {tech}
              </span>
            ))}
            {project.tecnologias && project.tecnologias.length > 3 && (
              <span className="inline-flex rounded-md border border-foreground/10 bg-background/50 px-2 py-1 text-xs font-medium text-muted backdrop-blur-sm">
                +{project.tecnologias.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function WorkGridEnhanced() {
  const { lang } = useLanguage();
  const _t = useTranslations();
  const { x, y, follow } = useCursorFollow();
  const [hovering, setHovering] = useState(false);
  const [projects, setProjects] = useState<Projeto[]>(projetos);
  const [filteredProjects, setFilteredProjects] = useState<Projeto[]>(projetos);
  const [currentPage, setCurrentPage] = useState(1);
  const [showStats, setShowStats] = useState(false);

  // Carregar projetos da API
  useEffect(() => {
    let active = true;
    listProjects()
      .then((data) => {
        if (!active || data.length === 0) return;
        // Mesclar dados da API com dados locais
        const merged = data.map((p) => {
          const local = projetos.find(
            (lp) => slugify(lp.nome) === p.slug || lp.nome === p.nome,
          );
          return local ? { ...local, ...p } : { ...p, id: p.slug || slugify(p.nome) };
        });
        setProjects(merged as unknown as Projeto[]);
        setFilteredProjects(merged as unknown as Projeto[]);
      })
      .catch(() => {
        // Em caso de erro, manter dados locais
        console.warn("API não disponível, usando dados locais");
      });
    return () => {
      active = false;
    };
  }, []);

  // Paginação
  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProjects, currentPage]);

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const hasMoreProjects = currentPage < totalPages;

  const handleFilter = useCallback((filtered: Projeto[]) => {
    setFilteredProjects(filtered);
    setCurrentPage(1); // Reset para primeira página
  }, []);

  const loadMore = () => {
    if (hasMoreProjects) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  return (
    <Section id="trabalhos" className="border-t border-foreground/10">
      <Container>
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-14 md:mb-20"
        >
          <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-5">
              <Eyebrow>{_t.work.eyebrow}</Eyebrow>
              <Heading size="display-md" className="max-w-[16ch]">
{_t.work.headingLead} <em>{_t.work.headingEmphasis}</em>
              </Heading>
            </div>

            <div className="flex items-center gap-3">
              <Text tone="muted" measure>
                {_t.work.text}
              </Text>

              <button
                onClick={() => setShowStats(!showStats)}
                className="inline-flex items-center gap-2 rounded-xl border border-foreground/20 bg-background/50 px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground backdrop-blur-sm"
              >
                <Target className="h-4 w-4" />
                {lang === "pt" ? "Stats" : "Statistics"}
              </button>
            </div>
          </div>

          {/* Estatísticas (opcional) */}
          <AnimatePresence>
            {showStats && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-8 overflow-hidden"
              >
                <WorkStats projects={projects} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Filtros */}
          <WorkFilters projects={projects} onFilter={handleFilter} />
        </motion.div>

        {/* Grid de projetos */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
          onMouseMove={follow}
        >
          {paginatedProjects.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="wait">
                {paginatedProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    onMouseEnter={() => setHovering(true)}
                    onMouseLeave={() => setHovering(false)}
                    onMouseMove={follow}
                  />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <div className="mb-4 text-6xl">🔍</div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">
                {lang === "pt" ? "Nenhum projeto encontrado" : "No projects found"}
              </h3>
              <p className="text-muted">
                {lang === "pt" ? "Tente ajustar seus filtros de busca" : "Try adjusting your search filters"}
              </p>
            </motion.div>
          )}

          {/* Botão carregar mais */}
          {hasMoreProjects && paginatedProjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 flex justify-center"
            >
              <button
                onClick={loadMore}
                className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-background/50 px-8 py-3 font-medium text-foreground transition-all duration-300 hover:border-foreground/40 hover:bg-foreground/5 backdrop-blur-sm"
              >
                <span>{lang === "pt" ? "Ver Mais Projetos" : "Load More Projects"}</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Cursor de visualização */}
        <WorkCursor x={x} y={y} active={hovering} label={_t.work.viewLabel} />
      </Container>
    </Section>
  );
}