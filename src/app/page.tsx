import { MainSection } from "@/components/sections/MainSection"

export const metadata = {
  title: "Luiz Antônio de Souza | Desenvolvedor Front-End | Portfólio",
  description: "Conheça o portfólio de Luiz Antônio de Souza, desenvolvedor front-end especializado em criar soluções modernas e eficientes para a web.",
  openGraph: {
    type: "website",
    url: "https://luixzsouza.com.br",
    title: "Luiz Antônio de Souza | Desenvolvedor Front-End | Portfólio",
    description: "Explore os projetos e habilidades de Luiz Antônio de Souza, especialista em front-end.",
    images: [
      {
        url: "https://luixzsouza.com.br/image/imgShareCover.png",
        width: 1200,
        height: 630,
        alt: "Imagem de capa do portfólio de Luiz Antônio de Souza",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luiz Antônio de Souza | Desenvolvedor Front-End | Portfólio",
    description: "Conheça o portfólio de Luiz Antônio de Souza, desenvolvedor front-end especializado em criar soluções modernas para a web.",
    images: ["https://luixzsouza.com.br/image/imgShareCover.png"],
  },
};

export default function Home() {

  return (
    <MainSection/>
  );
}
