import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/ContactForm"
import { SectionFooter } from "@/components/sections/Footer"
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/JsonLd";
import type { Lang } from "@/lib/locales";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    title: "Entre em Contato com Luiz Souza | Desenvolvedor Front-End",
    description:
      "Fale com Luiz Antônio de Souza para contratação, serviços ou parcerias. Especialista em desenvolvimento web e soluções digitais modernas.",
    path: "/contact",
    locale: locale as Lang,
    ogTitle: "Contato com Luiz Souza | Desenvolvedor Front-End",
    ogDescription:
      "Entre em contato com Luiz Souza para discutir projetos ou parcerias na área de desenvolvimento web.",
  });
}

export default async function Contact({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <>
      <Breadcrumbs items={[{ name: "Contato", path: "/contact" }]} locale={locale as Lang} />
      <main id="conteudo">
        <ContactForm/>
      </main>
      <SectionFooter/>
    </>
  );
}
