// Componentes
import { AboutHero } from "@/components/sections/AboutHero"
import { Story } from "@/components/sections/Story"
import { PersonalGallery } from "@/components/sections/PersonalGallery"
import { VideoStory } from "@/components/sections/VideoStory"
import { Certificates } from "@/components/sections/Certificates"
import { Testimonials } from "@/components/sections/Testimonials"
import type { Metadata } from "next";
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
    title: "Sobre Luiz Souza | Desenvolvedor Front-End",
    description:
      "Descubra a trajetória de Luiz Antônio de Souza, um desenvolvedor front-end apaixonado por criar soluções web modernas e impactantes.",
    path: "/about",
    locale: locale as Lang,
    ogTitle: "Conheça Luiz Souza | Desenvolvedor Front-End",
    ogDescription:
      "Saiba mais sobre a história e a experiência de Luiz Souza no desenvolvimento de soluções digitais de alta qualidade.",
  });
}

export default async function About({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    return (
        <>
            <Breadcrumbs items={[{ name: "Sobre", path: "/about" }]} locale={locale as Lang} />
            <main id="conteudo">
                <AboutHero/>
                <Story/>
                <PersonalGallery/>
                <VideoStory/>
                <Certificates/>
                <Testimonials/>
            </main>
            <SectionFooter/>
        </>
    )
}