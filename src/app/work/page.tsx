import { HeaderHome } from "@/components/headers/HeaderHome";
import { SectionProjeto } from "@/components/sections/SectionProjeto"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trabalho",
  description: "Trabalho do Luiz Antönio de Souza",
};

export default function Work() {
    return (
        <>
            <HeaderHome />
            <SectionProjeto />
        </>
    )
}