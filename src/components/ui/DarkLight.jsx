'use client';

// React
import { useState } from "react";

export function DarkLight({ onToggleTheme }) {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        const newTheme = !isDarkMode;
        setIsDarkMode(newTheme);
        onToggleTheme(newTheme); // Passa o estado atualizado para o HeaderHome
        document.documentElement.classList.toggle('dark', newTheme); // Adiciona ou remove a classe 'dark'
    };

    return (
        <div
            className={`relative flex items-center w-full h-9 max-w-20 dark:bg-gray-800 rounded-full p-2 cursor-pointer
                ${isDarkMode ? 'bg-black' : 'bg-white'}`}
            onClick={toggleTheme}
        >
            <div
                className={`w-7 h-7 bg-gray-800 rounded-full transition-transform duration-300 ease-in-out
                ${isDarkMode ? 'translate-x-full bg-white' : 'translate-x-0 bg-black'}`}
            ></div>
        </div>
    );
}
