export interface Projeto {
    nome: string;
    imagem?: string; // Permitir que a imagem seja uma string ou null
    tecnologias: string[];
    links: {
        linkedin?: string;
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
        tecnologias: ["HTML5", "CSS3", "JavaScript", "PHP", "PHPMailer", "AOS", "Projeto Real"],
        links: {
            linkedin: "https://www.linkedin.com/posts/luiz-antonio-souza-5000a226b_webdevelopment-frontenddevelopment-edutech-activity-7199815632731684864-gagJ?utm_source=share&utm_medium=member_desktop",
            github: "https://github.com/LuixzSouza",
            verProjeto: "https://www.formulaidiomas.com.br"
        },
        descricao: "Projeto Real",
        data: "16 de Setembro 2024"
    },
    {
        nome: "Casa Pronta",
        imagem: "/image/p-casapronta.png",
        tecnologias: ["HTML5", "CSS3", "JavaScript", "Next.js", "React",  "PHP", "PHPMailer", "Gsap", "Projeto Real"],
        links: {
            linkedin: "https://www.linkedin.com/in/luiz-antonio-souza-5000a226b/",
            github: "https://github.com/LuixzSouza",
            verProjeto: "https://casaprontaconstrusilva.com.br"
        },
        descricao: "Projeto Real",
        data: "20 de Janeiro 2025"
    },
    {
        nome: "WireFrimes",
        imagem: "/projects/WireFrimes.png",
        tecnologias: ["UI/UX", "HTML5", "CSS3", "JavaScript", "Sass", "Gulp", "Netlify"],
        links: {
            linkedin: "https://www.linkedin.com/posts/luiz-antonio-souza-5000a226b_webdevelopment-frontenddevelopment-wireframetowebsite-activity-7286881599680376832-zmt7?utm_source=share&utm_medium=member_desktop",
            github: "https://github.com/LuixzSouza/WireFrames-Sites",
            verProjeto: "https://wireframe-training-luiz.netlify.app"
        },
        descricao: "Este projeto consiste em uma página principal interativa que permite acessar diferentes wireframes, com um menu dinâmico para facilitar a navegação. Ele foi desenvolvido para praticar a construção de interfaces baseadas em reframes e aplicar boas práticas de desenvolvimento web.",
        data: "12 de janeiro 2024"
    },
    {
        nome: "API-CEP",
        imagem: "/projects/API-CEP.png",
        tecnologias: ["HTML5", "CSS3", "JavaScript", "API", "UI/UX"],
        links: {
            linkedin: "https://www.linkedin.com/posts/luiz-antonio-souza-5000a226b_projeto-de-front-end-lan%C3%A7ado-buscar-cep-activity-7197338952368820224-wtLX?utm_source=share&utm_medium=member_desktop",
            github: "https://github.com/LuixzSouza/API_BuscarCep",
            verProjeto: "https://buscarcepluiz.netlify.app"
        },
        descricao: "Desenvolvi uma ferramenta para busca de CEPs no Brasil, o site permite que os usuários encontrem informações detalhadas sobre endereços apenas inserindo o CEP.",
        data: "20 de Maio 2024"
    },
    {
        nome: "API-Pokemon",
        imagem: "/projects/API-Pokemon.png",
        tecnologias: ["HTML5", "CSS3", "JavaScript", "API"],
        links: {
            linkedin: "https://www.linkedin.com/posts/luiz-antonio-souza-5000a226b_projeto-de-front-end-pokemon-sobre-activity-7197338670616498178-FYUo?utm_source=share&utm_medium=member_desktop",
            github: "https://github.com/LuixzSouza/Pokemon",
            verProjeto: "https://pokemonluiz.netlify.app"
        },
        descricao: "Este site foi desenvolvido para oferecer um guia completo de Pokémons, ideal para fãs que querem explorar e caçar Pokémons pelo mundo, integrando dados de uma API para exibir informações detalhadas sobre cada Pokémon.",
        data: "20 de Maio 2024"
    },
    {
        nome: "BarberWeb",
        imagem: "/projects/BarberWeb.png",
        tecnologias: ["HTML5", "CSS", "Sass", "JavaScript", "UX/UI"],
        links: {
            linkedin: "https://www.linkedin.com/posts/luiz-antonio-souza-5000a226b_desenvolvimentoweb-frontend-educaaexaeto-activity-7199779916848975872-c5vG?utm_source=share&utm_medium=member_desktop",
            github: "https://github.com/LuixzSouza/CabeleireiroPratic",
            verProjeto: "https://cabeleireiroluiz.netlify.app"
        },
        descricao: "Este projeto foi desenvolvido com o objetivo de criar um site funcional e atraente para um salão de barbearia, oferecendo serviços de corte de cabelo e barba. Além de ser um projeto acadêmico integrador, que uniu estudantes do 4º e 2º período da faculdade, foi também uma oportunidade de praticar e aprimorar habilidades individuais em design e codificação, após a necessidade de reconstruir o projeto sem dados pessoais de terceiros, OBS: essas imagem foram criada com Inteligência Artificial.",
        data: "14 de Outubro 2024"
    },
    {
        nome: "Blizzard",
        imagem: "/projects/Blizzard.png",
        tecnologias: ["HTML5", "CSS3", "Sass", "JavaScript"],
        links: {
            linkedin: "https://www.linkedin.com/posts/luiz-antonio-souza-5000a226b_projeto-de-front-end-blizzard-sobre-activity-7197338443922726912-bST3?utm_source=share&utm_medium=member_desktop",
            github: "https://github.com/LuixzSouza/Blizzard",
            verProjeto: "https://blizzardluiz.netlify.app"
        },
        descricao: "Este site foi desenvolvido para exibir uma série de jogos populares da Blizzard.",
        data: "20 de Maio 2024"
    },
    {
        nome: "Calculadora",
        imagem: "/projects/Calculadora.png",
        tecnologias: ["HTML5", "CSS3", "Sass", "JavaScript", "Faculdade"],
        links: {
            linkedin: "https://www.linkedin.com/in/luiz-antonio-souza-5000a226b/",
            github: "https://github.com/LuixzSouza/Calculadora-Web",
            verProjeto: "https://calculadora-pmbok.netlify.app"
        },
        descricao: "Calculadora Front-End Desenvolvida para apresentação de trabalho",
        data: "12 de janeiro 2024"
    },
    {
        nome: "CloudBoost",
        imagem: "/projects/CloudBoost.png",
        tecnologias: ["HTML5", "CSS3", "Sass", "JavaScript"],
        links: {
            linkedin: "https://www.linkedin.com/posts/luiz-antonio-souza-5000a226b_projeto-cloudboost-sobre-o-projeto-activity-7197337712696184832-48T-?utm_source=share&utm_medium=member_desktop",
            github: "https://github.com/LuixzSouza/CloudBoost",
            verProjeto: "https://cloudboostluiz.netlify.app"
        },
        descricao: "CloudBoost é uma ferramenta de e-mail marketing projetada para ajudar empresas a aumentar suas vendas e fortalecer o relacionamento com clientes, focando em uma interface intuitiva e responsiva.",
        data: "20 de Maio 2024"
    },
    {
        nome: "Primeiro Site",
        imagem: "/projects/First-site-1.png",
        tecnologias: ["HTML5", "CSS3", "JavaScript"],
        links: {
            linkedin: "https://www.linkedin.com/posts/luiz-antonio-souza-5000a226b_este-foi-meu-primeiro-site-de-front-end-activity-7197336365104037888-qZ7l?utm_source=share&utm_medium=member_desktop",
            github: "https://github.com/LuixzSouza/PrimeiroSite",
            verProjeto: "https://primeirositeold.netlify.app"
        },
        descricao: "Este site foi criado para demonstrar meus conhecimentos essenciais de desenvolvimento Front-End básico.",
        data: "01 de janeiro 2024"
    },
    {
        nome: "Primeiro Site - Reform",
        imagem: "/projects/First-site-2.png",
        tecnologias: ["HTML5", "CSS3", "JavaScript"],
        links: {
            linkedin: "https://www.linkedin.com/posts/luiz-antonio-souza-5000a226b_este-site-foi-uma-reformula%C3%A7%C3%A3o-do-primeiro-activity-7197337018165530624-wNUl?utm_source=share&utm_medium=member_desktop",
            github: "https://github.com/LuixzSouza/PrimeiroSiteReformula",
            verProjeto: "https://primeirositenew.netlify.app"
        },
        descricao: "Desenvolvi este site com intuito de aumentar o que foi criado no meu primeiro.",
        data: "01 de janeiro 2024"
    },
    {
        nome: "God of War Ragnarok",
        imagem: "/projects/God-of-War-Ragnarok.png",
        tecnologias: ["HTML5", "CSS3", "Sass", "JavaScript"],
        links: {
            linkedin: "https://www.linkedin.com/posts/luiz-antonio-souza-5000a226b_projeto-de-front-end-god-of-war-ragnar%C3%B6k-activity-7197339199480455168-C8qH?utm_source=share&utm_medium=member_desktop",
            github: "https://github.com/LuixzSouza/GodOfWarRagnarok",
            verProjeto: "https://godofwarluiz.netlify.app"
        },
        descricao: "Desenvolvi um site promocional para o lançamento do jogo God of War Ragnarök.",
        data: "20 de Maio 2024"
    },
    {
        nome: "KingHost",
        imagem: "/projects/Hostinger.png",
        tecnologias: ["HTML5", "CSS3", "Sass", "JavaScript"],
        links: {
            linkedin: "https://www.linkedin.com/posts/luiz-antonio-souza-5000a226b_projeto-kinghost-sobre-o-projeto-activity-7197337439034597376-97nr?utm_source=share&utm_medium=member_desktop",
            github: "https://github.com/LuixzSouza/KingHost",
            verProjeto: "https://kinghostluiz.netlify.app"
        },
        descricao: "KingHost é uma ferramenta de e-mail marketing projetada para ajudar empresas a aumentar vendas e fortalecer o relacionamento com clientes, focando em uma interface intuitiva e responsiva.",
        data: "12 de janeiro 2024"
    },
    {
        nome: "Banco Neon",
        imagem: "/projects/IP-Neon.png",
        tecnologias: ["HTML5", "CSS3", "WordPress", "JavaScript"],
        links: {
            linkedin: "https://www.linkedin.com/posts/luiz-antonio-souza-5000a226b_projeto-de-front-end-ip-neon-sobre-activity-7197338134496325632-1QSn?utm_source=share&utm_medium=member_desktop",
            github: "https://github.com/LuixzSouza/IpNeon",
            verProjeto: "https://ipneonluiz.netlify.app"
        },
        descricao: "Desenvolvi este redesign de página inicial para um banco digital.",
        data: "20 de Maio 2024"
    },
    {
        nome: "SI - Faculdade",
        imagem: "/projects/SI-Faculdade.png",
        tecnologias: ["HTML5", "CSS3", "Sass", "JavaScript"],
        links: {
            linkedin: "https://www.linkedin.com/in/luiz-antonio-souza-5000a226b/",
            github: "https://github.com/LuixzSouza",
            verProjeto: "https://github.com/LuixzSouza"
        },
        descricao: "Sistema de Informação é uma plataforma web desenvolvida para facilitar a gestão de informações, oferecendo uma solução intuitiva. Apresentando a Turma",
        data: "12 de janeiro 2024"
    },
    {
        nome: "UiBoost",
        imagem: "/projects/UiBoost.png",
        tecnologias: ["Webflow"],
        links: {
            linkedin: "https://www.linkedin.com/posts/luiz-antonio-souza-5000a226b_projeto-de-front-end-uiboost-sobre-activity-7197662895793430528-nfR0?utm_source=share&utm_medium=member_desktop",
            github: "https://github.com/LuixzSouza",
            verProjeto: "https://uiboost-desafio.webflow.io"
        },
        descricao: "Este projeto foi desenvolvido como parte de um desafio de design Desenvolvimento web, ele destaca inovações em interfaces de usuário.",
        data: "22 de janeiro 2024"
    },
    {
        nome: "SuperGet",
        imagem: "/projects/SuperGet.png",
        tecnologias: ["HTML5", "CSS3", "Sass", "JavaScript", "React"],
        links: {
            linkedin: "https://www.linkedin.com/posts/luiz-antonio-souza-5000a226b_react-frontenddevelopment-webdevelopment-activity-7199046285767651328--fJN?utm_source=share&utm_medium=member_desktop",
            github: "https://github.com/LuixzSouza/SuperGetReact",
            verProjeto: "https://supergetluiz.netlify.app"
        },
        descricao: "Este projeto foi desenvolvido como parte de um exercício pessoal em React para aprimorar minhas habilidades de codificação e entender melhor os padrões de desenvolvimento web em React. Ele apresenta uma interface do produto SuperGet.",
        data: "14 de Outubro 2024"
    },
    {
        nome: "Rede",
        imagem: "/projects/Rede.png",
        tecnologias: ["HTML5", "CSS3", "Sass", "JavaScript", "React", "Next.js", "Tailwind", "Swiper"],
        links: {
            linkedin: "https://www.linkedin.com/in/luiz-antonio-souza-5000a226b/",
            github: "https://github.com/LuixzSouza/REDE-Site",
            verProjeto: "https://redeluiz.netlify.app"
        },
        descricao: "Este projeto é uma interface moderna e funcional, inspirada em plataformas de redes e serviços financeiros, com foco na performance e experiência do usuário. Desenvolvido com Next.js, Tailwind CSS, e Swiper, ele oferece navegação fluida e design responsivo.",
        data: "12 de janeiro 2024"
    },
    {
        nome: "Itau",
        imagem: "/projects/Itau.png",
        tecnologias: ["HTML5", "CSS3", "Sass", "JavaScript", "React", "Next.js", "Tailwind", "Swiper"],
        links: {
            linkedin: "https://www.linkedin.com/in/luiz-antonio-souza-5000a226b/",
            github: "https://github.com/LuixzSouza/Itau-Site",
            verProjeto: "https://itauluiz.netlify.app"
        },
        descricao: "Este projeto foi inspirado no site de uma instituição financeira, buscando recriar uma interface moderna e responsiva, com foco na experiência do usuário e na performance. Ele foi desenvolvido com Next.js e Tailwind CSS, aproveitando o melhor dessas tecnologias para entregar um design elegante e funcional",
        data: "12 de janeiro 2024"
    },
    {
        nome: "More | Talent",
        imagem: "/projects/More-Talent.png",
        tecnologias: ["HTML5", "CSS3", "Sass", "JavaScript", "React", "Next.js", "Tailwind", "Swiper"],
        links: {
            linkedin: "https://www.linkedin.com/posts/luiz-antonio-souza-5000a226b_m%C3%B4re-talent-tech-descri%C3%A7%C3%A3o-do-projeto-activity-7212050959210860545-mhiu?utm_source=share&utm_medium=member_desktop",
            github: "https://moretalentsluiz.netlify.app",
            verProjeto: "https://moretalentsluiz.netlify.app"
        },
        descricao: "Este projeto, desenvolvido com Next.js e Tailwind CSS, foi criado com o objetivo de aprimorar minhas habilidades no desenvolvimento web. Ele simula uma página inicial de um curso completo em design de produto digital, focado no processo de Design Centrado no Usuário. A página inclui uma seção de pré-cadastro, destaca parcerias com grandes empresas e apresenta um layout moderno e responsivo",
        data: "08 de Outubro 2024"
    },
    {
        nome: "Lanistar",
        imagem: "/projects/Lanistar.png",
        tecnologias: ["HTML5", "CSS3", "Sass", "JavaScript", "React", "Next.js", "Tailwind", "Swiper"],
        links: {
            linkedin: "https://www.linkedin.com/in/luiz-antonio-souza-5000a226b/",
            github: "https://github.com/LuixzSouza/lanistarluiz",
            verProjeto: "https://lanistarluiz.netlify.app"
        },
        descricao: "Este projeto foi desenvolvido para simular a interface de uma plataforma financeira moderna e inovadora. Ele combina design minimalista e responsividade para oferecer uma experiência de usuário intuitiva e envolvente.",
        data: "12 de janeiro 2024"
    },
    {
        nome: "Tecsany",
        imagem: "/projects/Tecsany.png",
        tecnologias: ["HTML5", "CSS3", "Sass", "JavaScript", "React", "Next.js", "Tailwind", "Swiper"],
        links: {
            linkedin: "https://www.linkedin.com/in/luiz-antonio-souza-5000a226b/",
            github: "https://github.com/LuixzSouza/tecsanyluiz",
            verProjeto: "https://tecsanyluiz.netlify.app"
        },
        descricao: "Este projeto foi desenvolvido para apresentar uma plataforma focada em tecnologia, com design moderno e responsivo. O objetivo foi criar uma interface amigável que combina funcionalidade com uma navegação intuitiva e eficiente.",
        data: "12 de janeiro 2024"
    },
    {
        nome: "Latam Airlines",
        imagem: "/projects/LatamAirlIines.png",
        tecnologias: ["HTML5", "CSS3", "Sass", "JavaScript", "React", "Next.js", "Tailwind", "Swiper"],
        links: {
            linkedin: "https://www.linkedin.com/in/luiz-antonio-souza-5000a226b/",
            github: "https://github.com/LuixzSouza/LatamAirLanes",
            verProjeto: "https://latamairlinesluiz.netlify.app"
        },
        descricao: "Este projeto foi desenvolvido para simular a interface de uma plataforma de reservas de voo, inspirada na identidade visual da Latam Airlines. A ideia foi criar uma aplicação moderna e intuitiva, com foco em usabilidade e design responsivo, proporcionando uma experiência agradável aos usuários.",
        data: "12 de janeiro 2024"
    },
    {
        nome: "Spider Man 2",
        imagem: "/projects/Spider-Man2.png",
        tecnologias: ["HTML5", "CSS3", "Sass", "JavaScript", "React", "Next.js", "Tailwind", "Swiper"],
        links: {
            linkedin: "https://www.linkedin.com/in/luiz-antonio-souza-5000a226b/",
            github: "https://github.com/LuixzSouza/spidermanluiz",
            verProjeto: "https://spidermanluiz.netlify.app"
        },
        descricao: "Este projeto foi desenvolvido para criar uma landing page dinâmica e envolvente, inspirada no universo do Spider Man. O foco foi na criação de uma experiência visual impactante e interativa, utilizando técnicas modernas de desenvolvimento web.",
        data: "12 de janeiro 2024"
    },
    {
        nome: "JAVA | SQL",
        imagem: "/projects/JAVA-SQL.png",
        tecnologias: ["Faculdade", "JAVA", "SQL"],
        links: {
            linkedin: "https://www.linkedin.com/in/luiz-antonio-souza-5000a226b/",
            github: "https://github.com/LuixzSouza/JAVA-SQL",
            verProjeto: "https://github.com/LuixzSouza/JAVA-SQL"
        },
        descricao: "Este projeto desenvolve uma aplicação Java com Maven, Hibernate e MySQL, estruturando a classe Veículo e implementando operações de CRUD (inserção, consulta, remoção e atualização). Ele permite armazenar e gerenciar dados de veículos de forma eficiente em um banco de dados relacional.",
        data: "12 de janeiro 2024"
    },
    {
        nome: "Python BotNotepad Test",
        imagem: "/projects/Python-BotNotepad-Test.png",
        tecnologias: ["Python"],
        links: {
            linkedin: "https://www.linkedin.com/in/luiz-antonio-souza-5000a226b/",
            github: "https://github.com/LuixzSouza/Python-BotNotepad-Test",
            verProjeto: "https://github.com/LuixzSouza/Python-BotNotepad-Test"
        },
        descricao: "Este projeto contém um bot simples em Python que utiliza a biblioteca PyAutoGUI para automatizar tarefas no computador. Especificamente, este bot abre o Bloco de Notas (Notepad) no Windows, escreve uma mensagem predefinida e simula a digitação no programa. O bot é útil para demonstração de automação de interface gráfica e interação com aplicativos desktop.",
        data: "12 de janeiro 2024"
    },
    {
        nome: "Exercicios JavaScript",
        imagem: "/projects/Exercicios-JavaScript.png",
        tecnologias: ["Node.js", "JavaScript"],
        links: {
            linkedin: "https://www.linkedin.com/in/luiz-antonio-souza-5000a226b/",
            github: "https://github.com/LuixzSouza/Exercicio_JavaScript-Node.js",
            verProjeto: "https://github.com/LuixzSouza/Exercicio_JavaScript-Node.js"
        },
        descricao: "Varios exercicos para treinar o desenvolvimento em JavaScript e Node.js",
        data: "12 de janeiro 2024"
    },
    {
        nome: "JAVA | ONG | Trabalho Facul",
        imagem: "/projects/Trabalho-Java-ONG.png",
        tecnologias: ["Faculdade", "JAVA", ],
        links: {
            linkedin: "https://www.linkedin.com/in/luiz-antonio-souza-5000a226b/",
            github: "https://github.com/LuixzSouza/Sistema-de-Gerenciamento-de-ONG",
            verProjeto: "https://github.com/LuixzSouza/Sistema-de-Gerenciamento-de-ONG"
        },
        descricao: "Este sistema foi desenvolvido para facilitar o processo de agendamento de doações para Organizações Não Governamentais (ONGs). O objetivo é permitir que os doadores registrem suas informações, cadastrem itens que irão doar (como roupas, alimentos, etc.), e agendem a data para a entrega ou retirada das doações. O sistema também valida as entradas de dados, como CPF e data, garantindo maior precisão nas informações fornecidas.",
        data: "12 de janeiro 2024"
    },
    {
        nome: "JAVA | POO | Trabalho Facul",
        imagem: "/projects/Trabalho-POO-Java.png",
        tecnologias: ["JAVA", "Atividade"],
        links: {
            linkedin: "https://www.linkedin.com/in/luiz-antonio-souza-5000a226b/",
            github: "https://github.com/LuixzSouza/LISTA_EXERCICIOS_POO-4p---Luiz-Ant-nio-de-Souza-",
            verProjeto: "https://github.com/LuixzSouza/LISTA_EXERCICIOS_POO-4p---Luiz-Ant-nio-de-Souza-"
        },
        descricao: "Atividades feita para entregar ao professor",
        data: "12 de janeiro 2024"
    },
    {
        nome: "Modulo JavaScript",
        imagem: "/projects/Modulo-JavaScript.png",
        tecnologias: ["JavaScript", "Ajuda"],
        links: {
            linkedin: "https://www.linkedin.com/posts/luiz-antonio-souza-5000a226b_javascript-webdevelopment-codingjourney-activity-7200155836277542912-faey?utm_source=share&utm_medium=member_desktop",
            github: "https://github.com/LuixzSouza/ModuloJavaScript",
            verProjeto: "https://github.com/LuixzSouza/ModuloJavaScript"
        },
        descricao: "Criei um repositório com módulos dedicados a diferentes tópicos de JavaScript, começando com uma introdução simples e avançando para manipulações complexas do DOM e armazenamento local. ",
        data: "24 de Maio 2024"
    },
];