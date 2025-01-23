'use client'

// Next
import Image from "next/image";

// Componentes
import { LinkCustom } from "@/components/ui/LinkCustom";
import { BotaoPrimary } from "@/components/buttons/Botao";
import { Heading } from "@/components/typrography/Heading";
import { Paragraph } from "@/components/typrography/Paragraph";
import { ContainerGrid } from "@/components/layout/ContainerGrid";
import { useEffect, useState } from "react";
import Link from "next/link";

export function SectionFooter() {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
        
        useEffect(() => {
            const year = new Date().getFullYear();
            setCurrentYear(year);
        }, []);
    
    return (
        <footer className="relative z-20 w-full bg-footer bg-right-bottom bg-no-repeat bg-cover pt-36 pb-11 border-t border-white" >
            <ContainerGrid className={"w-full flex flex-col items-start justify-center"} >
                <div className="relative mb-32" >
                    <Heading as="h2" size="midlle" color="white" className="relative w-full text-center md:text-left max-w-900" > VAMOS JUNTOS TRABALHAR
                        <div className="absolute -bottom-4 right-0 rotate-12 sm:right-12 sm:bottom-2 md:right-60" >
                            <Image src={"/image/angular-colors.png"} width={70} height={40} alt="Icon angular colors"/>
                        </div>
                    </Heading>
                    
                </div>
                <div className="w-full flex flex-col items-center justify-center gap-16 mb-20 md:justify-start md:flex-row" >
                    <Link href={"/contact"}><BotaoPrimary estilo="primary" >Entre em contato</BotaoPrimary></Link>
                </div>
                <div className="w-full flex flex-col-reverse items-center justify-between gap-8 md:flex-row md:gap-0" >
                    <div className="w-full text-center md:text-left" >
                        <Paragraph size="litlleSmall" color="white" >🇧🇷  2019 — {currentYear}© Luiz Antônio de Souza</Paragraph>
                    </div>
                    <div className='w-full flex items-center justify-center gap-8 md:justify-end' >
                        <LinkCustom color={'white'} link={'https://www.linkedin.com/in/luiz-antonio-souza-5000a226b/'} img={"image/icon-linkedin.svg"} nomeimg={"linkedin"} >LINKEDIN</LinkCustom>
                        <LinkCustom color={'white'} link={'https://github.com/LuixzSouza'}  img={"image/icon-github.svg"} nomeimg={"github"}>GITHUB</LinkCustom>
                        <LinkCustom color={'white'} link={'https://www.instagram.com/luizantonio.souza_/?next=%2F'} img={"image/icon-instagram.svg"} nomeimg={"instagram"}>INSTAGRAM</LinkCustom>
                    </div>
                </div>
            </ContainerGrid>
        </footer>
    )
}
