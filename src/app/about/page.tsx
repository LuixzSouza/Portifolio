// Next
import type { Metadata } from "next";

// Componentes
import { HeaderHome } from "@/components/headers/HeaderHome";
import { SectionAbout } from "@/components/sections/SectionAbout"

export const metadata: Metadata = {
  title: "About",
  description: "Sobre O Luiz",
};


export default function About() {
    return (
        <>
            <HeaderHome/>
            <SectionAbout/>
        </>
    )
}