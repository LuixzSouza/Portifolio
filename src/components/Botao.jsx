'use client'; // Marca como Client Component

export default function BotaoPrimary({tipo = "button",children,}) {
  const estilosBase ="px-4 py-2 rounded border-2 border-black text-black bg-transparent overflow-hidden relative group";
  const estilosHover = "group-hover:bg-black group-hover:text-white transition-colors duration-300 ease-in-out";

  return (
    <button type={tipo} className={`${estilosBase} ${estilosHover}`}>
      <span className="absolute inset-0 bg-black scale-y-0 origin-left group-hover:scale-y-100 transition-transform duration-300 ease-in-out"></span>
      <span className="relative z-10 group-hover:text-white">{children}</span>
    </button>
  );
}
