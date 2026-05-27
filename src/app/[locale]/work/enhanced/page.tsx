import { Container } from "@/components/ds/Container";
import { Section } from "@/components/ds/Section";
import { Heading } from "@/components/ds/Heading";
import { Text } from "@/components/ds/Text";
import { Eyebrow } from "@/components/ds/Eyebrow";
import { Reveal } from "@/components/ds/Reveal";
import { SectionFooter } from "@/components/sections/Footer";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/JsonLd";
import { WorkDashboard } from "@/components/sections/WorkDashboard";
import type { Metadata } from "next";
import type { Lang } from "@/lib/locales";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    title: "Projetos Desenvolvidos por Luiz Souza | Portfólio Avançado",
    description:
      "Dashboard completo dos projetos desenvolvidos por Luiz Antônio de Souza, com busca avançada, analytics e métricas detalhadas de desempenho.",
    path: "/work/enhanced",
    locale: locale as Lang,
    ogTitle: "Portfólio Avançado | Luiz Souza Front-End Developer",
    ogDescription:
      "Explore o portfólio completo com funcionalidades avançadas: busca inteligente, analytics em tempo real e dashboard de métricas.",
  });
}

export default async function WorkEnhanced({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <>
      <Breadcrumbs items={[
        { name: "Trabalhos", path: "/work" },
        { name: "Dashboard Avançado", path: "/work/enhanced" }
      ]} locale={locale as Lang} />
      <main id="conteudo">
        <Section className="min-h-screen pt-28 md:pt-36">
          <Container>
            <Reveal className="flex flex-col gap-5">
              <Eyebrow>Portfolio Dashboard</Eyebrow>
              <Heading as="h1" size="display-lg" className="max-w-[16ch]">
                Portfólio{" "}
                <span className="font-serif font-normal italic text-foreground/80">Inteligente</span>
              </Heading>
              <Text tone="muted" size="lg" measure>
                Uma visão completa dos projetos com busca avançada, analytics em tempo real,
                comparação de projetos e métricas detalhadas de desempenho. Esta versão demonstra
                funcionalidades enterprise para análise e gestão de portfólio.
              </Text>
            </Reveal>
          </Container>
        </Section>

        <WorkDashboard />
      </main>
      <SectionFooter />
    </>
  );
}