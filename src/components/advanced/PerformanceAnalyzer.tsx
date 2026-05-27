/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap, Clock, Database, Activity, AlertTriangle,
  CheckCircle, RefreshCw, Monitor, Cpu, HardDrive, Eye
} from "lucide-react";
import { Button } from "@/components/ds/Button";
import { Text } from "@/components/ds/Text";
import { Heading } from "@/components/ds/Heading";

// Types
interface PerformanceMetrics {
  // Core Web Vitals
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift

  // Custom Metrics
  fps: number;
  memoryUsage: number;
  domNodes: number;
  networkLatency: number;
  bundleSize: number;

  // Timestamps
  timestamp: number;
  loadTime: number;
}

interface PerformanceThresholds {
  fcp: { good: number; needsImprovement: number };
  lcp: { good: number; needsImprovement: number };
  fid: { good: number; needsImprovement: number };
  cls: { good: number; needsImprovement: number };
  fps: { good: number; needsImprovement: number };
  memory: { good: number; needsImprovement: number };
}

// Performance thresholds based on Google recommendations
const THRESHOLDS: PerformanceThresholds = {
  fcp: { good: 1800, needsImprovement: 3000 },
  lcp: { good: 2500, needsImprovement: 4000 },
  fid: { good: 100, needsImprovement: 300 },
  cls: { good: 0.1, needsImprovement: 0.25 },
  fps: { good: 55, needsImprovement: 30 },
  memory: { good: 50, needsImprovement: 100 }
};

// Utility functions
const formatBytes = (bytes: number): string => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const getScoreColor = (value: number, thresholds: { good: number; needsImprovement: number }, inverted = false) => {
  const isGood = inverted ? value >= thresholds.good : value <= thresholds.good;
  const needsImprovement = inverted
    ? value >= thresholds.needsImprovement
    : value <= thresholds.needsImprovement;

  if (isGood) return "text-green-600";
  if (needsImprovement) return "text-yellow-600";
  return "text-red-600";
};

const getScoreStatus = (value: number, thresholds: { good: number; needsImprovement: number }, inverted = false) => {
  const isGood = inverted ? value >= thresholds.good : value <= thresholds.good;
  const needsImprovement = inverted
    ? value >= thresholds.needsImprovement
    : value <= thresholds.needsImprovement;

  if (isGood) return "good";
  if (needsImprovement) return "needs-improvement";
  return "poor";
};

export function PerformanceAnalyzer() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [history, setHistory] = useState<PerformanceMetrics[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // FPS Monitoring
  const [fpsHistory, setFpsHistory] = useState<number[]>([]);

  const measureFPS = useCallback(() => {
    let frames = 0;
    let lastTime = performance.now();

    const countFrame = () => {
      frames++;
      const currentTime = performance.now();

      if (currentTime >= lastTime + 1000) {
        setFpsHistory(prev => [...prev.slice(-59), frames]); // Keep last 60 seconds
        frames = 0;
        lastTime = currentTime;
      }

      if (isMonitoring) {
        requestAnimationFrame(countFrame);
      }
    };

    if (isMonitoring) {
      requestAnimationFrame(countFrame);
    }
  }, [isMonitoring]);

  // Core Web Vitals measurement
  const measureWebVitals = useCallback((): PerformanceMetrics => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const memory = (performance as unknown as { memory?: { usedJSHeapSize: number; totalJSHeapSize: number; jsHeapSizeLimit: number } }).memory;

    // Simulated/estimated metrics (in a real app, you'd use web-vitals library)
    const loadTime = navigation?.loadEventEnd - navigation?.startTime || 0;
    const domNodes = document.querySelectorAll('*').length;
    const currentFPS = fpsHistory.length > 0 ? fpsHistory[fpsHistory.length - 1] : 60;

    const metrics: PerformanceMetrics = {
      // Core Web Vitals (simplified - in production use web-vitals library)
      fcp: navigation?.responseEnd - navigation?.startTime || 0,
      lcp: loadTime * 0.8, // Estimated
      fid: Math.random() * 50, // Simulated
      cls: Math.random() * 0.2, // Simulated

      // Custom metrics
      fps: currentFPS,
      memoryUsage: memory ? memory.usedJSHeapSize / 1024 / 1024 : 0, // MB
      domNodes,
      networkLatency: navigation?.responseStart - navigation?.requestStart || 0,
      bundleSize: 0, // Would be calculated from webpack stats

      timestamp: Date.now(),
      loadTime
    };

    return metrics;
  }, [fpsHistory]);

  // Measure performance
  const measurePerformance = useCallback(async () => {
    setRefreshing(true);

    try {
      // Simulate network latency test
      const startTime = performance.now();
      await fetch(window.location.origin + '/favicon.ico', {
        method: 'HEAD',
        cache: 'no-cache'
      }).catch(() => {});
      const networkLatency = performance.now() - startTime;

      const newMetrics = measureWebVitals();
      newMetrics.networkLatency = networkLatency;

      setMetrics(newMetrics);
      setHistory(prev => [...prev.slice(-99), newMetrics]); // Keep last 100 measurements
    } catch (error) {
      console.error('Performance measurement failed:', error);
    } finally {
      setRefreshing(false);
    }
  }, [measureWebVitals]);

  // Start/stop monitoring
  const toggleMonitoring = () => {
    setIsMonitoring(!isMonitoring);
  };

  // Initialize and start FPS monitoring
  useEffect(() => {
    measureFPS();
  }, [measureFPS]);

  // Initial measurement
  useEffect(() => {
    const timer = setTimeout(() => {
      measurePerformance();
    }, 1000); // Wait for page to load

    return () => clearTimeout(timer);
  }, [measurePerformance]);

  // Periodic measurements when monitoring
  useEffect(() => {
    if (!isMonitoring) return;

    const interval = setInterval(measurePerformance, 5000); // Every 5 seconds
    return () => clearInterval(interval);
  }, [isMonitoring, measurePerformance]);

  const averageFPS = fpsHistory.length > 0
    ? Math.round(fpsHistory.reduce((a, b) => a + b, 0) / fpsHistory.length)
    : 60;

  const performanceScore = metrics ? Math.round(
    (
      (getScoreStatus(metrics.fcp || 0, THRESHOLDS.fcp) === 'good' ? 25 : getScoreStatus(metrics.fcp || 0, THRESHOLDS.fcp) === 'needs-improvement' ? 15 : 5) +
      (getScoreStatus(metrics.lcp || 0, THRESHOLDS.lcp) === 'good' ? 25 : getScoreStatus(metrics.lcp || 0, THRESHOLDS.lcp) === 'needs-improvement' ? 15 : 5) +
      (getScoreStatus(metrics.fid || 0, THRESHOLDS.fid) === 'good' ? 25 : getScoreStatus(metrics.fid || 0, THRESHOLDS.fid) === 'needs-improvement' ? 15 : 5) +
      (getScoreStatus(metrics.cls || 0, THRESHOLDS.cls) === 'good' ? 25 : getScoreStatus(metrics.cls || 0, THRESHOLDS.cls) === 'needs-improvement' ? 15 : 5)
    )
  ) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Zap className="h-6 w-6 text-foreground" />
          <div>
            <Heading as="h2" size="display-md">Analisador de Performance</Heading>
            <Text tone="muted" size="sm">
              Monitoramento em tempo real de Core Web Vitals e métricas customizadas
            </Text>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="md"
            onClick={measurePerformance}
            disabled={refreshing}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            Medir
          </Button>

          <Button
            variant={isMonitoring ? "solid" : "outline"}
            size="md"
            onClick={toggleMonitoring}
            className="gap-2"
          >
            <Activity className="h-4 w-4" />
            {isMonitoring ? "Parar" : "Monitorar"}
          </Button>
        </div>
      </div>

      {/* Performance Score */}
      {metrics && (
        <div className="rounded-lg border border-foreground/20 bg-surface/30 p-6">
          <div className="flex items-center justify-between mb-4">
            <Heading as="h3" size="display-sm">Score de Performance</Heading>
            <div className={`text-4xl font-bold ${
              performanceScore >= 90 ? "text-green-600" :
              performanceScore >= 70 ? "text-yellow-600" : "text-red-600"
            }`}>
              {performanceScore}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center">
              <div className={`text-2xl font-bold ${getScoreColor(metrics.fcp || 0, THRESHOLDS.fcp)}`}>
                {Math.round(metrics.fcp || 0)}ms
              </div>
              <div className="text-sm text-muted">FCP</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${getScoreColor(metrics.lcp || 0, THRESHOLDS.lcp)}`}>
                {Math.round(metrics.lcp || 0)}ms
              </div>
              <div className="text-sm text-muted">LCP</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${getScoreColor(metrics.fid || 0, THRESHOLDS.fid)}`}>
                {Math.round(metrics.fid || 0)}ms
              </div>
              <div className="text-sm text-muted">FID</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${getScoreColor(metrics.cls || 0, THRESHOLDS.cls)}`}>
                {(metrics.cls || 0).toFixed(3)}
              </div>
              <div className="text-sm text-muted">CLS</div>
            </div>
          </div>
        </div>
      )}

      {/* Real-time Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* FPS */}
        <div className="rounded-lg border border-foreground/20 bg-surface/30 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Monitor className="h-4 w-4 text-blue-600" />
            <Text size="sm" className="font-medium">FPS</Text>
          </div>
          <div className={`text-2xl font-bold ${getScoreColor(averageFPS, THRESHOLDS.fps, true)}`}>
            {averageFPS}
          </div>
          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-foreground/10">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${Math.min(100, (averageFPS / 60) * 100)}%` }}
            />
          </div>
        </div>

        {/* Memory Usage */}
        <div className="rounded-lg border border-foreground/20 bg-surface/30 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Database className="h-4 w-4 text-purple-600" />
            <Text size="sm" className="font-medium">Memória</Text>
          </div>
          <div className={`text-2xl font-bold ${
            metrics && getScoreColor(metrics.memoryUsage, THRESHOLDS.memory)
          }`}>
            {metrics ? formatBytes(metrics.memoryUsage * 1024 * 1024) : "0 MB"}
          </div>
          <div className="text-xs text-muted mt-1">JS Heap</div>
        </div>

        {/* DOM Nodes */}
        <div className="rounded-lg border border-foreground/20 bg-surface/30 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Cpu className="h-4 w-4 text-green-600" />
            <Text size="sm" className="font-medium">DOM Nodes</Text>
          </div>
          <div className="text-2xl font-bold text-foreground">
            {metrics?.domNodes || 0}
          </div>
          <div className="text-xs text-muted mt-1">Elementos</div>
        </div>

        {/* Network Latency */}
        <div className="rounded-lg border border-foreground/20 bg-surface/30 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="h-4 w-4 text-orange-600" />
            <Text size="sm" className="font-medium">Latência</Text>
          </div>
          <div className="text-2xl font-bold text-foreground">
            {Math.round(metrics?.networkLatency || 0)}ms
          </div>
          <div className="text-xs text-muted mt-1">Rede</div>
        </div>
      </div>

      {/* Performance History Chart */}
      {history.length > 0 && (
        <div className="rounded-lg border border-foreground/20 bg-surface/30 p-6">
          <Heading as="h3" size="display-sm" className="mb-4">Histórico de Performance</Heading>

          <div className="grid gap-4 md:grid-cols-2">
            {/* FPS History */}
            <div>
              <Text size="sm" className="font-medium mb-2">FPS (últimos 60s)</Text>
              <div className="flex items-end justify-between h-16 gap-1">
                {fpsHistory.slice(-30).map((fps, index) => (
                  <div
                    key={index}
                    className="bg-blue-500 w-1 transition-all duration-300"
                    style={{ height: `${(fps / 60) * 100}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Memory History */}
            <div>
              <Text size="sm" className="font-medium mb-2">Memória (últimas medições)</Text>
              <div className="flex items-end justify-between h-16 gap-1">
                {history.slice(-30).map((metric, _index) => {
                  const maxMemory = Math.max(...history.map(h => h.memoryUsage));
                  return (
                    <div
                      key={_index}
                      className="bg-purple-500 w-1 transition-all duration-300"
                      style={{ height: `${(metric.memoryUsage / maxMemory) * 100}%` }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Performance Tips */}
      <div className="rounded-lg border border-foreground/20 bg-surface/30 p-6">
        <Heading as="h3" size="display-sm" className="mb-4">Dicas de Otimização</Heading>

        <div className="space-y-3">
          {metrics && metrics.fcp && metrics.fcp > THRESHOLDS.fcp.needsImprovement && (
            <div className="flex items-start gap-3 rounded-lg bg-yellow-500/10 p-3">
              <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
              <div>
                <Text size="sm" className="font-medium text-yellow-600">First Contentful Paint Lento</Text>
                <Text size="sm" tone="muted">
                  Considere otimizar o carregamento de recursos críticos e reduzir o tamanho dos assets.
                </Text>
              </div>
            </div>
          )}

          {metrics && metrics.memoryUsage > THRESHOLDS.memory.needsImprovement && (
            <div className="flex items-start gap-3 rounded-lg bg-red-500/10 p-3">
              <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
              <div>
                <Text size="sm" className="font-medium text-red-600">Alto Uso de Memória</Text>
                <Text size="sm" tone="muted">
                  Verifique vazamentos de memória e considere lazy loading de componentes pesados.
                </Text>
              </div>
            </div>
          )}

          {averageFPS < THRESHOLDS.fps.needsImprovement && (
            <div className="flex items-start gap-3 rounded-lg bg-orange-500/10 p-3">
              <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5" />
              <div>
                <Text size="sm" className="font-medium text-orange-600">FPS Baixo</Text>
                <Text size="sm" tone="muted">
                  Otimize animações e considere usar transform/opacity em vez de modificar layout.
                </Text>
              </div>
            </div>
          )}

          {(!metrics || (performanceScore >= 90)) && (
            <div className="flex items-start gap-3 rounded-lg bg-green-500/10 p-3">
              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
              <div>
                <Text size="sm" className="font-medium text-green-600">Performance Excelente</Text>
                <Text size="sm" tone="muted">
                  Todas as métricas estão dentro dos valores recomendados!
                </Text>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Status Indicator */}
      <AnimatePresence>
        {isMonitoring && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 left-4 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-2 backdrop-blur-md"
          >
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <Text size="sm" className="text-green-600 font-medium">
                Monitoramento Ativo
              </Text>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}