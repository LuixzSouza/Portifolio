import Image from "next/image";
import { Heading } from "../typrography/Heading";

export function ListHabilits({icon, name, stars}) {
    return (
        <div className="bg-white w-full h-full flex flex-col items-center justify-center gap-2 p-12 text-center" >
            <Image src={`/${icon}`} width={65} height={65} alt="Icone"/>
            <Heading as="h6" size="litlle" color="black" className="font-semibold text-center" >{name}</Heading>
            <Image src={`/${stars}`} width={120} height={45} alt="Estrela"/>
        </div>
    )
}