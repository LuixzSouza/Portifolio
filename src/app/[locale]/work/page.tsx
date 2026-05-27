import type { Metadata } from "next";
import { WorkGrid } from "@/components/sections/WorkGrid"
import { SectionFooter } from "@/components/sections/Footer";
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
    title: "Projetos Desenvolvidos por Luiz Souza | Desenvolvedor Front-End",
    description:
      "Confira os projetos web desenvolvidos por Luiz Antônio de Souza, utilizando tecnologias modernas e eficientes para solucionar problemas do mundo digital.",
    path: "/work",
    locale: locale as Lang,
    ogTitle: "Projetos de Luiz Souza | Front-End Developer",
    ogDescription:
      "Conheça os projetos criados por Luiz Souza e veja como ele pode ajudar seu negócio com soluções digitais eficientes.",
  });
}

export default async function Work({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    return (
        <>
            <Breadcrumbs items={[{ name: "Trabalhos", path: "/work" }]} locale={locale as Lang} />
            <main id="conteudo">
                <WorkGrid/>
            </main>
            <SectionFooter />
        </>
    )
}