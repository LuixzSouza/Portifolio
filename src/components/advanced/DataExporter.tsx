/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download, FileJson, FileText, FileSpreadsheet,
  Printer, X, Check, Settings, Calendar
} from "lucide-react";
import { Button } from "@/components/ds/Button";
import { Text } from "@/components/ds/Text";
import { Heading } from "@/components/ds/Heading";
import { type Projeto } from "@/data/projects";
import { useLanguage } from "@/components/ds/LanguageProvider";
import { pickText, pickList } from "@/lib/i18n";

interface DataExporterProps {
  data: Projeto[];
  filename?: string;
  selectedIds?: Set<string>;
}

type ExportFormat = "json" | "csv" | "txt" | "pdf";

interface ExportConfig {
  format: ExportFormat;
  includeImages: boolean;
  includeLinks: boolean;
  includeDescription: boolean;
  includeTechnologies: boolean;
  includeMetadata: boolean;
  selectedOnly: boolean;
}

const DEFAULT_CONFIG: ExportConfig = {
  format: "json",
  includeImages: true,
  includeLinks: true,
  includeDescription: true,
  includeTechnologies: true,
  includeMetadata: true,
  selectedOnly: false,
};

export function DataExporter({ data, filename = "projects", selectedIds }: DataExporterProps) {
  const { lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<ExportConfig>(DEFAULT_CONFIG);
  const [isExporting, setIsExporting] = useState(false);

  const selectedData = selectedIds && selectedIds.size > 0
    ? data.filter(project => selectedIds.has(project.nome))
    : data;

  const exportData = config.selectedOnly && selectedIds ? selectedData : data;

  const updateConfig = (updates: Partial<ExportConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const prepareData = () => {
    return exportData.map(project => {
      const prepared: Record<string, unknown> = {
        nome: project.nome,
        categoria: project.categoria,
        status: project.status,
        complexidade: project.complexidade,
        destaque: project.destaque,
      };

      if (config.includeDescription && project.descricao) {
        prepared.descricao = pickText(project.descricao, lang);
      }

      if (config.includeDescription && project.resumo) {
        prepared.resumo = pickText(project.resumo, lang);
      }

      if (config.includeTechnologies) {
        prepared.tecnologias = project.tecnologias;
        if (project.tecnologiasPrincipais) {
          prepared.tecnologiasPrincipais = project.tecnologiasPrincipais;
        }
      }

      if (config.includeLinks) {
        prepared.links = project.links;
      }

      if (config.includeImages && project.imagem) {
        prepared.imagem = project.imagem;
      }

      if (config.includeMetadata) {
        if (project.data) prepared.data = pickText(project.data, lang);
        if (project.duracao) prepared.duracao = project.duracao;
        if (project.tamanhoEquipe) prepared.tamanhoEquipe = project.tamanhoEquipe;
        if (project.tags) prepared.tags = project.tags;
        if (project.objetivos) prepared.objetivos = pickList(project.objetivos, lang);
        if (project.desafios) prepared.desafios = pickList(project.desafios, lang);
        if (project.aprendizados) prepared.aprendizados = pickList(project.aprendizados, lang);
      }

      return prepared;
    });
  };

  const exportAsJSON = (data: unknown[]) => {
    const jsonData = JSON.stringify(data, null, 2);
    downloadFile(jsonData, `${filename}.json`, "application/json");
  };

  const exportAsCSV = (data: unknown[]) => {
    if (data.length === 0) return;

    const headers = Object.keys(data[0] as Record<string, unknown>);
    const csvHeaders = headers.join(",");

    const csvRows = data.map(row => {
      return headers.map(header => {
        const value = (row as Record<string, unknown>)[header];
        if (Array.isArray(value)) {
          return `"${value.join("; ")}"`;
        }
        if (typeof value === "object" && value !== null) {
          return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
        }
        return `"${String(value || "").replace(/"/g, '""')}"`;
      }).join(",");
    });

    const csvContent = [csvHeaders, ...csvRows].join("\n");
    downloadFile(csvContent, `${filename}.csv`, "text/csv");
  };

  const exportAsTXT = (data: unknown[]) => {
    const txtContent = data.map(project => {
      const proj = project as Record<string, unknown>;
      const lines = [
        `PROJETO: ${proj.nome}`,
        `========${"=".repeat((proj.nome as string).length)}`,
        "",
        `Categoria: ${proj.categoria}`,
        `Status: ${proj.status}`,
        `Complexidade: ${proj.complexidade}`,
        `Destaque: ${proj.destaque ? "Sim" : "Não"}`,
      ];

      if (proj.descricao) {
        lines.push("", `Descrição: ${proj.descricao}`);
      }

      if (proj.tecnologias && (proj.tecnologias as string[]).length > 0) {
        lines.push("", `Tecnologias: ${(proj.tecnologias as string[]).join(", ")}`);
      }

      if (proj.links) {
        lines.push("", "Links:");
        Object.entries(proj.links).forEach(([key, value]) => {
          if (value) lines.push(`  ${key}: ${value}`);
        });
      }

      if (proj.objetivos) {
        lines.push("", `Objetivos: ${proj.objetivos}`);
      }

      if (proj.desafios) {
        lines.push("", `Desafios: ${proj.desafios}`);
      }

      if (proj.aprendizados) {
        lines.push("", `Aprendizados: ${proj.aprendizados}`);
      }

      return lines.join("\n");
    }).join("\n\n" + "=".repeat(80) + "\n\n");

    downloadFile(txtContent, `${filename}.txt`, "text/plain");
  };

  const exportAsPDF = async (data: unknown[]) => {
    // In a real implementation, you would use a library like jsPDF
    // For now, we'll create a formatted HTML that can be printed as PDF
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Portfólio - ${filename}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; margin: 20px; }
          .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
          .project { margin-bottom: 30px; page-break-inside: avoid; }
          .project-title { font-size: 18px; font-weight: bold; color: #333; margin-bottom: 10px; }
          .project-meta { background: #f5f5f5; padding: 10px; margin-bottom: 10px; }
          .tech-list { display: inline-block; background: #e9e9e9; padding: 2px 6px; margin: 2px; border-radius: 3px; font-size: 12px; }
          @media print { body { margin: 0; } .no-print { display: none; } }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Portfólio de Projetos - Luiz Souza</h1>
          <p>Exportado em ${new Date().toLocaleDateString("pt-BR")}</p>
          <p>Total de projetos: ${data.length}</p>
        </div>

        ${data.map(project => {
          const proj = project as Record<string, unknown>;
          return `
          <div class="project">
            <h2 class="project-title">${proj.nome}</h2>
            <div class="project-meta">
              <strong>Categoria:</strong> ${proj.categoria} |
              <strong>Status:</strong> ${proj.status} |
              <strong>Complexidade:</strong> ${proj.complexidade}
              ${proj.destaque ? " | <strong>⭐ Projeto Destaque</strong>" : ""}
            </div>

            ${proj.descricao ? `<p><strong>Descrição:</strong> ${proj.descricao}</p>` : ""}

            ${proj.tecnologias && (proj.tecnologias as string[]).length > 0 ? `
              <p><strong>Tecnologias:</strong><br>
              ${(proj.tecnologias as string[]).map((tech: string) => `<span class="tech-list">${tech}</span>`).join("")}
              </p>
            ` : ""}

            ${proj.links ? `
              <p><strong>Links:</strong><br>
              ${Object.entries(proj.links).filter(([,value]) => value).map(([key, value]) =>
                `${key}: <a href="${value}">${value}</a>`
              ).join("<br>")}
              </p>
            ` : ""}

            ${proj.objetivos ? `<p><strong>Objetivos:</strong> ${proj.objetivos}</p>` : ""}
            ${proj.desafios ? `<p><strong>Desafios:</strong> ${proj.desafios}</p>` : ""}
            ${proj.aprendizados ? `<p><strong>Aprendizados:</strong> ${proj.aprendizados}</p>` : ""}
          </div>
        `;
        }).join("")}

        <div class="no-print" style="margin-top: 50px; text-align: center; color: #666;">
          <p>Para salvar como PDF, use Ctrl+P e selecione "Salvar como PDF" no navegador.</p>
        </div>
      </body>
      </html>
    `;

    const newWindow = window.open("", "_blank");
    if (newWindow) {
      newWindow.document.write(htmlContent);
      newWindow.document.close();
    }
  };

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const data = prepareData();

      switch (config.format) {
        case "json":
          exportAsJSON(data);
          break;
        case "csv":
          exportAsCSV(data);
          break;
        case "txt":
          exportAsTXT(data);
          break;
        case "pdf":
          await exportAsPDF(data);
          break;
      }

      // Close modal after successful export
      setTimeout(() => setIsOpen(false), 1000);
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const formatOptions = [
    { key: "json" as const, label: "JSON", icon: FileJson, desc: "Dados estruturados para desenvolvedores" },
    { key: "csv" as const, label: "CSV", icon: FileSpreadsheet, desc: "Planilha para Excel/Google Sheets" },
    { key: "txt" as const, label: "TXT", icon: FileText, desc: "Texto simples legível" },
    { key: "pdf" as const, label: "PDF", icon: Printer, desc: "Relatório para impressão" },
  ];

  return (
    <>
      <Button
        variant="outline"
        size="md"
        onClick={() => setIsOpen(true)}
        className="gap-2"
      >
        <Download className="h-4 w-4" />
        <span className="hidden sm:inline">Exportar</span>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-4 z-50 mx-auto max-w-2xl rounded-2xl border border-foreground/20 bg-background p-6 shadow-xl md:inset-8 lg:max-w-3xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-foreground/10 pb-4">
                <div className="flex items-center gap-3">
                  <Download className="h-6 w-6 text-foreground" />
                  <div>
                    <Heading as="h2" size="display-md">Exportar Dados</Heading>
                    <Text tone="muted" size="sm">
                      {exportData.length} projeto{exportData.length > 1 ? "s" : ""}
                      {config.selectedOnly && selectedIds ? " selecionado" + (selectedData.length > 1 ? "s" : "") : ""}
                    </Text>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-foreground/10 hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-6 space-y-6">
                {/* Format Selection */}
                <div className="space-y-3">
                  <Text size="sm" className="font-medium text-foreground">Formato de Export</Text>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {formatOptions.map((format) => {
                      const Icon = format.icon;
                      const active = config.format === format.key;
                      return (
                        <button
                          key={format.key}
                          onClick={() => updateConfig({ format: format.key })}
                          className={`flex items-start gap-3 rounded-lg border p-4 text-left transition-all ${
                            active
                              ? "border-blue-500 bg-blue-500/10"
                              : "border-foreground/20 hover:border-foreground/40 hover:bg-surface/50"
                          }`}
                        >
                          <Icon className={`h-5 w-5 mt-0.5 ${active ? "text-blue-600" : "text-muted"}`} />
                          <div>
                            <div className={`font-medium ${active ? "text-blue-600" : "text-foreground"}`}>
                              {format.label}
                            </div>
                            <div className="text-sm text-muted">{format.desc}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Export Options */}
                <div className="space-y-4">
                  <Text size="sm" className="font-medium text-foreground">Opções de Conteúdo</Text>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      { key: "includeDescription", label: "Descrições", desc: "Descrição completa dos projetos" },
                      { key: "includeTechnologies", label: "Tecnologias", desc: "Lista de tecnologias utilizadas" },
                      { key: "includeLinks", label: "Links", desc: "GitHub, demo e outros links" },
                      { key: "includeImages", label: "Imagens", desc: "URLs das imagens dos projetos" },
                      { key: "includeMetadata", label: "Metadados", desc: "Datas, duração, equipe, tags" },
                    ].map((option) => (
                      <label
                        key={option.key}
                        className="flex items-start gap-3 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={config[option.key as keyof ExportConfig] as boolean}
                          onChange={(e) => updateConfig({ [option.key]: e.target.checked })}
                          className="mt-1"
                        />
                        <div>
                          <div className="text-sm font-medium text-foreground">{option.label}</div>
                          <div className="text-xs text-muted">{option.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>

                  {/* Selected Only Option */}
                  {selectedIds && selectedIds.size > 0 && (
                    <label className="flex items-start gap-3 cursor-pointer rounded-lg border border-foreground/20 p-3">
                      <input
                        type="checkbox"
                        checked={config.selectedOnly}
                        onChange={(e) => updateConfig({ selectedOnly: e.target.checked })}
                        className="mt-1"
                      />
                      <div>
                        <div className="text-sm font-medium text-foreground">
                          Apenas Projetos Selecionados
                        </div>
                        <div className="text-xs text-muted">
                          Exportar apenas os {selectedIds.size} projeto{selectedIds.size > 1 ? "s" : ""} selecionado{selectedIds.size > 1 ? "s" : ""}
                        </div>
                      </div>
                    </label>
                  )}
                </div>

                {/* Export Summary */}
                <div className="rounded-lg border border-foreground/20 bg-surface/30 p-4">
                  <Text size="sm" className="font-medium text-foreground mb-2">Resumo do Export</Text>
                  <div className="grid gap-2 text-xs text-muted">
                    <div>📁 Formato: {formatOptions.find(f => f.key === config.format)?.label}</div>
                    <div>📊 Projetos: {exportData.length}</div>
                    <div>📅 Data: {new Date().toLocaleDateString("pt-BR")}</div>
                    <div>🏷️ Arquivo: {filename}.{config.format}</div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 flex items-center justify-between border-t border-foreground/10 pt-4">
                <div className="text-xs text-muted">
                  Os dados exportados refletem o estado atual do portfólio
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleExport}
                    disabled={isExporting}
                    className="gap-2"
                  >
                    {isExporting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Download className="h-4 w-4" />
                        </motion.div>
                        Exportando...
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4" />
                        Exportar {config.format.toUpperCase()}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}