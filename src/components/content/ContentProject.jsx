import { Heading } from "@/components/typrography/Heading"//ok
import { Paragraph } from "@/components/typrography/Paragraph";//ok
import Image from "next/image";
import {Category} from "@/components/buttons/Category"

export function RetangleProjects({nome, img, categoryies}) {
    return(
        <div className="flex flex-col items-center justify-center w-full h-550" >
            <div className="relative w-full max-w-900 h-450 overflow-hidden rounded-lg group cursor-cursoClick border-2 border-black" >
                <div className="relative w-full h-full bg-black z-10 transition-all duration-200 ease-in group-hover:scale-110">
                    <Image src={`/image/${img}`} width={400} height={440} alt='PROJETO' className="w-full h-full" />
                </div>
                <div className="absolute -bottom-1/3 left-0 p-11 w-full h-full flex opacity-0 items-end justify-between transition-all duration-200 ease-in group-hover:bg-gradient-black group-hover:opacity-100 group-hover:bottom-0 z-20" >
                    <Heading as="h4" size="small" color="white" >{nome}</Heading>
                    <div className="flex items-end justify-end w-full" >
                        <Paragraph size="litlleSmall" color="white" className={"text-right"} ><Category>{categoryies}</Category></Paragraph>
                    </div>
                </div>
            </div>
        </div>
    )
}