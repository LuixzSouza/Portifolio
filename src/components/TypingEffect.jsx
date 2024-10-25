'use client'
// TypingEffect.js
import { useState, useEffect } from 'react';

import { Heading } from '@/components/Heading';

const words = ["LUIZ A.", "ANTÔNIO", "SOUZA"];

export function TypingEffect() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loop, setLoop] = useState(0); // Controla a repetição do ciclo
  const typingSpeed = isDeleting ? 100 : 150; // Velocidade de digitação e apagamento

  useEffect(() => {
    const currentWord = words[index];
    const timer = setTimeout(() => {
      // Adiciona ou remove caracteres gradualmente
      const updatedText = isDeleting
        ? currentWord.substring(0, text.length - 1)
        : currentWord.substring(0, text.length + 1);

      setText(updatedText);

      // Quando a palavra completa é digitada, aguarde um pouco e comece a apagar
      if (!isDeleting && updatedText === currentWord) {
        setTimeout(() => setIsDeleting(true), 2100); // Pausa antes de começar a apagar
      } 
      // Quando a palavra é completamente apagada, passa para a próxima
      else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % words.length); // Passa para a próxima palavra
        setLoop(loop + 1); // Conta o ciclo
      }
    }, typingSpeed);

    return () => clearTimeout(timer); // Limpeza do timer para evitar problemas
  }, [text, isDeleting]);

  return (
    <Heading as="h1" size="xlarge" color='white' className=' text-playFair' >
        {text}
        <span className="blinking-cursor">|</span>
    </Heading>
  );
}
