import { HeaderHome } from "@/components/headers/HeaderHome";
import { SectionProjeto } from "@/components/sections/SectionProjeto"
import { MenuDefaultOpen } from "@/components/menus/MenuDefaultOpen"
import type { Metadata } from "next";
import { SectionFooter } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Projetos | Luiz Souza",
  description: "Projetos Desenvolvidos por Luiz Antônio de Souza",
  openGraph: {
    images: ["https://luixzsouza.com.br/image/imgShareCover.png"],
    title: "Portifolio",
    description: "Luiz Antônio de Souza",
    type: "profile",
  },
};

export default function Work() {
    return (
        <>
            <MenuDefaultOpen/>
            <HeaderHome />
            <SectionProjeto/>
            <SectionFooter/>
        </>
    )
}