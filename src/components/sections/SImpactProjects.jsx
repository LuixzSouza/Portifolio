'use client';

import Image from 'next/image';

import { useEffect, useRef } from 'react';
import { Heading } from '@/components/typrography/Heading';
import { Paragraph } from '@/components/typrography/Paragraph';
import { ContainerGrid } from '@/components/layout/ContainerGrid';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

const bgClasses = {
  html: 'bg-neutral-900',
  css: 'bg-neutral-900',
  js: 'bg-neutral-900',
  react: 'bg-neutral-900',
  sass: 'bg-neutral-900',
  next: 'bg-neutral-900',
};

const gradientClasses = {
  html: 'bg-gradient-html',
  css: 'bg-gradient-css',
  js: 'bg-gradient-js',
  react: 'bg-gradient-react',
  sass: 'bg-gradient-sass',
  next: 'bg-gradient-next',
};

const elements = [
  { maxWidth: '20vw', height: '26vw', left: '5%', top: '0', fill: 'html', nome: 'HTML 5', z: 1 },
  { maxWidth: '25vw', height: '16vw', right: '10%', top: '5%', fill: 'js', nome: 'JavaScript', z: 2 },
  { maxWidth: '20vw', height: '35vw', right: '5%', top: '20%', fill: 'css', nome: 'CSS 3', z: 1 },
  { maxWidth: '30vw', height: '35vw', left: '-10%', bottom: '15%', fill: 'react', nome: 'React', z: 1 },
  { maxWidth: '25vw', height: '25vw', left: '40%', bottom: '5%', fill: 'sass', nome: 'SASS', z: 1 },
  { maxWidth: '25vw', height: '30vw', right: '15%', bottom: '10%', fill: 'next', nome: 'Next.js', z: 1 },
];

export function CreateImpactProjects() {
  const elementRefs = useRef([]);
  const sectionRef = useRef(null); // Adicionando a referência para a section
  const subTitleRef = useRef(null); // Adicionando a referência para a section
  const titleRef = useRef(null); // Adicionando a referência para a section

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  
    const subTitle = subTitleRef.current;
    const title = titleRef.current;
  
    // Animando a borda e a visibilidade
    gsap.to(sectionRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 30%',
        end: 'bottom top',
        scrub: true, // Para scrubbing suave
        onEnter: () => {
          // Quando a seção entra na tela, remova a borda suavemente
          gsap.to(sectionRef.current, { 
            borderRadius: "0%", // Anima a borda de volta ao 0%
            duration: 0.6, // Duração da animação
            ease: "power2.inOut", // Suaviza a animação
          });
        },
        onLeaveBack: () => {
          // Quando a seção sai de volta, restaurar o borda redonda
          gsap.to(sectionRef.current, { 
            borderRadius: "55rem", // Borda arredondada de volta
            duration: 0.6, 
            ease: "power2.inOut", 
          });
        },
      },
    });
  
    // Animações separadas
    gsap.fromTo(subTitle, 
      {
        opacity: 0,
        y: -100,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: subTitle,
          start: 'top 10%',
        }
      }
    );
  
    // Animações com ScrollTrigger para title
    gsap.fromTo(title,
      {
        opacity: 0,
        y: -100,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: title,
          start: 'top 3%',
        }
      }
    );
  }, []);
  
  
  return (
    <section ref={sectionRef} className="relative z-30 bg-black w-full h-[300vh] rounded-t-full">
      <ContainerGrid className="sticky top-0 w-full h-screen flex flex-col items-center justify-center text-center">
        <div ref={subTitleRef} >
          <Paragraph size="litlleSmall" color="white">
            TRANSDORMANDO IDEIAS EM SOLUÇÕES DIGITAIS
          </Paragraph>
        </div>
        <div ref={titleRef} >
          <Heading as="h2" size="medium" color='white' className='text-center'>
            Desenvolvo cada projeto em uma solução exclusiva, onde conceitos e estratégia se conectam para gerar produto unico.
          </Heading>
        </div>
      </ContainerGrid>

      <div className="absolute left-0 w-full h-[200vh] overflow-hidden lg:p-24">
        <div className="relative w-screen h-[170vh]">
          {elements.map((item, index) => (
            <div
              key={index}
              ref={(el) => (elementRefs.current[index] = el)}
              className={`absolute w-full overflow-hidden shadow-lgw- shadow-black rounded-lg transition-all duration-700 ease-in-out group hover:scale-110`}
              style={{
                zIndex: `z-${item.z}`,
                maxWidth: item.maxWidth,
                height: item.height,
                opacity: 1,
                ...(item.left && { left: item.left }),
                ...(item.right && { right: item.right }),
                ...(item.top && { top: item.top }),
                ...(item.bottom && { bottom: item.bottom }),
              }}
            >
              <div className="relative w-full h-full p-1">
                <div className={`absolute inset-0 z-10 blur-sm ${gradientClasses[item.fill]} animate-spin-slow min-w-[200%] min-h-[200%] aspect-ratio-[1/1] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`} />
                <div className={`relative z-20 w-full h-full rounded-lg ${bgClasses[item.fill]} bg-center bg-cover bg-no-repeat flex items-center justify-center`}>
                  <div className="flex flex-col items-center justify-center text-center">
                    <Image
                      src={`/image/icon-${item.fill}.svg`}
                      width={50}
                      height={50}
                      alt={item.nome}
                      priority={true}
                    />
                    <Heading size="tiny" color="white" lineHeight="relaxed">
                      {item.nome}
                    </Heading>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
