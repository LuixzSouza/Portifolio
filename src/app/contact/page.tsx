import { HeaderHome } from "@/components/headers/HeaderHome";
import {SectionContato} from "@/components/sections/SectionContato"
import { MenuDefaultOpen } from "@/components/menus/MenuDefaultOpen"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato | Luiz Souza",
  description: "Entre em contato com o Luiz para contratação, serviços etc..",
  openGraph: {
    images: ["https://luixzsouza.com.br/image/imgShareCover.png"],
    title: "Portifolio",
    description: "Luiz Antônio de Souza",
    type: "profile",
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
