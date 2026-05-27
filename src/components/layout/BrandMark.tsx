/** Marca "<LS/>" reutilizada no preloader, na cortina de transição e no loading. */
export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-roobert font-semibold uppercase tracking-tight ${className}`}>
      <span className="opacity-35">&lt;</span>
      LS
      <span className="opacity-35">/&gt;</span>
    </span>
  );
}
