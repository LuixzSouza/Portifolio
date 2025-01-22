import Image from "next/image";
import { Heading } from "../typrography/Heading";
import { Paragraph } from "../typrography/Paragraph";
import { LinkCustom } from "../ui/LinkCustom";

export function SOverflowProjects({ projeto, onClose }) {
    if (!projeto) return null; // Retorna null se não houver projeto selecionado

    const projectImage = projeto.imagem || "/image/MySelf.png";

    return (
        <div className="fixed top-0 w-screen h-screen flex items-center justify-center bg-black/60 z-40" onClick={onClose}>
            <div className="w-5/6 flex flex-col-reverse items-start justify-center gap-12 bg-projetos bg-bottom bg-no-repeat bg-cover p-6 rounded-lg md:flex-row">
                {/* Imagem do projeto */}
                <div className="flex flex-col justify-between w-full h-full">
                    <div className="relative w-full h-44 md:h-96 bg-black rounded-lg overflow-hidden">
                        <Image
                            src={projectImage} // Fallback aplicado corretamente
                            fill
                            style={{ objectFit: "cover" }}
                            alt={`Imagem do projeto ${projeto.nome}` || "Imagem do Projeto"}
                        />
                    </div>
                    <div className="flex items-center justify-between w-full pt-5">
                        <div className="flex items-center justify-center gap-5">
                            <LinkCustom img={"image/icon-linkedin.svg"} link={projeto.links.linkedin} color="white">
                                LINKEDIN
                            </LinkCustom>
                            <LinkCustom img={"image/icon-github.svg"} link={projeto.links.github} color="white">
                                GIT HUB
                            </LinkCustom>
                        </div>
                        <LinkCustom img={"image/icon-eye.svg"} link={projeto.links.verProjeto} color="white">
                            VER PROJETO
                        </LinkCustom>
                    </div>
                </div>

                {/* Informações do projeto */}
                <div className="relative w-full h-full flex flex-col items-start justify-between gap-4">
                    <Heading as="h4" size="small" color="white">{projeto.nome}</Heading>
                    <div className="h-28 pr-6 overflow-x-auto md:h-full md:overflow-visible" >
                        <Paragraph size="tiny" color="white"> 
                            {projeto.descricao || "Descrição não disponível."}
                        </Paragraph>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {projeto.tecnologias.map((tec, idx) => (
                            <span key={idx} className="text-sm text-white bg-white/10 p-1 rounded">
                                {tec}
                            </span>
                        ))}
                    </div>
                    <p className="text-white">{projeto.data || "Data não especificada"}</p>

                    {/* Botão de fechar */}
                    <div className="absolute top-0 right-0">
                        <button className="text-4xl text-white hover:scale-110 hover:text-red-600 hover:rotate-90 duration-150 transition-all ease-linear" onClick={onClose}>
                            &times;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
