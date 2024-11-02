'use client'

// React
import { useState, useEffect } from 'react';

// Componente
import { Heading } from '@/components/typrography/Heading';//ok

const words = ["FullStack", "Front-End", "Back-End"];

export function TypingEffect() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loop, setLoop] = useState(0); // Controla a repetição do ciclo
  const [isBlinking, setIsBlinking] = useState(true); // Controla o estado da animação
  const typingSpeed = isDeleting ? 100 : 150; // Velocidade de digitação e apagamento

  useEffect(() => {
    const currentWord = words[index];
    
    // Desativa a animação enquanto está digitando ou apagando
    setIsBlinking(false);

    const timer = setTimeout(() => {
      const updatedText = isDeleting
        ? currentWord.substring(0, text.length - 1)
        : currentWord.substring(0, text.length + 1);

      setText(updatedText);

      if (!isDeleting && updatedText === currentWord) {
        // Pausa antes de começar a apagar e reativa o blink
        setIsBlinking(true);
        setTimeout(() => setIsDeleting(true), 2500); 
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
        setLoop(loop + 1); 
      }
    }, typingSpeed);

    return () => clearTimeout(timer); 
  }, [text, isDeleting]);

  return (
    <Heading as="h1" size="medium" color="white" align="center" className="text-playFair text-start">
      {text}
      <span className={`blinking-cursor ${isBlinking ? 'animate-blink' : ''}`}>|</span>
    </Heading>
  );
}
