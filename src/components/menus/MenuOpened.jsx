"use client";

// React / Next
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { gsap } from "gsap"; // Importando GSAP

// Componentes
import { ListMenu } from "./MenuList";
import { LinkNav } from "../ui/LinkNav";
import { Clock } from "../widgets/Clock";
import { LinkCustom } from "../ui/LinkCustom";
import { ContainerGrid } from "../layout/ContainerGrid";
import { Paragraph } from "@/components/typrography/Paragraph"; //ok

export function MenuOpened({ isOpen, toggleMenu }) {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleTransitionEnd = () => setIsAnimating(false);

  useEffect(() => {
    if (!isOpen) setIsAnimating(true);
  }, [isOpen]);

  // Função para animar o menu
  useEffect(() => {
    if (isOpen) {
      // Animação para mostrar o menu
      gsap.fromTo(
        ".menu-item", 
        { opacity: 0, y: -20 }, // Começa invisível e deslocado
        {
          delay: 0.3,
          opacity: 1, 
          y: 0, 
          stagger: 0.1, // Cria um efeito de 'stagger' para os itens
          duration: 0.5, 
          ease: "power3.out"
        }
      );
    } else {
      // Animação para esconder o menu
      gsap.to(".menu-item", {
        opacity: 0, 
        y: -20, 
        stagger: 0.1, 
        duration: 0.5, 
        ease: "power3.in"
      });
    }
  }, [isOpen]);

  return (
    <div
      className={`fixed top-0 left-0 z-1000 w-full bg-black overflow-hidden transition-all duration-700 ${
        isOpen ? "menu-opened" : "menu-closed"
      }`}
      style={{
        pointerEvents: isAnimating ? "none" : "auto",
        clipPath: isOpen
          ? "circle(150% at 100% 0%)" // Expande a partir do topo
          : "circle(0% at 100% 0%)", // Começa pequeno no topo
        transition: "clip-path 0.8s ease-in-out",
      }}
      onTransitionEnd={handleTransitionEnd}
    >
      <div className="relative w-full h-dvh py-4 overflow-hidden">
        <ContainerGrid
          className={`relative z-20 w-full h-full flex flex-col items-start justify-between transition-opacity duration-700 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex items-center justify-between w-full">
            <div onClick={toggleMenu}>
              <LinkNav link="/" color={"white"}>
                <Image
                  src={"/image/logo.svg"}
                  width={151}
                  height={25}
                  alt="logo"
                />
              </LinkNav>
            </div>
            <div>
              <div onClick={toggleMenu} className="h-12 w-12 flex items-center justify-center relative group cursor-pointer transition-all duration-300 ease-in-out" >
                <span className="absolute group-hover:opacity-0 group-hover:scale-0 text-white transition-all duration-200 ease-in-out">
                  Fechar
                </span>
                <div className="absolute h-12 w-12 flex items-center justify-center py-3 text-white text-2xl bg-red-600/80 rounded-full scale-0 group-hover:scale-100 transition-all duration-300 ease-in-out" >
                  &times;
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col">
            <Link href={"/"} className="menu-item">
              <ListMenu image={"icon-home.png"}>HOME</ListMenu>
            </Link>
            <Link href={"/work"} className="menu-item">
              <ListMenu image={"icon-work.png"}>TRABALHO</ListMenu>
            </Link>
            <Link href={"/about"} className="menu-item">
              <ListMenu image={"icon-about.png"}>SOBRE</ListMenu>
            </Link>
            <Link href={"/contact"} className="menu-item">
              <ListMenu image={"icon-contato.png"}>CONTATO</ListMenu>
            </Link>
          </div>
          <div className="relative w-full flex flex-col items-center justify-between md:flex-row">
            <div className="absolute left-0 -top-9">
              <Paragraph size="tiny" className={"text-white/75"}>
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
                link={"https://github.com/LuixzSouza"}
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
            <div className="w-full flex items-center justify-start md:justify-end">
              <Clock />
            </div>
          </div>
        </ContainerGrid>
        <div className="absolute z-10 top-0 left-0 w-full min-h-[105vh] bg-menu bg-center bg-no-repeat bg-cover animate-floating"></div>
      </div>
    </div>
  );
}
