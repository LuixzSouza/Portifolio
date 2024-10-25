import type { Metadata } from "next";

// Components
import{ Homing }from "@/components/Homing";
import { CreateImpactProjects } from "@/components/SImpactProjects";
import { HeaderFixed } from "@/components/HeaderFixed";
import { SectionYears } from "@/components/SYears";
import { SectionWork } from "@/components/SWork";
import {SectionFooter} from "@/components/Footer";


const openGraphImage = { images: ["https://Caminho_no_servidor.com.br/nome_imagem.png"] };

export const metadata: Metadata = {
  title: "Portifolio",
  description: "Luiz Antônio de Souza",
  openGraph: {
    ...openGraphImage,
    title: "Portifolio",
    description: "Luiz Antônio de Souza",
    type: "profile",
  },
};

export default function Home() {
  return (
    <section className="relative" >
      <Homing/>
      <HeaderFixed/>
      <CreateImpactProjects/>
      <SectionYears/>
      <SectionWork/>
      <SectionFooter/>
    </section>
  );
}
