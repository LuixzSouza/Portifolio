import { ContainerGrid } from "../layout/ContainerGrid";
import { DivProjeto } from "@/components/ui/DivProjeto";

export function SProjetosRetangle() {
    const projetos = [
        {
            nome: "Projeto Real",
            imagem: "/image/p-formula-idioma.png",
            tecnologias: ["BRANDING", "HTML", "CSS", "JS", "REACT"],
            links: {
                sobre: "/sobre",
                github: "/github",
                verProjeto: "/ver-projeto"
            }
        },
        {
            nome: "WireFrimes",
            imagem: "/projects/WireFrimes.png",
            tecnologias: ["UI/UX", "Node.js", "Express"],
            links: {
                sobre: "/sobre-outro",
                github: "/github-outro",
                verProjeto: "/ver-outro-projeto"
            }
        },
        {
            nome: "API-CEP",
            imagem: "/projects/API-CEP.png",
            tecnologias: ["Tec1", "Tec2", "Tec3"],
            links: {
                sobre: "/sobre",
                github: "/github",
                verProjeto: "/ver-projeto"
            }
        },
        {
            nome: "API-Pokemon",
            imagem: "/projects/API-Pokemon.png",
            tecnologias: ["Tec1", "Tec2", "Tec3"],
            links: {
                sobre: "/sobre",
                github: "/github",
                verProjeto: "/ver-projeto"
            }
        },
        {
            nome: "BarberWeb",
            imagem: "/projects/BarberWeb.png",
            tecnologias: ["Tec1", "Tec2", "Tec3"],
            links: {
                sobre: "/sobre",
                github: "/github",
                verProjeto: "/ver-projeto"
            }
        },
        {
            nome: "Blizzard",
            imagem: "/projects/Blizzard.png",
            tecnologias: ["Tec1", "Tec2", "Tec3"],
            links: {
                sobre: "/sobre",
                github: "/github",
                verProjeto: "/ver-projeto"
            }
        },
        {
            nome: "Calculadora",
            imagem: "/projects/Calculadora.png",
            tecnologias: ["Tec1", "Tec2", "Tec3"],
            links: {
                sobre: "/sobre",
                github: "/github",
                verProjeto: "/ver-projeto"
            }
        },
        {
            nome: "CloudBoost",
            imagem: "/projects/CloudBoost.png",
            tecnologias: ["Tec1", "Tec2", "Tec3"],
            links: {
                sobre: "/sobre",
                github: "/github",
                verProjeto: "/ver-projeto"
            }
        },
        {
            nome: "Primeiro Site",
            imagem: "/projects/First-site-1.png",
            tecnologias: ["Tec1", "Tec2", "Tec3"],
            links: {
                sobre: "/sobre",
                github: "/github",
                verProjeto: "/ver-projeto"
            }
        },
        {
            nome: "Primeiro Site - Reform",
            imagem: "/projects/First-site-2.png",
            tecnologias: ["Tec1", "Tec2", "Tec3"],
            links: {
                sobre: "/sobre",
                github: "/github",
                verProjeto: "/ver-projeto"
            }
        },
        {
            nome: "God of War Ragnarok",
            imagem: "/projects/God-of-War-Ragnarok.png",
            tecnologias: ["Tec1", "Tec2", "Tec3"],
            links: {
                sobre: "/sobre",
                github: "/github",
                verProjeto: "/ver-projeto"
            }
        },
        {
            nome: "Hostinger",
            imagem: "/projects/Hostinger.png",
            tecnologias: ["Tec1", "Tec2", "Tec3"],
            links: {
                sobre: "/sobre",
                github: "/github",
                verProjeto: "/ver-projeto"
            }
        },
        {
            nome: "Banco Neon",
            imagem: "/projects/IP-Neon.png",
            tecnologias: ["Tec1", "Tec2", "Tec3"],
            links: {
                sobre: "/sobre",
                github: "/github",
                verProjeto: "/ver-projeto"
            }
        },
        {
            nome: "SI - Faculdade",
            imagem: "/projects/SI-Faculdade.png",
            tecnologias: ["Tec1", "Tec2", "Tec3"],
            links: {
                sobre: "/sobre",
                github: "/github",
                verProjeto: "/ver-projeto"
            }
        },
        {
            nome: "UiBoost",
            imagem: "/projects/UiBoost.png",
            tecnologias: ["Tec1", "Tec2", "Tec3"],
            links: {
                sobre: "/sobre",
                github: "/github",
                verProjeto: "/ver-projeto"
            }
        },
        {
            nome: "SuperGet",
            imagem: "/projects/SuperGet.png",
            tecnologias: ["Tec1", "Tec2", "Tec3"],
            links: {
                sobre: "/sobre",
                github: "/github",
                verProjeto: "/ver-projeto"
            }
        },
        {
            nome: "Rede",
            imagem: "/projects/Rede.png",
            tecnologias: ["Tec1", "Tec2", "Tec3"],
            links: {
                sobre: "/sobre",
                github: "/github",
                verProjeto: "/ver-projeto"
            }
        },
        {
            nome: "Itau",
            imagem: "/projects/Itau.png",
            tecnologias: ["Tec1", "Tec2", "Tec3"],
            links: {
                sobre: "/sobre",
                github: "/github",
                verProjeto: "/ver-projeto"
            }
        },
        {
            nome: "More | Talent",
            imagem: "/projects/More-Talent.png",
            tecnologias: ["Tec1", "Tec2", "Tec3"],
            links: {
                sobre: "/sobre",
                github: "/github",
                verProjeto: "/ver-projeto"
            }
        },
        {
            nome: "Lanistar",
            imagem: "/projects/Lanistar.png",
            tecnologias: ["Tec1", "Tec2", "Tec3"],
            links: {
                sobre: "/sobre",
                github: "/github",
                verProjeto: "/ver-projeto"
            }
        },
        {
            nome: "Tecsany",
            imagem: "/projects/Tecsany.png",
            tecnologias: ["Tec1", "Tec2", "Tec3"],
            links: {
                sobre: "/sobre",
                github: "/github",
                verProjeto: "/ver-projeto"
            }
        },
        {
            nome: "Latam Airlines",
            imagem: "/projects/Latam AirlIines.png",
            tecnologias: ["Tec1", "Tec2", "Tec3"],
            links: {
                sobre: "/sobre",
                github: "/github",
                verProjeto: "/ver-projeto"
            }
        },
        {
            nome: "Spider Man 2",
            imagem: "/projects/Spider-Man2.png",
            tecnologias: ["Tec1", "Tec2", "Tec3"],
            links: {
                sobre: "/sobre",
                github: "/github",
                verProjeto: "/ver-projeto"
            }
        },
        {
            nome: "JAVA | SQL",
            imagem: "/projects/JAVA-SQL.png",
            tecnologias: ["Tec1", "Tec2", "Tec3"],
            links: {
                sobre: "/sobre",
                github: "/github",
                verProjeto: "/ver-projeto"
            }
        },
        {
            nome: "Python BotNotepad Test",
            imagem: "/projects/Python-BotNotepad-Test.png",
            tecnologias: ["Tec1", "Tec2", "Tec3"],
            links: {
                sobre: "/sobre",
                github: "/github",
                verProjeto: "/ver-projeto"
            }
        },
        {
            nome: "Exercicios JavaScript",
            imagem: "/projects/Exercicios-JavaScript.png",
            tecnologias: ["Tec1", "Tec2", "Tec3"],
            links: {
                sobre: "/sobre",
                github: "/github",
                verProjeto: "/ver-projeto"
            }
        },
        {
            nome: "JAVA | ONG | Trabalho Facul",
            imagem: "/projects/Trabalho-Java-ONG.png",
            tecnologias: ["Tec1", "Tec2", "Tec3"],
            links: {
                sobre: "/sobre",
                github: "/github",
                verProjeto: "/ver-projeto"
            }
        },
        {
            nome: "JAVA | POO | Trabalho Facul",
            imagem: "/projects/Trabalho-POO-Java.png",
            tecnologias: ["Tec1", "Tec2", "Tec3"],
            links: {
                sobre: "/sobre",
                github: "/github",
                verProjeto: "/ver-projeto"
            }
        },
        {
            nome: "Modulo JavaScript",
            imagem: "/projects/Modulo-JavaScript.png",
            tecnologias: ["Tec1", "Tec2", "Tec3"],
            links: {
                sobre: "/sobre",
                github: "/github",
                verProjeto: "/ver-projeto"
            }
        },
    ];

    return (
        <section>
            <ContainerGrid className={"py-28"} >
                <div className="flex items-center justify-between w-full bg-white/5 rounded-full p-3 mb-10" >
                    <input type="text" placeholder="PESQUISAR PROJETO" className="w-full bg-transparent text-white focus:outline-none pl-6" />
                    <div className="w-full max-w-max p-3 bg-white/10 rounded-full" >
                        <span className="text-white" >PESQUISAR</span>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-10" >
                    {projetos.map((projeto, index) => (
                        <DivProjeto 
                            key={index} 
                            nome={projeto.nome} 
                            imagem={projeto.imagem} 
                            tecnologias={projeto.tecnologias} 
                            links={projeto.links} 
                        />
                    ))}
                </div>
            </ContainerGrid>
        </section>
    );
}
