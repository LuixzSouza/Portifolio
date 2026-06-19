"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Search,
  TrendingUp,
  Layers,
  Eye,
  EyeOff,
  Plus,
  RotateCw,
  Grid3X3,
  List,
  ArrowRight,
  FolderGit2,
  Award,
  Quote,
  Milestone as MilestoneIcon,
  Briefcase,
  type LucideIcon,
} from "lucide-react";
import {
  ApiError,
  listAllProjects,
  listAllCertificates,
  listAllTestimonials,
  listAllMilestones,
  listSkillGroups,
  listAllServices,
} from "@/lib/api";
import type { Project } from "@/lib/schemas/project";
import type { Certificate } from "@/lib/schemas/certificate";
import type { Testimonial } from "@/lib/schemas/testimonial";
import type { Milestone } from "@/lib/schemas/milestone";
import type { SkillGroup } from "@/lib/schemas/skill";
import type { Service } from "@/lib/schemas/service";
import { useAdmin } from "./AdminProvider";
import { PreviewCard, PreviewGrid, type PreviewData } from "./PreviewCard";

interface EntityData {
  projects: Project[];
  certificates: Certificate[];
  testimonials: Testimonial[];
  milestones: Milestone[];
  skills: SkillGroup[];
  services: Service[];
}

const QUICK_ACTIONS: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "projects", label: "Projetos", icon: FolderGit2 },
  { id: "certificates", label: "Certificados", icon: Award },
  { id: "testimonials", label: "Depoimentos", icon: Quote },
  { id: "milestones", label: "Trajetória", icon: MilestoneIcon },
  { id: "skills", label: "Skills", icon: Layers },
  { id: "services", label: "Serviços", icon: Briefcase },
];

type ViewMode = "grid" | "list";
type FilterType = "all" | "published" | "draft";

export function Overview({ onNavigate }: { onNavigate: (id: string) => void }) {
  const { user } = useAdmin();
  const [data, setData] = useState<Partial<EntityData>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // UI State
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const load = useCallback(() => {
    setLoading(true);
    setError(null);

    Promise.all([
      listAllProjects(),
      listAllCertificates(),
      listAllTestimonials(),
      listAllMilestones(),
      listSkillGroups(),
      listAllServices(),
    ])
      .then(([projects, certificates, testimonials, milestones, skills, services]) => {
        setData({ projects, certificates, testimonials, milestones, skills, services });
      })
      .catch((e: unknown) =>
        setError(e instanceof ApiError ? e.message : "Erro ao carregar os dados.")
      )
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => load(), [load]);

  // Estatísticas agregadas de TODAS as entidades. As que têm `publicado`
  // (tudo menos grupos de skills) entram em publicados/rascunhos; skills contam
  // só no total (estão sempre visíveis).
  const withPublished = [
    ...(data.projects ?? []),
    ...(data.certificates ?? []),
    ...(data.testimonials ?? []),
    ...(data.milestones ?? []),
    ...(data.services ?? []),
  ];
  const skillsCount = (data.skills ?? []).length;
  const totalItems = withPublished.length + skillsCount;
  const publishedItems = withPublished.filter((i) => i.publicado).length;
  const draftItems = withPublished.length - publishedItems;

  // Contagem por entidade para os atalhos.
  const counts: Record<string, number> = {
    projects: (data.projects ?? []).length,
    certificates: (data.certificates ?? []).length,
    testimonials: (data.testimonials ?? []).length,
    milestones: (data.milestones ?? []).length,
    skills: skillsCount,
    services: (data.services ?? []).length,
  };

  // Converte projetos para preview data
  const recentItems: PreviewData[] = [
    ...(data.projects || []).slice(0, 6).map(projectToPreview),
    ...(data.certificates || []).slice(0, 6).map(certificateToPreview),
  ].slice(0, 8);

  // Filtros e busca
  const filteredItems = recentItems.filter(item => {
    const matchesSearch = searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesFilter =
      filterType === "all" ||
      (filterType === "published" && item.published) ||
      (filterType === "draft" && !item.published);

    return matchesSearch && matchesFilter;
  });

  if (error) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-2xl border border-red-500/30 bg-red-500/10 p-6">
        <p className="text-sm text-red-500">{error}</p>
        <button
          type="button"
          onClick={load}
          className="flex items-center gap-2 rounded-xl border border-foreground/15 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
        >
          <RotateCw className="h-4 w-4" /> Tentar de novo
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div>
          <h2 className="font-roobert text-2xl font-semibold text-foreground">
            Olá, {user?.username}! 👋
          </h2>
          <p className="text-sm text-muted">
            Gerencie todo o conteúdo do seu portfólio de forma visual e intuitiva.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={<TrendingUp className="h-5 w-5" />}
            label="Total de itens"
            value={totalItems}
            subtitle="Em todas as coleções"
            loading={loading}
          />
          <StatCard
            icon={<Eye className="h-5 w-5" />}
            label="Publicados"
            value={publishedItems}
            subtitle="Visíveis no site"
            loading={loading}
            variant="success"
          />
          <StatCard
            icon={<EyeOff className="h-5 w-5" />}
            label="Rascunhos"
            value={draftItems}
            subtitle="Ocultos do público"
            loading={loading}
            variant="warning"
          />
          <StatCard
            icon={<Layers className="h-5 w-5" />}
            label="Coleções"
            value={6}
            subtitle="Tipos de conteúdo"
            loading={loading}
            variant="info"
          />
        </div>
      </div>

      {/* Content Browser */}
      <div className="space-y-6">
        {/* Controls */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Buscar projetos, certificados..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-foreground/20 bg-background pl-10 pr-4 py-2.5 text-sm transition-colors focus:border-foreground/40 focus:outline-none focus:ring-0"
            />
          </div>

          {/* Filters & View */}
          <div className="flex items-center gap-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as FilterType)}
              className="rounded-xl border border-foreground/20 bg-background px-3 py-2.5 text-sm transition-colors focus:border-foreground/40"
            >
              <option value="all">Todos</option>
              <option value="published">Publicados</option>
              <option value="draft">Rascunhos</option>
            </select>

            <div className="flex rounded-xl border border-foreground/20 bg-background">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`p-2.5 rounded-l-xl transition-colors ${
                  viewMode === "grid" ? "bg-foreground text-background" : "text-muted hover:text-foreground"
                }`}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`p-2.5 rounded-r-xl transition-colors ${
                  viewMode === "list" ? "bg-foreground text-background" : "text-muted hover:text-foreground"
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        {loading ? (
          <PreviewGrid>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-video rounded-2xl border border-foreground/10 bg-surface animate-pulse" />
            ))}
          </PreviewGrid>
        ) : filteredItems.length > 0 ? (
          viewMode === "grid" ? (
            <PreviewGrid>
              {filteredItems.map((item, index) => {
                const isProject = item.tags?.includes("projeto");
                return (
                  <PreviewCard
                    key={`${item.title}-${index}`}
                    data={item}
                    type={isProject ? "project" : "certificate"}
                    onClick={() => onNavigate(isProject ? "projects" : "certificates")}
                  />
                );
              })}
            </PreviewGrid>
          ) : (
            <div className="space-y-2">
              {filteredItems.map((item, index) => {
                const isProject = item.tags?.includes("projeto");
                const Icon = isProject ? FolderGit2 : Award;
                return (
                  <button
                    key={`${item.title}-${index}`}
                    type="button"
                    onClick={() => onNavigate(isProject ? "projects" : "certificates")}
                    className="group flex w-full items-center gap-4 rounded-xl border border-foreground/10 bg-surface p-4 text-left transition-colors hover:border-foreground/20 hover:bg-foreground/5"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-foreground/5 text-foreground/50">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="truncate font-medium text-foreground">{item.title}</h3>
                        <span
                          className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                            item.published
                              ? "bg-green-500/10 text-green-600"
                              : "bg-orange-500/10 text-orange-600"
                          }`}
                        >
                          {item.published ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                          {item.published ? "Publicado" : "Rascunho"}
                        </span>
                      </div>
                      {item.subtitle && (
                        <p className="truncate text-sm text-muted">{item.subtitle}</p>
                      )}
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-1" />
                  </button>
                );
              })}
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-foreground/10 p-3 mb-4">
              <Search className="h-6 w-6 text-muted" />
            </div>
            <h3 className="font-roobert font-semibold text-foreground mb-2">
              Nenhum item encontrado
            </h3>
            <p className="text-sm text-muted mb-6">
              Tente ajustar sua busca ou filtros, ou comece criando novo conteúdo.
            </p>
            <button
              type="button"
              onClick={() => onNavigate("projects")}
              className="flex items-center gap-2 rounded-xl bg-foreground text-background px-4 py-2 text-sm font-medium transition-colors hover:bg-foreground/90"
            >
              <Plus className="h-4 w-4" />
              Criar primeiro projeto
            </button>
          </div>
        )}

        {/* Quick Actions — uma por entidade, com contagem real */}
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted">
            Gerenciar conteúdo
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {QUICK_ACTIONS.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  type="button"
                  onClick={() => onNavigate(action.id)}
                  className="group flex items-center justify-between rounded-2xl border border-foreground/10 bg-surface/50 p-4 transition-all hover:border-foreground/20 hover:bg-foreground/5"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground/5 text-foreground/70">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="text-left">
                      <span className="block font-medium text-foreground">{action.label}</span>
                      <span className="text-xs text-muted">
                        {loading ? "…" : `${counts[action.id] ?? 0} ${counts[action.id] === 1 ? "item" : "itens"}`}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted transition-transform group-hover:translate-x-1" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function StatCard({
  icon,
  label,
  value,
  subtitle,
  loading,
  variant = "default",
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  subtitle: string;
  loading?: boolean;
  variant?: "default" | "success" | "warning" | "info";
}) {
  const colors = {
    default: "bg-foreground/5 text-foreground",
    success: "bg-green-500/10 text-green-600",
    warning: "bg-orange-500/10 text-orange-600",
    info: "bg-blue-500/10 text-blue-600",
  };

  return (
    <div className="rounded-2xl border border-foreground/10 bg-surface p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 rounded-xl ${colors[variant]}`}>
          {icon}
        </div>
        <span className="text-sm font-medium text-foreground">{label}</span>
      </div>
      {loading ? (
        <div className="space-y-2">
          <div className="h-8 w-16 rounded bg-foreground/10 animate-pulse" />
          <div className="h-4 w-24 rounded bg-foreground/5 animate-pulse" />
        </div>
      ) : (
        <div>
          <div className="font-roobert text-2xl font-semibold text-foreground tabular-nums">
            {value.toLocaleString()}
          </div>
          <div className="text-xs text-muted">{subtitle}</div>
        </div>
      )}
    </div>
  );
}

// Helper Functions
function projectToPreview(project: Project): PreviewData {
  return {
    title: project.nome,
    subtitle: project.tecnologias.join(", "),
    description: typeof project.descricao === "string" ? project.descricao : project.descricao?.pt || "",
    image: project.imagem,
    published: project.publicado,
    url: project.links.verProjeto,
    tags: [...project.tecnologias, "projeto"],
    date: typeof project.data === "string" ? project.data : project.data?.pt || "",
  };
}

function certificateToPreview(certificate: Certificate): PreviewData {
  return {
    title: certificate.course,
    subtitle: certificate.issuer,
    description: typeof certificate.description === "string" ? certificate.description : certificate.description?.pt || "",
    image: certificate.image,
    published: certificate.publicado,
    tags: [...certificate.skills, "certificado"],
    date: certificate.date,
  };
}