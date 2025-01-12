

// Next - React
import Image from "next/image";

// Compononetes
import { Heading } from "../typrography/Heading";
import { Category } from "../buttons/Category";

export function DivProjeto({ nome, imagem, tecnologias, onClick }) {
    return (
        <div onClick={onClick} className="relative h-480 flex flex-col items-center justify-center border rounded-lg overflow-hidden cursor-pointer hover:border-purple-900 hover:scale-105 transition-all duration-300 ease-in-out group" >
            <div className="h-full overflow-hidden" >
                <Image src={imagem || "/image/MySelf.png"} layout="fill" objectFit="cover" alt={nome || "Nome da Imagem"}/>
            </div>
            <div className="absolute bottom-0 bg-black/60 border-transparent w-full h-full p-4 flex flex-col items-center justify-center text-center gap-5 group-hover:opacity-0 transition-all duration-200 ease-in-out" >
                <div className="relative flex flex-col items-center justify-center text-center gap-10" >
                    <Heading as="h4" size="medium" color="white" className="text-center">{nome}</Heading>
                    <div className="flex flex-wrap items-center justify-center gap-2 w-full">
                        {tecnologias.map((tecnologia, index) => (
                            <Category key={index}>{tecnologia}</Category>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}
