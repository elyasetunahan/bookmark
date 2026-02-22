import type { Metadata } from "next";
import { Manrope, Source_Serif_4 } from "next/font/google";
import type { ReactNode } from "react";

import "@/app/globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const heading = Manrope({
  subsets: ["latin"],
  variable: "--font-heading"
});

const body = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  title: "Portfolio + Writing + Bookmarks",
  description: "Geliştirme odaklı projeler, yazılar ve bookmark arşivi"
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="tr">
      <body className={`${heading.variable} ${body.variable}`}>
        <SiteHeader />
        <main className="mx-auto w-full max-w-6xl px-5 py-10 md:px-6 md:py-12">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
