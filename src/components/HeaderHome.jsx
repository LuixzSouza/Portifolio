'use client';
// Components
import { useEffect, useState } from "react";
import { ContainerGrid } from "@/components/ContainerGrid";
import { LinkNav } from "@/components/LinkNav";
import { Clock } from "@/components/Clock";
import Image from "next/image";

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
        <ContainerGrid 
            className={`sticky top-0 z-50 flex justify-between items-center py-5 w-full transition-all duration-700 
            ${isScrolled ? 'translate-y-[-100%]' : 'translate-y-0'}`}
        >
            <div className={`transition-all duration-500 delay-200 ${isScrolled ? 'opacity-0' : 'opacity-100'}`}>
                <LinkNav link="/" color={"white"}><Image src={'/image/logo.svg'} width={151} height={25} alt="logo"/> </LinkNav>
            </div>
            <nav className={`flex justify-center items-center gap-16 transition-all duration-500 delay-400 
            ${isScrolled ? 'opacity-0' : 'opacity-100'}`}>
                <LinkNav link="/work" color={"white"}>WORK </LinkNav>
                <LinkNav link="/about"  color={"white"}>ABOUT</LinkNav>
                <LinkNav link="/contact"  color={"white"}>CONTACT</LinkNav>
            </nav>
            <div className={`flex justify-center items-center gap-8 w-full max-w-48 transition-all duration-500 delay-600 
            ${isScrolled ? 'opacity-0' : 'opacity-100'}`}>
                <Clock />
            </div>
        </ContainerGrid>
    );
}
