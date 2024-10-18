import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import Footer from '../components/ui/Footer';
import Header from "@/components/ui/Header";
import ServiceWorker from "@/components/ServiceWorker";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Basketball Manager",
  description: "Basketball Manager, a web game built using Next.js with TypeScript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <head>
        <link rel="icon" type="image/png" href="/favicon/favicon-48x48.png" sizes="48x48"/>
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg"/>
        <link rel="shortcut icon" href="/favicon/favicon.ico"/>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png"/>
        <meta name="apple-mobile-web-app-title" content="BBALLGM"/>
        <link rel="manifest" href="/favicon/site.webmanifest"/>
      </head>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <Header/>
          {children}
          <ServiceWorker/>
          <Footer/>
        </body>
      </html>
    </>
  );
}
