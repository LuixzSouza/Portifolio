"use client";

import { useEffect, useState } from "react";
import { ContainerGrid } from "@/components/ContainerGrid";
import { LinkNav } from "@/components/LinkNav";

export function HeaderFixed({ toggleMenu }) {
  const [isVisible, setIsVisible] = useState(false); // Inicialmente invisível
  const [lastScrollY, setLastScrollY] = useState(0); // Guarda a última posição do scroll
  const triggerPoint = 900; // Ponto a partir do qual a função será ativada

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY; // Posição atual do scroll

      if (currentScrollY > triggerPoint) {
        if (currentScrollY > lastScrollY) {
          setIsVisible(false); // Esconder ao rolar para baixo
        } else {
          setIsVisible(true); // Mostrar ao rolar para cima
        }
      } else {
        setIsVisible(false); // Manter invisível antes do ponto de ativação
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
      className={`sticky top-0 left-0 w-full z-50 bg-white transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
      }`}
      style={{ pointerEvents: isVisible ? "auto" : "none" }}
    >
      <ContainerGrid className="flex justify-between items-center py-5 w-full">
        <div>
          <LinkNav
            link="/"
            firstText="LUIZ SOUZA"
            secondText="LUIZ SOUZA"
            color={"black"}
          />
        </div>
        <div className="flex justify-center items-center gap-16">
          <span className="cursor-pointer" onClick={toggleMenu}>
            ABRIR MENU
          </span>
        </div>
      </ContainerGrid>
    </header>
  );
}
