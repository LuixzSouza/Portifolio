// Next
import type { Metadata } from "next";

// Componentes
import { HeaderHome } from "@/components/headers/HeaderHome";
import { LayoutStart } from "@/components/layout/LayoutStart";

export const metadata: Metadata = {
  title: "About",
  description: "Sobre O Luiz",
};


export default function About() {
    return (
        <>
            <HeaderHome/>
            <LayoutStart heading1={"SOBRE"} />
        </>
    )
}