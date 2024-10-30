'use client'

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { RetangleProjects } from "@/components/ContentProject";

import 'swiper/css';
import 'swiper/css/navigation';
import { useRef } from "react";

export function Slider() {
    const swiperRef = useRef();

    return (
        <div className="relative w-full">
            <button
                className="p-3 text-white font-roobert bg-blue rounded-full shadow-lg flex items-center justify-center absolute z-10 left-4 top-1/2 -translate-y-1/2 hover:bg-black/50 transition duration-300"
                onClick={() => swiperRef.current?.slidePrev()}
            >
                ANTERIOR
            </button>

            <Swiper
                modules={[Navigation, Autoplay]}
                slidesPerView={1}
                spaceBetween={40}
                speed={800}
                loop={true}
                autoplay={{
                    delay: 2000,  // 2 segundos entre os slides
                    disableOnInteraction: false,  // Continua mesmo após interação do usuário
                    pauseOnMouseEnter: true,  // Pausa ao passar o mouse sobre o slide
                }}
                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper;
                }}
            >
                <SwiperSlide>
                    <RetangleProjects nome="Projeto 1" img="p-codeboost.png" />
                </SwiperSlide>
                <SwiperSlide>
                    <RetangleProjects nome="Projeto 2" img="p-formula-idioma.png" />
                </SwiperSlide>
                <SwiperSlide>
                    <RetangleProjects nome="Projeto 3" img="p-new-project.png" />
                </SwiperSlide>
            </Swiper>

            <button
                className="p-3 text-white font-roobert bg-blue rounded-full shadow-lg flex items-center justify-center absolute z-10 right-4 top-1/2 -translate-y-1/2 hover:bg-black/50 transition duration-300"
                onClick={() => swiperRef.current?.slideNext()}
            >
                PRÓXIMO
            </button>
        </div>
    );
}
