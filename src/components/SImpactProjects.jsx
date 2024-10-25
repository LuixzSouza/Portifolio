import { Paragraph } from '@/components/Paragraph';
import { Heading } from '@/components/Heading';
import { ContainerGrid } from "@/components/ContainerGrid"

export function CreateImpactProjects() {
    return (
        <section className='relative z-10 bg-white w-full h-screen flex flex-col items-center justify-center overflow-hidden'>
            <ContainerGrid className={"flex flex-col items-center justify-center text-center"} >
                <Paragraph size='litlleSmall' color='black'>TRANSDORMANDO IDEIAS EM SOLUÇÕES DIGITAIS</Paragraph>
                <Heading as='h2' size='medium'  >Transformo cada projeto em uma solução exclusiva, onde inovação e estratégia se conectam para gerar impacto duradouro.</Heading>
            </ContainerGrid>
            <div className='absolute top-0 left-0 w-full h-screen' >
                <div className='relative w-screen h-screen' >
                    <div className='absolute w-full max-w-330 h-330 left-20 top-0 bg-red-500' ></div>
                    <div className='absolute w-full max-w-400 h-330 left-2/4 top-16 bg-red-400' ></div>
                    <div className='absolute w-full max-w-194 h-370 right-0 top-56 bg-red-300' ></div>
                    <div className='absolute w-full max-w-600 h-480 bottom-28 left-0 bg-red-600' ></div>
                    <div className='absolute w-full max-w-360 h-450 bottom-0 left-1/3 bg-red-700' ></div>
                    <div className='absolute w-full max-w-400 h-485 bottom-28 right-28 bg-red-800' ></div>
                </div>
            </div>
        </section>
    )
}

//Transformando Ideias em Soluções Digitais

//Cada projeto é uma chance de criar algo único e impactante. Combinando inovação e performance,
// desenvolvo soluções personalizadas que fazem a diferença e entregam resultados reais.