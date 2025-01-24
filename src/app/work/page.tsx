import { HeaderHome } from "@/components/headers/HeaderHome";
import { SectionProjeto } from "@/components/sections/SectionProjeto"
import { MenuDefaultOpen } from "@/components/menus/MenuDefaultOpen"
import type { Metadata } from "next";
import { SectionFooter } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Projetos Desenvolvidos por Luiz Souza | Desenvolvedor Front-End",
  description: "Confira os projetos web desenvolvidos por Luiz Antônio de Souza, utilizando tecnologias modernas e eficientes para solucionar problemas do mundo digital.",
  openGraph: {
    images: [
      {
        url: "https://luixzsouza.com.br/image/imgShareCover.png",
        width: 1200,
        height: 630,
        alt: "Capa do portfólio de Luiz Souza mostrando seus projetos.",
      },
    ],
    title: "Projetos de Luiz Souza | Front-End Developer",
    description: "Conheça os projetos criados por Luiz Souza e veja como ele pode ajudar seu negócio com soluções digitais eficientes.",
    url: "https://luixzsouza.com.br/projetos",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projetos de Luiz Souza | Desenvolvedor Front-End",
    description: "Explore o portfólio de projetos de Luiz Souza e descubra como ele pode criar soluções incríveis para a web.",
    images: ["https://luixzsouza.com.br/image/imgShareCover.png"],
  },
};


export default function Work() {
    return (
        <>
            <MenuDefaultOpen/>
            <HeaderHome />
            <SectionProjeto/>
            <SectionFooter bg={"bg-projetos"} />
        </>
    )
}