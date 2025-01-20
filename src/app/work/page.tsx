import { HeaderHome } from "@/components/headers/HeaderHome";
import { SectionProjeto } from "@/components/sections/SectionProjeto"
import { MenuDefaultOpen } from "@/components/menus/MenuDefaultOpen"
import type { Metadata } from "next";
import { SectionFooter } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Trabalho",
  description: "Trabalho do Luiz Antönio de Souza",
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