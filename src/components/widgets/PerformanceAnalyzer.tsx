/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Clock, Zap, Eye, Download, Cpu, Wifi } from "lucide-react";
import { useLanguage } from "@/components/ds/LanguageProvider";

interface PerformanceMetrics {
  loadTime: number;
  domContentLoaded: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
  timeToInteractive: number;
  resourcesLoaded: number;
  resourcesTotal: number;
  connectionType: string;
  deviceMemory: number;
  hardwareConcurrency: number;
}

interface NavigationTiming {
  navigationStart: number;
  loadEventEnd: number;
  domContentLoadedEventEnd: number;
}

const PERFORMANCE_THRESHOLDS = {
  loadTime: { good: 2000, poor: 4000 },
  firstContentfulPaint: { good: 1800, poor: 3000 },
  largestContentfulPaint: { good: 2500, poor: 4000 },
  cumulativeLayoutShift: { good: 0.1, poor: 0.25 },
  firstInputDelay: { good: 100, poor: 300 },
  timeToInteractive: { good: 3800, poor: 7300 },
};

export function PerformanceAnalyzer({ className = "" }: { className?: string }) {
  const { lang } = useLanguage();
  const [metrics, setMetrics] = useState<Partial<PerformanceMetrics>>({});
  const [isVisible, setIsVisible] = useState(false);
  const [isCollecting, setIsCollecting] = useState(true);
  const metricsRef = useRef<Partial<PerformanceMetrics>>({});

  // Coletar métricas de performance
  useEffect(() => {
    const collectMetrics = () => {
      try {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const paint = performance.getEntriesByType('paint');
        const resources = performance.getEntriesByType('resource');

        const newMetrics: Partial<PerformanceMetrics> = {};

        // Timing básico
        if (navigation) {
          newMetrics.loadTime = Math.round(navigation.loadEventEnd - navigation.startTime);
          newMetrics.domContentLoaded = Math.round(navigation.domContentLoadedEventEnd - navigation.startTime);
          newMetrics.timeToInteractive = Math.round(navigation.loadEventEnd - navigation.startTime);
        }

        // Paint metrics
        const fcp = paint.find(p => p.name === 'first-contentful-paint');
        if (fcp) {
          newMetrics.firstContentfulPaint = Math.round(fcp.startTime);
        }

        // Web Vitals (aproximações)
        if ('connection' in navigator) {
          const connection = (navigator as unknown as { connection?: { effectiveType: string } }).connection;
          newMetrics.connectionType = connection?.effectiveType || 'unknown';
        }

        if ('deviceMemory' in navigator) {
          newMetrics.deviceMemory = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 0;
        }

        if ('hardwareConcurrency' in navigator) {
          newMetrics.hardwareConcurrency = navigator.hardwareConcurrency || 0;
        }

        // Recursos carregados
        newMetrics.resourcesLoaded = resources.length;
        newMetrics.resourcesTotal = resources.length;

        // Simular CLS e FID (para demo)
        newMetrics.cumulativeLayoutShift = Math.round(Math.random() * 0.3 * 1000) / 1000;
        newMetrics.firstInputDelay = Math.round(Math.random() * 200);

        // LCP aproximado
        newMetrics.largestContentfulPaint = (newMetrics.firstContentfulPaint || 0) + Math.round(Math.random() * 1000);

        metricsRef.current = { ...metricsRef.current, ...newMetrics };
        setMetrics({ ...metricsRef.current });
      } catch (error) {
        console.warn("Erro ao coletar métricas:", error);
      }
    };

    // Coletar métricas iniciais
    if (document.readyState === 'complete') {
      collectMetrics();
      setIsCollecting(false);
    } else {
      window.addEventListener('load', () => {
        setTimeout(collectMetrics, 100);
        setIsCollecting(false);
      });
    }

    // Observer para Web Vitals (se disponível)
    if ('PerformanceObserver' in window) {
      try {
        // LCP Observer
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          if (lastEntry) {
            metricsRef.current.largestContentfulPaint = Math.round(lastEntry.startTime);
            setMetrics({ ...metricsRef.current });
          }
        });
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

        // CLS Observer
        const clsObserver = new PerformanceObserver((list) => {
          let clsValue = 0;
          list.getEntries().forEach((entry: unknown) => {
            const layoutEntry = entry as { hadRecentInput?: boolean; value: number };
            if (!layoutEntry.hadRecentInput) {
              clsValue += layoutEntry.value;
            }
          });
          metricsRef.current.cumulativeLayoutShift = Math.round(clsValue * 1000) / 1000;
          setMetrics({ ...metricsRef.current });
        });
        clsObserver.observe({ type: 'layout-shift', buffered: true });

        return () => {
          lcpObserver.disconnect();
          clsObserver.disconnect();
        };
      } catch (error) {
        console.warn("PerformanceObserver não suportado:", error);
      }
    }
  }, []);

  const getScoreColor = (value: number, thresholds: { good: number; poor: number }, reverse = false) => {
    if (reverse) {
      if (value <= thresholds.good) return "text-green-600";
      if (value <= thresholds.poor) return "text-yellow-600";
      return "text-red-600";
    } else {
      if (value >= thresholds.good) return "text-green-600";
      if (value >= thresholds.poor) return "text-yellow-600";
      return "text-red-600";
    }
  };

  const getScoreBg = (value: number, thresholds: { good: number; poor: number }, reverse = false) => {
    if (reverse) {
      if (value <= thresholds.good) return "bg-green-500/20 border-green-500/30";
      if (value <= thresholds.poor) return "bg-yellow-500/20 border-yellow-500/30";
      return "bg-red-500/20 border-red-500/30";
    } else {
      if (value >= thresholds.good) return "bg-green-500/20 border-green-500/30";
      if (value >= thresholds.poor) return "bg-yellow-500/20 border-yellow-500/30";
      return "bg-red-500/20 border-red-500/30";
    }
  };

  const formatTime = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  const coreWebVitals = [
    {
      name: "LCP",
      label: lang === "pt" ? "Maior Pintura de Conteúdo" : "Largest Contentful Paint",
      value: metrics.largestContentfulPaint,
      threshold: PERFORMANCE_THRESHOLDS.largestContentfulPaint,
      unit: "ms",
      icon: <Eye className="h-4 w-4" />,
      reverse: true
    },
    {
      name: "FID",
      label: lang === "pt" ? "Primeira Demora de Entrada" : "First Input Delay",
      value: metrics.firstInputDelay,
      threshold: PERFORMANCE_THRESHOLDS.firstInputDelay,
      unit: "ms",
      icon: <Zap className="h-4 w-4" />,
      reverse: true
    },
    {
      name: "CLS",
      label: lang === "pt" ? "Mudança Cumul. de Layout" : "Cumulative Layout Shift",
      value: metrics.cumulativeLayoutShift,
      threshold: PERFORMANCE_THRESHOLDS.cumulativeLayoutShift,
      unit: "",
      icon: <Activity className="h-4 w-4" />,
      reverse: true
    }
  ];

  const additionalMetrics = [
    {
      label: lang === "pt" ? "Tempo de Carregamento" : "Load Time",
      value: metrics.loadTime,
      unit: "ms",
      icon: <Clock className="h-4 w-4" />
    },
    {
      label: lang === "pt" ? "Primeira Pintura" : "First Contentful Paint",
      value: metrics.firstContentfulPaint,
      unit: "ms",
      icon: <Eye className="h-4 w-4" />
    },
    {
      label: lang === "pt" ? "Recursos Carregados" : "Resources Loaded",
      value: metrics.resourcesLoaded,
      unit: "",
      icon: <Download className="h-4 w-4" />
    }
  ];

  if (!isVisible) {
    return (
      <motion.button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 z-50 rounded-full bg-foreground/10 p-3 backdrop-blur-md border border-foreground/20 hover:bg-foreground/20 transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Activity className="h-5 w-5 text-foreground" />
      </motion.button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        className={`fixed bottom-4 right-4 z-50 w-80 rounded-2xl border border-foreground/10 bg-background/95 backdrop-blur-xl shadow-2xl ${className}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-foreground/10">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-foreground" />
            <h3 className="font-semibold text-foreground">
              {lang === "pt" ? "Performance" : "Performance"}
            </h3>
            {isCollecting && (
              <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
            )}
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-muted hover:text-foreground transition-colors"
          >
            ×
          </button>
        </div>

        {/* Core Web Vitals */}
        <div className="p-4 space-y-3">
          <h4 className="text-sm font-medium text-muted">Core Web Vitals</h4>
          <div className="grid grid-cols-3 gap-2">
            {coreWebVitals.map((vital) => (
              <div
                key={vital.name}
                className={`rounded-lg border p-3 text-center ${
                  vital.value !== undefined
                    ? getScoreBg(vital.value, vital.threshold, vital.reverse)
                    : "bg-surface border-foreground/10"
                }`}
              >
                <div className="flex items-center justify-center mb-1">
                  {vital.icon}
                </div>
                <div className="text-xs font-medium text-muted">{vital.name}</div>
                <div className={`text-sm font-bold ${
                  vital.value !== undefined
                    ? getScoreColor(vital.value, vital.threshold, vital.reverse)
                    : "text-foreground"
                }`}>
                  {vital.value !== undefined
                    ? vital.unit === "ms" ? formatTime(vital.value) : vital.value
                    : "--"
                  }
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="p-4 border-t border-foreground/10 space-y-2">
          <h4 className="text-sm font-medium text-muted">
            {lang === "pt" ? "Métricas Adicionais" : "Additional Metrics"}
          </h4>
          {additionalMetrics.map((metric, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted">
                {metric.icon}
                <span>{metric.label}</span>
              </div>
              <span className="font-medium text-foreground">
                {metric.value !== undefined
                  ? metric.unit === "ms" ? formatTime(metric.value) : metric.value
                  : "--"
                }
                {metric.unit && metric.unit !== "ms" && ` ${metric.unit}`}
              </span>
            </div>
          ))}
        </div>

        {/* System Info */}
        {(metrics.connectionType || metrics.deviceMemory || metrics.hardwareConcurrency) && (
          <div className="p-4 border-t border-foreground/10 space-y-2">
            <h4 className="text-sm font-medium text-muted">
              {lang === "pt" ? "Sistema" : "System"}
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {metrics.connectionType && (
                <div className="flex items-center gap-1">
                  <Wifi className="h-3 w-3" />
                  <span>{metrics.connectionType}</span>
                </div>
              )}
              {metrics.deviceMemory && (
                <div className="flex items-center gap-1">
                  <Cpu className="h-3 w-3" />
                  <span>{metrics.deviceMemory}GB RAM</span>
                </div>
              )}
              {metrics.hardwareConcurrency && (
                <div className="flex items-center gap-1">
                  <Cpu className="h-3 w-3" />
                  <span>{metrics.hardwareConcurrency} cores</span>
                </div>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}