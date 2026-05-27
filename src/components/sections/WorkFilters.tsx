/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, X, ChevronDown, Sparkles, Clock, Users, Target } from "lucide-react";
import { type Projeto, type ProjetoCategoria, type ProjetoStatus, type ProjetoComplexidade } from "@/data/projects";
import { useTranslations } from "@/content/useTranslations";
import { useLanguage } from "@/components/ds/LanguageProvider";
import { pickText } from "@/lib/i18n";

interface WorkFiltersProps {
  projects: Projeto[];
  onFilter: (filteredProjects: Projeto[]) => void;
}

interface FilterState {
  search: string;
  categoria: ProjetoCategoria | "all";
  status: ProjetoStatus | "all";
  complexidade: ProjetoComplexidade | "all";
  tecnologia: string | "all";
  destaque: "all" | "featured" | "regular";
  ordenacao: "date-desc" | "date-asc" | "name-asc" | "name-desc" | "complexity";
}

const INITIAL_FILTERS: FilterState = {
  search: "",
  categoria: "all",
  status: "all",
  complexidade: "all",
  tecnologia: "all",
  destaque: "all",
  ordenacao: "date-desc"
};

const CATEGORY_ICONS = {
  websites: "🌐",
  applications: "📱",
  apis: "⚡",
  games: "🎮",
  tools: "🔧",
  academic: "🎓",
  "real-projects": "🏢",
  design: "🎨",
  mobile: "📱",
  backend: "🛠️"
};

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

export function WorkFilters({ projects, onFilter }: WorkFiltersProps) {
  const _t = useTranslations();
  const { lang } = useLanguage();
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Extrair tecnologias únicas dos projetos
  const technologies = useMemo(() => {
    const allTechs = projects.flatMap(p => p.tecnologias || []);
    return Array.from(new Set(allTechs)).sort();
  }, [projects]);

  // Filtrar e ordenar projetos
  const filteredProjects = useMemo(() => {
    let result = [...projects];

    // Filtro de busca
    if (filters.search) {
      const search = filters.search.toLowerCase();
      result = result.filter(project => {
        const searchFields = [
          project.nome,
          project.descricao ? pickText(project.descricao, lang) : "",
          ...(project.tecnologias || []),
          ...(project.tags || [])
        ].join(" ").toLowerCase();
        return searchFields.includes(search);
      });
    }

    // Filtros específicos
    if (filters.categoria !== "all") {
      result = result.filter(p => p.categoria === filters.categoria);
    }
    if (filters.status !== "all") {
      result = result.filter(p => p.status === filters.status);
    }
    if (filters.complexidade !== "all") {
      result = result.filter(p => p.complexidade === filters.complexidade);
    }
    if (filters.tecnologia !== "all") {
      result = result.filter(p => p.tecnologias?.includes(filters.tecnologia));
    }
    if (filters.destaque === "featured") {
      result = result.filter(p => p.destaque);
    } else if (filters.destaque === "regular") {
      result = result.filter(p => !p.destaque);
    }

    // Ordenação
    switch (filters.ordenacao) {
      case "date-desc":
        result.sort((a, b) => (b.data ? pickText(b.data, lang) : "").localeCompare(a.data ? pickText(a.data, lang) : ""));
        break;
      case "date-asc":
        result.sort((a, b) => (a.data ? pickText(a.data, lang) : "").localeCompare(b.data ? pickText(b.data, lang) : ""));
        break;
      case "name-asc":
        result.sort((a, b) => a.nome.localeCompare(b.nome));
        break;
      case "name-desc":
        result.sort((a, b) => b.nome.localeCompare(a.nome));
        break;
      case "complexity":
        const complexityOrder = { basic: 1, intermediate: 2, advanced: 3, expert: 4 };
        result.sort((a, b) => complexityOrder[b.complexidade] - complexityOrder[a.complexidade]);
        break;
    }

    return result;
  }, [projects, filters, lang]);

  // Aplicar filtros
  useEffect(() => {
    onFilter(filteredProjects);
  }, [filteredProjects, onFilter]);

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  const hasActiveFilters = Object.entries(filters).some(([key, value]) =>
    key !== "ordenacao" && value !== INITIAL_FILTERS[key as keyof FilterState]
  );

  return (
    <div className="space-y-4">
      {/* Barra de busca e controles principais */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Busca */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder={lang === "pt" ? "Buscar projetos..." : "Search projects..."}
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            className="w-full rounded-xl border border-foreground/20 bg-background/50 pl-10 pr-4 py-2.5 text-sm transition-colors focus:border-foreground/40 focus:outline-none focus:ring-0 backdrop-blur-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Toggle filtros */}
          <motion.button
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            whileTap={{ scale: 0.95 }}
            className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
              isFiltersOpen || hasActiveFilters
                ? "border-foreground/40 bg-foreground/5 text-foreground"
                : "border-foreground/20 bg-background/50 text-muted hover:text-foreground"
            }`}
          >
            <Filter className="h-4 w-4" />
            <span>{lang === "pt" ? "Filtros" : "Filters"}</span>
            {hasActiveFilters && (
              <span className="rounded-full bg-foreground text-background px-1.5 py-0.5 text-xs">
                {Object.values(filters).filter(v => v !== "all" && v !== "date-desc" && v !== "").length}
              </span>
            )}
          </motion.button>

          {/* Limpar filtros */}
          {hasActiveFilters && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 rounded-xl border border-foreground/20 bg-background/50 px-3 py-2.5 text-sm text-muted transition-colors hover:text-foreground"
            >
              <X className="h-3 w-3" />
              <span>{lang === "pt" ? "Limpar" : "Clear"}</span>
            </motion.button>
          )}
        </div>
      </div>

      {/* Painel de filtros expandido */}
      <AnimatePresence>
        {isFiltersOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden rounded-2xl border border-foreground/10 bg-surface/50 backdrop-blur-sm"
          >
            <div className="p-6 space-y-6">
              {/* Filtros rápidos */}
              <div>
                <h3 className="text-sm font-semibold mb-3 text-foreground">
                  {lang === "pt" ? "Filtros Rápidos" : "Quick Filters"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  <FilterPill
                    active={filters.destaque === "featured"}
                    onClick={() => updateFilter("destaque", filters.destaque === "featured" ? "all" : "featured")}
                    icon={<Sparkles className="h-3 w-3" />}
                    label={lang === "pt" ? "Destaques" : "Featured"}
                  />
                  <FilterPill
                    active={filters.status === "active"}
                    onClick={() => updateFilter("status", filters.status === "active" ? "all" : "active")}
                    icon={<Target className="h-3 w-3" />}
                    label={lang === "pt" ? "Ativos" : "Active"}
                  />
                  <FilterPill
                    active={filters.categoria === "real-projects"}
                    onClick={() => updateFilter("categoria", filters.categoria === "real-projects" ? "all" : "real-projects")}
                    icon={<span className="text-xs">🏢</span>}
                    label={lang === "pt" ? "Reais" : "Real"}
                  />
                </div>
              </div>

              {/* Filtros detalhados */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <FilterSelect
                  label={lang === "pt" ? "Categoria" : "Category"}
                  value={filters.categoria}
                  onChange={(value) => updateFilter("categoria", value as ProjetoCategoria | "all")}
                  options={[
                    { value: "all", label: lang === "pt" ? "Todas" : "All" },
                    { value: "websites", label: lang === "pt" ? "Sites" : "Websites", icon: "🌐" },
                    { value: "applications", label: lang === "pt" ? "Apps" : "Applications", icon: "📱" },
                    { value: "apis", label: "APIs", icon: "⚡" },
                    { value: "real-projects", label: lang === "pt" ? "Projetos Reais" : "Real Projects", icon: "🏢" },
                    { value: "academic", label: lang === "pt" ? "Acadêmicos" : "Academic", icon: "🎓" },
                    { value: "tools", label: lang === "pt" ? "Ferramentas" : "Tools", icon: "🔧" }
                  ]}
                />

                <FilterSelect
                  label={lang === "pt" ? "Complexidade" : "Complexity"}
                  value={filters.complexidade}
                  onChange={(value) => updateFilter("complexidade", value as ProjetoComplexidade | "all")}
                  options={[
                    { value: "all", label: lang === "pt" ? "Todas" : "All" },
                    { value: "basic", label: lang === "pt" ? "Básico" : "Basic" },
                    { value: "intermediate", label: lang === "pt" ? "Intermediário" : "Intermediate" },
                    { value: "advanced", label: lang === "pt" ? "Avançado" : "Advanced" },
                    { value: "expert", label: lang === "pt" ? "Expert" : "Expert" }
                  ]}
                />

                <FilterSelect
                  label={lang === "pt" ? "Tecnologia" : "Technology"}
                  value={filters.tecnologia}
                  onChange={(value) => updateFilter("tecnologia", value)}
                  options={[
                    { value: "all", label: lang === "pt" ? "Todas" : "All" },
                    ...technologies.map(tech => ({ value: tech, label: tech }))
                  ]}
                />

                <FilterSelect
                  label={lang === "pt" ? "Ordenar por" : "Sort by"}
                  value={filters.ordenacao}
                  onChange={(value) => updateFilter("ordenacao", value as FilterState["ordenacao"])}
                  options={[
                    { value: "date-desc", label: lang === "pt" ? "Mais Recente" : "Newest First" },
                    { value: "date-asc", label: lang === "pt" ? "Mais Antigo" : "Oldest First" },
                    { value: "name-asc", label: lang === "pt" ? "Nome (A-Z)" : "Name (A-Z)" },
                    { value: "name-desc", label: lang === "pt" ? "Nome (Z-A)" : "Name (Z-A)" },
                    { value: "complexity", label: lang === "pt" ? "Complexidade" : "Complexity" }
                  ]}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resultados e estatísticas */}
      <div className="flex items-center justify-between text-sm text-muted">
        <span>
          {lang === "pt"
            ? `${filteredProjects.length} de ${projects.length} projeto${projects.length !== 1 ? "s" : ""}`
            : `${filteredProjects.length} of ${projects.length} project${projects.length !== 1 ? "s" : ""}`
          }
        </span>

        {/* Estatísticas rápidas */}
        <div className="hidden sm:flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-3 w-3" />
            <span>{projects.filter(p => p.destaque).length} {lang === "pt" ? "destaque" : "featured"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Target className="h-3 w-3" />
            <span>{projects.filter(p => p.status === "active").length} {lang === "pt" ? "ativo" : "active"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componentes auxiliares
function FilterPill({ active, onClick, icon, label }: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
        active
          ? "bg-foreground text-background shadow-sm"
          : "bg-surface/80 text-muted hover:text-foreground border border-foreground/10"
      }`}
    >
      {icon}
      {label}
    </motion.button>
  );
}

function FilterSelect({ label, value, onChange, options }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string; icon?: string }[];
}) {
  return (
    <div>
      <label className="text-xs font-medium text-muted mb-2 block">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-foreground/20 bg-background/50 px-3 py-2 text-sm transition-colors focus:border-foreground/40 focus:outline-none backdrop-blur-sm"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.icon ? `${option.icon} ${option.label}` : option.label}
          </option>
        ))}
      </select>
    </div>
  );
}