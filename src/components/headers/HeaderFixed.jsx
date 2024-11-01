"use client";

import { useEffect, useState } from "react";
import { ContainerGrid } from "@/components/layout/ContainerGrid";
import { LinkNav } from "@/components/ui/LinkNav";
import Image from "next/image";

export function HeaderFixed({ toggleMenu }) {
  const [isVisible, setIsVisible] = useState(false); // Inicialmente invisível
  const [lastScrollY, setLastScrollY] = useState(0); // Guarda a última posição do scroll
  const [isAboveTrigger, setIsAboveTrigger] = useState(false); // Indica se está acima do ponto de ativação
  const triggerPoint = 1000; // Ponto a partir do qual a função será ativada

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

  return (
    <header
      className={`sticky top-0 left-0 w-full z-50 bg-white/5 border-b border-white/10 backdrop-blur-md transition-all duration-500 rounded-full ${
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
      <ContainerGrid className="flex justify-between items-center py-5 w-full">
        <div>
          <LinkNav link="/" color={"white"}><Image src={'/image/logo-black.svg'} width={151} height={25} alt="logo"/> </LinkNav>
        </div>
        <div className="flex justify-center items-center gap-16">
          <span className="cursor-pointer" onClick={toggleMenu}>MENU</span>
        </div>
      </ContainerGrid>
    </header>
  );
}
