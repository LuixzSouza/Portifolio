import { ContainerGrid } from "../layout/ContainerGrid";
import { Heading } from "../typrography/Heading";
import { Paragraph } from "../typrography/Paragraph";
import { InputForm } from '@/components/ui/InputForm';

export function SectionFormulario() {
    return (
        <section>
            <ContainerGrid className={"w-full h-full flex flex-col items-start justify-center"} >
                <div>
                    <Heading as="h2" size="medium" color="white" >Tem alguma <span className="text-red-800" >pergunta?</span></Heading>
                    <Heading as="h2" size="medium" color="white">Pronto para <span className="text-red-800">começar?</span></Heading>
                </div>
                <div>
                    <Paragraph size="litlleSmall" color="white">Vamos iniciar uma conversa! Preencha nosso formulário de contato, <br/> e entraremos em contato com você o mais rápido possível</Paragraph>
                </div>
                <div className="flex flex-col items-start justify-center w-full" >
                    <Heading as="h4" size="menu" color="white" >Olá 😊</Heading>
                    <InputForm quest={"Meu nome é"} placehold={"Insira seu nome"} tipo={"text"} />
                    <InputForm quest={"Eu sou de"} placehold={"Insira o nome da sua empresa"} tipo={"text"} />
                    <InputForm quest={"Aqui está meu email"} placehold={"Insira seu e-mail"} tipo={"text"} />
                    <InputForm quest={"Número de Telefone"} placehold={"Insira seu telefone"} tipo={"text"} />
                    <InputForm quest={"Motivo do contato"} placehold={"Insira o motivo"} tipo={"text"} />
                    <InputForm quest={"Mensagem"} placehold={"Insira sua mensagem"} tipo={"text"} />
                </div>
                <button className="p-10 w-full h-full text-center bg-white rounded-full text-black mt-10" >ENVIAR</button>
            </ContainerGrid>
        </section>
    )
}