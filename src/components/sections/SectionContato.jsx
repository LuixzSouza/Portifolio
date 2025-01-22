
// Componentes
import { LayoutStart } from "@/components/layout/LayoutStart";
import { SectionFormulario } from "@/components/sections/SForm";

export function SectionContato() {
    return (
        <>
            <LayoutStart heading1={"CONTATO"} bg={"bg-form"} textRigth={"Sempre disponível para novos desafios"} colorWork={"#4EFC54"}/>
            <SectionFormulario/>
        </>
    )
}