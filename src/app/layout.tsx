import type { Metadata, Viewport } from "next";
import { Syne, Plus_Jakarta_Sans, Instrument_Serif, Space_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";
import JsonLdSchema from "@/components/seo/JsonLdSchema";

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

export const viewport: Viewport = {
  themeColor: "#070708",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://prizmstudio.in"),
  title: {
    default: "PRIZM® — Creative Studio",
    template: "%s | PRIZM Studio",
  },
  description:
    "PRIZM is a high-end creative studio crafting high-converting web experiences, cinematic 3D motion, performance ad creatives, and creator engines.",
  keywords: [
    "PRIZM Studio",
    "Creative Studio",
    "Web Design Studio",
    "Next.js Development",
    "Motion Graphics",
    "Ad Creatives",
    "UGC Creator Engine",
    "Social Systems",
  ],
  authors: [{ name: "PRIZM Studio", url: "https://prizmstudio.in" }],
  creator: "PRIZM Studio",
  publisher: "PRIZM Studio",
  alternates: {
    canonical: "https://prizmstudio.in",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://prizmstudio.in",
    siteName: "PRIZM Studio",
    title: "PRIZM® — Creative Studio",
    description:
      "Dispersing light into digital brilliance. High-converting web experiences, motion design, paid ad creatives, and creator engines.",
    images: [
      {
        url: "/prizm_og1.jpg",
        width: 1200,
        height: 630,
        alt: "PRIZM Studio — Creative Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PRIZM® — Creative Studio",
    description:
      "High-converting web experiences, motion design, paid ad creatives, and creator engines.",
    images: ["/prizm_og1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/prizmfavicon.png" },
      { url: "/prizmfavicon.png", type: "image/png" },
    ],
    shortcut: "/prizmfavicon.png",
    apple: "/prizmfavicon.png",
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
      suppressHydrationWarning
      className={`${syne.variable} ${plusJakartaSans.variable} ${instrumentSerif.variable} ${spaceMono.variable} dark h-full antialiased selection:bg-white selection:text-black`}
    >
      <body suppressHydrationWarning className="bg-[#070708] text-white font-sans min-h-full flex flex-col overflow-x-hidden">
        <JsonLdSchema />
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
