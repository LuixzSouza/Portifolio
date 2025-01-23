// Next
import Image from "next/image";

// Componente
import { Heading } from "@/components/typrography/Heading";
import Link from "next/link";

export function RetangleProjects({nome, img, link, idProjeto}) {
    return(
        <Link href={link} target="_blank" className="flex flex-col items-center justify-center w-full h-370 group cursor-cursoClick border-2 border-[#2d2e2f] bg-[#0f0f0f] p-6 rounded-lg group md:h-550" >
            <div className="flex flex-col items-center justify-center relative w-full h-full overflow-hidden" >
                <div className="relative w-full h-full overflow-hidden rounded-lg" >
                <Image
                        src={`/${img}`}
                        fill
                        style={{ objectFit: "cover" }}
                        unoptimized
                        alt="Projeto"
                        className="group-hover:scale-110 transition-all duration-200 ease-in-out"
                    />
                </div>
            </div>
            <div className="flex items-center justify-between w-full h-auto py-3" >
                <Heading as="h4" size="tiny" color="white" className="font-semibold" >{nome}</Heading>
                <p className="w-32 text-white" >{idProjeto}</p>
            </div>
        </Link>
    )
}