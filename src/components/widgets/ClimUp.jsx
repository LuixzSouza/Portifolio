import React, { useEffect, useState } from 'react';

export function ClimUp() {
    const [isVisible, setIsVisible] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Mostrar o botão apenas se o scroll estiver acima de 1000 e detectando movimento
            if (currentScrollY > 1000 && currentScrollY > lastScrollY) {
                setIsVisible(false);
            } else if (currentScrollY > 1000 && currentScrollY < lastScrollY) {
                setIsVisible(true);
            } else if (currentScrollY <= 1000) {
                setIsVisible(false); // Ocultar se o scroll for menor ou igual a 1000
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div
            className={`fixed z-50 bottom-12 right-12 w-12 h-12 bg-blue-600 rounded-lg transition-transform transition-opacity duration-300 cursor-pointer ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}
            onClick={scrollToTop}
        >
            <span className="text-white flex justify-center items-center h-full">Subir</span>
        </div>
    );
}
