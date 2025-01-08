

// Next - React
import Image from "next/image";

// Compononetes
import { Heading } from "../typrography/Heading";
import { Category } from "../buttons/Category";

export function DivProjeto({ nome, imagem, tecnologias, links, onClick }) {
    return (
        <div onClick={onClick} className="relative h-480 flex flex-col items-center justify-center border border-white/30 rounded-lg overflow-hidden cursor-pointer hover:border-purple-900 hover:scale-105 transition-all duration-300 ease-in-out group" >
            <div className="h-full overflow-hidden" >
                <Image src={imagem || "/image/MySelf.png"} layout="fill" objectFit="cover" alt={nome || "Nome da Imagem"}/>
            </div>
            <div className="absolute bottom-0 bg-black/80 border border-transparent w-full p-4 flex flex-col items-start justify-between gap-5" >
                <div className="relative flex flex-col items-center justify-start gap-10" >
                    <Heading as="h4" size="small" color="white" >{nome}</Heading>
                    <div className="flex items-center justify-start gap-2 w-full" >
                        {tecnologias.map((tecnologia, index) => (
                            <Category key={index}>{tecnologia}</Category>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
