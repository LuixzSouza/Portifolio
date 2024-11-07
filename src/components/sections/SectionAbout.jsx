
// Componentes
import { LayoutStart } from "@/components/layout/LayoutStart";
import {SMyHistory} from "@/components/sections/SMyHistory"

export function SectionAbout() {
    return (
        <>
            <LayoutStart heading1={"SOBRE"} bg={"bg-about"} />
            <SMyHistory/>
        </>
    )
}