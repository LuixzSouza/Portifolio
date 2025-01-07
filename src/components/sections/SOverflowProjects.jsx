import Image from "next/image";
import { Heading } from "../typrography/Heading";
import { Paragraph } from "../typrography/Paragraph";
import { LinkCustom } from "../ui/LinkCustom";

export function SOverflowProjects({ projeto, onClose }) {
    if (!projeto) return null; // Retorna null se não houver projeto selecionado

    return (
        <div className="fixed top-0 w-screen h-screen flex items-center justify-center bg-black/60 z-40" onClick={onClose}>
            <div className="w-5/6 flex items-start justify-center gap-12 bg-purple-950 p-6 rounded-lg">
                {/* Imagem do projeto */}
                <div className="w-full">
                    <Image
                        src={projeto.imagem || "/image/MySelf.png"}
                        layout="responsive"
                        width={600}
                        height={400}
                        alt={`Imagem do projeto ${projeto.nome}` || "Imagem do Projeto"}
                        className="rounded-lg"
                    />
                    <div className="flex items-center justify-between w-full pt-5">
                        <div className="flex items-center justify-center gap-5">
                            <LinkCustom link={projeto.links.sobre} color="white">
                                SOBRE
                            </LinkCustom>
                            <LinkCustom link={projeto.links.github} color="white">
                                GIT HUB
                            </LinkCustom>
                        </div>
                        <LinkCustom link={projeto.links.verProjeto} color="white">
                            VER PROJETO
                        </LinkCustom>
                    </div>
                </div>

                {/* Informações do projeto */}
                <div className="relative w-full h-full flex flex-col items-start justify-between gap-4">
                    <Heading as="h4" size="small">{projeto.nome}</Heading>
                    <Paragraph size="small">
                        {projeto.descricao || "Descrição não disponível."}
                    </Paragraph>
                    <div className="flex gap-2 flex-wrap">
                        {projeto.tecnologias.map((tec, idx) => (
                            <span key={idx} className="text-sm bg-white/10 p-1 rounded">
                                {tec}
                            </span>
                        ))}
                    </div>
                    <p>{projeto.data || "Data não especificada"}</p>

                    {/* Botão de fechar */}
                    <div className="absolute top-0 right-0">
                        <button className="text-3xl text-white" onClick={onClose}>
                            &times;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
