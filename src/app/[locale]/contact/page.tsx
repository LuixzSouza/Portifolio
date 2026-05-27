import { HeaderHome } from "@/components/headers/HeaderHome";
import {SectionContato} from "@/components/sections/SectionContato"
import { MenuDefaultOpen } from "@/components/menus/MenuDefaultOpen"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Entre em Contato com Luiz Souza | Desenvolvedor Front-End",
  description: "Fale com Luiz Antônio de Souza para contratação, serviços ou parcerias. Especialista em desenvolvimento web e soluções digitais modernas.",
  openGraph: {
    images: [
      {
        url: "https://luixzsouza.com.br/image/imgShareCover.png",
        width: 1200,
        height: 630,
        alt: "Banner de contato com Luiz Souza, desenvolvedor front-end.",
      },
    ],
    title: "Contato com Luiz Souza | Desenvolvedor Front-End",
    description: "Entre em contato com Luiz Souza para discutir projetos ou parcerias na área de desenvolvimento web.",
    url: "https://luixzsouza.com.br/contato",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Entre em Contato com Luiz Souza",
    description: "Fale diretamente com Luiz Souza para serviços de desenvolvimento front-end e parcerias estratégicas.",
    images: ["https://luixzsouza.com.br/image/imgShareCover.png"],
  },
};


export default function Contact() {
  return (
    <>
      <MenuDefaultOpen/>
      <HeaderHome/>
      <SectionContato/>
    </>
  );
}
