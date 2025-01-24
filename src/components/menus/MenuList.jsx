// Next
import Image from "next/image";

// Componentes
import { Heading } from "@/components/typrography/Heading";

export function ListMenu({ image, children }) {
    return (
        <div className="w-full group cursor-pointer">
            <div className="relative flex items-start justify-start w-full py-2 gap-9 group-hover:translate-x-16 transition-transform duration-300 ease md:py-0">
                <Heading as="h3" size="menu" color="white" className="max-w-max">
                    {children}
                </Heading>
                <div className="hidden opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out animate-wiggle md:block">
                    <Image src={`${image}`} unoptimized width={150} height={150} alt="Icon" style={{ width: '150px', height: 'auto' }}/>
                </div>
            </div>
        </div>
    );
}
