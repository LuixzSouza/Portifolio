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
                        />
                        <div className="relative group" >
                            <Image src={"/icons/icon-projetos/icone_chave_martelo.svg"} width={90} height={80} alt="Icone"/>
                            <div className="absolute top-0 left-full w-80 h-auto border border-bluePrimary rounded-lg opacity-0 group-hover:opacity-100 -translate-x-10 group-hover:translate-x-0 duration-200 ease-out p-1" >
                                <Image src={"/icons/icon-projetos/Polygon_text.svg"} width={20} height={20} alt="Polig" className="absolute right-full top-2/4" />
                                <p className="text-white font-roobert" >Ferramentas de Desenvolvimento: Personalizando e ajustando cada aplicação para máxima eficiência. </p>
                            </div>
                        </div>
                        <div className="relative group" >
                            <Image src={"/icons/icon-projetos/icone_computador_codigo.svg"} width={60} height={80} alt="Icone" className="mb-20"/>
                            <div className="absolute top-0 right-full w-80 h-auto border border-bluePrimary rounded-lg opacity-0 group-hover:opacity-100 translate-x-10 group-hover:translate-x-0 duration-200 ease-out p-1" >
                                <Image src={"/icons/icon-projetos/Polygon_text.svg"} width={20} height={20} alt="Polig" className="absolute left-full top-2/4 rotate-180" />
                                <p className="text-white font-roobert" >Desenvolvimento Web Completo: Criação de soluções front-end e back-end inovadoras.</p>
                            </div>
                        </div>
                        <div className="relative group" >
                            <Image src={"/icons/icon-projetos/icone_engrenagens.svg"} width={85} height={80} alt="Icone"/>
                             <div className="absolute top-0 right-full w-80 h-auto border border-bluePrimary rounded-lg opacity-0 group-hover:opacity-100 translate-x-10 group-hover:translate-x-0 duration-200 ease-out p-1" >
                                <Image src={"/icons/icon-projetos/Polygon_text.svg"} width={20} height={20} alt="Polig" className="absolute left-full top-2/4 rotate-180" />
                                <p className="text-white font-roobert" >Integração de Sistemas: Conexão perfeita entre serviços, APIs e mais.</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-start justify-center my-1" >
                        <span className="text-6xl font-roobert text-bluePrimary/80 font-semibold" >Explore os</span>
                        <Heading as="h2" size="xlarge" color="white" lineHeight="none" >PROJETOS</Heading>
                    </div>
                    <div className="w-full flex items-center justify-between">
                        <div className="relative group mt-20" >
                            <Image src={"/icons/icon-projetos/icone_fast_relogio.svg"} width={85} height={80} alt="Icone" className=""/>
                             <div className="absolute top-0 left-full w-80 h-auto border border-bluePrimary rounded-lg opacity-0 group-hover:opacity-100 -translate-x-10 group-hover:translate-x-0 duration-200 ease-out p-1" >
                                <p className="text-white font-roobert" >Velocidade e Precisão: Soluções rápidas sem comprometer a qualidade.</p>
                            </div>
                        </div>
                        <div className="relative group" >
                            <Image src={"/icons/icon-projetos/icone_grafico_crescimento.svg"} width={60} height={80} alt="Icone"/>
                             <div className="absolute top-0 left-full w-80 h-auto border border-bluePrimary rounded-lg opacity-0 group-hover:opacity-100 -translate-x-10 group-hover:translate-x-0 duration-200 ease-out p-1" >
                                <p className="text-white font-roobert" >Crescimento Contínuo: Foco em resultados escaláveis e de alto impacto.</p>
                            </div>
                        </div>
                        <div className="relative group mt-20" >
                            <Image src={"/icons/icon-projetos/icone_lampada.svg"} width={90} height={80} alt="Icone" className=""/>
                             <div className="absolute top-0 right-full w-80 h-auto border border-bluePrimary rounded-lg opacity-0 group-hover:opacity-100 translate-x-10 group-hover:translate-x-0 duration-200 ease-out p-1" >
                                <p className="text-white font-roobert" >Ideias Inovadoras: Soluções criativas para problemas complexos.</p>
                            </div>
                        </div>
                        <div className="relative group" >
                            <Image src={"/icons/icon-projetos/icone_pessoa_degraus.svg"} width={80} height={80} alt="Icone"/>
                             <div className="absolute top-0 right-full w-80 h-auto border border-bluePrimary rounded-lg opacity-0 group-hover:opacity-100 translate-x-10 group-hover:translate-x-0 duration-200 ease-out p-1" >
                                <p className="text-white font-roobert" >Velocidade e Precisão: Soluções rápidas sem comprometer a qualidade.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sticky top-0 w-full h-screen flex items-center justify-center gap-10 overflow-hidden" >
                    <Slider/>
                </div>
            </ContainerGrid>
        </section>
    )
}