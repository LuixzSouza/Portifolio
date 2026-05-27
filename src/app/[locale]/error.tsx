"use client";

import { useEffect } from "react";
import { Container } from "@/components/ds/Container";
import { Heading } from "@/components/ds/Heading";
import { Text } from "@/components/ds/Text";
import { Eyebrow } from "@/components/ds/Eyebrow";
import { Button } from "@/components/ds/Button";
import { Reveal } from "@/components/ds/Reveal";
import { useTranslations } from "@/content/useTranslations";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="conteudo" className="flex min-h-svh items-center pt-28 pb-20 md:pt-36">
      <Container>
        <Reveal className="flex flex-col items-start gap-7">
          <span
            aria-hidden
            className="select-none font-roobert font-medium leading-none tracking-tight text-foreground/10 text-display-xl"
          >
            500
          </span>
          <Eyebrow>{t.error.eyebrow}</Eyebrow>
          <Heading size="display-md" className="max-w-[16ch]">
            {t.error.title}
          </Heading>
          <Text tone="muted" measure size="lg">
            {t.error.text}
          </Text>
          <div className="mt-2 flex flex-wrap gap-3">
            <Button onClick={reset} variant="solid" size="lg">
              {t.error.retry}
            </Button>
            <Button href="/" variant="outline" size="lg" withArrow>
              {t.error.home}
            </Button>
          </div>
        </Reveal>
      </Container>
    </main>
  );
}
