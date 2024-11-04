// Componentes
import { Heading } from "../typrography/Heading"

export function InputForm({quest, placehold, tipo}) {
    return (
        <div className="flex items-center justify-between w-full" >
            <Heading as="h4" size="medium" color="white" className="max-w-max leading-tight" >{quest}</Heading>
            <div className="w-full h-full border-b  border-white pt-6 ml-8" >
                <input type={tipo} placeholder={placehold} className="bg-transparent ml-5 text-white w-full focus:outline-none" />
            </div>
        </div>
    )
}