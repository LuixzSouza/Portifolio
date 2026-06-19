"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Heading } from "@/components/ds/Heading";
import { Text } from "@/components/ds/Text";
import { useCursorFollow } from "@/hooks/useCursorFollow";
import { useLocalizedHref } from "@/lib/useLocale";

export interface Service {
  n: string;
  slug: string;
  title: string;
  desc: string;
  tags: string[];
  image: string;
}

export function ServicesInteractive({ services }: { services: Service[] }) {
  const [active, setActive] = useState<number | null>(null);
  const [errored, setErrored] = useState<Record<string, boolean>>({});
  const loc = useLocalizedHref();

  // Framer Motion: rastreamento do cursor com física de mola (ver useCursorFollow).
  const { x, y, follow } = useCursorFollow({ damping: 25, stiffness: 200, mass: 0.5 });

  return (
    <div onMouseMove={follow} className="relative">
      <div className="flex flex-col group/list">
        {services.map((s, i) => {
          const isActive = active === i;
          
          return (
            <Link
              key={s.slug}
              href={loc(`/services/${s.slug}`)}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              // 2. Efeito Foco: Diminui a opacidade de quem NÃO está com hover
              className={`group grid grid-cols-1 gap-x-6 gap-y-4 border-t border-foreground/10 py-8 transition-all duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] md:grid-cols-12 md:items-start md:py-10 hover:bg-foreground/[0.02] ${
                active !== null && !isActive ? "opacity-30" : "opacity-100"
              }`}
            >
              <span className="font-serif text-2xl italic text-muted transition-colors duration-500 group-hover:text-foreground md:col-span-1">
                {s.n}
              </span>

              <div className="md:col-span-4">
                <Heading
                  as="h3"
                  size="display-sm"
                  // Deslizamento mais pronunciado
                  className="text-2xl transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] md:text-[1.75rem] md:group-hover:translate-x-3"
                >
                  {s.title}
                </Heading>
              </div>

              {/* Textos também acompanham o deslizamento */}
              <div className="flex flex-col gap-5 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] md:col-span-6 md:group-hover:translate-x-3">
                <Text tone="muted">{s.desc}</Text>
                <ul className="flex flex-wrap gap-2">
                  {s.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-foreground/15 px-3 py-1 text-xs font-medium text-muted transition-colors duration-300 group-hover:border-foreground/30 group-hover:text-foreground"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Seta com preenchimento circular reverso no hover */}
              <div className="hidden items-start justify-end md:col-span-1 md:flex">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-transparent transition-colors duration-500 group-hover:bg-foreground">
                  <ArrowUpRight
                    className="h-6 w-6 text-muted transition-all duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:rotate-45 group-hover:text-background"
                    strokeWidth={1.75}
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* 3. Imagem que segue o cursor controlada pelo Framer Motion */}
      <motion.div
        style={{ x, y, translateX: "-50%", translateY: "-118%" }}
        className="pointer-events-none fixed left-0 top-0 z-40 hidden lg:block"
      >
        <motion.div
          initial={false}
          animate={{
            scale: active !== null ? 1 : 0.8,
            opacity: active !== null ? 1 : 0,
            rotate: active !== null ? 0 : 5, // Leve inclinação ao sumir
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="h-48 w-72 overflow-hidden rounded-2xl border border-foreground/10 bg-surface shadow-2xl"
        >
          {services.map((s, i) =>
            errored[s.slug] ? (
              <div
                key={s.slug}
                className={`absolute inset-0 flex flex-col items-center justify-center gap-1 bg-surface-2 transition-opacity duration-300 ${
                  active === i ? "z-10 opacity-100" : "z-0 opacity-0"
                }`}
              >
                <span className="px-4 text-center font-serif text-lg italic text-foreground">
                  {s.title}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-muted">
                  Prévia em breve
                </span>
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={s.slug}
                src={s.image}
                alt=""
                onError={() => setErrored((p) => ({ ...p, [s.slug]: true }))}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                  active === i ? "z-10 opacity-100" : "z-0 opacity-0"
                }`}
              />
            ),
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}