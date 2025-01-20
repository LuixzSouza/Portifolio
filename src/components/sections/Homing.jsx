'use client'

import { useState, useEffect, useRef, useCallback } from 'react';

// Components
import { LinkCustom } from '@/components/ui/LinkCustom';
import { Heading } from '@/components/typrography/Heading';
import { HeaderHome } from '@/components/headers/HeaderHome';
import { Paragraph } from '@/components/typrography/Paragraph';
import { ContainerGrid } from '@/components/layout/ContainerGrid';
import { TypingEffect } from '@/components/animations/TypingEffect';
import Link from 'next/link';
import { gsap } from "gsap"; 

export function Homing() {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [hasAnimated, setHasAnimated] = useState(false);  // Novo estado para controlar a animação

    const headingLuizRef = useRef(null);
    const textLeftRef = useRef(null); 
    const textRightRef = useRef(null); 
    const linkTextLeftRef = useRef(null);
    const linkTextCenterRef = useRef(null);
    const linkTextRightRef = useRef(null); 

    useEffect(() => {
        const year = new Date().getFullYear();
        setCurrentYear(year);
    }, []);

    const handleScroll = useCallback(() => {
        const scrollTop = window.pageYOffset;
    
        // Se o scroll ultrapassar 30% da altura da tela e a animação ainda não tiver ocorrido
        if (scrollTop > window.innerHeight * 0.3 && !hasAnimated) {
            setHasAnimated(true);
        } else if (scrollTop <= window.innerHeight * 0.3 && hasAnimated) {
            setHasAnimated(false);
        }
    }, [hasAnimated]); 

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [hasAnimated]); // Adiciona 'hasAnimated' como dependência

    useEffect(() => {
        const headingLuiz = headingLuizRef.current;
        const textLeft = textLeftRef.current;
        const textRight = textRightRef.current;
        const linkTextLeft = linkTextLeftRef.current;
        const linkTextCenter = linkTextCenterRef.current;
        const linkTextRight = linkTextRightRef.current;

        const tl = gsap.timeline();

        // Animacao ao carregar a página (tempo normal)
        if (!hasAnimated) {
            tl.fromTo(headingLuiz, { opacity: 0, y: -100 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" });
            tl.fromTo(textLeft, { opacity: 0, x: -100 }, { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }, "-=0.6");
            tl.fromTo(textLeft.querySelector('h2'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.4");
            tl.fromTo(textRight, { opacity: 0, x: 100 }, { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }, "-=0.4");
            tl.fromTo(linkTextLeft, { opacity: 0, y: 50 }, { opacity: 1, y: 0, stagger: 0.2, duration: 0.6, ease: "power2.out" }, "-=0.6");
            tl.fromTo(linkTextRight, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }, "-=0.6");
            tl.fromTo(linkTextCenter, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }, "-=0.6");
        } 

        // Animação de rolagem (modificação de animação)
        if (hasAnimated) {
            tl.to(linkTextCenter, { opacity: 0, scale: 0.8, duration: 0.1, ease: "power2.in" });
            tl.to(linkTextRight, { opacity: 0, x: 50, duration: 0.1, ease: "power2.in" });
            tl.to(linkTextLeft, { opacity: 0, y: 50, stagger: 0.2, duration: 0.1, ease: "power2.in" });
            tl.to(textRight, { opacity: 0, x: 100, duration: 0.1, ease: "power2.in" });
            tl.to(textLeft.querySelector('h2'), { opacity: 0, y: 20, duration: 0.1, ease: "power2.in" });
            tl.to(textLeft, { opacity: 0, x: -100, duration: 0.1, ease: "power2.in" });
            tl.to(headingLuiz, { opacity: 0, y: -100, duration: 0.1, ease: "power2.in" });
        }
    }, [hasAnimated]); // Dependente de 'hasAnimated'

    return (
        <section className={`sticky top-0 z-20 bg-cover transition-colors duration-500 bg-hero`}>
            <div className='w-full h-screen'>
                <HeaderHome />
                <ContainerGrid className={"h-full relative overflow-hidden"}>
                    <div
                        className={`h-full grid grid-cols-3 grid-rows-3 pb-32 justify-between items-center text-white`}
                        style={{
                            gridTemplateColumns: 'auto 1fr auto',
                            gridTemplateRows: 'auto auto',
                        }}
                    >
                        <div className='relative w-full flex items-center justify-center col-start-1 col-end-3 row-start-1 row-end-1'>
                            <div ref={headingLuizRef} className='w-full flex items-center justify-center text-center'>
                                <Heading
                                    as='h1'
                                    size='larger'
                                    color={'white'}
                                    className='text-center'
                                >
                                    LUIZ SOUZA
                                </Heading>
                            </div>
                        </div>
                        <div className='relative flex flex-col items-center justify-between col-start-1 col-end-3 row-start-2 row-end-2 sm:items-start sm:flex-row'>
                            <div ref={textLeftRef} className='relative z-30 flex flex-col items-center justify-center w-full text-center sm:items-start sm:justify-start sm:text-left'>
                                <Heading
                                    as='h2'
                                    size='medium'
                                    color={'white'}
                                    className='text-center sm:text-start'
                                >
                                    Desenvolvedor
                                </Heading>
                                <TypingEffect
                                    classe={`text-center sm:text-start text-white`}
                                    words={['FullStack', 'Front-End', 'Back-End']}
                                />
                            </div>
                            <div ref={textRightRef} className='w-full flex items-end justify-center text-center pt-10 sm:text-right sm:justify-end'>
                                <Paragraph
                                    size='small'
                                    color={'white'}
                                    max={'20.875rem'}
                                >
                                    DESENVOLVENDO PROJETOS IMPRESSIONANTES
                                </Paragraph>
                            </div>
                        </div>
                        <div className='flex flex-col-reverse items-center justify-between col-start-1 col-end-4 row-span-3 pt-0 gap-8 md:pt-24 md:flex-row md:gap-0'>
                            <div ref={linkTextLeftRef} className='w-full flex items-center justify-center gap-8 md:justify-start'>
                                <LinkCustom
                                    color={'white'}
                                    link={'https://www.linkedin.com/in/luiz-antonio-souza-5000a226b/'}
                                    img={'image/icon-linkedin.svg'}
                                    nomeimg={'linkedin'}
                                >
                                    LINKEDIN
                                </LinkCustom>
                                <LinkCustom
                                    color={'white'}
                                    link={'https://github.com/Luixz157'}
                                    img={'image/icon-github.svg'}
                                    nomeimg={'github'}
                                >
                                    GITHUB
                                </LinkCustom>
                                <LinkCustom
                                    color={'white'}
                                    link={ 'https://www.instagram.com/luizantonio.souza_/?next=%2F' }
                                    img={'image/icon-instagram.svg'}
                                    nomeimg={'instagram'}
                                >
                                    INSTAGRAM
                                </LinkCustom>
                            </div>
                            <div ref={linkTextCenterRef} className='w-full flex items-center justify-center text-center'>
                                <Link href={"/contact"}
                                    className="inline-block text-white hover:scale-110 transition-all duration-300 ease-in-out"
                                    style={{
                                        textShadow: '0 0 10px #00ffcc, 0 0 20px #00ffcc',
                                    }}
                                >
                                    — DISPONÍVEL PARA TRABALHO —
                                </Link>
                            </div>
                            <div className='w-full max-w-56 flex items-center justify-center md:justify-end lg:max-w-none'>
                                <span
                                    ref={linkTextRightRef}
                                    className={`font-roobert text-lg leading-5 text-white`}
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
