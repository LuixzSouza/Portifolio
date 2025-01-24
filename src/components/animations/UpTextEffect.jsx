'use client'

// Componentes
import { Heading } from "@/components/typrography/Heading";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

export function UpTextEffect({ text, heading, size, cor }) {
    const headingRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Animação das letras
        if (headingRef.current) {
            const letters = headingRef.current.querySelectorAll(".letter");
            gsap.fromTo(
                letters,
                { y: "100%", opacity: 0 },
                {
                    y: "0%",
                    opacity: 1,
                    duration: 0.2,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: "top 80%",
                        toggleActions: "play none none none",  // Garantir que a animação seja disparada corretamente
                    },
                }
            );
        }
    }, [text]);  // Reexecuta sempre que o texto mudar

    return (
        <Heading as={heading} size={size} color={cor} lineHeight="none" ref={headingRef}>
            {/** Divida as letras e aplique a classe */}
            {text.split("").map((letter, index) => (
                <span key={index} className="inline-block overflow-hidden">
                    <span className="letter inline-block">{letter}</span>
                </span>
            ))}
        </Heading>
    );
}
