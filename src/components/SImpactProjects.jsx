'use client';

import Image from 'next/image';
import { Paragraph } from '@/components/Paragraph';
import { Heading } from '@/components/Heading';
import { ContainerGrid } from '@/components/ContainerGrid';
import { useEffect, useRef } from 'react';

const bgClasses = {
  html: 'bg-bg-html',
  css: 'bg-bg-css',
  js: 'bg-bg-js',
  react: 'bg-bg-react',
  sass: 'bg-bg-sass',
  next: 'bg-bg-next',
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
  { maxWidth: 330, height: 330, left: 20, top: 0, fill: 'html', nome: 'HTML 5' },
  { maxWidth: 330, height: 330, left: '50%', top: 16, fill: 'css', nome: 'CSS 3' },
  { maxWidth: 330, height: 330, right: 20, top: 56, fill: 'js', nome: 'JavaScript' },
  { maxWidth: 330, height: 330, left: 0, bottom: 28, fill: 'react', nome: 'React' },
  { maxWidth: 330, height: 330, left: '33%', bottom: 0, fill: 'sass', nome: 'SASS' },
  { maxWidth: 330, height: 330, right: 28, bottom: 28, fill: 'next', nome: 'Next.js' },
];

export function CreateImpactProjects() {
  const elementRefs = useRef([]); // Ref para armazenar os elementos

  useEffect(() => {
    const handleScroll = () => {
      elementRefs.current.forEach((el) => {
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calcular a posição entre 0 e 1 com base na rolagem
        const progress = Math.min(Math.max((rect.top / windowHeight), 0), 1);

        // Aplicar o efeito parallax e a opacidade dinamicamente
        el.style.transform = `translateY(${progress * -100}px)`; // Mover para cima
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative z-30 bg-white w-full h-[300vh]">
      <ContainerGrid className="sticky top-0 w-full h-screen flex flex-col items-center justify-center text-center">
        <Paragraph size="litlleSmall" color="black">
          TRANSDORMANDO IDEIAS EM SOLUÇÕES DIGITAIS
        </Paragraph>
        <Heading as="h2" size="medium">
          Transformo cada projeto em uma solução exclusiva, onde inovação e estratégia se conectam para gerar impacto duradouro.
        </Heading>
      </ContainerGrid>

      <div className="absolute left-0 w-full h-screen">
        <div className="relative w-screen h-screen">
          {elements.map((item, index) => (
            <div
              key={index}
              ref={(el) => (elementRefs.current[index] = el)} // Armazenar ref de cada elemento
              className={`absolute w-full overflow-hidden shadow-lgw- shadow-black rounded-lg transition-all duration-700 ease-in-out`} // Adicionado transition para suavizar a animação
              style={{
                maxWidth: `${item.maxWidth}px`,
                height: `${item.height}px`,
                opacity: 1, // Começa visível
                ...(item.left !== undefined && { left: item.left }),
                ...(item.right !== undefined && { right: `${item.right}px` }),
                ...(item.top !== undefined && { top: `${item.top}px` }),
                ...(item.bottom !== undefined && { bottom: `${item.bottom}px` }),
              }}
            >
              <div className="relative w-full h-full p-1">
                <div
                  className={`absolute inset-0 z-10 blur-sm ${gradientClasses[item.fill]} animate-spin-slow min-w-[200%] min-h-[200%] aspect-ratio-[1/1] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
                ></div>

                <div
                  className={`relative z-20 w-full h-full rounded-lg ${bgClasses[item.fill]} bg-center bg-cover bg-no-repeat flex items-center justify-center`}
                >
                  <div className="text-center">
                    <Image
                      src={`/image/icon-${item.fill}.svg`}
                      width={50}
                      height={50}
                      alt={item.nome}
                      priority={true}
                    />
                    <h2>{item.nome}</h2>
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


//Transformando Ideias em Soluções Digitais

//Cada projeto é uma chance de criar algo único e impactante. Combinando inovação e performance,
// desenvolvo soluções personalizadas que fazem a diferença e entregam resultados reais.