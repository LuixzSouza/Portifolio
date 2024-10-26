import Image from "next/image";
import Link from "next/link";

export function LinkCustom({ link, children, color, img, nomeimg }) {
  return (
    <div className="relative group inline-block cursor-pointer">
      <Link 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer"
        className={`text-lg font-medium text-${color} no-underline`}
      >
        {children}
      </Link>
      <div className="absolute left-0 bottom-0 w-0 h-[2px] bg-white opacity-80 group-hover:w-full transition-all duration-300 ease-out"></div>
      <div className="absolute left-0 bottom-0 w-full h-[2px] bg-white/10" ></div>
      <div className="absolute -right-[15px] -top-[15px] rotate-12 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out" >
        <Image src={`/${img}`} width={25} height={25} alt={`${nomeimg}`}/>
      </div>
    </div>
  );
}
