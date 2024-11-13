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
        blackTerdy: '#080808',
        blackForty: '#0A0A0A',
        grayPrimary: '#A9A9A9',
        graySecondary: '#ECECEC',
        whiteSecondary: '#F5F5DC',
        redPrimary: '#8B0000',
        redSecondary: '#B22222',
        greenPrimary: '#234F33',
        greenSecondary: '#2F4F4F',
        bluePrimary: '#353FFF',
        blueSecondary: '#2C3E50',
        'gradient-black': 'linear-gradient(180deg, #000000 0%,#000000 100%)',
        'gradient-bluePrimary': 'linear-gradient(180deg, #353FFF 0%, #FFF 100%)',
      },
      backgroundImage: {

        // Gradientes
        'custom-gradient': 'linear-gradient(90deg, #2B1F24 0%, #ED8333 18.16%, #F5A540 30.77%, #F5ED4E 42.09%, #EDB397 54.02%, #FFFFFF 70.47%, #98F0DE 85.95%, #1CA0F3 100%)',
        'gradient-gray': 'linear-gradient(90deg, #FFFFFF 0%, #E0E0E0 18.16%, #C0C0C0 30.77%, #A0A0A0 42.09%, #808080 54.02%, #606060 70.47%, #404040 85.95%, #000000 100%)',

        // Butons
        'btn-html': 'conic-gradient(#E34F26 0%, #FFFFFF 36%, #F06529 100%)',
        'btn-css': 'conic-gradient(#2965F1 0%, #FFFFFF 36%, #264DE4 100%)',
        'btn-js': 'conic-gradient(#F7DF1E 0%, #000000 36%, #E2E2E2 100%)',
        'btn-react': 'conic-gradient(#61DAFB 0%, #20232A 36%, #FFFFFF 100%)',
        'btn-sass': 'conic-gradient(#CD6799 0%, #CD6799 36%, #FFFFFF 100%)',
        'btn-next': 'conic-gradient(#000000 0%, #FFFFFF 36%, #000000 100%)',
        'btn-c': 'conic-gradient(#A8B9CC 0%, #FFFFFF 36%, #00599C 100%)',
        'btn-java': 'conic-gradient(#007396 0%, #FFFFFF 36%, #B07219 100%)',
        'btn-php': 'conic-gradient(#777BB4 0%, #FFFFFF 36%, #4F5B93 100%)',
        'btn-mysql': 'conic-gradient(#4479A1 0%, #FFFFFF 36%, #F29111 100%)',
        'btn-node': 'conic-gradient(#339933 0%, #FFFFFF 36%, #8CC84B 100%)',
        'btn-wordpress': 'conic-gradient(#21759B 0%, #FFFFFF 36%, #464646 100%)',
        'btn-bootstrap': 'conic-gradient(#563D7C 0%, #FFFFFF 36%, #7952B3 100%)',
        'btn-linux': 'conic-gradient(#000000 0%, #FFFFFF 36%, #FCC624 100%)',
        'btn-windows': 'conic-gradient(#0078D6 0%, #FFFFFF 36%, #00BCF2 100%)',
        'btn-vscode': 'conic-gradient(#007ACC 0%, #FFFFFF 36%, #1E1E1E 100%)',
        'btn-debian': 'conic-gradient(#D70A53 0%, #FFFFFF 36%, #A80030 100%)',
        'btn-figma': 'conic-gradient(#F24E1E 0%, #FFFFFF 36%, #A259FF 100%)',
        'btn-invision': 'conic-gradient(#FF3366 0%, #FFFFFF 36%, #A81738 100%)',
        'btn-eclipse': 'conic-gradient(#2C2255 0%, #FFFFFF 36%, #3C3B6E 100%)',
        'btn-powerpoint': 'conic-gradient(#D24726 0%, #FFFFFF 36%, #B7472A 100%)',
        'btn-netlify': 'conic-gradient(#00C7B7 0%, #FFFFFF 36%, #00A88D 100%)',
        'btn-npm': 'conic-gradient(#CB3837 0%, #FFFFFF 36%, #FFFFFF 100%)',
        'btn-duolingo': 'conic-gradient(#58CC02 0%, #FFFFFF 36%, #A8D603 100%)',
        'btn-styled-components': 'conic-gradient(#F94FC3 0%, #2B2D42 36%, #FFD359 100%)',
        'btn-python': 'conic-gradient(#3572A5 0%, #FEDC00 36%, #4B4B4B 100%)',

        //Background Tecnology Principal
        'gradient-html': 'conic-gradient(#E34F26 0%, #000000 10%, #000000 40%, #F06529 50%, #000000 60%, #000000 90%)',
        'gradient-css': 'conic-gradient( #264DE4 0%, #000000 10%, #000000 40%, #264DE4 50%, #000000 60%, #000000 90%)',
        'gradient-js': 'conic-gradient(#F7DF1E 0%, #000000 10%, #000000 40%, #F7DF1E 50%,  #000000 60%, #000000 90%)',
        'gradient-react': 'conic-gradient(#61DAFB 0%, #000000 10%, #000000 40%, #61DAFB 50%, #000000 60%, #000000 90%)',
        'gradient-sass': 'conic-gradient(#CD6799 0%, #000000 10%, #000000 40%, #CD6799 50%, #000000 60%, #000000 90%)',
        'gradient-next': 'conic-gradient( #FFFFFF 0%, #000000 10%, #000000 40%, #FFFFFF 50%, #000000 60%, #000000 90%)',

        'gradient-black-tecnologys': 'linear-gradient(120deg, #000000 0%, #080808 50%,  #000000 100%)',
        'gradient-white': 'linear-gradient(90deg, rgba(255, 255, 255, 0.39) 0%, #FFFFFF 40%, #FFFFFF 100%)',
        'gradient-black': 'linear-gradient(180deg, rgba(000, 000, 000, 0.5) 0%, rgba(000, 000, 000, 0.5) 100%)',
        'gradient-black-white': 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(000, 000, 000, 1) 100%)',

        // Principais
        'footer': "url('/background/bg-footer.png')",
        'hero': "url('/background/bg-hero.png')",
        'about': "url('/background/bg-about.png')",
        'form': "url('/background/bg-form.png')",
        'projetos': "url('/background/bg-projects.png')",
        'menu': "url('/background/bg-menu.png')",

        // Icones
        'icon-about': "url('/image/icon-about.png')",
        'icon-contato': "url('/image/icon-contato.png')",
        'icon-work': "url('/image/icon-work.png')",

        // Background Tecnologias
        'bg-html': "url('/background/bg-html.png')",
        'bg-css': "url('/background/bg-css.png')",
        'bg-js': "url('/background/bg-js.png')",
        'bg-react': "url('/background/bg-react.png')",
        'bg-sass': "url('/background/bg-sass.png')",
        'bg-next': "url('/background/bg-next.png')",
        'bg-more': "url('/background/bg-more-projects.png)",
        'bg-gradwhite': "url('/image/bg-white-gradient.png')",
      },
      width: {
        '55':  '13.7rem',
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
        '550': '34.375rem',
      },
      maxHeight: {
        '755': '47.188rem',
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
        slide: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        marquee: 'marquee 5s linear infinite',
        wiggle: 'wiggle 10s ease infinite',
        floating: 'floating 6s ease-in-out infinite',
        blink: 'blink 1s step-end infinite',
        'spin-slow': 'spin 10s linear infinite',
        slide: 'slide 20s linear infinite',
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
