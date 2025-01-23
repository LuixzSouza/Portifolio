import { ContainerGrid } from "../layout/ContainerGrid";
import { Heading } from "../typrography/Heading";
import { Depoimento } from "@/components/ui/Depoimento";

const depoiments = [
    {
        nome: "Eduardo Souza",
        emprego: "Visual Design",
        depoimento: "Solicitado...",
        image: "/image/edu.png",
    },
    {
        nome: "Lennon Mauricio",
        emprego: "Produtor de Vídeo",
        depoimento: "Solicitado...",
        image: "/image/lennon.png",
    },
    {
        nome: "Renan Carlos",
        emprego: "Estudante de SI",
        depoimento: "O Luiz é um cara que eu admiro muito, é nítido seus esforços e sua vontade de se tornar um profissional cada vez melhor. Sempre motivando seus colegas com sua transparência e bondade.",
        image: "/image/renan.png",
    },
]

export function SDepoimentos() {
    return(
        <section className="py-12 md:py-32 border-b border-white/25" >
            <ContainerGrid>
                <Heading as="h2" size="medium" color="white" className="mb-24" >Depoimentos</Heading>
                <div className="w-full flex flex-col gap-16 lg:flex-row" >
                    {depoiments.map((item, index) => (
                        <Depoimento
                        key={index}
                            nome={item.nome}
                            emprego={item.emprego}
                            depoimento={item.depoimento}
                            image={item.image}
                            className={index === 1 ? "relative lg:-top-8" : ""}
                        />
                    ))}
                </div>
            </ContainerGrid>
        </section>
    )
}