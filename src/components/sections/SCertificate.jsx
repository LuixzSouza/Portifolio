import { ContainerGrid } from "../layout/ContainerGrid";
import { SlideCertificate } from "@/components/sliders/SlideCertificate"
import { Heading } from "../typrography/Heading";

export function SCertificate() {
    return(
        <section className="py-12 md:py-28" >
            <ContainerGrid className={"flex flex-col gap-9"} >
                <Heading as="h2" size="medium" color="white">Certificados</Heading>
                <SlideCertificate/>
            </ContainerGrid>
        </section>
    )
}