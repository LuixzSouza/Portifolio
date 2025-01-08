// Next
import Image from "next/image";

// Componentes
import { LinkCustom } from "@/components/ui/LinkCustom";
import { BotaoPrimary } from "@/components/buttons/Botao";
import { Heading } from "@/components/typrography/Heading";
import { Paragraph } from "@/components/typrography/Paragraph";
import { ContainerGrid } from "@/components/layout/ContainerGrid";

export function SectionFooter() {
    return (
        <footer className="sticky top-0 z-20 w-full bg-footer bg-center bg-no-repeat bg-cover pt-36 pb-11" >
            <ContainerGrid className={"w-full flex flex-col items-start justify-center"} >
                <div className="relative mb-32" >
                    <Heading as="h2" size="midlle" color="white" className="w-full text-center md:text-left md:max-w-900" > VAMOS JUNTOS TRABALHAR</Heading>
                    <div className="absolute bottom-2 right-12 rotate-12 md:right-60" >
                        <Image src={"/image/angular-colors.png"} width={70} height={40} alt="Icon angular colors"/>
                    </div>
                </div>
                <div className="w-full flex flex-col items-center justify-center gap-16 mb-20 md:justify-start md:flex-row" >
                    <BotaoPrimary estilo="primary" >luiz.antoniodesouza004@gmail.com</BotaoPrimary>
                    <BotaoPrimary estilo="primary" >+55 35 9 9735 4797</BotaoPrimary>
                </div>
                <div className="w-full flex flex-col items-center justify-between md:flex-row" >
                    <div className="w-full text-center md:text-left" >
                        <Paragraph size="litlleSmall" color="white" >🇧🇷  2019 — 2024© Luiz Antônio de Souza</Paragraph>
                    </div>
                    <div className='w-full flex items-center justify-center gap-8 md:justify-center' >
                        <LinkCustom color={'white'} link={'https://www.linkedin.com/in/luiz-antonio-souza-5000a226b/'} img={"image/icon-linkedin.svg"} nomeimg={"linkedin"} >LINKEDIN</LinkCustom>
                        <LinkCustom color={'white'} link={'https://github.com/Luixz157'}  img={"image/icon-github.svg"} nomeimg={"github"}>GITHUB</LinkCustom>
                        <LinkCustom color={'white'} link={'https://www.instagram.com/luizantonio.souza_/?next=%2F'} img={"image/icon-instagram.svg"} nomeimg={"instagram"}>INSTAGRAM</LinkCustom>
                    </div>
                </div>
            </ContainerGrid>
        </footer>
    )
}

/*
Elementos para Adicionar ao Footer:

Endereço: Se você estiver confortável em compartilhar uma localização (mesmo que seja aproximada).
Horário de disponibilidade: Algo como “Disponível para contato de Segunda a Sexta, das 9h às 18h.”
Botão de CTA (Call to Action): Um botão adicional com link para agendamento de reunião ou formulário de contato. Exemplo: "Entre em contato" ou "Marque uma conversa."
Links rápidos: Além de LinkedIn, GitHub e Instagram, você pode adicionar portfólios (como Behance ou Dribbble, caso faça sentido).
Ícone de Scroll to Top: Para facilitar a navegação do usuário.
*/