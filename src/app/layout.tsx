import type { Metadata, Viewport } from "next"; // Adicionado tipos
import localFont from "next/font/local";
import Script from 'next/script';
import "./globals.css";
import { ThemeProvider } from "@/components/ds/ThemeProvider";
import { DashboardAccessButton, DashboardActivator } from "@/components/advanced/DashboardAccessButton";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { SITE } from "@/lib/seo";

// Script anti-flash: aplica o tema salvo antes da primeira pintura.
const themeInitScript = `
(function(){
  try {
    if (localStorage.getItem('theme') === 'light') {
      var r = document.documentElement;
      r.classList.remove('dark');
      r.classList.add('light');
    }
  } catch (e) {}
})();
`;

// Configuração das fontes locais
const roobert = localFont({
  variable: "--font-roobert", // Corrigi o typo de "robeert" para "roobert" (ajuste no tailwind.config.js se necessário)
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

// Metadados Globais (Substitui o <Head>)
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.fullName} | ${SITE.jobTitle}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [...SITE.keywords],
  applicationName: `Portfólio ${SITE.name}`,
  authors: [{ name: SITE.fullName, url: SITE.url }],
  creator: SITE.fullName,
  publisher: SITE.fullName,
  category: "technology",
  alternates: { canonical: "/" },
  formatDetection: { email: false, telephone: false, address: false },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: `Portfólio ${SITE.name}`,
    title: `${SITE.fullName} | ${SITE.jobTitle}`,
    description: SITE.description,
    images: [
      { url: SITE.ogImage, width: 1200, height: 630, alt: SITE.ogImageAlt },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.fullName} | ${SITE.jobTitle}`,
    description: SITE.description,
    images: [SITE.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "El5tZOY56TqgKeNuwqhifuMJQw-H0QOlRc096i5sg10",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

// Configuração de Viewport (Separado no Next.js 14+)
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
  width: "device-width",
  initialScale: 1,
};

// Componente RootLayout
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className={`dark ${roobert.variable} ${playFair.variable}`} suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground">
        {/* Anti-flash: roda no parse, antes da hidratação, aplicando o tema salvo. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <ThemeProvider>
          <AdminLayout>
            {children}
            <DashboardAccessButton />
            <DashboardActivator />
          </AdminLayout>
        </ThemeProvider>

        {/* Google Analytics - Carrega de forma otimizada */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-HCYHYMKXDZ"
        />
        <Script
          id="google-analytics-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-HCYHYMKXDZ', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </body>
    </html>
  );
}