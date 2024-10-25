import Link from "next/link";

export function LinkCustom({ link, children, color }) {
  return (
    <div className="relative group inline-block">
      <Link 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer"
        className={`text-lg font-medium text-${color} no-underline`}
      >
        {children}
      </Link>
      <div className="absolute left-0 bottom-0 w-0 h-[2px] bg-white opacity-80 group-hover:w-full transition-all duration-300"></div>
    </div>
  );
}
