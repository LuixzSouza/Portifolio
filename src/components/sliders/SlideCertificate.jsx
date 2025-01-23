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
import Link from "next/link";
import { LinkCustom } from "../ui/LinkCustom";
import { Paragraph } from "../typrography/Paragraph";
import Image from "next/image";

const certificados = [
    { link: "/certificates/Certificado_ABNT_Univas_Luiz.pdf", emitido: "Univas Virtual", data: "08/12/2023", curso: "Normas da ABNT (Módulo I)" },
    { link: "/certificates/Certificado_AWS.pdf", emitido: "AWS acadamy", data: "12/04/2024", curso: "AWS Academy Cloud Foundations"  },
    { link: "/certificates/Certificado_GameJam.pdf", emitido: "Game Jam", data: "09/11/2024", curso: "Ganhandor | Participação"  },
    { link: "/certificates/Certificado_ABNT2_Univas_Luiz.pdf", emitido: "Univas Virtual", data: "08/12/2023", curso: "Normas da ABNT (Módulo II)"  },
    { link: "/certificates/Certificado_Boost_Luiz.pdf", emitido: "William Moreira", data: "03/05/2023", curso: "CodeBoost"  },
    { link: "/certificates/Certificado_Cidadão_Univas_Luizz.pdf", emitido: "Univas Virtual", data: "06/12/2023", curso: "Módulo I do PRONID Cidadão"  },
    { link: "/certificates/Certificado_Matematica_Univas_Luiz.pdf", emitido: "Univas Virtual", data: "06/12/2023", curso: "Módulo Matemática Descomplica"  },
    { link: "/certificates/Certificado_php_Luiz.pdf", emitido: "ROCKTSEAT", data: "11/10/2024", curso: "Curso Online de PHP"  },
    { link: "/certificates/Certificado_Portugues1_Univas_Luiz.pdf", emitido: "Univas Virtual", data: "06/12/22023", curso: "Módulo II PRONID"  },
    { link: "/certificates/Certificado_Portugues2_Univas_Luiz.pdf", emitido: "Univas Virtual", data: "08/12/22023", curso: "Módulo PRONID"   },
    { link: "/certificates/Certificado-Bradesco.pdf", emitido: "Bradesco", data: "13/10/2024", curso: "Criação de Site"  },
    { link: "/certificates/Curriculo_Luiz_2025.pdf", emitido: "Luiz Souza", data: "01/01/2025", curso: "Portifolio Luiz"  },
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
        <div className="relative w-full h-auto flex items-center justify-center gap-10">
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
                    className="h-full"
                >
                    {/* Slides de projetos */}
                    {shuffledCertificados.map((item) => (
                        <SwiperSlide key={item.link} className="relative bg-white/20 flex flex-col items-center justify-center w-full h-full rounded-lg">
                            <div className="bg-white/10 flex items-center justify-center w-full h-450 overflow-hidden rounded-lg" >
                                <iframe
                                    src={item.link}
                                    className="w-full h-full max-w-full max-h-full"
                                    title={`Certificado ${item.link}`}
                                ></iframe>
                            </div>
                            <div className="p-4 w-full flex-col" >
                                <div className="flex flex-col gap-2" >
                                    <Paragraph size="tiny" color="white">Emitido por: <span className={"text-white/50"} >{item.emitido}</span></Paragraph>
                                    <Paragraph size="tiny" color="white">Data: <span className={"text-white/50"} >{item.data}</span></Paragraph>
                                    <Paragraph size="tiny" color="white">Curso: <span className={"text-white/50"} >{item.curso}</span></Paragraph>
                                </div>
                                <div className="pt-4" >
                                    <LinkCustom img={"image/icon-eye.svg"} link={item.link} color="white">
                                        VER CERTIFICADO
                                    </LinkCustom>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
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
