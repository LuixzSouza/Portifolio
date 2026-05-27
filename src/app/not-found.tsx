"use client";

import { Container } from "@/components/ds/Container";
import { Heading } from "@/components/ds/Heading";
import { Text } from "@/components/ds/Text";
import { Eyebrow } from "@/components/ds/Eyebrow";
import { Button } from "@/components/ds/Button";
import { Reveal } from "@/components/ds/Reveal";
import { useTranslations } from "@/content/useTranslations";
import { LanguageProvider } from "@/components/ds/LanguageProvider";

// 404 catch-all fica fora do segmento /[locale], então traz seu próprio
// LanguageProvider (idioma padrão / detectado no cliente) p/ as traduções.
export default function NotFound() {
  return (
    <LanguageProvider>
      <NotFoundContent />
    </LanguageProvider>
  );
}

function NotFoundContent() {
  const t = useTranslations();

  return (
    <main id="conteudo" className="flex min-h-svh items-center pt-28 pb-20 md:pt-36">
      <Container>
        <Reveal className="flex flex-col items-start gap-7">
          <span
            aria-hidden
            className="select-none font-roobert font-medium leading-none tracking-tight text-foreground/10 text-display-xl"
          >
            404
          </span>
          <Eyebrow>{t.notFound.eyebrow}</Eyebrow>
          <Heading size="display-md" className="max-w-[16ch]">
            {t.notFound.title}
          </Heading>
          <Text tone="muted" measure size="lg">
            {t.notFound.text}
          </Text>
          <div className="mt-2 flex flex-wrap gap-3">
            <Button href="/" variant="solid" size="lg">
              {t.notFound.home}
            </Button>
            <Button href="/work" variant="outline" size="lg" withArrow>
              {t.notFound.work}
            </Button>
          </div>
        </Reveal>
      </Container>
    </main>
  );
}
