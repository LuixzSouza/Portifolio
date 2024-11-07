import Image from "next/image";
import { Heading } from "../typrography/Heading";
import { Category } from "../buttons/Category";
import { LinkCustom } from "../ui/LinkCustom";

export function DivProjeto({ nome, imagem, tecnologias, links }) {
    return (
        <div className="flex flex-col items-center justify-center border border-white/30 rounded-lg overflow-hidden" >
            <div>
                <Image src={imagem} width={1000} height={600} alt={nome}/>
            </div>
            <div className="bg-white/5 border border-white/5 w-full h-full p-4 flex flex-col items-start justify-between gap-5" >
                <div className="flex flex-col items-center justify-start gap-10" >
                    <Heading as="h4" size="small" color="white">{nome}</Heading>
                    <div className="flex items-center justify-start gap-2 w-full" >
                        {tecnologias.map((tecnologia, index) => (
                            <Category key={index}>{tecnologia}</Category>
                        ))}
                    </div>
                </div>
                <div className="flex items-center justify-between w-full pt-5" >
                    <div className="flex items-center justify-center gap-5" >
                        <LinkCustom link={links.sobre} color={'white'}>SOBRE</LinkCustom>
                        <LinkCustom link={links.github} color={'white'}>GIT HUB</LinkCustom>
                    </div>
                    <LinkCustom link={links.verProjeto} color={'white'}>VER PROJETO</LinkCustom>
                </div>
            </div>
        </div>
    );
}
