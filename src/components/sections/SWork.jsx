// Componentes
import { Slider } from "@/components/sliders/Slider";
import { Heading } from "@/components/typrography/Heading";
import { ContainerGrid } from "@/components/layout/ContainerGrid";
import { TooltipIconCard } from "@/components/ui/TooltipIconCard"

export function SectionWork() {
    return (
        // Importante lembrar se tiver overflow hidden a animação pode vir a não acontecer
        <section className="relative z-30 bg-black w-full h-full py-16 md:py-0" >
            <div className={"relative flex flex-col items-center justify-center"} >
                <div className="sticky top-0 w-full h-auto pb-16 flex flex-col items-center justify-center overflow-hidden" >
                    <ContainerGrid className={"flex flex-col gap-16 md:gap-0"} >
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
                        <div className="flex flex-col items-start justify-center my-1" >
                            <span className="text-6xl font-roobert text-bluePrimary/80 font-semibold" >Explore os</span>
                            <Heading as="h2" size="xlarge" color="white" lineHeight="none" >PROJETOS</Heading>
                        </div>
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
                        <div className="flex h-auto md:hidden" >
                            <Slider/>
                        </div>
                    </ContainerGrid>
                </div>
                <ContainerGrid className={"hidden md:flex"} >
                    <Slider/>
                </ContainerGrid>
            </div>
        </section>
    )
}