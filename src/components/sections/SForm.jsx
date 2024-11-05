'use client'

import Image from "next/image";
import { ContainerGrid } from "../layout/ContainerGrid";
import { Heading } from "../typrography/Heading";
import { Paragraph } from "../typrography/Paragraph";
import { InputForm } from '@/components/ui/InputForm';
import { useState } from 'react';

export function SectionFormulario() {
    const [currentIcon, setCurrentIcon] = useState("f-hello.svg");
    const [animateIcon, setAnimateIcon] = useState(false);

    const handleFocus = (icon) => {
        setAnimateIcon(true);
        setCurrentIcon(icon);
        setTimeout(() => setAnimateIcon(false), 300); // Reseta a animação após a duração
    };

    return (
        <section>
            <ContainerGrid className={"w-full h-full flex flex-col items-start justify-center"}>
                <div>
                    <Heading as="h2" size="medium" color="white">Tem alguma <span className="text-red-800">pergunta?</span></Heading>
                    <Heading as="h2" size="medium" color="white">Pronto para <span className="text-red-800">começar?</span></Heading>
                </div>
                <div>
                    <Paragraph size="litlleSmall" color="white">Vamos iniciar uma conversa! Preencha nosso formulário de contato, <br/> e entraremos em contato com você o mais rápido possível</Paragraph>
                </div>
                <div className="flex flex-col items-start justify-center w-full">
                    <div className={`flex items-center justify-center ${animateIcon ? 'icon-animation' : ''}`}>
                        <Heading as="h4" size="menu" color="white">Olá</Heading>
                        <Image src={`icons/icon-faces/${currentIcon}`} width={250} height={80} alt="Icon" />
                    </div>
                    <InputForm
                        quest={"Meu nome é"}
                        placehold={"Insira seu nome"}
                        tipo={"text"}
                        onFocus={() => handleFocus("f-write.svg")}
                    />
                    <InputForm
                        quest={"Eu sou de"}
                        placehold={"Insira o nome da sua empresa"}
                        tipo={"text"}
                        onFocus={() => handleFocus("f-from.svg")}
                    />
                    <InputForm
                        quest={"Aqui está meu email"}
                        placehold={"Insira seu e-mail"}
                        tipo={"text"}
                        onFocus={() => handleFocus("f-email.svg")}
                    />
                    <InputForm
                        quest={"Número de Telefone"}
                        placehold={"Insira seu telefone"}
                        tipo={"text"}
                        onFocus={() => handleFocus("f-phone.svg")}
                    />
                    <InputForm
                        quest={"Motivo do contato"}
                        placehold={"Insira o motivo"}
                        tipo={"text"}
                        onFocus={() => handleFocus("f-quest.svg")}
                    />
                    <InputForm
                        quest={"Mensagem"}
                        placehold={"Insira sua mensagem"}
                        tipo={"text"}
                        onFocus={() => handleFocus("f-conversation.svg")}
                    />
                </div>
                <button onFocus={() => handleFocus("f-send.svg")} className="p-10 w-full h-full text-center bg-white rounded-full text-black mt-10">ENVIAR</button>
            </ContainerGrid>
        </section>
    );
}
