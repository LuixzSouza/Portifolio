"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Globe, Sparkles, Zap } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "@/content/useTranslations";

interface LiveProjectButtonProps {
  href: string;
  variant?: "banner" | "link" | "card" | "hero";
  className?: string;
  children?: React.ReactNode;
}

const EASE = [0.76, 0, 0.24, 1] as const;

export function LiveProjectButton({
  href,
  variant = "link",
  className = "",
  children
}: LiveProjectButtonProps) {
  const t = useTranslations();
  const [isHovered, setIsHovered] = useState(false);
  const reduceMotion = useReducedMotion();

  if (variant === "banner") {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1, ease: EASE }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`group relative flex h-[40vh] w-full flex-col items-center justify-center overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-foreground via-foreground/95 to-foreground/90 text-background transition-all duration-700 hover:scale-[0.99] hover:shadow-2xl md:h-[50vh] ${className}`}
      >
        {/* Padrão de fundo animado */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                "radial-gradient(circle at 50% 20%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                "radial-gradient(circle at 50% 80%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)"
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          />
        </div>

        {/* Partículas flutuantes */}
        {!reduceMotion && (
          <div className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-background/30 rounded-full"
                initial={{
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  scale: 0
                }}
                animate={{
                  y: [null, `${Math.random() * 100}%`],
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 4 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        )}

        <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
          {/* Ícone principal com efeitos */}
          <motion.div
            className="relative"
            animate={isHovered && !reduceMotion ? {
              y: [-2, -8, -2],
              scale: [1, 1.1, 1]
            } : {}}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity
            }}
          >
            <motion.div
              className="flex h-24 w-24 items-center justify-center rounded-full bg-background/15 backdrop-blur-md border border-background/20"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <ArrowUpRight className="h-10 w-10" strokeWidth={1.5} />
            </motion.div>

            {/* Anel de energia */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-background/30"
              animate={isHovered ? {
                scale: [1, 1.3, 1],
                opacity: [0.5, 1, 0.5],
                rotate: [0, 180, 360]
              } : {}}
              transition={{ duration: 2, ease: "linear", repeat: Infinity }}
            />

            {/* Sparkles ao redor */}
            {isHovered && !reduceMotion && (
              <>
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      left: `${50 + 40 * Math.cos((i * 60 * Math.PI) / 180)}%`,
                      top: `${50 + 40 * Math.sin((i * 60 * Math.PI) / 180)}%`
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                      rotate: [0, 180, 360]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.1,
                      ease: "easeInOut"
                    }}
                  >
                    <Sparkles className="h-3 w-3 text-background/60" />
                  </motion.div>
                ))}
              </>
            )}
          </motion.div>

          {/* Texto principal */}
          <motion.div
            className="space-y-2"
            animate={isHovered ? { y: -2 } : { y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <motion.span
              className="block font-roobert text-[clamp(2.5rem,5vw,4.5rem)] font-medium tracking-tight"
              animate={isHovered ? {
                textShadow: [
                  "0 0 0 rgba(255,255,255,0)",
                  "0 0 20px rgba(255,255,255,0.3)",
                  "0 0 0 rgba(255,255,255,0)"
                ]
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {children || t.project.live}
            </motion.span>

            {/* Linha decorativa */}
            <motion.div
              className="mx-auto h-0.5 bg-background/40"
              initial={{ width: 0 }}
              animate={{ width: isHovered ? "100%" : "60%" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </motion.div>

          {/* Indicador de status */}
          <motion.div
            className="flex items-center gap-2 text-sm font-medium text-background/80"
            animate={isHovered ? { opacity: 1 } : { opacity: 0.7 }}
          >
            <motion.div
              className="relative"
              animate={{
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="h-2 w-2 rounded-full bg-green-400" />
              <motion.div
                className="absolute inset-0 rounded-full bg-green-400"
                animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            <span className="uppercase tracking-wider">Online</span>
          </motion.div>
        </div>

        {/* Efeito de borda brilhante */}
        <motion.div
          className="absolute inset-0 rounded-[2.5rem] border border-background/20"
          animate={isHovered ? {
            borderColor: ["rgba(255,255,255,0.2)", "rgba(255,255,255,0.5)", "rgba(255,255,255,0.2)"]
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.a>
    );
  }

  if (variant === "link") {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`group relative flex items-center justify-between font-roobert text-xl transition-all duration-300 hover:text-muted ${className}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="relative">
          {children || t.project.liveLink}

          {/* Linha animada embaixo */}
          <motion.div
            className="absolute -bottom-1 left-0 h-0.5 bg-current"
            initial={{ width: 0 }}
            animate={{ width: isHovered ? "100%" : "20%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </span>

        <motion.div
          className="relative flex items-center"
          animate={isHovered ? { x: 3, y: -3 } : { x: 0, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <ArrowUpRight className="h-5 w-5" />

          {/* Efeito de brilho */}
          {isHovered && !reduceMotion && (
            <motion.div
              className="absolute inset-0 rounded-full bg-current"
              initial={{ scale: 0, opacity: 0.5 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          )}
        </motion.div>
      </motion.a>
    );
  }

  if (variant === "hero") {
    return (
      <div className="absolute bottom-5 right-5 z-10">
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group relative flex items-center gap-3 rounded-2xl border border-white/20 bg-black/30 px-6 py-4 text-white backdrop-blur-md transition-all duration-300 hover:bg-black/50 hover:border-white/40"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Efeito de energia no fundo */}
          <motion.div
            className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-purple-500/0"
            animate={isHovered ? {
              background: [
                "linear-gradient(90deg, rgba(59,130,246,0) 0%, rgba(59,130,246,0.2) 50%, rgba(168,85,247,0) 100%)",
                "linear-gradient(90deg, rgba(168,85,247,0) 0%, rgba(168,85,247,0.2) 50%, rgba(59,130,246,0) 100%)",
                "linear-gradient(90deg, rgba(59,130,246,0) 0%, rgba(59,130,246,0.2) 50%, rgba(168,85,247,0) 100%)"
              ]
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          />

          <motion.div
            className="relative flex items-center gap-3"
            animate={isHovered ? { x: 2 } : { x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Ícone com animações */}
            <motion.div
              className="relative"
              animate={isHovered ? { rotate: 15 } : { rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Globe className="h-5 w-5" strokeWidth={1.75} />

              {isHovered && !reduceMotion && (
                <motion.div
                  className="absolute inset-0 rounded-full border border-white/50"
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              )}
            </motion.div>

            <span className="text-sm font-medium">
              {children || t.project.view}
            </span>

            <motion.div
              animate={isHovered ? { x: 2, y: -2 } : { x: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
            </motion.div>
          </motion.div>

          {/* Partículas quando hover */}
          {isHovered && !reduceMotion && (
            <>
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white/60 rounded-full"
                  initial={{
                    x: "50%",
                    y: "50%",
                    scale: 0
                  }}
                  animate={{
                    x: `${50 + (Math.random() - 0.5) * 200}%`,
                    y: `${50 + (Math.random() - 0.5) * 200}%`,
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.1,
                    ease: "easeOut"
                  }}
                />
              ))}
            </>
          )}
        </motion.a>
      </div>
    );
  }

  // Variant 'card' - para uso em cards de projeto
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative inline-flex items-center gap-2 rounded-xl border border-foreground/20 bg-foreground/5 px-4 py-2 text-sm font-medium transition-all duration-300 hover:border-foreground/40 hover:bg-foreground/10 ${className}`}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <Zap className="h-4 w-4" strokeWidth={1.75} />
      </motion.div>

      <span>{children || t.project.view}</span>

      <motion.div
        animate={isHovered ? { x: 2, y: -2 } : { x: 0, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
      </motion.div>

      {/* Brilho sutil no hover */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-foreground/10 to-transparent"
        initial={{ x: "-100%" }}
        animate={isHovered ? { x: "100%" } : { x: "-100%" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
    </motion.a>
  );
}