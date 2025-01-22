
// Componentes
import { LayoutStart } from "@/components/layout/LayoutStart";
import {SMyHistory} from "@/components/sections/SMyHistory"
import { Svideo } from "@/components/sections/Svideo"
import { SCertificate } from "@/components/sections/SCertificate"
import { Looping } from "@/components/animations/Looping"

export function SectionAbout() {
    return (
        <>
            <LayoutStart heading1={"SOBRE"} bg={"bg-about"} textRigth={"paixão em cada linha de código."} colorWork={"#F84D50"}/>
            <SMyHistory/>
            <Svideo/>
            <Looping />
            <SCertificate/>
        </>
    )
}