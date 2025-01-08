'use client';

import { useEffect, useState } from "react";

export function Clock({ isDarkMode }) { // Recebe isDarkMode como prop
    const [time, setTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const formattedTime = now.toLocaleTimeString("en-GB", {
                timeZone: "America/Sao_Paulo",
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });
            setTime(formattedTime + " GMT-3");
        };

        updateTime(); // Atualiza imediatamente
        const interval = setInterval(updateTime, 1000); // Atualiza a cada 1s

        return () => clearInterval(interval); // Limpa o intervalo ao desmontar
    }, []);

    return (
        <span className={`${isDarkMode ? 'text-white' : 'text-black'}`}>
            {time}
        </span>
    );
}
