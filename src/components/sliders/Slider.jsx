'use client'

// React
import { useRef } from "react";

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

    return (
        <div className="relative max-w-1018 overflow-hidden">
            <button
                className="p-2 text-black font-roobert border border-black bg-white rounded-full shadow-lg flex items-center justify-center absolute z-10 left-4 top-1/2 -translate-y-1/2 hover:bg-black hover:text-white hover:border-white  transition duration-300"
                onClick={() => swiperRef.current?.slidePrev()}
            >
                ANTERIOR
            </button>

            <Swiper
                modules={[Navigation, Autoplay, EffectFade]} // Adicione o módulo do efeito
                slidesPerView={1}
                spaceBetween={40}
                speed={800}
                loop={true}
                effect="fade" // Especifique o tipo de efeito aqui
                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper;
                }}
            >
                <SwiperSlide>
                    <RetangleProjects nome="Code-Boost" img="p-codeboost.png" categoryies={"HTML CSS JAVASCRIPT"} />
                </SwiperSlide>
                <SwiperSlide>
                    <RetangleProjects nome="Formula Idioma" img="p-formula-idioma.png" categoryies={"HTML CSS JAVASCRIPT SASS"}/>
                </SwiperSlide>
                <SwiperSlide>
                    <RetangleProjects nome="Mais Projetos" img="bg-more-projects.png" categoryies={"HTML CSS JAVASCRIPT"}/>
                </SwiperSlide>
            </Swiper>

            <button
                className="p-3 text-black font-roobert border border-black bg-white rounded-full shadow-lg flex items-center justify-center absolute z-10 right-4 top-1/2 -translate-y-1/2 hover:bg-black hover:text-white hover:border-white transition duration-300"
                onClick={() => swiperRef.current?.slideNext()}
            >
                PRÓXIMO
            </button>
        </div>
    );
}
