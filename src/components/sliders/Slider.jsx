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
import Image from "next/image";

export function Slider() {
    const swiperRef = useRef();
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    return (
        <div className="sticky top-0 w-full h-auto flex items-center justify-center gap-10 md:h-screen" >
            {/* Botão anterior */}
            {!isBeginning && (
                <button
                    className="group p-2 bg-white/80 rounded-full shadow-lg flex items-center justify-center absolute z-10 -left-8 top-1/2 -translate-y-1/2 hover:bg-black/80 transition duration-300 scale-110"
                    onClick={() => swiperRef.current?.slidePrev()}
                >
                    <Image src={"/icons/iconarrow.svg"} width={35} height={35} alt="Seta" className="rotate-180 group-hover:invert"/>
                </button>
            )}
            <div className="relative overflow-hidden">
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
                            nome="CasaPronta" 
                            img="image/p-casapronta.png" 
                            categoryies={"HTML CSS JAVASCRIPT"} 
                            idProjeto={"PLZ-0100"}
                            link={"https://casaprontaconstrusilva.com.br"}
                        />
                    </SwiperSlide>
                    
                    <SwiperSlide className="flex items-center justify-center">
                        <RetangleProjects 
                            nome="Formula Idioma" 
                            img="image/p-formula-idioma.png" 
                            idProjeto={"PLZ-0200"}
                            link={"https://www.formulaidiomas.com.br"}
                        />
                    </SwiperSlide>

                    <SwiperSlide className="flex items-center justify-center">
                        <RetangleProjects 
                            nome="KingHost" 
                            img="image/p-kinghost.png" 
                            idProjeto={"PLZ-0300"}
                            link={"https://kinghostluiz.netlify.app"}
                        />
                    </SwiperSlide>

                    <SwiperSlide className="flex items-center justify-center">
                        <RetangleProjects 
                            nome="CloudBoost" 
                            img="image/p-cloudboost.png" 
                            idProjeto={"PLZ-0400"}
                            link={"https://cloudboostluiz.netlify.app"}
                        />
                    </SwiperSlide>
                    
                    {/* Slide de "Ver Todos Projetos" */}
                    <SwiperSlide>
                        <Link href={"/work"} className="flex flex-col items-center justify-center w-full h-370 max-h-755 rounded-lg group md:h-550">
                            <div className="flex flex-col items-center justify-center relative w-full rounded-lg max-w-900 h-full text-white bg-[#0f0f0f] p-6 border-2 border-[#2d2e2f] hover:bg-white/95 hover:text-black hover:border-white transition-all ease-in-out duration-300 cursor-pointer">
                                <span className="text-4xl font-bold group-hover:scale-150 transition-all ease-in-out duration-75">
                                    VER TODOS <br /> PROJETOS
                                </span>
                            </div>
                        </Link>
                    </SwiperSlide>
                </Swiper>

            </div>
            {/* Botão próximo */}
            {!isEnd && (
                <button
                    className="group p-3 font-roobert border bg-white/80 rounded-full shadow-lg flex items-center justify-center absolute z-10 -right-8 top-1/2 -translate-y-1/2 hover:bg-black transition duration-300 scale-110"
                    onClick={() => swiperRef.current?.slideNext()}
                >
                    <Image src={"/icons/iconarrow.svg"} width={35} height={35} alt="Seta" className="group-hover:invert"/>
                </button>
            )}
        </div>
    );
}
