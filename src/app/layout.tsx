import localFont from "next/font/local";
import Head from "next/head"; // Importação do Head
import Script from 'next/script';
import "./globals.css";

// Configuração das fontes locais
const roobert = localFont({
  variable: "--font-robeert",
  src: [
    {
      path: "../font/Roobert-Bold.woff2",
      weight: "bold",
      style: "normal",
    },
    {
      path: "../font/Roobert-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../font/Roobert-Regular.woff2",
      weight: "normal",
      style: "normal",
    },
    {
      path: "../font/Roobert-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
});

const playFair = localFont({
  variable: "--font-playFair",
  src: [
    {
      path: "../font/PlayfairDisplay-Italic.woff2",
      weight: "normal",
      style: "italic",
    },
    {
      path: "../font/PlayfairDisplay-Regular.woff2",
      weight: "normal",
      style: "normal",
    },
  ],
});

// Componente RootLayout
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-br" className={`${roobert.variable} ${playFair.variable}`}>
      <Head>
        {/* Verificação do Google Search Console */}
        <meta
          name="google-site-verification"
          content="El5tZOY56TqgKeNuwqhifuMJQw-H0QOlRc096i5sg10"
        />
      </Head>
      <body>
        {children}
        {/* Google Tag Manager Script usando o componente Script */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-HCYHYMKXDZ"
          async
        />
        <Script
          strategy="afterInteractive"
          id="google-analytics-script" // Adicionando um id único
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-HCYHYMKXDZ');
            `,
          }}
        />
      </body>
    </html>
  );
}