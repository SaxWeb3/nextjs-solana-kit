import type { Metadata } from "next";
import localFont from "next/font/local";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Toaster } from "@/components/ui/sonner";

import config from "@/config";
import { ReactQueryProvider } from "@/providers/rtk";

import { Providers } from "@/app/Providers"; // Импортируем Solana Wallet провайдер

import "swiper/css";
import "../assets/styles/tailwind.css";
import "../assets/styles/themes.css";

const geistSans = localFont({
  src: "../assets/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "../assets/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(config.seo.url),
  title: {
    absolute: config.seo.title,
    template: `%s - ${config.seo.title}`,
  },
  applicationName: config.seo.title,
  description: config.seo.description,
  keywords: config.seo.keywords,
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} dark`}
      suppressHydrationWarning={true}
    >
      <body className="min-h-screen antialiased">
        <ReactQueryProvider>
          <Providers>
            {" "}
            {/* Добавляем обертку Solana Wallet */}
            <Header transparencyBehavior="top" />
            <main className="h-full min-h-screen">{children}</main>
            <Footer />
            <Toaster position="bottom-center" />
          </Providers>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
