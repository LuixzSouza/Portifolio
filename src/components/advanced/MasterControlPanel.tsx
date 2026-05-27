/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings, BarChart3, FlaskConical, Smartphone, Search, Monitor,
  CheckCircle, AlertCircle, RefreshCw, ChevronRight, TrendingUp, Eye, Zap, Brain, Star, Clock
} from "lucide-react";
import { Button } from "@/components/ds/Button";
import { Text } from "@/components/ds/Text";
import { Heading } from "@/components/ds/Heading";
import { Container } from "@/components/ds/Container";
import { Section } from "@/components/ds/Section";

// Components
import { PerformanceAnalyzer } from "@/components/advanced/PerformanceAnalyzer";
import { ContentOptimizer } from "@/components/advanced/ContentOptimizer";
import { ABTestingDashboard } from "@/components/advanced/ABTestingFramework";
import { PWAManager } from "@/components/advanced/PWAManager";
import { SearchEngine } from "@/components/advanced/SearchEngine";
import { WorkStats } from "@/components/sections/WorkStats";
import { DataExporter } from "@/components/advanced/DataExporter";
import { projetos } from "@/data/projects";

// Types
interface PanelTab {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  status: "healthy" | "warning" | "error" | "info";
  component: React.ComponentType;
}

interface SystemHealth {
  overall: "healthy" | "warning" | "critical";
  metrics: {
    performance: number;
    seo: number;
    accessibility: number;
    pwa: number;
    cache: number;
  };
  lastCheck: string;
  issues: {
    critical: number;
    warning: number;
    info: number;
  };
}

// Mock system health data
const getSystemHealth = (): SystemHealth => {
  return {
    overall: "healthy",
    metrics: {
      performance: 94,
      seo: 88,
      accessibility: 92,
      pwa: 85,
      cache: 96
    },
    lastCheck: new Date().toISOString(),
    issues: {
      critical: 0,
      warning: 2,
      info: 5
    }
  };
};

export function MasterControlPanel() {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [systemHealth, setSystemHealth] = useState<SystemHealth>(getSystemHealth());
  const [searchOpen, setSearchOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Update system health periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemHealth(getSystemHealth());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const tabs: PanelTab[] = [
    {
      id: "overview",
      name: "Visão Geral",
      icon: Monitor,
      description: "Dashboard principal com métricas do sistema",
      status: "healthy",
      component: () => <OverviewDashboard health={systemHealth} />
    },
    {
      id: "performance",
      name: "Performance",
      icon: Zap,
      description: "Análise de performance e otimização",
      status: systemHealth.metrics.performance > 90 ? "healthy" : "warning",
      component: PerformanceAnalyzer
    },
    {
      id: "content",
      name: "Conteúdo IA",
      icon: Brain,
      description: "Otimização inteligente de conteúdo",
      status: "info",
      component: ContentOptimizer
    },
    {
      id: "analytics",
      name: "Analytics",
      icon: BarChart3,
      description: "Métricas e estatísticas detalhadas",
      status: "healthy",
      component: () => <WorkStats projects={projetos} />
    },
    {
      id: "testing",
      name: "A/B Testing",
      icon: FlaskConical,
      description: "Experimentos e testes de conversão",
      status: "info",
      component: ABTestingDashboard
    },
    {
      id: "pwa",
      name: "PWA",
      icon: Smartphone,
      description: "Progressive Web App e funcionalidades nativas",
      status: systemHealth.metrics.pwa > 80 ? "healthy" : "warning",
      component: PWAManager
    }
  ];

  const getStatusColor = (status: PanelTab["status"]) => {
    switch (status) {
      case "healthy": return "text-green-600";
      case "warning": return "text-yellow-600";
      case "error": return "text-red-600";
      case "info": return "text-blue-600";
      default: return "text-gray-600";
    }
  };

  const getStatusIcon = (status: PanelTab["status"]) => {
    switch (status) {
      case "healthy": return CheckCircle;
      case "warning": return AlertCircle;
      case "error": return AlertCircle;
      case "info": return Star;
      default: return Clock;
    }
  };

  const activeTabData = tabs.find(tab => tab.id === activeTab);
  const ActiveComponent = activeTabData?.component || OverviewDashboard;

  return (
    <Section className="min-h-screen py-16">
      <Container>
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Settings className="h-8 w-8 text-foreground" />
            <div>
              <Heading as="h1" size="display-md">
                Centro de Controle
              </Heading>
              <Text tone="muted" size="lg">
                Painel avançado de gerenciamento e otimização
              </Text>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="md"
              onClick={() => setSearchOpen(true)}
              className="gap-2"
            >
              <Search className="h-4 w-4" />
              Buscar
            </Button>

            <DataExporter
              data={projetos}
              filename="portfolio-data"
            />

            <Button
              variant="ghost"
              size="md"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="lg:hidden"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* System Health Summary */}
        <div className="mb-8 rounded-2xl border border-foreground/20 bg-surface/50 p-6">
          <div className="mb-4 flex items-center justify-between">
            <Heading as="h2" size="display-md">Status do Sistema</Heading>
            <div className={`flex items-center gap-2 ${
              systemHealth.overall === "healthy" ? "text-green-600" :
              systemHealth.overall === "warning" ? "text-yellow-600" : "text-red-600"
            }`}>
              {systemHealth.overall === "healthy" && <CheckCircle className="h-5 w-5" />}
              {systemHealth.overall === "warning" && <AlertCircle className="h-5 w-5" />}
              {systemHealth.overall === "critical" && <AlertCircle className="h-5 w-5" />}
              <span className="font-medium capitalize">{systemHealth.overall}</span>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid gap-4 md:grid-cols-5">
            {Object.entries(systemHealth.metrics).map(([metric, value]) => (
              <div key={metric} className="text-center">
                <div className={`text-2xl font-bold ${
                  value >= 90 ? "text-green-600" :
                  value >= 70 ? "text-yellow-600" : "text-red-600"
                }`}>
                  {value}
                </div>
                <div className="text-sm text-muted capitalize">{metric}</div>
                <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-foreground/10">
                  <div
                    className={`h-full transition-all duration-500 ${
                      value >= 90 ? "bg-green-500" :
                      value >= 70 ? "bg-yellow-500" : "bg-red-500"
                    }`}
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Issues Summary */}
          <div className="mt-4 flex items-center justify-between border-t border-foreground/10 pt-4">
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-red-500" />
                <span className="text-muted">{systemHealth.issues.critical} críticos</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-yellow-500" />
                <span className="text-muted">{systemHealth.issues.warning} avisos</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <span className="text-muted">{systemHealth.issues.info} informações</span>
              </div>
            </div>
            <Text size="sm" tone="muted">
              Última verificação: {new Date(systemHealth.lastCheck).toLocaleTimeString("pt-BR")}
            </Text>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-80 shrink-0"
              >
                <div className="sticky top-8 space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const StatusIcon = getStatusIcon(tab.status);
                    const isActive = activeTab === tab.id;

                    return (
                      <motion.button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full rounded-xl border p-4 text-left transition-all ${
                          isActive
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-foreground/20 hover:border-foreground/40 hover:bg-surface/50"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-start gap-3">
                          <Icon className={`h-6 w-6 ${isActive ? "text-blue-600" : "text-muted"}`} />

                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <Heading as="h3" size="display-sm" className={isActive ? "text-blue-600" : "text-foreground"}>
                                {tab.name}
                              </Heading>
                              <div className="flex items-center gap-1">
                                <StatusIcon className={`h-4 w-4 ${getStatusColor(tab.status)}`} />
                                {isActive && <ChevronRight className="h-4 w-4 text-blue-600" />}
                              </div>
                            </div>
                            <Text size="sm" tone="muted" className="mt-1">
                              {tab.description}
                            </Text>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-foreground/20 bg-surface/30 p-6"
              >
                <ActiveComponent health={systemHealth} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Search Modal */}
        {searchOpen && (
          <SearchEngine
            projects={projetos}
            onSelect={() => {}}
          />
        )}
      </Container>
    </Section>
  );
}

// Overview Dashboard Component
function OverviewDashboard({ health }: { health: SystemHealth }) {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const quickActions = [
    {
      icon: Zap,
      title: "Analisar Performance",
      description: "Verificar métricas de velocidade e otimização",
      color: "text-blue-600",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: Brain,
      title: "Otimizar Conteúdo",
      description: "IA para melhorar SEO e acessibilidade",
      color: "text-purple-600",
      bgColor: "bg-purple-500/10"
    },
    {
      icon: FlaskConical,
      title: "Criar Teste A/B",
      description: "Experimentar variações de design",
      color: "text-green-600",
      bgColor: "bg-green-500/10"
    },
    {
      icon: Smartphone,
      title: "Configurar PWA",
      description: "Funcionalidades de app nativo",
      color: "text-orange-600",
      bgColor: "bg-orange-500/10"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Heading as="h2" size="display-md">Visão Geral do Sistema</Heading>
          <Text tone="muted" size="sm">
            Dashboard centralizado com todas as métricas importantes
          </Text>
        </div>
        <Button
          variant="outline"
          size="md"
          onClick={handleRefresh}
          disabled={refreshing}
          className="gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          Atualizar
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-foreground/20 bg-surface/50 p-4">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-blue-600" />
            <div>
              <div className="text-2xl font-bold text-foreground">{projetos.length}</div>
              <div className="text-sm text-muted">Total de Projetos</div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-foreground/20 bg-surface/50 p-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-green-600" />
            <div>
              <div className="text-2xl font-bold text-foreground">94%</div>
              <div className="text-sm text-muted">Score Performance</div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-foreground/20 bg-surface/50 p-4">
          <div className="flex items-center gap-3">
            <Eye className="h-8 w-8 text-purple-600" />
            <div>
              <div className="text-2xl font-bold text-foreground">2.4k</div>
              <div className="text-sm text-muted">Visitantes/mês</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <Heading as="h3" size="display-sm">Ações Rápidas</Heading>
        <div className="grid gap-4 md:grid-cols-2">
          {quickActions.map((action, _index) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: _index * 0.1 }}
                className="flex items-center gap-4 rounded-lg border border-foreground/20 bg-surface/50 p-4 transition-all hover:bg-surface/70"
              >
                <div className={`rounded-lg p-3 ${action.bgColor}`}>
                  <Icon className={`h-6 w-6 ${action.color}`} />
                </div>
                <div>
                  <div className="font-medium text-foreground">{action.title}</div>
                  <div className="text-sm text-muted">{action.description}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="space-y-3">
        <Heading as="h3" size="display-sm">Atividade Recente</Heading>
        <div className="space-y-2">
          {[
            { type: "performance", message: "Performance score atualizado: 94/100", time: "há 5 min" },
            { type: "content", message: "3 sugestões de otimização de conteúdo", time: "há 15 min" },
            { type: "cache", message: "Cache atualizado automaticamente", time: "há 1 hora" },
            { type: "pwa", message: "PWA instalado por 2 usuários", time: "há 2 horas" }
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-center gap-3 rounded-lg border border-foreground/20 bg-surface/50 p-3"
            >
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <div className="flex-1">
                <div className="text-sm text-foreground">{activity.message}</div>
              </div>
              <div className="text-xs text-muted">{activity.time}</div>
            </div>
          ))}
        </div>
      </div>

      {/* System Info */}
      <div className="rounded-lg border border-foreground/20 bg-surface/50 p-4">
        <Heading as="h3" size="display-sm" className="mb-3">Informações do Sistema</Heading>
        <div className="grid gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted">Versão:</span>
            <span className="font-mono">v2.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Última atualização:</span>
            <span>{new Date().toLocaleDateString("pt-BR")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Framework:</span>
            <span>Next.js 15 + React 19</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Hosting:</span>
            <span>Vercel + Hostinger</span>
          </div>
        </div>
      </div>
    </div>
  );
}