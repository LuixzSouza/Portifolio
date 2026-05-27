import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import {
  AnimatedLink,
  ArrowButton,
  Button,
  Container,
  Eyebrow,
  Heading,
  MagneticButton,
  Reveal,
  Section,
  Text,
} from "@/components/ds";
import { ThemeToggle } from "@/components/ds/ThemeToggle";

export const metadata: Metadata = {
  title: "Style Guide",
  robots: { index: false, follow: false },
};

const MARQUEE = [
  "Front-End",
  "UI / UX",
  "React",
  "Next.js",
  "Performance",
  "Acessibilidade",
  "Design Systems",
  "Motion",
];

const SWATCHES = [
  { name: "background", className: "bg-background", note: "fundo da página" },
  { name: "surface", className: "bg-surface", note: "cartões" },
  { name: "surface-2", className: "bg-surface-2", note: "hover / elevado" },
  { name: "foreground", className: "bg-foreground", note: "texto / sólidos" },
  { name: "muted", className: "bg-muted", note: "texto secundário" },
];

const OPACITIES = [5, 10, 20, 40, 60, 80, 100];

const SERVICES = [
  {
    n: "01",
    title: "Sites que vendem",
    desc: "Páginas e landing pages que explicam seu negócio de forma simples e convencem o visitante a entrar em contato.",
  },
  {
    n: "02",
    title: "Interfaces rápidas e bonitas",
    desc: "Aplicações e sistemas com visual moderno, leves no celular e fáceis de usar — do jeito que as pessoas esperam hoje.",
  },
  {
    n: "03",
    title: "Do design ao ar",
    desc: "Cuido de tudo: do layout à publicação online. Você acompanha e eu entrego pronto para o mundo ver.",
  },
];

const PROJECTS = [
  { name: "Casa Pronta", year: "2025", tag: "Site institucional" },
  { name: "Fórmula Idiomas", year: "2024", tag: "Landing page" },
  { name: "Rede", year: "2024", tag: "Interface / UI" },
];

export default function StyleGuidePage() {
  return (
    <main id="conteudo" className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-foreground/10 bg-background/70 backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between">
          <span className="text-eyebrow font-medium uppercase text-muted">
            Luiz Souza — Style Guide
          </span>
          <ThemeToggle />
        </Container>
      </header>

      {/* HERO */}
      <Section className="pb-16 pt-20 md:pt-28">
        <Container>
          <Reveal>
            <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-foreground/15 px-4 py-1.5 text-xs font-medium text-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-foreground" />
              </span>
              Disponível para novos projetos
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <Heading as="h1" size="display-xl" className="max-w-[15ch]">
              Eu transformo ideias em{" "}
              <span className="font-serif font-normal italic">experiências</span> digitais
            </Heading>
          </Reveal>

          <Reveal delay={0.12}>
            <Text size="lg" measure tone="muted" className="mt-8">
              Desenvolvedor Front-End. Crio sites e interfaces que carregam rápido,
              funcionam em qualquer tela e fazem seu trabalho parecer tão bom quanto ele é.
            </Text>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <MagneticButton href="#components">Vamos conversar</MagneticButton>
              <ArrowButton href="#work" variant="outline">Ver trabalhos</ArrowButton>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* MARQUEE */}
      <div className="relative flex overflow-hidden border-y border-foreground/10 py-5 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="flex w-max shrink-0 animate-slide items-center gap-6">
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span key={i} className="flex items-center gap-6 text-lg text-muted md:text-xl">
              {item}
              <span aria-hidden className="text-foreground/30">/</span>
            </span>
          ))}
        </div>
      </div>

      {/* INTERAÇÕES */}
      <Section id="components" className="border-b border-foreground/10">
        <Container className="flex flex-col gap-14">
          <Reveal className="flex flex-col gap-3">
            <Eyebrow index="01">Interações</Eyebrow>
            <Heading size="display-sm">Botões &amp; links com vida</Heading>
            <Text tone="muted" measure>
              Passe o mouse em cada um. Cada estilo tem uma micro-animação diferente —
              suave, fluida e respeitando quem prefere menos movimento.
            </Text>
          </Reveal>

          <Reveal className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            <ShowItem label="Principal — o círculo da seta engole o botão + magnético">
              <MagneticButton href="#">Entrar em contato</MagneticButton>
            </ShowItem>
            <ShowItem label="Outline — círculo cresce da seta e preenche">
              <ArrowButton href="#" variant="outline">Ver projeto</ArrowButton>
            </ShowItem>
            <ShowItem label="Sólido — inverte no preenchimento">
              <ArrowButton href="#" variant="solid">Baixar CV</ArrowButton>
            </ShowItem>
            <ShowItem label="Ghost — fundo suave + texto rola">
              <Button variant="ghost" size="lg">
                Saiba mais
              </Button>
            </ShowItem>
            <ShowItem label="Link — sublinhado varre + seta">
              <AnimatedLink href="#" withArrow className="text-lg">
                Ver estudo de caso
              </AnimatedLink>
            </ShowItem>
            <ShowItem label="Link — texto rola na vertical">
              <AnimatedLink href="#" effect="roll" className="text-lg">
                luixzsouza.com.br
              </AnimatedLink>
            </ShowItem>
          </Reveal>
        </Container>
      </Section>

      {/* SERVIÇOS — linguagem para leigos */}
      <Section className="border-b border-foreground/10">
        <Container className="flex flex-col gap-14">
          <Reveal className="flex flex-col gap-3">
            <Eyebrow index="02">O que eu faço</Eyebrow>
            <Heading size="display-md" className="max-w-[18ch]">
              Sem jargão. Só resultado que dá pra ver.
            </Heading>
          </Reveal>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/10 md:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08} className="h-full">
                <div className="group flex h-full flex-col gap-5 bg-background p-8 transition-colors duration-300 hover:bg-surface md:p-10">
                  <span className="font-serif text-3xl italic text-muted">{s.n}</span>
                  <Heading as="h3" size="display-sm" className="text-2xl md:text-[1.75rem]">
                    {s.title}
                  </Heading>
                  <Text size="sm" tone="muted">
                    {s.desc}
                  </Text>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* TRABALHOS — impressiona quem contrata */}
      <Section id="work" className="border-b border-foreground/10">
        <Container className="flex flex-col gap-14">
          <Reveal className="flex flex-col gap-3">
            <Eyebrow index="03">Trabalhos selecionados</Eyebrow>
            <Heading size="display-sm">Alguns projetos reais</Heading>
          </Reveal>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.08}>
                <a href="#" className="group flex flex-col gap-5">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-foreground/10 bg-surface-2">
                    <div className="absolute inset-0 scale-100 bg-[radial-gradient(circle_at_30%_30%,rgb(var(--foreground)/0.08),transparent_60%)] transition-transform duration-700 ease-out group-hover:scale-110" />
                    <span className="absolute left-5 top-5 text-eyebrow font-medium uppercase text-muted">
                      {p.year}
                    </span>
                    <span className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-foreground/15 bg-background/40 backdrop-blur transition-all duration-500 group-hover:rotate-45 group-hover:bg-foreground group-hover:text-background">
                      <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between gap-4">
                      <Heading as="h3" size="display-sm" className="text-xl md:text-2xl">
                        {p.name}
                      </Heading>
                    </div>
                    <Text size="sm" tone="muted">{p.tag}</Text>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* CORES */}
      <Section id="colors" className="border-b border-foreground/10">
        <Container className="flex flex-col gap-10">
          <Reveal className="flex flex-col gap-3">
            <Eyebrow index="04">Cores</Eyebrow>
            <Heading size="display-sm">Tokens de tema</Heading>
            <Text tone="muted" measure>
              Os mesmos nomes semânticos se adaptam ao dark e ao light — troque o tema no
              canto superior direito para comparar.
            </Text>
          </Reveal>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {SWATCHES.map((s) => (
              <div key={s.name} className="flex flex-col gap-3">
                <div className={`h-28 w-full rounded-xl border border-foreground/10 ${s.className}`} />
                <div className="flex flex-col gap-0.5">
                  <span className="font-roobert text-sm font-medium">{s.name}</span>
                  <span className="text-xs text-muted">{s.note}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <Text size="sm" tone="muted">Opacidades de foreground (bordas, hovers, detalhes)</Text>
            <div className="flex flex-wrap gap-2">
              {OPACITIES.map((o) => (
                <div key={o} className="flex flex-col items-center gap-1">
                  <div
                    className="h-14 w-14 rounded-lg border border-foreground/10"
                    style={{ backgroundColor: `rgb(var(--foreground) / ${o / 100})` }}
                  />
                  <span className="text-xs text-muted">{o}%</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* TIPOGRAFIA */}
      <Section id="type">
        <Container className="flex flex-col gap-10">
          <Reveal className="flex flex-col gap-3">
            <Eyebrow index="05">Tipografia</Eyebrow>
            <Heading size="display-sm">Escala</Heading>
            <Text tone="muted" measure>
              Roobert (sans) para títulos e UI; Playfair Display (serif itálica) para
              destaques editoriais.
            </Text>
          </Reveal>

          <div className="flex flex-col divide-y divide-foreground/10">
            {([
              ["display-xl", "Display XL"],
              ["display-lg", "Display LG"],
              ["display-md", "Display MD"],
              ["display-sm", "Display SM"],
            ] as const).map(([size, label]) => (
              <div key={size} className="flex flex-col gap-2 py-6">
                <span className="text-eyebrow font-medium uppercase text-muted">{label}</span>
                <Heading size={size}>
                  Design que <span className="font-serif font-normal italic">respira</span>
                </Heading>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <footer className="border-t border-foreground/10 py-10">
        <Container>
          <Text size="sm" tone="muted">
            Style guide interno · não indexado · base do novo portfólio.
          </Text>
        </Container>
      </footer>
    </main>
  );
}

function ShowItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-5">
      <div className="flex min-h-[3.5rem] items-center">{children}</div>
      <span className="text-xs text-muted">{label}</span>
    </div>
  );
}
