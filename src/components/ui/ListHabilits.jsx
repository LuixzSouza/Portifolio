import Image from "next/image";
import { Heading } from "../typrography/Heading";

export function ListHabilits({icon, name, stars}) {
    return (
        <div className="bg-black/70 w-full h-full flex flex-col items-center justify-center gap-2 p-6 rounded-lg md:p-12 text-center" >
            <Image src={`/${icon}`} width={65} height={65} alt="Icone"/>
            <Heading as="h6" size="litlle" color="white" className="font-semibold text-center" >{name}</Heading>
            <Image src={`/${stars}`} width={120} height={45} alt="Estrela" className="invert"/>
        </div>
    )
}