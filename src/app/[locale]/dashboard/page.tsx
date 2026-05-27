import { SectionFooter } from "@/components/sections/Footer";
import { Breadcrumbs } from "@/components/seo/JsonLd";
import { Container } from "@/components/ds/Container";
import { Section } from "@/components/ds/Section";
import { Heading } from "@/components/ds/Heading";
import { Text } from "@/components/ds/Text";
import type { Lang } from "@/lib/locales";

export default async function Dashboard({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <>
      <Breadcrumbs items={[
        { name: "Dashboard", path: "/dashboard" }
      ]} locale={locale as Lang} />
      <main id="conteudo">
        <Section className="min-h-screen py-16">
          <Container>
            <div className="text-center">
              <Heading size="display-lg" className="mb-4">
                Dashboard em Desenvolvimento
              </Heading>
              <Text size="lg" tone="muted">
                O dashboard avançado está sendo finalizado. Em breve estará disponível com
                todas as funcionalidades de análise de performance, otimização IA e métricas detalhadas.
              </Text>
            </div>
          </Container>
        </Section>
      </main>
      <SectionFooter />
    </>
  );
}