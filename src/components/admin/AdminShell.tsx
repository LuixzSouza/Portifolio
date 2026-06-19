"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LogOut,
  ExternalLink,
  LayoutDashboard,
  FolderGit2,
  Award,
  Quote,
  Milestone,
  Layers,
  Briefcase,
  FileText,
  type LucideIcon,
} from "lucide-react";
import { BrandMark } from "@/components/layout/BrandMark";
import { ThemeToggle } from "@/components/ds/ThemeToggle";
import { useAdmin } from "./AdminProvider";
import { Overview } from "./Overview";
import {
  ProjectsManager,
  CertificatesManager,
  TestimonialsManager,
  MilestonesManager,
  SkillsManager,
  ServicesManager,
} from "./managers";
import { ContentManager } from "./ContentManager";

type TabId =
  | "overview"
  | "projects"
  | "certificates"
  | "testimonials"
  | "milestones"
  | "skills"
  | "services"
  | "content";

const TABS: { id: TabId; label: string; icon: LucideIcon; render: (go: (id: TabId) => void) => React.ReactNode }[] = [
  { id: "overview", label: "Visão geral", icon: LayoutDashboard, render: (go) => <Overview onNavigate={(id) => go(id as TabId)} /> },
  { id: "projects", label: "Projetos", icon: FolderGit2, render: () => <ProjectsManager /> },
  { id: "certificates", label: "Certificados", icon: Award, render: () => <CertificatesManager /> },
  { id: "testimonials", label: "Depoimentos", icon: Quote, render: () => <TestimonialsManager /> },
  { id: "milestones", label: "Trajetória", icon: Milestone, render: () => <MilestonesManager /> },
  { id: "skills", label: "Skills", icon: Layers, render: () => <SkillsManager /> },
  { id: "services", label: "Serviços", icon: Briefcase, render: () => <ServicesManager /> },
  { id: "content", label: "Conteúdo (Sobre)", icon: FileText, render: () => <ContentManager /> },
];

export function AdminShell() {
  const { user, logout } = useAdmin();
  const [tab, setTab] = useState<TabId>("overview");
  const active = TABS.find((t) => t.id === tab) ?? TABS[0];

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="flex shrink-0 flex-col gap-6 border-b border-foreground/10 bg-surface/40 p-5 md:sticky md:top-0 md:h-screen md:w-64 md:border-b-0 md:border-r md:p-6">
        <div className="flex items-center gap-2.5">
          <BrandMark className="text-xl text-foreground" />
          <span className="font-roobert text-sm font-medium text-muted">Painel</span>
        </div>

        <nav className="flex flex-row gap-1 overflow-x-auto pb-1 md:flex-col md:gap-1.5 md:overflow-visible md:pb-0">
          {TABS.map((t) => {
            const isActive = t.id === tab;
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`group relative flex shrink-0 items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm font-medium transition-colors ${
                  isActive ? "text-background" : "text-muted hover:bg-foreground/[0.06] hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="admin-nav-active"
                    className="absolute inset-0 rounded-xl bg-foreground"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-3 whitespace-nowrap">
                  <Icon className="h-4 w-4 shrink-0" strokeWidth={2} />
                  {t.label}
                </span>
              </button>
            );
          })}
        </nav>

        <div className="mt-auto hidden flex-col gap-4 border-t border-foreground/10 pt-5 md:flex">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-foreground text-sm font-semibold uppercase text-background">
              {user?.username?.charAt(0) ?? "A"}
            </span>
            <div className="flex min-w-0 flex-col">
              <span className="truncate font-roobert text-sm font-medium text-foreground">
                {user?.username}
              </span>
              <span className="text-xs text-muted">Administrador</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => logout()}
            className="flex items-center gap-2 rounded-xl px-2 py-1.5 text-sm font-medium text-muted transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
          >
            <LogOut className="h-4 w-4" /> Sair
          </button>
        </div>
      </aside>

      {/* Conteúdo */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-foreground/10 bg-background/80 px-5 py-3.5 backdrop-blur-md md:px-8">
          <span className="flex items-center gap-2 text-sm text-muted">
            <span className="hidden sm:inline">Painel</span>
            <span className="hidden text-foreground/30 sm:inline">/</span>
            <span className="font-medium text-foreground">{active.label}</span>
          </span>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-xl border border-foreground/15 px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="hidden sm:inline">Ver site</span>
            </Link>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => logout()}
              aria-label="Sair"
              className="flex items-center justify-center rounded-xl border border-foreground/15 p-2.5 text-foreground transition-colors hover:bg-foreground/5 md:hidden"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </header>

        <main className="flex-1 px-5 py-8 md:px-8 md:py-10">{active.render(setTab)}</main>
      </div>
    </div>
  );
}
