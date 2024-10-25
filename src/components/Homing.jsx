import Image from 'next/image'

// Components
import {HeaderHome} from '@/components/HeaderHome';
import {Paragraph} from '@/components/Paragraph';
import { ContainerGrid } from '@/components/ContainerGrid';
import {TypingEffect} from '@/components/TypingEffect';
import {LinkCustom} from '@/components/LinkCustom';
import {Heading} from '@/components/Heading';

export function Homing() {
    return (
        <section className='relative w-screen h-full bg-black' >
            <HeaderHome/>
            <ContainerGrid className={"relative overflow-hidden"} >
                <div className='grid grid-cols-3 grid-rows-3 pb-16' style={{
                        gridTemplateColumns: 'auto 1fr auto', // Ajusta primeiro e último ao conteúdo, o meio ocupa o espaço restante
                        gridTemplateRows: 'auto auto',         // Linhas se ajustam ao conteúdo
                    }}>
                    <div className='relative flex items-center justify-center col-start-1 col-end-3 row-start-1 row-end-1 ' >
                        <TypingEffect />
                    </div>
                    <div className='relative flex items-center justify-between col-start-1 col-end-3 row-start-2 row-end-2' >
                        <div className='flex items-start justify-start' >
                            <Heading as='h2' size='medium' color='white' > Dev.Jr </Heading>
                        </div>
                        <div className='absolute z-10 rounded-full overflow-hidden -top-3/4 left-2/4 transform -translate-x-1/2 -translate-y-1/2 max-w-full h-auto' >
                            <Image src={'/image/MySelf.jpg'} width={400} height={440} alt='Luiz' />
                        </div>
                        <div className='flex items-end justify-end '>
                            <Paragraph size='small' color='white' max={'11.875rem'} >CRIANDO PROJETOS IMPRESSIONANTES</Paragraph>
                        </div>
                    </div>
                    <div className='flex items-center justify-between col-start-1 col-end-4 row-span-3 mt-24' >
                        <div className='w-full flex items-center justify-start gap-8' >
                            <LinkCustom color={'white'} link={'https://www.linkedin.com/in/luiz-antonio-souza-5000a226b/'} >LINKEDIN</LinkCustom>
                            <LinkCustom color={'white'} link={'https://github.com/Luixz157'} >GITHUB</LinkCustom>
                            <LinkCustom color={'white'} link={'https://www.instagram.com/luizantonio.souza_/?next=%2F'} >INSTAGRAM</LinkCustom>
                        </div>
                        <div className='w-full flex items-center justify-center' > 
                            <span className='text-white font-roobert text-lg leading-5' >— DISPONÍVEL PARA TRABALHO —</span>
                        </div>
                        <div className='w-full flex items-center justify-end' >
                            <span className='text-white font-roobert text-lg leading-5' >— Baseado no Brasil 2019 — 2024 —</span>
                        </div>
                    </div>
                </div>
            </ContainerGrid>
        </section>
    )
}