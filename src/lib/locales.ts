/**
 * Fonte única de verdade dos idiomas do site. Adicionar um idioma = adicionar
 * um item aqui (o toggle, as abas do painel, o roteamento e os schemas se
 * adaptam a partir desta lista).
 *
 * - `code`: usado nas URLs (/en, /es…) e como chave em LocalizedText.
 * - `html`: valor da tag <html lang> (BCP-47).
 * - `og`:   open-graph locale.
 * - `dir`:  direção do layout (rtl p/ árabe).
 */
export interface LocaleMeta {
  code: string;
  native: string;
  label: string;
  flag: string;
  dir: "ltr" | "rtl";
  html: string;
  og: string;
}

export const LOCALES = [
  { code: "pt", native: "Português", label: "Portuguese", flag: "🇧🇷", dir: "ltr", html: "pt-BR", og: "pt_BR" },
  { code: "en", native: "English", label: "English", flag: "🇺🇸", dir: "ltr", html: "en", og: "en_US" },
  { code: "es", native: "Español", label: "Spanish", flag: "🇪🇸", dir: "ltr", html: "es", og: "es_ES" },
  { code: "fr", native: "Français", label: "French", flag: "🇫🇷", dir: "ltr", html: "fr", og: "fr_FR" },
  { code: "de", native: "Deutsch", label: "German", flag: "🇩🇪", dir: "ltr", html: "de", og: "de_DE" },
  { code: "it", native: "Italiano", label: "Italian", flag: "🇮🇹", dir: "ltr", html: "it", og: "it_IT" },
  { code: "zh", native: "中文", label: "Chinese", flag: "🇨🇳", dir: "ltr", html: "zh-CN", og: "zh_CN" },
  { code: "ja", native: "日本語", label: "Japanese", flag: "🇯🇵", dir: "ltr", html: "ja", og: "ja_JP" },
  { code: "ru", native: "Русский", label: "Russian", flag: "🇷🇺", dir: "ltr", html: "ru", og: "ru_RU" },
  { code: "ar", native: "العربية", label: "Arabic", flag: "🇸🇦", dir: "rtl", html: "ar", og: "ar_AR" },
  { code: "hi", native: "हिन्दी", label: "Hindi", flag: "🇮🇳", dir: "ltr", html: "hi", og: "hi_IN" },
  { code: "ko", native: "한국어", label: "Korean", flag: "🇰🇷", dir: "ltr", html: "ko", og: "ko_KR" },
  { code: "id", native: "Bahasa Indonesia", label: "Indonesian", flag: "🇮🇩", dir: "ltr", html: "id", og: "id_ID" },
] as const satisfies readonly LocaleMeta[];

export type Lang = (typeof LOCALES)[number]["code"];

export const DEFAULT_LOCALE: Lang = "pt";

/** Ordem de fallback quando um idioma não tem tradução. */
export const FALLBACK_CHAIN: Lang[] = ["en", "pt"];

/**
 * Idiomas cobertos pelo CMS (backend PHP é bilíngue). Os demais existem só no
 * conteúdo estático (@/data), que tem os 13 idiomas. Por isso os componentes só
 * substituem o estático pelos dados da API quando o idioma atual é coberto —
 * senão um /fr, /de… cairia para pt/en ao carregar a API. Ver cmsCoversLocale.
 */
export const CMS_LOCALES: Lang[] = ["pt", "en"];

/** Se o CMS (API) tem tradução para o idioma; senão, manter o estático rico. */
export function cmsCoversLocale(lang: Lang): boolean {
  return CMS_LOCALES.includes(lang);
}

export const LOCALE_CODES: Lang[] = LOCALES.map((l) => l.code);

const LOCALE_BY_CODE = new Map<string, LocaleMeta>(LOCALES.map((l) => [l.code, l]));

export function isLocale(value: string): value is Lang {
  return LOCALE_BY_CODE.has(value);
}

export function localeMeta(code: Lang): LocaleMeta {
  return LOCALE_BY_CODE.get(code) ?? LOCALES[0];
}

/** Locale embutido no caminho atual (1º segmento), ou DEFAULT_LOCALE. */
export function localeFromPath(pathname: string): Lang {
  const seg = pathname.split("/")[1] ?? "";
  return isLocale(seg) ? seg : DEFAULT_LOCALE;
}

/**
 * Prefixa um href interno com o idioma. Ignora externos/âncoras/mailto, a área
 * /admin (não localizada) e hrefs que já têm um locale. Preserva query/hash.
 *   ("/work","en") → "/en/work"  ·  ("/","pt") → "/pt"
 */
export function localizeHref(href: string, locale: Lang): string {
  if (!href.startsWith("/")) return href; // externo, âncora, mailto, relativo
  if (href.startsWith("/admin")) return href; // não localizado
  if (href === "/") return `/${locale}`;
  // Arquivo estático (ex.: /algo.pdf, /img/x.png) não é rota → não prefixa.
  const pathPart = href.split(/[?#]/)[0];
  if (/\.[a-z0-9]+$/i.test(pathPart)) return href;
  const seg = href.split("/")[1] ?? "";
  if (isLocale(seg)) return href; // já prefixado
  return `/${locale}${href}`;
}
