"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { ApiError, getContent, setContent } from "@/lib/api";
import { getFacts, getList, getText, type ContentInput } from "@/lib/schemas/content";
import { aboutBio, aboutFacts, storyParagraphs, storyQuote } from "@/data/about";
import { pickList } from "@/lib/i18n";
import { Bilingual, Field, TextArea } from "./fields";
import { pair } from "./utils";

type Pair = { pt: string; en: string };
type Fact = { label: Pair; value: Pair };

/** Bloco com botão Salvar e estado próprio (salvando/erro/salvo). */
function ContentSection({
  title,
  onSave,
  children,
}: {
  title: string;
  onSave: () => Promise<void>;
  children: React.ReactNode;
}) {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  async function save() {
    setBusy(true);
    setMsg(null);
    try {
      await onSave();
      setMsg({ kind: "ok", text: "Salvo." });
    } catch (e) {
      setMsg({ kind: "err", text: e instanceof ApiError ? e.message : "Erro ao salvar." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-foreground/10 bg-surface p-5">
      <h3 className="font-roobert text-base font-semibold text-foreground">{title}</h3>
      {children}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={save}
          disabled={busy}
          className="rounded-xl bg-foreground px-4 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {busy ? "Salvando…" : "Salvar"}
        </button>
        {msg && (
          <span className={`text-sm ${msg.kind === "ok" ? "text-emerald-500" : "text-red-500"}`}>{msg.text}</span>
        )}
      </div>
    </section>
  );
}

export function ContentManager() {
  const [loaded, setLoaded] = useState(false);
  const [bio, setBio] = useState<Pair>({ pt: "", en: "" });
  const [quote, setQuote] = useState<Pair>({ pt: "", en: "" });
  const [paraPt, setParaPt] = useState("");
  const [paraEn, setParaEn] = useState("");
  const [facts, setFacts] = useState<Fact[]>([]);

  // Carrega da API; usa o conteúdo estático como fallback de cada chave.
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

  if (!loaded) return <p className="text-sm text-muted">Carregando…</p>;

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-roobert text-xl font-semibold text-foreground">Conteúdo (Sobre)</h2>

      <ContentSection title="Bio" onSave={() => save({ chave: "about.bio", tipo: "text", valor: bio })}>
        <Bilingual label="Texto" value={bio} onChange={setBio} multiline />
      </ContentSection>

      <ContentSection
        title="História — citação"
        onSave={() => save({ chave: "about.story.quote", tipo: "text", valor: quote })}
      >
        <Bilingual label="Citação" value={quote} onChange={setQuote} multiline />
      </ContentSection>

      <ContentSection
        title="História — parágrafos (um por linha)"
        onSave={() => save({ chave: "about.story.paragraphs", tipo: "list", valor: { pt: lines(paraPt), en: lines(paraEn) } })}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="PT (um parágrafo por linha)">
            <TextArea value={paraPt} onChange={setParaPt} rows={8} />
          </Field>
          <Field label="EN (um parágrafo por linha)">
            <TextArea value={paraEn} onChange={setParaEn} rows={8} />
          </Field>
        </div>
      </ContentSection>

      <ContentSection title="Fatos (Base, Formação, Foco…)" onSave={() => save({ chave: "about.facts", tipo: "facts", valor: facts })}>
        <div className="flex flex-col gap-3">
          {facts.map((f, i) => (
            <div key={i} className="flex flex-col gap-3 rounded-xl border border-foreground/10 p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted">Fato {i + 1}</span>
                <button
                  type="button"
                  onClick={() => setFacts(facts.filter((_, idx) => idx !== i))}
                  aria-label="Remover fato"
                  className="rounded-lg p-1.5 text-muted transition-colors hover:bg-red-500/10 hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <Bilingual
                label="Rótulo"
                value={f.label}
                onChange={(label) => setFacts(facts.map((x, idx) => (idx === i ? { ...x, label } : x)))}
              />
              <Bilingual
                label="Valor"
                value={f.value}
                onChange={(value) => setFacts(facts.map((x, idx) => (idx === i ? { ...x, value } : x)))}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => setFacts([...facts, { label: { pt: "", en: "" }, value: { pt: "", en: "" } }])}
            className="flex w-fit items-center gap-2 rounded-xl border border-foreground/15 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
          >
            <Plus className="h-4 w-4" /> Adicionar fato
          </button>
        </div>
      </ContentSection>
    </div>
  );
}
