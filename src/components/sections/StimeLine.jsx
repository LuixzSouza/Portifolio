"use client";

import Image from "next/image";
import { Heading } from "@/components/typrography/Heading"; // ok

export function StimeLine({
  title,
  heading,
  paragraph,
  date,
  imgSrc,
  subImgSrc,
  lineClass,
  progress,
  isMobile,
  iconSrcs // Supondo que você passe um array de imagens de ícones
}) {
  // Transformando a string em uma lista de tópicos (se necessário)
  const paragraphList = Array.isArray(paragraph)
    ? paragraph
    : paragraph.split("\n").map((item) => item.trim()).filter(Boolean);

  return (
    <div className="step-content relative h-full w-screen flex flex-col-reverse items-center justify-center z-30 gap-16 px-4 md:h-screen md:px-0 md:flex-row md:sticky md:top-0 md:gap-0">
      <div className="absolute top-0 left-8 w-3 h-full bg-white/10 hidden items-center justify-start md:flex md:top-24 md:left-0 md:w-full md:h-3">
        <div className="relative w-full h-full flex items-start md:items-center md:justify-center">
          <div className="absolute -left-8 z-20 flex items-center justify-center w-14 h-14 bg-bluePrimary rounded-full md:relative md:-left-1">
            <div className="absolute -bottom-16 left-0">
              <Heading as="h3" size="tiny" className="font-semibold mb-4 text-whiteSecondary max-w-900">
                {date}
              </Heading>
            </div>
          </div>
          <div 
            className={`absolute z-10 left-0 top-0 bg-bluePrimary ${lineClass} transition-all duration-300 ease-linear`} 
            style={isMobile 
              ? { height: `${progress}%`, width: "100%" }  // No mobile, altura aumenta conforme progress
              : { width: `${progress}%`, height: "100%"}  // No desktop, largura aumenta conforme progress
            }
          ></div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-center w-full pb-8 md:w-1/2 md:pb-0 md:pr-8">
        <div className="relative w-full md:w-96 h-330" >
          <Image src={imgSrc} alt={heading || "Image"} fill style={{ objectFit: "cover" }} className="rounded-lg md:shadow-white/15 md:shadow-2xl" />
          <div className="relative hidden w-64 h-48 z-20 md:block md:absolute md:-bottom-20 md:-left-20">
            <Image src={subImgSrc} alt={heading || "Image"} fill style={{ objectFit: "cover" }} className="rounded-lg md:shadow-white/10 md:shadow-2xl" />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start justify-start text-center w-full first-of-type:ml-1 pt-12 md:pl-8 md:w-1/2">
        <Heading as="h3" size="tiny" className="font-bold mb-4 text-bluePrimary max-w-900 text-start">
          {heading}
        </Heading>
        <Heading as="h2" size="small" color="white" className="font-semibold mb-2 text-start max-w-600">
          {title}
        </Heading>
        
        {/* Adicionando a lista de tópicos */}
        <ul className="text-left text-whiteSecondary max-w-600">
          {paragraphList.map((item, index) => (
            <li key={index} className="text-start mb-2">{item}</li>
          ))}
        </ul>

        {/* Adicionando os ícones abaixo da lista */}
        <div className="flex justify-center gap-4 mt-6">
          {iconSrcs?.map((iconSrc, index) => (
            <div key={index} className="w-10 h-10 relative">
              <Image src={iconSrc} alt={`Icon ${index}`} fill style={{ objectFit: "cover" }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
