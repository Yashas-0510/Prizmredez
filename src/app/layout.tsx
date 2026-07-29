import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans, Instrument_Serif, Space_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import NoiseOverlay from "@/components/ui/NoiseOverlay";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PRIZM — AI Creative Studio",
  description:
    "Prizm is an AI creative studio. Web design, ad creatives, AI UGC and social media marketing — crafted with consequence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${syne.variable} ${plusJakartaSans.variable} ${instrumentSerif.variable} ${spaceMono.variable} dark h-full antialiased selection:bg-white selection:text-black`}
    >
      <body suppressHydrationWarning className="bg-[#070708] text-white font-sans min-h-full flex flex-col overflow-x-hidden">
        <LenisProvider>
          <NoiseOverlay />
          <CustomCursor />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
