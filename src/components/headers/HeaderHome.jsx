'use client';

// React / Next
import Image from "next/image";
import { useEffect, useState } from "react";

// Components
import { LinkNav } from "@/components/ui/LinkNav";
import { Clock } from "@/components/widgets/Clock";
import { ContainerGrid } from "@/components/layout/ContainerGrid";

export function HeaderHome() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsScrolled(scrollY > 50); // Aciona a animação ao rolar mais de 50px
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 z-50 flex justify-between items-center py-5 w-full transition-all duration-700 bg-black/0
            ${isScrolled ? 'translate-y-[-100%]' : 'translate-y-0'}`} >
            <ContainerGrid className={"flex justify-between items-center"} >
                <div className={`transition-all duration-500 delay-200 ${isScrolled ? 'opacity-0' : 'opacity-100'}`}>
                    <LinkNav link="/" color={"white"}><Image src={'/image/logo.svg'} width={151} height={25} alt="logo"/> </LinkNav>
                </div>
                <nav className={`flex justify-center items-center gap-16 transition-all duration-500 delay-400 
                ${isScrolled ? 'opacity-0' : 'opacity-100'}`}>
                    <LinkNav link="/work" color={"white"}>PROJETOS </LinkNav>
                    <LinkNav link="/about"  color={"white"}>SOBRE</LinkNav>
                    <LinkNav link="/contact"  color={"white"}>CONTATO</LinkNav>
                </nav>
                <div className={`flex justify-center items-center gap-8 w-full max-w-48 transition-all duration-500 delay-600 
                ${isScrolled ? 'opacity-0' : 'opacity-100'}`}>
                    <Clock />
                </div>
            </ContainerGrid>
        </header>
    );
}
