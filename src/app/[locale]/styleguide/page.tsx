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

// Âncoras da navegação no topo (saltam para cada seção).
const SECTIONS = [
  { id: "interacoes", label: "Interações" },
  { id: "servicos", label: "Serviços" },
  { id: "trabalhos", label: "Trabalhos" },
  { id: "cores", label: "Cores" },
  { id: "tipografia", label: "Tipografia" },
];

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
    <main id="conteudo" className="min-h-screen scroll-smooth bg-background text-foreground">
      {/* Top bar — título, navegação por seção e troca de tema */}
      <header className="sticky top-0 z-50 border-b border-foreground/10 bg-background/70 backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between gap-4">
          <span className="shrink-0 text-eyebrow font-medium uppercase text-muted">
            Luiz Souza — Style Guide
          </span>
          <nav className="hidden items-center gap-6 md:flex">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {s.label}
              </a>
            ))}
          </nav>
          <ThemeToggle />
        </Container>
      </header>

      {/* HERO — explica o propósito da página */}
      <Section className="pb-16 pt-20 md:pt-28">
        <Container>
          <Reveal>
            <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-foreground/15 px-4 py-1.5 text-xs font-medium text-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-foreground" />
              </span>
              Referência interna · não indexada
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <Heading as="h1" size="display-xl" className="max-w-[16ch]">
              O <span className="font-serif font-normal italic">design system</span> do portfólio
            </Heading>
          </Reveal>

          <Reveal delay={0.12}>
            <Text size="lg" measure tone="muted" className="mt-8">
              Esta página reúne os tokens de cor, a tipografia e os componentes reais usados
              em todo o site — a fonte única para manter tudo coerente. Tudo aqui é o
              componente de verdade (não imagem): passe o mouse e troque o tema para ver como
              cada peça reage.
            </Text>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <MagneticButton href="#interacoes">Ver componentes</MagneticButton>
              <ArrowButton href="#cores" variant="outline">Ver tokens</ArrowButton>
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
      <Section id="interacoes" className="scroll-mt-24 border-b border-foreground/10">
        <Container className="flex flex-col gap-14">
          <Reveal className="flex flex-col gap-3">
            <Eyebrow index="01">Interações</Eyebrow>
            <Heading size="display-sm">Botões &amp; links com vida</Heading>
            <Text tone="muted" measure>
              Cada estilo tem um papel definido. Use o <strong className="text-foreground">Principal</strong>{" "}
              (magnético) na ação primária de uma tela; o <strong className="text-foreground">Outline</strong>{" "}
              em ações secundárias; o <strong className="text-foreground">Sólido</strong> para CTAs sobre fundo
              claro; o <strong className="text-foreground">Ghost</strong> em ações terciárias; e os{" "}
              <strong className="text-foreground">Links</strong> para navegação inline no meio do texto. Tudo
              respeita quem prefere menos movimento.
            </Text>
          </Reveal>

          <Reveal className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            <ShowItem
              label="Principal — círculo da seta engole o botão + efeito magnético"
              usage="Ação primária da tela (1 por seção)"
            >
              <MagneticButton href="#">Entrar em contato</MagneticButton>
            </ShowItem>
            <ShowItem
              label="Outline — círculo cresce da seta e preenche"
              usage="Ações secundárias"
            >
              <ArrowButton href="#" variant="outline">Ver projeto</ArrowButton>
            </ShowItem>
            <ShowItem
              label="Sólido — inverte no preenchimento"
              usage="CTA sobre fundo claro"
            >
              <ArrowButton href="#" variant="solid">Baixar CV</ArrowButton>
            </ShowItem>
            <ShowItem
              label="Ghost — fundo suave + texto rola"
              usage="Ações terciárias / barras de ferramentas"
            >
              <Button variant="ghost" size="lg">
                Saiba mais
              </Button>
            </ShowItem>
            <ShowItem
              label="Link — sublinhado varre + seta"
              usage="Navegação inline com ênfase"
            >
              <AnimatedLink href="#" withArrow className="text-lg">
                Ver estudo de caso
              </AnimatedLink>
            </ShowItem>
            <ShowItem
              label="Link — texto rola na vertical"
              usage="Links de destaque (rodapé, contato)"
            >
              <AnimatedLink href="#" effect="roll" className="text-lg">
                luixzsouza.com.br
              </AnimatedLink>
            </ShowItem>
          </Reveal>
        </Container>
      </Section>

      {/* SERVIÇOS — exemplo de composição */}
      <Section id="servicos" className="scroll-mt-24 border-b border-foreground/10">
        <Container className="flex flex-col gap-14">
          <Reveal className="flex flex-col gap-3">
            <Eyebrow index="02">Serviços</Eyebrow>
            <Heading size="display-md" className="max-w-[18ch]">
              Sem jargão. Só resultado que dá pra ver.
            </Heading>
            <Text tone="muted" measure>
              Exemplo de composição: cards de serviço montados só com{" "}
              <code className="rounded bg-foreground/10 px-1.5 py-0.5 text-[0.85em]">Heading</code>,{" "}
              <code className="rounded bg-foreground/10 px-1.5 py-0.5 text-[0.85em]">Text</code> e a grade
              divisória. Serve de referência de ritmo e espaçamento entre blocos.
            </Text>
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

      {/* TRABALHOS — exemplo de composição */}
      <Section id="trabalhos" className="scroll-mt-24 border-b border-foreground/10">
        <Container className="flex flex-col gap-14">
          <Reveal className="flex flex-col gap-3">
            <Eyebrow index="03">Trabalhos</Eyebrow>
            <Heading size="display-sm">Cartões de projeto</Heading>
            <Text tone="muted" measure>
              Padrão dos cards da página de trabalhos: imagem com hover, metadados nos cantos e
              a seta que gira ao passar o mouse. Demonstra proporção (4:3), raios e o realce no
              hover.
            </Text>
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
      <Section id="cores" className="scroll-mt-24 border-b border-foreground/10">
        <Container className="flex flex-col gap-10">
          <Reveal className="flex flex-col gap-3">
            <Eyebrow index="04">Cores</Eyebrow>
            <Heading size="display-sm">Tokens de tema</Heading>
            <Text tone="muted" measure>
              Use sempre os nomes semânticos (não cores fixas): eles se adaptam ao dark e ao
              light automaticamente. <strong className="text-foreground">foreground</strong> é o
              texto/elementos sólidos, <strong className="text-foreground">background</strong> o fundo
              e <strong className="text-foreground">surface</strong> os cartões. Troque o tema no canto
              superior direito para comparar.
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
            <Text size="sm" tone="muted">
              Opacidades de <code className="rounded bg-foreground/10 px-1.5 py-0.5 text-[0.85em]">foreground</code>{" "}
              — usadas em bordas, hovers e detalhes (ex.: <code className="rounded bg-foreground/10 px-1.5 py-0.5 text-[0.85em]">border-foreground/10</code>).
            </Text>
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
      <Section id="tipografia" className="scroll-mt-24">
        <Container className="flex flex-col gap-10">
          <Reveal className="flex flex-col gap-3">
            <Eyebrow index="05">Tipografia</Eyebrow>
            <Heading size="display-sm">Escala</Heading>
            <Text tone="muted" measure>
              Duas famílias: <strong className="text-foreground">Roobert</strong> (sans) para títulos e UI,
              e <strong className="text-foreground">Playfair Display</strong> (serif itálica) reservada a
              destaques editoriais — uma ou duas palavras por título, nunca o título inteiro. As escalas
              <em> display</em> abaixo são fluidas (encolhem no mobile).
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
        <Container className="flex flex-col gap-1">
          <Text size="sm" tone="muted">
            Style guide interno · não indexado · base do novo portfólio.
          </Text>
          <Text size="sm" tone="muted">
            Componentes em <code className="rounded bg-foreground/10 px-1.5 py-0.5 text-[0.85em]">src/components/ds</code>{" "}
            · tokens em <code className="rounded bg-foreground/10 px-1.5 py-0.5 text-[0.85em]">tailwind.config.ts</code> e{" "}
            <code className="rounded bg-foreground/10 px-1.5 py-0.5 text-[0.85em]">globals.css</code>.
          </Text>
        </Container>
      </footer>
    </main>
  );
}

function ShowItem({
  label,
  usage,
  children,
}: {
  label: string;
  usage?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-start gap-5">
      <div className="flex min-h-[3.5rem] items-center">{children}</div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted">{label}</span>
        {usage && (
          <span className="text-eyebrow font-medium uppercase tracking-wider text-foreground/40">
            {usage}
          </span>
        )}
      </div>
    </div>
  );
}
