import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-robeert)', ...fontFamily.sans],
      },
      colors: {
        black: '#000', // Cor preta
        white: '#FFF', // Cor branca
        gray: '#C9CAC1', // Cinza personalizado

        marrom: '#2B1F24', // Marrom
        primary: '#ED3833', // Vermelho vibrante
        secondary: '#F5A540', // Laranja
        yellow: '#F5ED4E', // Amarelo
        mint: '#98F0DE', // Menta clara
        blue: '#1CA0F3', // Azul vibrante
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(90deg, #2B1F24 0%, #ED8333 18.16%, #F5A540 30.77%, #F5ED4E 42.09%, #EDB397 54.02%, #FFFFFF 70.47%, #98F0DE 85.95%, #1CA0F3 100%)',
      },
      maxWidth: {
        grid: '76.5rem',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        marquee: 'marquee 5s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
