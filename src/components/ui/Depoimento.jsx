import React from "react";
import Image from "next/image";
import { Paragraph } from "../typrography/Paragraph";
import { Heading } from "../typrography/Heading";

export const Depoimento = React.forwardRef(({ nome, emprego, depoimento, image, className }, ref) => {
    return (
        <div ref={ref} className={`flex flex-col gap-8 w-full lg:max-w-400 ${className}`}>
            <div className="flex items-center justify-start gap-8 py-8 border-b border-white/50">
                <div className="flex items-center justify-center rounded-full overflow-hidden w-28 h-28">
                    <Image src={image} width={170} height={170} unoptimized alt="Pessoa de Depoimento" />
                </div>
                <div className="flex flex-col gap-1">
                    <Heading as="h6" size="tiny" color="white" lineHeight="normal">{nome}</Heading>
                    <Paragraph size="tiny" className={"text-white/70"}>{emprego}</Paragraph>
                    <Image src={"/image/stars-5.svg"} width={120} height={50} alt="5 Estrela" className="invert" />
                </div>
            </div>
            <Paragraph size="litlleSmall" color="white" className={"w-full"}>⌜ {depoimento} ⌟</Paragraph>
        </div>
    );
});

// Adiciona o displayName para evitar o erro do compilador
Depoimento.displayName = "Depoimento";
