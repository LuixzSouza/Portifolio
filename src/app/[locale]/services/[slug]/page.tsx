import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { SectionFooter } from "@/components/sections/Footer";
import { JsonLd, Breadcrumbs } from "@/components/seo/JsonLd";
import { getService, serviceSlugs } from "@/data/services";
import { pickText } from "@/lib/i18n";
import { pageMetadata, SITE, localizedPath } from "@/lib/seo";
import type { Lang } from "@/lib/locales";

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const lang = locale as Lang;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: pickText(service.metaTitle, lang),
    description: pickText(service.metaDescription, lang),
    path: `/services/${slug}`,
    locale: lang,
    image: service.image,
    imageAlt: pickText(service.title, lang),
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const lang = locale as Lang;
  const service = getService(slug);
  if (!service) notFound();

  const url = `${SITE.url}${localizedPath(`/services/${slug}`, lang)}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: pickText(service.title, lang),
    serviceType: pickText(service.title, lang),
    description: pickText(service.intro, lang),
    url,
    image: `${SITE.url}${service.image}`,
    areaServed: { "@type": "Country", name: "Brazil" },
    availableLanguage: ["pt-BR", "en"],
    provider: {
      "@type": "Person",
      name: SITE.fullName,
      url: SITE.url,
      jobTitle: SITE.jobTitle,
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <Breadcrumbs items={[{ name: pickText(service.title, lang), path: `/services/${slug}` }]} locale={lang} />
      <main id="conteudo">
        <ServiceDetail slug={slug} />
      </main>
      <SectionFooter />
    </>
  );
}
