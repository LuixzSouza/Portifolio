import type { Metadata } from "next";
import { DEFAULT_LOCALE, LOCALE_CODES } from "@/lib/locales";

export const metadata: Metadata = {
  // A raiz é só um redirecionador; não deve competir por indexação.
  alternates: { canonical: `/${DEFAULT_LOCALE}` },
  robots: { index: false, follow: true },
};

/**
 * Como o export é estático (sem redirect de servidor), a raiz "/" escolhe o
 * idioma no cliente: preferência salva → idioma do navegador → DEFAULT_LOCALE,
 * e troca a URL para /{idioma}. <noscript> garante um destino sem JS.
 */
export default function RootRedirect() {
  const codes = JSON.stringify(LOCALE_CODES);
  const script =
    `(function(){try{` +
    `var codes=${codes};var def=${JSON.stringify(DEFAULT_LOCALE)};` +
    `var s=localStorage.getItem('lang');` +
    `var p=(navigator.language||def).toLowerCase().split('-')[0];` +
    `var d=codes.indexOf(s)>=0?s:(codes.indexOf(p)>=0?p:def);` +
    `location.replace('/'+d+location.search+location.hash);` +
    `}catch(e){location.replace('/'+${JSON.stringify(DEFAULT_LOCALE)});}})();`;

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <noscript>
        <meta httpEquiv="refresh" content={`0; url=/${DEFAULT_LOCALE}`} />
      </noscript>
    </>
  );
}
