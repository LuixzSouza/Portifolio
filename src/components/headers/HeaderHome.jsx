'use client';

// React / Next
import Image from "next/image";
import { useEffect, useState } from "react";

// Components
import { LinkNav } from "@/components/ui/LinkNav";
import { Clock } from "@/components/widgets/Clock";
import { ContainerGrid } from "@/components/layout/ContainerGrid";
import { MenuOpened } from '@/components/menus/MenuOpened';

export function HeaderHome() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen((prev) => !prev);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsScrolled(scrollY > 50); // Aciona a animação ao rolar mais de 50px
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header
                className={`fixed top-0 z-50 flex justify-between items-center py-5 w-full transition-all duration-700 
                    ${isScrolled ? 'translate-y-[-100%]' : 'translate-y-0'}`} // Troca a cor com base no tema
            >
                <ContainerGrid className={"flex justify-between items-center"} >
                    <div className={`transition-all duration-500 delay-200 ${isScrolled ? 'opacity-0' : 'opacity-100'}`}>
                        <LinkNav link="/">
                            <Image src={'/image/logo.svg'} width={151} height={25} alt="logo" />
                        </LinkNav>
                    </div>
                    <nav className={`hidden justify-center items-center gap-16 transition-all duration-500 delay-400 md:flex
                    ${isScrolled ? 'opacity-0' : 'opacity-100'}`}>
                        <LinkNav link="/" color={"white"}>HOME </LinkNav>
                        <LinkNav link="/work" color={"white"}>PROJETOS </LinkNav>
                        <LinkNav link="/about" color={"white"}>SOBRE</LinkNav>
                        <LinkNav link="/contact" color={"white"}>CONTATO</LinkNav>
                    </nav>
                    <div className={`flex justify-end items-center gap-2 w-full max-w-48 transition-all duration-500 delay-600 sm:gap-4 md:gap-8
                    ${isScrolled ? 'opacity-0' : 'opacity-100'}`}>
                        <Clock/>
                        <div
                        className="flex flex-col justify-center items-center cursor-pointer w-8 h-8 gap-1"
                        onClick={toggleMenu}
                        >
                            <span className={`block w-full h-[2px] bg-white transition-transform duration-300 `}></span>
                            <span className={`block w-full h-[2px] bg-white transition-all duration-300 `}></span>
                            <span className={`block w-full h-[2px] bg-white transition-transform duration-300 `}></span>
                        </div>
                    </div>
                
                </ContainerGrid>
            </header>
            <MenuOpened isOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </>
    );
}
