// Next
import Image from "next/image";

// Componente
import { Heading } from "@/components/typrography/Heading";
import Link from "next/link";

export function RetangleProjects({nome, img, link}) {
    return(
        <Link href={link} target="_blank" className="flex flex-col items-center justify-center w-full h-370 group border-2 border-[#2d2e2f] bg-[#0f0f0f] p-6 rounded-lg group md:h-550" >
            <div className="flex flex-col items-center justify-center relative w-full h-full overflow-hidden" >
                <div className="relative w-full h-full overflow-hidden rounded-lg" >
                <Image
                        src={`/${img}`}
                        fill
                        style={{ objectFit: "cover" }}
                        unoptimized
                        alt="Projeto"
                        className="group-hover:scale-105 transition-all duration-300 ease-in-out"
                    />
                </div>
            </div>
            <div className="flex items-center justify-between w-full h-auto py-3" >
                <Heading as="h4" size="tiny" color="white" className="font-semibold" >{nome}</Heading>
                <div className="relative group inline-block cursor-pointer">
                    <div 
                        className={`text-lg font-medium text-white no-underline`}
                    >
                        EXPLORAR
                    </div>
                    <div className="absolute left-0 bottom-0 w-0 h-[2px] bg-white opacity-80 group-hover:w-full transition-all duration-300 ease-out"></div>
                    <div className="absolute left-0 bottom-0 w-full h-[2px] bg-white/10" ></div>
                    <div className="absolute -right-[15px] -top-[15px] rotate-12 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out" >
                        <Image src={"/image/icon-eye.svg"} width={25} height={25} alt={"icon olho"}/>
                    </div>
                </div>
            </div>
        </Link>
    )
}