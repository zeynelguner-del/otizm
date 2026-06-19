import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.otizeka.com"),
  title: {
    default: "OtiZeka - Otizm Destek ve Özel Eğitim Çocuk Gelişim Platformu",
    template: "%s | OtiZeka",
  },
  description: "Çocuklarımızın gelişim yolculuğunu destekleyen eğitsel oyunlar, duygu takibi, görsel rutinler ve özel eğitim araçları sunan dijital yardımcı.",
  keywords: ["otizm", "özel eğitim", "otizm oyunları", "otizm destek", "aac iletişim", "zeka oyunları", "otizmli çocuklar", "görsel rutinler", "duygu takibi"],
  authors: [{ name: "OtiZeka" }],
  creator: "OtiZeka",
  publisher: "OtiZeka",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://www.otizeka.com",
    title: "OtiZeka - Otizm Destek ve Özel Eğitim Platformu",
    description: "Çocuklarımızın gelişim yolculuğunu destekleyen eğitsel oyunlar, duygu takibi, görsel rutinler ve özel eğitim araçları sunan dijital yardımcı.",
    siteName: "OtiZeka",
    images: [
      {
        url: "/otizeka-banner.jpg",
        width: 1200,
        height: 630,
        alt: "OtiZeka Platformu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OtiZeka - Otizm Destek ve Özel Eğitim Platformu",
    description: "Çocuklarımızın gelişim yolculuğunu destekleyen eğitsel oyunlar, duygu takibi, görsel rutinler ve özel eğitim araçları sunan dijital yardımcı.",
    images: ["/otizeka-banner.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('themeV1');var r=document.documentElement;r.classList.remove('dark','light');if(t==='dark'){r.classList.add('dark');}else if(t==='light'){r.classList.add('light');}else{if(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches){r.classList.add('dark');}}}catch(e){}})();",
          }}
        />
        <script
          async
          crossOrigin="anonymous"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6555296619233151"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
