'use client'

// React / Next
import Image from "next/image";

export function HoverableIcon({ src, alt, width = 50, height = 50, onMouseEnter, onMouseLeave, nome, gradient }) {
    return (
        <div className="relative group w-full h-full" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <Image
                src={src}
                width={width}
                height={height}
                alt={alt}
                className="filter grayscale group-hover:scale-110 group-hover:filter-none transition duration-100"
            />
            <div className={`absolute overflow-hidden shadow-sm shadow-black -bottom-14 left-1/2 transform -translate-x-1/2 ${gradient} rounded-full opacity-0 group-hover:opacity-100 -translate-y-9 group-hover:-translate-y-0 transition ease-in-out duration-300`}>
                <div className="relative w-full h-full p-1" >
                    <div className={`absolute inset-0 z-10 blur-sm ${gradient} animate-spin-slow min-w-[200%] min-h-[200%] aspect-ratio-[1/1] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`} ></div>
                    <div className={`relative z-20 w-full h-full rounded-full bg-black p-2 bg-center bg-cover bg-no-repeat flex items-center justify-center`} >
                        <div>
                            <span className="w-full text-base text-white font-roobert font-semibold ">{nome}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
