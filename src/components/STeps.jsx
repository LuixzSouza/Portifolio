"use client"; // Para habilitar hooks e estado

import { useEffect, useRef, useState } from "react";
import Step from "./Step"; // Importando o componente Step

const stepsData = [
  {
    stepNumber: "01",
    title: "Primeiros Passos na Programação",
    heading: "2021 – Primeiros Passos na Programação",
    paragraph: `
      Início das descobertas no universo da programação por meio de **cursos gratuitos no YouTube**. 
      Foi nessa fase que a paixão pelo **desenvolvimento web** e pela **resolução de problemas** começou a florescer. 
      Os primeiros contatos práticos envolveram **HTML**, **CSS** e **JavaScript**, estabelecendo uma base essencial para projetos futuros.`,
    imgSrc: "/image/timeline-2021.png",
  },
  {
    stepNumber: "02",
    title: "Aprofundamento e Primeiros Projetos",
    heading: "2022 – Aprofundamento e Primeiros Projetos",
    paragraph: `
      Aprofundamento em **JavaScript** e no desenvolvimento **front-end**, com participação no curso de **Front-end do CodeBoost** para reforçar a base adquirida. 
      Projetos práticos começaram a ganhar vida com **HTML**, **CSS**, **JavaScript** e **SASS**, enquanto estudos iniciais sobre **React** e **Next.js** foram introduzidos.
      Ferramentas como **Tailwind CSS**, **Bootstrap** e **Styled Components** enriqueceram o processo de criação. 
      Também houve os primeiros experimentos com **Node.js**, expandindo as habilidades para o **back-end**.`,
    imgSrc: "/image/timeline-2022.png",
  },
  {
    stepNumber: "03",
    title: "Faculdade e Aprendizados Diversificados",
    heading: "2023 – Começo de Faculdade e Aprendizados Diversificados",
    paragraph: `
      Durante essa fase, projetos passaram a ser desenvolvidos com **TDD (Test-Driven Development)** e **arquitetura limpa**. 
      A exploração de novas ferramentas se intensificou com cursos na **Webflow University** e imersões em **UI/UX**, utilizando **Figma**, **Invision** e **Canva**.
      A curiosidade também levou à introdução em **Arduino** e aos conceitos básicos de **Python**.
      Experiências com diferentes sistemas operacionais, como **Linux**, **Windows** e **Debian**, ampliaram a compreensão sobre ambientes de desenvolvimento.`,
    imgSrc: "/image/timeline-2023.png",
  },
  {
    stepNumber: "04",
    title: "Primeiras Experiências Profissionais e Faculdade",
    heading: "2024 – Primeiras Experiências Profissionais e Faculdade",
    paragraph: `
      O aprendizado em **MySQL** foi aprofundado, explorando comandos e consultas para manipulação de dados. 
      Os estudos em **Java** destacaram a aplicação dos princípios **SOLID**, utilizando **IntelliJ IDEA** e **Eclipse** como IDEs principais.
      Experimentos práticos incluíram testes e projetos publicados no **Netlify**.
      Como **freelancer** para a **Formula Idiomas**, foi desenvolvido um **site dinâmico e responsivo**, além de um **sistema de teste de nivelamento de inglês**.
      O desafio nessa experiência envolveu a integração de **PHP** para envio de formulários. 
      Paralelamente, o estudo do **inglês** foi iniciado para aprimorar habilidades de comunicação.`,
    imgSrc: "/image/timeline-2024.png",
  },
  {
    stepNumber: "05",
    title: "Evolução Contínua",
    heading: "Até o Momento –",
    paragraph: `
      Em andamento no **4º período** do curso de **Desenvolvimento de Sistemas de Informação**, a evolução é constante. 
      O foco está na aplicação de boas práticas para ampliar conhecimentos em **design** e **desenvolvimento**, sempre buscando novas oportunidades de crescimento.
      A missão atual é conquistar a **primeira oportunidade profissional fixa** na área de tecnologia, transformando aprendizado em impacto real.`,
    imgSrc: "/image/timeline-moment.png",
  },
];


export function Steps() {
  const trackRef = useRef(null);
  const stepsContainerRef = useRef(null);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Garante que só será renderizado no cliente

    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      if (!stepsContainerRef.current || !trackRef.current) return;

      const containerTop = stepsContainerRef.current.getBoundingClientRect().top;
      const containerHeight = stepsContainerRef.current.offsetHeight;
      const windowHeight = window.innerHeight;

      const isInViewport =
        containerTop < windowHeight && containerTop + containerHeight > 0;

      if (isInViewport) {
        const maxScroll = containerHeight - windowHeight;
        const scrolled = window.scrollY - stepsContainerRef.current.offsetTop;
        const scrollPercentage = Math.min(scrolled / maxScroll, 1);

        setScrollPercent(scrollPercentage);

        const maxTranslateX =
          trackRef.current.scrollWidth - window.innerWidth;

        trackRef.current.style.transform = `translateX(-${
          scrollPercentage * maxTranslateX
        }px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isMounted) return null; // Evita renderização no SSR

  return (
    <div
      ref={stepsContainerRef}
      className="steps-container relative z-30 h-[500vh] w-full bg-white"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-white">
        <div
          ref={trackRef}
          className="steps-track flex h-full transition-transform duration-500 ease-out bg-white"
        >
          {stepsData.map((step, index) => (
            <div
              key={index}
              className="step-wrapper w-screen h-full flex-shrink-0 bg-white"
            >
              <Step {...step} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Steps;