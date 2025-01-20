'use client'

// Componentes
import { ContainerGrid } from "@/components/layout/ContainerGrid";
import { Heading } from "@/components/typrography/Heading";
import { Paragraph } from "@/components/typrography/Paragraph";
import { TypingEffect } from "@/components/animations/TypingEffect";
import { LinkCustom } from "@/components/ui/LinkCustom"
import { useState, useEffect, useRef } from 'react';
import Link from "next/link";
import gsap from "gsap";

export function LayoutStart({heading1, wordFixed, wordsEfect = [], textRigth, bg}) {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
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

    useEffect(() => {
        const headingLuiz = headingLuizRef.current;
        const textLeft = textLeftRef.current;
        const textRight = textRightRef.current;
        const linkTextLeft = linkTextLeftRef.current;
        const linkTextCenter = linkTextCenterRef.current;
        const linkTextRight = linkTextRightRef.current;

        const tl = gsap.timeline();

        // Animacao ao carregar a página (tempo normal)
            tl.fromTo(headingLuiz, { opacity: 0, y: -100 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" });
            tl.fromTo(textLeft, { opacity: 0, x: -100 }, { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }, "-=0.6");
            tl.fromTo(textRight, { opacity: 0, x: 100 }, { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }, "-=0.4");
            tl.fromTo(linkTextLeft, { opacity: 0, y: 50 }, { opacity: 1, y: 0, stagger: 0.2, duration: 0.6, ease: "power2.out" }, "-=0.6");
            tl.fromTo(linkTextRight, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }, "-=0.6");
            tl.fromTo(linkTextCenter, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }, "-=0.6");

    }, []);

    return (
        <section className={`w-full h-screen ${bg} bg-cover bg-center md:h-auto`} >
            <ContainerGrid>
                <div className='h-screen grid grid-cols-3 grid-rows-3 justify-between items-center overflow-hidden md:h-full md:pb-32 xl:h-screen' style={{
                        gridTemplateColumns: 'auto 1fr auto', // Ajusta primeiro e último ao conteúdo, o meio ocupa o espaço restante
                        gridTemplateRows: 'auto auto',         // Linhas se ajustam ao conteúdo
                    }}>
                    <div ref={headingLuizRef} className='relative w-full flex items-center justify-center col-start-1 col-end-3 row-start-1 row-end-1 text-center pt-12' >
                        <Heading as="h1" size="larger" color="white" className="text-center"  lineHeight="normal">{heading1}</Heading>
                    </div>
                    <div className='relative flex flex-col items-center justify-between col-start-1 col-end-3 row-start-2 row-end-2 md:items-start md:flex-row' >
                        <div ref={textLeftRef} className='relative z-30 flex flex-col items-start justify-start w-full text-left' >
                            <Heading as='h2' size='medium' color='white' className="text-center md:text-left" > {wordFixed} </Heading>
                            <TypingEffect words={wordsEfect} classe={"text-center md:text-left"}/>
                        </div>
                        <div ref={textRightRef} className='flex items-end justify-start pt-10 text-center md:text-right'>
                            <Paragraph size='small' color='white' max={'20.875rem'} className={"uppercase"} >{textRigth}</Paragraph>
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-between col-start-1 col-end-4 row-span-3 mt-24 gap-6 md:flex-row md:gap-0' >
                        <div ref={linkTextLeftRef} className='w-full flex items-center justify-center gap-8 md:justify-start' >
                            <LinkCustom color={'white'} link={'https://www.linkedin.com/in/luiz-antonio-souza-5000a226b/'} img={"image/icon-linkedin.svg"} nomeimg={"linkedin"} >LINKEDIN</LinkCustom>
                            <LinkCustom color={'white'} link={'https://github.com/Luixz157'}  img={"image/icon-github.svg"} nomeimg={"github"}>GITHUB</LinkCustom>
                            <LinkCustom color={'white'} link={'https://www.instagram.com/luizantonio.souza_/?next=%2F'} img={"image/icon-instagram.svg"} nomeimg={"instagram"}>INSTAGRAM</LinkCustom>
                        </div>
                        <div ref={linkTextCenterRef} className='w-full flex items-center justify-center' > 
                            <Link href={"/contact"}
                                className="inline-block text-white hover:scale-110 transition-all duration-300 ease-in-out"
                                style={{
                                    textShadow: '0 0 10px #00ffcc, 0 0 20px #00ffcc',
                                }}
                            >
                                — DISPONÍVEL PARA TRABALHO —
                            </Link>
                        </div>
                        <div className='w-full flex items-center justify-center md:justify-end' >
                            <span ref={linkTextRightRef} className='text-white font-roobert text-lg leading-5' >BRASIL - 2021/{currentYear} -</span>
                        </div>
                    </div>
                </div>
            </ContainerGrid>
        </section>
    )
}