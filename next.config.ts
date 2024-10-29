/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
      },
    ],
  },
  compiler: {
    styledComponents: true, // Se estiver usando styled-components
  },
};

export default nextConfig;
