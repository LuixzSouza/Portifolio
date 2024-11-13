import Image from "next/image";

export function TooltipIconCard({ img, text, marg, posit, widt, rotate, hovx, setaPosit, span, textDirect, spanFont }) {
    return (
        <div className="relative">
            {/* Coloque a classe 'group' diretamente na imagem */}
            <div className={`inline-block relative group ${marg}`}>
                <Image 
                    src={img} 
                    width={80} 
                    height={80} 
                    alt="Icone" 
                    className={` group-hover:scale-110 ease-in duration-150 mx-5 w-`} 
                />
                {/* Tooltip que só aparece quando o mouse está sobre a imagem */}
                <div className={`absolute top-0 ${posit} ${widt} h-auto border border-bluePrimary rounded-lg opacity-0 group-hover:opacity-100 ${hovx} group-hover:translate-x-0 duration-200 ease-in p-1 pointer-events-none`}>
                    <Image 
                        src={"/icons/icon-projetos/Polygon_text.svg"} 
                        width={20} 
                        height={20} 
                        alt="Polig" 
                        className={`absolute ${setaPosit} ${rotate} top-2/4`} 
                    />
                    <p className={`${textDirect} text-white font-roobert`}><span className="font-bold" >{span}</span>{text}</p>
                </div>
            </div>
        </div>
    );
}
