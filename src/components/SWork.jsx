import { ContainerGrid } from "@/components/ContainerGrid";
import { Heading } from "@/components/Heading";
import { Slider } from "@/components/Slider";

export function SectionWork() {
    return (
        // Importante lembrar se tiver overflow hidden a animação pode vir a não acontecer
        <section className="relative z-30 bg-white w-full h-full" >
            <ContainerGrid className={"relative flex flex-col items-center justify-center"} >
                <div className="sticky top-0 w-full h-screen pb-16 flex items-center justify-center overflow-hidden" >
                    <div className="flex flex-col items-start justify-center" >
                        <span>selecione</span>
                        <Heading as="h2" size="xlarge" color="black" lineHeight="none" >WORK</Heading>
                    </div>
                </div>
                <div className="sticky top-0 w-full h-screen flex items-center justify-center gap-10 overflow-hidden" >
                    <Slider/>
                </div>
            </ContainerGrid>
        </section>
    )
}