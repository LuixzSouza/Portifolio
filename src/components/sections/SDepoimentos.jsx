'use client';

import React, { useEffect, useRef } from "react";
import { UpTextEffect } from "../animations/UpTextEffect";
import { ContainerGrid } from "../layout/ContainerGrid";
import { Depoimento } from "@/components/ui/Depoimento";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

const depoiments = [
    {
        nome: "Eduardo Souza",
        emprego: "Visual Design",
        depoimento: "Solicitado...",
        image: "/image/edu.png",
    },
    {
        nome: "Lennon Mauricio",
        emprego: "Produtor de Vídeo",
        depoimento: "Solicitado...",
        image: "/image/lennon.png",
    },
    {
        nome: "Renan Carlos",
        emprego: "Estudante de SI",
        depoimento: "O Luiz é um cara que eu admiro muito, é nítido seus esforços e sua vontade de se tornar um profissional cada vez melhor. Sempre motivando seus colegas com sua transparência e bondade.",
        image: "/image/renan.png",
    },
];

export function SDepoimentos() {
    const depoimentoRefs = useRef([]); // Referências para os depoimentos

    useEffect(() => {
        // Registrar o plugin ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);

        // Animação dos depoimentos ao entrar na tela
        gsap.fromTo(
            depoimentoRefs.current,
            { opacity: 0, y: 50 }, // Estado inicial
            {
                opacity: 1,
                y: 0, // Estado final
                stagger: 0.2, // Atraso entre as animações
                duration: 1, // Duração da animação
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".depoimentos-container", // Elemento a ser observado
                    start: "top 80%", // Início da animação
                    toggleActions: "play none none none",
                },
            }
        );
    }, []);

    return (
        <section className="py-12 md:py-32 border-b border-white/25">
            <ContainerGrid>
                <UpTextEffect heading={"h2"} size={"medium"} cor={"white"} text={"DEPOIMENTOS"} />
                <div className="w-full flex flex-col gap-16 lg:flex-row depoimentos-container">
                    {depoiments.map((item, index) => (
                        <Depoimento
                            key={index}
                            nome={item.nome}
                            emprego={item.emprego}
                            depoimento={item.depoimento}
                            image={item.image}
                            className={index === 1 ? "relative lg:-top-8" : ""}
                            ref={(el) => (depoimentoRefs.current[index] = el)} // Adicionando referência para cada depoimento
                        />
                    ))}
                </div>
            </ContainerGrid>
        </section>
    );
}
