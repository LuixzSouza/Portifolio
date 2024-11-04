import Image from "next/image";
import { Heading } from "../typrography/Heading";
import { Category } from "../buttons/Category";
import { LinkCustom } from "../ui/LinkCustom";
import { BotaoPrimary } from "../buttons/Botao";
import { ContainerGrid } from "../layout/ContainerGrid";

export function SProjetosRetangle() {
    return (
        <section>
            <ContainerGrid>
                <div className="flex items-center justify-between w-full bg-white/5 rounded-full p-3 mb-10" >
                    <input type="text" placeholder="PESQUISE PROJETP" className="w-full bg-transparent text-white focus:outline-none " />
                    <div className="w-full max-w-max p-3 bg-white/10 rounded-full" >
                        <span className="text-white" >PESQUISAR</span>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-10" >
                    <div className="flex flex-col items-center justify-center" >
                        <div>
                            <Image src={`/image/p-formula-idioma.png`} width={700} height={600} alt="projeto"/>
                        </div>
                        <div className="bg-white/5 w-full h-full p-4 flex flex-col items-start justify-center gap-5" >
                            <Heading as="h4" size="small" color="white">Projeto formula</Heading>
                            <div>
                                <Category>BRANDING</Category>
                                <Category>html</Category>
                                <Category>CSS</Category>
                                <Category>JS</Category>
                                <Category>REACT</Category>
                            </div>
                            <div className="flex items-center justify-between w-full pt-5" >
                                <div className="flex items-center justify-center gap-5" >
                                    <LinkCustom link={"/"} color={'white'}>SOBRE</LinkCustom>
                                    <LinkCustom link={"/"} color={'white'}>GIT HUB</LinkCustom>
                                </div>
                                <LinkCustom link={"/"} color={'white'}>VER PROJETO</LinkCustom>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center" >
                        <div>
                            <Image src={`/image/p-formula-idioma.png`} width={700} height={600} alt="projeto"/>
                        </div>
                        <div className="bg-white/5 w-full h-full p-4 flex flex-col items-start justify-center gap-5" >
                            <Heading as="h4" size="small" color="white">Projeto formula</Heading>
                            <div>
                                <Category>BRANDING</Category>
                                <Category>html</Category>
                                <Category>CSS</Category>
                                <Category>JS</Category>
                                <Category>REACT</Category>
                            </div>
                            <div className="flex items-center justify-between w-full pt-5" >
                                <div className="flex items-center justify-center gap-5" >
                                    <LinkCustom link={"/"} color={'white'}>SOBRE</LinkCustom>
                                    <LinkCustom link={"/"} color={'white'}>GIT HUB</LinkCustom>
                                </div>
                                <LinkCustom link={"/"} color={'white'}>VER PROJETO</LinkCustom>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center" >
                        <div>
                            <Image src={`/image/p-formula-idioma.png`} width={700} height={600} alt="projeto"/>
                        </div>
                        <div className="bg-white/5 w-full h-full p-4 flex flex-col items-start justify-center gap-5" >
                            <Heading as="h4" size="small" color="white">Projeto formula</Heading>
                            <div>
                                <Category>BRANDING</Category>
                                <Category>html</Category>
                                <Category>CSS</Category>
                                <Category>JS</Category>
                                <Category>REACT</Category>
                            </div>
                            <div className="flex items-center justify-between w-full pt-5" >
                                <div className="flex items-center justify-center gap-5" >
                                    <LinkCustom link={"/"} color={'white'}>SOBRE</LinkCustom>
                                    <LinkCustom link={"/"} color={'white'}>GIT HUB</LinkCustom>
                                </div>
                                <LinkCustom link={"/"} color={'white'}>VER PROJETO</LinkCustom>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center" >
                        <div>
                            <Image src={`/image/p-formula-idioma.png`} width={700} height={600} alt="projeto"/>
                        </div>
                        <div className="bg-white/5 w-full h-full p-4 flex flex-col items-start justify-center gap-5" >
                            <Heading as="h4" size="small" color="white">Projeto formula</Heading>
                            <div>
                                <Category>BRANDING</Category>
                                <Category>html</Category>
                                <Category>CSS</Category>
                                <Category>JS</Category>
                                <Category>REACT</Category>
                            </div>
                            <div className="flex items-center justify-between w-full pt-5" >
                                <div className="flex items-center justify-center gap-5" >
                                    <LinkCustom link={"/"} color={'white'}>SOBRE</LinkCustom>
                                    <LinkCustom link={"/"} color={'white'}>GIT HUB</LinkCustom>
                                </div>
                                <LinkCustom link={"/"} color={'white'}>VER PROJETO</LinkCustom>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center" >
                        <div>
                            <Image src={`/image/p-formula-idioma.png`} width={700} height={600} alt="projeto"/>
                        </div>
                        <div className="bg-white/5 w-full h-full p-4 flex flex-col items-start justify-center gap-5" >
                            <Heading as="h4" size="small" color="white">Projeto formula</Heading>
                            <div>
                                <Category>BRANDING</Category>
                                <Category>html</Category>
                                <Category>CSS</Category>
                                <Category>JS</Category>
                                <Category>REACT</Category>
                            </div>
                            <div className="flex items-center justify-between w-full pt-5" >
                                <div className="flex items-center justify-center gap-5" >
                                    <LinkCustom link={"/"} color={'white'}>SOBRE</LinkCustom>
                                    <LinkCustom link={"/"} color={'white'}>GIT HUB</LinkCustom>
                                </div>
                                <LinkCustom link={"/"} color={'white'}>VER PROJETO</LinkCustom>
                            </div>
                        </div>
                    </div>
                </div>
            </ContainerGrid>
        </section>
    )
}