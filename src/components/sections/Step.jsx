"use client"; // Para habilitar hooks e estado

import Image from "next/image";
import { Heading } from "@/components/typrography/Heading";//ok

export function Step({ stepNumber, title, heading, paragraph, date, imgSrc, subImgSrc }) {
  return (
    <div className="step-content sticky top-0 h-screen w-screen flex items-center justify-center z-30 overflow-hidden">
      <div className="flex flex-col items-center justify-center text-center w-1/2 first-of-type:ml-52">
        <Heading as="h3" size="litlle" color="blueSecondary" className="font-semibold mb-2"  >{stepNumber} — {title}</Heading>
        <Heading as="h2" size="small" className="font-bold mb-4 text-bluePrimary max-w-900" >{heading}<br/>{date}</Heading>
        <p
          className="max-w-[600px] font-medium text-blackSecond"
          dangerouslySetInnerHTML={{ __html: paragraph }}
        />
      </div>
      <div className="flex flex-col items-center justify-center w-1/2">
        <div className="relative z-10 ">
          <Image src={imgSrc} alt={heading || "Image"} width={465} height={250} className="rounded-lg border-2 border-black" />
          <div className="absolute z-20 -bottom-20 -right-20">
            <Image src={subImgSrc} alt={heading || "Image"} width={270} height={185} className="rounded-lg border-2 border-black" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step;
