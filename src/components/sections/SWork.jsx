// Componentes
import { Slider } from "@/components/sliders/Slider";
import { Heading } from "@/components/typrography/Heading";
import { ContainerGrid } from "@/components/layout/ContainerGrid";

export function SectionWork() {
    return (
        // Importante lembrar se tiver overflow hidden a animação pode vir a não acontecer
        <section className="relative z-30 bg-black w-full h-full" >
            <ContainerGrid className={"relative flex flex-col items-center justify-center"} >
                <div className="sticky top-0 w-full h-screen pb-16 flex items-center justify-center overflow-hidden" >
                    <div className="flex flex-col items-start justify-center" >
                        <span className="text-6xl font-roobert text-white" >selecione</span>
                        <Heading as="h2" size="xlarge" color="white" lineHeight="none" >PROJETO</Heading>
                    </div>
                </div>
                <div className="sticky top-0 w-full h-screen flex items-center justify-center gap-10 overflow-hidden" >
                    <Slider/>
                </div>
            </ContainerGrid>
        </section>
    )
}