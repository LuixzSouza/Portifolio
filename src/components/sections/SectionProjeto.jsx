// Componentes
import { LayoutStart } from "@/components/layout/LayoutStart";
import { SProjetosRetangle } from '@/components/sections/SProjetosRetangle'

export function SectionProjeto() {
    return (
        <>
            <LayoutStart heading1={"PROJETOS"} bg={"bg-projetos"} textRigth={"Projetos, Desafios, funcionalidade."} colorWork={"#F96FFB"}/>
            <SProjetosRetangle/>
        </>
    )
}