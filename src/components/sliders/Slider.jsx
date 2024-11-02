'use client'

// React
import { useRef, useState } from "react";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";

// Componentes
import { RetangleProjects } from "@/components/content/ContentProject";

// Css Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

export function Slider() {
    const swiperRef = useRef();
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    return (
        <div className="relative max-w-1018 overflow-hidden">
            {!isBeginning && (
                <button
                    className="p-2 text-black font-roobert border border-black bg-white rounded-full shadow-lg flex items-center justify-center absolute z-10 left-4 top-1/2 -translate-y-1/2 hover:bg-black hover:text-white hover:border-white  transition duration-300"
                    onClick={() => swiperRef.current?.slidePrev()}
                >
                    ANTERIOR
                </button>
            )}

            <Swiper
                modules={[Navigation, Autoplay, EffectFade]} // Adicione o módulo do efeito
                slidesPerView={1}
                spaceBetween={40}
                speed={800}
                loop={false}
                effect="fade" // Especifique o tipo de efeito aqui
                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper;
                }}
                onSlideChange={(swiper) => {
                    setIsBeginning(swiper.isBeginning);
                    setIsEnd(swiper.isEnd);
                }}
            >
                <SwiperSlide className="flex items-center justify-center" >
                    <RetangleProjects nome="Code-Boost" img="p-codeboost.png" categoryies={"HTML CSS JAVASCRIPT"} idProjeto={"PLZ-0100"}
                        resum={"O FormulaIdiomas é uma plataforma dedicada ao ensino de idiomas, oferecendo um ambiente interativo para aprendizado eficaz. O site foi projetado para ser intuitivo e acessível, facilitando a jornada do usuário no aprendizado de novos idiomas."}
                    />
                </SwiperSlide>
                <SwiperSlide className="flex items-center justify-center" >
                    <RetangleProjects nome="Formula Idioma" img="p-formula-idioma.png" categoryies={"HTML CSS JAVASCRIPT SASS"} idProjeto={"PLZ-0200"}
                         resum={"O FormulaIdiomas é uma plataforma dedicada ao ensino de idiomas, oferecendo um ambiente interativo para aprendizado eficaz. O site foi projetado para ser intuitivo e acessível, facilitando a jornada do usuário no aprendizado de novos idiomas."}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <div className="flex flex-col items-center justify-center w-full h-screen max-h-755" >
                        <div className="flex group flex-col items-center justify-center relative w-full max-w-900 h-full overflow-hidden group cursor-cursoClick border-2 border-black/10 bg-white p-6 group-hover:bg-black ease-in-out duration-300" >
                            <div className="w-full h-full flex flex-col items-center justify-center gap-4 pb-6 pt-6" >
                                <span className="text-8xl group-hover:scale-105 ease-in-out duration-200" >VER TODOS <br/> PROJETOS</span>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>

            {!isEnd && (
                <button
                    className="p-3 text-black font-roobert border border-black bg-white rounded-full shadow-lg flex items-center justify-center absolute z-10 right-4 top-1/2 -translate-y-1/2 hover:bg-black hover:text-white hover:border-white transition duration-300"
                    onClick={() => swiperRef.current?.slideNext()}
                >
                    PRÓXIMO
                </button>
            )}
        </div>
    );
}
