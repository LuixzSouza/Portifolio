"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  FolderGit2,
  Award,
  Quote,
  Milestone,
  Layers,
  Briefcase,
  RotateCw,
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
import { useAdmin } from "./AdminProvider";

type Stat = { total: number; published: number | null };

const ENTITIES: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "projects", label: "Projetos", icon: FolderGit2 },
  { id: "certificates", label: "Certificados", icon: Award },
  { id: "testimonials", label: "Depoimentos", icon: Quote },
  { id: "milestones", label: "Trajetória", icon: Milestone },
  { id: "skills", label: "Skills", icon: Layers },
  { id: "services", label: "Serviços", icon: Briefcase },
];

const countPublished = <T extends { publicado: boolean }>(arr: T[]) =>
  arr.filter((x) => x.publicado).length;

export function AdminOverview({ onNavigate }: { onNavigate: (id: string) => void }) {
  const { user } = useAdmin();
  const [stats, setStats] = useState<Record<string, Stat> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      .then(([projects, certs, tests, miles, skills, servs]) => {
        setStats({
          projects: { total: projects.length, published: countPublished(projects) },
          certificates: { total: certs.length, published: countPublished(certs) },
          testimonials: { total: tests.length, published: countPublished(tests) },
          milestones: { total: miles.length, published: countPublished(miles) },
          skills: { total: skills.length, published: null },
          services: { total: servs.length, published: countPublished(servs) },
        });
      })
      .catch((e: unknown) => setError(e instanceof ApiError ? e.message : "Erro ao carregar os dados."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => load(), [load]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h2 className="font-roobert text-2xl font-semibold text-foreground">
          Olá, {user?.username}
        </h2>
        <p className="text-sm text-muted">Visão geral do conteúdo do site.</p>
      </div>

      {error ? (
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
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ENTITIES.map((e, i) => {
            const Icon = e.icon;
            const stat = stats?.[e.id];
            return (
              <motion.button
                key={e.id}
                type="button"
                onClick={() => onNavigate(e.id)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: i * 0.04 }}
                className="group flex flex-col gap-5 rounded-2xl border border-foreground/10 bg-surface p-5 text-left transition-colors hover:border-foreground/25 hover:bg-foreground/[0.02]"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground/[0.06] text-foreground">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                </div>
                <div className="flex flex-col gap-1">
                  {loading ? (
                    <span className="h-9 w-12 animate-pulse rounded-lg bg-foreground/10" />
                  ) : (
                    <span className="font-roobert text-4xl font-semibold tabular-nums text-foreground">
                      {stat?.total ?? 0}
                    </span>
                  )}
                  <span className="text-sm font-medium text-foreground">{e.label}</span>
                  {!loading && stat?.published !== null && stat?.published !== undefined && (
                    <span className="text-xs text-muted">
                      {stat.published} de {stat.total} publicados
                    </span>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      )}
    </div>
  );
}
