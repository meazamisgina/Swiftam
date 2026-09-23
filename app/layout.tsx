import type { Metadata } from "next";
import { Inter, Young_Serif } from "next/font/google";
import "./globals.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

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
  description: "Manage every truck, trip, driver and settlement from one platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${youngSerif.variable} min-h-screen flex flex-col font-sans bg-[#060B14] text-slate-300 antialiased`}>
        <Navbar />
        
        <main className="flex-grow flex flex-col">
          {children}
        </main>

=        <Footer />
        
      </body>
    </html>
  );
}