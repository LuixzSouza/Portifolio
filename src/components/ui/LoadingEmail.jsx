import Image from "next/image";
import { Paragraph } from "../typrography/Paragraph";
import { useState, useEffect } from "react";

export function LoadingEmail({ status, onClose }) {
    const [progress, setProgress] = useState(0);
    const [showButton, setShowButton] = useState(false);

    // Simulação do progresso
    useEffect(() => {
        if (status === "loading") {
            const interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prev + 10; // Incrementa o progresso
                });
            }, 200); // Ajuste o tempo para controlar a velocidade
        }
    }, [status]);

    // Exibe o botão após o status de sucesso ou erro por 2 segundos
    useEffect(() => {
        if (status === "success" || status === "error") {
            const timer = setTimeout(() => {
                setShowButton(true);
            }, 2000); // 2 segundos de delay antes de mostrar o botão

            return () => clearTimeout(timer); // Limpa o timer se o componente for desmontado
        }
    }, [status]);

    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black/70 flex flex-col items-center justify-center z-50">
            {status === "loading" && (
                <Image
                    src={'/icons/icon-load.svg'}
                    width={65}
                    height={65}
                    alt="Icon Load"
                    className="animate-loading-spin"
                />
            )}
            {status === "success" && (
                <Image
                    src={'/icons/icon-sucess.svg'}
                    width={65}
                    height={65}
                    alt="Icon Sucesso"
                />
            )}
            {status === "error" && (
                <div className="h-16 w-16 flex items-center justify-center py-3 text-white text-5xl bg-red-600/80 rounded-full">
                    &times;
                </div>
            )}

            <div className="relative mt-12 w-28 h-1 bg-white/25">
                <div
                    className="absolute top-0 left-0 h-full bg-white transition-all"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

            <div className="mt-12">
                <Paragraph size="tiny" color="white">
                    {status === "loading" && "Enviando E-mail..."}
                    {status === "success" && "E-mail Enviado com Sucesso!"}
                    {status === "error" && "Erro ao Enviar. Tente Novamente."}
                </Paragraph>
            </div>

            {/* Exibe o botão de fechar somente após o status ser sucesso ou erro */}
            {showButton && (
                <button
                    onClick={onClose}
                    className="mt-8 px-4 py-2 bg-white text-black rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                    Fechar
                </button>
            )}
        </div>
    );
}
