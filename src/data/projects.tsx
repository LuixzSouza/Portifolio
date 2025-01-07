export interface Projeto {
    nome: string;
    imagem: string | null; // Permitir que a imagem seja uma string ou null
    tecnologias: string[];
    links: {
        sobre?: string;
        github?: string;
        verProjeto?: string;
    };
    descricao?: string;
    data?: string;
}

export const projetos: Projeto[] = [
    {
        nome: "Formula Idiomas",
        imagem: "/image/p-formula-idioma.png",
        tecnologias: ["HTML5 ", "CSS3", "JavaScript", "PHP", "PHPMailer", "AOS", "Projeto Real"],
        links: {
            sobre: "/sobre",
            github: "https://github.com/LuixzSouza",
            verProjeto: "https://www.formulaidiomas.com.br"
        },
        descricao: "Formuladidom asmdj djqwed",
        data: "12 de janeiro 2024"
    },
    {
        nome: "WireFrimes",
        imagem: "/projects/WireFrimes.png",
        tecnologias: ["UI/UX", "HTML5", "CSS3", "JavaScript", "SASS", "Gulp", "Netlify"],
        links: {
            sobre: "/sobre-outro",
            github: "https://github.com/LuixzSouza/WireFrames-Sites",
            verProjeto: "https://wireframe-training-luiz.netlify.app"
        },
    },
    {
        nome: "API-CEP",
        imagem: "/projects/API-CEP.png",
        tecnologias: ["HTML5", "CSS3", "JavaScript", "API", "UI/UX"],
        links: {
            sobre: "/sobre",
            github: "https://github.com/LuixzSouza/API_BuscarCep",
            verProjeto: "https://buscarcepluiz.netlify.app"
        }
    },
    {
        nome: "API-Pokemon",
        imagem: "/projects/API-Pokemon.png",
        tecnologias: ["HTML5", "CSS3", "JavaScript", "API"],
        links: {
            sobre: "/sobre",
            github: "https://github.com/LuixzSouza/Pokemon",
            verProjeto: "https://pokemonluiz.netlify.app"
        }
    },
    {
        nome: "BarberWeb",
        imagem: "/projects/BarberWeb.png",
        tecnologias: ["HTML5", "CSS", "Sass", "JavaScript", "UX/UI"],
        links: {
            sobre: "/sobre",
            github: "https://github.com/LuixzSouza/CabeleireiroPratic",
            verProjeto: "https://cabeleireiroluiz.netlify.app"
        }
    },
    {
        nome: "Blizzard",
        imagem: "/projects/Blizzard.png",
        tecnologias: ["HTML5", "CSS3", "SASS", "JavaScript"],
        links: {
            sobre: "/sobre",
            github: "https://github.com/LuixzSouza/Blizzard",
            verProjeto: "https://blizzardluiz.netlify.app"
        }
    },
    {
        nome: "Calculadora",
        imagem: "/projects/Calculadora.png",
        tecnologias: ["HTML5", "CSS3", "SASS", "JavaScript", "Faculdade"],
        links: {
            sobre: "/sobre",
            github: "https://github.com/LuixzSouza/Calculadora-Web",
            verProjeto: "https://calculadora-pmbok.netlify.app"
        }
    },
    {
        nome: "CloudBoost",
        imagem: "/projects/CloudBoost.png",
        tecnologias: ["HTML5", "CSS3", "SASS", "JavaScript"],
        links: {
            sobre: "/sobre",
            github: "https://github.com/LuixzSouza/CloudBoost",
            verProjeto: "https://cloudboostluiz.netlify.app"
        }
    },
    {
        nome: "Primeiro Site",
        imagem: "/projects/First-site-1.png",
        tecnologias: ["HTML5", "CSS3", "JavaScript"],
        links: {
            sobre: "/sobre",
            github: "https://github.com/LuixzSouza/PrimeiroSite",
            verProjeto: "https://primeirositeold.netlify.app"
        }
    },
    {
        nome: "Primeiro Site - Reform",
        imagem: "/projects/First-site-2.png",
        tecnologias: ["HTML5", "CSS3", "JavaScript"],
        links: {
            sobre: "/sobre",
            github: "https://github.com/LuixzSouza/PrimeiroSiteReformula",
            verProjeto: "https://primeirositenew.netlify.app"
        }
    },
    {
        nome: "God of War Ragnarok",
        imagem: "/projects/God-of-War-Ragnarok.png",
        tecnologias: ["HTML5", "CSS3", "Sass", "JavaScript"],
        links: {
            sobre: "/sobre",
            github: "https://github.com/LuixzSouza/GodOfWarRagnarok",
            verProjeto: "https://godofwarluiz.netlify.app"
        }
    },
    {
        nome: "Hostinger",
        imagem: "/projects/Hostinger.png",
        tecnologias: ["HTML5", "CSS3", "Sass", "JavaScript"],
        links: {
            sobre: "/sobre",
            github: "https://github.com/LuixzSouza/KingHost",
            verProjeto: "https://kinghostluiz.netlify.app"
        }
    },
    {
        nome: "Banco Neon",
        imagem: "/projects/IP-Neon.png",
        tecnologias: ["HTML5", "CSS3", "WordPress", "JavaScript"],
        links: {
            sobre: "/sobre",
            github: "https://github.com/LuixzSouza/IpNeon",
            verProjeto: "https://ipneonluiz.netlify.app"
        }
    },
    {
        nome: "SI - Faculdade",
        imagem: "/projects/SI-Faculdade.png",
        tecnologias: ["HTML5", "CSS3", "Sass", "JavaScript"],
        links: {
            sobre: "/sobre",
            github: "https://github.com/LuixzSouza",
            verProjeto: "https://github.com/LuixzSouza"
        }
    },
    {
        nome: "UiBoost",
        imagem: "/projects/UiBoost.png",
        tecnologias: ["Webflow"],
        links: {
            sobre: "/sobre",
            github: "https://github.com/LuixzSouza",
            verProjeto: "https://uiboost-desafio.webflow.io"
        }
    },
    {
        nome: "SuperGet",
        imagem: "/projects/SuperGet.png",
        tecnologias: ["HTML5", "CSS3", "Sass", "JavaScript", "React"],
        links: {
            sobre: "/sobre",
            github: "https://github.com/LuixzSouza/SuperGetReact",
            verProjeto: "https://supergetluiz.netlify.app"
        }
    },
    {
        nome: "Rede",
        imagem: "/projects/Rede.png",
        tecnologias: ["HTML5", "CSS3", "Sass", "JavaScript", "React", "Next.js", "Tailwind", "Swiper"],
        links: {
            sobre: "/sobre",
            github: "https://github.com/LuixzSouza/REDE-Site",
            verProjeto: "https://redeluiz.netlify.app"
        }
    },
    {
        nome: "Itau",
        imagem: "/projects/Itau.png",
        tecnologias: ["HTML5", "CSS3", "Sass", "JavaScript", "React", "Next.js", "Tailwind", "Swiper"],
        links: {
            sobre: "/sobre",
            github: "https://github.com/LuixzSouza/Itau-Site",
            verProjeto: "https://itauluiz.netlify.app"
        }
    },
    {
        nome: "More | Talent",
        imagem: "/projects/More-Talent.png",
        tecnologias: ["HTML5", "CSS3", "Sass", "JavaScript", "React", "Next.js", "Tailwind", "Swiper"],
        links: {
            sobre: "/sobre",
            github: "https://moretalentsluiz.netlify.app",
            verProjeto: "https://moretalentsluiz.netlify.app"
        }
    },
    {
        nome: "Lanistar",
        imagem: "/projects/Lanistar.png",
        tecnologias: ["HTML5", "CSS3", "Sass", "JavaScript", "React", "Next.js", "Tailwind", "Swiper"],
        links: {
            sobre: "/sobre",
            github: "https://github.com/LuixzSouza/lanistarluiz",
            verProjeto: "https://lanistarluiz.netlify.app"
        }
    },
    {
        nome: "Tecsany",
        imagem: "/projects/Tecsany.png",
        tecnologias: ["HTML5", "CSS3", "Sass", "JavaScript", "React", "Next.js", "Tailwind", "Swiper"],
        links: {
            sobre: "/sobre",
            github: "https://github.com/LuixzSouza/tecsanyluiz",
            verProjeto: "https://tecsanyluiz.netlify.app"
        }
    },
    {
        nome: "Latam Airlines",
        imagem: "/projects/Latam AirlIines.png",
        tecnologias: ["HTML5", "CSS3", "Sass", "JavaScript", "React", "Next.js", "Tailwind", "Swiper"],
        links: {
            sobre: "/sobre",
            github: "https://github.com/LuixzSouza/LatamAirLanes",
            verProjeto: "https://latamairlinesluiz.netlify.app"
        }
    },
    {
        nome: "Spider Man 2",
        imagem: "/projects/Spider-Man2.png",
        tecnologias: ["HTML5", "CSS3", "Sass", "JavaScript", "React", "Next.js", "Tailwind", "Swiper"],
        links: {
            sobre: "/sobre",
            github: "https://github.com/LuixzSouza/spidermanluiz",
            verProjeto: "https://spidermanluiz.netlify.app"
        }
    },
    {
        nome: "JAVA | SQL",
        imagem: "/projects/JAVA-SQL.png",
        tecnologias: ["Faculdade", "JAVA", "SQL"],
        links: {
            sobre: "/sobre",
            github: "https://github.com/LuixzSouza/JAVA-SQL",
            verProjeto: "https://github.com/LuixzSouza/JAVA-SQL"
        }
    },
    {
        nome: "Python BotNotepad Test",
        imagem: "/projects/Python-BotNotepad-Test.png",
        tecnologias: ["Python"],
        links: {
            sobre: "/sobre",
            github: "https://github.com/LuixzSouza/Python-BotNotepad-Test",
            verProjeto: "https://github.com/LuixzSouza/Python-BotNotepad-Test"
        }
    },
    {
        nome: "Exercicios JavaScript",
        imagem: "/projects/Exercicios-JavaScript.png",
        tecnologias: ["Node.js", "JavaScript"],
        links: {
            sobre: "/sobre",
            github: "https://github.com/LuixzSouza/Exercicio_JavaScript-Node.js",
            verProjeto: "https://github.com/LuixzSouza/Exercicio_JavaScript-Node.js"
        }
    },
    {
        nome: "JAVA | ONG | Trabalho Facul",
        imagem: "/projects/Trabalho-Java-ONG.png",
        tecnologias: ["Faculdade", "JAVA", ],
        links: {
            sobre: "/sobre",
            github: "https://github.com/LuixzSouza/Sistema-de-Gerenciamento-de-ONG",
            verProjeto: "https://github.com/LuixzSouza/Sistema-de-Gerenciamento-de-ONG"
        }
    },
    {
        nome: "JAVA | POO | Trabalho Facul",
        imagem: "/projects/Trabalho-POO-Java.png",
        tecnologias: ["Tec1", "Tec2", "Tec3"],
        links: {
            sobre: "/sobre",
            github: "https://github.com/LuixzSouza/LISTA_EXERCICIOS_POO-4p---Luiz-Ant-nio-de-Souza-",
            verProjeto: "https://github.com/LuixzSouza/LISTA_EXERCICIOS_POO-4p---Luiz-Ant-nio-de-Souza-"
        }
    },
    {
        nome: "Modulo JavaScript",
        imagem: "/projects/Modulo-JavaScript.png",
        tecnologias: ["JavaScript", "Ajuda"],
        links: {
            sobre: "/sobre",
            github: "https://github.com/LuixzSouza/ModuloJavaScript",
            verProjeto: "https://github.com/LuixzSouza/ModuloJavaScript"
        }
    },
];