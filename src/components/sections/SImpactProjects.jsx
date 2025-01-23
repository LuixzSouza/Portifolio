'use client';

import Image from 'next/image';

import { useEffect, useRef } from 'react';
import { Heading } from '@/components/typrography/Heading';
import { Paragraph } from '@/components/typrography/Paragraph';
import { ContainerGrid } from '@/components/layout/ContainerGrid';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import Link from 'next/link';

const elements = [
  { maxWidth: '450px', height: '350px', left: '0%', top: '10%', fill: '1', z: 1, sizeClasses: 'w-[150px] h-[150px] sm:w-[350px] sm:h-[300px] lg:w-[450px] lg:h-[350px]', link: "https://www.formulaidiomas.com.br" },
  { maxWidth: '450px', height: '350px', right: '15%', top: '3%', fill: '2', z: 2, sizeClasses: 'w-[150px] h-[150px] sm:w-[350px] sm:h-[300px] lg:w-[450px] lg:h-[350px]', link: "https://casaprontaconstrusilva.com.br" },
  { maxWidth: '450px', height: '350px', right: '-1%', top: '25%', fill: '3', z: 3, sizeClasses: 'w-[150px] h-[150px] sm:w-[350px] sm:h-[300px] lg:w-[450px] lg:h-[350px] z-30', link: "https://casaprontaconstrusilva.com.br" },
  { maxWidth: '450px', height: '350px', left: '1%', bottom: '15%', fill: '4', z: 1, sizeClasses: 'w-[150px] h-[180px] sm:w-[350px] sm:h-[300px] lg:w-[450px] lg:h-[350px]', link: "https://blizzardluiz.netlify.app" },
  { maxWidth: '450px', height: '350px', left: '35%', bottom: '5%', fill: '5', z: 1, sizeClasses: 'w-[150px] h-[170px] sm:w-[350px] sm:h-[300px] lg:w-[450px] lg:h-[350px]', link: "https://app.netlify.com/sites/faculdadenewluiz/overview" },
  { maxWidth: '450px', height: '350px', right: '5%', bottom: '25%', fill: '6', z: 1, sizeClasses: 'w-[150px] h-[200px] sm:w-[350px] sm:h-[300px] lg:w-[450px] lg:h-[350px]', link: "https://gamisanyluiz.netlify.app" },
];

export function CreateImpactProjects() {
  const elementRefs = useRef([]);
  const sectionRef = useRef(null); // Referência para a seção
  const textsRef = useRef(null)

  useEffect(() => {
    // Registre o ScrollTrigger com o GSAP
    gsap.registerPlugin(ScrollTrigger);
    const texts = textsRef.current;
    const section = sectionRef.current;

    ScrollTrigger.create({
      trigger: section,
      start: "top 20%", // Define quando o trigger será ativado
      onEnter: () => {
        gsap.to(section, {
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          duration: 0.6, // Duração da animação (0.6 segundos)
          ease: "power1.inOut", // Tipo de animação (suave)
        });
      },
      onLeaveBack: () => {
        gsap.to(section, {
          borderTopLeftRadius: "999px", // Borda arredondada novamente
          borderTopRightRadius: "999px",
          duration: 0.4, // Duração da animação
          ease: "power3.inOut", // Tipo de animação
        });
      },
    });

    // Define o estado inicial dos textos
    gsap.set(texts, { opacity: 0, y: 50 });

    ScrollTrigger.create({
      trigger: texts,
      start: "top 50%", // Dispara quando o topo do texto está 80% visível na viewport
      onEnter: () => {
        gsap.to(texts, {
          opacity: 1,
          y: 0, // Move os textos para a posição original
          duration: 0.8, // Duração da animação
          ease: "power1.out", // Suavidade
          stagger: 0.2, // Animação em cascata para os filhos
        });
      },
      onLeaveBack: () => {
        gsap.to(texts, {
          opacity: 0,
          y: 50, // Move os textos para fora novamente
          duration: 0.5,
          ease: "power1.out",
        });
      },
    });

    // Cleanup ao desmontar o componente
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative z-30 bg-black w-full h-[300vh] rounded-lg md:rounded-t-full">
      <ContainerGrid className="sticky top-0 w-full h-screen flex flex-col items-center justify-center text-center">
        <div ref={textsRef} >
          <div>
            <Paragraph size="litlleSmall" color="white">
              TRANSDORMANDO IDEIAS EM SOLUÇÕES DIGITAIS
            </Paragraph>
          </div>
          <div>
            <Heading as="h2" size="medium" color='white' className='text-center'>
              Desenvolvo cada projeto em uma solução exclusiva, onde conceitos e estratégia se conectam para gerar produto unico.
            </Heading>
          </div>
        </div>
      </ContainerGrid>

      <div className="absolute left-0 w-full h-[200vh] overflow-hidden">
        <div className="relative w-full h-[170vh]">
          {elements.map((item, index) => (
            <Link 
            href={item.link}
            key={index}
            ref={(el) => (elementRefs.current[index] = el)}
            className={`absolute rounded-lg ${item.sizeClasses} hover:scale-110 hover:z-40 transition-all duration-300 ease-in-out cursor-pointer`}
            style={{
              zIndex: `z-${item.z}`,
              ...(item.left && { left: item.left }),
              ...(item.right && { right: item.right }),
              ...(item.top && { top: item.top }),
              ...(item.bottom && { bottom: item.bottom }),
            }}
          >
              <div className="relative w-full h-full">
                <div className={`relative z-20 w-full h-full rounded-lg flex items-center justify-center`}>
                  <div className="flex flex-col items-center justify-center text-center">
                    <Image
                      src={`/mockup/mock${item.fill}.png`}
                      fill 
                      unoptimized
                      alt='mockup'
                      priority={true}
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
