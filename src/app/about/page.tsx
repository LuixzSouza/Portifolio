// Next
import type { Metadata } from "next";

// Componentes
import { HeaderHome } from "@/components/headers/HeaderHome";
import { SectionAbout } from "@/components/sections/SectionAbout"
import { MenuDefaultOpen } from "@/components/menus/MenuDefaultOpen"
import { SectionFooter } from "@/components/sections/Footer";
import { SDepoimentos } from "@/components/sections/SDepoimentos"

export const metadata: Metadata = {
  title: "Sobre",
  description: "Sobre O Luiz",
};


export default function About() {
    return (
        <>
            <MenuDefaultOpen/>
            <HeaderHome/>
            <SectionAbout/>
            <SDepoimentos/>
            <SectionFooter/>
        </>
    )
}