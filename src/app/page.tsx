import type { Metadata } from "next";

// Components
import{ HeaderHome }from "@/components/HeaderHome"

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
      <HeaderHome/>
    </section>
  );
}
