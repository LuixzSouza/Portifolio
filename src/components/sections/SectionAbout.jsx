
// Componentes
import { LayoutStart } from "@/components/layout/LayoutStart";
import {SMyHistory} from "@/components/sections/SMyHistory"

export function SectionAbout() {
    return (
        <>
            <LayoutStart heading1={"SOBRE"} bg={"bg-about"} wordFixed={"Jornada"} wordsEfect={["Experiência.", "Crescimento.", "Paixão."]} textRigth={"paixão em cada linha de código."}/>
            <SMyHistory/>
        </>
    )
}