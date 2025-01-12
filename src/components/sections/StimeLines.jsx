"use client"; // Para habilitar hooks e estado

// React
import { useEffect, useRef, useState } from "react";

// Componentes
import { StimeLine } from "@/components/sections/StimeLine";

const stepsData = [
  {
    stepNumber: "01",
    title: "Explorando o Início da Programação e seus Primeiros Conceitos",
    date: "2021",
    heading: "Primeiros Passos na Programação",
    paragraph: `
      Descoberta inicial: Começo com cursos gratuitos no YouTube, explorando o universo da programação.
      Paixão pelo Desenvolvimento Web: Primeiro contato com HTML, CSS e JavaScript, estabelecendo a base para projetos futuros.
      Resolução de Problemas: Interesse crescente em solucionar desafios e criar soluções.`,
    imgSrc: "/image/timeline-2021.png",
    subImgSrc: "/image/sub-timeline-1.png",
    icons: [
      "/icons/html5.svg", 
      "/icons/CSS3.svg", 
      "/icons/JavaScript.svg"    
    ]
  },
  {
    stepNumber: "02",
    title: "Aprofundando os Estudos e Iniciando Projetos Reais",
    date: "2022",
    heading: "Aprofundamento em Projetos",
    paragraph: `
      Aprimoramento Técnico: Estudo aprofundado de JavaScript e frameworks como React e Next.js.
      Projetos Práticos: Desenvolvimento de aplicações com HTML, CSS, JavaScript, SASS, e introdução a ferramentas como Tailwind CSS.
      Exploração Back-End: Primeiros experimentos com Node.js, expandindo habilidades técnicas.`,
    imgSrc: "/image/timeline-2022.png",
    subImgSrc: "/image/sub-timeline-2.png",
    icons: [
      "/icons/JavaScript.svg",
      "/icons/React.svg",
      "/icons/next.svg",
      "/icons/Sass.svg",
      "/icons/Node.svg",

    ]
  },
  {
    stepNumber: "03",
    title: "Aplicando Metodologias e Ferramentas de Design no Desenvolvimento",
    date: "2023",
    heading: "Faculdade e Novos Desafios",
    paragraph: `
      Novas Metodologias: Uso de TDD (Test-Driven Development) e aplicação de arquitetura limpa.
      UI/UX: Cursos em Webflow e ferramentas como Figma e Canva.
      Tecnologias Diversas: Introdução a Arduino, conceitos básicos de Python e aprofundamento em sistemas operacionais como Linux e Windows.`,
    imgSrc: "/image/timeline-2023.png",
    subImgSrc: "/image/sub-timeline-3.png",
    icons: [
      "/icons/Figma.svg", 
      "/icons/python.svg", 
      "/icons/Linux.svg", 
      "/icons/Windows.svg", 
    ]
  },
  {
    stepNumber: "04",
    title: "Desenvolvimento de Sistemas e Projetos Profissionais",
    date: "2024",
    heading: "Primeiras Experiências Profissionais",
    paragraph: `
      Banco de Dados: Aprendizado de MySQL, com foco em comandos e consultas.
      Projetos Publicados: Criação de sites dinâmicos e responsivos no Netlify, com integração de PHP.
      Experiência Profissional: Desenvolvimento de um sistema de nivelamento de inglês para a Formula Idiomas.
      Desenvolvimento Pessoal: Progresso no estudo de inglês para aprimorar comunicação técnica.`,
    imgSrc: "/image/timeline-2024.png",
    subImgSrc: "/image/sub-timeline-4.png",
    icons: [
      "/icons/mysql.svg", 
      "/icons/netlify.svg", 
      "/icons/PHP.svg", 
      "/icons/duolingo.svg", 
    ]
  },
  {
    stepNumber: "05",
    title: "Aprimorando Habilidades Técnicas e Buscando Novas Oportunidades",
    date: "2025",
    heading: "Evolução Contínua",
    paragraph: `
      Faculdade em Andamento: No 5º período do curso de Desenvolvimento de Sistemas de Informação.
      Práticas Avançadas: Foco na aplicação de boas práticas e no crescimento técnico.
      Objetivo Atual: Conquistar a primeira oportunidade profissional fixa na área de tecnologia.`,
    imgSrc: "/image/timeline-moment.png",
    subImgSrc: "/image/sub-timeline-5.png",
  },
];


export function StimeLines() {
  const trackRef = useRef(null);
  const stepsContainerRef = useRef(null);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [progressArray, setProgressArray] = useState(Array(stepsData.length).fill(0));
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("scrollPercent", scrollPercent);
    }
  }, [scrollPercent, isMounted]);

  useEffect(() => {
    setIsMounted(true);

    const updateLayout = () => {
      setIsMobile(window.innerWidth < 768);
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      const handleScroll = () => {
        if (!stepsContainerRef.current || !trackRef.current) return;

        const containerTop = stepsContainerRef.current.getBoundingClientRect().top;
        const containerHeight = stepsContainerRef.current.offsetHeight;
        const windowHeight = window.innerHeight;

        const isInViewport = containerTop < windowHeight && containerTop + containerHeight > 0;

        if (isInViewport) {
          const maxScroll = containerHeight - windowHeight;
          const scrolled = window.scrollY - stepsContainerRef.current.offsetTop;
          const scrollPercentage = Math.min(scrolled / maxScroll, 1);

          setScrollPercent(scrollPercentage);

          const newProgressArray = progressArray.map((progress, index) => {
            const stepStart = index / stepsData.length;
            const stepEnd = (index + 1) / stepsData.length;
            if (scrollPercentage >= stepStart && scrollPercentage < stepEnd) {
              return Math.min(((scrollPercentage - stepStart) / (stepEnd - stepStart)) * 100, 100);
            } else if (scrollPercentage >= stepEnd) {
              return 100;
            } else {
              return 0;
            }
          });

          setProgressArray(newProgressArray);

          const maxTranslateX = trackRef.current.scrollWidth - window.innerWidth;
          trackRef.current.style.transform = `translateX(-${scrollPercentage * maxTranslateX}px)`;
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      if (trackRef.current) {
        trackRef.current.style.transform = "translateX(0)";
      }
    }
  }, [isMobile, progressArray]);

  return (
    <div ref={stepsContainerRef} className="steps-container relative z-30 h-full w-full bg-blackTerdy md:h-[500vh]">
      <div className="relative h-full w-full overflow-hidden md:sticky md:top-0 md:h-screen">
        <div ref={trackRef} className="steps-track flex flex-col h-full transition-transform duration-500 ease-out md:flex-row">
          {stepsData.map((timeLiner, index) => (
            <div key={index} className="step-wrapper w-full h-full flex-shrink-0">
              <StimeLine {...timeLiner} lineClass={`line-${index + 1}`} progress={progressArray[index]} isMobile={isMobile} iconSrcs={timeLiner.icons} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}