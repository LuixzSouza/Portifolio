import { Suspense } from "react";
import type { Metadata } from "next";
import { ProjectDetail } from "@/components/sections/ProjectDetail";
import { SectionFooter } from "@/components/sections/Footer";
import { pageMetadata } from "@/lib/seo";
import type { Lang } from "@/lib/locales";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    title: "Projeto | Luiz Souza",
    description:
      "Detalhes de um projeto desenvolvido por Luiz Antônio de Souza — tecnologias, contexto e link para ver ao vivo.",
    path: "/project",
    locale: locale as Lang,
  });
}

export default function ProjectPage() {
  return (
    <>
      <main id="conteudo">
        <Suspense fallback={null}>
          <ProjectDetail />
        </Suspense>
      </main>
      <SectionFooter />
    </>
  );
}
