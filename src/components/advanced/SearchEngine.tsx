/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Command, Filter, Clock, TrendingUp, Star, Hash, Calendar, Code2, Eye, X } from "lucide-react";
import { type Projeto } from "@/data/projects";
import { useLanguage, type Lang } from "@/components/ds/LanguageProvider";
import { pickText } from "@/lib/i18n";
import { useTranslations } from "@/content/useTranslations";

interface SearchResult {
  project: Projeto;
  score: number;
  matches: Array<{
    field: string;
    text: string;
    highlighted: string;
  }>;
}

interface SearchEngineProps {
  projects: Projeto[];
  onSelect: (project: Projeto) => void;
  className?: string;
}

// Algoritmo de busca fuzzy com scoring
class FuzzySearch {
  private projects: Projeto[];
  private lang: string;

  constructor(projects: Projeto[], lang: string) {
    this.projects = projects;
    this.lang = lang;
  }

  // Calcula distância de Levenshtein
  private levenshteinDistance(a: string, b: string): number {
    const matrix = Array(a.length + 1).fill(null).map(() => Array(b.length + 1).fill(null));

    for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
    for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,      // deletion
          matrix[i][j - 1] + 1,      // insertion
          matrix[i - 1][j - 1] + cost // substitution
        );
      }
    }

    return matrix[a.length][b.length];
  }

  // Calcula score de similaridade
  private similarityScore(query: string, text: string): number {
    if (!query || !text) return 0;

    const distance = this.levenshteinDistance(query.toLowerCase(), text.toLowerCase());
    const maxLength = Math.max(query.length, text.length);
    return maxLength > 0 ? (maxLength - distance) / maxLength : 0;
  }

  // Destaca termos encontrados
  private highlightMatches(text: string, query: string): string {
    if (!query) return text;

    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">$1</mark>');
  }

  // Busca principal com scoring avançado
  search(query: string): SearchResult[] {
    if (!query.trim()) return [];

    const terms = query.toLowerCase().trim().split(/\s+/);
    const results: SearchResult[] = [];

    for (const project of this.projects) {
      let totalScore = 0;
      const matches: Array<{ field: string; text: string; highlighted: string }> = [];

      // Busca no nome (peso 40%)
      const nome = project.nome.toLowerCase();
      const nomeScore = terms.reduce((score, term) => {
        if (nome.includes(term)) return score + 1;
        return score + this.similarityScore(term, nome) * 0.5;
      }, 0);

      if (nomeScore > 0) {
        totalScore += nomeScore * 0.4;
        matches.push({
          field: "nome",
          text: project.nome,
          highlighted: this.highlightMatches(project.nome, query)
        });
      }

      // Busca na descrição (peso 25%)
      const descricao = project.descricao ? pickText(project.descricao, this.lang as Lang).toLowerCase() : "";
      const descricaoScore = terms.reduce((score, term) => {
        if (descricao.includes(term)) return score + 0.8;
        return score + this.similarityScore(term, descricao) * 0.3;
      }, 0);

      if (descricaoScore > 0 && project.descricao) {
        totalScore += descricaoScore * 0.25;
        matches.push({
          field: "descricao",
          text: pickText(project.descricao, this.lang as Lang),
          highlighted: this.highlightMatches(pickText(project.descricao, this.lang as Lang), query)
        });
      }

      // Busca nas tecnologias (peso 20%)
      const techScore = terms.reduce((score, term) => {
        return project.tecnologias?.reduce((techScore, tech) => {
          if (tech.toLowerCase().includes(term)) return techScore + 1;
          return techScore + this.similarityScore(term, tech.toLowerCase()) * 0.6;
        }, score) || score;
      }, 0);

      if (techScore > 0) {
        totalScore += techScore * 0.2;
        const matchedTechs = project.tecnologias?.filter(tech =>
          terms.some(term => tech.toLowerCase().includes(term))
        ) || [];

        if (matchedTechs.length > 0) {
          matches.push({
            field: "tecnologias",
            text: matchedTechs.join(", "),
            highlighted: matchedTechs.map(tech => this.highlightMatches(tech, query)).join(", ")
          });
        }
      }

      // Busca nas tags (peso 10%)
      const tagScore = terms.reduce((score, term) => {
        return project.tags?.reduce((tagScore, tag) => {
          if (tag.toLowerCase().includes(term)) return tagScore + 1;
          return tagScore + this.similarityScore(term, tag.toLowerCase()) * 0.4;
        }, score) || score;
      }, 0);

      if (tagScore > 0) {
        totalScore += tagScore * 0.1;
      }

      // Boost para projetos em destaque
      if (project.destaque) {
        totalScore *= 1.2;
      }

      // Boost para projetos ativos
      if (project.status === "active") {
        totalScore *= 1.1;
      }

      // Só inclui se tem score significativo
      if (totalScore > 0.1) {
        results.push({
          project,
          score: totalScore,
          matches
        });
      }
    }

    // Ordena por score (desc) e depois por nome
    return results
      .sort((a, b) => {
        if (Math.abs(a.score - b.score) < 0.1) {
          return a.project.nome.localeCompare(b.project.nome);
        }
        return b.score - a.score;
      })
      .slice(0, 10); // Máximo 10 resultados
  }
}

const RECENT_SEARCHES_KEY = "portfolio-recent-searches";
const SEARCH_ANALYTICS_KEY = "portfolio-search-analytics";

export function SearchEngine({ projects, onSelect, className = "" }: SearchEngineProps) {
  const { lang } = useLanguage();
  const _t = useTranslations();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [searchAnalytics, setSearchAnalytics] = useState<Record<string, number>>({});
  const inputRef = useRef<HTMLInputElement>(null);

  const fuzzySearch = useMemo(
    () => new FuzzySearch(projects, lang),
    [projects, lang]
  );

  const results = useMemo(
    () => fuzzySearch.search(query),
    [fuzzySearch, query]
  );

  // Carregar dados do localStorage
  useEffect(() => {
    try {
      const recent = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (recent) setRecentSearches(JSON.parse(recent));

      const analytics = localStorage.getItem(SEARCH_ANALYTICS_KEY);
      if (analytics) setSearchAnalytics(JSON.parse(analytics));
    } catch (error) {
      console.warn("Erro ao carregar dados de busca:", error);
    }
  }, []);

  // Salvar busca
  const saveSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    // Atualizar buscas recentes
    const newRecent = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
    setRecentSearches(newRecent);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(newRecent));

    // Atualizar analytics
    const newAnalytics = {
      ...searchAnalytics,
      [searchQuery]: (searchAnalytics[searchQuery] || 0) + 1
    };
    setSearchAnalytics(newAnalytics);
    localStorage.setItem(SEARCH_ANALYTICS_KEY, JSON.stringify(newAnalytics));
  };

  // Busca mais populares
  const popularSearches = useMemo(() => {
    return Object.entries(searchAnalytics)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([term]) => term);
  }, [searchAnalytics]);

  const handleSelect = (project: Projeto) => {
    saveSearch(query);
    setIsOpen(false);
    setQuery("");
    onSelect(project);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      setQuery("");
    }
    if (e.key === "Enter" && results.length > 0) {
      handleSelect(results[0].project);
    }
  };

  // Shortcuts de teclado
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`inline-flex items-center gap-3 rounded-xl border border-foreground/20 bg-background/50 px-4 py-2.5 text-left text-sm text-muted transition-colors hover:border-foreground/40 hover:text-foreground backdrop-blur-sm ${className}`}
      >
        <Search className="h-4 w-4" />
        <span>{lang === "pt" ? "Buscar projetos..." : "Search projects..."}</span>
        <div className="ml-auto flex items-center gap-1 text-xs">
          <Command className="h-3 w-3" />
          <span>K</span>
        </div>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-start justify-center bg-black/50 backdrop-blur-sm p-4 pt-[20vh]"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="w-full max-w-2xl rounded-2xl border border-foreground/10 bg-background/95 shadow-2xl backdrop-blur-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center gap-3 border-b border-foreground/10 p-4">
                <Search className="h-5 w-5 text-muted" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={lang === "pt" ? "Buscar projetos..." : "Search projects..."}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent text-lg placeholder:text-muted focus:outline-none"
                  autoFocus
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-muted hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Content */}
              <div className="max-h-96 overflow-y-auto custom-scrollbar">
                {query.trim() ? (
                  // Results
                  <div className="p-2">
                    {results.length > 0 ? (
                      <>
                        <div className="px-3 py-2 text-xs font-medium text-muted">
                          {results.length} resultado{results.length !== 1 ? "s" : ""} encontrado{results.length !== 1 ? "s" : ""}
                        </div>
                        {results.map((result, index) => (
                          <motion.button
                            key={result.project.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => handleSelect(result.project)}
                            className="flex w-full items-start gap-3 rounded-xl p-3 text-left transition-colors hover:bg-foreground/5 focus:bg-foreground/5 focus:outline-none"
                          >
                            {/* Image */}
                            {result.project.imagem && (
                              <div className="h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-surface">
                                <img
                                  src={result.project.imagem}
                                  alt={result.project.nome}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                            )}

                            {/* Content */}
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3
                                  className="font-semibold text-foreground"
                                  dangerouslySetInnerHTML={{
                                    __html: result.matches.find(m => m.field === "nome")?.highlighted || result.project.nome
                                  }}
                                />
                                {result.project.destaque && (
                                  <Star className="h-3 w-3 text-yellow-500" />
                                )}
                              </div>

                              {/* Matches */}
                              <div className="space-y-1">
                                {result.matches.slice(0, 2).map((match, i) => (
                                  <div key={i} className="text-sm">
                                    <span className="text-muted text-xs font-medium">
                                      {match.field === "tecnologias" ? "Tech:" :
                                       match.field === "descricao" ? "Desc:" : match.field}
                                    </span>
                                    <div
                                      className="text-muted truncate"
                                      dangerouslySetInnerHTML={{ __html: match.highlighted }}
                                    />
                                  </div>
                                ))}
                              </div>

                              {/* Score indicator */}
                              <div className="mt-2 flex items-center gap-2">
                                <div className="h-1 w-16 rounded-full bg-foreground/10">
                                  <div
                                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                                    style={{ width: `${Math.min(100, result.score * 50)}%` }}
                                  />
                                </div>
                                <span className="text-xs text-muted">
                                  {Math.round(result.score * 100)}% match
                                </span>
                              </div>
                            </div>
                          </motion.button>
                        ))}
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <Search className="h-12 w-12 text-muted/50 mb-3" />
                        <h3 className="font-semibold text-foreground mb-1">
                          {lang === "pt" ? "Nenhum resultado" : "No results"}
                        </h3>
                        <p className="text-sm text-muted">
                          {lang === "pt" ? "Tente outros termos de busca" : "Try different search terms"}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  // Suggestions
                  <div className="p-4 space-y-4">
                    {recentSearches.length > 0 && (
                      <div>
                        <h3 className="flex items-center gap-2 text-sm font-medium text-muted mb-3">
                          <Clock className="h-4 w-4" />
                          {lang === "pt" ? "Buscas Recentes" : "Recent Searches"}
                        </h3>
                        <div className="space-y-1">
                          {recentSearches.map((search, index) => (
                            <button
                              key={index}
                              onClick={() => setQuery(search)}
                              className="flex w-full items-center gap-3 rounded-lg p-2 text-left text-sm transition-colors hover:bg-foreground/5"
                            >
                              <Hash className="h-3 w-3 text-muted" />
                              <span className="text-foreground">{search}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {popularSearches.length > 0 && (
                      <div>
                        <h3 className="flex items-center gap-2 text-sm font-medium text-muted mb-3">
                          <TrendingUp className="h-4 w-4" />
                          {lang === "pt" ? "Mais Buscados" : "Popular Searches"}
                        </h3>
                        <div className="space-y-1">
                          {popularSearches.map((search, index) => (
                            <button
                              key={index}
                              onClick={() => setQuery(search)}
                              className="flex w-full items-center gap-3 rounded-lg p-2 text-left text-sm transition-colors hover:bg-foreground/5"
                            >
                              <TrendingUp className="h-3 w-3 text-muted" />
                              <span className="text-foreground">{search}</span>
                              <span className="ml-auto text-xs text-muted">
                                {searchAnalytics[search]} busca{searchAnalytics[search] !== 1 ? "s" : ""}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Suggestions */}
                    <div>
                      <h3 className="flex items-center gap-2 text-sm font-medium text-muted mb-3">
                        <Filter className="h-4 w-4" />
                        {lang === "pt" ? "Sugestões" : "Suggestions"}
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {["React", "Next.js", "TypeScript", "API", "Real Projects", "UI/UX"].map((suggestion) => (
                          <button
                            key={suggestion}
                            onClick={() => setQuery(suggestion)}
                            className="rounded-lg border border-foreground/10 bg-foreground/5 px-3 py-2 text-sm transition-colors hover:bg-foreground/10"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-foreground/10 px-4 py-3 text-xs text-muted">
                <div className="flex items-center gap-4">
                  <span>↵ {lang === "pt" ? "para selecionar" : "to select"}</span>
                  <span>ESC {lang === "pt" ? "para fechar" : "to close"}</span>
                </div>
                <span>{projects.length} projetos indexados</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}