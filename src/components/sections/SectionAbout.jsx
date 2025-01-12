
// Componentes
import { LayoutStart } from "@/components/layout/LayoutStart";
import {SMyHistory} from "@/components/sections/SMyHistory"
import { Svideo } from "@/components/sections/Svideo"
import { SCertificate } from "@/components/sections/SCertificate"

export function SectionAbout() {
    return (
        <>
            <LayoutStart heading1={"SOBRE"} bg={"bg-about"} wordFixed={"Jornada"} wordsEfect={["Experiência.", "Crescimento.", "Paixão."]} textRigth={"paixão em cada linha de código."}/>
            <SMyHistory/>
            <Svideo/>
            <SCertificate/>
        </>
    )
}