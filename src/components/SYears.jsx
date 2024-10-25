import { ContainerGrid } from "@/components/ContainerGrid";
import { Heading } from "@/components/Heading";
import { Paragraph } from "@/components/Paragraph";

export function SectionYears() {
    return (
        <section className="w-screen h-screen bg-white overflow-hidden" >
            <ContainerGrid className={"grid grid-cols-4 grid-rows-2"} >
                <div className="flex items-center justify-center col-start-1 col-end-5 row-start-1 row-end-1" >
                    <div className="w-20 h-56 bg-red-500" >

                    </div>
                    <div>
                        <Heading as="h2" size="super" color="black" >5</Heading>
                    </div>
                    <div>
                        <Heading as="h3" size="large" color="black" >anos</Heading>
                    </div>
                    <div className="w-8 h-80 bg-red-300" >
                        
                    </div>
                </div>
                <div className="flex items-center justify-center col-start-1 col-end-5 row-start-2 row-end-2 text-center">
                    <Paragraph>Ajudando marcas a prosperar no mundo digital.</Paragraph>
                </div>
            </ContainerGrid>
        </section>
    )
}