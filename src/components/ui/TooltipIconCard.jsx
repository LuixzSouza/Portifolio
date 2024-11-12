import Image from "next/image";

export function TooltipIconCard({img, text, marg, posit, widt, rotate, hovx, setaPosit }) {
    return (
        <div className="relative group" >
            <Image src={img} width={80} height={80} alt="Icone" className={`${marg}`} />
            <div className={`absolute top-0 ${posit} ${widt} h-auto border border-bluePrimary rounded-lg opacity-0 group-hover:opacity-100 ${hovx} group-hover:translate-x-0 duration-200 ease-out p-1`} >
                <Image src={"/icons/icon-projetos/Polygon_text.svg"} width={20} height={20} alt="Polig" className={`absolute ${setaPosit} ${rotate} top-2/4`} />
                <p className="text-white font-roobert" >{text}</p>
            </div>
        </div>
    )
}