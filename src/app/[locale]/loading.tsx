import { BrandMark } from "@/components/layout/BrandMark";

export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Carregando"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-background"
    >
      <BrandMark className="text-4xl text-foreground motion-safe:[animation:blink_2.4s_ease-in-out_infinite] md:text-5xl" />

      {/* Barra indeterminada: trilho sutil + banda que varre seguindo o tema. */}
      <div className="h-px w-40 overflow-hidden rounded-full bg-foreground/15">
        <div className="h-full w-full origin-left bg-foreground motion-safe:animate-loadbar" />
      </div>
    </div>
  );
}
