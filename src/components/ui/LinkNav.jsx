// Next
import Link from "next/link";

export function LinkNav({ link, children, color }) {
  return (
    <Link href={link} className="relative flex items-center justify-center overflow-hidden group">
      <span className={`block text-${color} translate-y-0 group-hover:-translate-y-full transition-transform duration-300 ease-in-out`}>
        {children}
      </span>
      <span className={`absolute text-${color} top-full left-0 translate-y-0 group-hover:translate-y-[-100%] transition-transform duration-300 ease-in-out`}>
        {children}
      </span>
    </Link>
  );
}
