"use client";

import Image from "next/image";
import { Heading } from "@/components/typrography/Heading"; // ok

export function StimeLine({
  stepNumber,
  title,
  heading,
  paragraph,
  date,
  imgSrc,
  subImgSrc,
  lineClass,
  progress,
  isMobile
}) {
  return (
    <div className="step-content relative h-screen w-screen flex flex-col items-center justify-center z-30 overflow-hidden gap-16 md:flex-row md:sticky md:top-0">
      <div className="absolute top-0 left-8 w-3 h-full bg-white/10 flex items-center justify-start md:top-24 md:left-0 md:w-full md:h-3">
        <div className="relative w-full h-full flex items-start md:items-center">
          <div className="absolute -left-8 z-20 flex items-center justify-center w-20 h-20 bg-black rounded-full border border-white md:relative md:left-0">
            <div className="w-10 h-10 rounded-full bg-whiteSecondary"></div>
            <div className="absolute -bottom-16 left-0">
              <Heading as="h2" size="small" className="font-bold mb-4 text-whiteSecondary max-w-900">
                {date}
              </Heading>
            </div>
          </div>
          <div 
            className={`absolute z-10 left-0 top-0 bg-black rounded-full border-2 border-white ${lineClass} transition-all duration-300 ease-linear`} 
            style={isMobile 
              ? { height: `${progress}%`, width: "100%" }  // No mobile, altura aumenta conforme progress
              : { width: `${progress}%`, height: "100%"}  // No desktop, largura aumenta conforme progress
            }
          ></div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center text-center w-full first-of-type:ml-1 pt-8 md:pt-0 md:pl-8 md:w-1/2">
        <Heading as="h3" size="litlle" color="white" className="font-semibold mb-2 text-center">
          {stepNumber} — {title}
        </Heading>
        <Heading as="h2" size="small" className="font-bold mb-4 text-bluePrimary max-w-900 text-center">
          {heading}
        </Heading>
        <p className="max-w-[600px] font-medium text-whiteSecondary" dangerouslySetInnerHTML={{ __html: paragraph }} />
      </div>
      <div className="flex flex-col items-center justify-center w-full pb-8 md:w-1/2 md:pb-0 md:pr-8">
        <div className="relative z-10">
          <Image src={imgSrc} alt={heading || "Image"} width={465} height={250} className="rounded-lg border-2 border-white" />
          <div className="absolute z-20 -bottom-20 -right-20">
            <Image src={subImgSrc} alt={heading || "Image"} width={270} height={185} className="rounded-lg border-2 border-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StimeLine;
