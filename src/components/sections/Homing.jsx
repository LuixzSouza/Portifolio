'use client'

import { useState, useEffect } from 'react';

// Components
import { LinkCustom } from '@/components/ui/LinkCustom';
import { Heading } from '@/components/typrography/Heading';
import { HeaderHome } from '@/components/headers/HeaderHome';
import { Paragraph } from '@/components/typrography/Paragraph';
import { ContainerGrid } from '@/components/layout/ContainerGrid';
import { TypingEffect } from '@/components/animations/TypingEffect';

export function Homing() {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [isDarkMode, setIsDarkMode] = useState(false); // Estado para o tema

    useEffect(() => {
        const year = new Date().getFullYear();
        setCurrentYear(year);
    }, []);

    return (
        <section
            className={`sticky top-0 z-20 bg-cover transition-colors duration-500 
            ${isDarkMode ? 'bg-hero-white' : 'bg-hero'}`}
        >
            <div className='w-full h-screen'>
                <HeaderHome onToggleTheme={setIsDarkMode} isDarkMode={isDarkMode} />
                <ContainerGrid className={"h-full relative overflow-hidden"}>
                    <div
                        className={`h-full grid grid-cols-3 grid-rows-3 pb-32 justify-between items-center ${
                            isDarkMode ? 'text-black' : 'text-white'
                        }`}
                        style={{
                            gridTemplateColumns: 'auto 1fr auto',
                            gridTemplateRows: 'auto auto',
                        }}
                    >
                        <div className='relative w-full flex items-center justify-center col-start-1 col-end-3 row-start-1 row-end-1 '>
                            <div className='w-full flex items-center justify-center text-center'>
                                <Heading
                                    as='h1'
                                    size='larger'
                                    color={isDarkMode ? 'black' : 'white'}
                                    className='text-center'
                                >
                                    LUIZ SOUZA
                                </Heading>
                            </div>
                        </div>
                        <div className='relative flex flex-col items-center justify-between col-start-1 col-end-3 row-start-2 row-end-2 sm:items-start sm:flex-row'>
                            <div className='relative z-30 flex flex-col items-center justify-center w-full text-center sm:items-start sm:justify-start sm:text-left'>
                                <Heading
                                    as='h2'
                                    size='medium'
                                    color={isDarkMode ? 'black' : 'white'}
                                    className='text-center sm:text-start'
                                >
                                    Desenvolvedor
                                </Heading>
                                <TypingEffect
                                    classe={`text-center sm:text-start ${
                                        isDarkMode ? 'text-white' : 'text-black'
                                    }`}
                                    words={['FullStack', 'Front-End', 'Back-End']}
                                />
                            </div>
                            <div className='w-full flex items-end justify-center text-center pt-10 sm:text-right sm:justify-end'>
                                <Paragraph
                                    size='small'
                                    color={isDarkMode ? 'black' : 'white'}
                                    max={'20.875rem'}
                                >
                                    DESENVOLVENDO PROJETOS IMPRESSIONANTES
                                </Paragraph>
                            </div>
                        </div>
                        <div className='flex flex-col-reverse items-center justify-between col-start-1 col-end-4 row-span-3 pt-0 gap-8 md:pt-24 md:flex-row md:gap-0'>
                            <div className='w-full flex items-center justify-center gap-8 md:justify-start'>
                                <LinkCustom
                                    color={isDarkMode ? 'black' : 'white'}
                                    link={'https://www.linkedin.com/in/luiz-antonio-souza-5000a226b/'}
                                    img={'image/icon-linkedin.svg'}
                                    nomeimg={'linkedin'}
                                >
                                    LINKEDIN
                                </LinkCustom>
                                <LinkCustom
                                    color={isDarkMode ? 'black' : 'white'}
                                    link={'https://github.com/Luixz157'}
                                    img={'image/icon-github.svg'}
                                    nomeimg={'github'}
                                >
                                    GITHUB
                                </LinkCustom>
                                <LinkCustom
                                    color={isDarkMode ? 'black' : 'white'}
                                    link={
                                        'https://www.instagram.com/luizantonio.souza_/?next=%2F'
                                    }
                                    img={'image/icon-instagram.svg'}
                                    nomeimg={'instagram'}
                                >
                                    INSTAGRAM
                                </LinkCustom>
                            </div>
                            <div className='w-full flex items-center justify-center text-center'>
                                <span
                                    className={`font-roobert text-center text-lg leading-5 ${
                                        isDarkMode ? 'text-black' : 'text-white'
                                    }`}
                                >
                                    — DISPONÍVEL PARA TRABALHO —
                                </span>
                            </div>
                            <div className='w-full max-w-56 flex items-center justify-center md:justify-end lg:max-w-none'>
                                <span
                                    className={`font-roobert text-lg leading-5 ${
                                        isDarkMode ? 'text-black' : 'text-white'
                                    }`}
                                >
                                    BRASIL - 2021/{currentYear} -
                                </span>
                            </div>
                        </div>
                    </div>
                </ContainerGrid>
            </div>
        </section>
    );
}
