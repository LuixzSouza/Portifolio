import Link from "next/link";

export function LinkCustomBlack() {
    return (
        <div className="relative group inline-block cursor-pointer">
            <Link 
                href={"/work"} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`text-lg font-medium text-black no-underline`}
            >
                LER MAIS
            </Link>
            <div className="absolute left-0 bottom-0 w-0 h-[2px] bg-black opacity-80 group-hover:w-full transition-all duration-300 ease-out"></div>
            <div className="absolute left-0 bottom-0 w-full h-[2px] bg-black/10" ></div>
        </div>
    )
}