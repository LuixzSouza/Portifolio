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
    const [userName, setUserName] = useState(""); // Estado para o nome do usuário

    const handleFocus = (icon) => {
        setAnimateIcon(true);
        setCurrentIcon(icon);
        setTimeout(() => setAnimateIcon(false), 300); // Reseta a animação após a duração
    };

    const handleNameChange = (e) => {
        setUserName(e.target.value); // Atualiza o nome do usuário enquanto ele digita
    };

    return (
        <section>
            <ContainerGrid className={"w-full h-full flex flex-col items-start justify-center py-28 gap-16 md:flex-row"}>
                <div className="w-full" >
                    <div>
                        <Heading as="h2" size="medium" color="white">Tem alguma <span className="text-gradient-black font-semibold">pergunta?</span></Heading>
                        <Heading as="h2" size="medium" color="white">Pronto para <span className="text-gradient-black font-extrabold">começar?</span></Heading>
                    </div>
                    <div>
                        <Paragraph size="litlleSmall" color="white">Vamos iniciar uma conversa! Preencha nosso formulário de contato, <br /> e entraremos em contato com você o mais rápido possível</Paragraph>
                    </div>
                </div>
                <div className="flex flex-col items-start justify-center w-full">
                    {/* Exibição dinâmica do nome */}
                    <div className={`flex items-center justify-start ${animateIcon ? 'icon-animation' : ''}`}>
                        <Heading as="h4" size="medium" color="white">Olá {userName}</Heading>
                        <Image src={`icons/icon-faces/${currentIcon}`} width={150} height={120} alt="Icon" />
                    </div>

                    {/* Campo de entrada para nome */}
                    <InputForm
                        quest={"Meu nome é"}
                        placehold={"Insira seu nome"}
                        tipo={"text"}
                        value={userName} // Vinculado ao estado do nome
                        onChange={handleNameChange} // Atualiza o estado do nome
                        onFocus={() => handleFocus("f-write.svg")}
                    />

                    {/* Outros campos */}
                    <InputForm
                        quest={"Eu sou de"}
                        placehold={"Insira o nome da sua empresa"}
                        tipo={"text"}
                        onFocus={() => handleFocus("f-from.svg")}
                    />
                    <InputForm
                        quest={"E-mail"}
                        placehold={"Insira seu e-mail"}
                        tipo={"text"}
                        onFocus={() => handleFocus("f-email.svg")}
                    />
                    <InputForm
                        quest={"Telefone"}
                        placehold={"Insira seu telefone"}
                        tipo={"text"}
                        onFocus={() => handleFocus("f-phone.svg")}
                    />
                    <InputForm
                        quest={"Motivo"}
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
                    <button onFocus={() => handleFocus("f-send.svg")} className="p-10 w-full h-full text-center bg-white rounded-full text-black mt-10">ENVIAR</button>
                </div>
            </ContainerGrid>
        </section>
    );
}
