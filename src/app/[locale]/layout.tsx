import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { LanguageProvider } from "@/components/ds/LanguageProvider";
import { LocaleFlash } from "@/components/ds/LocaleFlash";
import { TransitionProvider } from "@/components/ds/TransitionProvider";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SkipLink } from "@/components/layout/SkipLink";
import { Preloader } from "@/components/layout/Preloader";
import { PageTransition } from "@/components/layout/PageTransition";
import { LOCALE_CODES, isLocale, localeMeta } from "@/lib/locales";

/** Pré-renderiza um caminho estático por idioma (/pt, /en, /es…). */
export function generateStaticParams() {
  return LOCALE_CODES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const meta = localeMeta(locale);

  // Ajusta lang/dir antes da primeira pintura do subtree localizado (evita flash
  // de direção errada no RTL). O valor é fixo por página gerada estaticamente.
  const langScript =
    `document.documentElement.lang=${JSON.stringify(meta.html)};` +
    `document.documentElement.dir=${JSON.stringify(meta.dir)};`;

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: langScript }} />
      <LanguageProvider initialLang={locale}>
        <TransitionProvider>
          <Preloader />
          <LocaleFlash />
          <PageTransition />
          <SkipLink />
          <SiteHeader />
          {children}
        </TransitionProvider>
      </LanguageProvider>
    </>
  );
}
