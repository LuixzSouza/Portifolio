# Meu Portfólio

Este é um projeto de portfólio pessoal desenvolvido utilizando **Next.js** e **Tailwind CSS**. A ideia é criar um site moderno e rápido, que destaque meus projetos e habilidades.

## Como Rodar o Projeto

1. **Clone o repositório:**

```bash

git clone <url-do-repositorio>
cd meu-portifolio

# Instale as dependências:
npm install

# Inicie o servidor de desenvolvimento:
npm run dev
```
## Organização
```tsx
<>
  {/* Cabeçalho do Site */}
  <header className="p-6 bg-gray-100 border-b">
    <h1 className="text-3xl font-bold">Home</h1>
    
    {/* Navegação */}
    <nav className="mt-4 flex space-x-4">
      <Link href="/contact">Contato</Link>
      <Link href="/work">Work</Link>
      <Link href="/about">About</Link>
    </nav>
  </header>

  {/* Seção Principal */}
  <main className="p-8">
    {/* Imagem Pessoal */}
    <section className="flex items-center space-x-4">
      <Image 
        src="/image/MySelf.jpg" 
        width={240} 
        height={140} 
        alt="foto luiz" 
        className="rounded-lg"
      />
      <p className="text-xl">Luiz Antônio de Souza</p>
    </section>

    {/* Botões de Ação */}
    <section className="mt-8 flex space-x-4">
      <BotaoPrimary estilo="primary">Clique Aqui</BotaoPrimary>
      <BotaoPrimary estilo="secondary">Cancelar</BotaoPrimary>
    </section>

    {/* Títulos e Textos */}
    <section className="mt-12 space-y-8">
      <Heading as="h1" size="super">Título Super</Heading>
      <Heading as="h2" size="xlarge">Título Grande</Heading>
      <Heading as="h3" size="medium">Título Médio</Heading>
      <Heading as="h4" size="small">Título Pequeno</Heading>

      <Paragraph size="large">
        The projects that I build are beautiful in design and strong in performance.
      </Paragraph>
      <Paragraph size="medium">
        Crafting stunning design projects around the world.
      </Paragraph>
    </section>
  </main>

  {/* Rodapé */}
  <footer className="p-6 bg-gray-100 border-t">
    <LinkCustom link="/about">Ir para Sobre</LinkCustom>
  </footer>
</>
```

## Tecnologias Utilizadas
- HTML
- CSS
- JavaScript
- Next.js
- Tailwind
- GitHub
- Figma
- VisualCode
- ChatGPT
- YouTube

## Contribuição
Se desejar contribuir, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Contato
- *E-mail:*luiz.antoniodesouza004@gmail.com