/**
 * Screenshot ao vivo de um site via mShots (WordPress.com) — grátis, sem chave e
 * sem limite diário. A primeira chamada devolve um placeholder enquanto gera; ao
 * recarregar já vem o print real. Usado para revelar o site ao passar o mouse.
 *
 * ⚠️ mShots EXIGE um header Referer (senão 403). O <img> que consome esta URL
 * precisa de referrerPolicy="origin" para garantir o envio do Referer mesmo que
 * o documento tenha uma política mais restritiva. (thum.io foi descartado: o tier
 * grátis virou pago — "Image not authorized".)
 */
export function screenshotUrl(siteUrl: string, width = 1200): string {
  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(siteUrl)}?w=${width}`;
}
