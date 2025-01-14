"use client";

// React / Next
import Image from "next/image";
import { useEffect, useState } from "react";

// Componentes
import { LinkNav } from "@/components/ui/LinkNav";
import { ContainerGrid } from "@/components/layout/ContainerGrid";
import { Clock } from "../widgets/Clock";

export function HeaderFixed({ toggleMenu }) {
  const [isVisible, setIsVisible] = useState(false); // Inicialmente invisível
  const [lastScrollY, setLastScrollY] = useState(0); // Guarda a última posição do scroll
  const [isAboveTrigger, setIsAboveTrigger] = useState(false); // Indica se está acima do ponto de ativação
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar o menu
  const triggerPoint = 50; // Ponto a partir do qual a função será ativada

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY; // Posição atual do scroll

      if (currentScrollY > triggerPoint) {
        setIsAboveTrigger(true); // Indica que estamos acima do ponto de ativação
        setIsVisible(currentScrollY <= lastScrollY); // Mostrar ao rolar para cima, esconder ao rolar para baixo
      } else {
        setIsAboveTrigger(false); // Indica que estamos abaixo do ponto de ativação
        setIsVisible(false); // Suma instantaneamente abaixo do triggerPoint
      }

      setLastScrollY(currentScrollY); // Atualizar a última posição de scroll
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen); // Alterna o estado do menu
    toggleMenu && toggleMenu(); // Chama o callback externo, se necessário
  };

  return (
    <header
      className={`fixed top-4 left-0 w-full z-999 transition-all duration-500 rounded-full ${
        isAboveTrigger
          ? isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full"
          : "opacity-0"
      }`}
      style={{
        pointerEvents: isVisible ? "auto" : "none",
        transition: isAboveTrigger
          ? "opacity 0.1s, transform 0.5s"
          : "opacity 0.1s", // Transição instantânea abaixo do triggerPoint
      }}
    >
      <div>
        <ContainerGrid className="flex justify-between items-center py-5 px-4 bg-black/25 shadow-white/10 shadow-2xl backdrop-blur-xl rounded-full w-full md:px-8">
          <div>
            <LinkNav link="/" color={"white"}>
              <Image src={"/image/logo.svg"} width={151} height={25} alt="logo" />
            </LinkNav>
          </div>
          <nav
            className={`hidden justify-center items-center gap-16 transition-all duration-500 delay-400 md:flex`}
          >
            <LinkNav link="/" color={"white"}>
              HOME
            </LinkNav>
            <LinkNav link="/work" color={"white"}>
              PROJETOS
            </LinkNav>
            <LinkNav link="/about" color={"white"}>
              SOBRE
            </LinkNav>
            <LinkNav link="/contact" color={"white"}>
              CONTATO
            </LinkNav>
          </nav>
          <div className="flex justify-center items-center gap-2">
            <Clock />
            <div
              className="flex flex-col justify-center items-center cursor-pointer w-8 h-8 gap-1"
              onClick={handleMenuClick}
            >
              <span
                className={`block w-full h-[2px] bg-white transition-transform duration-300 `}
              ></span>
              <span
                className={`block w-full h-[2px] bg-white transition-all duration-300 `}
              ></span>
              <span
                className={`block w-full h-[2px] bg-white transition-transform duration-300 `}
              ></span>
            </div>
          </div>
        </ContainerGrid>
      </div>
    </header>
  );
}
