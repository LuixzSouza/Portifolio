// Componentes
import { Slider } from "@/components/sliders/Slider";
import { Heading } from "@/components/typrography/Heading";
import { ContainerGrid } from "@/components/layout/ContainerGrid";

export function SectionWork() {
    return (
        // Importante lembrar se tiver overflow hidden a animação pode vir a não acontecer
        <section className="relative z-30 bg-black w-full h-full py-16 md:py-0" >
            <div className={"relative flex flex-col items-center justify-center"} >
                <div className="sticky top-0 w-full h-auto pb-16 flex flex-col items-center justify-center overflow-hidden md:h-screen" >
                    <ContainerGrid className={"flex flex-col gap-16 md:gap-0"} >
                        <div className="flex flex-col items-start justify-center my-1" >
                            <Heading as="h2" size="xlarge" color="white" lineHeight="none" >PROJETOS</Heading>
                        </div>
                        <div className="flex h-auto md:hidden" >
                            <Slider/>
                        </div>
                    </ContainerGrid>
                </div>
                <ContainerGrid className={"hidden md:flex"} >
                    <Slider/>
                </ContainerGrid>
            </div>
        </section>
    )
}