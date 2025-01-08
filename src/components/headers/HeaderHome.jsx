'use client';

// React / Next
import Image from "next/image";
import { useEffect, useState } from "react";

// Components
import { LinkNav } from "@/components/ui/LinkNav";
import { Clock } from "@/components/widgets/Clock";
import { ContainerGrid } from "@/components/layout/ContainerGrid";
import { DarkLight } from "@/components/ui/DarkLight";

export function HeaderHome() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false); // Estado para controlar o tema

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsScrolled(scrollY > 50); // Aciona a animação ao rolar mais de 50px
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 z-50 flex justify-between items-center py-5 w-full transition-all duration-700 
                ${isScrolled ? 'translate-y-[-100%]' : 'translate-y-0'}`} // Troca a cor com base no tema
        >
            <ContainerGrid className={"flex justify-between items-center"} >
                <div className={`transition-all duration-500 delay-200 ${isScrolled ? 'opacity-0' : 'opacity-100'}`}>
                    <LinkNav link="/">
                        {isDarkMode ? <Image src={'/image/logo-black.svg'} width={151} height={25} alt="logo" /> : <Image src={'/image/logo.svg'} width={151} height={25} alt="logo" />}
                    </LinkNav>
                </div>
                <nav className={`hidden justify-center items-center gap-16 transition-all duration-500 delay-400 md:flex
                ${isScrolled ? 'opacity-0' : 'opacity-100'}`}>
                    <LinkNav link="/" color={isDarkMode ? "black" : "white"}>HOME </LinkNav>
                    <LinkNav link="/work" color={isDarkMode ? "black" : "white"}>PROJETOS </LinkNav>
                    <LinkNav link="/about" color={isDarkMode ? "black" : "white"}>SOBRE</LinkNav>
                    <LinkNav link="/contact" color={isDarkMode ? "black" : "white"}>CONTATO</LinkNav>
                </nav>
                <div className={`flex justify-end items-center gap-8 w-full max-w-48 transition-all duration-500 delay-600 
                ${isScrolled ? 'opacity-0' : 'opacity-100'}`}>
                    <DarkLight onToggleTheme={setIsDarkMode} /> {/* Passa o callback */}
                    <Clock isDarkMode={isDarkMode} />
                </div>
            </ContainerGrid>
        </header>
    );
}
