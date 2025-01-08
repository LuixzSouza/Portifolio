"use client"; // Para habilitar hooks e estado


// React
import { useEffect, useRef, useState } from "react";

// Componentes
import { StimeLine } from "@/components/sections/StimeLine";

const stepsData = [
  {
    stepNumber: "01",
    title: "Primeiros Passos na Programação",
    date: "2021",
    heading: "Primeiros Passos na Programação",
    paragraph: `
      Início das descobertas no universo da programação por meio de <strong >cursos gratuitos no YouTube</strong>. 
      Foi nessa fase que a <strong>paixão pelo desenvolvimento web</strong> e pela <strong>resolução de problemas</strong> começou a florescer. 
      Os primeiros contatos práticos envolveram <strong>HTML, CSS e JavaScript</strong>, estabelecendo uma base essencial para projetos futuros.`,
    imgSrc: "/image/timeline-2021.png",
    subImgSrc: "/image/sub-timeline-1.png",
  },
  {
    stepNumber: "02",
    title: "Aprofundamento e Primeiros Projetos",
    date: "2022",
    heading: "Aprofundamento e Primeiros Projetos",
    paragraph: `
      Aprofundamento em <strong>JavaScript</strong> e no <strong>desenvolvimento front-end</strong>, com participação no <strong>curso de Front-end do CodeBoost</strong> para reforçar a base adquirida. 
      Projetos práticos começaram a ganhar vida com <strong>HTML, CSS, JavaScript e SASS</strong>, enquanto estudos iniciais sobre <strong>React</strong> e <strong>Next.js</strong> foram introduzidos.
      Ferramentas como <strong>Tailwind CSS, Bootstrap</strong> e <strong>Styled Components</strong> enriqueceram o processo de criação. 
      Também houve os primeiros experimentos com <strong>Node.js</strong>, expandindo as habilidades para o back-end.`,
    imgSrc: "/image/timeline-2022.png",
    subImgSrc: "/image/sub-timeline-2.png",
  },
  {
    stepNumber: "03",
    title: "Faculdade e Aprendizados Diversificados",
    date: "2023",
    heading: "Começo de Faculdade e Aprendizados Diversificados",
    paragraph: `
      Durante essa fase, projetos passaram a ser desenvolvidos com <strong>TDD (Test-Driven Development)</strong> e <strong>arquitetura limpa</strong>. 
      A exploração de novas ferramentas se intensificou com cursos na <strong>Webflow University</strong> e imersões em <strong>UI/UX</strong>, utilizando <strong>Figma, Invision</strong> e <strong>Canva</strong>.
      A curiosidade também levou à introdução em <strong>Arduino</strong> e aos conceitos básicos de <strong>Python</strong>.
      Experiências com diferentes sistemas operacionais, como <strong>Linux, Windows</strong> e <strong>Debian</strong>, ampliaram a compreensão sobre ambientes de desenvolvimento.`,
    imgSrc: "/image/timeline-2023.png",
    subImgSrc: "/image/sub-timeline-3.png",
  },
  {
    stepNumber: "04",
    title: "Primeiras Experiências Profissionais e Faculdade",
    date: "2024",
    heading: "Primeiras Experiências Profissionais e Faculdade",
    paragraph: `
      O aprendizado em <strong>MySQL</strong> foi aprofundado, explorando <strong>comandos e consultas</strong> para manipulação de dados. 
      Os estudos em <strong>Java</strong> destacaram a aplicação dos <strong>princípios SOLID</strong>, utilizando <strong>IntelliJ IDEA</strong> e <strong>Eclipse</strong> como IDEs principais.
      Experimentos práticos incluíram <strong>testes e projetos publicados no Netlify</strong>.
      Como freelancer para a <strong>Formula Idiomas</strong>, foi desenvolvido um <strong>site dinâmico e responsivo</strong>, além de um <strong>sistema de teste de nivelamento de inglês</strong>.
      O desafio nessa experiência envolveu a <strong>integração de PHP</strong> para envio de formulários. 
      Paralelamente, o <strong>estudo do inglês</strong> foi iniciado para aprimorar habilidades de comunicação.`,
    imgSrc: "/image/timeline-2024.png",
    subImgSrc: "/image/sub-timeline-4.png",
  },
  {
    stepNumber: "05",
    title: "Evolução Contínua",
    date: "2024",
    heading: "Até o Momento",
    paragraph: `
      Em andamento no <strong>4º período do curso de Desenvolvimento de Sistemas de Informação</strong>, a <strong>evolução é constante</strong>. 
      O foco está na aplicação de <strong>boas práticas</strong> para ampliar conhecimentos em <strong>design e desenvolvimento</strong>, sempre buscando novas oportunidades de crescimento.
      A missão atual é conquistar a <strong>primeira oportunidade profissional fixa</strong> na área de tecnologia, transformando aprendizado em impacto real.`,
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
    setIsMounted(true);

    const updateLayout = () => {
      setIsMobile(window.innerWidth < 768);
    };

    updateLayout(); // Verifica no carregamento inicial
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setIsMounted(true);

      if (typeof window === 'undefined') return;

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

          // Atualiza a progressão de cada linha sequencialmente
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

          // Move a trilha horizontalmente conforme o scroll
          const maxTranslateX = trackRef.current.scrollWidth - window.innerWidth;
          if (scrollPercentage > 0) {
            trackRef.current.style.transform = `translateX(-${scrollPercentage * maxTranslateX}px)`;
          } else {
            trackRef.current.style.transform = 'translateX(0)';
          }
        }
      };
      
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      // No mobile, garante que a trilha não seja movida
      if (trackRef.current) {
        trackRef.current.style.transform = 'translateX(0)';
      }
    }
  }, [isMobile, progressArray]);

  if (!isMounted) return null;

  return (
    <div ref={stepsContainerRef} className="steps-container relative z-30 h-full w-full bg-blackTerdy md:h-[500vh]">
      <div className="relative h-full w-full overflow-hidden md:sticky md:top-0 md:h-screen">
        <div ref={trackRef} className="steps-track flex flex-col h-full transition-transform duration-500 ease-out md:flex-row">
          {stepsData.map((timeLiner, index) => (
            <div key={index} className="step-wrapper w-full h-full flex-shrink-0">
              <StimeLine {...timeLiner} lineClass={`line-${index + 1}`} progress={progressArray[index]} isMobile={isMobile} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}