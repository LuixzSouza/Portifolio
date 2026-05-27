import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CertificateDetail } from "@/components/sections/CertificateDetail";
import { SectionFooter } from "@/components/sections/Footer";
import { JsonLd, Breadcrumbs } from "@/components/seo/JsonLd";
import { getCertificate, certificateSlugs } from "@/data/certificates";
import { pickText } from "@/lib/i18n";
import { pageMetadata, SITE, localizedPath } from "@/lib/seo";
import type { Lang } from "@/lib/locales";

export function generateStaticParams() {
  return certificateSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const lang = locale as Lang;
  const cert = getCertificate(slug);
  if (!cert) return {};
  return pageMetadata({
    title: `${cert.course} — ${cert.issuer}`,
    description: pickText(cert.description, lang),
    path: `/certificates/${slug}`,
    locale: lang,
    image: cert.image,
    imageAlt: cert.course,
  });
}

export default async function CertificatePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const lang = locale as Lang;
  const cert = getCertificate(slug);
  if (!cert) notFound();

  const url = `${SITE.url}${localizedPath(`/certificates/${slug}`, lang)}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalCredential",
    "@id": `${url}#credential`,
    name: cert.course,
    description: pickText(cert.description, lang),
    url,
    image: `${SITE.url}${cert.image}`,
    credentialCategory: "certificate",
    competencyRequired: cert.skills,
    dateCreated: cert.date,
    recognizedBy: { "@type": "Organization", name: cert.issuer },
    about: {
      "@type": "Person",
      name: SITE.fullName,
      url: SITE.url,
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <Breadcrumbs
        items={[
          { name: "Sobre", path: "/about" },
          { name: cert.course, path: `/certificates/${slug}` },
        ]}
        locale={lang}
      />
      <main id="conteudo">
        <CertificateDetail slug={slug} />
      </main>
      <SectionFooter />
    </>
  );
}
