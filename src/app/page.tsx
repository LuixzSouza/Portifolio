import type { Metadata } from "next";

// Components
import{ Homing }from "@/components/Homing"

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
    <section>
      <Homing/>
    </section>
  );
}
