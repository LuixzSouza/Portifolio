// Next
import Image from "next/image";

// Componente
import {Category} from "@/components/buttons/Category";
import { Heading } from "@/components/typrography/Heading";
import { Paragraph } from "@/components/typrography/Paragraph";
import { LinkCustomBlack } from "@/components/ui/LinkCustomBlack";

export function RetangleProjects({nome, img, resum, idProjeto}) {
    return(
        <div className="flex flex-col items-center justify-center w-full h-full" >
            <div className="flex flex-col items-center justify-center relative w-full h-550 overflow-hidden group cursor-cursoClick border-2 border-bluePrimary bg-black p-6 rounded-lg" >
                <div className="relative w-full h-full overflow-hidden" >
                    <Image src={`/image/${img}`} width={1200} height={550} alt="Projeto" />
                </div>
            </div>
            <div className="flex items-center justify-between w-full h-auto pb-6" >
                <Heading as="h4" size="tiny" color="white" className="font-semibold" >{nome}</Heading>
            </div>
        </div>
    )
}