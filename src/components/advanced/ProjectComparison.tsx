/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  GitCompare, Plus, X, Check, ExternalLink, Github,
  Calendar, Users, Target, Zap, Award, Clock, Layers,
  ArrowRight, TrendingUp, Star, Code2
} from "lucide-react";
import { Button } from "@/components/ds/Button";
import { Text } from "@/components/ds/Text";
import { Heading } from "@/components/ds/Heading";
import { type Projeto } from "@/data/projects";
import { useLanguage, type Lang } from "@/components/ds/LanguageProvider";
import { pickText } from "@/lib/i18n";

interface ProjectComparisonProps {
  projects: Projeto[];
  selectedIds: Set<string>;
  onSelectionChange: (projectId: string, selected: boolean) => void;
}

interface ComparisonMetric {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  getValue: (project: Projeto, lang: string) => string | number | null;
  format: (value: unknown) => string;
}

const COMPARISON_METRICS: ComparisonMetric[] = [
  {
    key: "categoria",
    label: "Categoria",
    icon: Layers,
    getValue: (p) => p.categoria,
    format: (v) => {
      const categories = {
        websites: "🌐 Websites",
        applications: "📱 Aplicações",
        apis: "⚡ APIs",
        games: "🎮 Jogos",
        tools: "🔧 Ferramentas",
        academic: "🎓 Acadêmicos",
        "real-projects": "🏢 Projetos Reais",
        design: "🎨 Design",
        mobile: "📱 Mobile",
        backend: "🛠️ Backend"
      };
      return categories[v as keyof typeof categories] || (v as string);
    }
  },
  {
    key: "complexidade",
    label: "Complexidade",
    icon: TrendingUp,
    getValue: (p) => p.complexidade,
    format: (v) => {
      const levels = {
        basic: "🟢 Básico",
        intermediate: "🟡 Intermediário",
        advanced: "🟠 Avançado",
        expert: "🔴 Expert"
      };
      return levels[v as keyof typeof levels] || (v as string);
    }
  },
  {
    key: "status",
    label: "Status",
    icon: Target,
    getValue: (p) => p.status,
    format: (v) => {
      const statuses = {
        active: "✅ Ativo",
        archived: "📦 Arquivado",
        "in-development": "🚧 Em Desenvolvimento",
        prototype: "🧪 Protótipo"
      };
      return statuses[v as keyof typeof statuses] || (v as string);
    }
  },
  {
    key: "data",
    label: "Data de Criação",
    icon: Calendar,
    getValue: (p, lang) => p.data ? pickText(p.data, lang as Lang) : null,
    format: (v) => (v as string) || "—"
  },
  {
    key: "duracao",
    label: "Duração",
    icon: Clock,
    getValue: (p) => p.duracao || null,
    format: (v) => (v as string) || "—"
  },
  {
    key: "tamanhoEquipe",
    label: "Tamanho da Equipe",
    icon: Users,
    getValue: (p) => p.tamanhoEquipe || null,
    format: (v) => v ? `${v} pessoa${(v as number) > 1 ? "s" : ""}` : "Individual"
  },
  {
    key: "destaque",
    label: "Projeto Destaque",
    icon: Star,
    getValue: (p) => p.destaque as unknown as string,
    format: (v) => v ? "⭐ Sim" : "— Não"
  },
  {
    key: "tecnologias",
    label: "Tecnologias",
    icon: Code2,
    getValue: (p) => p.tecnologias.length,
    format: (v) => `${v} tecnologia${(v as number) > 1 ? "s" : ""}`
  }
];

export function ProjectComparison({ projects, selectedIds, onSelectionChange }: ProjectComparisonProps) {
  const { lang } = useLanguage();
  const [compareMode, setCompareMode] = useState<"select" | "compare">("select");

  const selectedProjects = useMemo(() => {
    return projects.filter(p => selectedIds.has(p.nome));
  }, [projects, selectedIds]);

  const availableProjects = useMemo(() => {
    return projects.filter(p => !selectedIds.has(p.nome));
  }, [projects, selectedIds]);

  const canCompare = selectedProjects.length >= 2;
  const maxSelections = 4; // Maximum projects to compare at once

  const handleToggleProject = (projectName: string, selected: boolean) => {
    onSelectionChange(projectName, selected);
  };

  const getTechnologiesOverlap = (projectA: Projeto, projectB: Projeto) => {
    const techsA = new Set(projectA.tecnologias.map(t => t.toLowerCase()));
    const techsB = new Set(projectB.tecnologias.map(t => t.toLowerCase()));
    const intersection = new Set([...techsA].filter(t => techsB.has(t)));
    return {
      common: intersection.size,
      total: new Set([...techsA, ...techsB]).size,
      percentage: intersection.size / Math.min(techsA.size, techsB.size) * 100
    };
  };

  if (compareMode === "select") {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GitCompare className="h-6 w-6 text-foreground" />
            <div>
              <Heading as="h2" size="display-md">Comparar Projetos</Heading>
              <Text tone="muted" size="sm">
                Selecione 2-{maxSelections} projetos para comparação detalhada
              </Text>
            </div>
          </div>

          {canCompare && (
            <Button
              onClick={() => setCompareMode("compare")}
              className="gap-2"
            >
              Comparar {selectedProjects.length}
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Selected Projects */}
        {selectedProjects.length > 0 && (
          <div className="space-y-3">
            <Text size="sm" className="font-medium text-foreground">
              Projetos Selecionados ({selectedProjects.length}/{maxSelections})
            </Text>
            <div className="grid gap-3 sm:grid-cols-2">
              {selectedProjects.map((project) => (
                <motion.div
                  key={project.nome}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-3 rounded-lg border border-blue-500/30 bg-blue-500/10 p-4"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
                    <Check className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-foreground">{project.nome}</div>
                    <div className="text-sm text-muted">
                      {project.tecnologias.slice(0, 3).join(", ")}
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggleProject(project.nome, false)}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-red-500/20 hover:text-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Available Projects */}
        <div className="space-y-3">
          <Text size="sm" className="font-medium text-foreground">
            Projetos Disponíveis
          </Text>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {availableProjects.map((project) => {
              const canSelect = selectedProjects.length < maxSelections;
              return (
                <motion.button
                  key={project.nome}
                  layout
                  onClick={() => canSelect && handleToggleProject(project.nome, true)}
                  disabled={!canSelect}
                  className={`flex items-center gap-3 rounded-lg border p-4 text-left transition-all ${
                    canSelect
                      ? "border-foreground/20 hover:border-foreground/40 hover:bg-surface/50"
                      : "border-foreground/10 opacity-50 cursor-not-allowed"
                  }`}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-foreground/20">
                    <Plus className="h-4 w-4 text-muted" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-foreground">{project.nome}</div>
                    <div className="text-sm text-muted">
                      {project.tecnologias.slice(0, 3).join(", ")}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Empty State */}
        {projects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <GitCompare className="h-12 w-12 text-muted mb-4" />
            <Text tone="muted" size="lg" className="text-center">
              Nenhum projeto disponível para comparação
            </Text>
          </div>
        )}
      </div>
    );
  }

  // Compare Mode
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <GitCompare className="h-6 w-6 text-foreground" />
          <div>
            <Heading as="h2" size="display-md">Comparação de Projetos</Heading>
            <Text tone="muted" size="sm">
              Análise detalhada de {selectedProjects.length} projetos selecionados
            </Text>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={() => setCompareMode("select")}
          className="gap-2"
        >
          <X className="h-4 w-4" />
          Voltar à Seleção
        </Button>
      </div>

      {/* Technology Overlap Analysis */}
      {selectedProjects.length === 2 && (
        <div className="rounded-lg border border-foreground/20 bg-surface/30 p-6">
          <Heading as="h3" size="display-sm" className="mb-4">Análise de Tecnologias</Heading>
          {(() => {
            const overlap = getTechnologiesOverlap(selectedProjects[0], selectedProjects[1]);
            return (
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{overlap.common}</div>
                  <div className="text-sm text-muted">Tecnologias Comuns</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{overlap.total}</div>
                  <div className="text-sm text-muted">Total Único</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{overlap.percentage.toFixed(0)}%</div>
                  <div className="text-sm text-muted">Similaridade</div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-lg border border-foreground/20 bg-surface/30">
          <thead>
            <tr className="border-b border-foreground/20">
              <th className="p-4 text-left text-sm font-medium text-muted">Métrica</th>
              {selectedProjects.map((project) => (
                <th key={project.nome} className="p-4 text-left text-sm font-medium text-foreground min-w-[200px]">
                  <div className="space-y-2">
                    <div className="font-semibold">{project.nome}</div>
                    <div className="flex items-center gap-2">
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted hover:text-foreground"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                      {project.links.verProjeto && (
                        <a
                          href={project.links.verProjeto}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted hover:text-foreground"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARISON_METRICS.map((metric, _index) => {
              const Icon = metric.icon;
              return (
                <tr key={metric.key} className={_index % 2 === 0 ? "bg-surface/20" : ""}>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted">
                      <Icon className="h-4 w-4" />
                      {metric.label}
                    </div>
                  </td>
                  {selectedProjects.map((project) => {
                    const value = metric.getValue(project, lang);
                    const formatted = metric.format(value);
                    return (
                      <td key={project.nome} className="p-4 text-sm text-foreground">
                        {formatted}
                      </td>
                    );
                  })}
                </tr>
              );
            })}

            {/* Technologies Row */}
            <tr className="border-t border-foreground/20">
              <td className="p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-muted">
                  <Zap className="h-4 w-4" />
                  Tecnologias Detalhadas
                </div>
              </td>
              {selectedProjects.map((project) => (
                <td key={project.nome} className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {project.tecnologias.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-foreground/10 px-2 py-1 text-xs font-medium text-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </td>
              ))}
            </tr>

            {/* Description Row */}
            <tr>
              <td className="p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-muted">
                  <Award className="h-4 w-4" />
                  Descrição
                </div>
              </td>
              {selectedProjects.map((project) => (
                <td key={project.nome} className="p-4">
                  <Text size="sm" tone="muted" className="line-clamp-3">
                    {project.descricao ? pickText(project.descricao, lang) : "—"}
                  </Text>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}