import { ContainerGrid } from "../layout/ContainerGrid"
import { Heading } from "../typrography/Heading"
import { Paragraph } from "../typrography/Paragraph"

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
                    <div className="flex items-end justify-between w-full" >
                        <Heading as="h4" size="medium" color="white" className="max-w-max" >Meu nome é</Heading>
                        <div className="w-full h-full border-b  border-white" >
                            <input type="text" placeholder="Insira seu nomee" className="bg-transparent ml-5" />
                        </div>
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <Heading as="h4" size="medium" color="white" className="max-w-max" >Eu sou de</Heading>
                        <div className="w-full h-full border-b  border-white" >
                            <input type="text" placeholder="Insira o nome da sua empresa" />    
                        </div>
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <Heading as="h4" size="medium" color="white" className="max-w-max">Aqui está meu email</Heading>
                        <div className="w-full h-full border-b  border-white" >
                            <input type="text" placeholder="Insira seu e-mail" />
                        </div>
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <Heading as="h4" size="medium" color="white" className="max-w-max">Número de Telefone</Heading>
                        <div className="w-full h-full border-b  border-white" >
                            <input type="text" placeholder="Insira seu telefone" /> 
                        </div>
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <Heading as="h4" size="medium" color="white" className="max-w-max">Motivo do contato</Heading>
                        <input type="checkbox" placeholder="Dúvida" />
                        <input type="checkbox" placeholder="Orçamento" />
                        <input type="checkbox" placeholder="Suporte Técnico"/>
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <Heading as="h4" size="medium" color="white" className="max-w-max">Mensagem</Heading>
                        <div className="w-full h-full border-b  border-white" >
                            <input type="text" placeholder="Insira sua mensagem" />
                        </div>
                    </div>
                </div>
                <button className="p-10 w-full h-full text-center bg-white rounded-full text-black mt-10" >ENVIAR</button>
            </ContainerGrid>
        </section>
    )
}