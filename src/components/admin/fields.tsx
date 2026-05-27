"use client";

import { createContext, useContext, useState } from "react";
import { ApiError, uploadImage } from "@/lib/api";

/**
 * Primitivos de formulário do painel admin. Estilo enxuto alinhado ao design
 * system (bg-surface, border-foreground/10). Todos controlados (value/onChange).
 */

const inputClass =
  "w-full rounded-xl border border-foreground/15 bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-foreground/40";

/**
 * Idiomas do painel. Para adicionar um idioma na UI, inclua um item aqui — as
 * abas do modal e os campos Bilingual se adaptam sozinhos. (O dado por baixo
 * ainda é {pt,en}; expandir o modelo de dados é um passo separado.)
 */
export const ADMIN_LOCALES = [
  { code: "pt", short: "PT", name: "Português" },
  { code: "en", short: "EN", name: "English" },
] as const;

export type AdminLocale = (typeof ADMIN_LOCALES)[number]["code"];

/**
 * Idioma ativo do formulário. Quando presente (dentro do modal), os campos
 * Bilingual mostram só esse idioma. Ausente (null) → fallback de 2 colunas.
 */
const AdminLangContext = createContext<{
  locale: AdminLocale;
  setLocale: (l: AdminLocale) => void;
} | null>(null);

export function AdminLangProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<AdminLocale>("pt");
  return (
    <AdminLangContext.Provider value={{ locale, setLocale }}>
      {children}
    </AdminLangContext.Provider>
  );
}

export function useAdminLang() {
  return useContext(AdminLangContext);
}

/** Abas de idioma para o cabeçalho do modal. */
export function AdminLangTabs() {
  const ctx = useAdminLang();
  if (!ctx) return null;
  return (
    <div className="flex rounded-xl border border-foreground/15 bg-background p-0.5">
      {ADMIN_LOCALES.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => ctx.setLocale(l.code)}
          aria-pressed={ctx.locale === l.code}
          title={l.name}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
            ctx.locale === l.code
              ? "bg-foreground text-background"
              : "text-muted hover:text-foreground"
          }`}
        >
          {l.short}
        </button>
      ))}
    </div>
  );
}

export function Field({
  label,
  children,
  helpText,
  required = false,
}: {
  label: string;
  children: React.ReactNode;
  helpText?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold uppercase tracking-widest text-muted">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {helpText && (
        <p className="text-xs text-muted leading-relaxed">{helpText}</p>
      )}
    </div>
  );
}

export function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={inputClass}
    />
  );
}

export function TextArea({
  value,
  onChange,
  rows = 4,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <textarea
      value={value}
      rows={rows}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={`${inputClass} resize-y`}
    />
  );
}

/** Par bilíngue {pt,en}; `multiline` usa textarea. */
export function Bilingual({
  label,
  value,
  onChange,
  multiline = false,
  placeholder,
  helpText,
}: {
  label: string;
  value: { pt: string; en: string };
  onChange: (v: { pt: string; en: string }) => void;
  multiline?: boolean;
  placeholder?: { pt: string; en: string };
  helpText?: string;
}) {
  const Input = multiline ? TextArea : TextInput;
  const ctx = useAdminLang();

  // Dentro do modal (com abas): mostra só o idioma ativo.
  if (ctx) {
    const otherFilled = ADMIN_LOCALES.filter(
      (l) => l.code !== ctx.locale && value[l.code]?.trim(),
    );
    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted">{label}</span>
          {otherFilled.length > 0 && (
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted/60">
              {otherFilled.map((l) => l.short).join(" · ")} ok
            </span>
          )}
        </div>
        <Input
          value={value[ctx.locale]}
          onChange={(v) => onChange({ ...value, [ctx.locale]: v })}
          placeholder={placeholder?.[ctx.locale]}
        />
        {helpText && <p className="text-xs text-muted leading-relaxed">{helpText}</p>}
      </div>
    );
  }

  // Fora do modal (sem abas): mantém as 2 colunas.
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-semibold uppercase tracking-widest text-muted">{label}</span>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-medium uppercase tracking-wider text-muted/70">PT (Português)</span>
          <Input
            value={value.pt}
            onChange={(pt) => onChange({ ...value, pt })}
            placeholder={placeholder?.pt}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-medium uppercase tracking-wider text-muted/70">EN (English)</span>
          <Input
            value={value.en}
            onChange={(en) => onChange({ ...value, en })}
            placeholder={placeholder?.en}
          />
        </div>
      </div>
      {helpText && (
        <p className="text-xs text-muted leading-relaxed">{helpText}</p>
      )}
    </div>
  );
}

/** Lista de strings editada como texto separado por vírgulas. */
export function TagsInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  return (
    <Field label={label}>
      <TextInput
        value={value.join(", ")}
        placeholder={placeholder ?? "Separe por vírgulas"}
        onChange={(raw) =>
          onChange(
            raw
              .split(",")
              .map((s) => s.trim())
              .filter((s) => s !== ""),
          )
        }
      />
    </Field>
  );
}

/**
 * Campo de imagem: envia o arquivo via upload.php (uploadImage) e guarda o
 * caminho retornado, com preview. O caminho também pode ser editado/colado à mão
 * (ex.: imagens versionadas em /public que não passam pelo upload).
 */
export function ImageField({
  label,
  value,
  onChange,
  helpText,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  helpText?: string;
}) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setErr(null);
    try {
      const path = await uploadImage(file);
      onChange(path);
    } catch (e2) {
      setErr(e2 instanceof ApiError ? e2.message : "Falha no upload.");
    } finally {
      setBusy(false);
      e.target.value = ""; // permite reenviar o mesmo arquivo
    }
  }

  return (
    <Field label={label} helpText={helpText}>
      <div className="flex flex-col gap-3">
        <TextInput value={value} onChange={onChange} placeholder="/uploads/image.webp ou https://example.com/image.jpg" />
        <div className="flex items-center gap-3">
          <label className="cursor-pointer rounded-xl border border-foreground/15 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5">
            {busy ? "Enviando…" : "Enviar imagem"}
            <input type="file" accept="image/*" className="hidden" onChange={onFile} disabled={busy} />
          </label>
          {value && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={value}
              alt="prévia"
              className="h-16 w-24 rounded-lg border border-foreground/10 object-cover"
            />
          )}
        </div>
        {err && <span className="text-sm text-red-500">{err}</span>}
      </div>
    </Field>
  );
}

export function Select({
  value,
  onChange,
  options,
}: {
  value: number;
  onChange: (v: number) => void;
  options: number[] | { value: number; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className={inputClass}
    >
      {options.map((o) => {
        const optionValue = typeof o === 'number' ? o : o.value;
        const optionLabel = typeof o === 'number' ? o.toString() : o.label;
        return (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
          </option>
        );
      })}
    </select>
  );
}

export function Checkbox({
  label,
  checked,
  onChange,
  helpText,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  helpText?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="flex cursor-pointer items-center gap-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 accent-foreground"
        />
        <span className="text-sm text-foreground">{label}</span>
      </label>
      {helpText && (
        <p className="text-xs text-muted leading-relaxed ml-7">{helpText}</p>
      )}
    </div>
  );
}
