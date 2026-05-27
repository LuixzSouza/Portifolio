"use client";

import { motion } from "framer-motion";

interface SkeletonLoaderProps {
  variant?: "card" | "text" | "avatar" | "button";
  className?: string;
  animate?: boolean;
}

export function SkeletonLoader({
  variant = "card",
  className = "",
  animate = true
}: SkeletonLoaderProps) {
  const baseClasses = "bg-gradient-to-r from-surface-2 via-surface to-surface-2";

  const shimmerVariants = {
    initial: { backgroundPosition: "-200% 0" },
    animate: {
      backgroundPosition: "200% 0",
      transition: {
        duration: 2,
        ease: "linear",
        repeat: Infinity,
      }
    }
  } as const;

  if (variant === "card") {
    return (
      <motion.div
        variants={animate ? shimmerVariants : undefined}
        initial="initial"
        animate="animate"
        className={`overflow-hidden rounded-3xl border border-foreground/10 bg-surface ${className}`}
      >
        {/* Imagem */}
        <div
          className={`aspect-[16/10] bg-gradient-to-r from-surface-2 via-surface to-surface-2 ${animate ? "bg-[length:200%_100%]" : ""}`}
          style={animate ? { animation: "shimmer 2s infinite linear" } : {}}
        />

        {/* Conteúdo */}
        <div className="p-6 space-y-4">
          {/* Título */}
          <div
            className={`h-6 w-3/4 rounded-lg ${baseClasses} ${animate ? "bg-[length:200%_100%]" : ""}`}
            style={animate ? { animation: "shimmer 2s infinite linear" } : {}}
          />

          {/* Descrição */}
          <div className="space-y-2">
            <div
              className={`h-4 w-full rounded ${baseClasses} ${animate ? "bg-[length:200%_100%]" : ""}`}
              style={animate ? { animation: "shimmer 2s infinite linear" } : {}}
            />
            <div
              className={`h-4 w-2/3 rounded ${baseClasses} ${animate ? "bg-[length:200%_100%]" : ""}`}
              style={animate ? { animation: "shimmer 2s infinite linear" } : {}}
            />
          </div>

          {/* Metadados */}
          <div className="flex gap-4">
            <div
              className={`h-3 w-16 rounded ${baseClasses} ${animate ? "bg-[length:200%_100%]" : ""}`}
              style={animate ? { animation: "shimmer 2s infinite linear" } : {}}
            />
            <div
              className={`h-3 w-20 rounded ${baseClasses} ${animate ? "bg-[length:200%_100%]" : ""}`}
              style={animate ? { animation: "shimmer 2s infinite linear" } : {}}
            />
          </div>

          {/* Tags */}
          <div className="flex gap-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`h-6 w-16 rounded-md ${baseClasses} ${animate ? "bg-[length:200%_100%]" : ""}`}
                style={animate ? { animation: "shimmer 2s infinite linear", animationDelay: `${i * 0.2}s` } : {}}
              />
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  if (variant === "text") {
    return (
      <div className={`space-y-2 ${className}`}>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`h-4 rounded ${baseClasses} ${animate ? "bg-[length:200%_100%]" : ""}`}
            style={{
              width: `${100 - i * 15}%`,
              ...(animate ? { animation: "shimmer 2s infinite linear", animationDelay: `${i * 0.1}s` } : {})
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === "avatar") {
    return (
      <div
        className={`h-12 w-12 rounded-full ${baseClasses} ${animate ? "bg-[length:200%_100%]" : ""} ${className}`}
        style={animate ? { animation: "shimmer 2s infinite linear" } : {}}
      />
    );
  }

  if (variant === "button") {
    return (
      <div
        className={`h-10 w-32 rounded-xl ${baseClasses} ${animate ? "bg-[length:200%_100%]" : ""} ${className}`}
        style={animate ? { animation: "shimmer 2s infinite linear" } : {}}
      />
    );
  }

  return (
    <div
      className={`h-4 w-full rounded ${baseClasses} ${animate ? "bg-[length:200%_100%]" : ""} ${className}`}
      style={animate ? { animation: "shimmer 2s infinite linear" } : {}}
    />
  );
}

// Componente para múltiplos skeletons de cards
export function SkeletonGrid({ count = 6, className = "" }: { count?: number; className?: string }) {
  return (
    <div className={`grid gap-8 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {[...Array(count)].map((_, i) => (
        <SkeletonLoader key={i} variant="card" />
      ))}
    </div>
  );
}

// CSS para animação shimmer (adicione ao globals.css)
export const shimmerCSS = `
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
`;