'use client'

import Image from "next/image";
import { ContainerGrid } from "../layout/ContainerGrid";
import { Heading } from "../typrography/Heading";
import { Paragraph } from "../typrography/Paragraph";
import { InputForm } from '@/components/ui/InputForm';
import { useState } from 'react';
import Link from "next/link";
import { BotaoPrimary } from "../buttons/Botao";

const socialInfo = [
    {
        icon: '/image/icon-linkedin.svg',
        type: 'Linkedin',
        subtype: 'Luiz Antônio de Souza',
        link: 'https://www.linkedin.com/in/luiz-antonio-souza-5000a226b/'
    },
    {
        icon: '/image/icon-instagram.svg',
        type: 'Instagram',
        subtype: 'luizantonio.souza_',
        link: 'https://www.instagram.com/luizantonio.souza_/?next=%2F'
    },
    {
        icon: '/image/icon-gmail.svg',
        type: 'Gmail',
        subtype: 'luiz.antoniodesouza004@gmail.com',
        link: 'luiz.antoniodesouza004@gmail.com'
    },
    {
        icon: '/image/icon-phone.svg',
        type: 'Telefone',
        subtype: '55+ (35) 99735-4797',
        link: 'https://web.whatsapp.com'
    },
]

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
                <div className="flex flex-col items-start justify-start gap-8 w-full" >
                    <div>
                        <Heading as="h2" size="medium" color="white">Tem alguma <span className="text-gradient-black font-semibold">pergunta?</span></Heading>
                        <Heading as="h2" size="medium" color="white">Pronto para <span className="text-gradient-black font-extrabold">começar?</span></Heading>
                    </div>
                    <div className="flex flex-col gap-6" >
                        <Paragraph size="litlleSmall" color="white">Vamos iniciar uma conversa! Preencha nosso formulário de contato, <br /> e entraremos em contato com você o mais rápido possível</Paragraph>
                        <Link href={"/certificates/Curriculo_Luiz_2025.pdf"}><BotaoPrimary estilo="primary" >Dowload CV</BotaoPrimary></Link>
                    </div>
                    <div className=" flex flex-col items-start justify-start gap-4" >
                        {socialInfo.map((item, index) => (
                            <Link
                            href={item.link}
                            key={index}
                            className="flex items-center justify-center gap-6 group transition-all duration-300"
                        >
                            <Image
                                src={item.icon}
                                width={45}
                                height={45}
                                alt="Icone"
                                className="transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 ease-in-out"
                            />
                            <div className="flex flex-col items-start justify-start">
                                <Paragraph size="small" color="white">
                                    {item.type}
                                </Paragraph>
                                <Paragraph size="tiny" color="white">
                                    {item.subtype}
                                </Paragraph>
                            </div>
                        </Link>
                        
                        ))}
                    </div>
                </div>
                <div className="relative bg-white/5 flex flex-col items-start justify-center gap-8 w-full rounded-xl p-4 md:p-10 ">
                    {/* Exibição dinâmica do nome */}
                    <div className={`relative w-full flex items-center justify-start pb-2`}>
                        <Heading as="h4" size="medium" color="white" className="break-words w-full max-w-400">Olá {userName}</Heading>
                        <div className={`absolute right-0 top-0 ${animateIcon ? 'animate-icon-change' : ''}`} >
                            <Image 
                                src={`icons/icon-faces/${currentIcon}`} 
                                width={120} 
                                height={100} 
                                alt="Icon" 
                                className="transition-transform duration-500" // Optional: to add smooth transition for transform
                            />
                        </div>
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
                    <button onFocus={() => handleFocus("f-send.svg")} className="p-6 w-full h-full text-center bg-white rounded-full text-black mt-10">ENVIAR</button>
                </div>
            </ContainerGrid>
        </section>
    );
}
