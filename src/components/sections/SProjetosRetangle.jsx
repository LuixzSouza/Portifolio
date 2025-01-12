'use client'

import { useState, useEffect } from "react";
import { ContainerGrid } from "../layout/ContainerGrid";
import { DivProjeto } from "@/components/ui/DivProjeto";
import { SOverflowProjects } from "@/components/sections/SOverflowProjects";
import { projetos } from "@/data/projects";

export function SProjetosRetangle() {
    const [selectedProject, setSelectedProject] = useState(null); // Estado para o projeto selecionado
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar o modal
    const [searchText, setSearchText] = useState(""); // Estado para o texto de pesquisa
    const [displayedProjects, setDisplayedProjects] = useState([]); // Estado para exibir projetos

    // Função para embaralhar os projetos
    const shuffleArray = (array) => {
        return array
            .map((item) => ({ item, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ item }) => item);
    };

    // Atualizar a lista de projetos exibidos ao carregar o componente
    useEffect(() => {
        setDisplayedProjects(shuffleArray(projetos));
    }, []);

    // Função para abrir o modal com o projeto selecionado
    const handleOpenModal = (projeto) => {
        setSelectedProject(projeto);
        setIsModalOpen(true);
    };

    // Função para fechar o modal
    const handleCloseModal = () => {
        setSelectedProject(null);
        setIsModalOpen(false);
    };

    // Função para atualizar o texto de pesquisa
    const handleSearchChange = (e) => {
        const text = e.target.value;
        setSearchText(text);

        // Filtra os projetos com base no texto digitado
        const filtered = projetos.filter((projeto) => {
            const search = text.toLowerCase();
            const matchesName = projeto.nome.toLowerCase().includes(search);
            const matchesTecnologia = projeto.tecnologias.some((tec) =>
                tec.toLowerCase().includes(search)
            );
            return matchesName || matchesTecnologia;
        });

        // Atualiza a lista exibida com os projetos filtrados e embaralhados
        setDisplayedProjects(shuffleArray(filtered));
    };

    // Função para pesquisar clicando em uma tecnologia
    const handleTechnologyClick = (technology) => {
        setSearchText(technology); // Atualiza o texto de pesquisa

        // Filtra os projetos relacionados à tecnologia clicada
        const filtered = projetos.filter((projeto) =>
            projeto.tecnologias.some(
                (tec) => tec.toLowerCase() === technology.toLowerCase() // Comparação insensível a maiúsculas/minúsculas
            )
        );

        // Atualiza a lista com os projetos filtrados
        setDisplayedProjects(filtered); // Sem embaralhar para manter ordem lógica
    };

    // Efeito para controlar o overflow do body ao abrir e fechar o modal
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = "hidden"; // Desabilita o scroll quando o modal está aberto
        } else {
            document.body.style.overflow = "auto"; // Restaura o scroll quando o modal está fechado
        }

        // Limpeza ao desmontar o componente
        return () => {
            document.body.style.overflow = "auto"; // Garante que o overflow seja restaurado ao desmontar
        };
    }, [isModalOpen]);

    return (
        <div>
            <section>
                <ContainerGrid className="py-28">
                    <div className="flex items-center justify-between w-full bg-white/5 rounded-full p-3 mb-10">
                        <input
                            type="text"
                            placeholder="PESQUISAR PROJETO"
                            value={searchText} // Valor controlado
                            onChange={handleSearchChange} // Atualiza o texto de pesquisa
                            className="w-full bg-transparent text-white focus:outline-none pl-6"
                        />
                        <div className="w-full max-w-max p-3 bg-white/10 rounded-full">
                            <span className="text-white">PESQUISAR</span>
                        </div>
                    </div>

                    <div className="flex justify-center items-center gap-4 flex-wrap text-white mb-10">
                        {/* Renderiza tecnologias clicáveis */}
                        {[
                            "HTML5", 
                            "CSS3", 
                            "JavaScript", 
                            "TypeScript", 
                            "React", 
                            "Next.js", 
                            "Angular", 
                            "Vue.js", 
                            "Node.js", 
                            "Express.js", 
                            "Python", 
                            "Django", 
                            "Flask", 
                            "PHP", 
                            "Laravel", 
                            "Java", 
                            "Spring Boot", 
                            "C#", 
                            ".NET", 
                            "Ruby on Rails", 
                            "MySQL", 
                            "PostgreSQL", 
                            "MongoDB", 
                            "Firebase", 
                            "GraphQL", 
                            "Docker", 
                            "Kubernetes", 
                            "AWS", 
                            "Azure"
                        ].map((technology, index) => (
                            <span
                                key={index}
                                onClick={() => handleTechnologyClick(technology)} // Atualiza o input e embaralha
                                className="cursor-pointer bg-white/10 p-2 rounded-lg hover:bg-white/20"
                            >
                                {technology}
                            </span>
                        ))}

                    </div>

                    {/* Verificar se há projetos exibidos */}
                    {displayedProjects.length > 0 ? (
                        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                            {displayedProjects.map((projeto, index) => (
                                <DivProjeto
                                    key={index}
                                    nome={projeto.nome}
                                    imagem={projeto.imagem || "/image/MySelf.png"}
                                    tecnologias={projeto.tecnologias}
                                    links={projeto.links}
                                    onClick={() => handleOpenModal(projeto)} // Define o projeto clicado
                                />
                            ))}
                        </div>
                    ) : (
                        // Exibe mensagem se nenhum projeto for encontrado
                        <div className="text-center text-white py-10">
                            <p>Nenhum projeto encontrado para: &quot;{searchText}&quot;</p>
                        </div>
                    )}
                </ContainerGrid>
            </section>

            {/* Renderiza o modal se estiver aberto */}
            {isModalOpen && (
                <SOverflowProjects
                    projeto={selectedProject}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
}
