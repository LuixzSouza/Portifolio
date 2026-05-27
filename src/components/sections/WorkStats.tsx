/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Award, Code2, Users, Clock, Target, Sparkles } from "lucide-react";
import { type Projeto } from "@/data/projects";
import { useLanguage } from "@/components/ds/LanguageProvider";
import { useTranslations } from "@/content/useTranslations";

interface WorkStatsProps {
  projects: Projeto[];
  className?: string;
}

export function WorkStats({ projects, className = "" }: WorkStatsProps) {
  const { lang } = useLanguage();
  const _t = useTranslations();

  const stats = useMemo(() => {
    const totalProjects = projects.length;
    const activeProjects = projects.filter(p => p.status === "active").length;
    const featuredProjects = projects.filter(p => p.destaque).length;
    const realProjects = projects.filter(p => p.categoria === "real-projects").length;

    // Tecnologias mais usadas
    const techCount: Record<string, number> = {};
    projects.forEach(project => {
      project.tecnologias?.forEach(tech => {
        techCount[tech] = (techCount[tech] || 0) + 1;
      });
    });
    const topTechnologies = Object.entries(techCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);

    // Distribuição de complexidade
    const complexityCount = projects.reduce((acc, project) => {
      acc[project.complexidade] = (acc[project.complexidade] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Projetos por categoria
    const categoryCount = projects.reduce((acc, project) => {
      acc[project.categoria] = (acc[project.categoria] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Estatísticas de tempo (se disponível)
    const projectsWithDuration = projects.filter(p => p.duracao).length;
    const projectsWithTeam = projects.filter(p => p.tamanhoEquipe && p.tamanhoEquipe > 1).length;

    return {
      totalProjects,
      activeProjects,
      featuredProjects,
      realProjects,
      topTechnologies,
      complexityCount,
      categoryCount,
      projectsWithDuration,
      projectsWithTeam,
      completionRate: Math.round((activeProjects / totalProjects) * 100),
      featuredRate: Math.round((featuredProjects / totalProjects) * 100),
    };
  }, [projects]);

  const mainStats = [
    {
      icon: <Code2 className="h-5 w-5" />,
      value: stats.totalProjects,
      label: lang === "pt" ? "Total de Projetos" : "Total Projects",
      color: "text-blue-600",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: <Target className="h-5 w-5" />,
      value: stats.activeProjects,
      label: lang === "pt" ? "Projetos Ativos" : "Active Projects",
      color: "text-green-600",
      bgColor: "bg-green-500/10"
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      value: stats.featuredProjects,
      label: lang === "pt" ? "Projetos Destaque" : "Featured Projects",
      color: "text-purple-600",
      bgColor: "bg-purple-500/10"
    },
    {
      icon: <Award className="h-5 w-5" />,
      value: stats.realProjects,
      label: lang === "pt" ? "Projetos Reais" : "Real Projects",
      color: "text-amber-600",
      bgColor: "bg-amber-500/10"
    }
  ];

  const secondaryStats = [
    {
      icon: <TrendingUp className="h-5 w-5" />,
      value: `${stats.completionRate}%`,
      label: lang === "pt" ? "Taxa de Conclusão" : "Completion Rate",
    },
    {
      icon: <BarChart3 className="h-5 w-5" />,
      value: `${stats.featuredRate}%`,
      label: lang === "pt" ? "Taxa de Destaque" : "Featured Rate",
    },
    {
      icon: <Clock className="h-5 w-5" />,
      value: stats.projectsWithDuration,
      label: lang === "pt" ? "Com Duração Definida" : "With Duration Defined",
    },
    {
      icon: <Users className="h-5 w-5" />,
      value: stats.projectsWithTeam,
      label: lang === "pt" ? "Projetos em Equipe" : "Team Projects",
    }
  ];

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={`space-y-8 ${className}`}
    >
      {/* Estatísticas principais */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {mainStats.map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="relative overflow-hidden rounded-2xl border border-foreground/10 bg-surface/50 p-6 backdrop-blur-sm"
          >
            {/* Efeito de gradiente de fundo */}
            <div className={`absolute inset-0 ${stat.bgColor} opacity-50`} />

            <div className="relative space-y-3">
              <div className={`inline-flex rounded-lg p-2 ${stat.bgColor} ${stat.color}`}>
                {stat.icon}
              </div>

              <div className="space-y-1">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1, type: "spring", stiffness: 100 }}
                  className="text-2xl font-bold text-foreground md:text-3xl"
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm font-medium text-muted">{stat.label}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Estatísticas secundárias */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {secondaryStats.map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="flex items-center gap-3 rounded-xl border border-foreground/10 bg-surface/30 p-4 backdrop-blur-sm"
          >
            <div className="text-muted">{stat.icon}</div>
            <div className="min-w-0 flex-1">
              <div className="text-lg font-semibold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tecnologias mais usadas */}
      <motion.div
        variants={itemVariants}
        className="rounded-2xl border border-foreground/10 bg-surface/50 p-6 backdrop-blur-sm"
      >
        <h3 className="mb-4 text-lg font-semibold text-foreground">
          {lang === "pt" ? "Tecnologias Mais Usadas" : "Most Used Technologies"}
        </h3>

        <div className="space-y-3">
          {stats.topTechnologies.map(([tech, count], index) => (
            <div key={tech} className="flex items-center gap-3">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground">{tech}</span>
                  <span className="text-xs text-muted">
                    {count} projeto{count > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-foreground/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(count / stats.totalProjects) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.8, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Distribuição de complexidade */}
      <motion.div
        variants={itemVariants}
        className="rounded-2xl border border-foreground/10 bg-surface/50 p-6 backdrop-blur-sm"
      >
        <h3 className="mb-4 text-lg font-semibold text-foreground">
          {lang === "pt" ? "Distribuição de Complexidade" : "Complexity Distribution"}
        </h3>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {Object.entries(stats.complexityCount).map(([complexity, count]) => {
            const percentage = Math.round((count / stats.totalProjects) * 100);
            const complexityColors = {
              basic: "bg-emerald-500/20 text-emerald-600",
              intermediate: "bg-yellow-500/20 text-yellow-600",
              advanced: "bg-orange-500/20 text-orange-600",
              expert: "bg-red-500/20 text-red-600"
            };

            const complexityLabels = {
              basic: lang === "pt" ? "Básico" : "Basic",
              intermediate: lang === "pt" ? "Intermediário" : "Intermediate",
              advanced: lang === "pt" ? "Avançado" : "Advanced",
              expert: lang === "pt" ? "Expert" : "Expert"
            };

            return (
              <div
                key={complexity}
                className={`rounded-lg p-4 text-center ${complexityColors[complexity as keyof typeof complexityColors]}`}
              >
                <div className="text-2xl font-bold">{count}</div>
                <div className="text-xs font-medium">
                  {complexityLabels[complexity as keyof typeof complexityLabels]}
                </div>
                <div className="text-xs opacity-75">{percentage}%</div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}