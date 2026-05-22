import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import BroadcastBanner from "./components/BroadcastBanner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Swiftiom TMS — Trucks, cargo & money in one place (Ethiopia)",
  description:
    "Run trips, fuel, driver pay, and paperwork from your phone—built for Djibouti corridor runs, broker-heavy lanes, and yards that live on calls and WhatsApp. Works when the network is weak.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} min-h-screen selection:bg-primary/30`}>
        <BroadcastBanner />
        {children}
      </body>
    </html>
  );
}
