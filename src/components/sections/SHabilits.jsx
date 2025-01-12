'use client'

import { useEffect, useState } from 'react';
// Componentes
import { Looping } from '@/components/animations/Looping';
import { ContainerGrid } from '@/components/layout/ContainerGrid';
import { Heading } from '@/components/typrography/Heading';
import { ServiceList } from '@/components/ui/ServiceList';
import { ListHabilits } from '@/components/ui/ListHabilits';
import { BtnGradientAnimate } from '@/components/buttons/BtnGradientAnimate';

export function SHabilits() {
    const allHabilits = [
        { icon: "icons/html5.svg", name: "HTML 5", stars: "image/stars-5.svg" },
        { icon: "icons/css3.svg", name: "CSS 3", stars: "image/stars-5.svg" },
        { icon: "icons/JavaScript.svg", name: "Java Script", stars: "image/stars-5.svg" },
        { icon: "icons/React.svg", name: "React.js", stars: "image/stars-4.svg" },
        { icon: "icons/bootstrap.svg", name: "BootStrap", stars: "image/stars-2.svg" },
        { icon: "icons/C.svg", name: "C", stars: "image/stars-2.svg" },
        { icon: "icons/debian.svg", name: "Debian", stars: "image/stars-2.svg" },
        { icon: "icons/duolingo.svg", name: "Duolingo", stars: "image/stars-5.svg" },
        { icon: "icons/eclipse.svg", name: "Eclipse", stars: "image/stars-3.svg" },
        { icon: "icons/Figma.svg", name: "Figma", stars: "image/stars-5.svg" },
        { icon: "icons/invision.svg", name: "Invision", stars: "image/stars-4.svg" },
        { icon: "icons/java.svg", name: "Java", stars: "image/stars-4.svg" },
        { icon: "icons/Linux.svg", name: "Linux", stars: "image/stars-3.svg" },
        { icon: "icons/mysql.svg", name: "MySQL", stars: "image/stars-4.svg" },
        { icon: "icons/netlify.svg", name: "Netlify", stars: "image/stars-5.svg" },
        { icon: "icons/next.svg", name: "Next.js", stars: "image/stars-4.svg" },
        { icon: "icons/Node.svg", name: "Node.js", stars: "image/stars-4.svg" },
        { icon: "icons/PHP.svg", name: "PHP", stars: "image/stars-3.svg" },
        { icon: "icons/powerpoint.svg", name: "PowerPoint", stars: "image/stars-5.svg" },
        { icon: "icons/python.svg", name: "Python", stars: "image/stars-2.svg" },
        { icon: "icons/Sass.svg", name: "SASS", stars: "image/stars-5.svg" },
        { icon: "icons/styled-components.svg", name: "Styled Components", stars: "image/stars-5.svg" },
        { icon: "icons/vsCode.svg", name: "VS-Code", stars: "image/stars-5.svg" },
        { icon: "icons/Windows.svg", name: "Windows", stars: "image/stars-5.svg" },
        { icon: "icons/wordpress.svg", name: "WordPress", stars: "image/stars-3.svg" },
    ];

    const [visibleItems, setVisibleItems] = useState(12); // Inicia mostrando 3 linhas (3 * 4 itens)

    useEffect(() => {
        const updateVisibleItems = () => {
            if (window.innerWidth >= 1024) {
                setVisibleItems(12); // Exibir 4 itens por linha em telas grandes
            } else if (window.innerWidth >= 768) {
                setVisibleItems(6); // Exibir 3 itens por linha em telas médias
            } else {
                setVisibleItems(4); // Exibir 2 itens por linha em telas pequenas
            }
        };

        updateVisibleItems();
        window.addEventListener('resize', updateVisibleItems);

        return () => {
            window.removeEventListener('resize', updateVisibleItems);
        };
    }, []);

    const handleViewMore = () => {
        console.log('Botão clicado, estado atual:', visibleItems);
        const newCount = visibleItems + 4; // Adiciona mais uma linha de 4 itens
        setVisibleItems(newCount >= allHabilits.length ? allHabilits.length : newCount);
        console.log('Novo estado:', newCount);
    };

    return (
        <section className="relative z-30 bg-[#161616]">
            <ContainerGrid className="text-center flex flex-col items-center justify-center py-28">
                <Heading as='h2' size='medium' className='font-semibold text-blue-700 text-center'>Habilidades & Softwares</Heading>
                <div className='w-full h-full grid grid-cols-2 gap-4 pt-20 md:gap-10  md:grid-cols-3 lg:grid-cols-4'>
                    {allHabilits.slice(0, visibleItems).map((habilit, index) => (
                        <ListHabilits
                            key={index}
                            icon={habilit.icon}
                            name={habilit.name}
                            stars={habilit.stars}
                        />
                    ))}
                </div>
                {visibleItems < allHabilits.length && (
                    <BtnGradientAnimate onClick={handleViewMore} className={"mt-11"} >Ver mais +</BtnGradientAnimate>
                )}
            </ContainerGrid>
            <Looping />
            <ContainerGrid className="text-center flex flex-col items-center justify-center pt-28">
                <Heading as="h2" size="medium" className='font-semibold text-blue-700 text-center'>SERVIÇOS</Heading>
                <ServiceList />
            </ContainerGrid>
        </section>
    );
}
