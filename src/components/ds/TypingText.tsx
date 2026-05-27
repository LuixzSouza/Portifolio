"use client";

import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface TypingTextProps {
  words: string[];
  /** ms por caractere ao digitar. */
  typeSpeed?: number;
  /** ms por caractere ao apagar. */
  deleteSpeed?: number;
  /** ms de pausa com a palavra completa. */
  pause?: number;
  className?: string;
}

/**
 * Efeito máquina de escrever: digita, pausa, apaga e passa pra próxima palavra.
 * Hydration-safe: no SSR / 1ª renderização sai a primeira palavra completa; o
 * ciclo só começa após montar.
 */
export function TypingText({
  words,
  typeSpeed = 85,
  deleteSpeed = 40,
  pause = 1500,
  className,
}: TypingTextProps) {
  const [text, setText] = useState(words[0] ?? "");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => setStarted(true), []);

  useEffect(() => {
    if (!started || words.length === 0) return;
    const word = words[wordIndex];

    // Palavra completa: pausa e começa a apagar.
    if (!deleting && text === word) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }

    // Apagou tudo: vai para a próxima palavra.
    if (deleting && text === "") {
      const t = setTimeout(() => {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      }, 250);
      return () => clearTimeout(t);
    }

    const t = setTimeout(
      () => {
        setText((cur) =>
          deleting ? cur.slice(0, cur.length - 1) : word.slice(0, cur.length + 1),
        );
      },
      deleting ? deleteSpeed : typeSpeed,
    );
    return () => clearTimeout(t);
  }, [text, deleting, wordIndex, started, words, typeSpeed, deleteSpeed, pause]);

  // Reserva a largura da palavra mais longa (sizer invisível) p/ o texto trocar
  // sem empurrar o conteúdo ao lado — evita layout shift (CLS).
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");

  return (
    <span className={twMerge("inline-flex items-center", className)}>
      <span className="grid">
        <span aria-hidden className="invisible col-start-1 row-start-1">
          {longest}
        </span>
        <span className="col-start-1 row-start-1 inline-flex items-center">
          <span>{text}</span>
          <span
            aria-hidden
            className="ml-[2px] inline-block h-[1.05em] w-[2px] animate-blink self-center bg-current"
          />
        </span>
      </span>
    </span>
  );
}
