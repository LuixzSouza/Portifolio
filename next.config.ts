/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true, // Habilita o minificador do Next.js
  images: {
    domains: ['via.placeholder.com'], // Permite domínios de imagens externas
  },
  compiler: {
    styledComponents: true, // Se estiver usando styled-components
  },
};

export default nextConfig;
