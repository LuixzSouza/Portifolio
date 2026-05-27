// Next
import type { Metadata } from "next";

// Componentes
import { HeaderHome } from "@/components/headers/HeaderHome";
import { SectionAbout } from "@/components/sections/SectionAbout"
import { MenuDefaultOpen } from "@/components/menus/MenuDefaultOpen"
import { SectionFooter } from "@/components/sections/Footer";
import { SDepoimentos } from "@/components/sections/SDepoimentos"

export const metadata: Metadata = {
  title: "Sobre Luiz Souza | Desenvolvedor Front-End",
  description: "Descubra a trajetória de Luiz Antônio de Souza, um desenvolvedor front-end apaixonado por criar soluções web modernas e impactantes.",
  openGraph: {
    images: [
      {
        url: "https://luixzsouza.com.br/image/imgShareCover.png",
        width: 1200,
        height: 630,
        alt: "Imagem de Luiz Souza, destacando sua experiência como desenvolvedor.",
      },
    ],
    title: "Conheça Luiz Souza | Desenvolvedor Front-End",
    description: "Saiba mais sobre a história e a experiência de Luiz Souza no desenvolvimento de soluções digitais de alta qualidade.",
    url: "https://luixzsouza.com.br/sobre",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sobre Luiz Souza | Desenvolvedor Front-End",
    description: "Explore a trajetória de Luiz Souza e descubra suas habilidades e projetos como desenvolvedor front-end.",
    images: ["https://luixzsouza.com.br/image/imgShareCover.png"],
  },
};



export default function About() {
    return (
        <>
            <MenuDefaultOpen/>
            <HeaderHome/>
            <SectionAbout/>
            <SDepoimentos/>
            <SectionFooter bg={"bg-about"} />
        </>
    )
}