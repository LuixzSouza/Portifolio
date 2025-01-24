'use client'

// Componentes
import { Slider } from "@/components/sliders/Slider";
import { Heading } from "@/components/typrography/Heading";
import { ContainerGrid } from "@/components/layout/ContainerGrid";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

export function SectionWork() {

    const bgSizeRef = useRef(null);
    const headingRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Animação para o fundo (clip-path)
        if (bgSizeRef.current) {
            gsap.fromTo(
                bgSizeRef.current,
                { clipPath: "circle(0% at 50% 50%)" },
                {
                    clipPath: "circle(100% at 50% 50%)",
                    duration: 1.2,
                    ease: "power3.inOut",
                    scrollTrigger: {
                        trigger: bgSizeRef.current,
                        start: "top 75%",
                    },
                }
            );
        }

        // Animação das letras
        if (headingRef.current) {
            const letters = headingRef.current.querySelectorAll(".letter");
            gsap.fromTo(
                letters,
                { y: "100%", opacity: 0 },
                {
                    y: "0%",
                    opacity: 1,
                    duration: 0.3,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: "top 75%",
                    },
                }
            );
        }
    }, []);

    return (
        <section className="relative z-30 bg-zinc-900 w-full h-full py-16 md:py-0" >
            <div ref={bgSizeRef} className={`bg-black/50 w-full h-full absolute top-0 left-0 z-10`} ></div>
            <div className={"relative z-20 flex flex-col items-center justify-center"} >
                <div className="sticky top-0 w-full h-auto pb-16 flex flex-col items-center justify-center overflow-hidden md:h-screen" >
                    <ContainerGrid className={"flex flex-col gap-16 md:gap-0"} >
                        <div className="flex flex-col items-start justify-center my-1" >
                            <Heading as="h2" size="xlarge" color="white" lineHeight="none" ref={headingRef} >
                                {/** Divida as letras e aplique a classe */}
                                {"PROJETOS".split("").map((letter, index) => (
                                    <span key={index} className="inline-block overflow-hidden">
                                        <span className="letter inline-block">{letter}</span>
                                    </span>
                                ))}
                            </Heading>
                        </div>
                        <div className="flex h-auto md:hidden" >
                            <Slider/>
                        </div>
                    </ContainerGrid>
                </div>
                <ContainerGrid className={"hidden md:flex"} >
                    <Slider/>
                </ContainerGrid>
            </div>
        </section>
    )
}
