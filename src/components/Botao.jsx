'use client'; // Marca como Client Component

export function BotaoPrimary({tipo = "button",children,}) {
  const estilosBase ="px-9 py-6 shadow-inner shadow-white rounded-full border-2 border-white text-white bg-transparent overflow-hidden relative group";
  const estilosHover = "group-hover:bg-black group-hover:text-black transition-colors duration-300 ease-in-out";

  return (
    <button type={tipo} className={`${estilosBase} ${estilosHover} relative`}>
      <div className="absolute inset-1 shadow-md shadow-black rounded-full bg-white scale-y-0 scale-x-0 origin-center group-hover:scale-y-100 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></div>
      <span className="relative z-10 group-hover:text-black">{children}</span>
    </button>
  );
}
