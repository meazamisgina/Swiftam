import type { Metadata } from "next";
import { Inter, Young_Serif } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import "../globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const youngSerif = Young_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SWIFTIAM | Enterprise Freight Operations Platform",
  description: "Manage every truck, trip, driver and settlement from one platform. Built for transport operations across Ethiopia.",
  openGraph: {
    title: "SWIFTIAM | Enterprise Freight Operations Platform",
    description: "Manage every truck, trip, driver and settlement from one platform. Built for transport operations across Ethiopia.",
    url: "https://swiftiam.com",
    siteName: "SWIFTIAM",
    images: [
      {
        url: "/hero-bg.png",
        width: 1200,
        height: 630,
        alt: "SWIFTIAM Platform Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SWIFTIAM | Enterprise Freight Operations Platform",
    description: "Manage every truck, trip, driver and settlement from one platform. Built for transport operations across Ethiopia.",
    images: ["/hero-bg.png"],
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: any; 
}>) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <body className={`${inter.variable} ${youngSerif.variable} min-h-screen flex flex-col font-sans bg-[#060B14] text-slate-300 antialiased`}>
        
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Navbar />
          <main className="flex-grow flex flex-col">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>

      </body>
    </html>
  );
}