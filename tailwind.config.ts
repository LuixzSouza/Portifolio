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
        roobert: ['var(--font-robeert)', ...fontFamily.sans],
        playFair: ['var(--font-playFair)', ...fontFamily.sans],
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
        nav: '31.25rem',
        '194': '12.125rem', // 194px
        '330': '20.625rem', // 330px
        '360': '22.5rem', // 360px
        '400': '25rem', // 400px
        '600': '37.5rem', // 600px
        '1018': '63.625rem', //1018px
      },
      height: {
        '330': '20.625rem', // 330px
        '370': '23.125rem', // 370px
        '450': '28.125rem', // 450px
        '480': '30rem', // 480px
        '485': '30.313rem', //485px,
        '550': '34.375', //550px
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
      gridTemplateColumns: {
        // Grid de 3 colunas de 200px
        'custom-3': 'repeat(3, 200px)',
      },
      lineHeight: {
        '100px': '100px',
      },
    },
  },
  plugins: [],
};

export default config;
