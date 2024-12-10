// Para habilitar hooks e estado
"use client";

// Next
import Image from "next/image";

// Componentess
import { Heading } from "@/components/typrography/Heading";//ok

export function StimeLine({ stepNumber, title, heading, paragraph, date, imgSrc, subImgSrc, lineClass, progress }) {
  return (
    <div className="step-content sticky top-0 h-screen w-screen flex items-center justify-center z-30 overflow-hidden">
      <div className="absolute top-24 left-0 w-full h-3 bg-white/10 flex items-center justify-start" >
        <div className="relative w-full h-full flex items-center">
          <div className="relative z-20 flex items-center justify-center w-20 h-20 bg-black rounded-full border border-white">
            <div className="w-10 h-10 rounded-full bg-whiteSecondary"></div>
            <div className="absolute -bottom-16 left-0">
              <Heading as="h2" size="small" className="font-bold mb-4 text-whiteSecondary max-w-900">
                {date}
              </Heading>
            </div>
          </div>
          <div 
            className={`absolute z-10 left-0 top-0 h-3 bg-black rounded-full border-2 border-white ${lineClass} transition-all duration-300 ease-linear`} 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center text-center w-1/2 first-of-type:ml-1">
        <Heading as="h3" size="litlle" color="white" className="font-semibold mb-2">
          {stepNumber} — {title}
        </Heading>
        <Heading as="h2" size="small" className="font-bold mb-4 text-bluePrimary max-w-900">
          {heading}
        </Heading>
        <p className="max-w-[600px] font-medium text-whiteSecondary" dangerouslySetInnerHTML={{ __html: paragraph }} />
      </div>
      <div className="flex flex-col items-center justify-center w-1/2">
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
