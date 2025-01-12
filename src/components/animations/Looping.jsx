'use client'

// React / Next
import { useState, useRef } from "react";
import { HoverableIcon } from "@/components/ui/HoverrableIcon";

export function Looping() {
    const [isPaused, setIsPaused] = useState(false);
    const timeoutRef = useRef(null); // Referência para controlar o timeout

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current); // Limpa qualquer timeout ativo para evitar conflitos
        }
        setIsPaused(true);
    };

    const handleMouseLeave = () => {
        // Define um atraso antes de remover o estado de pausa
        timeoutRef.current = setTimeout(() => {
            setIsPaused(false);
        }, 300); // Delay de 300ms (você pode ajustar esse valor)
    };

    const icons = [
        { src: "/icons/bootstrap.svg", nome: "Bootstrap", gradient: "bg-btn-bootstrap" },
        { src: "/icons/C.svg", nome: "C", gradient: "bg-btn-c" },
        { src: "/icons/CSS3.svg", nome: "CSS3", gradient: "bg-btn-css" },
        { src: "/icons/debian.svg", nome: "Debian", gradient: "bg-btn-debian" },
        { src: "/icons/duolingo.svg", nome: "Duolingo", gradient: "bg-btn-duolingo" },
        { src: "/icons/eclipse.svg", nome: "Eclipse", gradient: "bg-btn-eclipse" },
        { src: "/icons/Figma.svg", nome: "Figma", gradient: "bg-btn-figma" },
        { src: "/icons/html5.svg", nome: "HTML5", gradient: "bg-btn-html" },
        { src: "/icons/invision.svg", nome: "Invision", gradient: "bg-btn-invision" },
        { src: "/icons/java.svg", nome: "Java", gradient: "bg-btn-java" },
        { src: "/icons/JavaScript.svg", nome: "JavaScript", gradient: "bg-btn-js" },
        { src: "/icons/Linux.svg", nome: "Linux", gradient: "bg-btn-linux" },
        { src: "/icons/mysql.svg", nome: "MySQL", gradient: "bg-btn-mysql" },
        { src: "/icons/netlify.svg", nome: "Netlify", gradient: "bg-btn-netlify" },
        { src: "/icons/next.svg", nome: "Next.js", gradient: "bg-btn-next" },
        { src: "/icons/Node.svg", nome: "Node.js", gradient: "bg-btn-node" },
        { src: "/icons/PHP.svg", nome: "PHP", gradient: "bg-btn-php" },
        { src: "/icons/powerpoint.svg", nome: "PowerPoint", gradient: "bg-btn-powerpoint" },
        { src: "/icons/python.svg", nome: "Python", gradient: "bg-btn-python" },
        { src: "/icons/React.svg", nome: "React", gradient: "bg-btn-react" },
        { src: "/icons/Sass.svg", nome: "Sass", gradient: "bg-btn-sass" },
        { src: "/icons/styled-components.svg", nome: "Styled Components", gradient: "bg-btn-styled-components" },
        { src: "/icons/vsCode.svg", nome: "VSCode", gradient: "bg-btn-vscode" },
        { src: "/icons/Windows.svg", nome: "Windows", gradient: "bg-btn-windows" },
        { src: "/icons/wordpress.svg", nome: "WordPress", gradient: "bg-btn-wordpress" },
    ];

    return (
        <div className="relative logos overflow-hidden py-16 bg-white whitespace-nowrap">
            <div className="bg-white/50 backdrop-blur-sm w-20 h-full absolute top-0 left-0 z-30" ></div>
            <div className="bg-white/50 backdrop-blur-sm w-20 h-full absolute top-0 right-0 z-30" ></div>
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
