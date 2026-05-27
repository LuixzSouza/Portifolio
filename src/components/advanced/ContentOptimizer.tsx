"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Accessibility, Star, AlertCircle,
  CheckCircle, MessageCircle, RefreshCw,
  FileText, Brain, Lightbulb, Zap
} from "lucide-react";
import { Button } from "@/components/ds/Button";
import { Text } from "@/components/ds/Text";
import { Heading } from "@/components/ds/Heading";

// Types
interface ContentAnalysis {
  id: string;
  elementType: "text" | "image" | "link" | "heading" | "meta";
  element: string;
  content: string;
  scores: {
    seo: number;
    accessibility: number;
    readability: number;
    engagement: number;
    overall: number;
  };
  suggestions: Suggestion[];
  performance: PerformanceMetric[];
}

interface Suggestion {
  id: string;
  type: "critical" | "warning" | "info" | "enhancement";
  category: "seo" | "accessibility" | "readability" | "engagement" | "performance";
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  effort: "easy" | "medium" | "complex";
  before?: string;
  after?: string;
  priority: number; // 1-10
}

interface PerformanceMetric {
  metric: string;
  value: number;
  unit: string;
  threshold: number;
  status: "good" | "needs-improvement" | "poor";
}

interface OptimizationReport {
  overall: {
    score: number;
    grade: "A+" | "A" | "B" | "C" | "D" | "F";
    totalSuggestions: number;
    criticalIssues: number;
  };
  categories: {
    seo: { score: number; issues: number };
    accessibility: { score: number; issues: number };
    readability: { score: number; issues: number };
    engagement: { score: number; issues: number };
    performance: { score: number; issues: number };
  };
  analysis: ContentAnalysis[];
  generatedAt: string;
}

// Mock AI Analysis Engine
class ContentAnalyzer {
  private readonly SEO_KEYWORDS = [
    "desenvolvedor", "front-end", "react", "typescript", "javascript",
    "projetos", "portfólio", "web development", "ui/ux", "responsive"
  ];

  private readonly READABILITY_WORDS = [
    "muito", "extremamente", "basicamente", "obviamente", "claramente",
    "definitivamente", "absolutamente", "totalmente", "completamente"
  ];

  analyzeText(text: string, context: string): ContentAnalysis {
    const suggestions: Suggestion[] = [];

    // SEO Analysis
    const seoScore = this.analyzeSEO(text, suggestions);

    // Accessibility Analysis
    const accessibilityScore = this.analyzeAccessibility(text, context, suggestions);

    // Readability Analysis
    const readabilityScore = this.analyzeReadability(text, suggestions);

    // Engagement Analysis
    const engagementScore = this.analyzeEngagement(text, suggestions);

    // Overall Score
    const overall = Math.round(
      (seoScore + accessibilityScore + readabilityScore + engagementScore) / 4
    );

    return {
      id: `analysis_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      elementType: this.getElementType(context),
      element: context,
      content: text,
      scores: {
        seo: seoScore,
        accessibility: accessibilityScore,
        readability: readabilityScore,
        engagement: engagementScore,
        overall
      },
      suggestions: suggestions.sort((a, b) => b.priority - a.priority),
      performance: this.generatePerformanceMetrics()
    };
  }

  private analyzeSEO(text: string, suggestions: Suggestion[]): number {
    let score = 100;
    const words = text.toLowerCase().split(/\s+/);

    // Check for keywords
    const hasKeywords = this.SEO_KEYWORDS.some(keyword =>
      text.toLowerCase().includes(keyword)
    );

    if (!hasKeywords) {
      score -= 20;
      suggestions.push({
        id: `seo_keywords_${Date.now()}`,
        type: "warning",
        category: "seo",
        title: "Palavras-chave ausentes",
        description: "O texto não contém palavras-chave relevantes para SEO. Considere incluir termos como 'desenvolvedor front-end', 'React', 'projetos web'.",
        impact: "medium",
        effort: "easy",
        priority: 7
      });
    }

    // Check length
    if (words.length < 10) {
      score -= 15;
      suggestions.push({
        id: `seo_length_${Date.now()}`,
        type: "info",
        category: "seo",
        title: "Texto muito curto",
        description: "Textos mais longos (50+ palavras) tendem a ter melhor performance em SEO. Considere expandir o conteúdo.",
        impact: "low",
        effort: "medium",
        priority: 4
      });
    }

    // Check for duplicate phrases
    const phrases: string[] = text.match(/\b\w+\s+\w+\s+\w+\b/g) || [];
    const duplicates = phrases.filter((phrase, index) =>
      phrases.indexOf(phrase) !== index
    );

    if (duplicates.length > 0) {
      score -= 10;
      suggestions.push({
        id: `seo_duplicates_${Date.now()}`,
        type: "warning",
        category: "seo",
        title: "Conteúdo repetitivo",
        description: "Evite repetir frases idênticas. Varie o vocabulário para melhor SEO.",
        impact: "medium",
        effort: "medium",
        priority: 5
      });
    }

    return Math.max(0, score);
  }

  private analyzeAccessibility(text: string, context: string, suggestions: Suggestion[]): number {
    let score = 100;

    // Check for alt text if it's an image context
    if (context.includes("img") && !text) {
      score -= 30;
      suggestions.push({
        id: `a11y_alt_${Date.now()}`,
        type: "critical",
        category: "accessibility",
        title: "Texto alternativo ausente",
        description: "Imagens devem ter texto alternativo para leitores de tela.",
        impact: "high",
        effort: "easy",
        priority: 9
      });
    }

    // Check for poor contrast indicators
    if (context.includes("muted") || context.includes("gray")) {
      score -= 15;
      suggestions.push({
        id: `a11y_contrast_${Date.now()}`,
        type: "warning",
        category: "accessibility",
        title: "Possível problema de contraste",
        description: "Verifique se o contraste atende aos padrões WCAG (mínimo 4.5:1 para texto normal).",
        impact: "medium",
        effort: "easy",
        priority: 6
      });
    }

    // Check for link accessibility
    if (context.includes("link") && text.length < 5) {
      score -= 20;
      suggestions.push({
        id: `a11y_link_${Date.now()}`,
        type: "warning",
        category: "accessibility",
        title: "Texto de link muito curto",
        description: "Links devem ter texto descritivo. Evite textos como 'clique aqui' ou 'saiba mais'.",
        impact: "medium",
        effort: "easy",
        priority: 7
      });
    }

    return Math.max(0, score);
  }

  private analyzeReadability(text: string, suggestions: Suggestion[]): number {
    let score = 100;
    const words = text.split(/\s+/);
    const sentences = text.split(/[.!?]+/).filter(s => s.trim());

    // Calculate average sentence length
    const avgSentenceLength = words.length / sentences.length;
    if (avgSentenceLength > 20) {
      score -= 20;
      suggestions.push({
        id: `readability_sentences_${Date.now()}`,
        type: "warning",
        category: "readability",
        title: "Frases muito longas",
        description: "Frases com mais de 20 palavras são difíceis de ler. Considere dividir em frases menores.",
        impact: "medium",
        effort: "medium",
        priority: 6
      });
    }

    // Check for complex words
    const complexWords = words.filter(word => word.length > 12).length;
    const complexWordRatio = complexWords / words.length;
    if (complexWordRatio > 0.1) {
      score -= 15;
      suggestions.push({
        id: `readability_complex_${Date.now()}`,
        type: "info",
        category: "readability",
        title: "Palavras muito complexas",
        description: "Muitas palavras longas podem dificultar a leitura. Considere sinônimos mais simples.",
        impact: "low",
        effort: "medium",
        priority: 4
      });
    }

    // Check for overused words
    const overused = this.READABILITY_WORDS.filter(word =>
      text.toLowerCase().includes(word)
    );
    if (overused.length > 2) {
      score -= 10;
      suggestions.push({
        id: `readability_overused_${Date.now()}`,
        type: "info",
        category: "readability",
        title: "Palavras supérfluas",
        description: `Evite palavras como: ${overused.join(", ")}. Tornam o texto menos direto.`,
        impact: "low",
        effort: "easy",
        priority: 3
      });
    }

    return Math.max(0, score);
  }

  private analyzeEngagement(text: string, suggestions: Suggestion[]): number {
    let score = 100;

    // Check for action words
    const actionWords = ["descubra", "explore", "veja", "aprenda", "crie", "desenvolva"];
    const hasActionWords = actionWords.some(word =>
      text.toLowerCase().includes(word)
    );

    if (!hasActionWords) {
      score -= 15;
      suggestions.push({
        id: `engagement_action_${Date.now()}`,
        type: "enhancement",
        category: "engagement",
        title: "Adicione verbos de ação",
        description: "Verbos como 'descubra', 'explore', 'crie' tornam o texto mais envolvente.",
        impact: "medium",
        effort: "easy",
        priority: 5
      });
    }

    // Check for emotional words
    const emotionalWords = ["incrível", "fantástico", "inovador", "único", "especial"];
    const hasEmotionalWords = emotionalWords.some(word =>
      text.toLowerCase().includes(word)
    );

    if (!hasEmotionalWords && text.length > 50) {
      score -= 10;
      suggestions.push({
        id: `engagement_emotion_${Date.now()}`,
        type: "enhancement",
        category: "engagement",
        title: "Adicione elementos emocionais",
        description: "Palavras que evocam emoção aumentam o engajamento do usuário.",
        impact: "low",
        effort: "easy",
        priority: 3
      });
    }

    // Check for questions
    if (!text.includes("?") && text.length > 100) {
      score -= 10;
      suggestions.push({
        id: `engagement_questions_${Date.now()}`,
        type: "enhancement",
        category: "engagement",
        title: "Considere usar perguntas",
        description: "Perguntas retóricas ou diretas aumentam o envolvimento do leitor.",
        impact: "medium",
        effort: "easy",
        priority: 4
      });
    }

    return Math.max(0, score);
  }

  private getElementType(context: string): ContentAnalysis["elementType"] {
    if (context.includes("img")) return "image";
    if (context.includes("link") || context.includes("href")) return "link";
    if (context.includes("h1") || context.includes("h2") || context.includes("heading")) return "heading";
    if (context.includes("meta") || context.includes("title")) return "meta";
    return "text";
  }

  private generatePerformanceMetrics(): PerformanceMetric[] {
    return [
      {
        metric: "Leiturabilidade",
        value: 75 + Math.random() * 20,
        unit: "%",
        threshold: 70,
        status: "good"
      },
      {
        metric: "Densidade de palavras-chave",
        value: 2 + Math.random() * 3,
        unit: "%",
        threshold: 2,
        status: "good"
      },
      {
        metric: "Tempo de leitura",
        value: 30 + Math.random() * 90,
        unit: "s",
        threshold: 60,
        status: "good"
      }
    ];
  }
}

// Main Component
export function ContentOptimizer() {
  const [report, setReport] = useState<OptimizationReport | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [analyzer] = useState(() => new ContentAnalyzer());

  const analyzeContent = useCallback(async () => {
    setIsAnalyzing(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Get all text content from the page
      const textElements = document.querySelectorAll("h1, h2, h3, p, a, [alt]");
      const analyses: ContentAnalysis[] = [];

      textElements.forEach((element, index) => {
        if (index > 20) return; // Limit analysis to first 20 elements

        const text = element.textContent || element.getAttribute("alt") || "";
        if (text.trim().length < 5) return;

        const context = `${element.tagName.toLowerCase()}_${element.className}`;
        const analysis = analyzer.analyzeText(text, context);
        analyses.push(analysis);
      });

      // Calculate overall metrics
      const totalSuggestions = analyses.reduce((sum, a) => sum + a.suggestions.length, 0);
      const criticalIssues = analyses.reduce((sum, a) =>
        sum + a.suggestions.filter(s => s.type === "critical").length, 0
      );

      const categoryScores = {
        seo: Math.round(analyses.reduce((sum, a) => sum + a.scores.seo, 0) / analyses.length),
        accessibility: Math.round(analyses.reduce((sum, a) => sum + a.scores.accessibility, 0) / analyses.length),
        readability: Math.round(analyses.reduce((sum, a) => sum + a.scores.readability, 0) / analyses.length),
        engagement: Math.round(analyses.reduce((sum, a) => sum + a.scores.engagement, 0) / analyses.length),
        performance: 85 + Math.random() * 10
      };

      const overallScore = Math.round(
        Object.values(categoryScores).reduce((sum, score) => sum + score, 0) / 5
      );

      const getGrade = (score: number): OptimizationReport["overall"]["grade"] => {
        if (score >= 95) return "A+";
        if (score >= 85) return "A";
        if (score >= 75) return "B";
        if (score >= 65) return "C";
        if (score >= 50) return "D";
        return "F";
      };

      const newReport: OptimizationReport = {
        overall: {
          score: overallScore,
          grade: getGrade(overallScore),
          totalSuggestions,
          criticalIssues
        },
        categories: {
          seo: { score: categoryScores.seo, issues: analyses.filter(a => a.suggestions.some(s => s.category === "seo")).length },
          accessibility: { score: categoryScores.accessibility, issues: analyses.filter(a => a.suggestions.some(s => s.category === "accessibility")).length },
          readability: { score: categoryScores.readability, issues: analyses.filter(a => a.suggestions.some(s => s.category === "readability")).length },
          engagement: { score: categoryScores.engagement, issues: analyses.filter(a => a.suggestions.some(s => s.category === "engagement")).length },
          performance: { score: Math.round(categoryScores.performance), issues: Math.floor(Math.random() * 3) }
        },
        analysis: analyses,
        generatedAt: new Date().toISOString()
      };

      setReport(newReport);
    } catch (error) {
      console.error("Content analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  }, [analyzer]);

  const getSuggestionIcon = (type: Suggestion["type"]) => {
    switch (type) {
      case "critical": return AlertCircle;
      case "warning": return AlertCircle;
      case "info": return Lightbulb;
      case "enhancement": return Star;
      default: return Lightbulb;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "seo": return Search;
      case "accessibility": return Accessibility;
      case "readability": return FileText;
      case "engagement": return MessageCircle;
      case "performance": return Zap;
      default: return Brain;
    }
  };

  const filteredSuggestions = report?.analysis.flatMap(a => a.suggestions).filter(s =>
    selectedCategory === "all" || s.category === selectedCategory
  ) || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Brain className="h-6 w-6 text-foreground" />
          <div>
            <Heading as="h2" size="display-md">Otimizador de Conteúdo IA</Heading>
            <Text tone="muted" size="sm">
              Análise inteligente de SEO, acessibilidade e experiência do usuário
            </Text>
          </div>
        </div>

        <Button
          onClick={analyzeContent}
          disabled={isAnalyzing}
          className="gap-2"
        >
          {isAnalyzing ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <RefreshCw className="h-4 w-4" />
              </motion.div>
              Analisando...
            </>
          ) : (
            <>
              <Brain className="h-4 w-4" />
              Analisar Conteúdo
            </>
          )}
        </Button>
      </div>

      {/* Results */}
      <AnimatePresence>
        {report && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Overall Score */}
            <div className="rounded-lg border border-foreground/20 bg-surface/30 p-6">
              <div className="flex items-center justify-between mb-4">
                <Heading as="h3" size="display-sm">Pontuação Geral</Heading>
                <div className={`text-3xl font-bold ${
                  report.overall.score >= 85 ? "text-green-600" :
                  report.overall.score >= 70 ? "text-yellow-600" : "text-red-600"
                }`}>
                  {report.overall.score}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-4">
                <div className="text-center">
                  <div className={`text-2xl font-bold ${
                    report.overall.grade.startsWith("A") ? "text-green-600" :
                    report.overall.grade === "B" ? "text-blue-600" :
                    report.overall.grade === "C" ? "text-yellow-600" : "text-red-600"
                  }`}>
                    {report.overall.grade}
                  </div>
                  <div className="text-sm text-muted">Nota</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{report.overall.totalSuggestions}</div>
                  <div className="text-sm text-muted">Sugestões</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{report.overall.criticalIssues}</div>
                  <div className="text-sm text-muted">Críticos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{report.analysis.length}</div>
                  <div className="text-sm text-muted">Elementos</div>
                </div>
              </div>
            </div>

            {/* Category Scores */}
            <div className="grid gap-4 md:grid-cols-5">
              {Object.entries(report.categories).map(([category, data]) => {
                const Icon = getCategoryIcon(category);
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-lg border p-4 text-left transition-all ${
                      selectedCategory === category
                        ? "border-blue-500 bg-blue-500/10"
                        : "border-foreground/20 hover:border-foreground/40 hover:bg-surface/50"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="h-4 w-4" />
                      <Text size="sm" className="font-medium capitalize">
                        {category === "seo" ? "SEO" : category}
                      </Text>
                    </div>
                    <div className={`text-lg font-bold ${
                      data.score >= 85 ? "text-green-600" :
                      data.score >= 70 ? "text-yellow-600" : "text-red-600"
                    }`}>
                      {data.score}
                    </div>
                    <Text size="sm" tone="muted">
                      {data.issues} issue{data.issues !== 1 ? "s" : ""}
                    </Text>
                  </button>
                );
              })}
            </div>

            {/* Filter Bar */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  selectedCategory === "all"
                    ? "bg-foreground text-background"
                    : "bg-surface hover:bg-surface-2"
                }`}
              >
                Todas ({report.overall.totalSuggestions})
              </button>
              {Object.entries(report.categories).map(([category, data]) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-foreground text-background"
                      : "bg-surface hover:bg-surface-2"
                  }`}
                >
                  {category === "seo" ? "SEO" : category.charAt(0).toUpperCase() + category.slice(1)} ({data.issues})
                </button>
              ))}
            </div>

            {/* Suggestions List */}
            <div className="space-y-3">
              {filteredSuggestions.map((suggestion) => {
                const Icon = getSuggestionIcon(suggestion.type);
                return (
                  <motion.div
                    key={suggestion.id}
                    layout
                    className={`rounded-lg border p-4 ${
                      suggestion.type === "critical"
                        ? "border-red-500/30 bg-red-500/5"
                        : suggestion.type === "warning"
                        ? "border-yellow-500/30 bg-yellow-500/5"
                        : "border-foreground/20 bg-surface/30"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Icon className={`h-5 w-5 mt-0.5 ${
                        suggestion.type === "critical" ? "text-red-600" :
                        suggestion.type === "warning" ? "text-yellow-600" :
                        "text-blue-600"
                      }`} />

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Text className="font-medium text-foreground">
                            {suggestion.title}
                          </Text>
                          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            suggestion.impact === "high" ? "bg-red-500/20 text-red-600" :
                            suggestion.impact === "medium" ? "bg-yellow-500/20 text-yellow-600" :
                            "bg-blue-500/20 text-blue-600"
                          }`}>
                            {suggestion.impact}
                          </span>
                          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            suggestion.effort === "easy" ? "bg-green-500/20 text-green-600" :
                            suggestion.effort === "medium" ? "bg-yellow-500/20 text-yellow-600" :
                            "bg-red-500/20 text-red-600"
                          }`}>
                            {suggestion.effort}
                          </span>
                        </div>

                        <Text size="sm" tone="muted" className="mb-2">
                          {suggestion.description}
                        </Text>

                        {(suggestion.before || suggestion.after) && (
                          <div className="rounded border border-foreground/20 bg-surface/50 p-3 text-xs">
                            {suggestion.before && (
                              <div className="mb-2">
                                <div className="text-muted mb-1">❌ Antes:</div>
                                <div className="font-mono">{suggestion.before}</div>
                              </div>
                            )}
                            {suggestion.after && (
                              <div>
                                <div className="text-muted mb-1">✅ Depois:</div>
                                <div className="font-mono">{suggestion.after}</div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {filteredSuggestions.length === 0 && (
                <div className="flex flex-col items-center justify-center py-8">
                  <CheckCircle className="h-8 w-8 text-green-600 mb-2" />
                  <Text tone="muted" size="lg">
                    {selectedCategory === "all"
                      ? "Nenhuma sugestão encontrada!"
                      : `Nenhum problema de ${selectedCategory} encontrado!`
                    }
                  </Text>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      {!report && !isAnalyzing && (
        <div className="flex flex-col items-center justify-center py-16">
          <Brain className="h-16 w-16 text-muted mb-4" />
          <Heading as="h3" size="display-sm" className="mb-2">
            Otimização Inteligente de Conteúdo
          </Heading>
          <Text tone="muted" size="lg" className="text-center max-w-md mb-6">
            Análise avançada com IA para otimizar seu portfólio. Detecta problemas
            de SEO, acessibilidade, legibilidade e engajamento.
          </Text>
          <Button onClick={analyzeContent} className="gap-2">
            <Brain className="h-4 w-4" />
            Começar Análise
          </Button>
        </div>
      )}

      {/* Loading State */}
      {isAnalyzing && (
        <div className="flex flex-col items-center justify-center py-16">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="mb-4"
          >
            <Brain className="h-16 w-16 text-blue-600" />
          </motion.div>
          <Heading as="h3" size="display-sm" className="mb-2">
            Analisando Conteúdo...
          </Heading>
          <Text tone="muted" className="text-center">
            IA processando elementos da página para otimização
          </Text>
        </div>
      )}
    </div>
  );
}