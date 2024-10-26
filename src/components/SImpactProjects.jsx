import { Paragraph } from '@/components/Paragraph';
import { Heading } from '@/components/Heading';
import { ContainerGrid } from "@/components/ContainerGrid";
import { Tecnology } from "@/components/Tecnology";

export function CreateImpactProjects() {
    return (
        <section className="relative z-30 bg-white w-full h-screen flex flex-col items-center justify-center overflow-hidden">
            <ContainerGrid className="flex flex-col items-center justify-center text-center">
                <Paragraph size="litlleSmall" color="black">
                    TRANSDORMANDO IDEIAS EM SOLUÇÕES DIGITAIS
                </Paragraph>
                <Heading as="h2" size="medium">
                    Transformo cada projeto em uma solução exclusiva, onde inovação e estratégia se conectam para gerar impacto duradouro.
                </Heading>
            </ContainerGrid>
            <div className="absolute top-0 left-0 w-full h-screen">
                <div className="relative w-screen h-screen">
                    <Tecnology max={330} height={330} left={0} top={0} />
                    <Tecnology max={330} height={330} left={50} top={0} />
                    <Tecnology max={330} height={330} right={0} top={0} />
                    <Tecnology max={330} height={330} bottom={0} left={0} />
                    <Tecnology max={330} height={330} bottom={0} left={50} />
                    <Tecnology max={330} height={330} bottom={0} right={0} />
                </div>
            </div>
        </section>
    );
}


//Transformando Ideias em Soluções Digitais

//Cada projeto é uma chance de criar algo único e impactante. Combinando inovação e performance,
// desenvolvo soluções personalizadas que fazem a diferença e entregam resultados reais.