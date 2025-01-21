'use client'

// React
import { useRef, useState, useEffect } from "react";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";

// Css Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const certificados = [
    { link: "/certificates/Certificado_ABNT_Univas_Luiz.pdf" },
    { link: "/certificates/Certificado_ABNT2_Univas_Luiz.pdf" },
    { link: "/certificates/Certificado_Boost_Luiz.pdf" },
    { link: "/certificates/Certificado_Cidadão_Univas_Luizz.pdf" },
    { link: "/certificates/Certificado_Matematica_Univas_Luiz.pdf" },
    { link: "/certificates/Certificado_php_Luiz.pdf" },
    { link: "/certificates/Certificado_Portugues1_Univas_Luiz.pdf" },
    { link: "/certificates/Certificado_Portugues2_Univas_Luiz.pdf" },
    { link: "/certificates/Certificado-Bradesco.pdf" },
    { link: "/certificates/Luiz_Curriculo_Português.pdf" },
];

// Função para embaralhar os certificados
const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

export function SlideCertificate() {
    const swiperRef = useRef();
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const [shuffledCertificados, setShuffledCertificados] = useState([]);

    useEffect(() => {
        // Embaralha os certificados ao carregar o componente
        setShuffledCertificados(shuffleArray(certificados));
    }, []);

    return (
        <div className="relative w-full h-auto flex items-center justify-center gap-10 overflow-hidden">
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
                    loop={true}
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    onSlideChange={(swiper) => {
                        setIsBeginning(swiper.isBeginning);
                        setIsEnd(swiper.isEnd);
                    }}
                    breakpoints={{
                        520: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                    }}
                    className="h-450"
                >
                    {/* Slides de projetos */}
                    {shuffledCertificados.map((item, index) => (
                        <SwiperSlide key={index} className="bg-white/10 flex items-center justify-center w-full h-full overflow-hidden rounded-lg">
                            <div className="w-full h-full aspect-[16/9]">
                                <object data={item.link} type="application/pdf" className="w-full h-full max-w-full max-h-full">
                                    <p>Seu navegador não tem um plugin para PDF</p>
                                </object>
                            </div>
                        </SwiperSlide>
                    ))}
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
