import { ContainerGrid } from "@/components/ContainerGrid";
import { Heading } from "@/components/Heading"
import { RetangleProjects } from "@/components/ContentProject"

export function SectionWork() {
    return (
        // Importante lembrar se tiver overflow hidden a animação pode vir a não acontecer
        <section className="relative z-30 bg-white w-full h-full overflow-hidden" >
            <ContainerGrid className={"relative flex flex-col items-center justify-center"} >
                <div className="w-screen h-full pb-16 flex items-center justify-center" >
                    <div className="flex flex-col items-start justify-center" >
                        <span>selecione</span>
                        <Heading as="h2" size="xlarge" color="black" lineHeight="none" >WORK</Heading>
                    </div>
                </div>
                <div className="relative w-full flex items-center justify-center gap-10" >
                    <RetangleProjects nome={"Projeto"} img={"p-codeboost.png"}/>
                    <RetangleProjects nome={"Projeto"} img={"p-formula-idioma.png"}/>
                </div>
            </ContainerGrid>
        </section>
    )
}