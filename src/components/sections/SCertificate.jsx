import { ContainerGrid } from "../layout/ContainerGrid";
import { SlideCertificate } from "@/components/sliders/SlideCertificate"
import { UpTextEffect } from "@/components/animations/UpTextEffect"

export function SCertificate() {
    return(
        <section>
            <ContainerGrid className={"flex flex-col gap-9 py-12 md:py-32 border-b border-white/30"} >
                <UpTextEffect heading={"h2"} size={"medium"} cor={"white"} text = {"CERTIFICADOS"} />
                <SlideCertificate/>
            </ContainerGrid>
        </section>
    )
}