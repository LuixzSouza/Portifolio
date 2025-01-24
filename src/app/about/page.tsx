// Next
import type { Metadata } from "next";

// Componentes
import { HeaderHome } from "@/components/headers/HeaderHome";
import { SectionAbout } from "@/components/sections/SectionAbout"
import { MenuDefaultOpen } from "@/components/menus/MenuDefaultOpen"
import { SectionFooter } from "@/components/sections/Footer";
import { SDepoimentos } from "@/components/sections/SDepoimentos"

export const metadata: Metadata = {
  title: "Sobre | Luiz Souza",
  description: "Saiba mais sobre quem é o Luiz e Sua historia",
  openGraph: {
    images: ["https://luixzsouza.com.br/image/imgShareCover.png"],
    title: "Portifolio",
    description: "Luiz Antônio de Souza",
    type: "profile",
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