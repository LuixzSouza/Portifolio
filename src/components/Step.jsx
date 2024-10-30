"use client"; // Para habilitar hooks e estado

import Image from "next/image";

export function Step({ stepNumber, title, heading, paragraph, imgSrc }) {


  return (
    <div className="step-content sticky top-0 h-screen w-screen flex items-center justify-center bg-white z-30 overflow-hidden">

      <div className="flex flex-col items-center justify-center text-center w-1/2">
        <h3 className="text-xl font-semibold text-gray-700 mb-2 text-[#201d19cc]">
          {stepNumber} — {title}
        </h3>
        <h2 className="text-6xl font-bold text-gray-900 mb-4 text-[#e56144]">{heading}</h2>
        <p className="text-gray-600 text-[#201d19cc] w-full max-w-[600px]">{paragraph}</p>
      </div>
      <div className="flex flex-col items-center justify-center w-1/2">
        <div className="relative z-10" >
          <Image src={imgSrc} alt={heading || "Image"} width={465} height={250}  className="rounded-lg" />
          <div className="absolute z-20 -bottom-20 -right-20" >
            <Image src={imgSrc} alt={heading || "Image"} width={270} height={185} className="rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step;