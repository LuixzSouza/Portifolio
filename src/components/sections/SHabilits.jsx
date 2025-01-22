'use client'

import { useEffect, useState } from 'react';
// Componentes
import { ContainerGrid } from '@/components/layout/ContainerGrid';
import { Heading } from '@/components/typrography/Heading';
import { ServiceList } from '@/components/ui/ServiceList';
import { ListHabilits } from '@/components/ui/ListHabilits';
import { BtnGradientAnimate } from '@/components/buttons/BtnGradientAnimate';
import { TooltipIconCard } from '../ui/TooltipIconCard';

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
                <Heading as='h3' size='tiny' className='font-semibold text-blue-700 text-center'>Minhas ferramentas e competências.</Heading>
                <Heading as='h2' size='medium' className='font-semibold text-white text-center'>Habilidades & Softwares</Heading>
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
                <div className='my-24 w-full h-[1px] bg-white/50' ></div>
                <Heading as='h3' size='tiny' className='font-semibold text-blue-700 text-center'>Como posso ajudar.</Heading>
                <Heading as="h2" size="medium" className='font-semibold text-white text-center'>Alguns Serviços</Heading>
                 <div className='md:py-24' >
                    <div className="hidden w-full sm:flex items-center justify-between" >
                        <TooltipIconCard
                            img={"/icons/icon-projetos/icone_ampulheta.svg"}
                            span={"Gerenciamento de Tempo:"}
                            text={" Priorizando prazos e eficiência em cada projeto."}
                            marg={"mb-20"}
                            posit={"left-full"}
                            widt={"w-56"}
                            hovx={"-translate-x-10"}
                            setaPosit={"right-full"}
                            floatDelay="animate-floating"
                        />
                        <TooltipIconCard 
                            img={"/icons/icon-projetos/icone_chave_martelo.svg"}
                            span={"Ferramentas de Desenvolvimento:"}
                            text={" Personalizando e ajustando cada aplicação para máxima eficiência."}
                            marg={"mb-0"}
                            posit={"left-full"}
                            widt={"w-72"}
                            hovx={"-translate-x-10"}
                            setaPosit={"right-full"}
                            floatDelay="animate-floating1"
                        />
                        <TooltipIconCard 
                            img={"/icons/icon-projetos/icone_computador_codigo.svg"}
                            span={"Desenvolvimento Web Completo:"}
                            text={" Criação de soluções front-end e back-end inovadoras e eficazes."}
                            marg={"mb-20"}
                            posit={"right-full"}
                            widt={"w-64"}
                            hovx={"translate-x-10"}
                            setaPosit={"left-full"}
                            rotate={"rotate-180"}
                            textDirect={"text-right"}
                            floatDelay="animate-floating2"
                        />
                        <TooltipIconCard 
                            img={"/icons/icon-projetos/icone_engrenagens.svg"}
                            span={"Integração de Sistemas:"}
                            text={" Conexões precisa entre serviços, APIs e mais."}
                            marg={"mb-0"}
                            posit={"right-full"}
                            widt={"w-48"}
                            hovx={"translate-x-10"}
                            setaPosit={"left-full"}
                            rotate={"rotate-180"}
                            textDirect={"text-right"}
                            floatDelay="animate-floating3"
                        />
                    </div>
                    <ServiceList />
                    <div className="hidden w-full sm:flex items-center justify-between">
                        <TooltipIconCard 
                            img={"/icons/icon-projetos/icone_fast_relogio.svg"}
                            span={"Velocidade e Precisão:"}
                            text={" Soluções rápidas sem comprometer a qualidade."}
                            marg={"mt-20"}
                            posit={"left-full"}
                            widt={"w-52"}
                            hovx={"-translate-x-10"}
                            setaPosit={"right-full"}
                            floatDelay="animate-floating3"
                        />
                        <TooltipIconCard 
                            img={"/icons/icon-projetos/icone_grafico_crescimento.svg"}
                            span={"Crescimento Contínuo:"}
                            text={" Foco em resultados escaláveis e de alto impacto."}
                            marg={"mt-0"}
                            posit={"left-full"}
                            widt={"w-55"}
                            hovx={"-translate-x-10"}
                            setaPosit={"right-full"}
                            floatDelay="animate-floating2"
                        />
                        <TooltipIconCard 
                            img={"/icons/icon-projetos/icone_lampada.svg"}
                            span={"Ideias Inovadoras Top:"}
                            text={" Soluções criativas para problemas complexos."}
                            marg={"mt-20"}
                            posit={"right-full"}
                            widt={"w-48"}
                            hovx={"translate-x-10"}
                            setaPosit={"left-full"}
                            rotate={"rotate-180"}
                            textDirect={"text-right"}
                            floatDelay="animate-floating1"
                        />
                        <TooltipIconCard 
                            img={"/icons/icon-projetos/icone_pessoa_degraus.svg"}
                            span={"Velocidade com Precisão:"}
                            text={" Soluções rápidas sem comprometer a qualidade."}
                            marg={"mb-0"}
                            posit={"right-full"}
                            widt={"w-52"}
                            hovx={"translate-x-10"}
                            setaPosit={"left-full"}
                            rotate={"rotate-180"}
                            textDirect={"text-right"}
                            floatDelay="animate-floating"
                        />
                    </div>
                 </div>
            </ContainerGrid>
        </section>
    );
}
