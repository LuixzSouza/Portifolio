'use client'

// Componentes
import { ContainerGrid } from "@/components/layout/ContainerGrid";
import { Heading } from "@/components/typrography/Heading";
import { Paragraph } from "@/components/typrography/Paragraph";
import { TypingEffect } from "@/components/animations/TypingEffect";
import { LinkCustom } from "@/components/ui/LinkCustom"
import { useState, useEffect } from 'react';

export function LayoutStart({heading1, wordFixed, wordsEfect = [], textRigth, bg}) {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    
    useEffect(() => {
        const year = new Date().getFullYear();
        setCurrentYear(year);
    }, []);

    return (
        <section className={`w-full h-screen ${bg} bg-cover bg-center`} >
            <ContainerGrid>
                <div className='h-full grid grid-cols-3 grid-rows-3 pb-32 justify-between items-center' style={{
                        gridTemplateColumns: 'auto 1fr auto', // Ajusta primeiro e último ao conteúdo, o meio ocupa o espaço restante
                        gridTemplateRows: 'auto auto',         // Linhas se ajustam ao conteúdo
                    }}>
                    <div className='relative w-full flex items-center justify-center col-start-1 col-end-3 row-start-1 row-end-1 text-center' >
                        <Heading as="h1" size="xlarge" color="white" >{heading1}</Heading>
                    </div>
                    <div className='relative flex items-start justify-between col-start-1 col-end-3 row-start-2 row-end-2' >
                        <div className='relative z-30 flex flex-col items-start justify-start w-full' >
                            <Heading as='h2' size='medium' color='white' > {wordFixed} </Heading>
                            <TypingEffect words={wordsEfect} />
                        </div>
                        <div className='flex items-end justify-start text-right pt-10'>
                            <Paragraph size='small' color='white' max={'20.875rem'} className={"uppercase"} >{textRigth}</Paragraph>
                        </div>
                    </div>
                    <div className='flex items-center justify-between col-start-1 col-end-4 row-span-3 mt-24' >
                        <div className='w-full flex items-center justify-start gap-8' >
                            <LinkCustom color={'white'} link={'https://www.linkedin.com/in/luiz-antonio-souza-5000a226b/'} img={"image/icon-linkedin.svg"} nomeimg={"linkedin"} >LINKEDIN</LinkCustom>
                            <LinkCustom color={'white'} link={'https://github.com/Luixz157'}  img={"image/icon-github.svg"} nomeimg={"github"}>GITHUB</LinkCustom>
                            <LinkCustom color={'white'} link={'https://www.instagram.com/luizantonio.souza_/?next=%2F'} img={"image/icon-instagram.svg"} nomeimg={"instagram"}>INSTAGRAM</LinkCustom>
                        </div>
                        <div className='w-full flex items-center justify-center' > 
                            <span className='text-white font-roobert text-lg leading-5' >— DISPONÍVEL PARA TRABALHO —</span>
                        </div>
                        <div className='w-full flex items-center justify-end' >
                            <span className='text-white font-roobert text-lg leading-5' >BRASIL - 2021/{currentYear} -</span>
                        </div>
                    </div>
                </div>
            </ContainerGrid>
        </section>
    )
}