import { MainSection } from "@/components/sections/MainSection"

export const metadata = {
  title: "Luiz Antônio de Souza | Portifolio/Home",
  description: "Luiz Antônio de Souza",
  openGraph: {
    images: ["https://luixzsouza.com.br/image/imgShareCover.png"],
    title: "Portifolio",
    description: "Luiz Antônio de Souza",
    type: "profile",
  },
};

export default function Home() {

  return (
    <MainSection/>
  );
}
