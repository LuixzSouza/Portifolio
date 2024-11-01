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
      cursor: {
        'cursoClick': 'url(/image/cursor-click.png) 42 42, pointer',
      },
      fontFamily: {
        roobert: ['var(--font-robeert)', ...fontFamily.sans],
        playFair: ['var(--font-playFair)', ...fontFamily.sans],
      },
      colors: {
        black: '#000',
        white: '#FFF',
        gray: '#C9CAC1',
        blackPrimary: "#1A1A1A",
        blackSecond: '#2B2B2B',
        grayPrimary: '#A9A9A9',
        graySecondary: '#ECECEC',
        whiteSecondary: '#F5F5DC',
        redPrimary: '#8B0000',
        redSecondary: '#B22222',
        greenPrimary: '#234F33',
        greenSecondary: '#2F4F4F',
        bluePrimary: '#1E3A8A',
        blueSecondary: '#2C3E50',
        'gradient-black': 'linear-gradient(180deg, rgba(255, 255, 255, 0.0) 0%, #000000 80%,#000000 100%)',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(90deg, #2B1F24 0%, #ED8333 18.16%, #F5A540 30.77%, #F5ED4E 42.09%, #EDB397 54.02%, #FFFFFF 70.47%, #98F0DE 85.95%, #1CA0F3 100%)',
        'gradient-gray': 'linear-gradient(90deg, #FFFFFF 0%, #E0E0E0 18.16%, #C0C0C0 30.77%, #A0A0A0 42.09%, #808080 54.02%, #606060 70.47%, #404040 85.95%, #000000 100%)',
        'gradient-html': 'conic-gradient(#E34F26 0%, #FFFFFF 36%, #F06529 100%)',
        'gradient-css': 'conic-gradient(#2965F1 0%, #FFFFFF 36%, #264DE4 100%)',
        'gradient-js': 'conic-gradient(#F7DF1E 0%, #000000 36%, #E2E2E2 100%)',
        'gradient-react': 'conic-gradient(#61DAFB 0%, #20232A 36%, #FFFFFF 100%)',
        'gradient-sass': 'conic-gradient(#CD6799 0%, #CD6799 36%, #FFFFFF 100%)',
        'gradient-next': 'conic-gradient(#000000 0%, #FFFFFF 36%, #000000 100%)',
        'gradient-white': 'linear-gradient(90deg, rgba(255, 255, 255, 0.39) 0%, #FFFFFF 40%, #FFFFFF 100%)',
        'gradient-black': 'linear-gradient(180deg, rgba(255, 255, 255, 0.0) 0%, #000000 80%,#000000 100%)',
        'footer': "url('/image/bg-footer.png')",
        'hero': "url('/image/bg-home.png')",
        'menu': "url('/image/bg-menu.png')",
        'icon-about': "url('/image/icon-about.png')",
        'icon-contato': "url('/image/icon-contato.png')",
        'icon-work': "url('/image/icon-work.png')",
        'bg-html': "url('/image/bg-html.png')",
        'bg-css': "url('/image/bg-css.png')",
        'bg-js': "url('/image/bg-js.png')",
        'bg-react': "url('/image/bg-react.png')",
        'bg-sass': "url('/image/bg-sass.png')",
        'bg-next': "url('/image/bg-next.png')",
        'bg-more': "url('/image/bg-more-projects.png)",
      },
      maxWidth: {
        grid: '87.5rem', //1400
        nav: '31.25rem',
        '194': '12.125rem',
        '330': '20.625rem',
        '360': '22.5rem',
        '400': '25rem',
        '600': '37.5rem',
        '900': '56.25rem',
        '1018': '63.625rem',
      },
      height: {
        '330': '20.625rem',
        '370': '23.125rem',
        '450': '28.125rem',
        '480': '30rem',
        '485': '30.313rem',
        '550': '34.375',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(6deg)' },
          '50%': { transform: 'rotate(-6deg)' },
        },
        floating: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-30px)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        spin: {
          '100%': {
            transform: 'translate(-50%, -50%) rotate(360deg)',
          },
        },
      },
      animation: {
        marquee: 'marquee 5s linear infinite',
        wiggle: 'wiggle 10s ease infinite',
        floating: 'floating 6s ease-in-out infinite',
        blink: 'blink 1s step-end infinite',
        'spin-slow': 'spin 10s linear infinite',
      },
      gridTemplateColumns: {
        'custom-3': 'repeat(3, 200px)',
      },
      lineHeight: {
        '100px': '100px',
      },
      borderRadius: {
        'custom-80': '80px',
      },
      transitionProperty: {
        'width': 'width',
      },
    },
  },
  plugins: [],
};

export default config;
