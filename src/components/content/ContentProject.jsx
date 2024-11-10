// Next
import Image from "next/image";

// Componente
import {Category} from "@/components/buttons/Category";
import { Heading } from "@/components/typrography/Heading";
import { Paragraph } from "@/components/typrography/Paragraph";
import { LinkCustomBlack } from "@/components/ui/LinkCustomBlack";

export function RetangleProjects({nome, img, resum, idProjeto}) {
    return(
        <div className="flex flex-col items-center justify-center w-full h-550" >
            <div className="flex flex-col items-center justify-center relative w-full max-w-900 h-550 overflow-hidden group cursor-cursoClick border-2 border-bluePrimary bg-black p-6 rounded-lg" >
                <div className="flex items-center justify-between w-full h-550 pb-6" >
                    <Heading as="h4" size="small" color="white" className="font-semibold" >{nome}</Heading>
                    <span className="w-full text-white/70  font-roobert text-end" >{idProjeto}</span>
                </div>
                <div className="relative w-full h-550 overflow-hidden" >
                    <Image src={`/image/${img}`} width={1200} height={550} alt="Projeto" className="w-full h-550" />
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-black flex items-center justify-center opacity-0 group-hover:opacity-100 ease duration-200" >
                        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white border border-black group-hover:scale-110 duration-300 ease-in-out" >
                            <span className="text-6xl" >+</span>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col items-start justify-center gap-4 pb-6 pt-6" >
                    <Paragraph size="small" className={"text-white/70"}>{resum}</Paragraph> 
                    <LinkCustomBlack/>
                </div>
            </div>
        </div>
    )
}