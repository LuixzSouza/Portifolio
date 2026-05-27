"use client";

import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FlaskConical, BarChart3, Play, Pause
} from "lucide-react";
import { Button } from "@/components/ds/Button";
import { Text } from "@/components/ds/Text";
import { Heading } from "@/components/ds/Heading";

// Types
interface ABTest {
  id: string;
  name: string;
  description: string;
  variants: ABVariant[];
  status: "draft" | "running" | "paused" | "completed";
  startDate?: string;
  endDate?: string;
  trafficAllocation: number; // 0-100%
  targetMetrics: string[];
  hypothesis: string;
}

interface ABVariant {
  id: string;
  name: string;
  description: string;
  weight: number; // 0-100%
  component: ReactNode;
  isControl: boolean;
}

interface ABMetrics {
  variant: string;
  impressions: number;
  conversions: number;
  conversionRate: number;
  avgTimeOnPage: number;
  bounceRate: number;
  uniqueUsers: number;
}

interface ABTestResult {
  testId: string;
  variant: string;
  timestamp: number;
  event: "impression" | "conversion" | "interaction";
  data?: Record<string, unknown>;
  userId: string;
  sessionId: string;
}

// Context
interface ABTestContextType {
  isTestingEnabled: boolean;
  currentTests: ABTest[];
  getVariant: (testId: string) => string | null;
  trackEvent: (testId: string, event: string, data?: unknown) => void;
  startTest: (test: ABTest) => void;
  stopTest: (testId: string) => void;
  getResults: (testId: string) => ABMetrics[];
}

const ABTestContext = createContext<ABTestContextType | null>(null);

// Storage keys
const STORAGE_KEYS = {
  TESTS: "ab_tests",
  RESULTS: "ab_results",
  USER_VARIANTS: "ab_user_variants",
  SESSION_ID: "ab_session_id",
  USER_ID: "ab_user_id"
};

// Utility functions
const generateId = () => Math.random().toString(36).substr(2, 9);

const getUserId = (): string => {
  if (typeof window === "undefined") return "ssr-user";

  let userId = localStorage.getItem(STORAGE_KEYS.USER_ID);
  if (!userId) {
    userId = `user_${generateId()}`;
    localStorage.setItem(STORAGE_KEYS.USER_ID, userId);
  }
  return userId;
};

const getSessionId = (): string => {
  if (typeof window === "undefined") return "ssr-session";

  let sessionId = sessionStorage.getItem(STORAGE_KEYS.SESSION_ID);
  if (!sessionId) {
    sessionId = `session_${generateId()}`;
    sessionStorage.setItem(STORAGE_KEYS.SESSION_ID, sessionId);
  }
  return sessionId;
};

// Provider Component
export function ABTestProvider({ children }: { children: ReactNode }) {
  const [currentTests, setCurrentTests] = useState<ABTest[]>([]);
  const [userVariants, setUserVariants] = useState<Record<string, string>>({});
  const [isTestingEnabled, setIsTestingEnabled] = useState(false);

  // Initialize from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const savedTests = localStorage.getItem(STORAGE_KEYS.TESTS);
      const savedVariants = localStorage.getItem(STORAGE_KEYS.USER_VARIANTS);

      if (savedTests) {
        const tests = JSON.parse(savedTests);
        setCurrentTests(tests.filter((t: ABTest) => t.status === "running"));
      }

      if (savedVariants) {
        setUserVariants(JSON.parse(savedVariants));
      }

      // Enable testing in development or with query param
      const urlParams = new URLSearchParams(window.location.search);
      const isDev = process.env.NODE_ENV === "development";
      const hasFlag = urlParams.has("ab_testing");
      setIsTestingEnabled(isDev || hasFlag);
    } catch (error) {
      console.warn("Failed to load A/B testing data:", error);
    }
  }, []);

  const getVariant = useCallback((testId: string): string | null => {
    if (!isTestingEnabled) return null;

    const test = currentTests.find(t => t.id === testId && t.status === "running");
    if (!test) return null;

    // Check if user already has a variant assigned
    if (userVariants[testId]) {
      return userVariants[testId];
    }

    // Assign variant based on weights
    const random = Math.random() * 100;
    let cumulative = 0;

    for (const variant of test.variants) {
      cumulative += variant.weight;
      if (random <= cumulative) {
        const newVariants = { ...userVariants, [testId]: variant.id };
        setUserVariants(newVariants);
        localStorage.setItem(STORAGE_KEYS.USER_VARIANTS, JSON.stringify(newVariants));

        // Track impression
        trackEvent(testId, "impression");
        return variant.id;
      }
    }

    // Fallback to control
    const control = test.variants.find(v => v.isControl);
    return control?.id || test.variants[0]?.id || null;
  }, [currentTests, userVariants, isTestingEnabled]);

  const trackEvent = useCallback((testId: string, event: string, data?: unknown) => {
    if (!isTestingEnabled || typeof window === "undefined") return;

    const variant = userVariants[testId];
    if (!variant) return;

    const result: ABTestResult = {
      testId,
      variant,
      timestamp: Date.now(),
      event: event as ABTestResult["event"],
      data: data as Record<string, unknown> | undefined,
      userId: getUserId(),
      sessionId: getSessionId()
    };

    try {
      const savedResults = localStorage.getItem(STORAGE_KEYS.RESULTS);
      const results = savedResults ? JSON.parse(savedResults) : [];
      results.push(result);

      // Keep only last 1000 results per test
      const filteredResults = results
        .filter((r: ABTestResult) => r.testId === testId)
        .slice(-1000)
        .concat(results.filter((r: ABTestResult) => r.testId !== testId));

      localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(filteredResults));
    } catch (error) {
      console.warn("Failed to track A/B test event:", error);
    }
  }, [userVariants, isTestingEnabled]);

  const startTest = useCallback((test: ABTest) => {
    const newTest = {
      ...test,
      status: "running" as const,
      startDate: new Date().toISOString()
    };

    const updatedTests = [...currentTests.filter(t => t.id !== test.id), newTest];
    setCurrentTests(updatedTests);
    localStorage.setItem(STORAGE_KEYS.TESTS, JSON.stringify(updatedTests));
  }, [currentTests]);

  const stopTest = useCallback((testId: string) => {
    const updatedTests = currentTests.map(test =>
      test.id === testId
        ? { ...test, status: "completed" as const, endDate: new Date().toISOString() }
        : test
    );
    setCurrentTests(updatedTests);
    localStorage.setItem(STORAGE_KEYS.TESTS, JSON.stringify(updatedTests));
  }, [currentTests]);

  const getResults = useCallback((testId: string): ABMetrics[] => {
    if (typeof window === "undefined") return [];

    try {
      const savedResults = localStorage.getItem(STORAGE_KEYS.RESULTS);
      if (!savedResults) return [];

      const results: ABTestResult[] = JSON.parse(savedResults)
        .filter((r: ABTestResult) => r.testId === testId);

      const variantStats: Record<string, ABMetrics> = {};

      results.forEach(result => {
        if (!variantStats[result.variant]) {
          variantStats[result.variant] = {
            variant: result.variant,
            impressions: 0,
            conversions: 0,
            conversionRate: 0,
            avgTimeOnPage: 0,
            bounceRate: 0,
            uniqueUsers: 0
          };
        }

        const stats = variantStats[result.variant];

        if (result.event === "impression") {
          stats.impressions++;
        } else if (result.event === "conversion") {
          stats.conversions++;
        }
      });

      // Calculate derived metrics
      Object.values(variantStats).forEach(stats => {
        stats.conversionRate = stats.impressions > 0 ? (stats.conversions / stats.impressions) * 100 : 0;

        // Calculate unique users
        const uniqueUsers = new Set(
          results
            .filter(r => r.variant === stats.variant)
            .map(r => r.userId)
        );
        stats.uniqueUsers = uniqueUsers.size;
      });

      return Object.values(variantStats);
    } catch (error) {
      console.warn("Failed to get A/B test results:", error);
      return [];
    }
  }, []);

  const contextValue: ABTestContextType = {
    isTestingEnabled,
    currentTests,
    getVariant,
    trackEvent,
    startTest,
    stopTest,
    getResults
  };

  return (
    <ABTestContext.Provider value={contextValue}>
      {children}
    </ABTestContext.Provider>
  );
}

// Hook
export function useABTest() {
  const context = useContext(ABTestContext);
  if (!context) {
    throw new Error("useABTest must be used within ABTestProvider");
  }
  return context;
}

// Test Component Wrapper
interface ABTestVariantProps {
  testId: string;
  variantId: string;
  fallback?: ReactNode;
  children: ReactNode;
}

export function ABTestVariant({ testId, variantId, fallback, children }: ABTestVariantProps) {
  const { getVariant } = useABTest();
  const currentVariant = getVariant(testId);

  if (currentVariant === variantId) {
    return <>{children}</>;
  }

  if (currentVariant === null && fallback) {
    return <>{fallback}</>;
  }

  return null;
}

// Dashboard Component
export function ABTestingDashboard() {
  const {
    isTestingEnabled,
    currentTests,
    getResults,
    startTest,
    stopTest
  } = useABTest();

  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  if (!isTestingEnabled) {
    return (
      <div className="rounded-lg border border-foreground/20 bg-surface/30 p-6 text-center">
        <FlaskConical className="mx-auto h-8 w-8 text-muted mb-3" />
        <Text tone="muted">
          A/B Testing não está habilitado. Adicione ?ab_testing à URL ou execute em desenvolvimento.
        </Text>
      </div>
    );
  }

  const selectedTestData = selectedTest ? currentTests.find(t => t.id === selectedTest) : null;
  const results = selectedTest ? getResults(selectedTest) : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FlaskConical className="h-6 w-6 text-foreground" />
          <div>
            <Heading as="h2" size="display-md">A/B Testing Dashboard</Heading>
            <Text tone="muted" size="sm">
              Gerencie experimentos e analise resultados
            </Text>
          </div>
        </div>

        <Button
          onClick={() => setShowCreateModal(true)}
          className="gap-2"
        >
          <Play className="h-4 w-4" />
          Novo Teste
        </Button>
      </div>

      {/* Tests Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {currentTests.map((test) => {
          const testResults = getResults(test.id);
          const totalImpressions = testResults.reduce((sum, r) => sum + r.impressions, 0);
          const isSelected = selectedTest === test.id;

          return (
            <motion.button
              key={test.id}
              onClick={() => setSelectedTest(isSelected ? null : test.id)}
              className={`rounded-lg border p-4 text-left transition-all ${
                isSelected
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-foreground/20 hover:border-foreground/40 hover:bg-surface/50"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="font-medium text-foreground">{test.name}</div>
                <div className={`rounded-full px-2 py-1 text-xs font-medium ${
                  test.status === "running"
                    ? "bg-green-500/20 text-green-600"
                    : test.status === "paused"
                    ? "bg-yellow-500/20 text-yellow-600"
                    : "bg-gray-500/20 text-gray-600"
                }`}>
                  {test.status}
                </div>
              </div>

              <Text size="sm" tone="muted" className="mb-3 line-clamp-2">
                {test.description}
              </Text>

              <div className="flex items-center justify-between text-xs text-muted">
                <span>{test.variants.length} variantes</span>
                <span>{totalImpressions} impressões</span>
              </div>
            </motion.button>
          );
        })}

        {currentTests.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-12">
            <FlaskConical className="h-12 w-12 text-muted mb-4" />
            <Text tone="muted" size="lg" className="text-center">
              Nenhum teste ativo
            </Text>
            <Text tone="muted" size="sm" className="text-center mt-1">
              Crie seu primeiro teste A/B para começar a experimentar
            </Text>
          </div>
        )}
      </div>

      {/* Test Details */}
      <AnimatePresence>
        {selectedTestData && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="rounded-lg border border-foreground/20 bg-surface/30 p-6 space-y-6">
              {/* Test Header */}
              <div className="flex items-center justify-between">
                <div>
                  <Heading as="h3" size="display-sm">{selectedTestData.name}</Heading>
                  <Text tone="muted" size="sm">{selectedTestData.description}</Text>
                </div>
                <div className="flex gap-2">
                  {selectedTestData.status === "running" ? (
                    <Button
                      variant="outline"
                      size="md"
                      onClick={() => stopTest(selectedTestData.id)}
                      className="gap-2"
                    >
                      <Pause className="h-4 w-4" />
                      Parar Teste
                    </Button>
                  ) : (
                    <Button
                      size="md"
                      onClick={() => startTest(selectedTestData)}
                      className="gap-2"
                    >
                      <Play className="h-4 w-4" />
                      Iniciar Teste
                    </Button>
                  )}
                </div>
              </div>

              {/* Hypothesis */}
              <div className="rounded-lg bg-surface/50 p-4">
                <Text size="sm" className="font-medium text-foreground mb-1">Hipótese:</Text>
                <Text size="sm" tone="muted">{selectedTestData.hypothesis}</Text>
              </div>

              {/* Results Table */}
              {results.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-foreground/20">
                        <th className="p-3 text-left text-sm font-medium text-muted">Variante</th>
                        <th className="p-3 text-left text-sm font-medium text-muted">Impressões</th>
                        <th className="p-3 text-left text-sm font-medium text-muted">Conversões</th>
                        <th className="p-3 text-left text-sm font-medium text-muted">Taxa de Conversão</th>
                        <th className="p-3 text-left text-sm font-medium text-muted">Usuários Únicos</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((result, index) => {
                        const variant = selectedTestData.variants.find(v => v.id === result.variant);
                        return (
                          <tr key={result.variant} className={index % 2 === 0 ? "bg-surface/20" : ""}>
                            <td className="p-3">
                              <div className="font-medium text-foreground">
                                {variant?.name || result.variant}
                                {variant?.isControl && (
                                  <span className="ml-2 rounded bg-blue-500/20 px-1.5 py-0.5 text-xs text-blue-600">
                                    Controle
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="p-3 text-sm text-foreground">{result.impressions}</td>
                            <td className="p-3 text-sm text-foreground">{result.conversions}</td>
                            <td className="p-3 text-sm text-foreground">
                              {result.conversionRate.toFixed(2)}%
                            </td>
                            <td className="p-3 text-sm text-foreground">{result.uniqueUsers}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {/* No Results */}
              {results.length === 0 && (
                <div className="flex flex-col items-center justify-center py-8">
                  <BarChart3 className="h-8 w-8 text-muted mb-2" />
                  <Text tone="muted">Nenhum resultado ainda</Text>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Example usage component
export function ABTestExample() {
  const { trackEvent } = useABTest();

  return (
    <div className="space-y-4">
      <ABTestVariant
        testId="hero-cta-test"
        variantId="control"
        fallback={
          <Button onClick={() => trackEvent("hero-cta-test", "conversion")}>
            Ver Projetos
          </Button>
        }
      >
        <Button onClick={() => trackEvent("hero-cta-test", "conversion")}>
          Ver Projetos
        </Button>
      </ABTestVariant>

      <ABTestVariant testId="hero-cta-test" variantId="variant-a">
        <Button
          variant="solid"
          onClick={() => trackEvent("hero-cta-test", "conversion")}
          className="bg-gradient-to-r from-blue-600 to-purple-600"
        >
          🚀 Explorar Meu Trabalho
        </Button>
      </ABTestVariant>

      <ABTestVariant testId="hero-cta-test" variantId="variant-b">
        <Button
          size="md"
          onClick={() => trackEvent("hero-cta-test", "conversion")}
          className="animate-pulse"
        >
          ⭐ Descobrir Projetos Incríveis
        </Button>
      </ABTestVariant>
    </div>
  );
}