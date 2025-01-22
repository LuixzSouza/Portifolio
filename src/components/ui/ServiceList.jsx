// Next
import Image from "next/image";

// Componentes
import { Heading } from '@/components/typrography/Heading';
import { Paragraph } from "../typrography/Paragraph";

const itens = [
    {
        img: "icons/iconService-1.png",
        title: "Criação de Sites",
        paragraph: "Tranformo suas ideias em um site profissional e atrativo focado em transmitir sua mensagem de forma clara e eficaz.",
    },
    {
        img: "icons/iconService-2.png",
        title: "Criação de Landing Pages",
        paragraph: "Crio páginas de destino impactantes e otimizadas para converter visitantes em cliente, utilizando em técnicas comprovadas de design e persuasão.",
    },
    {
        img: "icons/iconService-3.png",
        title: "Otimização de SEO",
        paragraph: "Maximizo a visibilidade do seu site nos mecanismos de busca do Goolgle, implementando estratégias avançadas de SEO para aumentar o tráfego orgânico e melhorar seu ranking.",
    },
    {
        img: "icons/iconService-4.png",
        title: "Conexão/Consumo de REST API's",
        paragraph: "Integro e consumo APIs de forma eficiente para proporcionar funcionalidades avançadas ao seu site ou aplicativo, garantindo uma experiência de usuário dinâmica e interativa.",
    },
];

export function ServiceList() {
    return (
        <ul className="grid grid-cols-1 grid-rows-2 gap-8 py-8 md:grid-cols-2">
            {itens.map((item, index) => (
                <li key={index} className="w-full flex flex-col items-center justify-center bg-[#101010] border-t border-white/50 p-10 rounded-xl hover:shadow-custom-inset hover:shadow-blue-700 hover:border hover:border-blue-500 transition-all duration-300 ease" >
                    <Image src={`/${item.img}`} width={150} height={80} alt="Ícone" className="filter grayscale invert" />
                    <Heading as="h4" size="tiny" color="white"  className="mb-3 font-semibold text-center">{item.title}</Heading>
                    <Paragraph size="small" color="white/70" className={"max-w-600"}>{item.paragraph}</Paragraph>
                </li>
            ))}
        </ul>
    );
}