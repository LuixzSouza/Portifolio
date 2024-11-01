"use client";

// React / Next
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

// Componentes
import { ListMenu } from "./MenuList";
import { LinkNav } from "../ui/LinkNav";
import { Clock } from "../widgets/Clock";
import { LinkCustom } from "../ui/LinkCustom";
import { ContainerGrid } from "../layout/ContainerGrid";
import { Paragraph } from "@/components/typrography/Paragraph";//ok

export function MenuOpened({ isOpen, toggleMenu }) {
  const [isAnimating, setIsAnimating] = useState(true);

  // Bloquear e desbloquear o scroll do body
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Bloqueia o scroll
    } else {
      document.body.style.overflow = ""; // Reseta para o padrão
    }

    // Limpeza para garantir que o scroll seja reativado quando o componente desmontar
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Habilita interação após o fim da transição
  const handleTransitionEnd = () => setIsAnimating(false);

  // Resetar o estado de animação quando o menu for fechado
  useEffect(() => {
    if (!isOpen) setIsAnimating(true);
  }, [isOpen]);

  const handleLinkClick = (event) => {
    if (isOpen) {
      event.preventDefault();
      toggleMenu();

      // Navegar para a página inicial após o fechamento do menu
      setTimeout(() => {
        window.location.href = "/";
      }, 300);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 z-50 w-full bg-black overflow-hidden transition-transform duration-700 ${
        isOpen ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{
        pointerEvents: isAnimating ? "none" : "auto",
      }}
      onTransitionEnd={handleTransitionEnd}
    >
      <div className="relative w-full h-screen py-4 overflow-hidden">
        <ContainerGrid className="relative z-20 w-full h-full flex flex-col items-start justify-between">
          <div className="flex items-center justify-between w-full">
            <div onClick={toggleMenu}>
              <LinkNav link="/" color={"white"}><Image src={'/image/logo.svg'} width={151} height={25} alt="logo" onClick={handleLinkClick}/> </LinkNav>
            </div>
            <div>
              <span className="text-white cursor-pointer" onClick={toggleMenu}>
                Close
              </span>
            </div>
          </div>
          <div className="w-full">
            <Link href={"/work"}><ListMenu image={"/image/icon-work.png"}>TRABALHO</ListMenu></Link>
            <Link href={"/about"}><ListMenu image={"/image/icon-about.png"}>SOBRE</ListMenu></Link>
            <Link href={"/contact"}><ListMenu image={"/image/icon-contato.png"}>CONTATO</ListMenu></Link>
          </div>
          <div className="relative w-full flex items-center justify-between">
            <div className="absolute left-0 -top-9">
              <Paragraph size="litlleSmall" color="white">
                SOCIAL
              </Paragraph>
            </div>

            <div className="w-full flex items-center justify-start gap-8 pb-3">
              <LinkCustom
                color={"white"}
                link={
                  "https://www.linkedin.com/in/luiz-antonio-souza-5000a226b/"
                }
                img={"image/icon-linkedin.svg"}
                nomeimg={"linkedin"}
              >
                LINKEDIN
              </LinkCustom>
              <LinkCustom
                color={"white"}
                link={"https://github.com/Luixz157"}
                img={"image/icon-github.svg"}
                nomeimg={"github"}
              >
                GITHUB
              </LinkCustom>
              <LinkCustom
                color={"white"}
                link={
                  "https://www.instagram.com/luizantonio.souza_/?next=%2F"
                }
                img={"image/icon-instagram.svg"}
                nomeimg={"instagram"}
              >
                INSTAGRAM
              </LinkCustom>
            </div>
            <div className="w-full flex items-center justify-end">
              <Clock />
            </div>
          </div>
        </ContainerGrid>
        <div className="absolute z-10 top-0 left-0 w-full min-h-[105vh] bg-menu bg-center bg-no-repeat bg-cover animate-floating"></div>
      </div>
    </div>
  );
}
