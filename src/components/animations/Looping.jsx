'use client'

// React / Next
import { useState } from "react";
import { HoverableIcon } from "@/components/ui/HoverrableIcon"; 


export function Looping() {
    const [isPaused, setIsPaused] = useState(false);

    const handleMouseEnter = () => {
        setIsPaused(true);
    };

    const handleMouseLeave = () => {
        setIsPaused(false);
    };

    const icons = [
        { src: "/icons/bootstrap.svg", nome: "Bootstrap", gradient: "bg-gradient-bootstrap" },
        { src: "/icons/C.svg", nome: "C", gradient: "bg-gradient-c" },
        { src: "/icons/CSS3.svg", nome: "CSS3", gradient: "bg-gradient-css" },
        { src: "/icons/debian.svg", nome: "Debian", gradient: "bg-gradient-debian" },
        { src: "/icons/duolingo.svg", nome: "Duolingo", gradient: "bg-gradient-duolingo" },
        { src: "/icons/eclipse.svg", nome: "Eclipse", gradient: "bg-gradient-eclipse" },
        { src: "/icons/Figma.svg", nome: "Figma", gradient: "bg-gradient-figma" },
        { src: "/icons/html5.svg", nome: "HTML5", gradient: "bg-gradient-html" },
        { src: "/icons/invision.svg", nome: "Invision", gradient: "bg-gradient-invision" },
        { src: "/icons/java.svg", nome: "Java", gradient: "bg-gradient-java" },
        { src: "/icons/JavaScript.svg", nome: "JavaScript", gradient: "bg-gradient-js" },
        { src: "/icons/Linux.svg", nome: "Linux", gradient: "bg-gradient-linux" },
        { src: "/icons/mysql.svg", nome: "MySQL", gradient: "bg-gradient-mysql" },
        { src: "/icons/netlify.svg", nome: "Netlify", gradient: "bg-gradient-netlify" },
        { src: "/icons/next.svg", nome: "Next.js", gradient: "bg-gradient-next" },
        { src: "/icons/Node.svg", nome: "Node.js", gradient: "bg-gradient-node" },
        { src: "/icons/PHP.svg", nome: "PHP", gradient: "bg-gradient-php" },
        { src: "/icons/powerpoint.svg", nome: "PowerPoint", gradient: "bg-gradient-powerpoint" },
        { src: "/icons/python.svg", nome: "Python", gradient: "bg-gradient-python" },
        { src: "/icons/React.svg", nome: "React", gradient: "bg-gradient-react" },
        { src: "/icons/Sass.svg", nome: "Sass", gradient: "bg-gradient-sass" },
        { src: "/icons/styled-components.svg", nome: "Styled Components", gradient: "bg-gradient-styled-components" },
        { src: "/icons/vsCode.svg", nome: "VSCode", gradient: "bg-gradient-vscode" },
        { src: "/icons/Windows.svg", nome: "Windows", gradient: "bg-gradient-windows" },
        { src: "/icons/wordpress.svg", nome: "WordPress", gradient: "bg-gradient-wordpress" },
    ];
    

    

    return (
        <div className="logos overflow-hidden py-16 bg-white whitespace-nowrap">
            {/* Aplica a classe de animação com base no estado */}
            <div className={`logos-slide relative inline-block animate-slide ${isPaused ? 'animate-pause' : ''}`}>
                <div className="inline-flex items-center gap-12 px-7">
                    {icons.map((item, index) => (
                        <HoverableIcon
                            key={index}
                            src={item.src}
                            alt={`Ícone de ${item.nome}`}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            nome={item.nome}
                            gradient={item.gradient}
                        />
                    ))}
                </div>
                <div className="inline-flex items-center gap-12 px-7">
                    {icons.map((item, index) => (
                        <HoverableIcon
                            key={index + icons.length}
                            src={item.src}
                            alt={`Ícone de ${item.nome}`}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            nome={item.nome}
                            gradient={item.gradient}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
