"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Save, Eye, EyeOff, RefreshCw } from "lucide-react";
import { ApiError, getContent, setContent } from "@/lib/api";
import { getFacts, getList, getText, type ContentInput } from "@/lib/schemas/content";
import { aboutBio, aboutFacts, storyParagraphs, storyQuote } from "@/data/about";
import { pickList } from "@/lib/i18n";
import { Bilingual, Field, TextArea } from "./fields";
import { useToast } from "./Toast";
import { pair } from "./utils";

type Pair = { pt: string; en: string };
type Fact = { label: Pair; value: Pair };
type Lang = "pt" | "en";

interface ContentSectionProps {
  title: string;
  children: React.ReactNode;
  onSave: () => Promise<void>;
  preview?: (lang: Lang) => React.ReactNode;
}

function ContentSection({ title, children, onSave, preview }: ContentSectionProps) {
  const [busy, setBusy] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [lang, setLang] = useState<Lang>("pt");
  const toast = useToast();

  async function save() {
    setBusy(true);
    try {
      await onSave();
      toast.success(`${title}: salvo com sucesso.`);
    } catch (e) {
      toast.error(e instanceof ApiError ? e.message : `Erro ao salvar “${title}”.`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <motion.section
      layout
      className="overflow-hidden rounded-2xl border border-foreground/10 bg-surface shadow-sm"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-foreground/10 bg-surface/50 p-4">
        <h3 className="font-roobert text-lg font-semibold text-foreground">{title}</h3>
        <div className="flex items-center gap-2">
          {preview && (
            <motion.button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`rounded-lg p-2 transition-colors ${
                showPreview
                  ? "bg-blue-500 text-white"
                  : "bg-foreground/10 text-muted hover:bg-foreground/20 hover:text-foreground"
              }`}
              title={showPreview ? "Ocultar preview" : "Mostrar preview"}
            >
              {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </motion.button>
          )}
          <motion.button
            type="button"
            onClick={save}
            disabled={busy}
            whileHover={!busy ? { scale: 1.05 } : undefined}
            whileTap={!busy ? { scale: 0.95 } : undefined}
            className="flex items-center gap-2 rounded-lg bg-foreground px-3 py-2 text-sm font-medium text-background transition-colors hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {busy ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {busy ? "Salvando..." : "Salvar"}
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className={`${showPreview ? "grid lg:grid-cols-2" : ""} gap-0`}>
        {/* Form */}
        <div className="p-6 space-y-4">
          {children}
        </div>

        {/* Preview */}
        <AnimatePresence mode="wait">
          {showPreview && preview && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="border-t border-foreground/10 bg-foreground/[0.02] p-6 lg:border-l lg:border-t-0"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <h4 className="text-xs font-medium uppercase tracking-widest text-muted">
                  Como aparece no site
                </h4>
                <div className="flex rounded-lg border border-foreground/15 bg-background p-0.5">
                  {(["pt", "en"] as const).map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => setLang(l)}
                      className={`rounded-md px-2.5 py-1 text-xs font-semibold uppercase transition-colors ${
                        lang === l ? "bg-foreground text-background" : "text-muted hover:text-foreground"
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
              <div className="sticky top-4 overflow-hidden rounded-2xl border border-foreground/10 bg-background shadow-sm">
                {/* Barra estilo navegador */}
                <div className="flex items-center gap-1.5 border-b border-foreground/10 bg-foreground/[0.03] px-3 py-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
                </div>
                <div className="p-5">{preview(lang)}</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

export function ContentManager() {
  const [loaded, setLoaded] = useState(false);
  const [bio, setBio] = useState<Pair>({ pt: "", en: "" });
  const [quote, setQuote] = useState<Pair>({ pt: "", en: "" });
  const [paraPt, setParaPt] = useState("");
  const [paraEn, setParaEn] = useState("");
  const [facts, setFacts] = useState<Fact[]>([]);

  // Carrega da API com fallbacks estáticos
  useEffect(() => {
    let active = true;
    const apply = (map: Awaited<ReturnType<typeof getContent>> | null) => {
      if (!active) return;
      setBio((map && getText(map, "about.bio")) ?? pair(aboutBio));
      setQuote((map && getText(map, "about.story.quote")) ?? pair(storyQuote));
      const list = (map && getList(map, "about.story.paragraphs")) ?? {
        pt: pickList(storyParagraphs, "pt"),
        en: pickList(storyParagraphs, "en"),
      };
      setParaPt(list.pt.join("\n"));
      setParaEn(list.en.join("\n"));
      const f = (map && getFacts(map, "about.facts")) ?? aboutFacts.map((x) => ({ label: pair(x.label), value: pair(x.value) }));
      setFacts(f);
      setLoaded(true);
    };
    getContent()
      .then(apply)
      .catch(() => apply(null));
    return () => {
      active = false;
    };
  }, []);

  const lines = (s: string) => s.split("\n").map((l) => l.trim()).filter((l) => l !== "");
  const save = (input: ContentInput) => setContent(input);

  if (!loaded) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center gap-3">
          <RefreshCw className="h-5 w-5 animate-spin text-muted" />
          <p className="text-sm text-muted">Carregando conteúdo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h2 className="font-roobert text-2xl font-semibold text-foreground">
          Conteúdo (Sobre)
        </h2>
        <span className="rounded-full bg-foreground/10 px-2.5 py-0.5 text-xs font-medium text-muted">
          Com preview em tempo real
        </span>
      </div>

      {/* Bio */}
      <ContentSection
        title="Bio / Apresentação"
        onSave={() => save({ chave: "about.bio", tipo: "text", valor: bio })}
        preview={(lang) => (
          <div className="space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted">
              {lang === "pt" ? "Sobre" : "About"}
            </span>
            <p className="font-serif text-xl leading-snug text-foreground">
              {bio[lang] ||
                (lang === "pt"
                  ? "Sua bio em português aparecerá aqui..."
                  : "Your bio in English will appear here...")}
            </p>
          </div>
        )}
      >
        <Bilingual
          label="Bio / Apresentação"
          value={bio}
          onChange={setBio}
          multiline
          placeholder={{
            pt: "Escreva uma bio cativante sobre você...",
            en: "Write a compelling bio about yourself..."
          }}
        />
      </ContentSection>

      {/* Quote */}
      <ContentSection
        title="Citação da História"
        onSave={() => save({ chave: "about.story.quote", tipo: "text", valor: quote })}
        preview={(lang) => (
          <blockquote className="relative pl-6">
            <span className="absolute left-0 top-0 font-serif text-4xl leading-none text-foreground/20">
              “
            </span>
            <p className="font-serif text-lg italic leading-snug text-foreground">
              {quote[lang] ||
                (lang === "pt"
                  ? "Sua citação em português aparecerá aqui..."
                  : "Your quote in English will appear here...")}
            </p>
          </blockquote>
        )}
      >
        <Bilingual
          label="Citação motivacional ou filosofia"
          value={quote}
          onChange={setQuote}
          multiline
          placeholder={{
            pt: "Uma frase que representa sua filosofia de trabalho...",
            en: "A phrase that represents your work philosophy..."
          }}
        />
      </ContentSection>

      {/* Story Paragraphs */}
      <ContentSection
        title="Parágrafos da História"
        onSave={() => save({ chave: "about.story.paragraphs", tipo: "list", valor: { pt: lines(paraPt), en: lines(paraEn) } })}
        preview={(lang) => {
          const paras = lines(lang === "pt" ? paraPt : paraEn);
          return (
            <div className="space-y-3">
              {paras.map((para, i) => (
                <p key={i} className="text-sm leading-relaxed text-foreground/80">
                  {para}
                </p>
              ))}
              {paras.length === 0 && (
                <p className="text-sm text-muted">
                  {lang === "pt"
                    ? "Seus parágrafos em português aparecerão aqui..."
                    : "Your paragraphs in English will appear here..."}
                </p>
              )}
            </div>
          );
        }}
      >
        <div className="space-y-4">
          <p className="text-sm text-muted">
            Escreva um parágrafo por linha. Parágrafos vazios serão ignorados.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Português (um parágrafo por linha)">
              <TextArea
                value={paraPt}
                onChange={setParaPt}
                rows={8}
                placeholder="Conte sua história...&#10;Cada linha será um parágrafo.&#10;&#10;Linhas vazias são ignoradas."
              />
            </Field>
            <Field label="English (one paragraph per line)">
              <TextArea
                value={paraEn}
                onChange={setParaEn}
                rows={8}
                placeholder="Tell your story...&#10;Each line will be a paragraph.&#10;&#10;Empty lines are ignored."
              />
            </Field>
          </div>
        </div>
      </ContentSection>

      {/* Facts */}
      <ContentSection
        title="Fatos e Números"
        onSave={() => save({ chave: "about.facts", tipo: "facts", valor: facts })}
        preview={(lang) => (
          <div className="grid grid-cols-2 gap-4">
            {facts.map((fact, i) => (
              <div key={i} className="space-y-1">
                <div className="font-serif text-3xl leading-none text-foreground">
                  {fact.value[lang] || "—"}
                </div>
                <div className="text-xs uppercase tracking-widest text-muted">
                  {fact.label[lang] || (lang === "pt" ? "Rótulo" : "Label")}
                </div>
              </div>
            ))}
            {facts.length === 0 && (
              <div className="col-span-2 py-6 text-center text-sm text-muted">
                {lang === "pt" ? "Seus fatos aparecerão aqui..." : "Your facts will appear here..."}
              </div>
            )}
          </div>
        )}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted">
              Fatos destacam números importantes (anos de experiência, projetos, etc.)
            </p>
            <button
              type="button"
              onClick={() => setFacts([...facts, { label: { pt: "", en: "" }, value: { pt: "", en: "" } }])}
              className="flex items-center gap-2 rounded-xl border border-foreground/15 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-foreground/5"
            >
              <Plus className="h-3 w-3" /> Adicionar fato
            </button>
          </div>

          <div className="space-y-4">
            {facts.map((f, i) => (
              <motion.div
                key={i}
                layout
                className="rounded-xl border border-foreground/10 bg-surface p-4 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted">Fato {i + 1}</span>
                  <button
                    type="button"
                    onClick={() => setFacts(facts.filter((_, idx) => idx !== i))}
                    className="rounded-lg p-1.5 text-muted transition-colors hover:bg-red-500/10 hover:text-red-500"
                    aria-label="Remover fato"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <Bilingual
                  label="Rótulo (ex: Anos de experiência, Projetos finalizados)"
                  value={f.label}
                  onChange={(label) => setFacts(facts.map((x, idx) => (idx === i ? { ...x, label } : x)))}
                  placeholder={{
                    pt: "Ex: Anos de Experiência",
                    en: "Ex: Years of Experience"
                  }}
                />
                <Bilingual
                  label="Valor (ex: +3, 50+, 100%)"
                  value={f.value}
                  onChange={(value) => setFacts(facts.map((x, idx) => (idx === i ? { ...x, value } : x)))}
                  placeholder={{
                    pt: "Ex: +3 anos",
                    en: "Ex: +3 years"
                  }}
                />
              </motion.div>
            ))}

            {facts.length === 0 && (
              <div className="text-center py-8 text-muted">
                <p className="text-sm mb-3">Nenhum fato adicionado ainda.</p>
                <button
                  type="button"
                  onClick={() => setFacts([{ label: { pt: "", en: "" }, value: { pt: "", en: "" } }])}
                  className="text-sm text-foreground hover:underline"
                >
                  Adicionar o primeiro fato
                </button>
              </div>
            )}
          </div>
        </div>
      </ContentSection>
    </div>
  );
}