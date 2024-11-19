import type { Metadata } from "next";

import { Toaster } from "@/components/ui/sonner";

import config from "@/config";
import { ReactQueryProvider } from "@/providers/rtk";

import { Providers } from "@/app/Providers";

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
      lang="en"
      suppressHydrationWarning={true}
    >
      <body className="min-h-screen antialiased">
        <ReactQueryProvider>
          <Providers>
            {" "}
            {/* Solana Wallet */}
            <main className="h-full min-h-screen">{children}</main>
            <Toaster position="bottom-center" />
          </Providers>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
