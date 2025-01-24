'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { ContainerGrid } from "../layout/ContainerGrid";
import { Paragraph } from "../typrography/Paragraph";
import { LinkCustom } from "../ui/LinkCustom";
import { Clock } from "../widgets/Clock";
import { Heading } from "../typrography/Heading";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SMyHistory() {
    const [isExpanded, setIsExpanded] = useState(false); // Controle de "continuar lendo"
    const [parallaxY, setParallaxY] = useState(0); // Controle para a animação de paralaxe
    const [isParallaxActive, setIsParallaxActive] = useState(true); // Controle para ativar/desativar paralaxe

    // Configuração de animações GSAP
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        // Animação de entrada para textos
        gsap.fromTo(
            ".my-history-text",
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: ".my-history-section",
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            }
        );

        // Animação de entrada para a imagem
        gsap.fromTo(
            ".my-history-image",
            { opacity: 0, scale: 0.9 },
            {
                opacity: 1,
                scale: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: ".my-history-section",
                    start: "top 50%",
                    toggleActions: "play none none reverse",
                },
            }
        );
    }, []);

    // Detecta se a tela é menor que o breakpoint (768px)
    useEffect(() => {
        const handleResize = () => {
            setIsParallaxActive(window.innerWidth >= 768); // Ativa paralaxe apenas em telas maiores
        };

        handleResize(); // Verifica no carregamento
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // Função de paralaxe
    useEffect(() => {
        if (!isParallaxActive) return;

        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setParallaxY(scrollPosition * 0.08);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isParallaxActive]);

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <section className="pt-6 md:pt-28 my-history-section">
            <ContainerGrid className="flex flex-col">
                <div className="relative -bottom-4 z-20">
                    <Paragraph
                        size="large"
                        color="white"
                        className="text-base leading-normal my-history-text"
                    >
                        Olá, pessoal, <br />
                        Sou Luiz Antônio, um jovem de 20 anos nascido e criado no interior de Minas Gerais, em uma cidade com menos de 7 mil habitantes. Crescer em um ambiente tão pequeno me motivou a buscar conhecimento além das fronteiras da minha realidade. Todos os dias, percorro 100 km para chegar à faculdade, onde estudo Bacharelado em Sistemas de Informação e sigo em busca de evolução constante. Já atuo na área de desenvolvimento e web design há mais de dois anos, absorvendo tudo que posso para me tornar um profissional cada vez mais capacitado.
                    </Paragraph>
                </div>

                {/* Seção da imagem com paralaxe */}
                <div className="relative flex flex-col items-start justify-between gap-10 w-full h-full md:flex-row">
                    <div className="relative w-full h-450 bg-gradient-black-white overflow-hidden rounded-lg md:sticky md:top-0 md:h-700 2xl:top-12 my-history-image">
                        <Image
                            src={"/image/MySelf.png"}
                            width={800}
                            height={600}
                            unoptimized
                            alt="Luiz Foto"
                            style={{
                                transform: isParallaxActive ? `translateY(${-parallaxY}px)` : "none",
                                transition: "transform 0.1s ease",
                            }}
                        />
                    </div>

                    <div className="w-full flex flex-col gap-10 py-6 md:py-12">
                        <div className="flex flex-col items-start justify-center gap-5 my-history-text">
                            <Heading as="h3" size="medium" color="white">
                                Minha História
                            </Heading>
                            <Paragraph size="small" color="white">
                                Minha história de vida é marcada por desafios e superações. Meus pais eram surdos e mudos, mas, felizmente, não herdei essa condição. Quando eu tinha apenas 2 anos, minha mãe faleceu, e fui encontrado chorando ao seu lado. 💔 Com a perda, meu pai, que não podia cuidar de mim sozinho, me deixou aos cuidados de meus avós. Durante esse período, fui separado da minha irmã, algo que me marcou profundamente. 🍼
                            </Paragraph>
                            <Paragraph size="small" color="white">
                                Meu pai sempre me visitava, mas, em um triste dia, ele passou mal e, a caminho do hospital, sofreu um acidente dentro da ambulância que o deixou em coma. 🚑 Ele resistiu por um tempo, mas não tive a oportunidade de me despedir, e guardo dele apenas as memórias. 🕊️
                            </Paragraph>

                            {isExpanded && (
                                <>
                                    <Paragraph size="small" color="white">
                                        Na infância, especialmente quando ainda vivia com meus avós, eu era uma criança rebelde, passando boa parte do tempo na rua. 👦 Quando fui morar com minha tia e meu tio (que considero como meus pais), trouxe muitos desafios para eles, pois era muito arteiro. Mesmo assim, eles me educaram com amor e paciência. 🌟 Enfrentei dificuldades na escola e, em certo momento, precisei repetir de ano para conseguir acompanhar os estudos. Mas, graças ao apoio incondicional da minha família, pude crescer e aprender o que significa realmente ter uma família. 🏠
                                    </Paragraph>
                                    <Paragraph size="small" color="white">
                                        Com o tempo, percebi o quanto sou abençoado por ter minha tia Edmara e meu tio João como pais e meu irmão adotivo, Edu, que tanto admiro. Sou grato também pela família dele, com a Amanda e o pequeno Nicolas, a quem adoro ser tio. 🍼 Além disso, encontrei o amor verdadeiro com minha namorada, Ingrid, minha primeira e única namorada, que me mostrou o que é amar de verdade. ❤️
                                    </Paragraph>
                                </>
                            )}
                            <button
                                onClick={toggleReadMore}
                                className="text-red-300 mt-5 hover:underline"
                            >
                                {isExpanded ? "Fechar -" : "Continuar lendo..."}
                            </button>
                        </div>

                        <div className="w-full flex items-center justify-between">
                            <LinkCustom link={"/work"} color={"white"} img={"image/icon-gmail.svg"}>
                                ENTRAR EM CONTATO
                            </LinkCustom>
                            <Clock />
                        </div>
                    </div>
                </div>
            </ContainerGrid>
        </section>
    );
}
