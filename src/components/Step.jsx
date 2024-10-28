"use client"; // Para habilitar hooks e estado

import { useRef, useState, useEffect } from "react";

export function Step({ stepNumber, title, heading, paragraph, videoSrc, imgSrc }) {
  const svgRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const totalLength = 1330; // Comprimento total da linha

  useEffect(() => {
    const handleScroll = () => {
      if (!svgRef.current) return;

      const elementTop = svgRef.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      let scrollPercent = Math.min(Math.max((windowHeight - elementTop) / windowHeight, 0), 1);
      setScrollY(scrollPercent * totalLength);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="step-content sticky top-0 h-screen w-screen flex items-center justify-center bg-white z-30 overflow-hidden">
      {/* SVG com linha reta */}
      <svg
        ref={svgRef}
        viewBox="0 0 1330 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0 w-full h-16 md:h-24"
      >
        {/* Linha de fundo laranja claro */}
        <line
          x1="0"
          y1="5"
          x2="1330"
          y2="5"
          stroke="#FFB347" // Cor laranja claro
          strokeWidth="3"
          strokeDasharray="10 5" // Padrão de traço e espaço
        />
        {/* Linha laranja forte que é preenchida dinamicamente */}
        <line
          x1="0"
          y1="5"
          x2="1330"
          y2="5"
          stroke="#E56144" // Laranja forte
          strokeWidth={3 + (scrollY / totalLength) * 7}
          strokeDasharray={totalLength}
          strokeDashoffset={totalLength - scrollY}
          className="transition-all duration-75 ease-linear"
        />
      </svg>

      <div className="content w-1/2">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          {stepNumber} — {title}
        </h3>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{heading}</h2>
        <p className="text-gray-600">{paragraph}</p>
      </div>

      <div className="media w-1/2">
        {videoSrc ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="rounded-lg shadow-lg w-full"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : imgSrc ? (
          <img
            src={imgSrc}
            alt={heading || "Image"}
            className="rounded-lg shadow-lg w-full object-cover"
          />
        ) : null}
      </div>
    </div>
  );
}

export default Step;