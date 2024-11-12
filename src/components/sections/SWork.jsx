// Componentes
import { Slider } from "@/components/sliders/Slider";
import { Heading } from "@/components/typrography/Heading";
import { ContainerGrid } from "@/components/layout/ContainerGrid";
import { TooltipIconCard } from "@/components/ui/TooltipIconCard"
import Image from "next/image";

export function SectionWork() {
    return (
        // Importante lembrar se tiver overflow hidden a animação pode vir a não acontecer
        <section className="relative z-30 bg-black w-full h-full" >
            <ContainerGrid className={"relative flex flex-col items-center justify-center"} >
                <div className="sticky top-0 w-full h-screen pb-16 flex flex-col items-center justify-center overflow-hidden" >
                    <div className="w-full flex items-center justify-between" >
                        <TooltipIconCard 
                            img={"/icons/icon-projetos/icone_ampulheta.svg"}
                            text={"Gerenciamento de Tempo: Priorizando prazos e eficiência em cada projeto."}
                            marg={"mb-20"}
                            posit={"left-full"}
                            widt={"w-80"}
                            hovx={"-translate-x-10"}
                            setaPosit={"right-full"}
                        />
                        <TooltipIconCard 
                            img={"/icons/icon-projetos/icone_chave_martelo.svg"}
                            text={"Ferramentas de Desenvolvimento: Personalizando e ajustando cada aplicação para máxima eficiência."}
                            marg={"mb-0"}
                            posit={"left-full"}
                            widt={"w-80"}
                            hovx={"-translate-x-10"}
                            setaPosit={"right-full"}
                        />
                        <TooltipIconCard 
                            img={"/icons/icon-projetos/icone_computador_codigo.svg"}
                            text={"Desenvolvimento Web Completo: Criação de soluções front-end e back-end inovadoras."}
                            marg={"mb-20"}
                            posit={"right-full"}
                            widt={"w-80"}
                            hovx={"translate-x-10"}
                            setaPosit={"left-full"}
                            rotate={"rotate-180"}
                        />
                        <TooltipIconCard 
                            img={"/icons/icon-projetos/icone_engrenagens.svg"}
                            text={"Integração de Sistemas: Conexão perfeita entre serviços, APIs e mais."}
                            marg={"mb-0"}
                            posit={"right-full"}
                            widt={"w-80"}
                            hovx={"translate-x-10"}
                            setaPosit={"left-full"}
                            rotate={"rotate-180"}
                        />
                    </div>
                    <div className="flex flex-col items-start justify-center my-1" >
                        <span className="text-6xl font-roobert text-bluePrimary/80 font-semibold" >Explore os</span>
                        <Heading as="h2" size="xlarge" color="white" lineHeight="none" >PROJETOS</Heading>
                    </div>
                    <div className="w-full flex items-center justify-between">
                        <TooltipIconCard 
                            img={"/icons/icon-projetos/icone_fast_relogio.svg"}
                            text={"Velocidade e Precisão: Soluções rápidas sem comprometer a qualidade."}
                            marg={"mt-0"}
                            posit={"left-full"}
                            widt={"w-80"}
                            hovx={"-translate-x-10"}
                            setaPosit={"right-full"}
                        />
                        <TooltipIconCard 
                            img={"/icons/icon-projetos/icone_grafico_crescimento.svg"}
                            text={"Crescimento Contínuo: Foco em resultados escaláveis e de alto impacto."}
                            marg={"mt-0"}
                            posit={"left-full"}
                            widt={"w-80"}
                            hovx={"-translate-x-10"}
                            setaPosit={"right-full"}
                        />
                        <TooltipIconCard 
                            img={"/icons/icon-projetos/icone_lampada.svg"}
                            text={"Ideias Inovadoras: Soluções criativas para problemas complexos."}
                            marg={"mb-0"}
                            posit={"right-full"}
                            widt={"w-80"}
                            hovx={"translate-x-10"}
                            setaPosit={"left-full"}
                            rotate={"rotate-180"}
                        />
                        <TooltipIconCard 
                            img={"/icons/icon-projetos/icone_pessoa_degraus.svg"}
                            text={"Velocidade e Precisão: Soluções rápidas sem comprometer a qualidade."}
                            marg={"mb-0"}
                            posit={"right-full"}
                            widt={"w-80"}
                            hovx={"translate-x-10"}
                            setaPosit={"left-full"}
                            rotate={"rotate-180"}
                        />
                    </div>
                </div>
                <div className="sticky top-0 w-full h-screen flex items-center justify-center gap-10 overflow-hidden" >
                    <Slider/>
                </div>
            </ContainerGrid>
        </section>
    )
}