
// Componentes
import { LayoutStart } from "@/components/layout/LayoutStart";
import { SectionFormulario } from "@/components/sections/SForm";

export function SectionContato() {
    return (
        <>
            <LayoutStart heading1={"CONTATO"} bg={"bg-form"} wordFixed={"Conexão"} wordsEfect={["Desafios.", "Projetos.", "Colaborações."]} textRigth={"Sempre disponível para novos desafios e colaborações."} />
            <SectionFormulario/>
        </>
    )
}