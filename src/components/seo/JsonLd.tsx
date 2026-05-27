import { SITE, localizedPath } from "@/lib/seo";
import type { Lang } from "@/lib/locales";

/** Injeta um bloco de dados estruturados (schema.org) na página. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface Crumb {
  name: string;
  path: string;
}

/**
 * BreadcrumbList sempre iniciando em "Início" (home). Quando `locale` é
 * informado, cada `item` recebe o prefixo de idioma (ex.: /en/work).
 */
export function Breadcrumbs({ items, locale }: { items: Crumb[]; locale?: Lang }) {
  const all: Crumb[] = [{ name: "Início", path: "/" }, ...items];
  const itemUrl = (path: string) =>
    locale
      ? `${SITE.url}${localizedPath(path, locale)}`
      : `${SITE.url}${path === "/" ? "" : path}`;
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: itemUrl(c.path),
    })),
  };
  return <JsonLd data={data} />;
}
