import { ContainerGrid } from "@/components/ContainerGrid";
import { Heading } from "@/components/Heading";
import { Paragraph } from "@/components/Paragraph";
import { BotaoPrimary } from "@/components/Botao";
import { LinkCustom } from "@/components/LinkCustom";

export function SectionFooter() {
    return (
        <footer>
            <ContainerGrid>
                <div>
                    <Heading as="h2" size="midlle" color="white" >VAMOS TRABALHAR JUNTOS</Heading>
                </div>
                <div>
                    <BotaoPrimary estilo="primary" >luiz.antoniodesouza004@gmail.com</BotaoPrimary>
                    <BotaoPrimary estilo="primary" >+55 35 9 9735 4797</BotaoPrimary>
                </div>
                <div>
                    <div>
                        <Paragraph size="litlleSmall" color="white" >🇧🇷  2019 — 2024© Luiz Antônio de Souza</Paragraph>
                    </div>
                    <div className='w-full flex items-center justify-start gap-8' >
                            <LinkCustom color={'white'} link={'https://www.linkedin.com/in/luiz-antonio-souza-5000a226b/'} >LINKEDIN</LinkCustom>
                            <LinkCustom color={'white'} link={'https://github.com/Luixz157'} >GITHUB</LinkCustom>
                            <LinkCustom color={'white'} link={'https://www.instagram.com/luizantonio.souza_/?next=%2F'} >INSTAGRAM</LinkCustom>
                        </div>
                </div>
            </ContainerGrid>
        </footer>
    )
}