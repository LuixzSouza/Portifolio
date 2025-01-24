'use client'; // Marca como Client Component

export function BotaoPrimary({tipo = "button",children,}) {
  const estilosBase ="px-8 py-5 rounded-full border-2 border-white text-white bg-transparent overflow-hidden relative group";
  const estilosHover = "group-hover:bg-black group-hover:text-black transition-colors duration-300 ease-in-out";

  return (
    <button type={tipo} className={`${estilosBase} ${estilosHover} relative`}>
      <div className="absolute inset-0 rounded-full bg-white scale-y-0 scale-x-0 origin-center group-hover:scale-y-125 group-hover:scale-x-125 transition-transform duration-300 ease"></div>
      <span className="text-2xl font-roobert relative z-10 group-hover:text-black transition-colors duration-300 ease-in-out">{children}</span>
    </button>
  );
}
