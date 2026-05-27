import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        roobert: ['var(--font-roobert)', ...fontFamily.sans],
        playFair: ['var(--font-playFair)', 'Georgia', 'serif'],
        serif: ['var(--font-playFair)', 'Georgia', 'serif'],
      },
      fontSize: {
        // Escala editorial (clamp = responsivo fluido)
        'display-xl': ['clamp(3.5rem, 11vw, 11rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.75rem, 8vw, 7.5rem)', { lineHeight: '0.98', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(2.25rem, 5.5vw, 4.5rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(1.75rem, 3.5vw, 2.75rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'eyebrow': ['0.8125rem', { lineHeight: '1', letterSpacing: '0.18em' }],
      },
      colors: {
        // Tokens semânticos (tema dark/light via CSS vars em globals.css)
        background: 'rgb(var(--bg) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        'surface-2': 'rgb(var(--surface-2) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        line: 'rgb(var(--border) / <alpha-value>)',
        black: '#000',
        white: '#FFF',
      },
      maxWidth: {
        grid: '87.5rem', // 1400px — largura máxima do Container
        // grid: '118.75rem', // 1900px — largura máxima do Container
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        slide: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        // Brilho que varre o botão inteiro e sai pela direita; a varredura dura
        // ~14% do ciclo e o resto fica fora da tela → sensação de "de tempo em
        // tempo". O 460% garante que a banda saia por completo em qualquer largura.
        shine: {
          '0%': { transform: 'translateX(-160%) skewX(-20deg)' },
          '14%, 100%': { transform: 'translateX(460%) skewX(-20deg)' },
        },
        // Banda indeterminada que varre o trilho do loader (entra pela esquerda,
        // estica no meio e sai pela direita).
        loadbar: {
          '0%': { transform: 'translateX(-100%) scaleX(0.4)' },
          '50%': { transform: 'translateX(30%) scaleX(0.9)' },
          '100%': { transform: 'translateX(220%) scaleX(0.4)' },
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        slide: 'slide 20s linear infinite',
        shine: 'shine 5s cubic-bezier(0.65,0,0.35,1) infinite',
        loadbar: 'loadbar 1.15s cubic-bezier(0.65,0,0.35,1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
