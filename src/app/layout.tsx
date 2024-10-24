import localFont from "next/font/local";
import "./globals.css";


const roobert = localFont({
  variable: "--font-robeert",
  src: [
    {
      path: '../font/Roobert-Bold.woff2',// Caminho do Arquivo
      weight: 'bold', // Variação da fonte
      style: 'normal',  // Normal ou Italic
    },
    {
      path: '../font/Roobert-Medium.woff2',// Caminho do Arquivo
      weight: '500', // Variação da fonte
      style: 'normal',  // Normal ou Italic
    },
    {
      path: '../font/Roobert-Regular.woff2',// Caminho do Arquivo
      weight: 'normal', // Variação da fonte
      style: 'normal',  // Normal ou Italic
    },
    {
      path: '../font/Roobert-SemiBold.woff2',// Caminho do Arquivo
      weight: '600', // Variação da fonte
      style: 'normal',  // Normal ou Italic
    },
  ]
});

const playFair = localFont({
variable: "--font-playFair",
src: [
  {
    path: '../font/PlayfairDisplay-Italic.woff2',
    weight: 'normal',
    style: 'italic'
  },
  {
    path: '../font/PlayfairDisplay-Regular.woff2',
    weight: 'normal', 
    style: 'normal', 
  },
]
});

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="pt-br" className={`${roobert.variable} ${playFair.variable}`} >
      <body>
        {children}
      </body>
    </html>
  );
}
