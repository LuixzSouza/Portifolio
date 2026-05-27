/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, BarChart3, Filter, Download, Grid3X3, List,
  TrendingUp, Eye, GitCompare, Settings, RefreshCw, BookOpen
} from "lucide-react";
import { Container } from "@/components/ds/Container";
import { Section } from "@/components/ds/Section";
import { Button } from "@/components/ds/Button";
import { SearchEngine } from "@/components/advanced/SearchEngine";
import { WorkStats } from "@/components/sections/WorkStats";
import { WorkFilters } from "@/components/sections/WorkFilters";
import { SkeletonGrid } from "@/components/ui/SkeletonLoader";
import { PerformanceAnalyzer } from "@/components/advanced/PerformanceAnalyzer";
import { ProjectComparison } from "@/components/advanced/ProjectComparison";
import { DataExporter } from "@/components/advanced/DataExporter";
import { projetos, type Projeto } from "@/data/projects";
import { listProjects } from "@/lib/api";
import { useTranslations } from "@/content/useTranslations";

type ViewMode = "grid" | "list" | "stats" | "comparison";

interface DashboardSettings {
  showPerformance: boolean;
  autoRefresh: boolean;
  refreshInterval: number;
  viewMode: ViewMode;
  showFilters: boolean;
}

const DEFAULT_SETTINGS: DashboardSettings = {
  showPerformance: true,
  autoRefresh: false,
  refreshInterval: 30000, // 30 seconds
  viewMode: "grid",
  showFilters: true,
};

export function WorkDashboard() {
  const _t = useTranslations();
  const [projects, setProjects] = useState<Projeto[]>(projetos);
  const [filteredProjects, setFilteredProjects] = useState<Projeto[]>(projetos);
  const [isLoading, setIsLoading] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [settings, setSettings] = useState<DashboardSettings>(DEFAULT_SETTINGS);
  const [selectedProjects, setSelectedProjects] = useState<Set<string>>(new Set());

  // Auto-refresh functionality
  useEffect(() => {
    if (!settings.autoRefresh) return;

    const interval = setInterval(() => {
      refreshData();
    }, settings.refreshInterval);

    return () => clearInterval(interval);
  }, [settings.autoRefresh, settings.refreshInterval]);

  const refreshData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await listProjects();
      if (data.length > 0) {
        setProjects(data as unknown as Projeto[]);
      }
    } catch (error) {
      console.warn("Failed to refresh projects:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSearch = useCallback((results: Projeto[]) => {
    setFilteredProjects(results);
  }, []);

  const handleFilterChange = useCallback((filtered: Projeto[]) => {
    setFilteredProjects(filtered);
  }, []);

  const handleProjectSelect = useCallback((projectId: string, selected: boolean) => {
    setSelectedProjects(prev => {
      const newSet = new Set(prev);
      if (selected) {
        newSet.add(projectId);
      } else {
        newSet.delete(projectId);
      }
      return newSet;
    });
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedProjects(new Set());
  }, []);

  const updateSettings = useCallback((updates: Partial<DashboardSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  }, []);

  const stats = useMemo(() => ({
    total: projects.length,
    filtered: filteredProjects.length,
    selected: selectedProjects.size,
    featured: projects.filter(p => p.destaque).length,
    active: projects.filter(p => p.status === "active").length,
  }), [projects, filteredProjects, selectedProjects]);

  const viewModes = [
    { key: "grid" as const, label: "Grade", icon: Grid3X3 },
    { key: "list" as const, label: "Lista", icon: List },
    { key: "stats" as const, label: "Analytics", icon: BarChart3 },
    { key: "comparison" as const, label: "Comparação", icon: GitCompare },
  ];

  return (
    <Section className="py-16">
      <Container>
        {/* Dashboard Header */}
        <div className="mb-8 space-y-6">
          {/* Main Controls */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Left: Search & Quick Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="outline"
                size="md"
                onClick={() => setSearchOpen(true)}
                className="gap-2"
              >
                <Search className="h-4 w-4" />
                Busca Avançada
                <span className="ml-2 rounded bg-foreground/10 px-1.5 py-0.5 text-xs">
                  ⌘K
                </span>
              </Button>

              <Button
                variant={settings.showFilters ? "solid" : "outline"}
                size="md"
                onClick={() => updateSettings({ showFilters: !settings.showFilters })}
                className="gap-2"
              >
                <Filter className="h-4 w-4" />
                Filtros
              </Button>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 rounded-lg bg-surface/50 px-3 py-2 text-sm font-medium"
              >
                <Eye className="h-4 w-4 text-muted" />
                <span className="text-foreground">{stats.filtered}</span>
                <span className="text-muted">/ {stats.total}</span>
              </motion.div>

              {selectedProjects.size > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2"
                >
                  <div className="rounded-lg bg-blue-500/10 px-3 py-2 text-sm font-medium text-blue-600">
                    {selectedProjects.size} selecionado{selectedProjects.size > 1 ? "s" : ""}
                  </div>
                  <Button variant="outline" size="md" onClick={clearSelection}>
                    Limpar
                  </Button>
                </motion.div>
              )}
            </div>

            {/* Right: View Mode & Settings */}
            <div className="flex items-center gap-3">
              {/* View Mode Toggle */}
              <div className="flex rounded-lg border border-foreground/20 p-1">
                {viewModes.map((mode) => {
                  const Icon = mode.icon;
                  const active = settings.viewMode === mode.key;
                  return (
                    <button
                      key={mode.key}
                      onClick={() => updateSettings({ viewMode: mode.key })}
                      className={`relative flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
                        active ? "text-background" : "text-muted hover:text-foreground"
                      }`}
                    >
                      {active && (
                        <motion.div
                          layoutId="view-mode-bg"
                          className="absolute inset-0 rounded-md bg-foreground"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      <Icon className="relative z-10 h-4 w-4" />
                      <span className="relative z-10 hidden sm:inline">{mode.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Refresh & Export */}
              <Button
                variant="outline"
                size="md"
                onClick={refreshData}
                disabled={isLoading}
                className="gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                <span className="hidden sm:inline">
                  {isLoading ? "Carregando..." : "Atualizar"}
                </span>
              </Button>

              <DataExporter
                data={filteredProjects}
                filename="luiz-souza-projects"
                selectedIds={selectedProjects}
              />

              {/* Settings Menu */}
              <div className="relative">
                <Button variant="ghost" size="md" className="p-2">
                  <Settings className="h-4 w-4" />
                </Button>
                {/* Settings panel would go here */}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <div className="rounded-lg border border-foreground/10 bg-surface/30 p-4">
              <div className="text-2xl font-bold text-foreground">{stats.total}</div>
              <div className="text-sm text-muted">Total de Projetos</div>
            </div>
            <div className="rounded-lg border border-foreground/10 bg-surface/30 p-4">
              <div className="text-2xl font-bold text-foreground">{stats.featured}</div>
              <div className="text-sm text-muted">Em Destaque</div>
            </div>
            <div className="rounded-lg border border-foreground/10 bg-surface/30 p-4">
              <div className="text-2xl font-bold text-foreground">{stats.active}</div>
              <div className="text-sm text-muted">Ativos</div>
            </div>
            <div className="rounded-lg border border-foreground/10 bg-surface/30 p-4">
              <div className="text-2xl font-bold text-foreground">{stats.filtered}</div>
              <div className="text-sm text-muted">Filtrados</div>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {settings.showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8"
            >
              <WorkFilters projects={projects} onFilter={handleFilterChange} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <div className="space-y-8">
          {isLoading && <SkeletonGrid count={6} />}

          {!isLoading && (
            <AnimatePresence mode="wait">
              <motion.div
                key={settings.viewMode}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {settings.viewMode === "stats" && (
                  <WorkStats projects={filteredProjects} />
                )}

                {settings.viewMode === "comparison" && (
                  <ProjectComparison
                    projects={filteredProjects}
                    selectedIds={selectedProjects}
                    onSelectionChange={handleProjectSelect}
                  />
                )}

                {(settings.viewMode === "grid" || settings.viewMode === "list") && (
                  <div className="rounded-lg border border-foreground/10 bg-surface/30 p-6">
                    <div className="flex items-center justify-center h-32">
                      <div className="text-center">
                        <BookOpen className="mx-auto h-8 w-8 text-muted mb-2" />
                        <div className="text-sm text-muted">
                          Integração com WorkGridEnhanced em desenvolvimento
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* Performance Monitor */}
        {settings.showPerformance && (
          <div className="mt-8">
            <PerformanceAnalyzer />
          </div>
        )}

        {/* Search Engine Modal */}
        {searchOpen && (
          <SearchEngine
            projects={projects}
            onSelect={() => setSearchOpen(false)}
          />
        )}
      </Container>
    </Section>
  );
}