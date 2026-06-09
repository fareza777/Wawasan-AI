import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { CommandPalette } from "@/components/search/command-palette";
import { JsonLd } from "@/components/shared/json-ld";
import { SITE_CONFIG } from "@/lib/constants";
import { createMetadata, createOrganizationJsonLd, createWebsiteJsonLd } from "@/lib/seo";
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
  ...createMetadata({
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    path: "/",
  }),
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <JsonLd data={[createWebsiteJsonLd(), createOrganizationJsonLd()]} />
          <div className="ambient-bg flex min-h-[100dvh] flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <CommandPalette />
        </ThemeProvider>
      </body>
    </html>
  );
}
