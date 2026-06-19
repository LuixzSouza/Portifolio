import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  // Dev e build usam diretórios de cache separados para não se corromperem.
  // Antes, `next build` sobrescrevia o `.next` que o `next dev` usava, e ao
  // voltar pro dev quebrava com "Cannot find module './XYZ.js'".
  // O build (produção) MANTÉM o `.next` padrão de propósito: com
  // `output: 'export'` o destino do export (`/out`) segue o distDir, então
  // mudar o distDir do build jogaria o export para o lugar errado. Quem é
  // isolado é o dev, em `.next-dev`.
  distDir: process.env.NODE_ENV === 'production' ? '.next' : '.next-dev',
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  compiler: {
    // Remove console.* em produção, preservando console.error.
    removeConsole:
      process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false,
  },
  experimental: {
    // Tree-shaking mais agressivo de imports nessas libs (bundles menores).
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  // No dev, ignora os diretórios de saída do build no file-watcher. Sem isso,
  // rodar `next build` com o `next dev` ativo faz o dev reagir aos arquivos
  // gerados em `.next`/`out` e recompilar, corrompendo o próprio cache.
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: [
          '**/node_modules/**',
          '**/.next/**',
          '**/.next-dev/**',
          '**/out/**',
          '**/.git/**',
        ],
      };
    }
    return config;
  },
};

export default nextConfig;
