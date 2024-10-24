import Link from "next/link";

export function LinkCustom({ link, children }) {
  return (
    <div className="relative group inline-block">
      <Link href={link} className="text-lg font-medium text-black no-underline">
        {children}
      </Link>
      <div className="absolute left-0 bottom-0 w-0 h-[2px] bg-red-500 opacity-80 group-hover:w-full transition-all duration-300"></div>
    </div>
  );
}
