"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import { motion } from "framer-motion";

// easeInOutCubic — entra e sai suave (a transição "molhada" que o projeto adota).
const EASE = [0.65, 0, 0.35, 1] as const;
const T = { duration: 0.55, ease: EASE };

/**
 * Mídia do card de trabalho: imagem padrão = a própria imagem do projeto. Ao
 * passar o mouse, faz um crossfade FLUIDO para `hoverSrc` por cima — o print AO
 * VIVO do site (mShots) — e volta suave ao tirar o mouse. Usa estado de hover
 * próprio (animate por duração) em vez de variants herdadas, pra garantir que
 * entra E sai animado. O print só baixa após o 1º hover (lazy on-demand).
 * Projeto sem imagem → placeholder neutro (não inventamos imagem).
 */
export function WorkCardMedia({
  image,
  hoverSrc,
  alt,
  sizes,
}: {
  image?: string;
  hoverSrc?: string;
  alt: string;
  sizes: string;
}) {
  const [hovered, setHovered] = useState(false);
  const [armed, setArmed] = useState(false);

  return (
    <div
      className="absolute inset-0"
      onMouseEnter={() => {
        setHovered(true);
        setArmed(true);
      }}
      onMouseLeave={() => setHovered(false)}
    >
      {image ? (
        <motion.div
          className="absolute inset-0 h-full w-full"
          initial={false}
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={T}
        >
          <Image src={image} alt={alt} fill sizes={sizes} className="object-cover object-top" />
        </motion.div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-surface-2 text-foreground/15">
          <ImageOff className="h-10 w-10" strokeWidth={1.25} />
        </div>
      )}

      {/* Print ao vivo do site: crossfade fluido na entrada e na saída. */}
      {hoverSrc && (
        <motion.div
          className="pointer-events-none absolute inset-0 h-full w-full"
          initial={false}
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 1.04 }}
          transition={T}
        >
          {armed && (
            // referrerPolicy="origin": mShots exige Referer (senão 403).
            // eslint-disable-next-line @next/next/no-img-element -- src dinâmico (mShots) e export usa unoptimized; next/image não agrega
            <img
              src={hoverSrc}
              alt=""
              loading="lazy"
              referrerPolicy="origin"
              className="h-full w-full object-cover object-top"
            />
          )}
        </motion.div>
      )}
    </div>
  );
}
