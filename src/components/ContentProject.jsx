import { Heading } from "@/components/Heading"
import { Paragraph } from "@/components/Paragraph";
import Image from "next/image";

export function RetangleProjects({nome, img}) {
    return(
        <div className="flex flex-col items-center justify-center w-full h-550" >
            <div className="w-full max-w-1018 h-450 overflow-hidden rounded-lg" >
                <div className="w-full h-full bg-red-700">
                    <Image src={`/image/${img}`} width={400} height={440} alt='PROJETO' className="w-full h-full" />
                </div>
            </div>
            <div className="w-full flex items-center justify-between" >
                <Heading as="h4" size="small" color="black" >{nome}</Heading>
                <div className="flex items-end justify-end" >
                    <Paragraph size="litlleSmall" color="black" >CATEGORIA</Paragraph>
                </div>
            </div>
        </div>
    )
}