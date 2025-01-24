'use client';

// React
import { useState, useEffect } from 'react';

// Componente
import { Heading } from '@/components/typrography/Heading'; // ok

export function TypingEffect({ words = [], typingSpeed = 150, deletingSpeed = 100, pauseTime = 2500, classe }) {
  const [index, setIndex] = useState(0); // Controla qual palavra está ativa
  const [text, setText] = useState(''); // Texto atual sendo exibido
  const [isDeleting, setIsDeleting] = useState(false); // Se está apagando o texto
  const [isBlinking, setIsBlinking] = useState(true); // Controla o estado da animação

  useEffect(() => {
    if (words.length === 0) return;
  
    const currentWord = words[index];
  
    setIsBlinking(false);
  
    const timer = setTimeout(() => {
      const updatedText = isDeleting
        ? currentWord.substring(0, text.length - 1)
        : currentWord.substring(0, text.length + 1);
  
      setText(updatedText);
  
      if (!isDeleting && updatedText === currentWord) {
        setIsBlinking(true);
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
      }
    }, isDeleting ? deletingSpeed : typingSpeed);
  
    return () => clearTimeout(timer);
  }, [text, isDeleting, words, typingSpeed, deletingSpeed, pauseTime, index]); 
  
  return (
    <Heading as="h2" size="medium" color="white" align="center" className={`text-center sm:text-start leading-none ${classe}`}>
      {text}
      <span className={`blinking-cursor ${isBlinking ? 'animate-blink' : ''}`}>|</span>
    </Heading>
  );
}
