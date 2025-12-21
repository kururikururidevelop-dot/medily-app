import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_JP, Mochiy_Pop_One } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const mochiyPopOne = Mochiy_Pop_One({
  variable: "--font-mochiy-pop",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Medily - 医療Q&Aプラットフォーム",
  description: "医療に関する質問を地域の専門家につなぐQ&Aプラットフォーム",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansJP.variable} ${mochiyPopOne.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

