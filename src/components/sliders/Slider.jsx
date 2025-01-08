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
import Link from "next/link";

export function Slider() {
    const swiperRef = useRef();
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    return (
        <div className="sticky top-0 w-full h-screen flex items-center justify-center gap-10 overflow-hidden" >
            <div className="relative overflow-hidden">
                {/* Botão anterior */}
                {!isBeginning && (
                    <button
                        className="p-2 text-black font-roobert border border-black bg-white rounded-full shadow-lg flex items-center justify-center absolute z-10 left-4 top-1/2 -translate-y-1/2 hover:bg-black hover:text-white hover:border-white transition duration-300"
                        onClick={() => swiperRef.current?.slidePrev()}
                    >
                        ANTERIOR
                    </button>
                )}

                {/* Componente Swiper para projetos em estilo de galeria */}
                <Swiper
                    modules={[Navigation, Autoplay, EffectFade]}
                    spaceBetween={30}
                    speed={800}
                    loop={false}
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    onSlideChange={(swiper) => {
                        setIsBeginning(swiper.isBeginning);
                        setIsEnd(swiper.isEnd);
                    }}
                    breakpoints={{
                        768: {
                            slidesPerView: 2,
                        },
                    }}
                >
                    {/* Slides de projetos */}
                    <SwiperSlide className="flex items-center justify-center">
                        <RetangleProjects 
                            nome="Code-Boost" 
                            img="p-codeboost.png" 
                            categoryies={"HTML CSS JAVASCRIPT"} 
                            idProjeto={"PLZ-0100"}
                            resum={"O FormulaIdiomas é uma plataforma dedicada ao ensino de idiomas, oferecendo um ambiente interativo para aprendizado eficaz. O site foi projetado para ser intuitivo e acessível, facilitando a jornada do usuário no aprendizado de novos idiomas."}
                            link={"/work"}
                        />
                    </SwiperSlide>
                    
                    <SwiperSlide className="flex items-center justify-center">
                        <RetangleProjects 
                            nome="Formula Idioma" 
                            img="p-formula-idioma.png" 
                            categoryies={"HTML CSS JAVASCRIPT SASS"} 
                            idProjeto={"PLZ-0200"}
                            resum={"O FormulaIdiomas é uma plataforma dedicada ao ensino de idiomas, oferecendo um ambiente interativo para aprendizado eficaz. O site foi projetado para ser intuitivo e acessível, facilitando a jornada do usuário no aprendizado de novos idiomas."}
                            link={"/work"}
                        />
                    </SwiperSlide>
                    
                    {/* Slide de "Ver Todos Projetos" */}
                    <SwiperSlide>
                        <Link href={"/work"} className="flex flex-col items-center justify-center w-full h-550 max-h-755 rounded-lg group">
                            <div className="flex flex-col items-center justify-center relative w-full rounded-lg max-w-900 h-full bg-white p-6 border-2 border-black/10 hover:bg-black hover:text-white hover:border-white transition-all ease-in-out duration-300 cursor-pointer">
                                <span className="text-4xl font-bold group-hover:scale-150 transition-all ease-in-out duration-75">
                                    VER TODOS <br /> PROJETOS
                                </span>
                            </div>
                        </Link>
                    </SwiperSlide>
                </Swiper>

                {/* Botão próximo */}
                {!isEnd && (
                    <button
                        className="p-3 text-black font-roobert border border-black bg-white rounded-full shadow-lg flex items-center justify-center absolute z-10 right-4 top-1/2 -translate-y-1/2 hover:bg-black hover:text-white hover:border-white transition duration-300"
                        onClick={() => swiperRef.current?.slideNext()}
                    >
                        PRÓXIMO
                    </button>
                )}
            </div>
        </div>
    );
}
